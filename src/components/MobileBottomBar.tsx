"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MessageCircle, Phone, Calendar } from "lucide-react";

export default function MobileBottomBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 350);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden px-4 py-3 border-t border-sand/30 shadow-2xl transition-all duration-300"
      style={{
        background: "rgba(10,24,21,0.96)",
        backdropFilter: "blur(16px)",
      }}
      role="region"
      aria-label="Mobile quick reservations and contact bar"
    >
      <div className="flex items-center gap-2 max-w-md mx-auto">
        {/* Direct WhatsApp to 0757273416 */}
        <a
          href="https://wa.me/94757273416?text=Hello%20Sri%20Shahrukh%20Lake%20Resort,%20I%20would%20like%20to%20inquire%20about%20room%20availability"
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-11 w-11 flex-shrink-0 items-center justify-center border border-sand/30 bg-teal-mid text-sand rounded-none transition-transform active:scale-95"
          aria-label="Chat on WhatsApp: 0757273416"
        >
          <MessageCircle className="w-4 h-4" />
        </a>

        {/* Direct Phone Call to 077 621 9245 */}
        <a
          href="tel:+94776219245"
          className="flex h-11 w-11 flex-shrink-0 items-center justify-center border border-sand/30 bg-teal-mid text-sand rounded-none transition-transform active:scale-95"
          aria-label="Call 077 621 9245"
        >
          <Phone className="w-4 h-4" />
        </a>

        {/* Inquire / Book Room */}
        <Link
          href="/book"
          className="flex-1 flex items-center justify-center gap-2 h-11 px-4 text-xs font-semibold uppercase tracking-[0.18em] shadow-lg shadow-black/20 transition-transform active:scale-95"
          style={{
            background: "var(--color-sand)",
            color: "var(--color-teal-deep)",
            fontFamily: "var(--font-sans)",
          }}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Book Now</span>
        </Link>
      </div>
    </div>
  );
}
