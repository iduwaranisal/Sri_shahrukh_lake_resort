"use client";

import { useRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import {
  Calendar,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  RefreshCw,
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

export default function Booking() {
  const ref = useRef<HTMLElement>(null);
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
        error.message || "Failed to send inquiry email. Please try again or call us directly."
      );
    }
  };

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

      <div className="relative mx-auto max-w-4xl px-5 sm:px-6 lg:px-10">
        {/* Section Header */}
        <div className="mb-10 sm:mb-12 text-center">
          <div
            className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 mb-5 px-4 py-2 rounded-full border border-sand/30 bg-sand/10"
          >
            <div className="inline-flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-sand" />
              <p
                className="text-xs tracking-wide text-sand-light font-medium"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                3 private rooms
              </p>
            </div>
          </div>

          <h2
            id="booking-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-light leading-tight text-ivory"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Check room availability &amp;{" "}
            <em className="not-italic text-sand">Yala safari packages</em>
          </h2>

          <p
            className="mx-auto mt-4 max-w-xl text-sm sm:text-base font-light leading-relaxed text-ivory/80"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Tell us your dates and we&apos;ll confirm availability and help arrange your Yala safari.
            Your request goes straight to our reservations team at{" "}
            <strong className="font-medium text-ivory">lakeresortsrishahrukh@gmail.com</strong>.
          </p>

          <div
            className="mt-6"
          >
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-sand text-teal-deep text-sm font-semibold shadow-lg shadow-black/20 hover:bg-sand-light transition-colors"
            >
              <Calendar className="w-4 h-4" />
              <span>Book now</span>
            </Link>
          </div>
        </div>

        {selectedVillaNotice && (
          <div
            className="mb-6 px-4 py-3 rounded-md bg-sand/20 border border-sand/60 text-center text-sm text-ivory font-medium"
            role="status"
          >
            ✓ Room selected: {selectedVillaNotice}
          </div>
        )}

        {/* Form Container */}
        <div
          className="rounded-xl border border-sand/30 border-t-4 border-t-sand p-6 sm:p-10 md:p-12 shadow-2xl shadow-black/30"
          style={{ background: "#fdfbf7" }}
        >
          {isSuccess && submittedData ? (
            <div
              className="py-8 sm:py-12 text-center"
              aria-live="polite"
            >
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-sand/60 bg-sand/15 text-teal-mid">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3
                className="mb-3 text-2xl sm:text-3xl font-light text-teal-deep"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Inquiry sent
              </h3>
              <p
                className="max-w-md mx-auto text-sm sm:text-base font-light leading-relaxed text-teal-deep/75 mb-8"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Thank you. Your inquiry has been emailed to{" "}
                <strong className="font-semibold text-teal-deep">lakeresortsrishahrukh@gmail.com</strong>.
                We&apos;ll check room availability and reply with reservation and safari details.
              </p>

              {/* Inquiry Summary Box */}
              <div className="max-w-md mx-auto mb-8 p-5 rounded-lg border border-teal-deep/10 bg-teal-deep/[0.04] text-left text-sm space-y-2.5 text-teal-deep/70">
                <div className="flex justify-between gap-4 border-b border-teal-deep/10 pb-2.5">
                  <span className="text-teal-deep/60">Guest name</span>
                  <span className="text-teal-deep font-medium text-right">{submittedData.name}</span>
                </div>
                <div className="flex justify-between gap-4 border-b border-teal-deep/10 pb-2.5">
                  <span className="text-teal-deep/60">Email</span>
                  <span className="text-teal-deep font-medium text-right break-all">{submittedData.email}</span>
                </div>
                <div className="flex justify-between gap-4 border-b border-teal-deep/10 pb-2.5">
                  <span className="text-teal-deep/60">Room</span>
                  <span className="text-teal-deep font-medium text-right">{submittedData.villa}</span>
                </div>
                <div className="flex justify-between gap-4 border-b border-teal-deep/10 pb-2.5">
                  <span className="text-teal-deep/60">Dates</span>
                  <span className="text-teal-deep font-medium text-right">
                    {submittedData.checkIn} to {submittedData.checkOut}
                  </span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-teal-deep/60">Guests</span>
                  <span className="text-teal-deep font-medium text-right">{submittedData.guests}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsSuccess(false);
                    setSubmittedData(null);
                  }}
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3 rounded-md bg-teal-deep text-ivory text-sm font-semibold shadow-md hover:bg-teal-mid transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sand"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Send another inquiry</span>
                </button>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              aria-label="Homestay room reservation inquiry form"
            >
              {submissionError && (
                <div className="mb-8 p-4 rounded-md border border-error/40 bg-error/10 text-teal-deep text-sm flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 text-error flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-semibold text-error">We couldn&apos;t send your inquiry</p>
                    <p className="text-teal-deep/80">{submissionError}</p>
                    <p className="text-xs pt-1 text-teal-deep/80">
                      You can also reach us directly by calling 077 621 9245.
                    </p>
                  </div>
                </div>
              )}

              {/* Dates Row */}
              <div className="grid gap-5 sm:grid-cols-2 mb-5">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="booking-check-in"
                    className="text-sm font-medium text-teal-deep"
                  >
                    Check-in date *
                  </label>
                  <input
                    id="booking-check-in"
                    type="date"
                    min={todayStr}
                    {...register("checkIn", {
                      onChange: (e) => setCheckInDate(e.target.value),
                    })}
                    className="w-full rounded-md border border-teal-deep/20 bg-[#ffffff] px-4 py-3 text-sm text-teal-deep [color-scheme:light] outline-none transition-colors hover:border-teal-deep/40 focus:border-teal-mid focus:ring-2 focus:ring-sand/50 aria-[invalid=true]:border-error"
                    aria-invalid={!!errors.checkIn}
                  />
                  {errors.checkIn && (
                    <p className="text-xs text-error font-medium">{errors.checkIn.message}</p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="booking-check-out"
                    className="text-sm font-medium text-teal-deep"
                  >
                    Check-out date *
                  </label>
                  <input
                    id="booking-check-out"
                    type="date"
                    min={minCheckOutDate}
                    {...register("checkOut")}
                    className="w-full rounded-md border border-teal-deep/20 bg-[#ffffff] px-4 py-3 text-sm text-teal-deep [color-scheme:light] outline-none transition-colors hover:border-teal-deep/40 focus:border-teal-mid focus:ring-2 focus:ring-sand/50 aria-[invalid=true]:border-error"
                    aria-invalid={!!errors.checkOut}
                  />
                  {errors.checkOut && (
                    <p className="text-xs text-error font-medium">{errors.checkOut.message}</p>
                  )}
                </div>
              </div>

              {/* Room & Guests Row */}
              <div className="grid gap-5 sm:grid-cols-2 mb-5">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="booking-villa"
                    className="text-sm font-medium text-teal-deep"
                  >
                    Room *
                  </label>
                  <select
                    id="booking-villa"
                    {...register("villa", {
                      onChange: (e) => setVillaSelected(e.target.value),
                    })}
                    className="w-full cursor-pointer rounded-md border border-teal-deep/20 bg-[#ffffff] px-4 py-3 text-sm text-teal-deep outline-none transition-colors hover:border-teal-deep/40 focus:border-teal-mid focus:ring-2 focus:ring-sand/50 aria-[invalid=true]:border-error"
                    aria-invalid={!!errors.villa}
                  >
                    {roomOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-[#ffffff] text-teal-deep">
                        {opt}
                      </option>
                    ))}
                  </select>
                  {errors.villa && (
                    <p className="text-xs text-error font-medium">{errors.villa.message}</p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="booking-guests"
                    className="text-sm font-medium text-teal-deep"
                  >
                    Guests *
                  </label>
                  <select
                    id="booking-guests"
                    {...register("guests", {
                      onChange: (e) => setGuestsCount(e.target.value),
                    })}
                    className="w-full cursor-pointer rounded-md border border-teal-deep/20 bg-[#ffffff] px-4 py-3 text-sm text-teal-deep outline-none transition-colors hover:border-teal-deep/40 focus:border-teal-mid focus:ring-2 focus:ring-sand/50 aria-[invalid=true]:border-error"
                    aria-invalid={!!errors.guests}
                  >
                    <option value="1 Guest" className="bg-[#ffffff] text-teal-deep">
                      1 Guest
                    </option>
                    <option value="2 Guests" className="bg-[#ffffff] text-teal-deep">
                      2 Guests
                    </option>
                    <option value="3 Guests" className="bg-[#ffffff] text-teal-deep">
                      3 Guests
                    </option>
                    <option value="4 Guests" className="bg-[#ffffff] text-teal-deep">
                      4 Guests
                    </option>
                    <option value="5+ Guests" className="bg-[#ffffff] text-teal-deep">
                      5+ Guests
                    </option>
                  </select>
                  {errors.guests && (
                    <p className="text-xs text-error font-medium">{errors.guests.message}</p>
                  )}
                </div>
              </div>

              {/* Name & Email Row */}
              <div className="grid gap-5 sm:grid-cols-2 mb-5">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="booking-name"
                    className="text-sm font-medium text-teal-deep"
                  >
                    Full name *
                  </label>
                  <input
                    id="booking-name"
                    type="text"
                    placeholder="Your full name"
                    {...register("name")}
                    className="w-full rounded-md border border-teal-deep/20 bg-[#ffffff] px-4 py-3 text-sm text-teal-deep placeholder:text-teal-deep/40 outline-none transition-colors hover:border-teal-deep/40 focus:border-teal-mid focus:ring-2 focus:ring-sand/50 aria-[invalid=true]:border-error"
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && (
                    <p className="text-xs text-error font-medium">{errors.name.message}</p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="booking-email"
                    className="text-sm font-medium text-teal-deep"
                  >
                    Email address *
                  </label>
                  <input
                    id="booking-email"
                    type="email"
                    placeholder="you@example.com"
                    {...register("email")}
                    className="w-full rounded-md border border-teal-deep/20 bg-[#ffffff] px-4 py-3 text-sm text-teal-deep placeholder:text-teal-deep/40 outline-none transition-colors hover:border-teal-deep/40 focus:border-teal-mid focus:ring-2 focus:ring-sand/50 aria-[invalid=true]:border-error"
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <p className="text-xs text-error font-medium">{errors.email.message}</p>
                  )}
                </div>
              </div>

              {/* Phone & Special Requests Row */}
              <div className="grid gap-5 sm:grid-cols-2 mb-8">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="booking-phone"
                    className="text-sm font-medium text-teal-deep"
                  >
                    Phone / WhatsApp{" "}
                    <span className="font-normal text-teal-deep/50">(optional)</span>
                  </label>
                  <input
                    id="booking-phone"
                    type="tel"
                    placeholder="+94 77 123 4567 or international"
                    {...register("phone")}
                    className="w-full rounded-md border border-teal-deep/20 bg-[#ffffff] px-4 py-3 text-sm text-teal-deep placeholder:text-teal-deep/40 outline-none transition-colors hover:border-teal-deep/40 focus:border-teal-mid focus:ring-2 focus:ring-sand/50"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="booking-requests"
                    className="text-sm font-medium text-teal-deep"
                  >
                    Safari or special requests{" "}
                    <span className="font-normal text-teal-deep/50">(optional)</span>
                  </label>
                  <input
                    id="booking-requests"
                    type="text"
                    placeholder="Yala safari, airport pickup, dietary needs"
                    {...register("specialRequests")}
                    className="w-full rounded-md border border-teal-deep/20 bg-[#ffffff] px-4 py-3 text-sm text-teal-deep placeholder:text-teal-deep/40 outline-none transition-colors hover:border-teal-deep/40 focus:border-teal-mid focus:ring-2 focus:ring-sand/50"
                  />
                </div>
              </div>

              {/* Submit & WhatsApp */}
              <div className="flex flex-col items-center gap-4 text-center">
                <button
                  id="booking-submit"
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-2 w-full sm:w-auto sm:min-w-[320px] min-h-[52px] px-9 py-3.5 rounded-md bg-teal-deep text-ivory text-sm font-semibold tracking-wide shadow-md transition-all duration-200 hover:bg-teal-mid hover:shadow-lg active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sand"
                  style={{
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      Sending your inquiry…
                    </span>
                  ) : (
                    <>
                      <Calendar className="w-4 h-4" />
                      <span>Check availability</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 w-full pt-5 mt-1 border-t border-teal-deep/10 text-xs text-teal-deep/60">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-mid" />
                  <span>Free Wi-Fi &amp; on-site private parking</span>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}