"use client";

import { useState } from "react";
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
} from "lucide-react";
import { optimizeImage } from "@/lib/imageOptimization";
import { useScrollReveal } from "@/hooks/useScrollReveal";

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
}: {
  homestayTitle?: string;
  homestayDescription?: string;
  amenities?: DynamicAmenity[];
  homestayImages?: DynamicHomestayImage[];
}) {
  const activeAmenities = amenities && amenities.length > 0 ? amenities : homestayAmenities;
  const activePhotos = homestayImages && homestayImages.length > 0 ? homestayImages : homestayPhotos;
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const sectionRef = useScrollReveal<HTMLElement>();

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
        className="pointer-events-none absolute -right-40 top-1/4 h-[500px] w-[500px] rounded-full opacity-[0.05] blur-3xl"
        style={{ background: "var(--color-sand)" }}
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16 text-center max-w-3xl mx-auto">
          <div className="scroll-reveal inline-flex items-center gap-2 mb-3 px-3.5 py-1 border border-sand/30 bg-sand/10">
            <Sparkles className="w-3 h-3 text-sand" />
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
          {/* Left: Photos (7 cols) */}
          <div className="scroll-reveal stagger-3 lg:col-span-7 flex flex-col gap-3">
            <div className="relative aspect-[16/10] w-full overflow-hidden border border-sand/30 shadow-xl bg-teal-deep">
              <Image
                src={optimizeImage(
                  (activePhotos[selectedPhotoIndex] || activePhotos[0]).src,
                  { width: 1200, quality: "auto", format: "auto" }
                )}
                alt={(activePhotos[selectedPhotoIndex] || activePhotos[0]).title}
                fill
                loading="lazy"
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(10,24,21,0.2) 0%, transparent 40%, rgba(10,24,21,0.7) 100%)",
                }}
              />
              <div className="absolute bottom-4 left-4 right-4 text-ivory">
                <p className="text-xs uppercase tracking-wider text-sand-light font-medium">
                  Sri Shahrukh Lake Resort
                </p>
                <p className="text-sm sm:text-base font-light font-serif">
                  {(activePhotos[selectedPhotoIndex] || activePhotos[0]).title}
                </p>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-none">
              {activePhotos.map((photo, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedPhotoIndex(i)}
                  className={`relative h-16 w-24 flex-shrink-0 overflow-hidden border transition-all ${
                    selectedPhotoIndex === i
                      ? "border-sand scale-105 shadow-md"
                      : "border-sand/25 opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
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
                </button>
              ))}
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

              {/* Homestay Amenities Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {activeAmenities.map((item, i) => {
                  const Icon =
                    typeof item.icon === "string"
                      ? iconMap[item.icon] || Sparkles
                      : (item.icon as unknown as React.ComponentType<{ className?: string }>) || Sparkles;
                  return (
                    <div
                      key={i}
                      className="p-3 border border-sand/20 bg-ivory-warm/70 flex items-start gap-2.5"
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

            {/* Direct Booking & WhatsApp CTAs */}
            <div className="pt-5 border-t border-sand/20 flex flex-col sm:flex-row gap-3">
              <Link
                href="/book"
                className="flex-1 flex items-center justify-center gap-2 py-3.5 px-5 text-xs font-semibold uppercase tracking-[0.2em] shadow-md shadow-black/15 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
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
                href="https://wa.me/94757273416?text=Hello%20Sri%20Shahrukh%20Lake%20Resort,%20I%20would%20like%20to%20inquire%20about%20staying%20at%20the%20homestay."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3.5 px-5 border border-teal-deep/30 text-teal-deep hover:bg-teal-deep/5 transition-colors text-xs uppercase tracking-wider font-light"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                <MessageCircle className="w-4 h-4 text-teal-mist" />
                <span>WhatsApp: 0757273416</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}