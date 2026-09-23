"use client";

import {
  MapPin,
  Navigation,
  Compass,
  ExternalLink,
  Car,
  Bike,
  Sparkles,
  Plane,
  Waves,
  Landmark,
  TreePine,
  Bird,
  Film,
  Mountain,
} from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface MapSectionProps {
  address?: string;
  mapUrl?: string;
}

const landmarks = [
  {
    name: "Tissa Wewa Lake",
    distance: "2.5 km",
    time: "5-min drive / 15-min cycle",
    category: "Ancient Water Reservoir",
    icon: Waves,
  },
  {
    name: "Tissamaharama Sacred Stupa",
    distance: "2.2 km",
    time: "5-min drive / 10-min cycle",
    category: "Ancient Sacred Heritage",
    icon: Landmark,
  },
  {
    name: "Yala National Park Gate",
    distance: "28 km",
    time: "30-min drive",
    category: "Leopard & Wildlife Safari",
    icon: TreePine,
  },
  {
    name: "Bundala Ramsar Wetland",
    distance: "18 km",
    time: "20-min drive",
    category: "UNESCO Avifauna Sanctuary",
    icon: Bird,
  },
  {
    name: "Ranminitenna Cinema Village",
    distance: "7.5 km",
    time: "10-min drive",
    category: "Film Sets & Theme Park",
    icon: Film,
  },
  {
    name: "Kirinda Rock Temple & Coast",
    distance: "12 km",
    time: "15-min drive",
    category: "Indian Ocean Cliff Temple",
    icon: Mountain,
  },
  {
    name: "Kataragama Sacred Shrine",
    distance: "21 km",
    time: "25-min drive",
    category: "Multi-Faith Pilgrimage Site",
    icon: Sparkles,
  },
  {
    name: "Mattala Airport (HRI)",
    distance: "29 km",
    time: "30 mins via highway",
    category: "Airport Pickup Arranged",
    icon: Plane,
  },
];

