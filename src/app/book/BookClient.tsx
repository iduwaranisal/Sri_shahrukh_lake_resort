"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Calendar,
  CheckCircle2,
  ArrowLeft,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import { createBooking } from "@/app/actions/bookingActions";

const schema = z
  .object({
    villa: z.string().min(1),
    checkIn: z.string().min(1, "Please select check-in date"),
    checkOut: z.string().min(1, "Please select check-out date"),
    guests: z.string().min(1, "Please select guests"),
    name: z.string().min(2, "Please enter your name"),
    email: z.string().email("Please enter a valid email"),
    phone: z.string().min(5, "Please enter your phone or WhatsApp number"),
    specialRequests: z.string().optional(),
  })
  .refine(
    (data) => {
      if (!data.checkIn || !data.checkOut) return true;
      return new Date(data.checkOut) > new Date(data.checkIn);
    },
    {
      message: "Check-out must be after check-in",
      path: ["checkOut"],
    }
  );

type BookingForm = z.infer<typeof schema>;

export default function BookClient() {
  const todayStr = new Date().toISOString().split("T")[0];
  const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split("T")[0];

  const [checkInDate, setCheckInDate] = useState(todayStr);
  const [checkOutDate, setCheckOutDate] = useState(tomorrowStr);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<BookingForm | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<BookingForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      villa: "Homestay Stay",
      checkIn: todayStr,
      checkOut: tomorrowStr,
      guests: "2 Guests",
      name: "",
      email: "",
      phone: "",
      specialRequests: "",
    },
  });

  const onSubmit = async (data: BookingForm) => {
    setSubmissionError(null);
    try {
      const res = await createBooking(data);
      if (!res.success) {
        throw new Error(res.error || "Failed to submit booking.");
      }

      setSubmittedData(data);
      setIsSuccess(true);
      reset({
        villa: "Homestay Stay",
        checkIn: todayStr,
        checkOut: tomorrowStr,
        guests: "2 Guests",
        name: "",
        email: "",
        phone: "",
        specialRequests: "",
      });
    } catch (err: unknown) {
      const error = err as Error;
      setSubmissionError(
        error.message || "Could not send booking request. Please message us on WhatsApp."
      );
    }
  };

  const currentCheckIn = watch("checkIn") || checkInDate;
  const currentCheckOut = watch("checkOut") || checkOutDate;
  const currentGuests = watch("guests") || "2 Guests";

  return (
    <div
      className="min-h-screen flex flex-col justify-between"
      style={{ background: "var(--color-teal-deep)" }}
    >
      {/* ── Top Header ── */}
      <header className="border-b border-sand/20 px-4 sm:px-8 py-3.5 bg-teal-deep/95 sticky top-0 z-20 backdrop-blur-md">
        <div className="mx-auto max-w-4xl flex items-center justify-between">
          <Link
            href="/"
            scroll={true}
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-sand hover:text-sand-light font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Resort</span>
          </Link>

          <Link href="/" className="text-center">
            <h1
              className="text-base sm:text-lg font-light tracking-[0.15em] uppercase gold-text-gradient"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Sri Shahrukh Lake Resort
            </h1>
          </Link>

          <div className="text-xs text-sand/80 font-light">
            <span>Tissamaharama</span>
          </div>
        </div>
      </header>

      {/* ── Main Simple Booking Form ── */}
      <main className="flex-1 py-8 sm:py-12 px-4 sm:px-6">
        <div className="mx-auto max-w-2xl">
          {/* Title */}
          <div className="text-center mb-8">
            <p className="text-xs uppercase tracking-[0.25em] text-sand font-medium mb-1.5">
              Direct Reservation Request
            </p>
            <h2
              className="text-2xl sm:text-4xl font-light text-ivory"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Reserve Your Lakeside Getaway
            </h2>
            <p className="text-xs sm:text-sm text-ivory/80 mt-1 max-w-md mx-auto">
              Complete your reservation details below. Host Geeth will personally verify availability and confirm your stay promptly.
            </p>
          </div>

          {/* Success Screen */}
          {isSuccess && submittedData ? (
            <div className="p-6 sm:p-10 border border-sand/40 bg-teal-mid text-center shadow-xl">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-sand bg-sand/10 text-sand">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3
                className="text-2xl sm:text-3xl font-light text-ivory mb-2"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Booking Request Sent!
              </h3>
              <p className="text-sm text-ivory/80 max-w-md mx-auto mb-6">
                Your reservation request has been sent to our host at <strong>lakeresortsrishahrukh@gmail.com</strong>.
              </p>

              <div className="max-w-sm mx-auto p-4 border border-sand/30 bg-teal-deep text-xs text-left space-y-2 mb-6 text-ivory/90">
                <div className="flex justify-between border-b border-sand/15 pb-1.5">
                  <span className="text-sand-light">Guest:</span>
                  <span className="font-medium text-ivory">{submittedData.name}</span>
                </div>
                <div className="flex justify-between border-b border-sand/15 pb-1.5">
                  <span className="text-sand-light">Dates:</span>
                  <span className="text-ivory">
                    {submittedData.checkIn} to {submittedData.checkOut}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sand-light">Party:</span>
                  <span className="text-ivory">{submittedData.guests}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-sand text-teal-deep text-xs font-semibold uppercase tracking-wider shadow-md hover:scale-105 transition-all"
                >
                  <span>Return to Home</span>
                </Link>
                <button
                  type="button"
                  onClick={() => setIsSuccess(false)}
                  className="w-full sm:w-auto px-5 py-3 border border-sand/30 text-sand text-xs uppercase tracking-wider hover:bg-teal-deep transition-colors"
                >
                  Send Another Request
                </button>
              </div>
            </div>
          ) : (
            <div className="border border-sand/30 bg-teal-mid/80 p-5 sm:p-8 shadow-2xl">
              {submissionError && (
                <div className="mb-6 p-3.5 border border-error/50 bg-error/15 text-ivory text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-error flex-shrink-0" />
                  <p>{submissionError}</p>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                <input type="hidden" {...register("villa")} value="Homestay Stay" />

                {/* Stay Dates & Guests */}
                <div className="grid gap-3 sm:grid-cols-3">
                  <div>
                    <label
                      htmlFor="booking-check-in"
                      className="block text-xs uppercase tracking-wider text-sand font-medium mb-1.5"
                    >
                      Check-in *
                    </label>
                    <input
                      id="booking-check-in"
                      type="date"
                      min={todayStr}
                      {...register("checkIn", {
                        onChange: (e) => {
                          setCheckInDate(e.target.value);
                          if (new Date(e.target.value) >= new Date(checkOutDate)) {
                            const nextDay = new Date(new Date(e.target.value).getTime() + 86400000)
                              .toISOString()
                              .split("T")[0];
                            setCheckOutDate(nextDay);
                            setValue("checkOut", nextDay);
                          }
                        },
                      })}
                      className="w-full border border-sand/30 bg-teal-deep px-3.5 py-2.5 text-xs text-ivory outline-none focus:border-sand"
                    />
                    {errors.checkIn && (
                      <p className="text-[10px] text-error mt-1">{errors.checkIn.message}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="booking-check-out"
                      className="block text-xs uppercase tracking-wider text-sand font-medium mb-1.5"
                    >
                      Check-out *
                    </label>
                    <input
                      id="booking-check-out"
                      type="date"
                      min={
                        checkInDate
                          ? new Date(new Date(checkInDate).getTime() + 86400000)
                              .toISOString()
                              .split("T")[0]
                          : todayStr
                      }
                      {...register("checkOut", {
                        onChange: (e) => setCheckOutDate(e.target.value),
                      })}
                      className="w-full border border-sand/30 bg-teal-deep px-3.5 py-2.5 text-xs text-ivory outline-none focus:border-sand"
                    />
                    {errors.checkOut && (
                      <p className="text-[10px] text-error mt-1">{errors.checkOut.message}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="booking-guests"
                      className="block text-xs uppercase tracking-wider text-sand font-medium mb-1.5"
                    >
                      Guests *
                    </label>
                    <select
                      id="booking-guests"
                      {...register("guests")}
                      className="w-full border border-sand/30 bg-teal-deep px-3.5 py-2.5 text-xs text-ivory outline-none focus:border-sand"
                    >
                      <option value="1 Guest" className="bg-teal-deep text-ivory">1 Guest</option>
                      <option value="2 Guests" className="bg-teal-deep text-ivory">2 Guests</option>
                      <option value="3 Guests" className="bg-teal-deep text-ivory">3 Guests</option>
                      <option value="4+ Guests" className="bg-teal-deep text-ivory">4+ Guests</option>
                    </select>
                  </div>
                </div>

                {/* Contact Details */}
                <div className="space-y-3 pt-1">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="booking-name"
                        className="block text-xs uppercase tracking-wider text-sand font-medium mb-1.5"
                      >
                        Your Name *
                      </label>
                      <input
                        id="booking-name"
                        type="text"
                        placeholder="Full Name"
                        {...register("name")}
                        className="w-full border border-sand/30 bg-teal-deep px-3.5 py-2.5 min-h-[46px] text-xs text-ivory placeholder:text-ivory/40 outline-none focus:border-sand touch-manipulation"
                      />
                      {errors.name && (
                        <p className="text-[10px] text-error mt-1">{errors.name.message}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="booking-email"
                        className="block text-xs uppercase tracking-wider text-sand font-medium mb-1.5"
                      >
                        Email Address *
                      </label>
                      <input
                        id="booking-email"
                        type="email"
                        placeholder="your@email.com"
                        {...register("email")}
                        className="w-full border border-sand/30 bg-teal-deep px-3.5 py-2.5 min-h-[46px] text-xs text-ivory placeholder:text-ivory/40 outline-none focus:border-sand touch-manipulation"
                      />
                      {errors.email && (
                        <p className="text-[10px] text-error mt-1">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="booking-phone"
                        className="block text-xs uppercase tracking-wider text-sand font-medium mb-1.5"
                      >
                        Phone / WhatsApp
                      </label>
                      <input
                        id="booking-phone"
                        type="tel"
                        required
                        placeholder="+94 7X XXX XXXX"
                        {...register("phone")}
                        className="w-full border border-sand/30 bg-teal-deep px-3.5 py-2.5 min-h-[46px] text-xs text-ivory placeholder:text-ivory/40 outline-none focus:border-sand touch-manipulation"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-[11px] text-error flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.phone.message}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="booking-notes"
                        className="block text-xs uppercase tracking-wider text-sand font-medium mb-1.5"
                      >
                        Special Requests (Optional)
                      </label>
                      <input
                        id="booking-notes"
                        type="text"
                        placeholder="Yala safari inquiry, airport pickup, etc."
                        {...register("specialRequests")}
                        className="w-full border border-sand/30 bg-teal-deep px-3.5 py-2.5 min-h-[46px] text-xs text-ivory placeholder:text-ivory/40 outline-none focus:border-sand touch-manipulation"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit & WhatsApp Shortcut */}
                <div className="pt-2 space-y-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 min-h-[48px] py-3.5 px-6 bg-sand text-teal-deep text-xs font-semibold uppercase tracking-[0.2em] shadow-lg hover:bg-sand-light transition-all cursor-pointer disabled:opacity-50 touch-manipulation active:scale-[0.99]"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Transmitting Reservation Request…
                      </span>
                    ) : (
                      <>
                        <Calendar className="w-4 h-4" />
                        <span>Request Reservation Confirmation</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>

      {/* ── Simple Footer ── */}
      <footer className="border-t border-sand/20 py-4 px-4 text-center text-[11px] text-ivory/60">
        <p>
          Sri Shahrukh Lake Resort · 135/1 Suduwella Tikiri Udanapura, Tissamaharama · Tel: 077 621 9245
        </p>
      </footer>
    </div>
  );
}
