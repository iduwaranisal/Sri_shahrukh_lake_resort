"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Wifi,
  Car,
  Coffee,
  Calendar,
  MessageCircle,
  Wind,
  Droplets,
  TreePine,
  Compass,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { optimizeImage } from "@/lib/imageOptimization";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SmoothImage } from "@/components/ui/SmoothImage";
import { getWhatsAppUrl } from "@/lib/whatsapp";

const homestayPhotos = [
  {
    src: "https://res.cloudinary.com/znj9faa6/image/upload/v1789894680/srishahrukh/img1.jpg",
    title: "Peaceful Homestay Grounds",
  },
  {
    src: "https://res.cloudinary.com/znj9faa6/image/upload/v1789894691/srishahrukh/img2.jpg",
    title: "Comfortable Bedroom",
  },
  {
    src: "https://res.cloudinary.com/znj9faa6/image/upload/v1789894702/srishahrukh/img3.jpg",
    title: "Garden Verandah & Terrace",
  },
  {
    src: "https://res.cloudinary.com/znj9faa6/image/upload/v1789894662/srishahrukh/im_4.png",
    title: "Clean Room Setting",
  },
  {
    src: "https://res.cloudinary.com/znj9faa6/image/upload/v1789894660/srishahrukh/im_3.png",
    title: "Private Bathroom with Hot Shower",
  },
];

const homestayAmenities = [
  {
    icon: Wind,
    title: "Air Conditioning",
    desc: "Cool air conditioning and ceiling fans for restful sleep",
  },
  {
    icon: Droplets,
    title: "Hot Water Bathrooms",
    desc: "Private attached bathrooms with continuous hot water",
  },
  {
    icon: Wifi,
    title: "Free High-Speed Wi-Fi",
    desc: "Fast internet access throughout the property",
  },
  {
    icon: Coffee,
    title: "Fresh Breakfast",
    desc: "Daily Sri Lankan or continental breakfast prepared fresh",
  },
  {
    icon: TreePine,
    title: "Garden & Verandah",
    desc: "Tranquil outdoor sitting areas with natural green views",
  },
  {
    icon: Car,
    title: "Free Private Parking",
    desc: "Safe on-site vehicle parking for all guests",
  },
  {
    icon: Compass,
    title: "Safari Assistance",
    desc: "4x4 Jeep tour arrangements for Yala and Bundala parks",
  },
  {
    icon: Sparkles,
    title: "Personal Host Care",
    desc: "Warm hospitality and attentive assistance from host Geeth",
  },
];

export interface DynamicAmenity {
  title: string;
  desc: string;
  icon?: string;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Wind,
  Droplets,
  Wifi,
  Coffee,
  TreePine,
  Car,
  Compass,
  Sparkles,
};

export interface DynamicHomestayImage {
  src: string;
  title: string;
}

const SLIDE_INTERVAL = 3500;

