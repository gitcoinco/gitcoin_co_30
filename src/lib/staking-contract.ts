// DaccCoalitionStaking contract
// Operator: 0x00De4B13153673BCAE2616b67bf822500d325Fc3
// Users can withdraw anytime before operator deploys.
// Operator can withdraw to any wallet once domain reaches 1 ETH.

import { sepolia, mainnet } from "wagmi/chains";

export const IS_STAGING = process.env.NEXT_PUBLIC_STAGING === "1";

// Sepolia deployment
const SEPOLIA_CONTRACT = "0xd69B924c37489bc83AbEE1167f8d84916Ab2c6BB" as `0x${string}`;
const MAINNET_CONTRACT = "0xd69B924c37489bc83AbEE1167f8d84916Ab2c6BB" as `0x${string}`;

export const STAKING_CONTRACT_ADDRESS = IS_STAGING ? SEPOLIA_CONTRACT : MAINNET_CONTRACT;
export const TARGET_CHAIN = IS_STAGING ? sepolia : mainnet;

export const STAKING_CONTRACT_ABI = [
  {
    type: "constructor",
    inputs: [{ name: "_operator", type: "address" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "OPERATOR_THRESHOLD",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "stake",
    inputs: [{ name: "domainId", type: "string" }],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "withdraw",
    inputs: [
      { name: "domainId", type: "string" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "operatorWithdraw",
    inputs: [
      { name: "domainId", type: "string" },
      { name: "to", type: "address" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getStake",
    inputs: [
      { name: "domainId", type: "string" },
      { name: "staker", type: "address" },
    ],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getDomainTotal",
    inputs: [{ name: "domainId", type: "string" }],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "isDomainDeployed",
    inputs: [{ name: "domainId", type: "string" }],
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "operator",
    inputs: [],
    outputs: [{ name: "", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "event",
    name: "Staked",
    inputs: [
      { name: "domainHash", type: "bytes32", indexed: true },
      { name: "domainId", type: "string", indexed: false },
      { name: "staker", type: "address", indexed: true },
      { name: "amount", type: "uint256", indexed: false },
    ],
  },
  {
    type: "event",
    name: "Withdrawn",
    inputs: [
      { name: "domainHash", type: "bytes32", indexed: true },
      { name: "domainId", type: "string", indexed: false },
      { name: "staker", type: "address", indexed: true },
      { name: "amount", type: "uint256", indexed: false },
    ],
  },
  {
    type: "event",
    name: "OperatorWithdrawn",
    inputs: [
      { name: "domainHash", type: "bytes32", indexed: true },
      { name: "domainId", type: "string", indexed: false },
      { name: "to", type: "address", indexed: true },
      { name: "amount", type: "uint256", indexed: false },
    ],
  },
] as const;
