import { Metadata } from "next";
import { ListPageLayout, ListPageHeader } from "@/components/layouts";
import { CoalitionsClient } from "./CoalitionsClient";

export const metadata: Metadata = {
  title: "d/acc Coalition Builder",
  description:
    "Map the coordination space. Discover domains, signal interest, and find your coalition through the d/acc lens.",
};

export default function CoalitionsPage() {
  return (
    <ListPageLayout>
      <ListPageHeader
        title="d/acc Coalition Builder"
        description="Map the problem space, find allies, form coalitions, deploy targeted capital"
      />
      <CoalitionsClient />
    </ListPageLayout>
  );
}
