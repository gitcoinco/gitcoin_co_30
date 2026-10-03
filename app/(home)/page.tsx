```tsx
import { type Metadata } from "next";

import { CtaBanner } from "@/components/cta-banner";
import { MechanismCards } from "@/components/mechanisms";
import { PageHeader } from "@/components/page-header";
import { Section } from "@/components/section";

export const metadata: Metadata = {
  title: "Gitcoin Mechanisms",
};

export default function HomePage() {
  return (
    <>
      <Section className="py-16 md:py-24">
        <PageHeader
          badge="Discover"
          title="Gitcoin Mechanisms"
          description="Explore funding mechanisms designed to solve collective action problems."
        />
      </Section>

      <Section>
        <MechanismCards />
      </Section>

      <Section>
        <CtaBanner
          title="Ready to build?"
          description="Learn how to implement mechanisms in your organization."
          href="/mechanisms/create"
          buttonText="Get Started"
        />
      </Section>
    </>
  );
}
