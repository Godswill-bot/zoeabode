"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const body = document.body;
    body.classList.add("reveal-ready");

    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    if (targets.length === 0) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      targets.forEach((target) => target.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    targets.forEach((target) => observer.observe(target));

    const fallbackTimer = window.setTimeout(() => {
      targets.forEach((target) => target.classList.add("is-visible"));
    }, 350);

    return () => {
      window.clearTimeout(fallbackTimer);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}