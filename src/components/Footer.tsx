"use client";

import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { getTelUrl } from "@/lib/whatsapp";
import SocialLinks from "@/components/ui/SocialLinks";

const quickLinks = [
  { label: "About", href: "/#about" },
  { label: "The Homestay", href: "/#homestay" },
  { label: "Amenities & Services", href: "/#amenities" },
  { label: "Nearby Attractions", href: "/#explore" },
  { label: "Photo Gallery", href: "/gallery" },
  { label: "Guest Reviews", href: "/#reviews" },
  { label: "Contact & Location", href: "/#contact" },
];

const headingClass = "mb-5 text-sm font-medium tracking-wide text-sand";

const linkClass =
  "text-sm font-light text-ivory/75 transition-colors hover:text-sand focus-visible:text-sand focus-visible:outline-none focus-visible:underline underline-offset-4";

interface FooterProps {
  phone?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
  mapUrl?: string;
  ratingScore?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  tiktokUrl?: string;
  youtubeUrl?: string;
}

export default function Footer({
  phone = "077 621 9245",
  email = "lakeresortsrishahrukh@gmail.com",
  address = "135/1 Suduwella Tikiri udanapura, Tissamaharama",
  mapUrl = "https://www.google.com/maps/search/?api=1&query=77VQ%2BX6+Tissamaharama",
  ratingScore = "4.8",
  facebookUrl,
  instagramUrl,
  tiktokUrl,
  youtubeUrl,
}: FooterProps = {}) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative text-ivory pb-24 lg:pb-0"
      style={{ background: "var(--color-charcoal)" }}
      aria-label="Site footer"
    >
      {/* Thin accent line */}
      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(to right, transparent, var(--color-sand), transparent)",
        }}
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
        {/* Main content — Clean 3-column layout without distance column or CTA buttons */}
        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-12 lg:py-16">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-5">
            <Link
              href="/#home"
              aria-label="Sri Shahrukh Lake Resort — back to top"
              className="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand/60"
            >
              <span
                className="block text-2xl font-light uppercase tracking-[0.14em] gold-text-gradient"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Sri Shahrukh
              </span>
              <span
                className="mt-1 block text-[10px] uppercase tracking-[0.25em] text-ivory/70"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Lake Resort · Tissamaharama
              </span>
            </Link>

            <p className="mt-5 max-w-md text-sm font-light leading-relaxed text-ivory/75">
              A peaceful homestay in Tissamaharama with tranquil garden surroundings, free Wi-Fi, private
              parking, and warm Sri Lankan hospitality.
            </p>

            <div className="mt-8">
              <SocialLinks
                facebookUrl={facebookUrl}
                instagramUrl={instagramUrl}
                tiktokUrl={tiktokUrl}
                youtubeUrl={youtubeUrl}
              />
            </div>
          </div>

          {/* Explore */}
          <nav className="lg:col-span-3" aria-label="Footer navigation">
            <h2 className={headingClass}>Explore</h2>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h2 className={headingClass}>Contact</h2>
            <ul className="space-y-4 text-sm font-light">
              <li className="flex items-start gap-3">
                <MapPin
                  className="mt-0.5 h-4 w-4 flex-shrink-0 text-sand"
                  aria-hidden="true"
                />
                <div className="leading-snug">
                  <address className="not-italic text-ivory/80">{address}</address>
                  <a
                    href={mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${linkClass} mt-1 inline-block text-sand`}
                  >
                    Get directions
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Phone
                  className="h-4 w-4 flex-shrink-0 text-sand"
                  aria-hidden="true"
                />
                <a href={getTelUrl(phone)} className={linkClass}>
                  {phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail
                  className="h-4 w-4 flex-shrink-0 text-sand"
                  aria-hidden="true"
                />
                <a
                  href={`mailto:${email}`}
                  className={`${linkClass} break-all`}
                >
                  {email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-2 border-t border-sand/20 py-6 text-xs font-light text-ivory/60 sm:flex-row">
          <p>
            &copy; {currentYear} Sri Shahrukh Lake Resort. All rights reserved.
          </p>
          <p>Tissamaharama, Southern Province, Sri Lanka</p>
        </div>
      </div>
    </footer>
  );
}