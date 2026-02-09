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

interface BreadcrumbProps {
  href: string;
  label: string;
}

export function Breadcrumb({ href, label }: BreadcrumbProps) {
  return (
    <div className="bg-gray-950 border-b border-gray-800">
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
    <section className="bg-gray-950 border-b border-gray-800">
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

export function SuggestEditButton() {
  return (
    <div className="card !p-0">
      <Button href="/submit?edit=true" variant="ghost" className="w-full">
        <Edit className="w-4 h-4 mr-2" />
        Suggest Edit
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
  description: string;
  searchPlaceholder: string;
  icon: string;
}

export function ListPageHeader({
  title,
  description,
  searchPlaceholder,
  icon,
}: ListPageHeaderProps) {
  return (
    <section className="bg-gray-950 border-b border-gray-800">
      <div className="container-page py-12 flex gap-6 sm:gap-12 items-center">
        <div className="icon-hover-container w-24 h-16 sm:h-40 sm:w-60">
          <CategoryIcon
            src={icon}
            alt={`${title} icon`}
            className="w-24 h-16  sm:h-40 sm:w-60"
          />
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-xl md:text-4xl heading text-gray-25">{title}</h1>
          <div className="sm:block hidden">
            <p className="text-lg text-gray-500 max-w-3xl mb-8">
              {description}
            </p>
            <SearchBar placeholder={searchPlaceholder} className="max-w-xl" />
          </div>
        </div>
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
    <section className="bg-gray-950 border-b border-gray-800 sticky top-16 z-40">
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
        <select className="px-4 py-2 rounded-lg border border-gray-800 bg-gray-950 text-gray-25 text-sm">
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
}

export function ItemsGrid({ children }: ItemsGridProps) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{children}</div>
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
    <section className="section bg-gray-950">
      <div className="container-page text-center">
        <h2 className="text-2xl font-bold text-gray-25 mb-4">{title}</h2>
        <p className="text-gray-500 mb-6 max-w-xl mx-auto">{description}</p>
        <a href={buttonHref} className="btn-primary inline-flex">
          {buttonText}
        </a>
      </div>
    </section>
  );
}
