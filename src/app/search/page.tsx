import { Metadata } from "next";
import { Suspense } from "react";
import SearchBridge from "./SearchBridge";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function SearchPage() {
  return (
    <Suspense>
      <SearchBridge />
    </Suspense>
  );
}
