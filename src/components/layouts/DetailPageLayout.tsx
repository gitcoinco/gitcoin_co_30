import Link from "next/link";
import {
  ArrowLeft,
  Edit,
  ExternalLink,
  Twitter,
  Github,
  MessageCircle,
} from "lucide-react";
import { ReactNode, ComponentType } from "react";
import { Button, Badge, SearchBar } from "@/components/ui";
import CategoryIcon from "@/components/ui/CategoryIcon";
import ChladniBackground from "@/components/ChladniBackground";

interface BreadcrumbProps {
  href: string;
  label: string;
}

export function Breadcrumb({ href, label }: BreadcrumbProps) {
  return (
    <div className="bg-gray-950 border-b border-gray-600">
      <div className="container-page py-4">
        <Link
          href={href}
          className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-25 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {label}
        </Link>
      </div>
    </div>
  );
}

interface HeroImageProps {
  src: string;
  alt: string;
}

export function HeroImage({ src, alt }: HeroImageProps) {
  return (
    <div className="h-64 md:h-80 bg-gray-950 relative overflow-hidden">
      <img src={src} alt={alt} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-linear-to-t from-gray-950 to-gray-950/60" />
    </div>
  );
}

interface DetailPageLayoutProps {
  children: ReactNode;
}

export function DetailPageLayout({ children }: DetailPageLayoutProps) {
  return <div className="min-h-screen bg-gray-900">{children}</div>;
}

interface PageHeaderProps {
  children: ReactNode;
}

export function PageHeader({ children }: PageHeaderProps) {
  return (
    <section className="bg-gray-950 border-b border-gray-600">
      <div className="container-page py-12">{children}</div>
    </section>
  );
}

interface TwoColumnLayoutProps {
  content: ReactNode;
  sidebar: ReactNode;
}

export function TwoColumnLayout({ content, sidebar }: TwoColumnLayoutProps) {
  return (
    <div className="container-page py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">{content}</div>
        <aside className="space-y-6">{sidebar}</aside>
      </div>
    </div>
  );
}

// Shared sidebar components

interface TagsSectionProps {
  tags: string[];
}

