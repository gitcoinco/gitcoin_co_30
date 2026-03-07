import type { Metadata } from "next";
import CoalitionalFundingTool from "./CoalitionalFundingTool";

export const metadata: Metadata = {
  title: "Coalitional Funding Cartography | Gitcoin",
  description:
    "Discover the right funding mechanism, find your coalition, and deploy capital together. A cartography tool for coordination.",
};

export default function CoalitionalFundingPage() {
  return <CoalitionalFundingTool />;
}
