"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";

const STORAGE_KEY = "cookie-consent-choice";

type ConsentChoice = "accepted" | "rejected";
type ConsentSnapshot = ConsentChoice | "undecided" | "pending";

function subscribe() {
  return () => {};
}

function getSnapshot(): ConsentSnapshot {
  if (typeof window === "undefined") {
    return "pending";
  }

  try {
    const savedChoice = window.localStorage.getItem(STORAGE_KEY);
    if (savedChoice === "accepted" || savedChoice === "rejected") {
      return savedChoice;
    }
  } catch {
    return "undecided";
  }

  return "undecided";
}

function getServerSnapshot(): ConsentSnapshot {
  return "pending";
}

export function CookieConsent() {
  const storedChoice = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const [dismissedChoice, setDismissedChoice] = useState<ConsentChoice | null>(null);

  function persistChoice(nextChoice: ConsentChoice) {
    try {
      window.localStorage.setItem(STORAGE_KEY, nextChoice);
    } catch {
      // If storage is unavailable, the visible preference is still respected for this render.
    }

    setDismissedChoice(nextChoice);
  }

  if (
    storedChoice === "pending" ||
    storedChoice === "accepted" ||
    storedChoice === "rejected" ||
    dismissedChoice
  ) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[60] px-4 pb-4 sm:inset-x-auto sm:right-6 sm:w-[min(520px,calc(100vw-48px))] sm:px-0 sm:pb-6 lg:right-8 lg:pb-8">
      <div className="pointer-events-auto ml-auto w-full rounded-[22px] border border-[#b29157]/30 bg-[#fbf8f4]/96 p-5 text-[#071026] shadow-[0_22px_60px_rgba(0,0,0,0.18)] backdrop-blur-xl sm:p-6">
        <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-[#9a671e] sm:text-sm">
          Privacidade e cookies
        </p>
        <p className="mt-3 text-sm leading-7 text-[#24334d] sm:text-base sm:leading-8">
          Usamos cookies para melhorar sua experiência, analisar a navegação e apoiar nossas ações de comunicação. Ao continuar, você concorda com nossa{" "}
          <Link
            href="/politicas-de-privacidade"
            className="font-semibold text-[#8a5b18] underline decoration-[#b29157]/55 underline-offset-4 transition hover:text-[#6c4614]"
          >
            Política de Privacidade
          </Link>
          .
        </p>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => persistChoice("rejected")}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#b29157]/45 px-5 text-xs font-extrabold uppercase tracking-[0.11em] text-[#6c4614] transition hover:bg-[#efe6d8] sm:min-h-12 sm:text-sm"
          >
            Recusar
          </button>
          <button
            type="button"
            onClick={() => persistChoice("accepted")}
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#031126] px-6 text-xs font-extrabold uppercase tracking-[0.11em] text-[#e3ad51] transition hover:bg-[#0b1d38] sm:min-h-12 sm:text-sm"
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  );
}
