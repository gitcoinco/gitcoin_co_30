import { Metadata } from "next";
import { ListPageLayout, ListPageHeader } from "@/components/layouts";
import { AdminClient } from "./AdminClient";

export const metadata: Metadata = {
  title: "d/ACC Coalition Builder - Admin Analytics",
  description: "Attractor visualizations for the d/ACC coalition builder.",
};

export default function AdminPage() {
  return (
    <ListPageLayout>
      <ListPageHeader
        title="Coalition Analytics"
        description="Where are attractors forming?"
      />
      <AdminClient />
    </ListPageLayout>
  );
}
