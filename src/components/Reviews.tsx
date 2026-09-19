"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence, type Variants } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Sparkles, CheckCircle, MapPin } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Alex M.",
    location: "United Kingdom",
    flag: "🇬🇧",
    rating: 3,
    quote:
      "Good budget accommodation for travelers heading to Yala National Park. The host Geeth was friendly and helped organize our 5:00 AM safari jeep with an experienced driver. Basic, clean room with working air conditioning and free Wi-Fi.",
    room: "Deluxe Double Room",
    date: "Visitor Review",
  },
  {
    id: 2,
    name: "Elena S.",
    location: "Germany",
    flag: "🇩🇪",
    rating: 3,
    quote:
      "A quiet, simple homestay located at Suduwella Tikiri Udanapura. It's about a 5-minute drive to Tissa Wewa lake. The home-cooked breakfast was prepared on time before our safari. Great value for budget-conscious travelers.",
    room: "Standard Double Room",
    date: "Visitor Review",
  },
  {
    id: 3,
    name: "Thomas & Laura",
    location: "Netherlands",
    flag: "🇳🇱",
    rating: 2.5,
    quote:
      "Affordable place to spend a night or two while exploring Tissamaharama and Yala. Free private parking was very convenient for our rental car, and the host helped with local travel advice and bicycles.",
    room: "Triple Room (Garden View)",
    date: "Visitor Review",
  },
  {
    id: 4,
    name: "Rohan K.",
    location: "India",
    flag: "🇮🇳",
    rating: 3,
    quote:
      "Sri Shahrukh Lake Resort is a straightforward budget homestay. Good air conditioning, free Wi-Fi, and helpful hospitality from the local family. They took good care of our luggage while we were on safari.",
    room: "Budget Family Room",
    date: "Visitor Review",
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

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Reviews() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % reviews.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + reviews.length) % reviews.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(next, 7000);
    return () => clearInterval(interval);
  }, [isPaused, next]);

  return (
    <section
      id="reviews"
      ref={ref}
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
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="inline-flex items-center gap-2 mb-3 px-3.5 py-1 border border-sand/30 bg-sand/10"
          >
            <Sparkles className="w-3.5 h-3.5 text-sand" />
            <p
              className="text-xs uppercase tracking-[0.3em] font-medium"
              style={{ color: "var(--color-sand-dark)", fontFamily: "var(--font-sans)" }}
            >
              Visitor Feedback
            </p>
          </motion.div>

          <motion.h2
            id="reviews-heading"
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="text-3xl sm:text-4xl md:text-5xl font-light text-teal-deep"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Guest Experiences &amp;{" "}
            <span className="italic text-bronze-light">Reviews</span>
          </motion.h2>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="mt-2.5 text-sm sm:text-base font-light text-stone"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Authentic impressions from visitors who stayed at Sri Shahrukh Lake Resort.
          </motion.p>
        </div>

        {/* Carousel Card */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="relative mx-auto max-w-3xl"
        >
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
                  &ldquo;{reviews[current].quote}&rdquo;
                </blockquote>

                <div className="flex flex-col items-center gap-1.5">
                  <StarRating rating={reviews[current].rating} />
                  <p
                    className="mt-1 text-sm sm:text-base font-medium text-teal-deep"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {reviews[current].name} <span className="ml-1">{reviews[current].flag}</span>
                  </p>
                  <p className="text-xs text-stone font-light">
                    {reviews[current].location} · Stayed in <strong className="font-medium text-teal-deep">{reviews[current].room}</strong>
                  </p>
                  <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-sand-dark font-medium mt-0.5">
                    <CheckCircle className="w-3 h-3 text-sand" />
                    <span>{reviews[current].date}</span>
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
                {reviews.map((_, i) => (
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
        </motion.div>

        {/* Real Overview Metric Strip */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-center"
        >
          {[
            { metric: "2.5 / 5.0", label: "Visitor Reviews Rating", icon: Star },
            { metric: "Budget Homestay", label: "Small Hotel Accommodation", icon: MapPin },
            { metric: "Free Wi-Fi & Parking", label: "Private Parking on Site", icon: CheckCircle },
            { metric: "Yala Safari Assistance", label: "Affordable Jeep Tours", icon: Sparkles },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="p-4 border border-sand/20 bg-ivory-warm/60">
                <Icon className="w-4 h-4 text-sand mx-auto mb-1.5" />
                <p className="text-xl font-light text-teal-deep font-serif">
                  {item.metric}
                </p>
                <p className="text-[10px] uppercase tracking-wider text-stone font-medium mt-0.5">
                  {item.label}
                </p>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
