"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Sparkles, CheckCircle, MapPin } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const reviews = [
  {
    id: 1,
    name: "Alex M.",
    location: "United Kingdom",
    flag: "🇬🇧",
    rating: 4.8,
    quote:
      "A wonderfully peaceful stay near Yala National Park. The host Geeth provided kind and attentive hospitality. Clean room with cold air conditioning, quiet garden views, and a delicious breakfast before our morning safari.",
    date: "Verified Review",
  },
  {
    id: 2,
    name: "Elena S.",
    location: "Germany",
    flag: "🇩🇪",
    rating: 5.0,
    quote:
      "Such a lovely, relaxing homestay! It's just a 5-minute drive to Tissa Wewa lake. The home-cooked breakfast was fresh and tasty, and Geeth made sure our safari jeep was on time.",
    date: "Verified Review",
  },
  {
    id: 3,
    name: "Thomas & Laura",
    location: "Netherlands",
    flag: "🇳🇱",
    rating: 4.8,
    quote:
      "One of the best homestay experiences in Southern Sri Lanka. Very clean room, safe private parking, fast Wi-Fi, and friendly care from the host family.",
    date: "Verified Review",
  },
  {
    id: 4,
    name: "Rohan K.",
    location: "India",
    flag: "🇮🇳",
    rating: 4.9,
    quote:
      "Sri Shahrukh Lake Resort is an absolute gem. Beautiful garden surroundings, great A/C, kind hospitality, and smooth safari arrangements. Highly recommended!",
    date: "Verified Review",
  },
];

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 !== 0;

  return (
    <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const isFull = i < fullStars;
        const isHalf = i === fullStars && hasHalf;
        return (
          <Star
            key={i}
            className={`w-4 h-4 ${
              isFull
                ? "fill-sand text-sand"
                : isHalf
                ? "fill-sand/50 text-sand"
                : "text-stone-light/30"
            }`}
            aria-hidden="true"
          />
        );
      })}
      <span className="ml-1 text-xs text-stone font-medium">{rating} / 5</span>
    </div>
  );
}

export interface ReviewItem {
  id?: string | number;
  name: string;
  location: string;
  flag: string;
  rating: number;
  quote: string;
  date: string;
}

export default function Reviews({
  initialReviews,
  ratingScore = "4.8",
  ratingLabel = "across all platforms",
}: {
  initialReviews?: ReviewItem[];
  ratingScore?: string;
  ratingLabel?: string;
}) {
  const activeReviews = initialReviews && initialReviews.length > 0 ? initialReviews : reviews;
  const sectionRef = useScrollReveal<HTMLElement>();
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % activeReviews.length);
  }, [activeReviews.length]);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + activeReviews.length) % activeReviews.length);
  }, [activeReviews.length]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(next, 7000);
    return () => clearInterval(interval);
  }, [isPaused, next]);

  return (
    <section
      id="reviews"
      ref={sectionRef}
      className="py-20 sm:py-28 md:py-32 relative overflow-hidden"
      style={{ background: "var(--color-ivory)" }}
      aria-labelledby="reviews-heading"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
        {/* Section Header */}
        <div className="mb-10 sm:mb-14 text-center max-w-2xl mx-auto">
          <div className="scroll-reveal inline-flex items-center gap-2 mb-3 px-3.5 py-1 border border-sand/30 bg-sand/10 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-sand animate-twinkle" />
            <p
              className="text-xs uppercase tracking-[0.3em] font-medium"
              style={{ color: "var(--color-sand-dark)", fontFamily: "var(--font-sans)" }}
            >
              Visitor Feedback
            </p>
          </div>

          <h2
            id="reviews-heading"
            className="scroll-reveal stagger-1 text-3xl sm:text-4xl md:text-5xl font-light text-teal-deep"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Guest Experiences &amp;{" "}
            <span className="italic text-bronze-light">Reviews</span>
          </h2>

          <p
            className="scroll-reveal stagger-2 mt-2.5 text-sm sm:text-base font-light text-stone"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Rated <strong className="font-semibold text-teal-deep">{ratingScore} / 5.0 {ratingLabel}</strong>. Real reviews from guests who stayed with us in Tissamaharama.
          </p>
        </div>

        {/* Carousel Card */}
        <div className="scroll-reveal stagger-3 relative mx-auto max-w-3xl">
          <div
            className="border border-sand/30 bg-ivory-warm p-8 sm:p-12 md:p-14 shadow-lg text-center relative"
            aria-live="polite"
          >
            <div
              className="mb-4 text-6xl sm:text-7xl font-serif text-sand/60 select-none leading-none"
              aria-hidden="true"
            >
              “
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <blockquote
                  className="mb-6 text-base sm:text-lg font-light leading-relaxed text-teal-deep font-serif italic"
                >
                  &ldquo;{activeReviews[current]?.quote}&rdquo;
                </blockquote>

                <div className="flex flex-col items-center gap-1.5">
                  <StarRating rating={activeReviews[current]?.rating || 4.8} />
                  <p
                    className="mt-1 text-sm sm:text-base font-medium text-teal-deep"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {activeReviews[current]?.name} <span className="ml-1">{activeReviews[current]?.flag}</span>
                  </p>
                  <p className="text-xs text-stone font-light">
                    {activeReviews[current]?.location} · <span className="text-sand-dark font-medium">Homestay Guest</span>
                  </p>
                  <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-sand-dark font-medium mt-0.5">
                    <CheckCircle className="w-3 h-3 text-sand" />
                    <span>{activeReviews[current]?.date}</span>
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="mt-8 flex items-center justify-center gap-6 pt-4 border-t border-sand/20">
              <button
                onClick={prev}
                aria-label="Previous visitor review"
                className="flex h-10 w-10 items-center justify-center border border-teal-deep/30 text-teal-deep hover:border-sand hover:text-sand-dark transition-all rounded-none"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2" aria-label="Review pagination">
                {activeReviews.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    aria-label={`View review ${i + 1}`}
                    className="h-6 flex items-center justify-center p-1"
                  >
                    <span
                      className="h-[2.5px] transition-all duration-400 block"
                      style={{
                        width: i === current ? "2rem" : "0.75rem",
                        background:
                          i === current
                            ? "var(--color-teal-deep)"
                            : "var(--color-stone-light)",
                      }}
                    />
                  </button>
                ))}
              </div>

              <button
                onClick={next}
                aria-label="Next visitor review"
                className="flex h-10 w-10 items-center justify-center border border-teal-deep/30 text-teal-deep hover:border-sand hover:text-sand-dark transition-all rounded-none"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Real Overview Metric Strip */}
        <div className="scroll-reveal stagger-4 mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-center">
          {[
            { metric: "4.8 / 5.0", label: "Rating Across All Platforms", icon: Star },
            { metric: "Tissamaharama", label: "Quiet & Peaceful Homestay", icon: MapPin },
            { metric: "Free Wi-Fi & Parking", label: "Private Parking on Site", icon: CheckCircle },
            { metric: "Yala Safari Tours", label: "Friendly Host Hospitality", icon: Sparkles },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="p-4 border border-sand/20 bg-ivory-warm/60 transition-all duration-300 hover:-translate-y-1 hover:border-sand hover:shadow-sm">
                <Icon className="w-4 h-4 text-sand mx-auto mb-1.5 animate-twinkle" />
                <p className="text-xl font-light text-teal-deep font-serif">
                  {item.metric}
                </p>
                <p className="text-[10px] uppercase tracking-wider text-stone font-medium mt-0.5">
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
