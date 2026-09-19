"use client";

import Link from "next/link";
import { MapPin, Phone, Mail, ExternalLink, MessageCircle, Navigation } from "lucide-react";

const quickLinks = [
  { label: "About the Homestay", href: "/#about" },
  { label: "Rooms & Rates", href: "/#rooms" },
  { label: "Amenities & Services", href: "/#amenities" },
  { label: "Nearby Attractions", href: "/#explore" },
  { label: "Photo Gallery", href: "/#gallery" },
  { label: "Visitor Reviews", href: "/#reviews" },
  { label: "Contact & Location", href: "/#contact" },
];

const nearbyPlaces = [
  { label: "Tissa Wewa Lake", dist: "2.5 km" },
  { label: "Tissamaharama Stupa", dist: "2.2 km" },
  { label: "Ranminitenna Cinema Village", dist: "7.5 km" },
  { label: "Kirinda Temple & Beach", dist: "14 km" },
  { label: "Bundala Bird Sanctuary", dist: "28 km" },
  { label: "Mattala Airport (HRI)", dist: "29 km" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative overflow-hidden text-ivory pb-20 lg:pb-0"
      style={{ background: "var(--color-charcoal)" }}
      aria-label="Site footer"
    >
      {/* Decorative top gold line */}
      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(to right, transparent, var(--color-sand), transparent)",
        }}
      />

      {/* Map Embed Section with Safe Mobile Interaction */}
      <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-teal-deep">
        <iframe
          title="Sri Shahrukh Lake Resort Location Map at 135/1 Suduwella Tikiri Udanapura, Tissamaharama"
          src="https://maps.google.com/maps?q=77VQ%2BX6+Tissamaharama&t=&z=14&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="100%"
          className="w-full h-full border-0 filter grayscale contrast-110 opacity-75"
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

        {/* Map Header Floating Overlay */}
        <div className="absolute top-4 left-4 sm:left-10 bg-teal-deep/95 border border-sand/30 p-3 sm:p-4 backdrop-blur-md max-w-sm">
          <p className="text-[10px] uppercase tracking-widest text-sand font-semibold">
            Location · 77VQ+X6 Tissamaharama
          </p>
          <p className="text-xs text-ivory font-light mt-1">
            135/1 Suduwella Tikiri Udanapura, Tissamaharama, Sri Lanka
          </p>
          <a
            href="https://www.google.com/maps/search/?api=1&query=77VQ%2BX6+Tissamaharama"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-sand-light hover:text-sand mt-2 font-medium"
          >
            <span>View on Google Maps</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand Story Column */}
          <div className="space-y-3">
            <Link href="/#home" aria-label="Sri Shahrukh Lake Resort — back to top">
              <p
                className="text-2xl font-light tracking-[0.14em] uppercase gold-text-gradient mb-0.5"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Sri Shahrukh
              </p>
              <p
                className="text-[9px] uppercase tracking-[0.25em] text-ivory/70"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Lake Resort · Tissamaharama
              </p>
            </Link>

            <p className="text-xs sm:text-sm font-light leading-relaxed text-ivory/80">
              A budget homestay and small hotel located at 135/1 Suduwella Tikiri Udanapura in Tissamaharama.
              Free Wi-Fi, private parking, garden views, and affordable Yala safari assistance.
            </p>

            <div className="pt-2 text-xs text-sand-light font-medium flex items-center gap-1.5">
              
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <p
              className="text-xs uppercase tracking-[0.25em] text-sand font-medium mb-4"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Homestay Links
            </p>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-xs sm:text-sm font-light text-ivory/75 hover:text-sand transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <p
              className="text-xs uppercase tracking-[0.25em] text-sand font-medium mb-4"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Contact Details
            </p>
            <ul className="space-y-2.5 text-xs sm:text-sm font-light">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-sand mt-0.5 flex-shrink-0" />
                <span className="text-ivory/80 leading-snug">
                  135/1 Suduwella Tikiri udanapura, Tissamaharama
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Navigation className="w-4 h-4 text-sand flex-shrink-0" />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=77VQ%2BX6+Tissamaharama"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ivory/80 hover:text-sand transition-colors"
                >
                  77VQ+X6 Tissamaharama
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-sand flex-shrink-0" />
                <a
                  href="tel:+94776219245"
                  className="text-ivory/80 hover:text-sand transition-colors"
                >
                  077 621 9245
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-sand flex-shrink-0" />
                <a
                  href="https://wa.me/94757273416?text=Hello%20Sri%20Shahrukh%20Lake%20Resort"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ivory/80 hover:text-sand transition-colors"
                >
                  WhatsApp: 0757273416
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-sand flex-shrink-0" />
                <a
                  href="mailto:lakeresortsrishahrukh@gmail.com"
                  className="text-ivory/80 hover:text-sand transition-colors break-all"
                >
                  lakeresortsrishahrukh@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Location & Nearby Attractions */}
          <div>
            <p
              className="text-xs uppercase tracking-[0.25em] text-sand font-medium mb-4"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Nearby Distances
            </p>
            <ul className="space-y-2">
              {nearbyPlaces.map((place, i) => (
                <li key={i} className="flex items-center justify-between text-xs text-ivory/75 font-light">
                  <span>{place.label}</span>
                  <span className="text-sand font-medium">{place.dist}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-3 border-t border-sand/20 text-[11px] text-ivory/60 font-light">
              Mattala Rajapaksa International Airport: 29 km
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="mt-12 pt-6 border-t border-sand/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ivory/60 font-light">
          <p>
            &copy; {currentYear} Sri Shahrukh Lake Resort. All rights reserved.
          </p>
          <div className="flex gap-4">
            <span>Budget Homestay</span>
            <span>·</span>
            <span>Tissamaharama, Sri Lanka</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
