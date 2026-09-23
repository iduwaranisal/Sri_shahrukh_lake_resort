"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Sparkles, MessageCircle, MapPin } from "lucide-react";
import { optimizeImage } from "@/lib/imageOptimization";
import { getWhatsAppUrl } from "@/lib/whatsapp";

const defaultSlides = [
  {
    src: "https://res.cloudinary.com/znj9faa6/image/upload/v1789894691/srishahrukh/img2.jpg",
    alt: "Scenic view of Tissa Wewa in Tissamaharama near Sri Shahrukh Lake Resort",
    caption: "Tissamaharama · 2.5 km from Ancient Tissa Wewa",
  },
  {
    src: "https://res.cloudinary.com/znj9faa6/image/upload/v1789894645/srishahrukh/hero1.jpg",
    alt: "Yala National Park wildlife safari — leopard habitat near Tissamaharama",
    caption: "Yala Safari Gateway · Affordable 4x4 Tours Arranged",
  },
  {
    src: "https://res.cloudinary.com/znj9faa6/image/upload/v1789894647/srishahrukh/hero2.jpg",
    alt: "Sacred Kataragama Devalaya evening ceremonies near Tissamaharama",
    caption: "Kataragama Pilgrimage Sanctuary · 21 km Away",
  },
  {
    src: "https://res.cloudinary.com/znj9faa6/image/upload/v1789894722/srishahrukh/tissamaharama-stupa.jpg",
    alt: "Tissamaharama Raja Maha Vihara stupa located 2.2 km from the property",
    caption: "Tissamaharama Stupa · 2.2 km from Homestay",
  },
];

const SLIDE_INTERVAL = 4000;

export interface HeroSlide {
  src: string;
  alt: string;
  caption?: string;
}

