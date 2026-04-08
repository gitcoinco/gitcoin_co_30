"use client";

import Script from "next/script";
import { useRef } from "react";

interface HubSpotFormProps {
  portalId: string;
  formId: string;
  formInstanceId?: string;
  /** Optional extra CSS class on the container div */
  className?: string;
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    hbspt?: { forms: { create: (opts: Record<string, unknown>) => void } };
  }
}

export default function HubSpotForm({
  portalId,
  formId,
  formInstanceId,
  className = "",
}: HubSpotFormProps) {
  const containerId = `hs-form-${formId.slice(0, 8)}`;
  const created = useRef(false);

  function createForm() {
    if (created.current || !window.hbspt) return;
    created.current = true;
    window.hbspt.forms.create({
      region: "na1",
      portalId,
      formId,
      ...(formInstanceId ? { formInstanceId } : {}),
      target: `#${containerId}`,
    });
  }

  return (
    <>
      <Script
        src="//js.hsforms.net/forms/embed/v2.js"
        strategy="afterInteractive"
        onLoad={createForm}
      />
      <div id={containerId} className={className} />
    </>
  );
}
