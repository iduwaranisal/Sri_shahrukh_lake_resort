import { Suspense } from "react";
import type { Metadata } from "next";
import BookClient from "./BookClient";

export const metadata: Metadata = {
  title: "Book Your Stay | Sri Shahrukh Lake Resort",
  description:
    "Reserve your stay at Sri Shahrukh Lake Resort in Tissamaharama. Peaceful boutique homestay rated 4.8/5 across all platforms.",
};

export default function BookPage() {
  return (
    <Suspense
      fallback={
        <div
          className="min-h-screen flex items-center justify-center text-ivory"
          style={{ background: "var(--color-teal-deep)" }}
        >
          <div className="text-center">
            <div className="w-10 h-10 border-2 border-sand border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-xs uppercase tracking-[0.25em] text-sand">Loading Booking Experience…</p>
          </div>
        </div>
      }
    >
      <BookClient />
    </Suspense>
  );
}
