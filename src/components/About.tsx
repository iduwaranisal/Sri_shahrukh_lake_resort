"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Wifi, Car, Coffee, ShieldCheck, Bike, MapPin } from "lucide-react";
import { optimizeImage } from "@/lib/imageOptimization";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/* ─── Real Stat definitions ─────────────────────────────────────────── */
const stats = [
  { numeric: 2.5, suffix: " km", label: "From Tissa Wewa", symbol: null },
  { numeric: 2.2, suffix: " km", label: "To Tissa Sacred Stupa", symbol: null },
  { numeric: 28, suffix: " km", label: "To Bundala & Yala Safari", symbol: null },
  { numeric: null, suffix: "", label: "Rating Across Platforms", symbol: "4.8★" },
];

/* ─── Founder portrait ─────────────────────────────────────────────── */
const founderImage = {
  src: "https://res.cloudinary.com/znj9faa6/image/upload/v1789894712/srishahrukh/owner-srk.jpg",
  alt: "Sri Shahrukh Lake Resort founder Geeth with Shah Rukh Khan in 2004",
  caption: "Founder Geeth with Shah Rukh Khan · 2004",
  subCaption: "The encounter that inspired our homestay name: Sri Shahrukh Lake Resort.",
};

/* ─── Easing helper ─────────────────────────────────────────────────── */
function easeOutExpo(t: number) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

/* ─── Count-Up hook ─────────────────────────────────────────────────── */
function useCountUp(target: number | null, duration = 1800, active = false) {
  const [count, setCount] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!active || target === null || startedRef.current) return;
    startedRef.current = true;
    const finalTarget = target;

    const start = performance.now();
    function step(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.round(easeOutExpo(progress) * finalTarget));
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }, [active, target, duration]);

  return count;
}

/* ─── Single stat card ──────────────────────────────────────────────── */
function StatCard({
  stat,
  index,
  active,
}: {
  stat: (typeof stats)[number];
  index: number;
  active: boolean;
}) {
  const count = useCountUp(typeof stat.numeric === "number" ? stat.numeric : null, 1500 + index * 150, active);

  return (
    <div
      className={`scroll-reveal stagger-${index + 1} flex flex-col items-center py-6 px-3 sm:py-8 sm:px-4 text-center border-r border-b border-sand/20 last:border-r-0`}
      style={{ background: "var(--color-ivory)" }}
    >
      <span
        className="text-2xl sm:text-3xl md:text-4xl font-light tabular-nums"
        style={{ color: "var(--color-teal-deep)", fontFamily: "var(--font-serif)" }}
      >
        {stat.symbol ? stat.symbol : `${stat.numeric !== null && stat.numeric % 1 !== 0 ? stat.numeric : count}${stat.suffix}`}
      </span>
      <span
        className="mt-1.5 text-[10px] sm:text-[11px] uppercase tracking-[0.15em] font-medium leading-tight max-w-[150px]"
        style={{ color: "var(--color-stone)", fontFamily: "var(--font-sans)" }}
      >
        {stat.label}
      </span>
    </div>
  );
}

export interface DynamicAboutImage {
  src: string;
  alt: string;
  caption?: string;
  subCaption?: string;
}

