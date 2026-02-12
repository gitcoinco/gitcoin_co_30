import { Button } from "../ui";

export default function ContributeCard({
  showGuidelinesLink = true,
  showSubmitButton = true,
}: {
  showGuidelinesLink?: boolean;
  showSubmitButton?: boolean;
}) {
  return (
    <div className="mx-auto text-center">
      <h3 className="text-2xl leading-8 mb-3">Ready to Contribute?</h3>
      <p className="font-serif text-gray-200 max-w-lg mx-auto">
        Start with something you know well. Share your expertise and help build
        the definitive resource for Ethereum funding.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-8">
        {showSubmitButton && (
          <Button href="/submit" variant="primary">
            Submit an Entry
          </Button>
        )}
        {showGuidelinesLink && (
          <Button href="/contribute" variant="secondary">
            View Guidelines
          </Button>
        )}
      </div>
    </div>
  );
}
