"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence, type Variants } from "framer-motion";
import Image from "next/image";
import {
  BedDouble,
  Users,
  Ruler,
  Eye,
  Waves,
  Bath,
  Wind,
  ConciergeBell,
  UtensilsCrossed,
  Car,
  Wine,
  Wifi,
  Sparkles,
  MessageCircle,
  Calendar,
} from "lucide-react";
import { villasData, type Villa } from "@/data/villas";

const iconMap = {
  bed: BedDouble,
  guests: Users,
  size: Ruler,
  view: Eye,
  pool: Waves,
  bath: Bath,
  ac: Wind,
  butler: ConciergeBell,
  dining: UtensilsCrossed,
  transfer: Car,
  bar: Wine,
  wifi: Wifi,
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Villas() {
  const [selectedVillaIndex, setSelectedVillaIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const activeVilla: Villa = villasData[selectedVillaIndex];

  // Function to handle room preselection in booking form
  const handleSelectVillaForBooking = (roomName: string) => {
    window.dispatchEvent(
      new CustomEvent("preselect-villa", { detail: { villa: roomName } })
    );

    const bookingSection = document.getElementById("booking");
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="rooms"
      ref={ref}
      className="relative overflow-hidden py-20 sm:py-28 md:py-32"
      style={{ background: "var(--color-ivory)" }}
      aria-labelledby="rooms-heading"
    >
      {/* Anchor for backwards compatibility */}
      <span id="villas" className="sr-only" aria-hidden="true">
        Rooms
      </span>

      <div
        className="pointer-events-none absolute -right-40 top-1/4 h-[500px] w-[500px] rounded-full opacity-[0.05] blur-3xl"
        style={{ background: "var(--color-sand)" }}
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
        {/* Section Header */}
        <div className="mb-10 sm:mb-14 text-center max-w-3xl mx-auto">
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="inline-flex items-center gap-2 mb-3 px-3.5 py-1 border border-sand/30 bg-sand/10"
          >
            <Sparkles className="w-3 h-3 text-sand" />
            <p
              className="text-xs uppercase tracking-[0.3em] font-medium"
              style={{ color: "var(--color-sand-dark)", fontFamily: "var(--font-sans)" }}
            >
              Accommodations &amp; Rates
            </p>
          </motion.div>

          <motion.h2
            id="rooms-heading"
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="text-3xl sm:text-4xl md:text-5xl font-light leading-[1.15]"
            style={{ color: "var(--color-teal-deep)", fontFamily: "var(--font-serif)" }}
          >
            Homestay Rooms, <br />
            <span className="italic text-bronze-light">
              Simple, Clean &amp; Affordable Comfort
            </span>
          </motion.h2>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="mt-3 text-sm sm:text-base font-light leading-relaxed"
            style={{ color: "var(--color-stone)", fontFamily: "var(--font-sans)" }}
          >
            Every room at Sri Shahrukh Lake Resort provides free Wi-Fi,
            clean attached bathrooms, garden and outdoor views, and direct support for Yala safari tours.
          </motion.p>
        </div>

        {/* ── Room Tabs Selector ── */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-8 sm:mb-12 overflow-x-auto pb-2 scrollbar-none"
          role="tablist"
          aria-label="Room Type Selector"
        >
          <div className="flex sm:justify-center items-center gap-2 sm:gap-3 min-w-max px-1">
            {villasData.map((villa, idx) => {
              const isSelected = idx === selectedVillaIndex;
              return (
                <button
                  key={villa.id}
                  role="tab"
                  id={`room-tab-${villa.id}`}
                  aria-selected={isSelected}
                  aria-controls={`room-panel-${villa.id}`}
                  onClick={() => {
                    setSelectedVillaIndex(idx);
                    setSelectedImageIndex(0);
                  }}
                  className={`relative px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm uppercase tracking-[0.15em] font-medium transition-all duration-300 border ${
                    isSelected
                      ? "border-sand text-teal-deep bg-sand/15 shadow-md shadow-sand/10"
                      : "border-stone-light/20 text-stone hover:text-teal-deep hover:border-sand/40 bg-ivory-warm/60"
                  }`}
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  <span>{villa.name}</span>
                  {villa.highlightBadge && (
                    <span
                      className={`ml-2 text-[9px] px-1.5 py-0.5 uppercase tracking-wider ${
                        isSelected
                          ? "bg-teal-deep text-sand font-normal"
                          : "bg-stone/15 text-stone font-normal"
                      }`}
                    >
                      {villa.highlightBadge}
                    </span>
                  )}
                  {isSelected && (
                    <motion.div
                      layoutId="activeRoomIndicator"
                      className="absolute -bottom-[2px] left-0 right-0 h-[2px] bg-sand"
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ── Active Room Detail Card ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeVilla.id}
            id={`room-panel-${activeVilla.id}`}
            role="tabpanel"
            aria-labelledby={`room-tab-${activeVilla.id}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-10 lg:grid-cols-12 lg:gap-14 items-start"
          >
            {/* Left: Imagery (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="relative aspect-[16/11] sm:aspect-[16/10] w-full overflow-hidden border border-sand/30 shadow-xl bg-teal-deep">
                <Image
                  src={activeVilla.gallery[selectedImageIndex] || activeVilla.image}
                  alt={`${activeVilla.name} photo`}
                  fill
                  priority
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

                <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
                  <span
                    className="inline-block px-3 py-1 text-[10px] sm:text-xs uppercase tracking-[0.2em] font-medium backdrop-blur-md"
                    style={{
                      background: "rgba(10,24,21,0.85)",
                      color: "var(--color-sand)",
                      border: "1px solid rgba(212,175,55,0.4)",
                      fontFamily: "var(--font-sans)",
                    }}
                  >
                    {activeVilla.tagline}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-ivory">
                  <p className="text-xs uppercase tracking-wider text-sand-light font-medium">
                    {activeVilla.specs.view}
                  </p>
                  <p className="text-sm sm:text-base font-light font-serif">
                    {activeVilla.specs.size} · {activeVilla.specs.occupancy}
                  </p>
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3">
                {activeVilla.gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImageIndex(i)}
                    aria-label={`View ${activeVilla.name} picture ${i + 1}`}
                    className={`relative aspect-[16/10] h-16 sm:h-20 flex-1 overflow-hidden border transition-all ${
                      selectedImageIndex === i
                        ? "border-sand ring-2 ring-sand/50 scale-102"
                        : "border-sand/20 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${activeVilla.name} thumbnail ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="150px"
                    />
                  </button>
                ))}
              </div>

              {/* Specs Strip */}
              <div
                className="grid grid-cols-2 sm:grid-cols-4 divide-x border border-sand/30"
                style={{ background: "var(--color-ivory-warm)" }}
              >
                <div className="p-3 text-center">
                  <p className="text-[10px] uppercase tracking-wider text-stone-light">Room Area</p>
                  <p className="text-xs sm:text-sm font-medium text-teal-deep">{activeVilla.specs.size}</p>
                </div>
                <div className="p-3 text-center">
                  <p className="text-[10px] uppercase tracking-wider text-stone-light">Guests</p>
                  <p className="text-xs sm:text-sm font-medium text-teal-deep">{activeVilla.specs.occupancy}</p>
                </div>
                <div className="p-3 text-center">
                  <p className="text-[10px] uppercase tracking-wider text-stone-light">Bed Setup</p>
                  <p className="text-xs sm:text-sm font-medium text-teal-deep truncate" title={activeVilla.specs.bed}>
                    {activeVilla.specs.bed}
                  </p>
                </div>
                <div className="p-3 text-center">
                  <p className="text-[10px] uppercase tracking-wider text-stone-light">View</p>
                  <p className="text-xs sm:text-sm font-medium text-teal-deep truncate" title={activeVilla.specs.view}>
                    {activeVilla.specs.view.split("&")[0]}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Details & Features (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <h3
                  className="text-2xl sm:text-3xl font-light text-teal-deep mb-2"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {activeVilla.name}
                </h3>

                <p
                  className="text-sm sm:text-base font-light leading-relaxed text-stone mb-5"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {activeVilla.description}
                </p>

                {/* Key Amenities Checklist */}
                <div className="mb-6">
                  <p
                    className="text-[10px] uppercase tracking-[0.25em] font-semibold text-sand-dark mb-2.5"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    Included Amenities &amp; Services
                  </p>
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {activeVilla.amenities.map((amenity, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-stone font-light">
                        <span className="text-sand mt-0.5 font-bold">✓</span>
                        <span>{amenity}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Feature Icons Grid */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {activeVilla.features.slice(0, 6).map((feat, i) => {
                    const Icon = iconMap[feat.icon] || Sparkles;
                    return (
                      <div
                        key={i}
                        className="flex items-center gap-2.5 p-2 border border-sand/20 bg-ivory-warm/70"
                      >
                        <Icon className="w-3.5 h-3.5 text-bronze-light flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="text-[9px] uppercase tracking-wider text-stone-light">{feat.label}</p>
                          <p className="text-xs text-teal-deep font-medium truncate">{feat.value}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Booking & WhatsApp CTAs */}
              <div className="pt-5 border-t border-sand/20 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => handleSelectVillaForBooking(activeVilla.name)}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 px-5 text-xs font-semibold uppercase tracking-[0.2em] shadow-md shadow-black/15 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: "var(--color-sand)",
                    color: "var(--color-teal-deep)",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  <Calendar className="w-4 h-4" />
                  <span>Reserve This Room</span>
                </button>

                <a
                  href={`https://wa.me/94757273416?text=Hello%20Sri%20Shahrukh%20Lake%20Resort,%20I%20am%20interested%20in%20the%20${encodeURIComponent(
                    activeVilla.name
                  )}.`}
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
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}