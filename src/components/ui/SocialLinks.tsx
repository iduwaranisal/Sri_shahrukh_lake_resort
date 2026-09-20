"use client";

import React from "react";

export function FacebookIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

export function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function TikTokIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.81 4.48 6.3 6.3 0 0 0 1.9-4.48V8.71a8.18 8.18 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.89-.14z" />
    </svg>
  );
}

export function YouTubeIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export interface SocialLinksProps {
  facebookUrl?: string;
  instagramUrl?: string;
  tiktokUrl?: string;
  youtubeUrl?: string;
  className?: string;
  variant?: "footer" | "contact" | "compact";
}

export default function SocialLinks({
  facebookUrl,
  instagramUrl,
  tiktokUrl,
  youtubeUrl,
  className = "",
  variant = "footer",
}: SocialLinksProps) {
  const items = [
    {
      name: "Facebook",
      url: facebookUrl,
      icon: FacebookIcon,
      hoverColor: "hover:text-[#1877F2] hover:border-[#1877F2]/60 hover:shadow-[#1877F2]/20",
    },
    {
      name: "Instagram",
      url: instagramUrl,
      icon: InstagramIcon,
      hoverColor: "hover:text-[#E4405F] hover:border-[#E4405F]/60 hover:shadow-[#E4405F]/20",
    },
    {
      name: "TikTok",
      url: tiktokUrl,
      icon: TikTokIcon,
      hoverColor: "hover:text-sand-light hover:border-sand/60 hover:shadow-sand/20",
    },
    {
      name: "YouTube",
      url: youtubeUrl,
      icon: YouTubeIcon,
      hoverColor: "hover:text-[#FF0000] hover:border-[#FF0000]/60 hover:shadow-[#FF0000]/20",
    },
  ].filter((item) => item.url && item.url.trim() !== "");

  if (items.length === 0) return null;

  if (variant === "contact") {
    return (
      <div className={`flex flex-wrap items-center gap-2.5 ${className}`}>
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-center gap-2 px-3.5 py-2 border border-sand/30 bg-teal-mid/70 text-ivory/90 transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm ${item.hoverColor}`}
              aria-label={`Visit our ${item.name} page`}
            >
              <Icon className="w-4 h-4 text-sand transition-transform duration-300 group-hover:scale-110" />
              <span className="text-xs uppercase tracking-wider font-medium font-sans">
                {item.name}
              </span>
            </a>
          );
        })}
      </div>
    );
  }

  // Default 'footer' / 'compact' icon badge style
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <a
            key={item.name}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative flex h-9 w-9 items-center justify-center border border-sand/30 bg-teal-deep/80 text-sand transition-all duration-300 hover:-translate-y-1 hover:bg-teal-mid hover:shadow-lg active:scale-95 ${item.hoverColor}`}
            aria-label={`Visit our official ${item.name} page`}
            title={item.name}
          >
            <Icon className="w-4 h-4 transition-transform duration-300 group-hover:scale-115" />
          </a>
        );
      })}
    </div>
  );
}
