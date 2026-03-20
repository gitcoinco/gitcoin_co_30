import type { Metadata } from "next";
import { pageSeo } from "@/lib/page-seo";
import PartnerClient from "./PartnerClient";

export const metadata: Metadata = pageSeo.partner;

export default function PartnerPage() {
  return <PartnerClient />;
}
