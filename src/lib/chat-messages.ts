import type { UIMessage } from "ai";

export const MAX_CHAT_MESSAGES = 30;
export const MAX_CHAT_TEXT_LENGTH = 30_000;

/** Keep the visible conversation intact while sending a bounded recent context. */
export function getRecentChatMessages(messages: UIMessage[]): UIMessage[] {
  let start = messages.length;
  let textLength = 0;
  while (start > 0 && messages.length - start < MAX_CHAT_MESSAGES) {
    const message = messages[start - 1];
    const length = message.parts.reduce(
      (total, part) => total + (part.type === "text" ? part.text.length : 0),
      0,
    );
    if (textLength + length > MAX_CHAT_TEXT_LENGTH) break;
    textLength += length;
    start--;
  }
  // Do not send an orphaned assistant response after dropping its user turn.
  while (start < messages.length && messages[start].role !== "user") start++;
  return messages.slice(start);
}

/** The site chat sends text only; reject remote file parts before the AI SDK sees them. */
export function parseChatMessages(input: unknown): UIMessage[] {
  if (!Array.isArray(input) || input.length === 0 || input.length > MAX_CHAT_MESSAGES) {
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
      if (totalLength > MAX_CHAT_TEXT_LENGTH) throw new Error("Messages are too long");
      return { type: "text" as const, text };
    });
    return { id: String(index), role, parts: cleanParts };
  });
}
