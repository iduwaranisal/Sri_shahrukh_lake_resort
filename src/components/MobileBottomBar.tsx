"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { MessageCircle, Phone, Calendar } from "lucide-react";
import { getWhatsAppUrl, getTelUrl } from "@/lib/whatsapp";

export default function MobileBottomBar({
  whatsapp = "0757273416",
  phone = "077 621 9245",
}: {
  whatsapp?: string;
  phone?: string;
} = {}) {
  const [visible, setVisible] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        setVisible(window.scrollY > 350);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] border-t border-sand/30 shadow-2xl transition-all duration-300"
      style={{
        background: "#0a1815",
      }}
      role="region"
      aria-label="Mobile quick reservations and contact bar"
    >
      <div className="flex items-center gap-2 max-w-md mx-auto">
        {/* Direct WhatsApp */}
        <a
          href={getWhatsAppUrl(
            whatsapp,
            "Hello Sri Shahrukh Lake Resort, I would like to inquire about room availability"
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-11 w-11 flex-shrink-0 items-center justify-center border border-sand/30 bg-teal-mid text-sand rounded-none transition-transform active:scale-95"
          aria-label={`Chat on WhatsApp: ${whatsapp}`}
        >
          <MessageCircle className="w-4 h-4" />
        </a>

        {/* Direct Phone Call */}
        <a
          href={getTelUrl(phone)}
          className="flex h-11 w-11 flex-shrink-0 items-center justify-center border border-sand/30 bg-teal-mid text-sand rounded-none transition-transform active:scale-95"
          aria-label={`Call ${phone}`}
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
