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
    color: "from-cyan-500/20 to-blue-600/20 border-cyan-400/50 text-cyan-300",
    badgeBg: "bg-cyan-500/20 text-cyan-200 border-cyan-400/40",
    icon: "🌊",
  },
  {
    name: "Tissamaharama Sacred Stupa",
    distance: "2.2 km",
    time: "5-min drive / 10-min cycle",
    category: "Ancient Sacred Heritage",
    color: "from-amber-500/20 to-yellow-600/20 border-amber-400/50 text-amber-300",
    badgeBg: "bg-amber-500/20 text-amber-200 border-amber-400/40",
    icon: "🛕",
  },
  {
    name: "Yala National Park Gate",
    distance: "28 km",
    time: "30-min drive",
    category: "Leopard & Wildlife Safari",
    color: "from-orange-500/20 to-amber-600/20 border-orange-400/50 text-orange-300",
    badgeBg: "bg-orange-500/20 text-orange-200 border-orange-400/40",
    icon: "🐆",
  },
  {
    name: "Bundala Ramsar Wetland",
    distance: "18 km",
    time: "20-min drive",
    category: "UNESCO Avifauna Sanctuary",
    color: "from-rose-500/20 to-pink-600/20 border-rose-400/50 text-rose-300",
    badgeBg: "bg-rose-500/20 text-rose-200 border-rose-400/40",
    icon: "🦩",
  },
  {
    name: "Ranminitenna Cinema Village",
    distance: "7.5 km",
    time: "10-min drive",
    category: "Film Sets & Theme Park",
    color: "from-purple-500/20 to-indigo-600/20 border-purple-400/50 text-purple-300",
    badgeBg: "bg-purple-500/20 text-purple-200 border-purple-400/40",
    icon: "🎬",
  },
  {
    name: "Kirinda Rock Temple & Coast",
    distance: "12 km",
    time: "15-min drive",
    category: "Indian Ocean Cliff Temple",
    color: "from-emerald-500/20 to-teal-600/20 border-emerald-400/50 text-emerald-300",
    badgeBg: "bg-emerald-500/20 text-emerald-200 border-emerald-400/40",
    icon: "🏖️",
  },
  {
    name: "Kataragama Sacred Shrine",
    distance: "21 km",
    time: "25-min drive",
    category: "Multi-Faith Pilgrimage Site",
    color: "from-red-500/20 to-rose-600/20 border-red-400/50 text-red-300",
    badgeBg: "bg-red-500/20 text-red-200 border-red-400/40",
    icon: "✨",
  },
  {
    name: "Mattala Airport (HRI)",
    distance: "29 km",
    time: "30 mins via highway",
    category: "Airport Pickup Arranged",
    color: "from-sky-500/20 to-blue-600/20 border-sky-400/50 text-sky-300",
    badgeBg: "bg-sky-500/20 text-sky-200 border-sky-400/40",
    icon: "✈️",
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
      className="py-20 sm:py-24 relative overflow-hidden text-ivory"
      style={{
        background: "linear-gradient(180deg, #071512 0%, #0c201c 50%, #06110f 100%)",
      }}
      aria-labelledby="map-section-heading"
    >
      {/* Decorative colorful ambient glows */}
      <div className="pointer-events-none absolute -top-24 left-1/4 h-80 w-80 rounded-full bg-sand/15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 right-10 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="scroll-reveal inline-flex items-center gap-2 mb-3.5 px-4 py-1.5 border border-sand/40 bg-sand/10 shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-sand animate-twinkle" />
            <p className="text-xs uppercase tracking-[0.3em] font-semibold text-sand-light">
              Interactive Map &amp; Distances
            </p>
          </div>

          <h2
            id="map-section-heading"
            className="scroll-reveal stagger-1 text-3xl sm:text-5xl md:text-6xl font-light text-ivory tracking-tight leading-tight"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Explore our <span className="italic text-sand font-normal">Location</span>
          </h2>

          <p className="scroll-reveal stagger-2 mt-3 text-sm sm:text-base font-light text-ivory/80 max-w-2xl mx-auto leading-relaxed">
            Quietly situated at <strong>135/1 Suduwella Tikiri Udanapura</strong>, Sri Shahrukh Lake Resort offers the perfect central launchpad for southern Sri Lanka&apos;s lakes, stupas, beaches, and safaris.
          </p>

          {/* Quick GPS Bar */}
          <div className="scroll-reveal stagger-3 mt-5 inline-flex flex-wrap items-center justify-center gap-3 px-5 py-2.5 bg-teal-deep/90 border border-sand/30 shadow-xl">
            <span className="flex items-center gap-1.5 text-xs text-sand font-medium">
              <MapPin className="w-3.5 h-3.5 text-sand" />
              {address}
            </span>
            <span className="hidden sm:inline text-sand/40">·</span>
            <span className="text-xs text-ivory/90 font-mono tracking-wider">
              Plus Code: <strong>77VQ+X6</strong>
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

        {/* ── Main Map + Colorful Info Grid ── */}
        <div className="grid gap-8 lg:grid-cols-12 items-stretch">
          {/* Embedded Google Map (7 cols) */}
          <div className="scroll-reveal stagger-2 lg:col-span-7 flex flex-col justify-between border-2 border-sand/30 shadow-2xl overflow-hidden bg-teal-deep relative group">
            {/* Top Bar on Map */}
            <div className="p-3 sm:p-3.5 bg-teal-deep/95 border-b border-sand/25 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 z-10">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                <span className="text-[11px] sm:text-xs font-semibold text-sand tracking-wider uppercase">
                  Sri Shahrukh Lake Resort · Live GPS Pin
                </span>
              </div>
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 sm:py-1 bg-sand text-teal-deep text-[11px] font-semibold uppercase tracking-wider hover:bg-sand-light transition-all shadow w-full sm:w-auto"
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
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />

              {/* Colorful floating pin banner */}
              <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto bg-teal-deep/95 p-3 sm:p-4 border border-sand/40 shadow-2xl max-w-sm">
                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-sand to-amber-300 text-teal-deep flex items-center justify-center font-bold text-sm shadow">
                    SRK
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-ivory leading-snug">
                      Sri Shahrukh Lake Resort
                    </h4>
                    <p className="text-[11px] text-sand font-medium mt-0.5">
                      135/1 Suduwella Tikiri Udanapura
                    </p>
                    <p className="text-[10px] text-ivory/75 mt-0.5">
                      Tissamaharama · Southern Province, Sri Lanka
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Transport Badges footer on map */}
            <div className="p-2 sm:p-3 bg-teal-deep/95 border-t border-sand/20 grid grid-cols-3 gap-1 sm:gap-2 text-center text-[9.5px] sm:text-[11px] text-ivory/85">
              <div className="flex items-center justify-center gap-1 sm:gap-1.5">
                <Car className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-sand flex-shrink-0" />
                <span className="truncate">Free Parking</span>
              </div>
              <div className="flex items-center justify-center gap-1 sm:gap-1.5">
                <Bike className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-sand flex-shrink-0" />
                <span className="truncate">Bicycle Rentals</span>
              </div>
              <div className="flex items-center justify-center gap-1 sm:gap-1.5">
                <Navigation className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-sand flex-shrink-0" />
                <span className="truncate">Safari Pickups</span>
              </div>
            </div>
          </div>

          {/* Colorful Surrounding Destinations Cards (5 cols) */}
          <div className="scroll-reveal stagger-3 lg:col-span-5 flex flex-col justify-between space-y-3">
            <div className="mb-1">
              <h3
                className="text-lg sm:text-xl font-light text-sand flex items-center gap-2"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                <Compass className="w-5 h-5 text-sand animate-twinkle" />
                <span>Distances to Key Attractions</span>
              </h3>
              <p className="text-xs text-ivory/70 mt-1">
                Our homestay is centrally located with fast tuk-tuk and taxi access to every highlight:
              </p>
            </div>

            <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
              {landmarks.map((place, idx) => (
                <div
                  key={idx}
                  className={`scroll-reveal stagger-${Math.min(idx + 1, 8)} p-3.5 border bg-gradient-to-r ${place.color} transition-all duration-300 hover:scale-[1.01] hover:shadow-lg flex items-center justify-between gap-3`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xl flex-shrink-0">{place.icon}</span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs sm:text-sm font-semibold text-ivory truncate">
                          {place.name}
                        </h4>
                      </div>
                      <p className="text-[10px] text-ivory/75 uppercase tracking-wider mt-0.5">
                        {place.category}
                      </p>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <span className={`inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border rounded-sm ${place.badgeBg}`}>
                      {place.distance}
                    </span>
                    <p className="text-[10px] text-ivory/60 mt-1 font-mono">
                      {place.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Direct Google Directions CTA */}
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shimmer scroll-reveal stagger-5 mt-2 flex items-center justify-center gap-2 w-full py-3.5 px-4 bg-gradient-to-r from-sand via-amber-300 to-sand text-teal-deep font-bold text-xs uppercase tracking-[0.2em] shadow-xl hover:brightness-110 transition-all text-center"
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
