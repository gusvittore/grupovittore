"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useSyncExternalStore } from "react";

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
    function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
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
