"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const body = document.body;
    body.classList.add("reveal-ready");

    const syncScrollState = () => {
      body.classList.toggle("has-scrolled", window.scrollY > 12);
    };

    syncScrollState();

    const observedTargets = new WeakSet<HTMLElement>();
    let observer: IntersectionObserver | null = null;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((target) => {
        target.classList.add("is-visible");
      });
      return;
    }

    const attachTargets = () => {
      const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"))
        .filter((target) => !target.closest("[data-no-reveal]"));

      if (targets.length === 0) {
        return;
      }

      if (!observer) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
              }
            });
          },
          {
            threshold: 0.12,
            rootMargin: "0px 0px -6% 0px",
          },
        );
      }

      targets.forEach((target) => {
        if (observedTargets.has(target)) {
          return;
        }

        observedTargets.add(target);
        observer?.observe(target);
      });
    };

    attachTargets();

    const fallbackTimer = window.setTimeout(() => {
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((target) => {
        if (target.closest("[data-no-reveal]")) {
          return;
        }

        target.classList.add("is-visible");
      });
    }, 450);

    const mutationObserver = new MutationObserver(() => {
      attachTargets();
    });

    window.addEventListener("scroll", syncScrollState, { passive: true });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      window.clearTimeout(fallbackTimer);
      window.removeEventListener("scroll", syncScrollState);
      mutationObserver.disconnect();
      observer?.disconnect();
    };
  }, [pathname]);

  return null;
}