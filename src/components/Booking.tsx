"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import {
  Calendar,
  CheckCircle2,
  MessageCircle,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  RefreshCw,
  Star,
  ExternalLink,
} from "lucide-react";

const roomOptions = [
  "Homestay Stay",
];

const schema = z
  .object({
    checkIn: z.string().min(1, "Please select your check-in date"),
    checkOut: z.string().min(1, "Please select your check-out date"),
    guests: z.string().min(1, "Please specify number of guests"),
    villa: z.string().min(1, "Please select a preferred room"),
    name: z.string().min(2, "Please provide your full name"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().optional(),
    specialRequests: z.string().optional(),
  })
  .refine(
    (data) => {
      if (!data.checkIn || !data.checkOut) return true;
      return new Date(data.checkOut) > new Date(data.checkIn);
    },
    {
      message: "Check-out date must be after check-in date",
      path: ["checkOut"],
    }
  );

type BookingForm = z.infer<typeof schema>;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Booking() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [selectedVillaNotice, setSelectedVillaNotice] = useState<string | null>(null);

  const todayStr = new Date().toISOString().split("T")[0];

  const [checkInDate, setCheckInDate] = useState(todayStr);
  const [villaSelected, setVillaSelected] = useState("Homestay Stay");
  const [guestsCount, setGuestsCount] = useState("2 Guests");

  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<BookingForm | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<BookingForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      checkIn: todayStr,
      guests: "2 Guests",
      villa: "Homestay Stay",
    },
  });

  const minCheckOutDate = checkInDate
    ? new Date(new Date(checkInDate).getTime() + 86400000)
        .toISOString()
        .split("T")[0]
    : todayStr;

  useEffect(() => {
    const handlePreselect = (e: Event) => {
      const customEvent = e as CustomEvent<{ villa: string }>;
      if (customEvent.detail?.villa) {
        setValue("villa", customEvent.detail.villa);
        setVillaSelected(customEvent.detail.villa);
        setSelectedVillaNotice(customEvent.detail.villa);
        setTimeout(() => setSelectedVillaNotice(null), 4000);
      }
    };

    window.addEventListener("preselect-villa", handlePreselect);
    return () => window.removeEventListener("preselect-villa", handlePreselect);
  }, [setValue]);

  const onSubmit = async (data: BookingForm) => {
    setSubmissionError(null);
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Failed to submit booking inquiry.");
      }

      setSubmittedData(data);
      setIsSuccess(true);
      reset();
    } catch (err: unknown) {
      const error = err as Error;
      setSubmissionError(
        error.message || "Failed to send inquiry email. Please try again or reach us via WhatsApp."
      );
    }
  };

  const whatsAppUrl = `https://wa.me/94757273416?text=${encodeURIComponent(
    "Hello Sri Shahrukh Lake Resort, I would like to check room availability for:\n• Room: " +
    ((submittedData?.villa || villaSelected) || "Any Room") +
    "\n• Check-in: " +
    ((submittedData?.checkIn || checkInDate) || "Upcoming") +
    "\n• Guests: " +
    ((submittedData?.guests || guestsCount) || "2 Guests")
  )}`;

  return (
    <section
      id="booking"
      ref={ref}
      className="relative py-20 sm:py-28 md:py-32 overflow-hidden"
      style={{ background: "var(--color-teal-mid)" }}
      aria-labelledby="booking-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, var(--color-sand) 0px, var(--color-sand) 1px, transparent 1px, transparent 40px)",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-5 sm:px-6 lg:px-10">
        {/* Section Header */}
        <div className="mb-10 sm:mb-14 text-center">
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="inline-flex items-center gap-2 mb-3 px-3.5 py-1.5 border border-sand/30 bg-sand/10"
          >
            <Sparkles className="w-3.5 h-3.5 text-sand" />
            <p
              className="text-xs uppercase tracking-[0.25em] text-sand-light font-medium"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Only 3 Private Rooms
            </p>
            <span className="text-sand/40">|</span>
            <div className="flex items-center gap-1 text-xs text-sand font-semibold">
              <Star className="w-3.5 h-3.5 fill-sand text-sand" />
              <span>4.8 / 5.0 Across All Platforms</span>
            </div>
          </motion.div>

          <motion.h2
            id="booking-heading"
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="text-3xl sm:text-4xl md:text-5xl font-light text-ivory"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Check Room Availability &amp;{" "}
            <em className="not-italic text-sand">Safari Packages</em>
          </motion.h2>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="mx-auto mt-3 max-w-xl text-sm sm:text-base font-light leading-relaxed text-ivory/80"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Enjoy warm personal care and custom Yala safari tour arrangements at Sri Shahrukh Lake Resort.
            Inquiries are delivered directly to <strong>lakeresortsrishahrukh@gmail.com</strong>.
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="mt-4"
          >
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-6 py-3 bg-sand text-teal-deep text-xs font-semibold uppercase tracking-[0.2em] shadow-lg hover:scale-105 transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Now</span>
            </Link>
          </motion.div>
        </div>

        {selectedVillaNotice && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-6 p-3 bg-sand/20 border border-sand text-center text-xs text-sand-pale font-medium uppercase tracking-wider"
          >
            ✓ Selected room updated to: {selectedVillaNotice}
          </motion.div>
        )}

        {/* Form Container */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="border border-sand/25 p-6 sm:p-10 md:p-12 backdrop-blur-xl shadow-2xl shadow-black/40"
          style={{ background: "rgba(10,24,21,0.85)" }}
        >
          {isSuccess && submittedData ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-10 sm:py-14 text-center"
              aria-live="polite"
            >
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center border border-sand text-sand rounded-full bg-sand/10">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3
                className="mb-2 text-2xl sm:text-3xl font-light text-ivory"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Inquiry Sent to Resort
              </h3>
              <p
                className="max-w-md mx-auto text-sm sm:text-base font-light text-ivory/80 mb-6"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Your inquiry has been emailed directly to{" "}
                <strong className="text-sand">lakeresortsrishahrukh@gmail.com</strong>. We will review
                room availability and reply with reservation and safari details.
              </p>

              {/* Inquiry Summary Box */}
              <div className="max-w-md mx-auto mb-8 p-4 border border-sand/30 bg-teal-deep/90 text-left text-xs space-y-2 text-ivory/80">
                <div className="flex justify-between border-b border-sand/15 pb-1.5">
                  <span className="text-sand-light font-medium">Guest:</span>
                  <span className="text-ivory font-medium">{submittedData.name}</span>
                </div>
                <div className="flex justify-between border-b border-sand/15 pb-1.5">
                  <span className="text-sand-light font-medium">Email:</span>
                  <span className="text-ivory font-medium">{submittedData.email}</span>
                </div>
                <div className="flex justify-between border-b border-sand/15 pb-1.5">
                  <span className="text-sand-light font-medium">Selected Room:</span>
                  <span className="text-sand font-medium">{submittedData.villa}</span>
                </div>
                <div className="flex justify-between border-b border-sand/15 pb-1.5">
                  <span className="text-sand-light font-medium">Travel Dates:</span>
                  <span className="text-ivory font-medium">
                    {submittedData.checkIn} to {submittedData.checkOut}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sand-light font-medium">Guests:</span>
                  <span className="text-ivory font-medium">{submittedData.guests}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3 bg-sand text-teal-deep text-xs font-semibold uppercase tracking-[0.2em] shadow-lg hover:scale-105 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Instant WhatsApp Follow-up (0757273416)</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    setIsSuccess(false);
                    setSubmittedData(null);
                  }}
                  className="inline-flex items-center justify-center gap-1.5 w-full sm:w-auto px-5 py-3 border border-sand/30 text-sand text-xs uppercase tracking-wider hover:bg-teal-mid transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>New Inquiry</span>
                </button>
              </div>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              aria-label="Homestay room reservation inquiry form"
            >
              {submissionError && (
                <div className="mb-6 p-4 border border-error/50 bg-error/15 text-ivory text-xs flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-error flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-semibold text-error">Unable to send inquiry email</p>
                    <p className="text-ivory/80">{submissionError}</p>
                    <p className="text-[11px] pt-1">
                      You can also message us directly on WhatsApp at{" "}
                      <a
                        href={whatsAppUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sand underline"
                      >
                        0757273416
                      </a>{" "}
                      or call 077 621 9245.
                    </p>
                  </div>
                </div>
              )}

              {/* Dates Row */}
              <div className="grid gap-5 sm:grid-cols-2 mb-6">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="booking-check-in"
                    className="text-[11px] uppercase tracking-[0.25em] text-sand-light font-medium"
                  >
                    Check-In Date *
                  </label>
                  <input
                    id="booking-check-in"
                    type="date"
                    min={todayStr}
                    {...register("checkIn", {
                      onChange: (e) => setCheckInDate(e.target.value),
                    })}
                    className="border border-sand/30 bg-teal-deep/80 px-4 py-3 text-sm text-ivory outline-none transition-all focus:border-sand"
                    aria-invalid={!!errors.checkIn}
                  />
                  {errors.checkIn && (
                    <p className="text-xs text-error font-light">{errors.checkIn.message}</p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="booking-check-out"
                    className="text-[11px] uppercase tracking-[0.25em] text-sand-light font-medium"
                  >
                    Check-Out Date *
                  </label>
                  <input
                    id="booking-check-out"
                    type="date"
                    min={minCheckOutDate}
                    {...register("checkOut")}
                    className="border border-sand/30 bg-teal-deep/80 px-4 py-3 text-sm text-ivory outline-none transition-all focus:border-sand"
                    aria-invalid={!!errors.checkOut}
                  />
                  {errors.checkOut && (
                    <p className="text-xs text-error font-light">{errors.checkOut.message}</p>
                  )}
                </div>
              </div>

              {/* Room & Guests Row */}
              <div className="grid gap-5 sm:grid-cols-2 mb-6">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="booking-villa"
                    className="text-[11px] uppercase tracking-[0.25em] text-sand-light font-medium"
                  >
                    Select Room *
                  </label>
                  <select
                    id="booking-villa"
                    {...register("villa", {
                      onChange: (e) => setVillaSelected(e.target.value),
                    })}
                    className="border border-sand/30 bg-teal-deep px-4 py-3 text-sm text-ivory outline-none transition-all focus:border-sand appearance-none"
                    aria-invalid={!!errors.villa}
                  >
                    {roomOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-teal-deep text-ivory">
                        {opt}
                      </option>
                    ))}
                  </select>
                  {errors.villa && (
                    <p className="text-xs text-error font-light">{errors.villa.message}</p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="booking-guests"
                    className="text-[11px] uppercase tracking-[0.25em] text-sand-light font-medium"
                  >
                    Number of Guests *
                  </label>
                  <select
                    id="booking-guests"
                    {...register("guests", {
                      onChange: (e) => setGuestsCount(e.target.value),
                    })}
                    className="border border-sand/30 bg-teal-deep px-4 py-3 text-sm text-ivory outline-none transition-all focus:border-sand appearance-none"
                    aria-invalid={!!errors.guests}
                  >
                    <option value="1 Guest" className="bg-teal-deep text-ivory">
                      1 Guest
                    </option>
                    <option value="2 Guests" className="bg-teal-deep text-ivory">
                      2 Guests
                    </option>
                    <option value="3 Guests" className="bg-teal-deep text-ivory">
                      3 Guests
                    </option>
                    <option value="4 Guests" className="bg-teal-deep text-ivory">
                      4 Guests
                    </option>
                    <option value="5+ Guests" className="bg-teal-deep text-ivory">
                      5+ Guests
                    </option>
                  </select>
                  {errors.guests && (
                    <p className="text-xs text-error font-light">{errors.guests.message}</p>
                  )}
                </div>
              </div>

              {/* Name & Email Row */}
              <div className="grid gap-5 sm:grid-cols-2 mb-6">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="booking-name"
                    className="text-[11px] uppercase tracking-[0.25em] text-sand-light font-medium"
                  >
                    Your Name *
                  </label>
                  <input
                    id="booking-name"
                    type="text"
                    placeholder="e.g. David Miller"
                    {...register("name")}
                    className="border border-sand/30 bg-teal-deep/80 px-4 py-3 text-sm text-ivory placeholder:text-ivory/40 outline-none transition-all focus:border-sand"
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && (
                    <p className="text-xs text-error font-light">{errors.name.message}</p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="booking-email"
                    className="text-[11px] uppercase tracking-[0.25em] text-sand-light font-medium"
                  >
                    Email Address *
                  </label>
                  <input
                    id="booking-email"
                    type="email"
                    placeholder="your@email.com"
                    {...register("email")}
                    className="border border-sand/30 bg-teal-deep/80 px-4 py-3 text-sm text-ivory placeholder:text-ivory/40 outline-none transition-all focus:border-sand"
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <p className="text-xs text-error font-light">{errors.email.message}</p>
                  )}
                </div>
              </div>

              {/* Phone & Special Requests Row */}
              <div className="grid gap-5 sm:grid-cols-2 mb-8">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="booking-phone"
                    className="text-[11px] uppercase tracking-[0.25em] text-sand-light font-medium"
                  >
                    Phone / WhatsApp (Optional)
                  </label>
                  <input
                    id="booking-phone"
                    type="tel"
                    placeholder="+94 77 ... or international"
                    {...register("phone")}
                    className="border border-sand/30 bg-teal-deep/80 px-4 py-3 text-sm text-ivory placeholder:text-ivory/40 outline-none transition-all focus:border-sand"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="booking-requests"
                    className="text-[11px] uppercase tracking-[0.25em] text-sand-light font-medium"
                  >
                    Safari or Special Requests (Optional)
                  </label>
                  <input
                    id="booking-requests"
                    type="text"
                    placeholder="Yala safari booking, airport pickup, dietary needs..."
                    {...register("specialRequests")}
                    className="border border-sand/30 bg-teal-deep/80 px-4 py-3 text-sm text-ivory placeholder:text-ivory/40 outline-none transition-all focus:border-sand"
                  />
                </div>
              </div>

              {/* Submit & WhatsApp */}
              <div className="flex flex-col items-center gap-4 text-center">
                <button
                  id="booking-submit"
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-2 w-full sm:w-auto min-h-[48px] px-9 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 cursor-pointer"
                  style={{
                    background: "var(--color-sand)",
                    color: "var(--color-teal-deep)",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      Sending to lakeresortsrishahrukh@gmail.com…
                    </span>
                  ) : (
                    <>
                      <Calendar className="w-4 h-4" />
                      <span>Check Room &amp; Safari Availability</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-2 text-xs text-ivory/80 pt-1">
                  <span>Prefer fast answer?</span>
                  <a
                    href={whatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sand underline underline-offset-4 hover:text-sand-light inline-flex items-center gap-1 font-medium"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp 0757273416</span>
                  </a>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-ivory/60 mt-1 font-light">
                  <ShieldCheck className="w-3.5 h-3.5 text-sand" />
                  <span>Rated 4.8 / 5.0 Across Platforms · Free Wi-Fi &amp; Parking</span>
                </div>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
