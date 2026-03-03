"use client";

import { Button } from "@/components/ui";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4 text-center">
      <h1 className="text-2xl font-bold text-gray-25">Something went wrong</h1>
      <p className="text-gray-400 max-w-md">
        An unexpected error occurred. Try refreshing the page or going back.
      </p>
      <div className="flex gap-3">
        <Button onClick={reset}>Try again</Button>
        <Button variant="secondary" href="/">
          Go home
        </Button>
      </div>
    </div>
  );
}
