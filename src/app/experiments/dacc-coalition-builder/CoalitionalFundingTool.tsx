"use client";

import { useState, useMemo, useCallback, useEffect } from "react";

/* ───────────────────── d/acc TAXONOMY ───────────────────── */

interface Category {
  id: string;
  name: string;
  quadrant: "physical-defense" | "physical-coordination" | "digital-defense" | "digital-coordination";
  icon: string;
  interest: number;
  trending: boolean;
  subcategories: { id: string; name: string; interest: number; trending: boolean }[];
}

const QUADRANTS = {
  "physical-defense": { name: "Physical Defense", axis: "Atoms × Survive", icon: "🛡️", color: "rose" },
  "physical-coordination": { name: "Physical Coordination", axis: "Atoms × Thrive", icon: "🌱", color: "amber" },
  "digital-defense": { name: "Digital Defense", axis: "Bits × Survive", icon: "🔐", color: "cyan" },
  "digital-coordination": { name: "Digital Coordination", axis: "Bits × Thrive", icon: "⚡", color: "teal" },
} as const;

const CATEGORIES: Category[] = [
  // ATOMS × SURVIVE
  {
    id: "biodefense", name: "Biodefense & Health Systems", quadrant: "physical-defense", icon: "🧬",
    interest: 94, trending: true,
    subcategories: [
      { id: "pathogen-surveillance", name: "Pathogen Surveillance", interest: 38, trending: true },
      { id: "health-infra", name: "Health Infrastructure", interest: 32, trending: false },
      { id: "open-pharma", name: "Open Pharma & DeSci", interest: 24, trending: true },
    ],
  },
  {
    id: "open-hardware", name: "Open Source Hardware & Silicon", quadrant: "physical-defense", icon: "🔧",
    interest: 78, trending: false,
    subcategories: [
      { id: "open-silicon", name: "Open Silicon / RISC-V", interest: 34, trending: true },
      { id: "secure-devices", name: "Secure Devices", interest: 26, trending: false },
      { id: "open-os", name: "Open Operating Systems", interest: 18, trending: false },
    ],
  },
  {
    id: "resilient-manufacturing", name: "Resilient Manufacturing", quadrant: "physical-defense", icon: "🏭",
    interest: 52, trending: false,
    subcategories: [
      { id: "distributed-fab", name: "Distributed Fabrication", interest: 22, trending: false },
      { id: "salvage-reuse", name: "Salvage & Reuse", interest: 18, trending: false },
      { id: "robotics", name: "Open Robotics", interest: 12, trending: true },
    ],
  },
  {
    id: "civic-tech", name: "Civic Tech", quadrant: "physical-defense", icon: "🏘️",
    interest: 61, trending: false,
    subcategories: [
      { id: "community-resilience", name: "Community Resilience", interest: 24, trending: false },
      { id: "urban-agriculture", name: "Urban Agriculture", interest: 21, trending: true },
      { id: "social-infrastructure", name: "Social Infrastructure", interest: 16, trending: false },
    ],
  },

  // ATOMS × THRIVE
  {
    id: "property-registries", name: "Property Rights & Registries", quadrant: "physical-coordination", icon: "🏠",
    interest: 67, trending: false,
    subcategories: [
      { id: "land-registries", name: "Land Registries", interest: 28, trending: false },
      { id: "property-platforms", name: "Property Platforms", interest: 22, trending: false },
      { id: "cadastre", name: "Cadastre Systems", interest: 17, trending: false },
    ],
  },
  {
    id: "decentralized-energy", name: "Decentralized Energy", quadrant: "physical-coordination", icon: "⚡",
    interest: 143, trending: true,
    subcategories: [
      { id: "energy-web", name: "Energy Web & Protocols", interest: 52, trending: true },
      { id: "solar-micro", name: "Solar Microgrids", interest: 48, trending: true },
      { id: "community-energy", name: "Community Energy", interest: 28, trending: false },
      { id: "maker-spaces", name: "Maker Spaces & Fab Labs", interest: 15, trending: false },
    ],
  },
  {
    id: "bioregional", name: "Bioregional Coordination", quadrant: "physical-coordination", icon: "🏔️",
    interest: 63, trending: true,
    subcategories: [
      { id: "watershed-dao", name: "Watershed DAOs", interest: 21, trending: true },
      { id: "regen-ag", name: "Regenerative Agriculture", interest: 18, trending: true },
      { id: "ecological-data", name: "Ecological Data Commons", interest: 15, trending: true },
      { id: "land-trust", name: "Community Land Trusts", interest: 9, trending: false },
    ],
  },

  // BITS × SURVIVE
  {
    id: "comms-messaging", name: "Communication & Messaging", quadrant: "digital-defense", icon: "💬",
    interest: 167, trending: true,
    subcategories: [
      { id: "p2p-messaging", name: "P2P Messaging", interest: 58, trending: true },
      { id: "encrypted-comms", name: "Encrypted Communications", interest: 52, trending: false },
      { id: "messaging-protocols", name: "Messaging Protocols", interest: 38, trending: true },
      { id: "metadata-resistance", name: "Metadata Resistance", interest: 19, trending: false },
    ],
  },
  {
    id: "identity-attestation", name: "Decentralized Identity & Attestation", quadrant: "digital-defense", icon: "🪪",
    interest: 134, trending: true,
    subcategories: [
      { id: "naming-systems", name: "Naming Systems (ENS)", interest: 42, trending: false },
      { id: "proof-of-personhood", name: "Proof of Personhood", interest: 38, trending: true },
      { id: "verifiable-creds", name: "Verifiable Credentials", interest: 32, trending: true },
      { id: "attestation-infra", name: "Attestation Infrastructure (EAS)", interest: 22, trending: false },
    ],
  },
  {
    id: "formal-verification", name: "Formal Verification & Security", quadrant: "digital-defense", icon: "🛡️",
    interest: 189, trending: true,
    subcategories: [
      { id: "security-audits", name: "Security Audits", interest: 64, trending: false },
      { id: "bug-bounties", name: "Bug Bounties", interest: 52, trending: true },
      { id: "formal-methods", name: "Formal Methods", interest: 42, trending: true },
      { id: "security-tools", name: "Security Tooling", interest: 31, trending: false },
    ],
  },
  {
    id: "zk-systems", name: "Zero-Knowledge Systems", quadrant: "digital-defense", icon: "🔒",
    interest: 215, trending: true,
    subcategories: [
      { id: "zk-rollups", name: "ZK Rollups", interest: 72, trending: true },
      { id: "zk-privacy", name: "ZK Privacy Tools", interest: 58, trending: true },
      { id: "zk-infrastructure", name: "ZK Infrastructure", interest: 48, trending: false },
      { id: "fhe", name: "Fully Homomorphic Encryption", interest: 37, trending: true },
    ],
  },
  {
    id: "privacy-computation", name: "Privacy Preserving Computation", quadrant: "digital-defense", icon: "🔐",
    interest: 108, trending: false,
    subcategories: [
      { id: "mpc", name: "Multi-Party Computation", interest: 38, trending: true },
      { id: "key-management", name: "Key Management", interest: 36, trending: false },
      { id: "threshold-crypto", name: "Threshold Cryptography", interest: 34, trending: false },
    ],
  },

  // BITS × THRIVE
  {
    id: "governance-tooling", name: "Governance Tooling", quadrant: "digital-coordination", icon: "🏛️",
    interest: 178, trending: false,
    subcategories: [
      { id: "voting-frameworks", name: "Voting Frameworks", interest: 48, trending: false },
      { id: "dao-tooling", name: "DAO Tooling", interest: 42, trending: false },
      { id: "multisig", name: "Multisig & Treasury", interest: 38, trending: false },
      { id: "delegation", name: "Delegation Systems", interest: 28, trending: false },
      { id: "metagovernance", name: "Metagovernance", interest: 22, trending: true },
    ],
  },
  {
    id: "epistemic-infra", name: "Epistemic Infrastructure", quadrant: "digital-coordination", icon: "🔮",
    interest: 142, trending: true,
    subcategories: [
      { id: "prediction-markets", name: "Prediction Markets", interest: 58, trending: true },
      { id: "fact-checking", name: "Fact Checking & Verification", interest: 42, trending: true },
      { id: "info-markets", name: "Information Markets", interest: 28, trending: false },
      { id: "deep-safety", name: "Deep Safety & AI Alignment", interest: 14, trending: true },
    ],
  },
  {
    id: "monetary-infra", name: "Decentralized Monetary Infrastructure", quadrant: "digital-coordination", icon: "💰",
    interest: 198, trending: false,
    subcategories: [
      { id: "stablecoins", name: "Stablecoins", interest: 62, trending: false },
      { id: "decentralized-stablecoins", name: "Decentralized Stablecoins (DAI)", interest: 54, trending: false },
      { id: "payment-rails", name: "Payment Rails", interest: 46, trending: true },
      { id: "cbdc-alternatives", name: "CBDC Alternatives", interest: 36, trending: false },
    ],
  },
];

