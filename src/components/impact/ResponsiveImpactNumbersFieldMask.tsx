import ImpactNumbersField from "@/components/impact/ImpactNumbersField";

const desktopMaskSvg = encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="1096" height="250" viewBox="0 0 1096 250">
    <rect width="1096" height="250" fill="transparent" />
    <rect x="0" y="0" width="250" height="250" rx="16" fill="white" />
    <rect x="282" y="0" width="250" height="250" rx="16" fill="white" />
    <rect x="564" y="0" width="250" height="250" rx="16" fill="white" />
    <rect x="846" y="0" width="250" height="250" rx="16" fill="white" />
  </svg>
`);

const mobileMaskSvg = encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="1096" height="613" viewBox="0 0 1096 613">
    <rect width="1096" height="613" fill="transparent" />
    <rect x="0" y="0" width="532" height="250" rx="16" fill="white" />
    <rect x="564" y="0" width="532" height="250" rx="16" fill="white" />
    <rect x="0" y="363" width="532" height="250" rx="16" fill="white" />
    <rect x="564" y="363" width="532" height="250" rx="16" fill="white" />
  </svg>
`);

const desktopMask = `url("data:image/svg+xml,${desktopMaskSvg}")`;
const mobileMask = `url("data:image/svg+xml,${mobileMaskSvg}")`;

export default function ResponsiveImpactNumbersFieldMask() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[613px] sm:hidden"
        style={{
          WebkitMaskImage: mobileMask,
          maskImage: mobileMask,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskSize: "100% 100%",
          maskSize: "100% 100%",
        }}
      >
        <ImpactNumbersField className="size-full" />
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 top-0 hidden h-[250px] sm:block"
        style={{
          WebkitMaskImage: desktopMask,
          maskImage: desktopMask,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskSize: "100% 100%",
          maskSize: "100% 100%",
        }}
      >
        <ImpactNumbersField className="size-full" />
      </div>
    </>
  );
}
