import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui";
import { pageSeo } from "@/lib/page-seo";

export const metadata: Metadata = pageSeo.brand;

type AssetCard = {
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  preview: "wordmark" | "helmet" | "chladni";
  download?: boolean;
  reverse?: boolean;
};

const CHLADNI_PREVIEWS = [
  {
    src: "/assets/brand/chladni-1.png",
    alt: "Cellular Gitcoin brand background",
  },
  {
    src: "/assets/brand/chladni-2.png",
    alt: "Circular Gitcoin brand background",
  },
  {
    src: "/assets/brand/chladni-3.png",
    alt: "Organic Gitcoin brand background",
  },
] as const;

const assetCards: AssetCard[] = [
  {
    title: "Primary Logo",
    description:
      "For our logo, the wordmark is supreme. The wordmark should be used in almost all instances when representing the Gitcoin brand, unless a small or square size is required.",
    ctaLabel: "Download",
    ctaHref: "/assets/brand/wordmark-logo.zip",
    preview: "wordmark",
    download: true,
  },
  {
    title: "Gitcoin Helmet",
    description:
      "The helmet icon is to be used sparingly as a standalone detail or a feature. Consider it the Gitcoin signature for important occasions.",
    ctaLabel: "Download",
    ctaHref: "/assets/brand/helmet-logo.zip",
    preview: "helmet",
    download: true,
    reverse: true,
  },
  {
    title: "Assets",
    description:
      "Generate Gitcoin-aligned visuals in seconds. Use these assets to create graphics that stay consistent with the Gitcoin brand.",
    ctaLabel: "Generate Assets",
    ctaHref: "https://gitcoin.co/generator",
    preview: "chladni",
  },
];

function AssetPreviewFrame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex h-full items-center justify-center rounded-lg border border-gray-500 ${className}`}
    >
      {children}
    </div>
  );
}

function AssetDetails({
  title,
  description,
  ctaLabel,
  ctaHref,
  download,
}: Omit<AssetCard, "preview" | "reverse">) {
  return (
    <div className="flex h-full flex-col justify-center rounded-lg border border-gray-500 px-8 py-10 sm:px-12">
      <div className="max-w-[282px]">
        <h2 className="font-heading text-2xl font-normal leading-[30px] text-gray-100">
          {title}
        </h2>
        <p className="mt-1 font-serif text-base leading-normal text-gray-100">
          {description}
        </p>
        <Button
          href={ctaHref}
          variant="secondary"
          className="mt-8"
          download={download || undefined}
        >
          {ctaLabel}
        </Button>
      </div>
    </div>
  );
}

function AssetPreview({ preview }: Pick<AssetCard, "preview">) {
  if (preview === "wordmark") {
    return (
      <AssetPreviewFrame className="px-6 py-12">
        <div className="relative w-full max-w-[405px]">
          <Image
            src="/assets/brand/wordmark.svg"
            alt="Gitcoin wordmark"
            width={405}
            height={72}
            className="h-auto w-full transition-transform duration-300 hover:scale-[0.97]"
            priority
          />
        </div>
      </AssetPreviewFrame>
    );
  }

  if (preview === "helmet") {
    return (
      <AssetPreviewFrame className="px-6 py-12">
        <Image
          src="/assets/brand/helmet.svg"
          alt="Gitcoin helmet"
          width={131}
          height={158}
          className="h-auto w-[110px] transition-transform duration-300 hover:scale-[0.97] sm:w-[131px]"
        />
      </AssetPreviewFrame>
    );
  }

  return (
    <div className="rounded-lg border border-gray-500 px-4 py-4 sm:px-[27px] sm:py-[20px]">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {CHLADNI_PREVIEWS.map((image) => (
          <div
            key={image.src}
            className="relative aspect-[210/258] overflow-hidden rounded-lg"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 640px) 100vw, 210px"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BrandPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-25">
      <section className="mx-auto w-full max-w-[1099px] px-4 pb-20 pt-16 sm:px-6 sm:pt-24 lg:px-0">
        <div className="max-w-[832px]">
          <h1 className="font-heading text-[44px] leading-[0.96] sm:text-[60px]">
            <span className="block font-bold text-teal-500">Our</span>
            <span className="block font-light text-teal-50">Brand Assets</span>
          </h1>
          <p className="mt-4 max-w-[307px] font-serif text-lg leading-[1.25] text-gray-100 sm:text-[20px]">
            Download our core brand assets, including logos and banners.
          </p>
        </div>

        <div className="mt-14 space-y-4 sm:mt-20">
          {assetCards.map((card) => (
            <div
              key={card.title}
              className={`grid gap-4 lg:grid-cols-[398px_minmax(0,700px)] ${card.reverse ? "lg:grid-flow-dense" : ""}`}
            >
              <div className={card.reverse ? "lg:col-start-2" : ""}>
                <AssetDetails {...card} />
              </div>
              <div className={card.reverse ? "lg:col-start-1 lg:row-start-1" : ""}>
                <AssetPreview preview={card.preview} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
