import type { Metadata } from "next";
import CoalitionalFundingTool from "./CoalitionalFundingTool";

export const metadata: Metadata = {
  title: "d/acc Coalition Builder | Gitcoin",
  description:
    "Discover d/acc-aligned projects, form coalitions, and stake ETH to signal interest. Built on the d/acc framework.",
};

export default function DaccCoalitionBuilderPage() {
  return <CoalitionalFundingTool />;
}
