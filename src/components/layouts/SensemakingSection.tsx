import type { Research } from '@/lib/types'
import { ResearchCard } from '@/components/cards'

interface SensemakingSectionProps {
  article: Research | undefined
}

export default function SensemakingSection({ article }: SensemakingSectionProps) {
  if (!article) return null

  return (
    <section className="mb-16 md:mb-24 mt-3 pb-0">
      <div className="container-page">
        <h2 className="mb-6 text-2xl font-bold text-gray-25 md:text-3xl">
          Sensemaking
        </h2>
        <ResearchCard research={article} variant="sensemaking" />
      </div>
    </section>
  );
}
