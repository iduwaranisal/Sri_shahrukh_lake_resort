"use client";

import Link from "next/link";
import { Sparkles, ArrowRight, Camera } from "lucide-react";
import { optimizeImage } from "@/lib/imageOptimization";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SmoothImage } from "@/components/ui/SmoothImage";
import { defaultGalleryImages, type GalleryImage } from "@/data/gallery";

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
  const sectionRef = useScrollReveal<HTMLElement>();
  const images = (initialImages && initialImages.length > 0 ? initialImages : defaultGalleryImages) as GalleryImage[];

  // Select 4 high-impact highlight photos representing different categories
  const previewImages = images.slice(0, 4);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="py-16 sm:py-24 md:py-28 relative overflow-hidden"
      style={{ background: "var(--color-ivory-warm)" }}
      aria-labelledby="gallery-heading"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 md:px-8 lg:px-10">
        {/* Section Header */}
        <div className="mb-10 sm:mb-12 text-center max-w-2xl mx-auto">
          <div className="scroll-reveal inline-flex items-center gap-2 mb-3 px-3.5 py-1 border border-sand/30 bg-sand/10 rounded-full shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-sand animate-twinkle" />
            <p
              className="text-[10px] sm:text-xs uppercase tracking-[0.3em] font-medium"
              style={{ color: "var(--color-sand-dark)", fontFamily: "var(--font-sans)" }}
            >
              Visual Journey
            </p>
          </div>

          <h2
            id="gallery-heading"
            className="scroll-reveal stagger-1 text-3xl sm:text-4xl md:text-5xl font-light text-teal-deep"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Capturing the Essence of{" "}
            <span className="italic text-bronze-light">Sri Shahrukh</span>
          </h2>

          <p
            className="scroll-reveal stagger-2 mt-3 text-sm sm:text-base font-light text-stone leading-relaxed"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Immerse yourself in our serene rooms, lush tropical gardens, authentic Sri Lankan breakfasts, and breathtaking safari expeditions.
          </p>
        </div>

        {/* 4 Featured Preview Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 mb-10 sm:mb-12">
          {previewImages.map((img, i) => (
            <Link
              key={`${img.src}-${i}`}
              href="/gallery"
              className={`scroll-reveal stagger-${i + 1} group relative aspect-[4/3] w-full overflow-hidden rounded-lg sm:rounded-xl border border-sand/25 bg-teal-deep shadow-md transition-all duration-300 hover:shadow-xl hover:border-sand/60`}
              aria-label={`View ${img.alt} in photo gallery`}
            >
              <SmoothImage
                src={optimizeImage(img.src, {
                  width: 600,
                  quality: "auto",
                  format: "auto",
                })}
                alt={img.alt}
                fill
                loading="lazy"
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-108"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-teal-deep/85 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

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
            </Link>
          ))}
        </div>

        {/* Action Button to Dedicated Gallery Page */}
        <div className="text-center scroll-reveal stagger-4">
          <Link
            href="/gallery"
            className="btn-shimmer inline-flex items-center justify-center gap-2.5 min-h-[50px] px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] rounded-md shadow-lg shadow-black/15 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
            style={{
              background: "var(--color-sand)",
              color: "var(--color-teal-deep)",
              fontFamily: "var(--font-sans)",
            }}
          >
            <Camera className="w-4 h-4" />
            <span>View Complete Photo Gallery</span>
            <ArrowRight className="w-4 h-4 ml-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
