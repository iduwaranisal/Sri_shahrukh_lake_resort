import { Suspense } from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileBottomBar from "@/components/MobileBottomBar";
import GalleryClient from "./GalleryClient";
import { getSiteContent } from "@/app/actions/contentActions";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Photo Gallery | Sri Shahrukh Lake Resort Tissamaharama",
  description:
    "Explore the photo gallery of Sri Shahrukh Lake Resort in Tissamaharama. View our comfortable air-conditioned rooms, peaceful garden grounds, authentic breakfast, and wildlife from nearby Yala National Park.",
  alternates: {
    canonical: "https://srishahrukhlakeresort.com/gallery",
  },
  openGraph: {
    title: "Photo Gallery | Sri Shahrukh Lake Resort Tissamaharama",
    description:
      "Take a visual tour of Sri Shahrukh Lake Resort in Tissamaharama, Hambantota. Clean comfortable rooms, scenic lake nature, and direct Yala safari adventures.",
    url: "https://srishahrukhlakeresort.com/gallery",
    images: [
      {
        url: "https://res.cloudinary.com/znj9faa6/image/upload/v1789894691/srishahrukh/img2.jpg",
        width: 1200,
        height: 630,
        alt: "Sri Shahrukh Lake Resort Photo Gallery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Photo Gallery | Sri Shahrukh Lake Resort Tissamaharama",
    description:
      "Explore photos of our peaceful lakeside homestay, deluxe bedrooms, and Yala safari excursions.",
    images: ["https://res.cloudinary.com/znj9faa6/image/upload/v1789894691/srishahrukh/img2.jpg"],
  },
};

export default async function GalleryPage() {
  const content = await getSiteContent();

  return (
    <>
      <Navbar whatsapp={content.whatsapp} phone={content.phone} />
      <main id="main-content">
        <Suspense
          fallback={
            <div
              className="min-h-screen flex items-center justify-center text-ivory"
              style={{ background: "var(--color-teal-deep)" }}
            >
              <div className="text-center">
                <div className="w-10 h-10 border-2 border-sand border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-xs uppercase tracking-[0.25em] text-sand">
                  Loading Curated Gallery…
                </p>
              </div>
            </div>
          }
        >
          <GalleryClient
            initialImages={content.galleryImages}
            whatsapp={content.whatsapp}
            phone={content.phone}
          />
        </Suspense>
      </main>
      <Footer
        phone={content.phone}
        whatsapp={content.whatsapp}
        email={content.email}
        address={content.address}
        mapUrl={content.mapUrl}
        ratingScore={content.ratingScore}
        facebookUrl={content.facebookUrl}
        instagramUrl={content.instagramUrl}
        tiktokUrl={content.tiktokUrl}
        youtubeUrl={content.youtubeUrl}
      />
      <MobileBottomBar whatsapp={content.whatsapp} phone={content.phone} />
    </>
  );
}
