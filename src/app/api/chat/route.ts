import { convertToModelMessages, streamText, UIMessage } from "ai";
import { openai } from "@ai-sdk/openai";
import OpenAI from "openai";
import fs from "node:fs";
import path from "node:path";

export const maxDuration = 30;

let openaiClient: OpenAI | null = null;

function getOpenAIClient(): OpenAI | null {
  if (!process.env.OPENAI_API_KEY) {
    return null;
  }

  openaiClient ??= new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  return openaiClient;
}

// Loaded once at startup from src/data/chatbot-context.md.
const GITCOIN_CONTEXT = fs.readFileSync(
  path.join(process.cwd(), "src/data/chatbot-context.md"),
  "utf8",
).trim();

async function searchKnowledgeBase(query: string): Promise<string> {
  const client = getOpenAIClient();
  if (!client || !process.env.OPENAI_VECTOR_STORE_ID) {
    return "";
  }

  try {
    const results = await client.vectorStores.search(
      process.env.OPENAI_VECTOR_STORE_ID,
      { query, max_num_results: 8 },
    );

    console.log("[chat] Vector search raw results:", results.data.length);
    if (!results.data.length) return "";

    return results.data
      .map((item) =>
        item.content
          .filter((c) => c.type === "text")
          .map((c) => c.text)
          .join("\n"),
      )
      .join("\n\n---\n\n");
  } catch (err) {
    console.error("[chat] Vector store search FAILED:", JSON.stringify(err));
    return "";
  }
}

/**
 * Use gpt-4o-mini to rewrite the user's message into an optimal standalone
 * search query, taking into account the recent conversation context.
 * This ensures follow-up messages retrieve the right chunks rather than returning noise.
 */
async function buildSearchQuery(messages: UIMessage[]): Promise<string> {
  const reversed = [...messages].reverse();

  const lastUser = reversed.find((m) => m.role === "user");
  const userText = lastUser?.parts
    .filter((p) => p.type === "text")
    .map((p) => (p.type === "text" ? p.text : ""))
    .join(" ")
    .trim() ?? "";

  if (!userText) return "";

  // Build a short conversation summary for the rewriter
  const recentTurns = messages
    .slice(-6) // last 3 exchanges
    .map((m) => {
      const text = m.parts
        .filter((p) => p.type === "text")
        .map((p) => (p.type === "text" ? p.text : ""))
        .join(" ")
        .slice(0, 300);
      return `${m.role === "user" ? "User" : "Assistant"}: ${text}`;
    })
    .join("\n");

  const client = getOpenAIClient();
  if (!client) {
    return userText;
  }

  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You rewrite user messages into optimal standalone search queries for a vector database about public goods funding and web3. Extract the core topic — ignore URL paths, question words, and filler. Output ONLY the search query — no explanation, no quotes. Max 20 words.",
        },
        {
          role: "user",
          content: `Conversation so far:\n${recentTurns}\n\nRewrite the last user message as a standalone search query:`,
        },
      ],
      max_tokens: 40,
      temperature: 0,
    });

    const rewritten = response.choices[0]?.message?.content?.trim() ?? userText;
    console.log("[chat] Query rewrite:", userText, "→", rewritten);
    return rewritten;
  } catch {
    // Fall back to raw user message if rewrite fails
    return userText;
  }
}

export async function POST(req: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return new Response(
        JSON.stringify({ error: "Chat is not configured. Missing OPENAI_API_KEY." }),
        {
          status: 503,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const { messages }: { messages: UIMessage[] } = await req.json();

    console.log("[chat] Received", messages.length, "messages");

    const query = await buildSearchQuery(messages);
    console.log("[chat] Search query:", query);

    const context = await searchKnowledgeBase(query);
    console.log("[chat] Context length:", context.length);
    if (context) {
      console.log("[chat] Context preview:", context.slice(0, 300));
    }

    const result = streamText({
      model: openai("gpt-4o"),
      system: `You are the AI assistant embedded on gitcoin.co — this website IS the official Gitcoin site. You help people explore the directory of funding mechanisms, platforms, case studies, research, campaigns, and books. Never tell users to "check the official Gitcoin site" — they are already on it. Instead, link them to the relevant section of this directory.

## Site context

${GITCOIN_CONTEXT}

## Section browse links — always use these when mentioning a section

| Section | Browse link |
|---------|-------------|
| Mechanisms | [/mechanisms](/mechanisms) |
| Apps | [/apps](/apps) |
| Case Studies | [/case-studies](/case-studies) |
| Research | [/research](/research) |
| Campaigns | [/campaigns](/campaigns) |

Every bullet point or sentence that mentions one of these sections MUST include its browse link. No exceptions.

## Instructions
- Prioritise content from this directory when answering. Always link to relevant pages when available.
- When a user asks what books, mechanisms, apps, case studies, or research is available, list items from the retrieved context. Do not rely on a memorized list — items in the directory change over time.
- You can answer general questions about web3, blockchain, and funding concepts when helpful — but ground answers in the directory content wherever possible.
- For Gitcoin-specific facts not covered in the "About" section above (live rounds, recent announcements, updated stats): use only the retrieved context. If not available, say you don't have current details and link to the relevant section of this directory.
- Decline only questions clearly unrelated to funding, the new internet, or this directory (cooking, general programming, unrelated companies, etc.).
- When users ask about earning money, bounties, hackathons, or applying for grants FROM Gitcoin: do NOT answer from training memory. Gitcoin's old Bounties, Hackathons, and Grants programs are no longer active. Always redirect to the Contributing section in the Site Context above.

## Links and citations
- Retrieved chunks start with \`[Content Type: X] [Slug: Y] [Page URL: /X/Y]\` — always use \`[Page URL]\` to create internal links, e.g. [Quadratic Funding](/mechanisms/quadratic-funding)
- Links already present in the Site Context section above are valid — use them freely
- If a chunk contains \`ctaUrl:\`, that is the direct read/download link — always surface it when a user asks to read or access the content. Use the content name as link text, e.g. [Read The Networked Firm](ctaUrl) — never use "here" or "this link" as link text
- Always link to the page URL ([Page URL]) when discussing a specific item, in addition to any CTA link
- Use only relative URLs (starting with /) for internal pages — never absolute URLs or links recalled from training memory
- If you cannot determine a link from context, say so rather than guessing
- Never render a URL or path inside code backticks — always use markdown links: [text](/path)

## Response style
- Be concise. Use short paragraphs and markdown formatting (headers, bullets) for longer answers
- Don't fabricate statistics or counts — only cite numbers present in the retrieved context or the "About" section above
- Follow-up questions ("where is this from?", "can I read it?", "give me a link", "tell me more") always refer to the current conversation — never refuse them

${context ? `## Retrieved context\n\n${context}` : "## Retrieved context\n\nNothing specific retrieved for this query. Answer from the Site Context above and general web3 knowledge where helpful. Do not fabricate statistics, counts, or specific claims — only cite numbers from the Site Context. If the user is asking about a specific item in the directory and you can infer its URL from the slug pattern, always link to it."}`,
      messages: await convertToModelMessages(messages),
      onError: ({ error }) => {
        console.error("[chat] Stream error:", error);
      },
      onFinish: ({ text }) => {
        console.log("[chat] Finished. Text length:", text.length);
      },
    });

    return result.toUIMessageStreamResponse();
  } catch (err) {
    console.error("[chat] Error:", err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
