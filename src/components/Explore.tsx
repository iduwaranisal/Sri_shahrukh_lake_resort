"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Compass, MapPin, Clock, ArrowUpRight, Calendar } from "lucide-react";
import { attractions } from "@/data/explore";
import { optimizeImage } from "@/lib/imageOptimization";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SmoothImage } from "@/components/ui/SmoothImage";

const categories = [
  "All Destinations",
  "Wildlife Safari",
  "Ancient Sacred Heritage",
  "UNESCO Wetland & Avifauna",
  "Nature & Heritage",
];

export interface DynamicExploreImage {
  id: string;
  name: string;
  src: string;
}

export default function Explore({
  customImages,
}: {
  customImages?: DynamicExploreImage[];
} = {}) {
  const [activeCategory, setActiveCategory] = useState("All Destinations");
  const sectionRef = useScrollReveal<HTMLElement>();

  const mergedAttractions = attractions.map((item) => {
    const override = customImages?.find((c) => c.id === item.slug);
    return override?.src ? { ...item, heroImage: override.src } : item;
  });

  const filteredAttractions =
    activeCategory === "All Destinations"
      ? mergedAttractions
      : mergedAttractions.filter((a) =>
          a.category.toLowerCase().includes(activeCategory.toLowerCase().slice(0, 5))
        );

  return (
    <section
      id="explore"
      ref={sectionRef}
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
          <div className="scroll-reveal inline-flex items-center gap-2 mb-3 px-3.5 py-1 border border-sand/30 bg-sand/10 shadow-sm">
            <Compass className="w-3.5 h-3.5 text-sand animate-twinkle" />
            <p
              className="text-xs uppercase tracking-[0.35em] text-sand font-medium"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Excursions &amp; Regional Wonders
            </p>
          </div>

          <h2
            id="explore-heading"
            className="scroll-reveal stagger-1 text-3xl sm:text-5xl md:text-6xl font-light text-ivory leading-[1.15]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Explore Around{" "}
            <span className="italic gold-text-gradient font-normal">
              Tissamaharama
            </span>
          </h2>

          <p
            className="scroll-reveal stagger-2 mt-4 text-sm sm:text-base font-light leading-relaxed text-ivory/80"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Ideally stationed minutes from sacred ancient stupas, tranquil freshwater lakes, and the legendary wildlife reserves of Yala and Bundala.
          </p>
        </div>

        {/* Category Filters */}
        <div
          className="scroll-reveal stagger-3 mb-10 sm:mb-12 flex items-center gap-2 sm:gap-3 overflow-x-auto sm:flex-wrap sm:justify-center no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 py-1"
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
                className={`flex-shrink-0 whitespace-nowrap min-h-[40px] px-4 py-2 text-[11px] uppercase tracking-wider transition-all border touch-manipulation ${
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
        </div>

        {/* Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredAttractions.map((place, i) => (
            <article
              key={place.slug}
              className={`scroll-reveal stagger-${Math.min(i + 1, 6)} group relative flex flex-col overflow-hidden border border-sand/25 bg-teal-mid/70 transition-all duration-500 hover:border-sand hover:-translate-y-1.5 shadow-lg shadow-black/20`}
              aria-labelledby={`explore-${place.slug}-name`}
            >
              <Link href={`/explore/${place.slug}`} className="flex flex-col h-full">
                {/* Image */}
                <div className="relative aspect-[16/11] w-full overflow-hidden bg-teal-deep">
                  <SmoothImage
                    src={optimizeImage(place.heroImage, {
                      width: 800,
                      quality: "auto",
                      format: "auto",
                    })}
                    alt={place.name}
                    fill
                    loading="lazy"
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
                      Explore Destination
                    </span>
                    <span className="h-7 w-7 rounded-full flex items-center justify-center border border-sand/40 text-sand group-hover:bg-sand group-hover:text-teal-deep transition-all">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* Bottom Destination Info Banner */}
        <div className="scroll-reveal stagger-6 mt-14 sm:mt-18 p-8 sm:p-10 border border-sand/30 bg-teal-mid/80 text-center max-w-3xl mx-auto">
          <h4
            className="text-2xl sm:text-3xl font-light text-ivory mb-2"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Begin Your Wilderness &amp; Heritage Journey
          </h4>
          <p className="text-sm font-light text-ivory/80 leading-relaxed max-w-xl mx-auto">
            Whether you&apos;re rising before dawn for a leopard safari in Yala or seeking evening solace by Tissa Wewa lake, our sanctuary provides the peaceful haven you return to.
          </p>
          <div className="mt-6 flex justify-center">
            <Link
              href="/book"
              onClick={() => {
                if (typeof window !== "undefined") {
                  sessionStorage.setItem("resort_scroll_pos", window.scrollY.toString());
                }
              }}
              className="btn-shimmer inline-flex items-center justify-center gap-2 px-7 py-3.5 text-xs font-bold uppercase tracking-[0.2em] rounded-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-black/30"
              style={{
                background: "var(--color-sand)",
                color: "var(--color-teal-deep)",
                fontFamily: "var(--font-sans)",
              }}
            >
              <Calendar className="w-4 h-4" />
              <span>Plan Your Stay &amp; Safari</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