export function TagsSection({ tags }: TagsSectionProps) {
  return (
    <div className="card">
      <h3 className="font-semibold text-gray-25 mb-4">Tags</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge key={tag} size="sm">
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
}

interface MetadataSectionProps {
  publishDate?: string;
  lastUpdated: string;
}

export function MetadataSection({
  publishDate,
  lastUpdated,
}: MetadataSectionProps) {
  return (
    <p className="text-sm text-gray-500 text-center">
      {publishDate && (
        <>
          Published: {new Date(publishDate).toLocaleDateString()}
          <br />
        </>
      )}
      Updated: {new Date(lastUpdated).toLocaleDateString()}
    </p>
  );
}

interface SuggestEditButtonProps {
  contentPath?: string;
}

export function SuggestEditButton({ contentPath }: SuggestEditButtonProps) {
  const href = contentPath
    ? `https://github.com/gitcoinco/gitcoin_co_30/edit/main/src/content/${contentPath}`
    : "/submit?edit=true";

  return (
    <div className="">
      <Button
        href={href}
        external={!!contentPath}
        variant="secondary"
        size="sm"
        className="w-full"
      >
        <ExternalLink className="w-4 h-4 mr-2" />
        Edit on GitHub
      </Button>
    </div>
  );
}

// Additional sidebar components

interface ExternalLink {
  title: string;
  url: string;
}

interface ExternalLinksSectionProps {
  title: string;
  links: ExternalLink[];
  icon?: ComponentType<{ className?: string }>;
}

export function ExternalLinksSection({
  title,
  links,
  icon: Icon,
}: ExternalLinksSectionProps) {
  if (links.length === 0) return null;

  return (
    <div className="card">
      <h3 className="font-semibold text-gray-25 mb-4 flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4" />}
        {title}
      </h3>
      <ul className="space-y-2">
        {links.map((link, i) => (
          <li key={i}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-25 transition-colors flex items-center gap-2 group"
            >
              <span className="flex-1">{link.title}</span>
              <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface SocialLinks {
  twitter?: string;
  github?: string;
  discord?: string;
}

interface SocialLinksSectionProps {
  links: SocialLinks;
}

export function SocialLinksSection({ links }: SocialLinksSectionProps) {
  const hasAnyLinks = links.twitter || links.github || links.discord;
  if (!hasAnyLinks) return null;

  return (
    <div className="card">
      <h3 className="font-semibold text-gray-25 mb-4">Links</h3>
      <div className="space-y-3">
        {links.twitter && (
          <a
            href={links.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-gray-500 hover:text-gray-25 transition-colors"
          >
            <Twitter className="w-5 h-5" />
            Twitter
          </a>
        )}
        {links.github && (
          <a
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-gray-500 hover:text-gray-25 transition-colors"
          >
            <Github className="w-5 h-5" />
            GitHub
          </a>
        )}
        {links.discord && (
          <a
            href={links.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-gray-500 hover:text-gray-25 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            Discord
          </a>
        )}
      </div>
    </div>
  );
}

// List page components

interface ListPageLayoutProps {
  children: ReactNode;
}

export function ListPageLayout({ children }: ListPageLayoutProps) {
  return <div className="min-h-screen bg-gray-900">{children}</div>;
}

interface ListPageHeaderProps {
  title: string;
  description?: string;
}

export function ListPageHeader({ title, description }: ListPageHeaderProps) {
  return (
    <section className="relative overflow-hidden -mt-[72px] pt-[72px] w-full">
      <ChladniBackground variant="3" opacity={0.5} />
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-900 to-transparent z-[1]" />
      <div className="relative z-10 pt-16 pb-28 w-full">
        <h1 className="text-3xl md:text-5xl font-heading text-gray-25 text-center font-light">
          {title}
        </h1>
    
        <p className="mt-4 text-center text-gray-200 max-w-2xl mx-auto sm:text-2xl font-serif">{description}</p>
      </div>
    </section>
  );
}

interface FilterOption {
  value: string;
  label: string;
}

interface FilterBarProps {
  filters: FilterOption[];
  activeFilter?: string;
}

export function FilterBar({ filters, activeFilter = "all" }: FilterBarProps) {
  return (
    <section className="bg-gray-950 border-b border-gray-600 sticky top-16 z-40">
      <div className="container-page py-4">
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter.value}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter.value === activeFilter
                  ? "bg-gray-25 text-gray-900"
                  : "bg-gray-800 text-gray-500 hover:bg-gray-500 hover:text-gray-25"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

interface ResultsBarProps {
  count: number;
  itemType: string;
  showSort?: boolean;
  sortOptions?: string[];
}

export function ResultsBar({
  count,
  itemType,
  showSort = true,
  sortOptions,
}: ResultsBarProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <p className="text-gray-500">
        Showing <span className="font-medium text-gray-25">{count}</span>{" "}
        {itemType}
      </p>
      {showSort && sortOptions && sortOptions.length > 0 && (
        <select className="px-4 py-2 rounded-lg border border-gray-600 bg-gray-950 text-gray-25 text-sm">
          {sortOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      )}
    </div>
  );
}

interface ItemsGridProps {
  children: ReactNode;
  columns?: 2 | 3;
}

export function ItemsGrid({ children, columns = 3 }: ItemsGridProps) {
  return (
    <div
      className={`grid md:grid-cols-2 ${columns === 3 ? "lg:grid-cols-3" : ""} gap-6`}
    >
      {children}
    </div>
  );
}

interface CTASectionProps {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
}

export function CTASection({
  title,
  description,
  buttonText,
  buttonHref,
}: CTASectionProps) {
  return (
    <section className="border-y border-teal-500 py-20 relative">
      <div className="pointer-events-none absolute inset-x-0 -top-4 h-4 bg-gradient-to-b from-transparent to-teal-500/30" />

      <div className="container-page text-center">
        <h2 className="text-2xl font-bold text-gray-25 mb-4">{title}</h2>
        <p className="font-serif text-gray-200 max-w-lg mb-6 mx-auto">
          {description}
        </p>
        <Button href={buttonHref} variant="primary">
          {buttonText}
        </Button>
      </div>
    </section>
  );
}
