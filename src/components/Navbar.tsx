"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Phone, MessageCircle, MapPin, X, Calendar } from "lucide-react";

const navLinks = [
  { label: "About", href: "/#about", id: "about" },
  { label: "The Homestay", href: "/#homestay", id: "homestay" },
  { label: "Explore", href: "/#explore", id: "explore" },
  { label: "Gallery", href: "/#gallery", id: "gallery" },
  { label: "Contact", href: "/#contact", id: "contact" },
];

const mobileNavLinks = [
  { label: "About", href: "/#about", id: "about" },
  { label: "The Homestay", href: "/#homestay", id: "homestay" },
  { label: "Amenities", href: "/#amenities", id: "amenities" },
  { label: "Explore & Safaris", href: "/#explore", id: "explore" },
  { label: "Gallery", href: "/#gallery", id: "gallery" },
  { label: "Guest Reviews", href: "/#reviews", id: "reviews" },
  { label: "Contact & Location", href: "/#contact", id: "contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const currentScroll = window.scrollY;
        setScrolled(currentScroll > 30);

        if (currentScroll < 250) {
          setActiveSection("");
          return;
        }

        const scrollPos = currentScroll + 200;
        for (let i = navLinks.length - 1; i >= 0; i--) {
          const sec = document.getElementById(navLinks[i].id);
          if (sec && sec.offsetTop <= scrollPos) {
            setActiveSection(navLinks[i].id);
            return;
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Lock body scroll when mobile menu is open & listen for Esc
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setMenuOpen(false);
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [menuOpen]);

  return (
    <>
      {/* Accessible Skip Link */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? "py-3 shadow-lg shadow-black/20" : "py-4 sm:py-5 lg:py-6"
        }`}
        style={{
          background: scrolled ? "#0a1815" : "rgba(10,24,21,0.75)",
          borderBottom: scrolled
            ? "1px solid rgba(212,175,55,0.2)"
            : "1px solid rgba(212,175,55,0.08)",
        }}
        aria-label="Main Navigation"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-10">
          {/* Brand Logo */}
          <Link
            href="/#home"
            id="nav-logo"
            className="flex flex-col leading-tight group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand"
            aria-label="Sri Shahrukh Lake Resort — Back to top"
          >
            <span
              className="text-lg sm:text-xl font-light tracking-[0.16em] uppercase gold-text-gradient transition-all duration-300 group-hover:tracking-[0.18em]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Sri Shahrukh
            </span>
            <span
              className="text-[9px] sm:text-[10px] font-light tracking-[0.25em] uppercase text-ivory/70 mt-0.5"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Lake Resort · Tissamaharama
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <ul className="hidden lg:flex items-center gap-7 xl:gap-9" role="menubar">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <li key={link.href} role="none">
                  <Link
                    href={link.href}
                    role="menuitem"
                    className={`relative text-xs uppercase tracking-[0.22em] transition-colors duration-200 py-1 ${
                      isActive
                        ? "text-sand font-medium"
                        : "text-ivory/80 hover:text-sand font-light"
                    }`}
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className="absolute -bottom-1 left-0 right-0 h-[1.5px]"
                        style={{ background: "var(--color-sand)" }}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop Primary CTA Button */}
          <div className="hidden lg:flex items-center">
            <Link
              href="/book"
              id="nav-book-now"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] shadow-md shadow-black/25"
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

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center">
            <button
              id="nav-menu-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center justify-center h-10 w-10 text-ivory border border-sand/30 bg-teal-deep/80 transition-all active:scale-95"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-drawer-menu"
            >
              <div className="flex flex-col gap-[5px]">
                <span
                  className={`block h-[1.5px] w-5 origin-center transition-all duration-300 ${
                    menuOpen ? "rotate-45 translate-y-[6.5px]" : ""
                  }`}
                  style={{ background: "var(--color-sand-pale)" }}
                />
                <span
                  className={`block h-[1.5px] w-5 transition-opacity duration-300 ${
                    menuOpen ? "opacity-0" : "opacity-100"
                  }`}
                  style={{ background: "var(--color-sand-pale)" }}
                />
                <span
                  className={`block h-[1.5px] w-5 origin-center transition-all duration-300 ${
                    menuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""
                  }`}
                  style={{ background: "var(--color-sand-pale)" }}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-drawer-menu"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex flex-col lg:hidden"
            style={{
              background: "#0a1815",
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation Menu"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-sand/20">
              <Link
                href="/#home"
                onClick={() => setMenuOpen(false)}
                className="flex flex-col leading-tight"
              >
                <span
                  className="text-lg font-light tracking-[0.16em] uppercase gold-text-gradient"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  Sri Shahrukh
                </span>
                <span
                  className="text-[9px] font-light tracking-[0.25em] uppercase text-ivory/70 mt-0.5"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  Lake Resort · Tissamaharama
                </span>
              </Link>
              <button
                onClick={() => setMenuOpen(false)}
                className="h-10 w-10 flex items-center justify-center text-sand border border-sand/40 bg-teal-mid/50 transition-all active:scale-95"
                aria-label="Close navigation menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Links & Actions */}
            <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col justify-between">
              <ul className="flex flex-col gap-3.5 my-auto text-center py-4">
                {mobileNavLinks.map((link) => (
                  <li key={link.href} className="w-full">
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="inline-block py-2 text-xl font-light tracking-wide transition-colors hover:text-sand"
                      style={{
                        color: activeSection === link.id ? "var(--color-sand)" : "var(--color-ivory)",
                        fontFamily: "var(--font-serif)",
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Bottom Quick Action Strip */}
              <div className="space-y-3.5 pt-5 border-t border-sand/15">
                <Link
                  href="/book"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3.5 text-xs font-semibold uppercase tracking-[0.22em] shadow-lg shadow-black/30 transition-all active:scale-[0.98]"
                  style={{
                    background: "var(--color-sand)",
                    color: "var(--color-teal-deep)",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Now</span>
                </Link>

                <div className="grid grid-cols-2 gap-2.5">
                  <a
                    href="https://wa.me/94757273416?text=Hello%20Sri%20Shahrukh%20Lake%20Resort,%20I%20would%20like%20to%20inquire%20about%20room%20availability."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2.5 border border-sand/30 text-sand text-[11px] uppercase tracking-wider bg-teal-mid/50 hover:bg-teal-mid"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href="tel:+94776219245"
                    className="flex items-center justify-center gap-1.5 py-2.5 border border-sand/30 text-sand text-[11px] uppercase tracking-wider bg-teal-mid/50 hover:bg-teal-mid"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>077 621 9245</span>
                  </a>
                </div>

                <div className="flex items-center justify-center gap-1.5 text-ivory/60 text-[10px] tracking-wider text-center pt-1">
                  <MapPin className="w-3 h-3 text-sand flex-shrink-0" />
                  <span>135/1 Suduwella Tikiri Udanapura, Tissamaharama</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
