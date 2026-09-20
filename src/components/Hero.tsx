"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Pause, Play, Calendar, Sparkles, MessageCircle, MapPin, Star } from "lucide-react";

const slides = [
  {
    src: "/images/img2.jpg",
    alt: "Scenic view of Tissa Wewa in Tissamaharama near Sri Shahrukh Lake Resort",
    caption: "Tissamaharama · 2.5 km from Ancient Tissa Wewa",
  },
  {
    src: "/images/hero1.jpeg",
    alt: "Yala National Park wildlife safari — leopard habitat near Tissamaharama",
    caption: "Yala Safari Gateway · Affordable 4x4 Tours Arranged",
  },
  {
    src: "/images/hero2.jpeg",
    alt: "Sacred Kataragama Devalaya evening ceremonies near Tissamaharama",
    caption: "Kataragama Pilgrimage Sanctuary · 21 km Away",
  },
  {
    src: "/images/tissamaharama-stupa.jpg",
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
  const activeSlides = dynamicSlides && dynamicSlides.length > 0 ? dynamicSlides : slides;
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  /* Parallax — background scrolls smoothly */
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  useEffect(() => {
    if (!isPlaying) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % activeSlides.length);
    }, 6000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, activeSlides.length]);

  const currentSlide = activeSlides[current] || activeSlides[0];

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-[100dvh] w-full overflow-hidden flex flex-col justify-between"
      aria-label="Hero — Sri Shahrukh Lake Resort"
    >
      {/* ── Crossfade slides — with parallax wrapper ── */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 w-full h-[125%] -top-[12%]"
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.07 }}
            animate={{ opacity: 1, scale: 1.01 }}
            exit={{ opacity: 0, scale: 0.99 }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={currentSlide.src}
              alt={currentSlide.alt}
              fill
              priority={current === 0}
              className="object-cover"
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* ── Editorial Gradient Overlays ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,24,21,0.65) 0%, rgba(10,24,21,0.4) 45%, rgba(10,24,21,0.92) 100%)",
        }}
      />

      {/* Radial soft ambient glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(212,175,55,0.15) 0%, transparent 75%)",
        }}
      />

      {/* ── Center Content ── */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 sm:px-6 text-center pt-28 sm:pt-32 pb-16 sm:pb-20 max-w-5xl mx-auto">
        {/* Resort Location & Accommodation Type Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-4 sm:mb-6 inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-3.5 py-1.5 border"
          style={{
            background: "rgba(10,24,21,0.75)",
            borderColor: "rgba(212,175,55,0.4)",
            backdropFilter: "blur(10px)",
          }}
        >
          <span className="flex items-center gap-1.5 text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-sand-light">
            <MapPin className="h-3 w-3 text-sand" />
            135/1 Suduwella Tikiri Udanapura · Tissamaharama
          </span>
          <span className="hidden sm:inline text-sand/40">|</span>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] text-ivory/90 font-light">
            <Sparkles className="w-3 h-3 text-sand" />
            <span>Homestay in Tissamaharama</span>
            <span>·</span>
            <Star className="w-3 h-3 fill-sand text-sand" />
            <strong className="font-semibold text-sand">4.8 / 5.0 Rating</strong>
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-4 sm:mb-6 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-[1.15] tracking-tight"
          style={{ color: "var(--color-ivory)", fontFamily: "var(--font-serif)" }}
        >
          Sri Shahrukh Lake Resort <br />
          <span className="italic gold-text-gradient font-normal text-2xl sm:text-4xl md:text-5xl">
            Homestay in Tissamaharama
          </span>
        </motion.h1>

        {/* Subtitle with genuine, accurate details */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 sm:mb-10 max-w-2xl text-sm sm:text-base md:text-lg font-light leading-relaxed text-ivory/90 px-2 whitespace-pre-line"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {heroSubtitle ||
            "A peaceful, friendly homestay in Tissamaharama. Enjoy clean comfortable rooms, tranquil garden views, free Wi-Fi, free private parking, fresh daily breakfast, and Yala safari tour arrangements."}
        </motion.p>

        {/* Primary Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto max-w-sm sm:max-w-none"
        >
          <Link
            href="/book"
            id="hero-cta-booking"
            className="flex items-center justify-center gap-2.5 w-full sm:w-auto min-h-[50px] px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] shadow-xl shadow-black/30"
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
              backdropFilter: "blur(8px)",
            }}
          >
            <MessageCircle className="w-4 h-4 text-sand-light" />
            <span>WhatsApp: {whatsapp}</span>
          </a>
        </motion.div>
      </div>

      {/* ── Bottom Controls Bar ── */}
      <div className="relative z-10 mx-auto max-w-7xl w-full px-5 sm:px-6 lg:px-10 pb-6 sm:pb-8 flex items-center justify-between">
        {/* Caption for current slide */}
        <div className="text-left max-w-xs sm:max-w-md">
          <p
            className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-sand"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Location Reference
          </p>
          <p
            className="text-xs sm:text-sm font-light italic text-ivory/95 truncate"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {currentSlide.caption}
          </p>
        </div>

        {/* Slide Indicators & Play/Pause Button */}
        <div className="flex items-center gap-2 sm:gap-3 bg-teal-deep/70 backdrop-blur-md px-3 py-1.5 border border-sand/20">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? "Pause background slideshow" : "Play background slideshow"}
            className="text-sand hover:text-sand-light p-1 transition-colors"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          <div className="flex items-center gap-1.5" aria-label="Slideshow indicators">
            {activeSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Slide ${i + 1} of ${activeSlides.length}`}
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
