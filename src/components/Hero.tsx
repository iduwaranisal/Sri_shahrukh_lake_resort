"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Pause, Play, Calendar, Sparkles, MessageCircle, MapPin, Star } from "lucide-react";
import { optimizeImage } from "@/lib/imageOptimization";

const slides = [
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
  const rawSlides = dynamicSlides && dynamicSlides.length > 0 ? dynamicSlides : slides;
  const activeSlides = rawSlides.filter(
    (s) => s && typeof s.src === "string" && s.src.trim() !== ""
  );
  const slidesToRender = activeSlides.length > 0 ? activeSlides : slides;

  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [contentVisible, setContentVisible] = useState(false);

  // Show content after a short delay for entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setContentVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isPlaying || slidesToRender.length <= 1) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slidesToRender.length);
    }, 4000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, slidesToRender.length]);

  const currentSlide = slidesToRender[current] || slidesToRender[0];

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
                scale: isActive ? 1.02 : 1.0,
              }}
              transition={{
                opacity: { duration: 0.8, ease: "easeInOut" },
                scale: { duration: 4.2, ease: "easeOut" },
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

      {/* ── Subtle, clean transparent gradient overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,24,21,0.5) 0%, rgba(10,24,21,0.15) 35%, rgba(10,24,21,0.7) 100%)",
        }}
      />

      {/* ── Center Content (z-20) — CSS-driven entrance instead of framer-motion ── */}
      <div className="relative z-20 flex flex-1 flex-col items-center justify-center px-4 sm:px-6 text-center pt-28 sm:pt-32 pb-16 sm:pb-20 max-w-5xl mx-auto">
        {/* Resort Location & Accommodation Type Badge */}
        <div
          className={`mb-4 sm:mb-6 inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-4 py-2 border shadow-2xl shadow-black/80 transition-all duration-700 ease-out animate-float-slow ${
            contentVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
          style={{
            background: "rgba(10,24,21,0.92)",
            borderColor: "rgba(212,175,55,0.45)",
          }}
        >
          <span className="flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-sand-light drop-shadow">
            <MapPin className="h-3 w-3 text-sand" />
            135/1 Suduwella Tikiri Udanapura · Tissamaharama
          </span>
          <span className="hidden sm:inline text-sand/40">|</span>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] text-ivory font-normal drop-shadow">
            <Sparkles className="w-3 h-3 text-sand animate-twinkle" />
            <span>Homestay in Tissamaharama</span>
            <span>·</span>
            <Star className="w-3 h-3 fill-sand text-sand animate-twinkle" />
            <strong className="font-semibold text-sand">4.8 / 5.0 Rating</strong>
          </span>
        </div>

        {/* Main Headline */}
        <div
          className={`mb-5 sm:mb-7 flex flex-col items-center transition-all duration-700 ease-out ${
            contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "0.15s" }}
        >
          <h1
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-[1.08] tracking-tight text-center"
            style={{
              color: "var(--color-ivory)",
              fontFamily: "var(--font-serif)",
              textShadow: "0 4px 24px rgba(0,0,0,0.9), 0 2px 8px rgba(0,0,0,0.85)",
            }}
          >
            Sri Shahrukh Lake Resort
          </h1>

          {/* Premium Subtitle: Homestay in Tissamaharama */}
          <div className="mt-3.5 sm:mt-5 inline-flex items-center justify-center gap-3 sm:gap-5">
            <span className="h-[1px] w-8 sm:w-16 bg-gradient-to-r from-transparent via-sand to-sand/80" />
            <span
              className="text-xs sm:text-sm md:text-base font-medium uppercase tracking-[0.32em] text-sand-light select-none"
              style={{
                fontFamily: "var(--font-sans)",
                color: "#f1d48c",
                textShadow: "0 2px 10px rgba(0,0,0,0.9), 0 0 20px rgba(212,175,55,0.4)",
              }}
            >
              Homestay in Tissamaharama
            </span>
            <span className="h-[1px] w-8 sm:w-16 bg-gradient-to-l from-transparent via-sand to-sand/80" />
          </div>
        </div>

        {/* Subtitle with genuine, accurate details */}
        <p
          className={`mb-8 sm:mb-10 max-w-2xl text-sm sm:text-base md:text-lg font-normal leading-relaxed text-ivory px-4 py-2 rounded shadow-lg transition-all duration-700 ease-out ${
            contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
          style={{
            fontFamily: "var(--font-sans)",
            textShadow: "0 2px 12px rgba(0,0,0,0.9), 0 1px 3px rgba(0,0,0,0.95)",
            background: "rgba(10,24,21,0.55)",
            border: "1px solid rgba(212,175,55,0.2)",
            transitionDelay: "0.3s",
          }}
        >
          {heroSubtitle ||
            "A peaceful, friendly homestay in Tissamaharama. Enjoy clean comfortable rooms, tranquil garden views, free Wi-Fi, free private parking, fresh daily breakfast, and Yala safari tour arrangements."}
        </p>

        {/* Primary Action Buttons */}
        <div
          className={`flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto max-w-sm sm:max-w-none transition-all duration-700 ease-out ${
            contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
          style={{ transitionDelay: "0.45s" }}
        >
          <Link
            href="/book"
            id="hero-cta-booking"
            className="btn-shimmer flex items-center justify-center gap-2.5 w-full sm:w-auto min-h-[50px] px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] shadow-xl shadow-black/30"
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
            href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
              "Hello Sri Shahrukh Lake Resort, I would like to inquire about room availability."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            id="hero-cta-whatsapp"
            className="flex items-center justify-center gap-2.5 w-full sm:w-auto min-h-[50px] px-8 py-3.5 text-xs font-medium uppercase tracking-[0.2em] border transition-all duration-300 hover:bg-white/10 active:scale-[0.98]"
            style={{
              borderColor: "rgba(250,248,245,0.45)",
              color: "var(--color-ivory)",
              fontFamily: "var(--font-sans)",
            }}
          >
            <MessageCircle className="w-4 h-4 text-sand-light" />
            <span>WhatsApp: {whatsapp}</span>
          </a>
        </div>
      </div>

      {/* ── Bottom Controls Bar ── */}
      <div className="relative z-20 mx-auto max-w-7xl w-full px-5 sm:px-6 lg:px-10 pb-6 sm:pb-8 flex items-center justify-between">
        {/* Caption for current slide */}
        <div
          className="text-left max-w-xs sm:max-w-md px-3.5 py-2 border border-sand/30 shadow-xl"
          style={{
            background: "rgba(10,24,21,0.9)",
          }}
        >
          <p
            className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-sand font-semibold"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Location Reference
          </p>
          <p
            className="text-xs sm:text-sm font-light italic text-ivory truncate"
            style={{
              fontFamily: "var(--font-serif)",
              textShadow: "0 1px 4px rgba(0,0,0,0.8)",
            }}
          >
            {currentSlide.caption}
          </p>
        </div>

        {/* Slide Indicators & Play/Pause Button */}
        <div className="flex items-center gap-2 sm:gap-3 bg-teal-deep/80 px-3 py-1.5 border border-sand/20">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? "Pause background slideshow" : "Play background slideshow"}
            className="text-sand hover:text-sand-light p-1 transition-colors"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          <div className="flex items-center gap-1.5" aria-label="Slideshow indicators">
            {slidesToRender.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Slide ${i + 1} of ${slidesToRender.length}`}
                className="h-5 flex items-center justify-center p-0.5"
              >
                <span
                  className="h-[2.5px] transition-all duration-400 block"
                  style={{
                    width: i === current ? "1.75rem" : "0.5rem",
                    background:
                      i === current ? "var(--color-sand)" : "rgba(250,248,245,0.35)",
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
