"use client";

import { useState } from "react";
import Image from "next/image";

const partners = [
  { name: "Polygon", logo: "/assets/partner/polygon.png" },
  { name: "Sei", logo: "/assets/partner/sei.svg" },
  { name: "Avalanche", logo: "/assets/partner/avalanche.svg" },
  { name: "Optimism", logo: "/assets/partner/optimism.svg" },
  { name: "Arbitrum", logo: "/assets/partner/arbitrum.svg" },
  { name: "Uniswap", logo: "/assets/partner/uniswap.svg" },
];

export default function PartnerClient() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    // HubSpot hs-script-loader intercepts and submits the form data automatically.
    // We just wait briefly to let its request finish before showing success.
    setTimeout(() => {
      setSubmitted(true);
      setSubmitting(false);
    }, 1200);
  }

  return (
    <div className="bg-gray-900 text-gray-25">
      {/* Hero */}
      <section className="mx-auto w-full max-w-[1166px] px-4 pt-10 pb-12 sm:px-6 lg:px-0">
        <div className="rounded-2xl border border-gray-300/40 px-8 py-14 sm:px-14 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-transparent to-transparent pointer-events-none" />
          <div className="relative z-10 max-w-xl">
            <p className="text-xs font-mono uppercase tracking-widest text-teal-500 mb-4">
              Partner with Gitcoin
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-normal leading-[1.12] text-gray-25 mb-4">
              Fund what{" "}
              <span className="text-teal-500 font-extrabold">matters most</span>{" "}
              to your ecosystem
            </h1>
            <p className="text-gray-400 font-serif leading-relaxed">
              Run a community round, sponsor a matching pool, or co-fund public
              goods with Gitcoin. Get in touch and we&apos;ll explore the
              possibilities.
            </p>
          </div>
        </div>
      </section>

      {/* Two-column: form + partners */}
      <section className="mx-auto w-full max-w-[1166px] px-4 pb-20 sm:px-6 lg:px-0">
        <div className="grid lg:grid-cols-[1fr_400px] gap-6 items-start">
          {/* Contact form */}
          <div className="rounded-2xl border border-gray-300/40 px-8 py-10">
            <h2 className="text-xl font-heading font-semibold text-gray-25 mb-6">
              Contact
            </h2>
            {submitted ? (
              <div className="rounded-xl border border-teal-500/30 bg-teal-500/5 px-6 py-8 text-center">
                <p className="text-teal-400 font-mono font-semibold text-lg mb-2">
                  Thank you!
                </p>
                <p className="text-gray-400 font-serif text-sm leading-relaxed">
                  A member of our team will review your details and get back to
                  you if there&apos;s a potential fit. We look forward to
                  exploring the possibilities.
                </p>
              </div>
            ) : (
              <form
                id="wf-form-Partner-Lead-Form"
                className="contact2_form flex flex-col gap-5"
                onSubmit={handleSubmit}
              >
                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-mono uppercase tracking-widest text-gray-400">
                    Name <span className="text-teal-500">*</span>
                  </span>
                  <input
                    type="text"
                    name="firstName"
                    required
                    placeholder="Your name"
                    className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-gray-25 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder:text-gray-600"
                  />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-mono uppercase tracking-widest text-gray-400">
                    Email <span className="text-teal-500">*</span>
                  </span>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="you@example.com"
                    className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-gray-25 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder:text-gray-600"
                  />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-mono uppercase tracking-widest text-gray-400">
                    Anything else you would like us to know before we contact you?
                  </span>
                  <textarea
                    name="PF-Message"
                    rows={5}
                    placeholder="Type your message..."
                    className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-gray-25 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder:text-gray-600 resize-y"
                  />
                </label>
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-teal-500 text-gray-900 font-mono font-semibold rounded-lg px-6 py-3 hover:bg-teal-400 self-start disabled:opacity-60"
                  style={{ transition: "all 400ms ease" }}
                >
                  {submitting ? "Submitting…" : "Submit"}
                </button>
              </form>
            )}
          </div>

          {/* Right column: partners */}
          <div className="rounded-2xl border border-gray-300/40 px-8 py-8">
            <h2 className="text-base font-heading font-semibold text-gray-25 mb-2">
              Trusted by leading protocols
            </h2>
            <p className="text-sm text-gray-400 font-serif mb-6 leading-relaxed">
              We partner with some of the most impactful organisations fuelling
              the future of open source software and public goods.
            </p>
            <div className="grid grid-cols-3 gap-4">
              {partners.map((p) => (
                <div
                  key={p.name}
                  className="flex items-center justify-center h-12 rounded-lg bg-gray-800/60 px-3"
                >
                  <Image
                    src={p.logo}
                    alt={p.name}
                    width={80}
                    height={28}
                    className="object-contain max-h-7 w-auto"
                    style={{ filter: "brightness(0) invert(1)" }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
