"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useSyncExternalStore } from "react";
import { getLeadTrackingSnapshot } from "@/lib/lead-tracking";

const COOKIE_CONSENT_KEY = "cookie-consent-choice";
const COOKIE_CONSENT_EVENT = "gv-cookie-consent-changed";
const DEFAULT_GA_MEASUREMENT_ID = "G-ZCMY8FXL1N";

const measurementId =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || DEFAULT_GA_MEASUREMENT_ID;

type ConsentChoice = "accepted" | "rejected" | "undecided";
type GaDisableFlags = Record<`ga-disable-${string}`, boolean>;

type GenerateLeadEvent = {
  page_path: string;
  landing_page: string;
  form_name: "assessoria_comercial";
  lead_status: "mql" | "not_qualified";
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
};

type WhatsAppClickEvent = {
  page_path: string;
  landing_page: "materiais-impressos";
  button_location: string;
  button_text: string;
  contact_channel: "whatsapp";
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function readConsentChoice(): ConsentChoice {
  if (typeof window === "undefined") return "undecided";

  try {
    const choice = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    if (choice === "accepted" || choice === "rejected") return choice;
  } catch {
    return "undecided";
  }

  return "undecided";
}

function getServerConsentSnapshot(): ConsentChoice {
  return "undecided";
}

function subscribeToConsent(callback: () => void) {
  if (typeof window === "undefined") return () => {};

  function handleStorage(event: StorageEvent) {
    if (event.key === COOKIE_CONSENT_KEY) callback();
  }

  window.addEventListener(COOKIE_CONSENT_EVENT, callback);
  window.addEventListener("storage", handleStorage);
  return () => {
    window.removeEventListener(COOKIE_CONSENT_EVENT, callback);
    window.removeEventListener("storage", handleStorage);
  };
}

function setGaDisabled(measurementId: string, disabled: boolean) {
  (window as unknown as GaDisableFlags)[`ga-disable-${measurementId}`] = disabled;
}

function configureGa(measurementId: string) {
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag() {
      // The Google tag loader requires an Arguments object, not a rest-parameter Array.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer?.push(arguments);
    };

  setGaDisabled(measurementId, false);
  window.gtag("js", new Date());
  window.gtag("config", measurementId, { send_page_view: false });
}

function trackPageView(pagePath: string) {
  if (!measurementId || readConsentChoice() !== "accepted") return;

  configureGa(measurementId);
  window.gtag?.("event", "page_view", {
    page_path: pagePath,
    page_location: `${window.location.origin}${pagePath}`,
    page_title: document.title,
  });
}

export function trackGenerateLead(event: GenerateLeadEvent) {
  if (!measurementId || readConsentChoice() !== "accepted") return;

  configureGa(measurementId);
  window.gtag?.("event", "generate_lead", event);
}

function trackWhatsAppClick(event: WhatsAppClickEvent) {
  if (readConsentChoice() !== "accepted" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag?.("event", "whatsapp_click", event);
}

export function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const consentChoice = useSyncExternalStore(
    subscribeToConsent,
    readConsentChoice,
    getServerConsentSnapshot,
  );

  useEffect(() => {
    if (measurementId && consentChoice === "rejected") {
      setGaDisabled(measurementId, true);
    }
  }, [consentChoice]);

  const pagePath = useMemo(() => {
    const queryString = searchParams.toString();
    return queryString ? `${pathname}?${queryString}` : pathname;
  }, [pathname, searchParams]);

  useEffect(() => {
    if (consentChoice === "accepted") {
      trackPageView(pagePath);
    }
  }, [consentChoice, pagePath]);

  useEffect(() => {
    if (pathname !== "/materiais-impressos") return;

    function handleWhatsAppClick(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;

      const link = event.target.closest<HTMLAnchorElement>(
        "a[data-ga-whatsapp-click='true']",
      );
      if (!link) return;

      const params = new URLSearchParams(window.location.search);
      const tracking = getLeadTrackingSnapshot("/materiais-impressos");

      trackWhatsAppClick({
        page_path: window.location.pathname,
        landing_page: "materiais-impressos",
        button_location: link.dataset.gaWhatsappLocation || "unknown",
        button_text: link.dataset.gaWhatsappText || "falar_no_whatsapp",
        contact_channel: "whatsapp",
        utm_source: params.get("utm_source") || tracking.utmSource || undefined,
        utm_medium: params.get("utm_medium") || tracking.utmMedium || undefined,
        utm_campaign:
          params.get("utm_campaign") || tracking.utmCampaign || undefined,
        utm_content: params.get("utm_content") || tracking.utmContent || undefined,
        utm_term: params.get("utm_term") || tracking.utmTerm || undefined,
      });
    }

    document.addEventListener("click", handleWhatsAppClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleWhatsAppClick, {
        capture: true,
      });
    };
  }, [pathname]);

  const hasConsent = consentChoice === "accepted";
  if (!measurementId || !hasConsent) return null;

  return (
    <Script
      id="google-analytics-gtag"
      src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      strategy="afterInteractive"
    />
  );
}
