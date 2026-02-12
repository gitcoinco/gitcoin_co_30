import { Suspense } from "react";
import PreviewForm from "./PreviewForm";

export default function PreviewPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Suspense>
        <PreviewForm />
      </Suspense>
    </div>
  );
}