export default function MapSection({
  address = "135/1 Suduwella Tikiri udanapura, Tissamaharama, Sri Lanka",
  mapUrl = "https://www.google.com/maps/search/?api=1&query=77VQ%2BX6+Tissamaharama",
}: MapSectionProps) {
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section
      id="location-map"
      ref={sectionRef}
      className="py-20 sm:py-28 relative overflow-hidden text-ivory"
      style={{
        background: "var(--color-teal-deep)",
      }}
      aria-labelledby="map-section-heading"
    >
      {/* Subtle luxury ambient gold glows */}
      <div className="pointer-events-none absolute -top-24 left-1/4 h-80 w-80 rounded-full bg-sand/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-sand/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="scroll-reveal inline-flex items-center gap-2 mb-3.5 px-4 py-1.5 border border-sand/30 bg-sand/10 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-sand animate-twinkle" />
            <p
              className="text-xs uppercase tracking-[0.3em] font-medium text-sand-light"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Interactive Map &amp; Distances
            </p>
          </div>

          <h2
            id="map-section-heading"
            className="scroll-reveal stagger-1 text-3xl sm:text-5xl md:text-6xl font-light text-ivory tracking-tight leading-tight"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Explore our <span className="italic gold-text-gradient font-normal">Location</span>
          </h2>

          <p
            className="scroll-reveal stagger-2 mt-3 text-sm sm:text-base font-light text-ivory/80 max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Quietly situated at <strong>135/1 Suduwella Tikiri Udanapura</strong>, Sri Shahrukh Lake Resort offers the perfect central launchpad for southern Sri Lanka&apos;s lakes, stupas, beaches, and safaris.
          </p>

          {/* Quick GPS Bar */}
          <div className="scroll-reveal stagger-3 mt-6 inline-flex flex-wrap items-center justify-center gap-3 px-5 py-2.5 bg-teal-mid/70 border border-sand/30 shadow-lg">
            <span className="flex items-center gap-1.5 text-xs text-sand font-medium">
              <MapPin className="w-3.5 h-3.5 text-sand" />
              {address}
            </span>
            <span className="hidden sm:inline text-sand/40">·</span>
            <span className="text-xs text-ivory/90 font-mono tracking-wider">
              Plus Code: <strong className="text-sand-light font-semibold">77VQ+X6</strong>
            </span>
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 ml-1 text-xs font-semibold uppercase tracking-wider text-sand hover:text-sand-light transition-colors"
            >
              <span>Directions</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* ── Main Map + Refined Distances Grid ── */}
        <div className="grid gap-8 lg:grid-cols-12 items-stretch">
          {/* Embedded Google Map (7 cols) */}
          <div className="scroll-reveal stagger-2 lg:col-span-7 flex flex-col justify-between border border-sand/30 shadow-2xl overflow-hidden bg-teal-deep relative group">
            {/* Top Bar on Map */}
            <div className="p-3 sm:p-3.5 bg-teal-deep/95 border-b border-sand/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 z-10">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-sand animate-pulse flex-shrink-0" />
                <span className="text-[11px] sm:text-xs font-medium text-sand-light tracking-wider uppercase">
                  Sri Shahrukh Lake Resort · Live GPS Pin
                </span>
              </div>
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shimmer inline-flex items-center justify-center gap-1.5 px-3 py-1.5 sm:py-1 bg-sand text-teal-deep text-[11px] font-semibold uppercase tracking-wider hover:bg-sand-light transition-all shadow w-full sm:w-auto"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Embedded Responsive Map */}
            <div className="relative w-full h-[360px] sm:h-[440px] md:h-[500px]">
              <iframe
                title="Sri Shahrukh Lake Resort Location Map"
                src="https://maps.google.com/maps?q=6.2785,81.2891+(Sri+Shahrukh+Lake+Resort)&t=&z=13&ie=UTF8&iwloc=B&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                tabIndex={-1}
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />

              {/* Floating pin banner with luxury styling */}
              <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto bg-teal-deep/95 p-3.5 sm:p-4 border border-sand/30 shadow-2xl max-w-sm backdrop-blur-md">
                <div className="flex items-start gap-3">
                  <div
                    className="h-9 w-9 rounded-full bg-sand text-teal-deep flex items-center justify-center font-bold text-xs shadow tracking-wider"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    SRK
                  </div>
                  <div>
                    <h4
                      className="text-xs sm:text-sm font-normal text-ivory leading-snug"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      Sri Shahrukh Lake Resort
                    </h4>
                    <p className="text-[11px] text-sand font-medium mt-0.5">
                      135/1 Suduwella Tikiri Udanapura
                    </p>
                    <p className="text-[10px] text-ivory/70 mt-0.5">
                      Tissamaharama · Southern Province, Sri Lanka
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Transport Badges footer on map */}
            <div className="p-2.5 sm:p-3 bg-teal-deep/95 border-t border-sand/20 grid grid-cols-3 gap-1 sm:gap-2 text-center text-[10px] sm:text-xs text-ivory/80">
              <div className="flex items-center justify-center gap-1.5">
                <Car className="w-3.5 h-3.5 text-sand flex-shrink-0" />
                <span className="truncate">Free Parking</span>
              </div>
              <div className="flex items-center justify-center gap-1.5">
                <Bike className="w-3.5 h-3.5 text-sand flex-shrink-0" />
                <span className="truncate">Bicycle Rentals</span>
              </div>
              <div className="flex items-center justify-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-sand flex-shrink-0" />
                <span className="truncate">Safari Pickups</span>
              </div>
            </div>
          </div>

          {/* Surrounding Destinations Cards (5 cols) — Refined Luxury Obsidian & Gold */}
          <div className="scroll-reveal stagger-3 lg:col-span-5 flex flex-col justify-between space-y-3">
            <div className="mb-1">
              <h3
                className="text-lg sm:text-xl font-light text-ivory flex items-center gap-2"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                <Compass className="w-4 h-4 text-sand animate-twinkle" />
                <span>Distances to Key Attractions</span>
              </h3>
              <p className="text-xs text-ivory/70 mt-1">
                Centrally located with convenient transport to Southern Sri Lanka highlights:
              </p>
            </div>

            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
              {landmarks.map((place, idx) => {
                const Icon = place.icon;
                return (
                  <div
                    key={idx}
                    className={`scroll-reveal stagger-${Math.min(idx + 1, 8)} p-3 sm:p-3.5 border border-sand/20 bg-teal-mid/50 hover:bg-teal-mid/80 hover:border-sand/50 transition-all duration-300 flex items-center justify-between gap-3 group`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-8 w-8 rounded-full border border-sand/30 bg-teal-deep/80 flex items-center justify-center text-sand flex-shrink-0 group-hover:border-sand group-hover:text-sand-light transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs sm:text-sm font-medium text-ivory truncate group-hover:text-sand-light transition-colors">
                          {place.name}
                        </h4>
                        <p className="text-[10px] text-sand-light/75 uppercase tracking-wider mt-0.5">
                          {place.category}
                        </p>
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <span className="inline-block px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider border border-sand/30 bg-sand/10 text-sand-light font-mono">
                        {place.distance}
                      </span>
                      <p className="text-[10px] text-ivory/60 mt-0.5 font-mono">
                        {place.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Direct Google Directions CTA */}
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shimmer scroll-reveal stagger-5 mt-2 flex items-center justify-center gap-2 w-full py-3.5 px-4 bg-sand text-teal-deep font-semibold text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-sand-light active:scale-[0.99] transition-all text-center"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              <Navigation className="w-4 h-4 text-teal-deep" />
              <span>Get Turn-by-Turn GPS Directions</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
