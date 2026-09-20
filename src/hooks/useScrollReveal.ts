"use client";

import { useEffect, useRef } from "react";

/**
 * Lightweight scroll-reveal hook using a single IntersectionObserver.
 * Adds `.is-visible` class to elements with `.scroll-reveal` when they
 * enter the viewport. Much lighter than per-element framer-motion controllers.
 */
export function useScrollReveal<T extends HTMLElement = HTMLElement>(
  margin = "-60px"
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = el.querySelectorAll(".scroll-reveal");
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
      { rootMargin: margin, threshold: 0.01 }
    );

    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, [margin]);

  return ref;
}
