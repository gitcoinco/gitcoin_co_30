import { Metadata } from "next";
import { Suspense } from "react";
import { pageSeo } from "@/lib/page-seo";
import SubmitContent from "./SubmitContent";

export const metadata: Metadata = pageSeo.submit;

export default function SubmitPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Suspense
        fallback={
          <div className="container-page py-12">
            <p className="text-gray-500">Loading...</p>
          </div>
        }
      >
        <SubmitContent />
      </Suspense>
    </div>
  );
}
