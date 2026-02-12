import Button from "./Button";

export default function SectionHeader({
  title,
  subtitle,
  href,
}: {
  title: string;
  subtitle?: string;
  href?: string;
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 className="text-[30px] leading-9 tracking-[0.012em] text-gray-25">
          {title}
        </h2>
        <p className="mt-2 text-sm text-gray-300 font-serif">{subtitle}</p>
      </div>

      {href ? (
        <Button
          href={href}
          variant="ghost"
          className="text-right font-semibold"
        >
          View All →
        </Button>
      ) : (
        ""
      )}
    </div>
  );
}
