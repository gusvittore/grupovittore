"use client";

import type { MouseEvent, ReactNode } from "react";

type InstagramSocialLinkProps = {
  username: string;
  href: string;
  ariaLabel: string;
  className: string;
  children: ReactNode;
};

const MOBILE_QUERY = "(max-width: 767px)";
const FALLBACK_DELAY_MS = 1200;

export function InstagramSocialLink({
  username,
  href,
  ariaLabel,
  className,
  children,
}: InstagramSocialLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      !window.matchMedia(MOBILE_QUERY).matches
    ) {
      return;
    }

    event.preventDefault();

    function cleanup() {
      window.clearTimeout(fallbackTimer);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    }

    function handleVisibilityChange() {
      if (document.hidden) cleanup();
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);
    const fallbackTimer = window.setTimeout(() => {
      cleanup();
      window.location.assign(href);
    }, FALLBACK_DELAY_MS);

    try {
      window.location.href = `instagram://user?username=${encodeURIComponent(username)}`;
    } catch {
      cleanup();
      window.location.assign(href);
    }
  }

  return (
    <a
      href={href}
      aria-label={ariaLabel}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
