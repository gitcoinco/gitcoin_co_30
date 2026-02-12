import Link from "next/link";
import { Home, Search, ArrowLeft } from "lucide-react";
import { Button, SearchBar } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="max-w-md mx-auto px-4">
        <div className=" mb-4">Erm... THIS IS AWKWARD</div>
        <h1 className="text-2xl sm:text-4xl font-bold text-gray-25 mb-4 font-heading">Page not found</h1>
        <p className="text-gray-100 mb-8">
          Looks like the page you are looking for has been moved or removed.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button href="/" variant="primary">
            <Home className="w-4 h-4 mr-2" />
            Go Home
          </Button>

          <SearchBar placeholder="Search..." size="sm" />
        </div>
      </div>
    </div>
  );
}