interface Project {
  id: string;
  name: string;
  description: string;
  category: string;
  subcategory: string;
  raised: number;
  backers: number;
  daccScore: number;
  status: "seeking" | "active" | "funded";
}

const PROJECTS: Project[] = [
  // Atoms × Survive
  { id: "p1", name: "Pathoplexus", description: "Open pathogen genomic surveillance platform for pandemic preparedness.", category: "biodefense", subcategory: "pathogen-surveillance", raised: 42000, backers: 18, daccScore: 88, status: "active" },
  { id: "p2", name: "OpenWater", description: "Open-source medical imaging hardware for accessible diagnostics.", category: "biodefense", subcategory: "health-infra", raised: 28000, backers: 12, daccScore: 86, status: "seeking" },
  { id: "p3", name: "GrapheneOS", description: "Privacy and security focused mobile OS built on Android Open Source Project.", category: "open-hardware", subcategory: "open-os", raised: 89000, backers: 156, daccScore: 95, status: "funded" },
  { id: "p4", name: "ethOS (Freedom Factory)", description: "Ethereum-native mobile operating system for sovereign computing.", category: "open-hardware", subcategory: "secure-devices", raised: 34000, backers: 22, daccScore: 82, status: "active" },
  { id: "p5", name: "K-scale Labs", description: "Open-source humanoid robots and distributed manufacturing.", category: "resilient-manufacturing", subcategory: "robotics", raised: 15000, backers: 8, daccScore: 78, status: "seeking" },
  { id: "p6", name: "Better.SG", description: "Civic tech collective building public goods for Singapore.", category: "civic-tech", subcategory: "community-resilience", raised: 22000, backers: 14, daccScore: 84, status: "active" },
  { id: "p7", name: "Edible Garden City", description: "Urban farming infrastructure for local food sovereignty.", category: "civic-tech", subcategory: "urban-agriculture", raised: 18000, backers: 11, daccScore: 80, status: "seeking" },

  // Atoms × Thrive
  { id: "p8", name: "Energy Web Foundation", description: "Open-source decentralized energy infrastructure and protocols.", category: "decentralized-energy", subcategory: "energy-web", raised: 120000, backers: 67, daccScore: 88, status: "funded" },
  { id: "p9", name: "Power Ledger", description: "Peer-to-peer energy trading platform for decentralized grids.", category: "decentralized-energy", subcategory: "solar-micro", raised: 78000, backers: 45, daccScore: 82, status: "active" },
  { id: "p10", name: "Colorado River Sensor Network", description: "Open-source water quality sensors publishing data to a public commons.", category: "bioregional", subcategory: "watershed-dao", raised: 12000, backers: 8, daccScore: 86, status: "seeking" },
  { id: "p11", name: "Boulder Bioregional Data Commons", description: "Community-owned ecological and governance data for the Front Range.", category: "bioregional", subcategory: "ecological-data", raised: 8000, backers: 6, daccScore: 84, status: "seeking" },

  // Bits × Survive
  { id: "p12", name: "Waku", description: "Decentralized communication protocol for censorship-resistant messaging.", category: "comms-messaging", subcategory: "messaging-protocols", raised: 95000, backers: 52, daccScore: 94, status: "active" },
  { id: "p13", name: "Status", description: "Private messaging, crypto wallet, and Web3 browser in one app.", category: "comms-messaging", subcategory: "p2p-messaging", raised: 180000, backers: 89, daccScore: 92, status: "funded" },
  { id: "p14", name: "HOPR", description: "Incentivized mixnet for metadata-private communication.", category: "comms-messaging", subcategory: "metadata-resistance", raised: 64000, backers: 31, daccScore: 91, status: "active" },
  { id: "p15", name: "SimpleX Chat", description: "First messaging platform without user identifiers of any kind.", category: "comms-messaging", subcategory: "encrypted-comms", raised: 42000, backers: 28, daccScore: 96, status: "active" },
  { id: "p16", name: "Session", description: "End-to-end encrypted messenger using onion routing. No phone number required.", category: "comms-messaging", subcategory: "encrypted-comms", raised: 55000, backers: 34, daccScore: 93, status: "active" },
  { id: "p17", name: "XMTP Labs", description: "Open protocol for secure web3 messaging between wallets.", category: "comms-messaging", subcategory: "messaging-protocols", raised: 72000, backers: 41, daccScore: 88, status: "active" },
  { id: "p18", name: "ENS", description: "Decentralized naming system for wallets, websites, and more.", category: "identity-attestation", subcategory: "naming-systems", raised: 250000, backers: 312, daccScore: 94, status: "funded" },
  { id: "p19", name: "Worldcoin", description: "Proof of personhood using iris biometrics for global identity.", category: "identity-attestation", subcategory: "proof-of-personhood", raised: 350000, backers: 178, daccScore: 58, status: "funded" },
  { id: "p20", name: "Polygon ID", description: "Self-sovereign identity framework using ZK proofs.", category: "identity-attestation", subcategory: "verifiable-creds", raised: 85000, backers: 42, daccScore: 82, status: "active" },
  { id: "p21", name: "EAS (Ethereum Attestation Service)", description: "Open infrastructure for making attestations on/off chain.", category: "identity-attestation", subcategory: "attestation-infra", raised: 38000, backers: 24, daccScore: 90, status: "active" },
  { id: "p22", name: "Trail of Bits", description: "Security research and auditing for critical software infrastructure.", category: "formal-verification", subcategory: "security-audits", raised: 120000, backers: 56, daccScore: 88, status: "funded" },
  { id: "p23", name: "OpenZeppelin", description: "Open-source smart contract security library and audit services.", category: "formal-verification", subcategory: "security-tools", raised: 95000, backers: 142, daccScore: 92, status: "funded" },
  { id: "p24", name: "Immunefi", description: "Web3's leading bug bounty platform protecting $190B+ in funds.", category: "formal-verification", subcategory: "bug-bounties", raised: 78000, backers: 67, daccScore: 86, status: "active" },
  { id: "p25", name: "Code4rena", description: "Competitive audit platform for smart contract security.", category: "formal-verification", subcategory: "bug-bounties", raised: 55000, backers: 89, daccScore: 84, status: "active" },
  { id: "p26", name: "Aztec Network", description: "Privacy-first ZK rollup with encrypted smart contracts.", category: "zk-systems", subcategory: "zk-rollups", raised: 145000, backers: 78, daccScore: 92, status: "active" },
  { id: "p27", name: "zkSync", description: "ZK rollup for scaling Ethereum with full EVM compatibility.", category: "zk-systems", subcategory: "zk-rollups", raised: 210000, backers: 156, daccScore: 86, status: "funded" },
  { id: "p28", name: "StarkNet", description: "Permissionless ZK rollup using STARK proofs for scalability.", category: "zk-systems", subcategory: "zk-infrastructure", raised: 185000, backers: 134, daccScore: 88, status: "funded" },
  { id: "p29", name: "Zama", description: "Open-source fully homomorphic encryption tools for developers.", category: "privacy-computation", subcategory: "mpc", raised: 62000, backers: 28, daccScore: 90, status: "active" },
  { id: "p30", name: "ZenGo", description: "Keyless crypto wallet using MPC for threshold key management.", category: "privacy-computation", subcategory: "key-management", raised: 48000, backers: 35, daccScore: 78, status: "active" },

  // Bits × Thrive
  { id: "p31", name: "Aragon", description: "DAO framework for creating and managing on-chain organizations.", category: "governance-tooling", subcategory: "dao-tooling", raised: 125000, backers: 89, daccScore: 88, status: "funded" },
  { id: "p32", name: "Safe", description: "Multi-signature smart account infrastructure for digital asset management.", category: "governance-tooling", subcategory: "multisig", raised: 180000, backers: 234, daccScore: 92, status: "funded" },
  { id: "p33", name: "Tally", description: "Full-featured governance app for on-chain voting and delegation.", category: "governance-tooling", subcategory: "voting-frameworks", raised: 65000, backers: 42, daccScore: 84, status: "active" },
  { id: "p34", name: "Compound Governor", description: "Open-source governance framework used by 100+ DAOs.", category: "governance-tooling", subcategory: "voting-frameworks", raised: 95000, backers: 67, daccScore: 90, status: "funded" },
  { id: "p35", name: "Metagov", description: "Research collective building tools for online governance.", category: "governance-tooling", subcategory: "metagovernance", raised: 32000, backers: 18, daccScore: 86, status: "seeking" },
  { id: "p36", name: "Polymarket", description: "Prediction market platform for real-world event forecasting.", category: "epistemic-infra", subcategory: "prediction-markets", raised: 140000, backers: 89, daccScore: 76, status: "funded" },
  { id: "p37", name: "Metaculus", description: "Community prediction and forecasting platform for calibrated reasoning.", category: "epistemic-infra", subcategory: "prediction-markets", raised: 45000, backers: 34, daccScore: 88, status: "active" },
  { id: "p38", name: "CheckMate SG", description: "Community-driven fact-checking and misinformation detection.", category: "epistemic-infra", subcategory: "fact-checking", raised: 18000, backers: 12, daccScore: 82, status: "seeking" },
  { id: "p39", name: "Circle (USDC)", description: "Fully reserved stablecoin infrastructure for digital dollars.", category: "monetary-infra", subcategory: "stablecoins", raised: 280000, backers: 450, daccScore: 62, status: "funded" },
  { id: "p40", name: "MakerDAO (DAI)", description: "Decentralized stablecoin backed by crypto collateral, governed by MKR holders.", category: "monetary-infra", subcategory: "decentralized-stablecoins", raised: 195000, backers: 312, daccScore: 86, status: "funded" },
];

