"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, Compass, ShieldCheck, Sparkles } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FaqItem[] = [
  {
    category: "Resort & Location",
    question: "Why is Sri Shahrukh Lake Resort considered the top resort choice in Tissamaharama?",
    answer:
      "Sri Shahrukh Lake Resort offers a unique combination of peaceful lakeside tranquility, warm hospitality, and close proximity to major Southern Province highlights. Located just 2.5 km from the historic Tissa Wewa reservoir and minutes from the town center, guests enjoy spacious air-conditioned rooms, lush tropical gardens, authentic Sri Lankan home-cooked meals, and personalized 24/7 concierge service.",
  },
  {
    category: "Yala & Safaris",
    question: "How far is Sri Shahrukh Lake Resort from Yala National Park and Bundala?",
    answer:
      "Our resort is ideally situated as a prime safari gateway in the Hambantota District. Yala National Park (Block 1 entrance) is approximately 28 km (a 30-minute scenic drive), and Bundala Bird Sanctuary is also 28 km away. We arrange direct 4x4 safari jeeps with reputable, experienced local drivers and wildlife trackers who pick you up right from our reception.",
  },
  {
    category: "Address & Hambantota Proximity",
    question: "Where exactly is the resort located in Hambantota District?",
    answer:
      "Sri Shahrukh Lake Resort is located at 135/1 Suduwella Tikiri Udanapura, Tissamaharama, Southern Province, Sri Lanka (GPS Coordinates: 6.2847° N, 81.2885° E). We are easily accessible from the Southern Expressway (E01 Mattala exit), Mattala Rajapaksa International Airport (25 km), and the sacred pilgrimage city of Kataragama (21 km).",
  },
  {
    category: "Stay & Amenities",
    question: "What amenities and guest services are included in a stay?",
    answer:
      "Every stay includes complimentary high-speed Wi-Fi across the property, secure free private parking, individually controlled air conditioning, hot-water rain showers, garden & lake views, daily traditional Sri Lankan or continental breakfast, complimentary bicycle rentals to explore Tissa Lake bund, and round-the-clock host assistance.",
  },
  {
    category: "Direct Booking & Contact",
    question: "How can I make a reservation for rooms or Yala safari packages?",
    answer:
      "You can book directly via our online reservation form on this website, or connect with our hosts directly via WhatsApp at +94 75 727 3416 / Phone at +94 77 621 9245. Direct bookings receive our best rate guarantee, customized safari packages, and flexible check-in assistance.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      id="faq"
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{
        backgroundColor: "var(--color-teal-deep, #0a1815)",
        color: "var(--color-ivory, #fdfbf7)",
      }}
    >
      {/* Soft champagne ambient light */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-15 blur-[120px]"
        style={{
          background: "radial-gradient(circle, rgba(212,175,55,0.3) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-sand/30 bg-teal-mid/40 mb-4 backdrop-blur-sm">
            <HelpCircle className="w-3.5 h-3.5 text-sand" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sand-light font-sans">
              Frequently Asked Questions · Tissamaharama & Hambantota
            </span>
          </div>

          <h2
            className="text-2xl sm:text-4xl md:text-5xl font-light text-ivory tracking-tight mb-4"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Essential Guide to Staying at <br className="hidden sm:inline" />
            <span className="text-sand-light italic font-normal">Sri Shahrukh Lake Resort</span>
          </h2>

          <p className="text-sm sm:text-base text-ivory/70 max-w-2xl mx-auto font-sans leading-relaxed">
            Everything you need to know about our tranquil lakeside homestay in Tissamaharama,
            wildlife safari logistics, and exploring the Hambantota region.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className={`border transition-all duration-300 rounded-lg overflow-hidden backdrop-blur-sm ${
                  isOpen
                    ? "bg-teal-mid/70 border-sand/50 shadow-lg shadow-black/30"
                    : "bg-teal-mid/30 border-sand/20 hover:border-sand/40 hover:bg-teal-mid/50"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full text-left px-5 sm:px-7 py-4 sm:py-5 flex items-center justify-between gap-4 transition-colors"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start gap-3.5 sm:gap-4">
                    <span className="text-sand/70 font-mono text-xs sm:text-sm mt-0.5 select-none">
                      0{idx + 1}
                    </span>
                    <div>
                      <span className="block text-[10px] font-semibold uppercase tracking-wider text-sand/80 mb-1">
                        {faq.category}
                      </span>
                      <h3 className="text-sm sm:text-base md:text-lg font-medium text-ivory leading-snug">
                        {faq.question}
                      </h3>
                    </div>
                  </div>

                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full border border-sand/30 flex items-center justify-center transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-sand text-teal-deep" : "text-sand-light bg-teal-mid/60"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-7 pb-5 sm:pb-6 pt-1 text-xs sm:text-sm text-ivory/80 font-sans leading-relaxed border-t border-sand/15 pl-12 sm:pl-16">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
