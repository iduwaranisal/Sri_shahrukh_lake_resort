"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence, type Variants } from "framer-motion";
import Image from "next/image";
import { Sparkles, ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { optimizeImage } from "@/lib/imageOptimization";

interface GalleryImage {
  src: string;
  alt: string;
  category: "The Homestay" | "Lake & Nature" | "Wildlife & Heritage" | "Homestay Life";
}

const galleryImages: GalleryImage[] = [
  { src: "https://res.cloudinary.com/znj9faa6/image/upload/v1789894680/srishahrukh/img1.jpg", alt: "Peaceful homestay exterior and garden grounds", category: "The Homestay" },
  { src: "https://res.cloudinary.com/znj9faa6/image/upload/v1789894691/srishahrukh/img2.jpg", alt: "Comfortable bedroom with clean linens", category: "The Homestay" },
  { src: "https://res.cloudinary.com/znj9faa6/image/upload/v1789894717/srishahrukh/tissa-lake-sunrise.jpg", alt: "Tissa Wewa reservoir at dawn with morning mist and lotus blossoms", category: "Lake & Nature" },
  { src: "https://res.cloudinary.com/znj9faa6/image/upload/v1789894726/srishahrukh/yala-leopard.jpg", alt: "Sri Lankan leopard basking on granite outcrop in Yala National Park", category: "Wildlife & Heritage" },
  { src: "https://res.cloudinary.com/znj9faa6/image/upload/v1789894722/srishahrukh/tissamaharama-stupa.jpg", alt: "Ancient white stupa of Tissamaharama Raja Maha Vihara against sunset", category: "Wildlife & Heritage" },
  { src: "https://res.cloudinary.com/znj9faa6/image/upload/v1789894702/srishahrukh/img3.jpg", alt: "Garden terrace and peaceful sitting area", category: "The Homestay" },
  { src: "https://res.cloudinary.com/znj9faa6/image/upload/v1789894657/srishahrukh/im_10.png", alt: "Homestay grounds at sunset", category: "The Homestay" },
  { src: "https://res.cloudinary.com/znj9faa6/image/upload/v1789894641/srishahrukh/bundala-flamingos.jpg", alt: "Greater Flamingos wading in Bundala UNESCO Ramsar wetland", category: "Wildlife & Heritage" },
  { src: "https://res.cloudinary.com/znj9faa6/image/upload/v1789894706/srishahrukh/kataragama-temple.jpg", alt: "Sacred evening puja ceremony with clay oil lamps at Kataragama", category: "Wildlife & Heritage" },
  { src: "https://res.cloudinary.com/znj9faa6/image/upload/v1789894710/srishahrukh/kirinda-temple.jpg", alt: "Kirinda cliff temple above crashing southern Indian Ocean waves", category: "Wildlife & Heritage" },
  { src: "https://res.cloudinary.com/znj9faa6/image/upload/v1789894668/srishahrukh/im_7.png", alt: "Fresh home-cooked Sri Lankan breakfast", category: "Homestay Life" },
  { src: "https://res.cloudinary.com/znj9faa6/image/upload/v1789894645/srishahrukh/hero1.jpg", alt: "Untamed wilderness of Ruhuna dry-zone forest and granite hills", category: "Lake & Nature" },
  { src: "https://res.cloudinary.com/znj9faa6/image/upload/v1789894664/srishahrukh/im_5.png", alt: "Garden relaxation area overlooking tropical greenery", category: "Homestay Life" },
  { src: "https://res.cloudinary.com/znj9faa6/image/upload/v1789894662/srishahrukh/im_4.png", alt: "Clean, comfortable room setting", category: "The Homestay" },
  { src: "https://res.cloudinary.com/znj9faa6/image/upload/v1789894660/srishahrukh/im_3.png", alt: "Attached private bathroom with hot water shower", category: "The Homestay" },
  { src: "https://res.cloudinary.com/znj9faa6/image/upload/v1789894643/srishahrukh/hero_4.jpg", alt: "Homestay entrance surrounded by tropical palms", category: "Homestay Life" },
];

const categories = [
  "All Views",
  "The Homestay",
  "Lake & Nature",
  "Wildlife & Heritage",
  "Homestay Life",
] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export interface DynamicGalleryImage {
  src: string;
  alt: string;
  category: string;
}

export default function Gallery({
  initialImages,
}: {
  initialImages?: DynamicGalleryImage[];
} = {}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [selectedCategory, setSelectedCategory] = useState<string>("All Views");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const allImages = initialImages && initialImages.length > 0 ? initialImages : galleryImages;

  const filteredImages =
    selectedCategory === "All Views"
      ? allImages
      : allImages.filter((img) => img.category === selectedCategory);

  const handleNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredImages.length);
  }, [lightboxIndex, filteredImages.length]);

  const handlePrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredImages.length) % filteredImages.length);
  }, [lightboxIndex, filteredImages.length]);

  // Keyboard navigation listener for lightbox
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
    <section
      id="gallery"
      ref={ref}
      className="py-24 sm:py-32 md:py-36 relative"
      style={{ background: "var(--color-ivory-warm)" }}
      aria-labelledby="gallery-heading"
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
              className="text-xs uppercase tracking-[0.35em] font-medium"
              style={{ color: "var(--color-sand-dark)", fontFamily: "var(--font-sans)" }}
            >
              Photo Gallery
            </p>
          </motion.div>

          <motion.h2
            id="gallery-heading"
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="text-3xl sm:text-4xl md:text-5xl font-light text-teal-deep"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Photos of Our{" "}
            <span className="italic text-bronze-light">Homestay</span>
          </motion.h2>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="mt-3 text-sm sm:text-base font-light text-stone"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Take a look around our rooms, peaceful garden, and the beautiful sights in and around Tissamaharama.
          </motion.p>
        </div>

        {/* Category Filters */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-10 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5"
          role="tablist"
          aria-label="Gallery category filters"
        >
          {categories.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                role="tab"
                aria-selected={isSelected}
                onClick={() => {
                  setSelectedCategory(category);
                  setLightboxIndex(null);
                }}
                className={`px-4 py-2 text-[11px] uppercase tracking-wider transition-all border ${
                  isSelected
                    ? "bg-teal-deep text-sand border-teal-deep font-medium shadow-sm"
                    : "bg-ivory text-stone border-sand/20 hover:border-sand hover:text-teal-deep"
                }`}
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {category}
              </button>
            );
          })}
        </motion.div>

        {/* Responsive Photo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {filteredImages.map((img, i) => (
            <motion.button
              key={`${img.src}-${i}`}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              onClick={() => setLightboxIndex(i)}
              aria-label={`Enlarge photograph: ${img.alt}`}
              className="group relative aspect-[4/3] w-full overflow-hidden border border-sand/20 bg-teal-deep focus:outline-none focus:ring-2 focus:ring-sand cursor-pointer"
            >
              <Image
                src={optimizeImage(img.src, {
                  width: 600,
                  quality: "auto",
                  format: "auto",
                })}
                alt={img.alt}
                fill
                loading="lazy"
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-108"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center bg-teal-deep/50"
              >
                <div className="h-10 w-10 rounded-full border border-sand bg-teal-deep/80 flex items-center justify-center text-sand shadow-lg">
                  <ZoomIn className="w-5 h-5" />
                </div>
              </div>
              <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <span className="text-[10px] text-ivory bg-teal-deep/90 px-2 py-0.5 uppercase tracking-wider truncate block">
                  {img.category}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Accessible Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
            style={{ background: "rgba(10,24,21,0.96)", backdropFilter: "blur(20px)" }}
            onClick={() => setLightboxIndex(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Image View Lightbox"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top bar with count and close */}
              <div className="w-full flex items-center justify-between pb-3 text-ivory">
                <span className="text-xs uppercase tracking-[0.25em] text-sand font-medium">
                  {lightboxIndex + 1} of {filteredImages.length} · {filteredImages[lightboxIndex].category}
                </span>
                <button
                  onClick={() => setLightboxIndex(null)}
                  className="h-10 w-10 flex items-center justify-center border border-sand/40 text-sand hover:bg-sand/15 transition-all"
                  aria-label="Close Lightbox"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Main Image Container */}
              <div className="relative aspect-[16/10] w-full max-h-[70vh] overflow-hidden border border-sand/30 shadow-2xl bg-teal-deep">
                <Image
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
              <div className="w-full pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                <p className="text-xs sm:text-sm font-light text-ivory/80 max-w-xl">
                  {filteredImages[lightboxIndex].alt}
                </p>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handlePrev}
                    className="h-10 w-10 flex items-center justify-center border border-sand/40 text-sand hover:bg-sand/20 transition-all"
                    aria-label="Previous photograph"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="h-10 w-10 flex items-center justify-center border border-sand/40 text-sand hover:bg-sand/20 transition-all"
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
    </section>
  );
}
