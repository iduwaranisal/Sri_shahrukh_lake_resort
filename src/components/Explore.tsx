"use client";

import { useState, useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Compass, MapPin, Clock, ArrowUpRight } from "lucide-react";
import { attractions } from "@/data/explore";

const categories = [
  "All Destinations",
  "Wildlife Safari",
  "Ancient Sacred Heritage",
  "UNESCO Wetland & Avifauna",
  "Nature & Heritage",
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Explore() {
  const [activeCategory, setActiveCategory] = useState("All Destinations");
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const filteredAttractions =
    activeCategory === "All Destinations"
      ? attractions
      : attractions.filter((a) =>
          a.category.toLowerCase().includes(activeCategory.toLowerCase().slice(0, 5))
        );

  return (
    <section
      id="explore"
      ref={ref}
      className="py-24 sm:py-32 md:py-36 relative overflow-hidden"
      style={{ background: "var(--color-teal-deep)" }}
      aria-labelledby="explore-heading"
    >
      {/* Decorative backdrop glow */}
      <div
        className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full opacity-20 blur-3xl"
        style={{ background: "var(--color-sand)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-40 left-0 h-96 w-96 rounded-full opacity-15 blur-3xl"
        style={{ background: "var(--color-sand)" }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="mb-12 sm:mb-16 text-center max-w-3xl mx-auto">
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="inline-flex items-center gap-2 mb-3 px-3.5 py-1 border border-sand/30 bg-sand/10"
          >
            <Compass className="w-3.5 h-3.5 text-sand" />
            <p
              className="text-xs uppercase tracking-[0.35em] text-sand font-medium"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Excursions &amp; Expeditions
            </p>
          </motion.div>

          <motion.h2
            id="explore-heading"
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="text-3xl sm:text-5xl md:text-6xl font-light text-ivory leading-[1.15]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Explore Ancient{" "}
            <span className="italic gold-text-gradient font-normal">
              Tissamaharama
            </span>
          </motion.h2>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="mt-4 text-sm sm:text-base font-light leading-relaxed text-ivory/80"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Conveniently situated near Tissa Wewa (2.5 km), Tissamaharama Stupa (2.2 km),
            Ranminitenna Cinema Village (7.5 km), and the safari gates of Yala and Bundala.
          </motion.p>
        </div>

        {/* Category Filters */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-10 sm:mb-12 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
          role="tablist"
          aria-label="Excursion categories"
        >
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-[11px] uppercase tracking-wider transition-all border ${
                  isSelected
                    ? "bg-sand text-teal-deep font-semibold border-sand shadow-md"
                    : "bg-teal-mid/50 text-ivory/80 border-sand/20 hover:border-sand/50"
                }`}
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {cat}
              </button>
            );
          })}
        </motion.div>

        {/* Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredAttractions.map((place, i) => (
            <motion.article
              key={place.slug}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="group relative flex flex-col overflow-hidden border border-sand/25 bg-teal-mid/70 backdrop-blur-md transition-all duration-500 hover:border-sand hover:-translate-y-1.5 shadow-lg shadow-black/20"
              aria-labelledby={`explore-${place.slug}-name`}
            >
              <Link href={`/explore/${place.slug}`} className="flex flex-col h-full">
                {/* Image */}
                <div className="relative aspect-[16/11] w-full overflow-hidden bg-teal-deep">
                  <Image
                    src={place.heroImage}
                    alt={place.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-106"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(10,24,21,0.92) 0%, rgba(10,24,21,0.3) 50%, rgba(10,24,21,0.5) 100%)",
                    }}
                  />

                  {/* Category Pill */}
                  <span
                    className="absolute top-3.5 left-3.5 px-3 py-1 text-[10px] uppercase tracking-wider font-semibold"
                    style={{
                      background: "rgba(212,175,55,0.95)",
                      color: "var(--color-teal-deep)",
                    }}
                  >
                    {place.category}
                  </span>

                  {/* Distance badge */}
                  <span className="absolute top-3.5 right-3.5 px-2.5 py-1 text-[10px] uppercase tracking-wider border border-sand/40 bg-teal-deep/80 text-sand-light">
                    {place.distance}
                  </span>

                  {/* Sinhala script hint */}
                  <span
                    className="absolute bottom-3 right-4 text-xs font-light text-sand-pale/80"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {place.sinhalaName}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3
                      id={`explore-${place.slug}-name`}
                      className="mb-2 text-xl sm:text-2xl font-light text-ivory group-hover:text-sand transition-colors"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      {place.name}
                    </h3>

                    <div className="flex items-center gap-3 text-xs text-sand-light/90 mb-3">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-sand" />
                        <span>{place.travelTime}</span>
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-sand" />
                        <span>{place.distance}</span>
                      </span>
                    </div>

                    <p className="text-sm font-light leading-relaxed text-ivory/75 line-clamp-3 mb-4">
                      {place.shortDescription}
                    </p>
                  </div>

                  {/* Action Link */}
                  <div className="pt-4 border-t border-sand/15 flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-[0.25em] text-sand font-medium group-hover:tracking-[0.3em] transition-all">
                      Read Insider Guide →
                    </span>
                    <span className="h-7 w-7 rounded-full flex items-center justify-center border border-sand/40 text-sand group-hover:bg-sand group-hover:text-teal-deep transition-all">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* Bottom Excursion Banner */}
        <motion.div
          custom={6}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-14 sm:mt-18 p-8 sm:p-10 border border-sand/30 bg-teal-mid/80 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="text-center md:text-left">
            <h4
              className="text-2xl sm:text-3xl font-light text-ivory mb-2"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Yala 4x4 Safari Jeeps &amp; Local Sightseeing
            </h4>
            <p className="text-sm font-light text-ivory/80 max-w-xl">
              Sri Shahrukh Lake Resort helps arrange affordable 4x4 safari jeeps with trusted local drivers,
              bicycle and car rentals, and paid airport shuttle service to Mattala Airport (29 km).
            </p>
          </div>

          <a
            href="https://wa.me/94757273416?text=Hello%20Sri%20Shahrukh%20Lake%20Resort,%20I%20would%20like%20to%20inquire%20about%20Yala%20safari%20jeep%20rates"
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 hover:scale-105"
            style={{
              background: "var(--color-sand)",
              color: "var(--color-teal-deep)",
              fontFamily: "var(--font-sans)",
            }}
          >
            Inquire Safari on WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
