import type { Metadata } from "next";
import { Suspense } from "react";
import PreviewForm from "./PreviewForm";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function PreviewPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Suspense>
        <PreviewForm />
      </Suspense>
    </div>
  );
}
