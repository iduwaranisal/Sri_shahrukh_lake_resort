"use client";

import Link from "next/link";
import { MapPin, Phone, Mail, MessageCircle, Navigation } from "lucide-react";
import { getWhatsAppUrl, getTelUrl } from "@/lib/whatsapp";

const quickLinks = [
  { label: "About the Homestay", href: "/#about", targetBlank: false },
  { label: "The Homestay", href: "/#homestay", targetBlank: false },
  { label: "Book Now", href: "/book", targetBlank: false },
  { label: "Amenities & Services", href: "/#amenities", targetBlank: false },
  { label: "Nearby Attractions", href: "/#explore", targetBlank: false },
  { label: "Photo Gallery", href: "/#gallery", targetBlank: false },
  { label: "Guest Reviews (4.8★)", href: "/#reviews", targetBlank: false },
  { label: "Contact & Location", href: "/#contact", targetBlank: false },
];

const nearbyPlaces = [
  { label: "Tissa Wewa Lake", dist: "2.5 km" },
  { label: "Tissamaharama Stupa", dist: "2.2 km" },
  { label: "Ranminitenna Cinema Village", dist: "7.5 km" },
  { label: "Kirinda Temple & Beach", dist: "14 km" },
  { label: "Bundala Bird Sanctuary", dist: "28 km" },
  { label: "Mattala Airport (HRI)", dist: "29 km" },
];

interface FooterProps {
  phone?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
  mapUrl?: string;
  ratingScore?: string;
}

export default function Footer({
  phone = "077 621 9245",
  whatsapp = "0757273416",
  email = "lakeresortsrishahrukh@gmail.com",
  address = "135/1 Suduwella Tikiri udanapura, Tissamaharama",
  mapUrl = "https://www.google.com/maps/search/?api=1&query=77VQ%2BX6+Tissamaharama",
  ratingScore = "4.8",
}: FooterProps = {}) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative overflow-hidden text-ivory pb-24 lg:pb-0"
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
              A peaceful homestay located at {address} in Tissamaharama.
              Rated {ratingScore}/5 across all platforms. Free Wi-Fi, private parking, and friendly Sri Lankan hospitality.
            </p>

            <div className="pt-2">
              <Link
                href="/book"
                className="inline-flex items-center gap-1.5 text-xs text-sand hover:text-sand-light uppercase tracking-wider font-semibold underline underline-offset-4"
              >
                <span>Book Now →</span>
              </Link>
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
                  <Link
                    href={link.href}
                    target={link.targetBlank ? "_blank" : undefined}
                    rel={link.targetBlank ? "noopener noreferrer" : undefined}
                    className="text-xs sm:text-sm font-light text-ivory/75 hover:text-sand transition-colors"
                  >
                    {link.label}
                  </Link>
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
                  {address}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Navigation className="w-4 h-4 text-sand flex-shrink-0" />
                <a
                  href={mapUrl}
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
                  href={getTelUrl(phone)}
                  className="text-ivory/80 hover:text-sand transition-colors"
                >
                  {phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-sand flex-shrink-0" />
                <a
                  href={getWhatsAppUrl(whatsapp, "Hello Sri Shahrukh Lake Resort")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ivory/80 hover:text-sand transition-colors"
                >
                  WhatsApp: {whatsapp}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-sand flex-shrink-0" />
                <a
                  href={`mailto:${email}`}
                  className="text-ivory/80 hover:text-sand transition-colors break-all"
                >
                  {email}
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
