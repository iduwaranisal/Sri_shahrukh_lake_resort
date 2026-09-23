import { Suspense } from "react";
import type { Metadata } from "next";
import BookClient from "./BookClient";

export const metadata: Metadata = {
  title: "Book Your Stay in Tissamaharama | Sri Shahrukh Lake Resort",
  description:
    "Reserve your direct homestay or luxury room at Sri Shahrukh Lake Resort in Tissamaharama, Hambantota. Best rates guaranteed, free Wi-Fi, breakfast, and Yala safari arrangements.",
  alternates: {
    canonical: "https://srishahrukhlakeresort.com/book",
  },
  openGraph: {
    title: "Reserve Your Stay | Sri Shahrukh Lake Resort, Tissamaharama",
    description:
      "Direct room reservations for Sri Shahrukh Lake Resort in Tissamaharama near Yala National Park. Warm Sri Lankan homestay hospitality.",
    url: "https://srishahrukhlakeresort.com/book",
  },
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
