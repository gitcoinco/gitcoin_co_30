import { Suspense } from "react";
import SearchBridge from "./SearchBridge";

export default function SearchPage() {
  return (
    <Suspense>
      <SearchBridge />
    </Suspense>
  );
}
