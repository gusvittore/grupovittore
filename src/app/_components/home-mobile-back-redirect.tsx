"use client";

import { useEffect } from "react";

const REDIRECT_SESSION_KEY = "grupoVittoreHomeMobileBackRedirectDone";
const ARMED_HISTORY_STATE_KEY = "grupoVittoreHomeMobileBackRedirectArmed";
const MOBILE_QUERY = "(max-width: 767px)";
const REDIRECT_DESTINATION = "/materiais-impressos";

export function HomeMobileBackRedirect() {
  useEffect(() => {
    if (
      window.location.pathname !== "/" ||
      !window.matchMedia(MOBILE_QUERY).matches
    ) {
      return;
    }

    try {
      if (window.sessionStorage.getItem(REDIRECT_SESSION_KEY) === "true") {
        return;
      }
    } catch {
      return;
    }

    const handlePopState = () => {
      try {
        if (window.sessionStorage.getItem(REDIRECT_SESSION_KEY) === "true") {
          return;
        }
        window.sessionStorage.setItem(REDIRECT_SESSION_KEY, "true");
      } catch {
        return;
      }

      window.location.replace(REDIRECT_DESTINATION);
    };

    window.addEventListener("popstate", handlePopState);

    const currentState =
      typeof window.history.state === "object" && window.history.state !== null
        ? window.history.state
        : {};

    if (currentState[ARMED_HISTORY_STATE_KEY] !== true) {
      window.history.pushState(
        { ...currentState, [ARMED_HISTORY_STATE_KEY]: true },
        "",
        window.location.href,
      );
    }

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return null;
}
