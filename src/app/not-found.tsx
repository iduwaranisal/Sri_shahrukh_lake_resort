import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Compass, Home, Calendar } from "lucide-react";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main
        id="main-content"
        className="min-h-[85vh] flex flex-col items-center justify-center text-center px-5 py-32 sm:py-40 relative overflow-hidden"
        style={{ background: "var(--color-teal-deep)" }}
      >
        {/* Subtle background glow */}
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(212,175,55,0.2) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-xl mx-auto">
          <span
            className="inline-block px-4 py-1 border border-sand/30 bg-sand/10 text-xs uppercase tracking-[0.3em] text-sand font-medium mb-6"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Page Not Found · Error 404
          </span>

          <h1
            className="text-4xl sm:text-6xl font-light text-ivory mb-4"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            A Path into the{" "}
            <span className="italic text-sand font-normal">Mist</span>
          </h1>

          <p
            className="text-sm sm:text-base font-light text-ivory/80 leading-relaxed mb-10"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            The sanctuary trail you are seeking appears to have moved or does not exist.
            Let us guide you back to our lakeside villas and excursions.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/#home"
              className="flex items-center justify-center gap-2 w-full sm:w-auto min-h-[48px] px-7 py-3.5 bg-sand text-teal-deep text-xs font-semibold uppercase tracking-[0.2em] shadow-lg transition-transform hover:scale-105"
            >
              <Home className="w-4 h-4" />
              <span>Return Home</span>
            </Link>

            <Link
              href="/#homestay"
              className="flex items-center justify-center gap-2 w-full sm:w-auto min-h-[48px] px-7 py-3.5 border border-sand/40 text-sand hover:bg-sand/10 text-xs font-medium uppercase tracking-[0.2em] transition-colors"
            >
              <Calendar className="w-4 h-4" />
              <span>The Homestay</span>
            </Link>

            <Link
              href="/#explore"
              className="flex items-center justify-center gap-2 w-full sm:w-auto min-h-[48px] px-7 py-3.5 border border-ivory/30 text-ivory hover:bg-white/10 text-xs font-light uppercase tracking-[0.2em] transition-colors"
            >
              <Compass className="w-4 h-4 text-sand-light" />
              <span>Excursions</span>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
