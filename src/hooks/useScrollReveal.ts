"use client";

import { useEffect, useRef } from "react";

/**
 * Lightweight, GPU-friendly scroll-reveal hook using a single IntersectionObserver.
 * - Triggers smoothly as elements enter the viewport without sluggish delays.
 * - Automatically unobserves elements once revealed, ensuring zero lingering CPU overhead.
 */
export function useScrollReveal<T extends HTMLElement = HTMLElement>(
  margin = "0px 0px -25px 0px"
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = el.querySelectorAll(".scroll-reveal, .text-appear");
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: margin, threshold: 0.02 }
    );

    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, [margin]);

  return ref;
}
