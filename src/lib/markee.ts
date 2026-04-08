export const LEADERBOARD_ADDRESS =
  "0x710dA4C477EDf1052Ea876aEEf3E153Fb040Fa9f" as const;

export const LEADERBOARD_ADDRESS_LOWER = LEADERBOARD_ADDRESS.toLowerCase();

export const BUY_URL =
  "https://markee.xyz/ecosystem/website/0x710dA4C477EDf1052Ea876aEEf3E153Fb040Fa9f";

export const API_URL = "/api/markee/leaderboards";

export const MIN_INCREMENT = BigInt("1000000000000000"); // 0.001 ETH

export const LEADERBOARD_ABI = [
  {
    inputs: [],
    name: "minimumPrice",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxMessageLength",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { name: "_message", type: "string" },
      { name: "_name", type: "string" },
    ],
    name: "createMarkee",
    outputs: [{ name: "markeeAddress", type: "address" }],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ name: "markeeAddress", type: "address" }],
    name: "addFunds",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { name: "markeeAddress", type: "address" },
      { name: "_message", type: "string" },
    ],
    name: "updateMessage",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
