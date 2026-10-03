```tsx
"use client";

import { useEffect, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { apiRequest } from "@/lib/api";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Mechanism {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export function getMechanismSlugFromId(id: string): string | null {
  const match = id.match(/^(.+)-\d+$/);
  return match ? match[1] : null;
}

function MechanismCard({ mechanism }: { mechanism: Mechanism }) {
  return (
    <a href={`/mechanisms/${mechanism.slug}`}>
      <Card className="group h-full transition-all hover:border-primary/50 hover:shadow-lg cursor-pointer">
        <CardContent className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {mechanism.category}
                </span>
              </div>
              <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                {mechanism.name}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {mechanism.description}
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-end">
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(mechanism.createdAt), {
                addSuffix: true,
                locale: ptBR,
              })}
            </span>
          </div>
        </CardContent>
      </Card>
    </a>
  );
}

function MechanismCardSkeleton() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-3">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <div className="mt-4 flex justify-end">
          <Skeleton className="h-4 w-24" />
        </div>
      </CardContent>
    </Card>
  );
}

export function MechanismCards() {
  const [mechanisms, setMechanisms] = useState<Mechanism[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMechanisms() {
      try {
        const data = await apiRequest("/api/mechanisms");
        // Sort by newest first (by createdAt date)
        const sorted = data.sort((a: Mechanism, b: Mechanism) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setMechanisms(sorted);
      } catch (error) {
        console.error("Failed to fetch mechanisms:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMechanisms();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <MechanismCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {mechanisms.map((mechanism) => (
        <MechanismCard key={mechanism.id} mechanism={mechanism} />
      ))}
    </div>
  );
}