export default function Villas({
  homestayTitle,
  homestayDescription,
  amenities,
  homestayImages,
  whatsapp = "0757273416",
}: {
  homestayTitle?: string;
  homestayDescription?: string;
  amenities?: DynamicAmenity[];
  homestayImages?: DynamicHomestayImage[];
  whatsapp?: string;
}) {
  const activeAmenities = amenities && amenities.length > 0 ? amenities : homestayAmenities;
  const activePhotos = homestayImages && homestayImages.length > 0 ? homestayImages : homestayPhotos;

  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const sectionRef = useScrollReveal<HTMLElement>();
  const thumbContainerRef = useRef<HTMLDivElement>(null);

  const nextPhoto = useCallback(() => {
    setSelectedPhotoIndex((prev) => (prev + 1) % activePhotos.length);
  }, [activePhotos.length]);

  const prevPhoto = useCallback(() => {
    setSelectedPhotoIndex((prev) => (prev - 1 + activePhotos.length) % activePhotos.length);
  }, [activePhotos.length]);

  // Auto-advance slides continuously
  useEffect(() => {
    if (isHovered || activePhotos.length <= 1) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setSelectedPhotoIndex((prev) => (prev + 1) % activePhotos.length);
    }, SLIDE_INTERVAL);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered, activePhotos.length]);

  // Auto-scroll thumbnail strip to keep active thumb visible
  useEffect(() => {
    if (!thumbContainerRef.current) return;
    const container = thumbContainerRef.current;
    const activeThumb = container.children[selectedPhotoIndex] as HTMLElement | undefined;
    if (activeThumb) {
      const scrollLeft = activeThumb.offsetLeft - container.offsetWidth / 2 + activeThumb.offsetWidth / 2;
      container.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  }, [selectedPhotoIndex]);

  // Touch swipe support for mobile
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsHovered(true);
  }, []);

  const handleTouchEnd = useCallback(() => {
    setIsHovered(false);
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        nextPhoto();
      } else {
        prevPhoto();
      }
    }
  }, [nextPhoto, prevPhoto]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const currentPhoto = activePhotos[selectedPhotoIndex] || activePhotos[0];

  return (
    <section
      id="homestay"
      ref={sectionRef}
      className="relative overflow-hidden py-16 sm:py-24 md:py-28 lg:py-32"
      style={{ background: "var(--color-ivory)" }}
      aria-labelledby="homestay-heading"
    >
      {/* Anchor for backwards compatibility */}
      <span id="rooms" className="sr-only" aria-hidden="true">
        The Homestay
      </span>
      <span id="villas" className="sr-only" aria-hidden="true">
        The Homestay
      </span>

      <div
        className="pointer-events-none absolute -right-40 top-1/4 h-[500px] w-[500px] rounded-full opacity-[0.05] blur-3xl animate-float-slow"
        style={{ background: "var(--color-sand)" }}
      />

      {/* ── Main Container with consistent side margins ── */}
      <div className="mx-auto max-w-7xl px-5 sm:px-6 md:px-8 lg:px-10 overflow-hidden">
        {/* Section Header */}
        <div className="mb-10 sm:mb-14 md:mb-16 text-center max-w-3xl mx-auto px-1">
          <div className="scroll-reveal inline-flex items-center gap-2 mb-3 px-3.5 py-1 border border-sand/30 bg-sand/10 rounded-full shadow-sm">
            <Sparkles className="w-3 h-3 text-sand animate-twinkle" />
            <p
              className="text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] font-medium"
              style={{ color: "var(--color-sand-dark)", fontFamily: "var(--font-sans)" }}
            >
              The Homestay
            </p>
          </div>

          <h2
            id="homestay-heading"
            className="scroll-reveal stagger-1 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light leading-[1.15]"
            style={{ color: "var(--color-teal-deep)", fontFamily: "var(--font-serif)" }}
          >
            {homestayTitle ? (
              homestayTitle
            ) : (
              <>
                Comfortable Living, <br className="hidden sm:block" />
                <span className="italic text-bronze-light">
                  Quiet Homestay Accommodation
                </span>
              </>
            )}
          </h2>

          <p
            className="scroll-reveal stagger-2 mt-3 text-[13px] sm:text-sm md:text-base font-light leading-relaxed max-w-2xl mx-auto"
            style={{ color: "var(--color-stone)", fontFamily: "var(--font-sans)" }}
          >
            {homestayDescription ||
              "Sri Shahrukh Lake Resort welcomes you with peaceful garden surroundings, clean and comfortable rooms, and warm Sri Lankan hospitality right here in Tissamaharama."}
          </p>
        </div>

        {/* ── Main Homestay Presentation ── */}
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-14 items-start min-w-0">
          {/* Left: Photo Viewer */}
          <div className="scroll-reveal stagger-3 lg:col-span-7 flex flex-col gap-3 min-w-0">
            <div
              className="relative aspect-[4/3] sm:aspect-[16/10] w-full overflow-hidden rounded-lg sm:rounded-xl border border-sand/25 shadow-2xl bg-teal-deep group select-none"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              role="region"
              aria-label="Homestay Photo Slideshow"
            >
              {/* Render slides with crossfade */}
              {activePhotos.map((photo, i) => {
                const isActive = i === selectedPhotoIndex;
                const isNext = i === (selectedPhotoIndex + 1) % activePhotos.length;
                const shouldRender = i === 0 || isActive || isNext;

                return (
                  <div
                    key={`${photo.src}-${i}`}
                    className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                      isActive
                        ? "opacity-100 scale-100 z-10"
                        : "opacity-0 scale-[1.03] z-0 pointer-events-none"
                    }`}
                  >
                    {shouldRender && (
                      <SmoothImage
                        src={optimizeImage(photo.src, {
                          width: 1200,
                          quality: "auto",
                          format: "auto",
                        })}
                        alt={photo.title}
                        fill
                        loading={i === 0 ? "eager" : "lazy"}
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 58vw"
                      />
                    )}
                  </div>
                );
              })}

              {/* Gradient Overlay */}
              <div
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(10,24,21,0.15) 0%, transparent 40%, rgba(10,24,21,0.75) 100%)",
                }}
              />

              {/* Auto-progress bar */}
              {!isHovered && (
                <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-teal-deep/40 z-20 overflow-hidden rounded-t-lg sm:rounded-t-xl">
                  <div
                    key={selectedPhotoIndex}
                    className="h-full bg-sand animate-photo-timer"
                  />
                </div>
              )}

              {/* Prev / Next navigation buttons */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevPhoto();
                }}
                className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-20 h-8 w-8 sm:h-10 sm:w-10 rounded-full border border-sand/40 bg-teal-deep/80 text-sand flex items-center justify-center opacity-80 sm:opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-sand hover:text-teal-deep active:scale-90 shadow-lg touch-manipulation backdrop-blur-sm"
                aria-label="Previous homestay photo"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextPhoto();
                }}
                className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-20 h-8 w-8 sm:h-10 sm:w-10 rounded-full border border-sand/40 bg-teal-deep/80 text-sand flex items-center justify-center opacity-80 sm:opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-sand hover:text-teal-deep active:scale-90 shadow-lg touch-manipulation backdrop-blur-sm"
                aria-label="Next homestay photo"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Photo counter badge */}
              <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-20 flex items-center gap-1.5 bg-teal-deep/80 backdrop-blur-sm px-2.5 py-1 rounded-full border border-sand/25 shadow-md">
                <span
                  className="text-[10px] sm:text-[11px] text-ivory/90 font-medium tabular-nums"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {selectedPhotoIndex + 1} / {activePhotos.length}
                </span>
              </div>

              {/* Bottom Caption */}
              <div className="absolute bottom-0 left-0 right-0 z-20 px-3 pb-3 sm:px-4 sm:pb-4">
                <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-sand-light/80 font-medium">
                  Sri Shahrukh Lake Resort
                </p>
                <p
                  className="text-[13px] sm:text-base font-light transition-opacity duration-300"
                  style={{
                    fontFamily: "var(--font-serif)",
                    color: "var(--color-ivory)",
                    textShadow: "0 2px 8px rgba(0,0,0,0.8)",
                  }}
                >
                  {currentPhoto.title}
                </p>
              </div>
            </div>

            {/* Thumbnails strip */}
            <div
              ref={thumbContainerRef}
              className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-1 no-scrollbar touch-pan-x overscroll-contain"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {activePhotos.map((photo, i) => {
                const isSelected = selectedPhotoIndex === i;
                return (
                  <button
                    key={i}
                    onClick={() => setSelectedPhotoIndex(i)}
                    className={`relative h-12 sm:h-14 md:h-16 flex-shrink-0 overflow-hidden rounded-md border-2 transition-all duration-300 touch-manipulation ${
                      isSelected
                        ? "border-sand shadow-md shadow-sand/20 ring-1 ring-sand/50 scale-[1.02]"
                        : "border-transparent opacity-60 hover:opacity-100 hover:border-sand/30"
                    }`}
                    style={{ width: isSelected ? "5.5rem" : "4.5rem" }}
                    aria-label={`Show ${photo.title}`}
                  >
                    <SmoothImage
                      src={optimizeImage(photo.src, {
                        width: 240,
                        height: 160,
                        crop: "fill",
                        quality: "auto",
                        format: "auto",
                      })}
                      alt={photo.title}
                      fill
                      loading="lazy"
                      className="object-cover rounded-[4px]"
                      sizes="96px"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Description & Amenities */}
          <div className="scroll-reveal stagger-4 lg:col-span-5 flex flex-col justify-between min-w-0 overflow-hidden">
            <div>
              <h3
                className="text-xl sm:text-2xl md:text-3xl font-light text-teal-deep mb-2 sm:mb-3"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Everything You Need for a Relaxing Stay
              </h3>

              <p
                className="text-[13px] sm:text-sm md:text-base font-light leading-relaxed text-stone mb-5 sm:mb-6"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Our homestay offers a restful retreat after an exciting day exploring
                ancient temples and Yala National Park. Enjoy clean, air-conditioned rooms,
                private bathrooms with hot water, quiet garden verandahs, and attentive personal care.
              </p>

              {/* Amenities Grid — responsive: 1 col mobile, 2 col tablet+ */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 mb-6 sm:mb-8">
                {activeAmenities.map((item, i) => {
                  const Icon =
                    typeof item.icon === "string"
                      ? iconMap[item.icon] || Sparkles
                      : (item.icon as unknown as React.ComponentType<{ className?: string }>) || Sparkles;
                  return (
                    <div
                      key={i}
                      className="p-2.5 sm:p-3 border border-sand/15 bg-ivory-warm/60 rounded-lg flex items-start gap-2.5 transition-all duration-300 hover:border-sand/50 hover:-translate-y-0.5 hover:shadow-sm active:scale-[0.98]"
                    >
                      <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-sand/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-bronze-light" />
                      </div>
                      <div className="min-w-0">
                        <p
                          className="text-[11px] sm:text-xs text-teal-deep font-semibold leading-tight"
                          style={{ fontFamily: "var(--font-sans)" }}
                        >
                          {item.title}
                        </p>
                        <p
                          className="text-[10px] sm:text-[11px] text-stone-light leading-snug mt-0.5"
                          style={{ fontFamily: "var(--font-sans)" }}
                        >
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-4 sm:pt-5 border-t border-sand/20 flex flex-col sm:flex-row gap-2.5 sm:gap-3">
              <Link
                href="/book"
                className="btn-shimmer flex-1 flex items-center justify-center gap-2 py-3 sm:py-3.5 px-5 text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] sm:tracking-[0.2em] rounded-md shadow-md shadow-black/15 transition-all duration-300 hover:scale-[1.02] active:scale-[0.97]"
                style={{
                  background: "var(--color-sand)",
                  color: "var(--color-teal-deep)",
                  fontFamily: "var(--font-sans)",
                }}
              >
                <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Book Now</span>
              </Link>

              <a
                href={getWhatsAppUrl(
                  whatsapp,
                  "Hello Sri Shahrukh Lake Resort, I would like to inquire about staying at the homestay."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 sm:py-3.5 px-5 border border-teal-deep/25 text-teal-deep rounded-md hover:bg-teal-deep hover:text-sand transition-all text-[11px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-wider font-medium active:scale-[0.97]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-mist" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}