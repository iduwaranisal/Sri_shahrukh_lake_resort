"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * ScrollManager guarantees:
 * 1. Disables unpredictable browser scroll guessing (scrollRestoration = "manual")
 * 2. When opening the booking form and pressing back (or clicking Back to Resort),
 *    restores to the exact position on the resort page, OR the top (never jumping to footer).
 * 3. Handles in-page hash anchors smoothly with fixed navigation offset.
 */
export default function ScrollManager() {
  const pathname = usePathname();

  useEffect(() => {
    // Disable native browser auto-scroll restoration which causes jumping to footer
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const restorePosition = () => {
      const hash = window.location.hash;
      if (hash) {
        try {
          const target = document.querySelector(hash);
          if (target) {
            target.scrollIntoView({ behavior: "smooth" });
            sessionStorage.removeItem("resort_scroll_pos");
            return;
          }
        } catch {
          // ignore selector errors
        }
      }

      if (pathname === "/") {
        const savedPos = sessionStorage.getItem("resort_scroll_pos");
        if (savedPos !== null) {
          const posY = parseInt(savedPos, 10);
          sessionStorage.removeItem("resort_scroll_pos");
          window.scrollTo({
            top: isNaN(posY) ? 0 : posY,
            behavior: "instant" as ScrollBehavior,
          });
          return;
        }

        // If returned to root without hash and without saved pos, stay at top
        if (window.scrollY > 0 && !window.location.hash) {
          window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
        }
      }
    };

    // Run on route mount
    const timer = setTimeout(restorePosition, 30);

    const handlePopState = () => {
      restorePosition();
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [pathname]);

  return null;
}