export default function About({
  aboutStory,
  ratingScore = "4.8",
  ratingLabel = "Rating Across Platforms",
  founderImage: dynamicFounderImage,
}: {
  aboutStory?: string;
  ratingScore?: string;
  ratingLabel?: string;
  founderImage?: DynamicAboutImage;
}) {
  const activeImage = dynamicFounderImage?.src ? dynamicFounderImage : founderImage;

  const dynamicStats = [
    { numeric: 2.5, suffix: " km", label: "From Tissa Wewa", symbol: null },
    { numeric: 2.2, suffix: " km", label: "To Tissa Sacred Stupa", symbol: null },
    { numeric: 28, suffix: " km", label: "To Bundala & Yala Safari", symbol: null },
    { numeric: null, suffix: "", label: ratingLabel, symbol: `${ratingScore}★` },
  ];

  const sectionRef = useScrollReveal<HTMLElement>();
  const [statsVisible, setStatsVisible] = useState(false);

  // Simple IntersectionObserver for stats count-up
  const statsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          obs.disconnect();
        }
      },
      { rootMargin: "-60px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden py-20 sm:py-28 md:py-32"
      style={{ background: "var(--color-ivory-warm)" }}
      aria-labelledby="about-heading"
    >
      <div
        className="absolute left-0 top-0 h-px w-full"
        style={{ background: "linear-gradient(to right, transparent, var(--color-sand), transparent)" }}
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-center">

          {/* ── Text column (7 cols on desktop) ── */}
          <div className="lg:col-span-7">
            <div className="scroll-reveal inline-flex items-center gap-2 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-sand" />
              <p
                className="text-xs font-medium uppercase tracking-[0.3em]"
                style={{ color: "var(--color-sand-dark)", fontFamily: "var(--font-sans)" }}
              >
                Property Overview
              </p>
            </div>

            <h2
              id="about-heading"
              className="scroll-reveal stagger-1 mb-6 text-3xl sm:text-4xl md:text-5xl font-light leading-[1.15]"
              style={{ color: "var(--color-teal-deep)", fontFamily: "var(--font-serif)" }}
            >
              Sri Shahrukh Lake Resort <br />
              <em className="not-italic text-bronze-light text-2xl sm:text-3xl md:text-4xl">
                Warm Hospitality in Tissamaharama
              </em>
            </h2>

            <div
              className="scroll-reveal stagger-2 space-y-4 text-sm sm:text-base font-light leading-relaxed"
              style={{ color: "var(--color-stone)", fontFamily: "var(--font-sans)" }}
            >
              {aboutStory ? (
                <p className="whitespace-pre-line leading-relaxed">{aboutStory}</p>
              ) : (
                <>
                  <p>
                    <strong>Sri Shahrukh Lake Resort</strong> is a peaceful homestay located at <strong>135/1 Suduwella Tikiri Udanapura in Tissamaharama</strong>. We offer a quiet and relaxing stay where every guest receives friendly personal care and warm Sri Lankan hospitality.
                  </p>
                  <p>
                    Our story began in 2004, when our founder Geeth met Bollywood film star Shah Rukh Khan during his visit to Sri Lanka. Inspired by his kindness and warmth, Geeth named this homestay in his honor, welcoming travelers from all over the world.
                  </p>
                  <p>
                    We offer clean and comfortable rooms with garden views, free Wi-Fi, private attached bathrooms with hot water, free private parking, fresh daily breakfast, and safari arrangements to Yala and Bundala National Parks.
                  </p>
                </>
              )}
            </div>

            {/* Quick Amenities List */}
            <div id="amenities" className="mt-6 pt-6 border-t border-sand/20">
              <p className="text-xs uppercase tracking-[0.25em] text-teal-deep font-semibold mb-3">
                Amenities &amp; Services
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs text-stone">
                <span className="flex items-center gap-1.5"><Wifi className="w-3.5 h-3.5 text-sand" /> Free Wi-Fi</span>
                <span className="flex items-center gap-1.5"><Car className="w-3.5 h-3.5 text-sand" /> Free Parking</span>
                <span className="flex items-center gap-1.5"><Coffee className="w-3.5 h-3.5 text-sand" /> Daily Breakfast</span>
                <span className="flex items-center gap-1.5"><Bike className="w-3.5 h-3.5 text-sand" /> Bicycle &amp; Car Rental</span>
                <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-sand" /> Luggage Storage</span>
                <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-sand" /> Yala Safari Help</span>
              </div>
            </div>

            <div className="scroll-reveal stagger-3 mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#homestay"
                className="inline-flex items-center gap-2.5 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] transition-all hover:scale-105"
                style={{
                  background: "var(--color-teal-deep)",
                  color: "var(--color-ivory)",
                  fontFamily: "var(--font-sans)",
                }}
              >
                The Homestay
              </a>

              <Link
                href="/book"
                className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold uppercase tracking-[0.15em] bg-sand text-teal-deep hover:bg-sand-light transition-all shadow-md"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Book Now
              </Link>
            </div>
          </div>

          {/* ── Image column (static, no parallax) ── */}
          <div className="scroll-reveal stagger-1 lg:col-span-5 relative px-2 sm:px-0">
            <div className="relative aspect-[4/5] w-full overflow-hidden border border-sand/30 shadow-xl bg-teal-deep">
              <Image
                src={optimizeImage(activeImage.src, {
                  width: 1000,
                  quality: "auto",
                  format: "auto",
                })}
                alt={activeImage.alt}
                fill
                loading="lazy"
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />

              <div
                className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(10,24,21,0) 0%, rgba(10,24,21,0.85) 100%)",
                }}
              />

              <div className="absolute bottom-5 left-5 right-5">
                <p
                  className="text-[10px] uppercase tracking-[0.25em] text-sand font-medium"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {activeImage.caption || "Founder Geeth with Shah Rukh Khan · 2004"}
                </p>
                <p
                  className="mt-1 text-xs sm:text-sm font-light text-ivory leading-snug"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {activeImage.subCaption || "The encounter that inspired our homestay name: Sri Shahrukh Lake Resort."}
                </p>
              </div>
            </div>

            {/* Location Badge */}
            <div
              className="absolute -top-3 -right-2 sm:-top-5 sm:-right-4 px-4 py-2.5 border border-sand/40 shadow-lg"
              style={{ background: "var(--color-teal-deep)" }}
            >
              <p
                className="text-xs sm:text-sm font-medium text-sand leading-tight"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Budget Homestay
              </p>
              <p
                className="text-[8px] uppercase tracking-[0.2em] text-ivory/80 mt-0.5"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Tissamaharama
              </p>
            </div>
          </div>
        </div>

        {/* ── Real Distance Stats Row ── */}
        <div
          ref={statsRef}
          className="mt-14 sm:mt-20 grid grid-cols-2 md:grid-cols-4 border border-sand/30 shadow-sm"
          style={{ background: "var(--color-ivory)" }}
        >
          {dynamicStats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} active={statsVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}