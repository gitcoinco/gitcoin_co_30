import type { Metadata } from "next";
import { pageSeo } from "@/lib/page-seo";
import HubSpotForm from "@/components/HubSpotForm";

export const metadata: Metadata = pageSeo.updates;

export default function UpdatesPage() {
  return (
    <div className="bg-gray-900 text-gray-25 min-h-[70vh]">
      <section className="mx-auto w-full max-w-[1166px] px-4 pt-16 pb-24 sm:px-6 lg:px-0 flex flex-col items-center">
        <div className="text-center mb-10 max-w-lg">
          <p className="text-xs font-mono uppercase tracking-widest text-teal-500 mb-4">
            Newsletter
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-normal leading-[1.12] text-gray-25 mb-4">
            Get updates{" "}
            <span className="text-teal-500 font-extrabold">in your inbox</span>
          </h1>
          <p className="text-gray-400 font-serif leading-relaxed">
            We&apos;ll share key updates and announcements with you.
          </p>
        </div>

        <div className="w-full max-w-md rounded-2xl border border-gray-300/40 bg-gray-800/30 px-8 py-10">
          <HubSpotForm
            portalId="21870089"
            formId="72986fd8-0b97-4b96-aeab-ada3bfa90be2"
            formInstanceId="hs-form-popup"
          />
        </div>
      </section>
    </div>
  );
}
