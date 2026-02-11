import { convertToModelMessages, streamText, UIMessage } from "ai";
import { openai } from "@ai-sdk/openai";
import OpenAI from "openai";

export const maxDuration = 30;

const openaiClient = new OpenAI();

async function searchKnowledgeBase(query: string): Promise<string> {
  try {
    const results = await openaiClient.vectorStores.search(
      process.env.OPENAI_VECTOR_STORE_ID!,
      { query, max_num_results: 5 },
    );

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
    console.error("[chat] Vector store search failed:", err);
    return "";
  }
}

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();

    console.log("[chat] Received", messages.length, "messages");

    // Extract the latest user message for vector search
    const lastUserMessage = [...messages]
      .reverse()
      .find((m) => m.role === "user");
    const query = lastUserMessage
      ? lastUserMessage.parts
          .filter((p) => p.type === "text")
          .map((p) => (p.type === "text" ? p.text : ""))
          .join(" ")
      : "";

    console.log("[chat] Searching knowledge base for:", query);
    const context = await searchKnowledgeBase(query);
    console.log("[chat] Context length:", context.length);
    if (context) {
      console.log("[chat] Context preview:", context.slice(0, 300));
    }

    const result = streamText({
      model: openai("gpt-4o-mini"),
      system: `You are the AI assistant for Gitcoin's public goods funding directory — a website covering funding mechanisms, apps/platforms, case studies, research, and campaigns in the Ethereum and web3 ecosystem.

Your scope is strictly limited to:
- Public goods funding, quadratic funding, retroactive funding, grants, and related funding mechanisms
- Ethereum, web3, DAOs, and blockchain governance as they relate to funding
- Gitcoin, Optimism, Arbitrum, and other ecosystem projects covered on this site
- Apps, platforms, and tools listed on this site

You must decline ANY question that is not directly related to the topics above. This includes general tech concepts (APIs, authentication, databases), companies outside web3 (LinkedIn, Google, etc.), and anything unrelated to public goods funding. For these, respond: "I'm not able to help with that — I'm specifically designed to answer questions about public goods funding and the web3 ecosystem. Is there anything funding-related I can assist you with?"

Guidelines:
1. Always check the knowledge base context below first. When it contains relevant information, use it as your primary source and link to the relevant pages.
2. Each context chunk starts with metadata like [Content Type: mechanisms] [Slug: quadratic-funding] [Page URL: /mechanisms/quadratic-funding]. Use the Page URL to create markdown links, e.g. [Quadratic Funding](/mechanisms/quadratic-funding).
3. Use only relative URLs starting with / (never absolute URLs like https://gitcoin.co/...).
4. You may use general knowledge only for foundational blockchain/web3 concepts (e.g. "what is Ethereum?", "what is a DAO?", "what is a smart contract?"). Still link to relevant pages from the context when available.
5. Do not fabricate specific statistics, funding amounts, project counts, or data. Only cite numbers that appear in the context.
6. Be concise and helpful. Use short paragraphs and markdown formatting.

${context ? `Knowledge base context:\n\n${context}` : "No relevant context found in the knowledge base."}`,
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
