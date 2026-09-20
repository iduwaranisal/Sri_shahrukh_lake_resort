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
  Pause,
  Play,
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
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const sectionRef = useScrollReveal<HTMLElement>();

  const nextPhoto = useCallback(() => {
    setSelectedPhotoIndex((prev) => (prev + 1) % activePhotos.length);
  }, [activePhotos.length]);

  const prevPhoto = useCallback(() => {
    setSelectedPhotoIndex((prev) => (prev - 1 + activePhotos.length) % activePhotos.length);
  }, [activePhotos.length]);

  // Continuously change photos every 4 seconds
  useEffect(() => {
    if (!isPlaying || isHovered || activePhotos.length <= 1) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setSelectedPhotoIndex((prev) => (prev + 1) % activePhotos.length);
    }, 4000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, isHovered, activePhotos.length]);

  const currentPhoto = activePhotos[selectedPhotoIndex] || activePhotos[0];

  return (
    <section
      id="homestay"
      ref={sectionRef}
      className="relative overflow-hidden py-20 sm:py-28 md:py-32"
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

      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16 text-center max-w-3xl mx-auto">
          <div className="scroll-reveal inline-flex items-center gap-2 mb-3 px-3.5 py-1 border border-sand/30 bg-sand/10 shadow-sm">
            <Sparkles className="w-3 h-3 text-sand animate-twinkle" />
            <p
              className="text-xs uppercase tracking-[0.3em] font-medium"
              style={{ color: "var(--color-sand-dark)", fontFamily: "var(--font-sans)" }}
            >
              The Homestay
            </p>
          </div>

          <h2
            id="homestay-heading"
            className="scroll-reveal stagger-1 text-3xl sm:text-4xl md:text-5xl font-light leading-[1.15]"
            style={{ color: "var(--color-teal-deep)", fontFamily: "var(--font-serif)" }}
          >
            {homestayTitle ? (
              homestayTitle
            ) : (
              <>
                Comfortable Living, <br />
                <span className="italic text-bronze-light">
                  Quiet Homestay Accommodation
                </span>
              </>
            )}
          </h2>

          <p
            className="scroll-reveal stagger-2 mt-3 text-sm sm:text-base font-light leading-relaxed"
            style={{ color: "var(--color-stone)", fontFamily: "var(--font-sans)" }}
          >
            {homestayDescription ||
              "Sri Shahrukh Lake Resort welcomes you with peaceful garden surroundings, clean and comfortable rooms, and warm Sri Lankan hospitality right here in Tissamaharama."}
          </p>
        </div>

        {/* ── Main Homestay Presentation ── */}
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14 items-start">
          {/* Left: Continuous Slideshow Photo Viewer (7 cols) */}
          <div className="scroll-reveal stagger-3 lg:col-span-7 flex flex-col gap-3.5">
            <div
              className="relative aspect-[16/10] w-full overflow-hidden border border-sand/30 shadow-2xl bg-teal-deep group select-none"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onTouchStart={() => setIsHovered(true)}
              onTouchEnd={() => setIsHovered(false)}
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
                        sizes="(max-width: 1024px) 100vw, 58vw"
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
                    "linear-gradient(180deg, rgba(10,24,21,0.25) 0%, transparent 40%, rgba(10,24,21,0.8) 100%)",
                }}
              />

              {/* Subtle top animated progress line */}
              {isPlaying && !isHovered && (
                <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-teal-deep/50 z-20 overflow-hidden">
                  <div
                    key={selectedPhotoIndex}
                    className="h-full bg-sand animate-photo-timer"
                  />
                </div>
              )}

              {/* Prev / Next manual navigation buttons */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevPhoto();
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 h-9 w-9 sm:h-10 sm:w-10 rounded-full border border-sand/40 bg-teal-deep/80 text-sand flex items-center justify-center opacity-80 sm:opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-sand hover:text-teal-deep active:scale-95 shadow-lg"
                aria-label="Previous homestay photo"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextPhoto();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 h-9 w-9 sm:h-10 sm:w-10 rounded-full border border-sand/40 bg-teal-deep/80 text-sand flex items-center justify-center opacity-80 sm:opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-sand hover:text-teal-deep active:scale-95 shadow-lg"
                aria-label="Next homestay photo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Top-Right Play/Pause & Counter Badge */}
              <div className="absolute top-3 right-3 z-20 flex items-center gap-2 bg-teal-deep/85 px-2.5 py-1 border border-sand/30 shadow-md">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  aria-label={isPlaying ? "Pause photo slideshow" : "Resume photo slideshow"}
                  className="text-sand hover:text-sand-light transition-colors"
                >
                  {isPlaying && !isHovered ? (
                    <Pause className="w-3 h-3" />
                  ) : (
                    <Play className="w-3 h-3" />
                  )}
                </button>
                <span className="text-[10px] text-ivory/80 font-mono">
                  {selectedPhotoIndex + 1} / {activePhotos.length}
                </span>
              </div>

              {/* Bottom Caption */}
              <div className="absolute bottom-4 left-4 right-4 z-20 text-ivory flex items-end justify-between gap-3">
                <div>
                  <p className="text-[10px] sm:text-xs uppercase tracking-wider text-sand-light font-medium">
                    Sri Shahrukh Lake Resort
                  </p>
                  <p
                    key={currentPhoto.title}
                    className="text-sm sm:text-base font-light font-serif transition-opacity duration-300"
                    style={{ textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}
                  >
                    {currentPhoto.title}
                  </p>
                </div>
              </div>
            </div>

            {/* Thumbnails with glowing active state & progress */}
            <div
              className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none touch-pan-x overscroll-contain"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {activePhotos.map((photo, i) => {
                const isSelected = selectedPhotoIndex === i;
                return (
                  <button
                    key={i}
                    onClick={() => setSelectedPhotoIndex(i)}
                    className={`relative h-16 w-24 flex-shrink-0 overflow-hidden border transition-all duration-300 ${
                      isSelected
                        ? "border-sand scale-105 shadow-md shadow-sand/20 ring-2 ring-sand/60"
                        : "border-sand/25 opacity-70 hover:opacity-100 hover:border-sand/60"
                    }`}
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
                      className="object-cover"
                      sizes="96px"
                    />
                    {isSelected && (
                      <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-sand ring-2 ring-teal-deep shadow" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Homestay Description & Amenities (5 cols) */}
          <div className="scroll-reveal stagger-4 lg:col-span-5 flex flex-col justify-between">
            <div>
              <h3
                className="text-2xl sm:text-3xl font-light text-teal-deep mb-3"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Everything You Need for a Relaxing Stay
              </h3>

              <p
                className="text-sm sm:text-base font-light leading-relaxed text-stone mb-6"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Our homestay offers a restful retreat after an exciting day exploring
                ancient temples and Yala National Park. Enjoy clean, air-conditioned rooms,
                private bathrooms with hot water, quiet garden verandahs, and attentive personal care.
              </p>

              {/* Homestay Amenities Grid with lively hover effects */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {activeAmenities.map((item, i) => {
                  const Icon =
                    typeof item.icon === "string"
                      ? iconMap[item.icon] || Sparkles
                      : (item.icon as unknown as React.ComponentType<{ className?: string }>) || Sparkles;
                  return (
                    <div
                      key={i}
                      className="p-3 border border-sand/20 bg-ivory-warm/70 flex items-start gap-2.5 transition-all duration-300 hover:border-sand/60 hover:-translate-y-1 hover:shadow-sm"
                    >
                      <Icon className="w-4 h-4 text-bronze-light flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-teal-deep font-medium">{item.title}</p>
                        <p className="text-[11px] text-stone-light leading-snug mt-0.5">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Direct Booking & WhatsApp CTAs with shimmer */}
            <div className="pt-5 border-t border-sand/20 flex flex-col sm:flex-row gap-3">
              <Link
                href="/book"
                className="btn-shimmer flex-1 flex items-center justify-center gap-2 py-3.5 px-5 text-xs font-semibold uppercase tracking-[0.2em] shadow-md shadow-black/15 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
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
                href={getWhatsAppUrl(
                  whatsapp,
                  "Hello Sri Shahrukh Lake Resort, I would like to inquire about staying at the homestay."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3.5 px-5 border border-teal-deep/30 text-teal-deep hover:bg-teal-deep hover:text-sand transition-all text-xs uppercase tracking-wider font-medium"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                <MessageCircle className="w-4 h-4 text-teal-mist" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}