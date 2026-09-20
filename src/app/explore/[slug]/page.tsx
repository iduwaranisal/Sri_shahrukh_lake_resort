import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Clock, MapPin, Calendar, Sparkles, Compass } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { attractions } from "@/data/explore";
import { optimizeImage } from "@/lib/imageOptimization";
import { SmoothImage } from "@/components/ui/SmoothImage";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return attractions.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const attraction = attractions.find((a) => a.slug === slug);
  if (!attraction) return {};

  return {
    title: `${attraction.name} | Sri Shahrukh Lake Resort Excursions`,
    description: attraction.shortDescription,
    openGraph: {
      title: `${attraction.name} — Tissamaharama, Sri Lanka`,
      description: attraction.shortDescription,
      images: [{ url: attraction.heroImage }],
    },
  };
}

export default async function AttractionPage({ params }: Props) {
  const { slug } = await params;
  const attraction = attractions.find((a) => a.slug === slug);

  if (!attraction) {
    notFound();
  }

  const otherAttractions = attractions
    .filter((a) => a.slug !== attraction.slug)
    .slice(0, 3);

  return (
    <>
      <Navbar />

      <main id="main-content" className="min-h-screen" style={{ background: "var(--color-ivory)" }}>
        {/* ── Hero Banner ── */}
        <div className="relative min-h-[55vh] lg:h-[65vh] w-full overflow-hidden flex flex-col justify-end bg-teal-deep">
          <SmoothImage
            src={optimizeImage(attraction.heroImage, {
              width: 1920,
              quality: "auto",
              format: "auto",
            })}
            alt={attraction.name}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          {/* Gradient Overlays */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(10,24,21,0.5) 0%, rgba(10,24,21,0.4) 40%, rgba(10,24,21,0.95) 100%)",
            }}
          />

          {/* Hero Content */}
          <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-10 pb-10 pt-32 sm:pb-14">
            {/* Breadcrumb back */}
            <div className="mb-6">
              <Link
                href="/#explore"
                className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-sand hover:text-sand-light transition-colors"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to All Excursions</span>
              </Link>
            </div>

            {/* Title block */}
            <div className="max-w-4xl">
              <div className="mb-3 flex flex-wrap items-center gap-3">
                <span
                  className="px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em]"
                  style={{
                    background: "rgba(212,175,55,0.95)",
                    color: "var(--color-teal-deep)",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  {attraction.category}
                </span>
                <span className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-ivory/80">
                  <MapPin className="w-3.5 h-3.5 text-sand" />
                  <span>{attraction.distance} from Resort</span>
                  <span>·</span>
                  <Clock className="w-3.5 h-3.5 text-sand" />
                  <span>{attraction.travelTime}</span>
                </span>
              </div>

              <div className="flex flex-wrap items-baseline gap-3 mb-2">
                <h1
                  className="text-3xl sm:text-5xl lg:text-6xl font-light text-ivory leading-tight"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {attraction.name}
                </h1>
                <span
                  className="text-lg sm:text-xl text-sand-light/80 font-light"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {attraction.sinhalaName}
                </span>
              </div>

              <p
                className="text-base sm:text-xl italic font-light text-sand-light max-w-2xl"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {attraction.tagline}
              </p>
            </div>
          </div>
        </div>

        {/* ── Mobile Excursion Fast-Facts Strip (Visible on mobile/tablet before text) ── */}
        <div className="lg:hidden border-b border-sand/25 bg-ivory-warm p-5">
          <div className="mx-auto max-w-7xl">
            <p className="text-[10px] uppercase tracking-[0.3em] font-semibold text-sand-dark mb-3">
              Travel Details
            </p>
            <div className="grid grid-cols-2 gap-3 text-xs mb-4">
              <div className="p-3 bg-ivory border border-sand/20">
                <p className="text-[10px] uppercase tracking-wider text-stone-light">Distance</p>
                <p className="font-semibold text-teal-deep mt-0.5">{attraction.distance}</p>
              </div>
              <div className="p-3 bg-ivory border border-sand/20">
                <p className="text-[10px] uppercase tracking-wider text-stone-light">Travel Time</p>
                <p className="font-semibold text-teal-deep mt-0.5">{attraction.travelTime}</p>
              </div>
              <div className="p-3 bg-ivory border border-sand/20 col-span-2">
                <p className="text-[10px] uppercase tracking-wider text-stone-light">Best Hours</p>
                <p className="font-semibold text-teal-deep mt-0.5">{attraction.bestTimeToVisit}</p>
              </div>
            </div>
            <Link
              href="/book"
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-sand text-teal-deep text-xs font-semibold uppercase tracking-widest shadow-md hover:bg-sand-light transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Now</span>
            </Link>
          </div>
        </div>

        {/* ── Main Content Grid ── */}
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10 py-12 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Left Story Column */}
            <div className="lg:col-span-8 space-y-12 sm:space-y-16">
              {/* Overview */}
              <section>
                <p
                  className="mb-2 text-xs uppercase tracking-[0.35em] font-medium"
                  style={{ color: "var(--color-sand-dark)", fontFamily: "var(--font-sans)" }}
                >
                  The Experience
                </p>
                <h2
                  className="mb-5 text-2xl sm:text-4xl font-light text-teal-deep leading-snug"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  A Sanctuary of Wonder &amp; Untamed Nature
                </h2>
                <p
                  className="text-base sm:text-lg font-light leading-relaxed text-charcoal"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {attraction.overview}
                </p>
              </section>

              {/* History & Heritage */}
              <section
                className="p-6 sm:p-10 border-l-4 border-sand bg-ivory-warm shadow-sm"
              >
                <p
                  className="mb-2 text-xs uppercase tracking-[0.35em] text-bronze font-medium"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  Chronicles of Ancient Ruhuna
                </p>
                <h3
                  className="mb-4 text-2xl sm:text-3xl font-light text-teal-deep"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  Two Millennia of Sacred Heritage
                </h3>
                <p
                  className="text-sm sm:text-base font-light leading-relaxed text-stone"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {attraction.history}
                </p>
              </section>

              {/* Highlights */}
              <section>
                <p
                  className="mb-2 text-xs uppercase tracking-[0.35em] font-medium"
                  style={{ color: "var(--color-sand-dark)", fontFamily: "var(--font-sans)" }}
                >
                  Essential Highlights
                </p>
                <h2
                  className="mb-6 text-2xl sm:text-3xl font-light text-teal-deep"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  What Makes This Destination Extraordinary
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {attraction.highlights.map((highlight, index) => (
                    <div
                      key={index}
                      className="p-5 sm:p-6 border border-sand/25 bg-ivory-warm transition-all duration-300 hover:border-sand"
                    >
                      <div className="flex items-start gap-3.5">
                        <span
                          className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold bg-teal-deep text-sand"
                          style={{ fontFamily: "var(--font-serif)" }}
                        >
                          {index + 1}
                        </span>
                        <p
                          className="text-xs sm:text-sm font-light leading-relaxed text-charcoal"
                          style={{ fontFamily: "var(--font-sans)" }}
                        >
                          {highlight}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Concierge Tips */}
              <section
                className="p-6 sm:p-10 border border-sand/30 bg-teal-deep text-ivory shadow-xl"
              >
                <div className="flex items-center gap-2.5 mb-4">
                  <Sparkles className="w-5 h-5 text-sand" />
                  <p
                    className="text-xs uppercase tracking-[0.35em] text-sand font-medium"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    Resort Concierge Insider Tips
                  </p>
                </div>
                <h3
                  className="mb-6 text-2xl sm:text-3xl font-light text-ivory"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  Curated Guidance from Sri Shahrukh
                </h3>
                <ul className="space-y-4">
                  {attraction.conciergeTips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-sand text-base font-bold">✦</span>
                      <p
                        className="text-sm font-light leading-relaxed text-ivory/85"
                        style={{ fontFamily: "var(--font-sans)" }}
                      >
                        {tip}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Gallery Strip */}
              <section>
                <p
                  className="mb-2 text-xs uppercase tracking-[0.35em] font-medium"
                  style={{ color: "var(--color-sand-dark)", fontFamily: "var(--font-sans)" }}
                >
                  Visual Vignettes
                </p>
                <h3
                  className="mb-6 text-2xl sm:text-3xl font-light text-teal-deep"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  Scenes from {attraction.name}
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {attraction.galleryImages.map((img, i) => (
                    <div key={i} className="relative aspect-[4/3] overflow-hidden border border-sand/20">
                      <Image
                        src={img}
                        alt={`${attraction.name} scene ${i + 1}`}
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-105"
                        sizes="(max-width: 640px) 100vw, 33vw"
                      />
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Sticky Sidebar (Desktop) */}
            <div className="lg:col-span-4">
              <div className="sticky top-28 space-y-6">
                {/* Fast Facts Card */}
                <div className="p-8 border border-sand/30 bg-ivory-warm shadow-md">
                  <h4
                    className="mb-6 text-xl font-light text-teal-deep pb-3 border-b border-sand/20"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    Excursion Details
                  </h4>

                  <div className="space-y-5 text-sm pb-6 border-b border-sand/20">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.25em] text-stone-light font-medium">
                        Distance From Resort
                      </span>
                      <p className="font-semibold text-teal-deep mt-0.5">
                        {attraction.distance}
                      </p>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase tracking-[0.25em] text-stone-light font-medium">
                        Travel Time
                      </span>
                      <p className="font-semibold text-teal-deep mt-0.5">
                        {attraction.travelTime}
                      </p>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase tracking-[0.25em] text-stone-light font-medium">
                        Recommended Visiting Hours
                      </span>
                      <p className="font-semibold text-teal-deep mt-0.5">
                        {attraction.bestTimeToVisit}
                      </p>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase tracking-[0.25em] text-stone-light font-medium">
                        Duration
                      </span>
                      <p className="font-semibold text-teal-deep mt-0.5">
                        {attraction.recommendedDuration}
                      </p>
                    </div>
                  </div>

                  {/* Hotel Reservation CTA */}
                  <div className="pt-6 space-y-3.5">
                    <div className="p-3.5 border border-sand/25 bg-ivory text-xs text-stone leading-relaxed">
                      <p className="font-semibold text-teal-deep mb-1 flex items-center gap-1.5">
                        <Compass className="w-3.5 h-3.5 text-sand-dark" />
                        <span>Visitor Information</span>
                      </p>
                      <p className="text-[11px] text-stone">
                        This destination is easy to visit while staying at Sri Shahrukh Lake Resort. You can visit independently or with local transport.
                      </p>
                    </div>

                    <Link
                      href="/book"
                      className="flex items-center justify-center gap-2 w-full py-3.5 text-center text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 hover:scale-[1.02] bg-sand text-teal-deep shadow-md hover:bg-sand-light"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book Now</span>
                    </Link>
                  </div>
                </div>

                {/* Location Badge */}
                <div className="p-6 text-center bg-teal-mid text-ivory border border-sand/20">
                  <p className="text-xs uppercase tracking-[0.3em] mb-1 text-sand-light font-medium">
                    Sri Shahrukh Lake Resort
                  </p>
                  <p className="text-xs text-ivory/80 font-light">
                    Tissamaharama, Southern Province, Sri Lanka
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── More Explorations ── */}
        <section className="border-t border-sand/20 py-16 sm:py-20 bg-ivory-warm">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
            <div className="mb-10 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <p
                  className="mb-1 text-xs uppercase tracking-[0.35em] font-medium"
                  style={{ color: "var(--color-sand-dark)", fontFamily: "var(--font-sans)" }}
                >
                  Continue The Journey
                </p>
                <h3
                  className="text-2xl sm:text-3xl font-light text-teal-deep"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  More Wonders of Tissamaharama
                </h3>
              </div>
              <Link
                href="/#explore"
                className="text-xs uppercase tracking-[0.2em] text-teal-deep hover:text-sand-dark underline underline-offset-8 font-medium"
              >
                View All Destinations →
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {otherAttractions.map((other) => (
                <Link
                  key={other.slug}
                  href={`/explore/${other.slug}`}
                  className="group relative overflow-hidden block border border-sand/20 bg-ivory transition-all duration-300 hover:shadow-xl hover:border-sand"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-teal-deep">
                    <SmoothImage
                      src={optimizeImage(other.heroImage, {
                        width: 800,
                        quality: "auto",
                        format: "auto",
                      })}
                      alt={other.name}
                      fill
                      loading="lazy"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(10,24,21,0.85) 0%, rgba(10,24,21,0.2) 60%)",
                      }}
                    />
                    <span
                      className="absolute top-3 left-3 px-2.5 py-1 text-[9px] uppercase tracking-widest font-medium"
                      style={{
                        background: "rgba(212,175,55,0.95)",
                        color: "var(--color-teal-deep)",
                      }}
                    >
                      {other.category}
                    </span>
                    <span className="absolute top-3 right-3 text-[10px] text-white/90 font-light">
                      {other.distance}
                    </span>
                  </div>
                  <div className="p-5">
                    <h4
                      className="mb-1 text-lg font-light text-teal-deep group-hover:text-sand-dark transition-colors"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      {other.name}
                    </h4>
                    <p className="line-clamp-2 text-xs font-light text-stone leading-relaxed">
                      {other.shortDescription}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] font-medium text-sand-dark">
                      Read Full Story →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
