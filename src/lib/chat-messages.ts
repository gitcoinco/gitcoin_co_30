import type { UIMessage } from "ai";

/** The site chat sends text only; reject remote file parts before the AI SDK sees them. */
export function parseChatMessages(input: unknown): UIMessage[] {
  if (!Array.isArray(input) || input.length === 0 || input.length > 30) {
    throw new Error("Invalid messages");
  }

  let totalLength = 0;
  return input.map((message, index) => {
    if (!message || typeof message !== "object" || Array.isArray(message)) {
      throw new Error("Invalid message");
    }
    const { role, parts } = message as Record<string, unknown>;
    if ((role !== "user" && role !== "assistant") || !Array.isArray(parts) || parts.length === 0) {
      throw new Error("Invalid message");
    }
    // The SDK includes step boundaries in assistant history after streaming.
    const contentParts = parts.filter((part) =>
      !(role === "assistant" && part?.type === "step-start"),
    );
    const cleanParts = contentParts.map((part) => {
      if (!part || typeof part !== "object" || Array.isArray(part)) {
        throw new Error("Invalid message part");
      }
      const { type, text } = part as Record<string, unknown>;
      if (type !== "text" || typeof text !== "string") {
        throw new Error("Only text messages are supported");
      }
      totalLength += text.length;
      if (totalLength > 30_000) throw new Error("Messages are too long");
      return { type: "text" as const, text };
    });
    return { id: String(index), role, parts: cleanParts };
  });
}
