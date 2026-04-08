// Wallet addresses authorized to flag/unflag content on this site.
// Checked case-insensitively at runtime.
export const ADMIN_ADDRESSES: string[] = [
  "0x809C9f8dd8CA93A41c3adca4972Fa234C28F7714",
  "0xAf4401E765dFf079aB6021BBb8d46E53E27613DB",
]

export const MODERATION_DEFAULTS = {
  blurAmount: "8px",
  overlayText: "This message has been flagged.",
  allowReveal: false,
  revealText: "Show flagged message",
} as const

export const MODERATION_API = "/api/moderation"