export default function Hero({
  heroTitle,
  heroSubtitle,
  whatsapp = "0757273416",
  slides: dynamicSlides,
}: {
  heroTitle?: string;
  heroSubtitle?: string;
  whatsapp?: string;
  slides?: HeroSlide[];
}) {
  const rawSlides = dynamicSlides && dynamicSlides.length > 0 ? dynamicSlides : defaultSlides;
  const activeSlides = rawSlides.filter(
    (s) => s && typeof s.src === "string" && s.src.trim() !== ""
  );
  const slidesToRender = activeSlides.length > 0 ? activeSlides : defaultSlides;

  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [contentVisible, setContentVisible] = useState(false);

  // Show content after a short delay for entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setContentVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Always auto-advance — no play/pause control
  useEffect(() => {
    if (slidesToRender.length <= 1) return;

    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slidesToRender.length);
    }, SLIDE_INTERVAL);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [slidesToRender.length]);

  return (
    <section
      id="home"
      className="relative min-h-[100dvh] w-full overflow-hidden flex flex-col justify-between"
      aria-label="Hero — Sri Shahrukh Lake Resort"
    >
      {/* ── Continuous seamless crossfade slides ── */}
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-teal-deep pointer-events-none">
        {slidesToRender.map((slide, idx) => {
          const isActive = idx === current;
          const isNext = idx === (current + 1) % slidesToRender.length;
          const shouldRender = idx === 0 || isActive || isNext;
          const optimizedSrc = optimizeImage(slide.src, {
            width: 1920,
            quality: "auto",
            format: "auto",
          });

          return (
            <motion.div
              key={`${slide.src}-${idx}`}
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0,
                scale: isActive ? 1.04 : 1.0,
              }}
              transition={{
                opacity: { duration: 1.0, ease: "easeInOut" },
                scale: { duration: 5, ease: "easeOut" },
              }}
              className="absolute inset-0 w-full h-full"
            >
              {shouldRender && (
                <Image
                  src={optimizedSrc}
                  alt={slide.alt || "Sri Shahrukh Lake Resort"}
                  fill
                  priority={idx === 0}
                  loading={idx === 0 ? "eager" : "lazy"}
                  className="object-cover"
                  sizes="100vw"
                />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* ── Cinematic gradient overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,24,21,0.55) 0%, rgba(10,24,21,0.10) 40%, rgba(10,24,21,0.75) 100%)",
        }}
      />

      {/* ── Center Content ── */}
      <div className="relative z-20 flex flex-1 flex-col items-center justify-center px-4 sm:px-6 md:px-8 text-center pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-24 max-w-6xl mx-auto w-full">
        {/* Location Badge */}
        <div
          className={`mb-4 sm:mb-6 md:mb-8 inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-3 px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-full border shadow-2xl shadow-black/60 transition-all duration-700 ease-out max-w-full ${
            contentVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
          style={{
            background: "rgba(10,24,21,0.88)",
            borderColor: "rgba(212,175,55,0.35)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          <span className="flex items-center gap-1.5 text-[9px] sm:text-[11px] font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-sand-light drop-shadow">
            <MapPin className="h-3 w-3 text-sand flex-shrink-0" />
            <span className="truncate max-w-[220px] sm:max-w-none">135/1 Suduwella Tikiri Udanapura · Tissamaharama</span>
          </span>
          <span className="hidden sm:inline text-sand/30">|</span>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] text-ivory/90 font-normal drop-shadow">
            <Sparkles className="w-3 h-3 text-sand animate-twinkle" />
            <span>Homestay in Tissamaharama</span>
          </span>
        </div>

        {/* ── Main Headline — Bold & Stylish ── */}
        <div
          className={`mb-4 sm:mb-6 md:mb-8 flex flex-col items-center transition-all duration-700 ease-out ${
            contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "0.15s" }}
        >
          <h1
            className="text-[2rem] leading-[1.15] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-bold sm:leading-[1.08] tracking-tight text-center px-1 sm:px-2"
            style={{
              color: "var(--color-ivory)",
              fontFamily: "'Playfair Display', var(--font-serif)",
              textShadow:
                "0 4px 32px rgba(0,0,0,0.85), 0 2px 12px rgba(0,0,0,0.7)",
              letterSpacing: "-0.02em",
            }}
          >
            {heroTitle || (
              <>
                Sri Shahrukh
                <br className="sm:hidden" />
                <span className="hidden sm:inline"> </span>
                Lake Resort
              </>
            )}
          </h1>

          {/* Decorative subtitle divider */}
          <div className="mt-3 sm:mt-5 md:mt-6 inline-flex items-center justify-center gap-3 sm:gap-5">
            <span
              className={`h-[1px] w-6 sm:w-14 md:w-20 transition-all duration-700 ease-out origin-right ${
                contentVisible ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
              }`}
              style={{
                transitionDelay: "0.25s",
                background: "linear-gradient(to right, transparent, #d4af37)",
              }}
            />
            <span
              className="text-[10px] sm:text-xs md:text-sm font-semibold uppercase tracking-[0.25em] sm:tracking-[0.35em] select-none whitespace-nowrap"
              style={{
                fontFamily: "var(--font-sans)",
                color: "#f1d48c",
                textShadow: "0 2px 10px rgba(0,0,0,0.9), 0 0 20px rgba(212,175,55,0.35)",
              }}
            >
              Homestay in Tissamaharama
            </span>
            <span
              className={`h-[1px] w-6 sm:w-14 md:w-20 transition-all duration-700 ease-out origin-left ${
                contentVisible ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
              }`}
              style={{
                transitionDelay: "0.25s",
                background: "linear-gradient(to left, transparent, #d4af37)",
              }}
            />
          </div>
        </div>

        {/* Description */}
        <p
          className={`mb-8 sm:mb-10 md:mb-12 max-w-xl sm:max-w-2xl text-[13px] sm:text-base md:text-lg font-normal leading-relaxed sm:leading-[1.75] text-ivory/95 px-4 sm:px-6 py-3 sm:py-4 rounded-lg transition-all duration-700 ease-out ${
            contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
          style={{
            fontFamily: "var(--font-sans)",
            textShadow: "0 2px 12px rgba(0,0,0,0.8)",
            background: "rgba(10,24,21,0.50)",
            border: "1px solid rgba(212,175,55,0.15)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            transitionDelay: "0.3s",
          }}
        >
          {heroSubtitle ||
            "A peaceful, friendly homestay in Tissamaharama. Enjoy clean comfortable rooms, tranquil garden views, free Wi-Fi, free private parking, fresh daily breakfast, and Yala safari tour arrangements."}
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row items-center gap-3 sm:gap-5 w-full sm:w-auto max-w-[340px] sm:max-w-none transition-all duration-700 ease-out ${
            contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
          style={{ transitionDelay: "0.45s" }}
        >
          <Link
            href="/book"
            id="hero-cta-booking"
            className="btn-shimmer flex items-center justify-center gap-2.5 w-full sm:w-auto min-h-[52px] sm:min-h-[54px] px-8 sm:px-10 py-3.5 text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] rounded-md transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] shadow-xl shadow-black/30"
            style={{
              background: "var(--color-sand)",
              color: "var(--color-teal-deep)",
              fontFamily: "var(--font-sans)",
            }}
          >
            <Calendar className="w-4 h-4" />
            <span>Book Now</span>
          </Link>

          <a
            href={getWhatsAppUrl(
              whatsapp,
              "Hello Sri Shahrukh Lake Resort, I would like to inquire about room availability."
            )}
            target="_blank"
            rel="noopener noreferrer"
            id="hero-cta-whatsapp"
            className="flex items-center justify-center gap-2.5 w-full sm:w-auto min-h-[52px] sm:min-h-[54px] px-8 sm:px-10 py-3.5 text-[11px] sm:text-xs font-medium uppercase tracking-[0.2em] border rounded-md transition-all duration-300 hover:bg-white/10 active:scale-[0.98]"
            style={{
              borderColor: "rgba(250,248,245,0.35)",
              color: "var(--color-ivory)",
              fontFamily: "var(--font-sans)",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
            }}
          >
            <MessageCircle className="w-4 h-4 text-sand-light" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>



    </section>
  );
}
