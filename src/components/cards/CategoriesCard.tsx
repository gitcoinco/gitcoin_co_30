import Link from "next/link";

export interface CategoriesCardData {
  title: string;
  count: string;
  description: string;
  examples: string;
  href: string;
}

interface CategoriesCardProps {
  card: CategoriesCardData;
  className?: string;
}

export default function CategoriesCard({
  card,
  className = "",
}: CategoriesCardProps) {
  return (
    <Link href={card.href} className={className}>
      <article
        className="group flex h-[280px] flex-col gap-[15px] rounded-2xl border border-gray-700 bg-gray-900 px-[27px] py-[34px] transition-all duration-300 hover:border-transparent hover:bg-[linear-gradient(180deg,#1c1a17_94.231%,#02e2ac_100%)] hover:shadow-[0_0_12px_0_rgba(2,226,172,0.6)]"
        data-node-id="437:354"
      >
        <div className="flex items-center gap-[15px]">
          <h3 className="text-[32px] font-extrabold leading-none tracking-[0.64px] text-gray-25 font-heading">
            {card.title}
          </h3>
          <p className="text-sm leading-none text-gray-500 font-mono">
            {card.count}
          </p>
        </div>

        <p className="w-[250px] text-sm text-[#d6d3cd] font-serif">
          {card.description}
        </p>

        <div className="mt-auto border-t border-gray-700 pt-[17px]">
          <p className="text-sm leading-none text-gray-500 font-mono">
            Examples:
          </p>
          <p className="mt-[5px] w-[323px] text-sm text-gray-300 font-mono">
            {card.examples}
          </p>
        </div>
      </article>
    </Link>
  );
}
