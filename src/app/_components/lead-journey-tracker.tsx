"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  LEAD_TRACKING_CONSENT_EVENT,
  clearLeadTrackingStorage,
  recordLeadCta,
  recordLeadPageVisit,
  type LeadPageType,
} from "@/lib/lead-tracking";

function getPageType(pathname: string): LeadPageType {
  if (pathname === "/") return "home";
  if (pathname === "/sobre") return "sobre";
  if (pathname === "/blog") return "blog";
  if (pathname.startsWith("/blog/")) return "artigo";
  if (pathname === "/assessoria-comercial") return "assessoria-comercial";
  if (pathname === "/materiais-impressos") return "materiais-impressos";
  if (pathname.startsWith("/obrigado")) return "obrigado";
  return "outro";
}

function getArticleMetadata() {
  const article = document.querySelector<HTMLElement>(
    '[data-gv-page-type="artigo"]',
  );

  if (!article) return null;

  return {
    title: article.dataset.gvArticleTitle || document.title,
    slug: article.dataset.gvArticleSlug || "",
    category: article.dataset.gvArticleCategory || "",
  };
}

function recordCurrentPage(pathname: string) {
  const article = getArticleMetadata();
  recordLeadPageVisit({
    path: pathname,
    type: article ? "artigo" : getPageType(pathname),
    title: article?.title || document.title,
    ...(article?.slug ? { slug: article.slug } : {}),
    ...(article?.category ? { category: article.category } : {}),
  });
}

export function LeadJourneyTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => recordCurrentPage(pathname));
    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;

      const cta = event.target.closest<HTMLElement>("[data-gv-cta]");
      const label = cta?.dataset.gvCta;
      if (!cta || !label) return;

      const article = getArticleMetadata();
      recordLeadCta({
        label,
        path: window.location.pathname,
        ...(cta.dataset.gvSource ? { source: cta.dataset.gvSource } : {}),
        ...(article?.category ? { category: article.category } : {}),
        ...(article?.slug ? { article: article.slug } : {}),
      });
    }

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  useEffect(() => {
    function handleConsent(event: Event) {
      const choice = (event as CustomEvent<string>).detail;
      if (choice === "accepted") {
        recordCurrentPage(pathname);
      } else if (choice === "rejected") {
        clearLeadTrackingStorage();
      }
    }

    window.addEventListener(LEAD_TRACKING_CONSENT_EVENT, handleConsent);
    return () =>
      window.removeEventListener(LEAD_TRACKING_CONSENT_EVENT, handleConsent);
  }, [pathname]);

  return null;
}