/* ────────────────────── COMPONENT ─────────────────────── */

type Step = "quadrant" | "category" | "elaborate" | "projects" | "pledge";

interface AttractorState {
  quadrant: string | null;
  category: string | null;
  subcategories: Set<string>;
  freeText: string;
  pledgeAmount: string;
  selectedProjects: Set<string>;
}

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
      on: (event: string, cb: (...args: unknown[]) => void) => void;
      removeListener: (event: string, cb: (...args: unknown[]) => void) => void;
    };
  }
}

function truncateAddress(addr: string) {
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

// Sepolia testnet config
const SEPOLIA_CHAIN_ID = "0xaa36a7"; // 11155111
const SIGNAL_ADDRESS = "0x000000000000000000000000000000000000dACC"; // vanity burn address for signals

async function ensureSepolia() {
  const eth = window.ethereum;
  if (!eth) return false;
  try {
    await eth.request({ method: "wallet_switchEthereumChain", params: [{ chainId: SEPOLIA_CHAIN_ID }] });
    return true;
  } catch (switchError: unknown) {
    const err = switchError as { code?: number };
    if (err.code === 4902) {
      try {
        await eth.request({
          method: "wallet_addEthereumChain",
          params: [{
            chainId: SEPOLIA_CHAIN_ID,
            chainName: "Sepolia Testnet",
            nativeCurrency: { name: "SepoliaETH", symbol: "ETH", decimals: 18 },
            rpcUrls: ["https://rpc.sepolia.org"],
            blockExplorerUrls: ["https://sepolia.etherscan.io"],
          }],
        });
        return true;
      } catch { return false; }
    }
    return false;
  }
}

export default function CoalitionalFundingTool() {
  const [step, setStep] = useState<Step>("quadrant");
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [txPending, setTxPending] = useState(false);
  const [txError, setTxError] = useState<string | null>(null);

  const [attractor, setAttractor] = useState<AttractorState>({
    quadrant: null,
    category: null,
    subcategories: new Set(),
    freeText: "",
    pledgeAmount: "",
    selectedProjects: new Set(),
  });

  // Auto-detect already connected wallet
  useEffect(() => {
    const eth = window.ethereum;
    if (!eth) return;
    eth.request({ method: "eth_accounts" }).then((accounts) => {
      const accs = accounts as string[];
      if (accs.length > 0) setWalletAddress(accs[0]);
    }).catch(() => {});

    const handleChange = (...args: unknown[]) => {
      const accounts = args[0] as string[];
      setWalletAddress(accounts.length > 0 ? accounts[0] : null);
    };
    eth.on("accountsChanged", handleChange);
    return () => eth.removeListener("accountsChanged", handleChange);
  }, []);

  const connectWallet = useCallback(async (): Promise<string | null> => {
    const eth = window.ethereum;
    if (!eth) {
      window.open("https://metamask.io/download/", "_blank");
      return null;
    }
    setConnecting(true);
    try {
      const accounts = (await eth.request({ method: "eth_requestAccounts" })) as string[];
      if (accounts.length > 0) {
        setWalletAddress(accounts[0]);
        setConnecting(false);
        return accounts[0];
      }
    } catch {
      // user rejected
    }
    setConnecting(false);
    return null;
  }, []);

  // Stake ETH on Sepolia to signal interest
  const stakeSignal = useCallback(async (amountEth: string) => {
    const eth = window.ethereum;
    if (!eth) { await connectWallet(); return; }

    let addr = walletAddress;
    if (!addr) {
      addr = await connectWallet();
      if (!addr) return;
    }

    setTxPending(true);
    setTxError(null);
    setTxHash(null);

    try {
      // Switch to Sepolia
      const switched = await ensureSepolia();
      if (!switched) { setTxError("Please switch to Sepolia testnet"); setTxPending(false); return; }

      // Encode attractor data as hex calldata
      const attractorData = JSON.stringify({
        category: attractor.category,
        subcategories: [...attractor.subcategories],
        projects: [...attractor.selectedProjects],
        freeText: attractor.freeText,
        timestamp: Date.now(),
      });
      const encoder = new TextEncoder();
      const bytes = encoder.encode(attractorData);
      const hexData = "0x" + Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");

      // Convert ETH to wei hex
      const weiValue = BigInt(Math.round(parseFloat(amountEth) * 1e18));
      const hexValue = "0x" + weiValue.toString(16);

      const hash = (await eth.request({
        method: "eth_sendTransaction",
        params: [{
          from: addr,
          to: SIGNAL_ADDRESS,
          value: hexValue,
          data: hexData,
        }],
      })) as string;

      setTxHash(hash);
    } catch (e: unknown) {
      const err = e as { message?: string };
      setTxError(err.message || "Transaction failed");
    }
    setTxPending(false);
  }, [walletAddress, connectWallet, attractor]);

  const quadrantCategories = useMemo(
    () => attractor.quadrant ? CATEGORIES.filter((c) => c.quadrant === attractor.quadrant) : [],
    [attractor.quadrant]
  );

  const selectedCategory = useMemo(
    () => CATEGORIES.find((c) => c.id === attractor.category),
    [attractor.category]
  );

  const matchingProjects = useMemo(() => {
    if (!attractor.category) return [];
    return PROJECTS.filter(
      (p) => p.category === attractor.category &&
        (attractor.subcategories.size === 0 || attractor.subcategories.has(p.subcategory))
    );
  }, [attractor.category, attractor.subcategories]);

  const trendingCategories = useMemo(
    () => CATEGORIES.filter((c) => c.trending).sort((a, b) => b.interest - a.interest).slice(0, 5),
    []
  );

  const trendingSubs = useMemo(() => {
    const all: { cat: string; sub: { id: string; name: string; interest: number }; catIcon: string }[] = [];
    CATEGORIES.forEach((c) => c.subcategories.filter((s) => s.trending).forEach((s) => all.push({ cat: c.name, sub: s, catIcon: c.icon })));
    return all.sort((a, b) => b.sub.interest - a.sub.interest).slice(0, 8);
  }, []);

  const totalInterest = useMemo(() => {
    if (!selectedCategory) return 0;
    if (attractor.subcategories.size === 0) return selectedCategory.interest;
    return selectedCategory.subcategories
      .filter((s) => attractor.subcategories.has(s.id))
      .reduce((sum, s) => sum + s.interest, 0);
  }, [selectedCategory, attractor.subcategories]);

  const goBack = useCallback(() => {
    const map: Record<Step, Step> = { quadrant: "quadrant", category: "quadrant", elaborate: "category", projects: "elaborate", pledge: "projects" };
    setStep(map[step]);
  }, [step]);

  const stepLabels: [Step, string][] = [
    ["quadrant", "Pick a quadrant"],
    ["category", "Choose domain"],
    ["elaborate", "Get specific"],
    ["projects", "Find projects"],
    ["pledge", "Pledge"],
  ];
  const stepIdx = stepLabels.findIndex(([k]) => k === step);

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Hero */}
      <div className="max-w-3xl mx-auto px-4 pt-12 pb-6 text-center">
        <p className="text-teal-400 font-mono text-xs tracking-widest uppercase mb-2">
          Experiment · d/acc aligned
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
          Fund What <span className="text-teal-400">Matters</span>
        </h1>
        <p className="text-gray-400 text-sm max-w-lg mx-auto">
          Discover problems worth solving. Find others who care. Pool capital. We handle the rest.
        </p>
      </div>

      {/* Progress — clickable to jump back */}
      <div className="max-w-3xl mx-auto px-4 mb-6">
        <div className="flex items-center gap-1">
          {stepLabels.map(([key, label], i) => {
            const completed = i < stepIdx;
            const current = i === stepIdx;
            const canClick = completed;
            return (
              <div key={key} className="flex-1 flex items-center gap-1">
                <button
                  onClick={() => canClick && setStep(key)}
                  disabled={!canClick}
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                    current ? "bg-teal-500 text-black" : completed ? "bg-teal-500/60 text-black cursor-pointer hover:bg-teal-400" : "bg-gray-800 text-gray-600 cursor-default"
                  }`}
                >
                  {completed ? "✓" : i + 1}
                </button>
                {i < 4 && <div className={`flex-1 h-px ${i < stepIdx ? "bg-teal-500" : "bg-gray-800"}`} />}
              </div>
            );
          })}
        </div>
        <div className="flex mt-1">
          {stepLabels.map(([key, label], i) => {
            const canClick = i < stepIdx;
            return (
              <button
                key={key}
                onClick={() => canClick && setStep(key)}
                disabled={!canClick}
                className={`flex-1 text-[9px] text-left ${i <= stepIdx ? (canClick ? "text-gray-400 hover:text-teal-400 cursor-pointer" : "text-gray-400") : "text-gray-700 cursor-default"}`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 pb-20">

        {/* ─── STEP 1: QUADRANT ─── */}
        {step === "quadrant" && (
          <div>
            {/* Trending section */}
            <div className="mb-8">
              <h3 className="text-xs font-mono text-teal-400 uppercase tracking-wider mb-3">🔥 Trending</h3>
              <div className="flex flex-wrap gap-2">
                {trendingSubs.map(({ cat, sub, catIcon }) => (
                  <button key={sub.id}
                    onClick={() => {
                      const c = CATEGORIES.find((cc) => cc.subcategories.some((s) => s.id === sub.id));
                      if (c) {
                        setAttractor((prev) => ({ ...prev, quadrant: c.quadrant, category: c.id, subcategories: new Set([sub.id]) }));
                        setStep("elaborate");
                      }
                    }}
                    className="flex items-center gap-1.5 bg-[#14141f] border border-gray-800 rounded-full px-3 py-1.5 text-xs text-gray-300 hover:border-teal-500/30 transition-all"
                  >
                    <span>{catIcon}</span>
                    <span>{sub.name}</span>
                    <span className="text-teal-400 font-mono text-[10px]">↑{sub.interest}</span>
                  </button>
                ))}
              </div>
            </div>

            <h2 className="text-lg font-bold text-white mb-1">What area do you want to fund?</h2>
            <p className="text-gray-500 text-xs mb-4">
              Organized by the <a href="https://www.wtfisdacc.com/" target="_blank" className="text-teal-400 hover:underline">d/acc framework</a> — two axes, four quadrants.
            </p>

            {/* 2x2 grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {/* Axis labels */}
              <div className="col-span-2 flex justify-center">
                <span className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">← Survive · Thrive →</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {(Object.entries(QUADRANTS) as [keyof typeof QUADRANTS, typeof QUADRANTS[keyof typeof QUADRANTS]][]).map(([qid, q]) => {
                const cats = CATEGORIES.filter((c) => c.quadrant === qid);
                const totalInt = cats.reduce((s, c) => s + c.interest, 0);
                return (
                  <button key={qid}
                    onClick={() => { setAttractor((prev) => ({ ...prev, quadrant: qid, category: null, subcategories: new Set() })); setStep("category"); }}
                    className="text-left bg-[#14141f] rounded-xl p-4 border border-gray-800 hover:border-teal-500/30 transition-all"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl">{q.icon}</span>
                      <span className="font-semibold text-white text-sm">{q.name}</span>
                    </div>
                    <p className="text-[10px] font-mono text-gray-600 mb-2">{q.axis}</p>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {cats.slice(0, 3).map((c) => (
                        <span key={c.id} className="text-[10px] bg-gray-800 text-gray-500 px-1.5 py-0.5 rounded">{c.name}</span>
                      ))}
                      {cats.length > 3 && <span className="text-[10px] text-gray-600">+{cats.length - 3}</span>}
                    </div>
                    <span className="text-[10px] font-mono text-gray-500">{totalInt} interested</span>
                  </button>
                );
              })}
            </div>

            {/* The 4 D's */}
            <div className="mt-8 bg-[#14141f] rounded-xl p-4 border border-gray-800">
              <h3 className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-3">The Four D&apos;s — Every project is scored on:</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { d: "Defensive", q: "Easier to defend than attack?" },
                  { d: "Decentralized", q: "No trust in central actors?" },
                  { d: "Democratic", q: "More people participate?" },
                  { d: "Differential", q: "Defense grows faster than offense?" },
                ].map(({ d, q }) => (
                  <div key={d} className="flex gap-2">
                    <span className="text-teal-400 font-mono font-bold text-sm">D</span>
                    <div>
                      <p className="text-xs text-white font-semibold">{d}</p>
                      <p className="text-[10px] text-gray-500">{q}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ─── STEP 2: CATEGORY ─── */}
        {step === "category" && attractor.quadrant && (
          <div>
            <button onClick={goBack} className="text-gray-500 text-xs mb-4 hover:text-teal-400 flex items-center gap-1">← Back</button>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">{QUADRANTS[attractor.quadrant as keyof typeof QUADRANTS].icon}</span>
              <h2 className="text-lg font-bold text-white">{QUADRANTS[attractor.quadrant as keyof typeof QUADRANTS].name}</h2>
            </div>
            <p className="text-gray-500 text-xs mb-5">Pick a domain to fund.</p>
            <div className="space-y-2">
              {quadrantCategories.sort((a, b) => b.interest - a.interest).map((c) => (
                <button key={c.id}
                  onClick={() => { setAttractor((prev) => ({ ...prev, category: c.id, subcategories: new Set() })); setStep("elaborate"); }}
                  className="w-full text-left bg-[#14141f] rounded-xl p-4 border border-gray-800 hover:border-teal-500/30 transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{c.icon}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-white text-sm">{c.name}</h3>
                        {c.trending && <span className="text-[9px] bg-teal-500/15 text-teal-400 px-1.5 py-0.5 rounded-full font-mono">trending</span>}
                      </div>
                      <span className="text-xs text-gray-500 font-mono">{c.interest} funders interested</span>
                    </div>
                  </div>
                  <span className="text-gray-600">→</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ─── STEP 3: ELABORATE ─── */}
        {step === "elaborate" && selectedCategory && (
          <div>
            <button onClick={goBack} className="text-gray-500 text-xs mb-4 hover:text-teal-400 flex items-center gap-1">← Back</button>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">{selectedCategory.icon}</span>
              <h2 className="text-lg font-bold text-white">{selectedCategory.name}</h2>
            </div>
            <p className="text-gray-500 text-xs mb-5">What specifically? Pick focus areas or describe in your own words.</p>

            <div className="flex flex-wrap gap-2 mb-5">
              {selectedCategory.subcategories.map((s) => {
                const sel = attractor.subcategories.has(s.id);
                return (
                  <button key={s.id}
                    onClick={() => setAttractor((prev) => {
                      const next = new Set(prev.subcategories);
                      sel ? next.delete(s.id) : next.add(s.id);
                      return { ...prev, subcategories: next };
                    })}
                    className={`px-3 py-2 rounded-full text-xs font-medium transition-all ${sel ? "bg-teal-500/20 text-teal-400 border border-teal-500/40" : "bg-[#14141f] text-gray-400 border border-gray-700 hover:border-teal-500/30"}`}
                  >
                    {s.name}
                    <span className="ml-1 opacity-60">({s.interest})</span>
                    {s.trending && <span className="ml-1 text-teal-400">↑</span>}
                  </button>
                );
              })}
            </div>

            <textarea
              value={attractor.freeText}
              onChange={(e) => setAttractor((prev) => ({ ...prev, freeText: e.target.value }))}
              placeholder="Describe what you want to fund in your own words (optional)..."
              className="w-full bg-[#14141f] border border-gray-700 rounded-xl p-3 text-gray-200 text-sm placeholder-gray-600 focus:outline-none focus:border-teal-500/50 resize-none h-20 mb-5"
            />

            {/* Coalition signal */}
            <div className="bg-[#14141f] rounded-xl p-3 border border-gray-800 mb-5 flex items-center justify-between">
              <div>
                <p className="text-xs text-white font-semibold">{totalInterest} others interested</p>
                <p className="text-[10px] text-gray-500">{attractor.subcategories.size > 0 ? "in these focus areas" : "in this domain"}</p>
              </div>
              <div className="flex -space-x-1.5">
                {[...Array(Math.min(6, Math.max(1, Math.floor(totalInterest / 15))))].map((_, i) => (
                  <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-br from-teal-500/30 to-teal-700/30 border-2 border-[#0a0a0f] flex items-center justify-center text-[9px] text-teal-400">
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
                <div className="w-6 h-6 rounded-full bg-gray-800 border-2 border-[#0a0a0f] flex items-center justify-center text-[8px] text-gray-500">+{totalInterest}</div>
              </div>
            </div>

            <button onClick={() => setStep("projects")} className="w-full bg-teal-500/20 text-teal-400 border border-teal-500/30 py-3 rounded-xl font-semibold hover:bg-teal-500/30 transition-all text-sm">
              Find projects →
            </button>
          </div>
        )}

        {/* ─── STEP 4: PROJECTS ─── */}
        {step === "projects" && selectedCategory && (
          <div>
            <button onClick={goBack} className="text-gray-500 text-xs mb-4 hover:text-teal-400 flex items-center gap-1">← Back</button>
            <h2 className="text-lg font-bold text-white mb-1">Projects seeking funding</h2>
            <p className="text-gray-500 text-xs mb-5">Select projects to back. Each has a d/acc score.</p>

            {matchingProjects.length === 0 ? (
              <div className="bg-[#14141f] rounded-xl p-6 border border-gray-800 text-center">
                <p className="text-gray-400 text-sm mb-1">No projects match yet.</p>
                <p className="text-[10px] text-gray-600">When you pledge, builders will find you.</p>
              </div>
            ) : (
              <div className="space-y-2 mb-5">
                {matchingProjects.map((p) => {
                  const sel = attractor.selectedProjects.has(p.id);
                  const tierCls = p.daccScore >= 85 ? "bg-teal-500/15 text-teal-400" : p.daccScore >= 70 ? "bg-amber-500/15 text-amber-400" : "bg-gray-700/30 text-gray-400";
                  const tierLabel = p.daccScore >= 85 ? "Core d/acc" : p.daccScore >= 70 ? "Growth" : "Speculative";
                  return (
                    <button key={p.id}
                      onClick={() => setAttractor((prev) => { const n = new Set(prev.selectedProjects); sel ? n.delete(p.id) : n.add(p.id); return { ...prev, selectedProjects: n }; })}
                      className={`w-full text-left bg-[#14141f] rounded-xl p-4 border transition-all ${sel ? "border-teal-500/50 bg-teal-500/5" : "border-gray-800 hover:border-gray-600"}`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-semibold text-white text-sm">{p.name}</h3>
                            <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded-full ${tierCls}`}>{tierLabel} · {p.daccScore}</span>
                          </div>
                          <p className="text-[11px] text-gray-500 mt-0.5">{p.description}</p>
                        </div>
                        <div className={`w-5 h-5 rounded flex-shrink-0 border-2 flex items-center justify-center transition-all ${sel ? "border-teal-500 bg-teal-500" : "border-gray-600"}`}>
                          {sel && <span className="text-black text-[10px] font-bold">✓</span>}
                        </div>
                      </div>
                      <div className="flex gap-4 text-[10px] text-gray-500">
                        <span>💰 ${(p.raised / 1000).toFixed(0)}K raised</span>
                        <span>👥 {p.backers} backers</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            <button onClick={() => setStep("pledge")} className="w-full bg-teal-500/20 text-teal-400 border border-teal-500/30 py-3 rounded-xl font-semibold hover:bg-teal-500/30 transition-all text-sm">
              {attractor.selectedProjects.size > 0 ? `Pledge to ${attractor.selectedProjects.size} project${attractor.selectedProjects.size > 1 ? "s" : ""} →` : "Pledge to this domain →"}
            </button>
          </div>
        )}

        {/* ─── STEP 5: PLEDGE ─── */}
        {step === "pledge" && selectedCategory && (
          <div>
            <button onClick={goBack} className="text-gray-500 text-xs mb-4 hover:text-teal-400 flex items-center gap-1">← Back</button>
            <h2 className="text-lg font-bold text-white mb-1">Your attractor</h2>
            <p className="text-gray-500 text-xs mb-5">At 1 ETH threshold, this graduates to a live round.</p>

            {/* Summary */}
            <div className="bg-[#14141f] rounded-xl p-4 border border-gray-800 mb-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{selectedCategory.icon}</span>
                <div>
                  <h3 className="font-bold text-white text-sm">{selectedCategory.name}</h3>
                  <span className="text-[10px] font-mono text-gray-500">{QUADRANTS[selectedCategory.quadrant].name}</span>
                </div>
              </div>
              {attractor.subcategories.size > 0 && (
                <div className="flex flex-wrap gap-1 mb-2">
                  {selectedCategory.subcategories.filter((s) => attractor.subcategories.has(s.id)).map((s) => (
                    <span key={s.id} className="text-[10px] bg-teal-500/10 text-teal-400 px-2 py-0.5 rounded-full">{s.name}</span>
                  ))}
                </div>
              )}
              {attractor.freeText && <p className="text-xs text-gray-400 bg-[#1a1a2e] rounded-lg p-2 mb-2">&ldquo;{attractor.freeText}&rdquo;</p>}
              {attractor.selectedProjects.size > 0 && (
                <div className="space-y-1">
                  {PROJECTS.filter((p) => attractor.selectedProjects.has(p.id)).map((p) => (
                    <div key={p.id} className="flex items-center gap-1.5 text-xs"><span className="text-teal-500">•</span><span className="text-gray-300">{p.name}</span></div>
                  ))}
                </div>
              )}
            </div>

            {/* Stake amount selection */}
            <div className="mb-4">
              <label className="text-sm text-gray-400 block mb-2">Stake ETH to signal interest</label>
              <div className="grid grid-cols-4 gap-2">
                {["0.01", "0.1", "1", "10"].map((amt) => (
                  <button key={amt}
                    onClick={() => setAttractor((prev) => ({ ...prev, pledgeAmount: amt }))}
                    className={`py-3 rounded-xl text-center font-mono transition-all ${attractor.pledgeAmount === amt ? "bg-teal-500/20 text-teal-400 border-2 border-teal-500/50" : "bg-[#14141f] text-gray-400 border border-gray-700 hover:border-teal-500/30"}`}
                  >
                    <span className="text-lg font-bold block">{amt}</span>
                    <span className="text-[10px] text-gray-500">ETH</span>
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-gray-600 mt-2">
                🔶 Sepolia testnet — get free test ETH at{" "}
                <a href="https://sepoliafaucet.com" target="_blank" className="text-teal-400 hover:underline">sepoliafaucet.com</a>
              </p>
            </div>

            {/* How it works */}
            <div className="bg-[#14141f] rounded-xl p-4 border border-gray-800 mb-5">
              <h4 className="text-xs font-semibold text-white mb-2">How staking works</h4>
              <div className="space-y-1.5 text-[11px] text-gray-500">
                {[
                  "You stake testnet ETH on-chain as a signal of interest",
                  "Your attractor data is encoded in the transaction calldata",
                  "Other funders see your stake and join the coalition",
                  "At threshold → round launches, mechanism auto-selected",
                  "1% goes to Gitcoin. Outcomes feed back into the system.",
                ].map((t, i) => (
                  <div key={i} className="flex gap-2"><span className="text-teal-400">{i + 1}.</span><span>{t}</span></div>
                ))}
              </div>
            </div>

            {/* Transaction result */}
            {txHash && (
              <div className="bg-teal-500/10 border border-teal-500/30 rounded-xl p-4 mb-4">
                <p className="text-sm text-teal-400 font-semibold mb-1">✓ Stake submitted!</p>
                <a href={`https://sepolia.etherscan.io/tx/${txHash}`} target="_blank" className="text-xs text-teal-400 font-mono hover:underline break-all">
                  {txHash}
                </a>
              </div>
            )}
            {txError && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-4">
                <p className="text-sm text-red-400">{txError}</p>
              </div>
            )}

            {/* CTA */}
            <button
              onClick={() => attractor.pledgeAmount && stakeSignal(attractor.pledgeAmount)}
              disabled={!attractor.pledgeAmount || txPending}
              className={`w-full py-3.5 rounded-xl font-semibold text-base transition-all ${
                attractor.pledgeAmount && !txPending
                  ? "bg-teal-500 text-black hover:bg-teal-400"
                  : "bg-gray-800 text-gray-500 cursor-not-allowed"
              }`}
            >
              {txPending
                ? "⏳ Confirming in wallet…"
                : connecting
                  ? "Connecting wallet…"
                  : attractor.pledgeAmount
                    ? walletAddress
                      ? `Stake ${attractor.pledgeAmount} ETH on Sepolia`
                      : `Connect Wallet & Stake ${attractor.pledgeAmount} ETH`
                    : "Select an amount"}
            </button>
            {walletAddress && (
              <p className="text-center text-[10px] text-gray-500 mt-2">
                Connected as <span className="text-teal-400 font-mono">{truncateAddress(walletAddress)}</span> · Sepolia testnet
              </p>
            )}
            <p className="text-center text-[10px] text-gray-600 mt-1">Experimental prototype on Sepolia testnet.</p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-14 text-center">
          <p className="text-gray-600 text-[10px]">
            Built on the <a href="https://www.wtfisdacc.com/" target="_blank" className="text-teal-500/60 hover:text-teal-400">d/acc framework</a> by{" "}
            <a href="https://gitcoin.co" className="text-teal-500/60 hover:text-teal-400">Gitcoin</a>
          </p>
        </div>
      </div>
    </div>
  );
}
