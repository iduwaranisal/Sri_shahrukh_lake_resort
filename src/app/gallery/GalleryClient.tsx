"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn,
  Camera,
  CheckCircle2,
  ArrowUp,
  Calendar,
} from "lucide-react";
import { optimizeImage } from "@/lib/imageOptimization";
import { SmoothImage } from "@/components/ui/SmoothImage";
import { defaultGalleryImages, galleryCategories, type GalleryImage } from "@/data/gallery";

interface GalleryClientProps {
  initialImages?: GalleryImage[];
  whatsapp?: string;
  phone?: string;
}

export default function GalleryClient({
  initialImages,
  whatsapp = "0757273416",
}: GalleryClientProps) {
  const images = useMemo(
    () => (initialImages && initialImages.length > 0 ? initialImages : defaultGalleryImages),
    [initialImages]
  );

  const [selectedCategory, setSelectedCategory] = useState<string>("All Views");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const gridTopRef = useRef<HTMLDivElement>(null);

  // Compute filtered images based on active category — all load immediately
  const filteredImages = useMemo(() => {
    if (selectedCategory === "All Views") return images;
    return images.filter((img) => img.category === selectedCategory);
  }, [images, selectedCategory]);

  // Calculate category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { "All Views": images.length };
    images.forEach((img) => {
      counts[img.category] = (counts[img.category] || 0) + 1;
    });
    return counts;
  }, [images]);

  // Handle category change
  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setLightboxIndex(null);
  };

  const scrollToTop = () => {
    gridTopRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Lightbox handlers
  const handleNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredImages.length);
  }, [lightboxIndex, filteredImages.length]);

  const handlePrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredImages.length) % filteredImages.length);
  }, [lightboxIndex, filteredImages.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, handleNext, handlePrev]);

  return (
    <div className="min-h-screen" style={{ background: "var(--color-ivory)" }}>
      {/* ── Page Hero Header ── */}
      <section
        className="relative pt-28 sm:pt-36 pb-16 sm:pb-20 overflow-hidden text-center"
        style={{
          background: "linear-gradient(180deg, #0a1815 0%, #132722 70%, #0a1815 100%)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: "radial-gradient(var(--color-sand) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 md:px-8 lg:px-10 z-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-sand/80">
              <li>
                <Link href="/" className="hover:text-sand transition-colors">
                  Home
                </Link>
              </li>
              <li>·</li>
              <li className="text-sand font-medium" aria-current="page">
                Photo Gallery
              </li>
            </ol>
          </nav>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 border border-sand/30 bg-teal-deep/80 rounded-full shadow-lg backdrop-blur-md">
            <Camera className="w-3.5 h-3.5 text-sand animate-twinkle" />
            <span
              className="text-[10px] sm:text-xs uppercase tracking-[0.25em] font-semibold text-sand"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Curated Photo Collection
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-3xl sm:text-5xl md:text-6xl font-bold leading-[1.12] tracking-tight text-ivory mb-4"
            style={{
              fontFamily: "'Playfair Display', var(--font-serif)",
              textShadow: "0 4px 24px rgba(0,0,0,0.8)",
            }}
          >
            Photos of Sri Shahrukh
            <br />
            <span className="italic font-normal text-sand-light text-2xl sm:text-4xl md:text-5xl">
              Lake Resort &amp; Surroundings
            </span>
          </h1>

          <p
            className="text-sm sm:text-base md:text-lg font-light leading-relaxed text-ivory/80 max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Explore our tranquil homestay rooms, shaded garden terrace, homemade authentic breakfasts,
            and the historic beauty of ancient Tissamaharama and Yala National Park.
          </p>

          {/* Quick Stats Pill */}
          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[11px] sm:text-xs text-ivory/70 border border-sand/20 px-4 py-2 bg-teal-deep/60 rounded-full">
            <span className="text-sand font-medium">{images.length} High-Resolution Photos</span>
            <span className="text-sand/30">|</span>
            <span>4 Unique Categories</span>
            <span className="text-sand/30">|</span>
            <span className="text-sand font-medium">Tissamaharama</span>
          </div>
        </div>
      </section>

      {/* ── Main Gallery Section ── */}
      <section
        ref={gridTopRef}
        className="py-12 sm:py-16 md:py-20"
        style={{ background: "var(--color-ivory-warm)" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10">
          {/* ── Category Filter Bar ── */}
          <div className="mb-8 sm:mb-12">
            <div
              className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto sm:flex-wrap sm:justify-center no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 py-1"
              role="tablist"
              aria-label="Gallery category filters"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {galleryCategories.map((category) => {
                const isSelected = selectedCategory === category;
                const count = categoryCounts[category] || 0;
                return (
                  <button
                    key={category}
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => handleCategoryChange(category)}
                    className={`flex-shrink-0 whitespace-nowrap min-h-[42px] px-4 sm:px-5 py-2 text-[11px] sm:text-xs uppercase tracking-wider transition-all duration-300 rounded-full border touch-manipulation flex items-center gap-2 ${
                      isSelected
                        ? "bg-teal-deep text-sand border-teal-deep font-semibold shadow-md scale-[1.02]"
                        : "bg-ivory text-stone border-sand/25 hover:border-sand hover:text-teal-deep hover:bg-white"
                    }`}
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    <span>{category}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono transition-colors ${
                        isSelected
                          ? "bg-sand text-teal-deep font-bold"
                          : "bg-sand/15 text-stone-light"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Responsive Image Grid — Loads All Images Directly ── */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
            {filteredImages.map((img, i) => (
              <div
                key={`${img.src}-${i}`}
                className="group relative aspect-[4/3] w-full overflow-hidden rounded-lg sm:rounded-xl border border-sand/25 bg-teal-deep shadow-md transition-all duration-300 hover:shadow-xl hover:border-sand/60 focus-within:ring-2 focus-within:ring-sand"
              >
                <button
                  onClick={() => setLightboxIndex(i)}
                  aria-label={`Enlarge photograph: ${img.alt}`}
                  className="absolute inset-0 w-full h-full cursor-pointer text-left focus:outline-none"
                >
                  <SmoothImage
                    src={optimizeImage(img.src, {
                      width: 600,
                      quality: "auto",
                      format: "auto",
                    })}
                    alt={img.alt}
                    fill
                    loading={i < 8 ? "eager" : "lazy"}
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-108"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-deep/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

                  {/* Hover Center Icon */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <div className="h-11 w-11 rounded-full border border-sand bg-teal-deep/85 flex items-center justify-center text-sand shadow-xl transform scale-90 group-hover:scale-100 transition-transform duration-300">
                      <ZoomIn className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Bottom Caption Pill */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 z-10">
                    <span className="inline-block text-[9px] sm:text-[10px] text-sand-light bg-teal-deep/90 backdrop-blur-sm px-2 py-0.5 rounded uppercase tracking-wider font-medium mb-1 shadow-sm">
                      {img.category}
                    </span>
                    <p
                      className="text-xs font-light text-ivory line-clamp-1 opacity-90 group-hover:opacity-100"
                      style={{
                        fontFamily: "var(--font-serif)",
                        textShadow: "0 1px 4px rgba(0,0,0,0.8)",
                      }}
                    >
                      {img.alt}
                    </p>
                  </div>
                </button>
              </div>
            ))}
          </div>

          {/* ── Scroll to Top Action ── */}
          <div className="mt-10 sm:mt-12 text-center">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 text-xs text-sand-dark hover:text-sand font-semibold uppercase tracking-wider underline underline-offset-4 transition-colors"
            >
              <ArrowUp className="w-4 h-4" />
              <span>Back to top</span>
            </button>
          </div>

          {/* ── Bottom Booking Card ── */}
          <div className="mt-16 sm:mt-24 p-6 sm:p-10 rounded-2xl border border-sand/30 bg-teal-deep text-center shadow-2xl relative overflow-hidden">
            <div
              className="pointer-events-none absolute -right-20 -bottom-20 h-64 w-64 rounded-full opacity-10 blur-3xl"
              style={{ background: "var(--color-sand)" }}
            />

            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 mb-3 px-3.5 py-1 border border-sand/30 bg-teal-mid/80 rounded-full">
                <Sparkles className="w-3 h-3 text-sand animate-twinkle" />
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-sand font-medium">
                  Experience It In Person
                </span>
              </div>

              <h2
                className="text-2xl sm:text-3xl md:text-4xl font-light text-ivory mb-3"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Experience Sri Shahrukh Firsthand
              </h2>

              <p
                className="text-xs sm:text-sm md:text-base font-light text-ivory/80 leading-relaxed max-w-xl mx-auto"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Immerse yourself in gentle lakeside tranquility, heartfelt host care, authentic Sri Lankan breakfasts, and bespoke Yala safari expeditions.
              </p>

              <div className="mt-6 flex justify-center">
                <Link
                  href="/book"
                  className="btn-shimmer inline-flex items-center justify-center gap-2 px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] rounded-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-black/30"
                  style={{
                    background: "var(--color-sand)",
                    color: "var(--color-teal-deep)",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  <Calendar className="w-4 h-4" />
                  <span>Reserve Your Stay</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Accessible Lightbox Modal ── */}
      <AnimatePresence>
        {lightboxIndex !== null && filteredImages[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
            style={{ background: "rgba(10,24,21,0.96)" }}
            onClick={() => setLightboxIndex(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Image View Lightbox"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top bar with counter & close */}
              <div className="w-full flex items-center justify-between pb-3 text-ivory px-1">
                <span className="text-xs uppercase tracking-[0.2em] text-sand font-medium">
                  {lightboxIndex + 1} of {filteredImages.length} · {filteredImages[lightboxIndex].category}
                </span>
                <button
                  onClick={() => setLightboxIndex(null)}
                  className="h-10 w-10 sm:h-11 sm:w-11 flex items-center justify-center rounded-full border border-sand/40 text-sand hover:bg-sand/20 transition-all touch-manipulation active:scale-95"
                  aria-label="Close Lightbox"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Main Image Container — High-res requested on demand */}
              <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full max-h-[68vh] overflow-hidden rounded-lg sm:rounded-xl border border-sand/30 shadow-2xl bg-teal-deep">
                <SmoothImage
                  src={optimizeImage(filteredImages[lightboxIndex].src, {
                    width: 1600,
                    quality: "auto",
                    format: "auto",
                  })}
                  alt={filteredImages[lightboxIndex].alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>

              {/* Caption and Navigation Controls */}
              <div className="w-full pt-3 sm:pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left px-1">
                <p className="text-xs sm:text-sm font-light text-ivory/85 max-w-xl">
                  {filteredImages[lightboxIndex].alt}
                </p>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handlePrev}
                    className="h-10 w-10 sm:h-11 sm:w-11 flex items-center justify-center rounded-full border border-sand/40 text-sand hover:bg-sand/20 transition-all touch-manipulation active:scale-95"
                    aria-label="Previous photograph"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="h-10 w-10 sm:h-11 sm:w-11 flex items-center justify-center rounded-full border border-sand/40 text-sand hover:bg-sand/20 transition-all touch-manipulation active:scale-95"
                    aria-label="Next photograph"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
