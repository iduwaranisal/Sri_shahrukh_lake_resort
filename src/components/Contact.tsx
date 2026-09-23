"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, CheckCircle2, Sparkles, Navigation } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { getTelUrl } from "@/lib/whatsapp";
import SocialLinks from "@/components/ui/SocialLinks";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  message: z.string().min(10, "Your message must be at least 10 characters"),
});

type ContactForm = z.infer<typeof schema>;

interface ContactProps {
  phone?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
  mapUrl?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  tiktokUrl?: string;
  youtubeUrl?: string;
}

export default function Contact({
  phone = "077 621 9245",
  whatsapp = "0757273416",
  email = "lakeresortsrishahrukh@gmail.com",
  address = "135/1 Suduwella Tikiri udanapura, Tissamaharama, Sri Lanka",
  mapUrl = "https://www.google.com/maps/search/?api=1&query=77VQ%2BX6+Tissamaharama",
  facebookUrl,
  instagramUrl,
  tiktokUrl,
  youtubeUrl,
}: ContactProps = {}) {
  const sectionRef = useScrollReveal<HTMLElement>();

  const contactDetails = [
    {
      label: "Address",
      value: address,
      href: mapUrl,
      icon: MapPin,
    },
    {
      label: "Location / Plus Code",
      value: "77VQ+X6 Tissamaharama",
      href: mapUrl,
      icon: Navigation,
    },
    {
      label: "Contact Number",
      value: phone,
      href: getTelUrl(phone),
      icon: Phone,
    },
    {
      label: "WhatsApp Number",
      value: whatsapp,
      href: null,
      icon: MessageCircle,
    },
    {
      label: "Email Address",
      value: email,
      href: `mailto:${email}`,
      icon: Mail,
    },
    {
      label: "Check-In / Departure",
      value: "Standard Check-In from 2:00 PM · Departure by 12:00 PM",
      href: null,
      icon: Clock,
    },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<ContactForm>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: ContactForm) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Contact form submission:", data);
    reset();
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 sm:py-28 md:py-32 relative overflow-hidden"
      style={{ background: "var(--color-ivory)" }}
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
        {/* Section Header */}
        <div className="mb-10 sm:mb-14 text-center max-w-2xl mx-auto">
          <div className="scroll-reveal inline-flex items-center gap-2 mb-3 px-3.5 py-1 border border-sand/30 bg-sand/10">
            <Sparkles className="w-3.5 h-3.5 text-sand animate-twinkle" />
            <p
              className="text-xs uppercase tracking-[0.3em] font-medium"
              style={{ color: "var(--color-sand-dark)", fontFamily: "var(--font-sans)" }}
            >
              Connect &amp; Find Us
            </p>
          </div>

          <h2
            id="contact-heading"
            className="scroll-reveal stagger-1 text-3xl sm:text-4xl md:text-5xl font-light text-teal-deep"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            We Are Here to{" "}
            <span className="italic text-bronze-light">Welcome You</span>
          </h2>

          <p
            className="scroll-reveal stagger-2 mt-2.5 text-sm sm:text-base font-light text-stone"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Connect with host Geeth and our dedicated team for personalized room reservations, bespoke Yala safari planning, or seamless arrival guidance.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14 items-start">
          {/* Contact Details Column */}
          <div className="scroll-reveal stagger-2 lg:col-span-5 space-y-4">
            <ul className="space-y-3">
              {contactDetails.map((detail, idx) => {
                const Icon = detail.icon;
                return (
                  <li
                    key={idx}
                    className="p-3.5 sm:p-4 border border-sand/25 bg-ivory-warm flex items-start gap-3.5 transition-all hover:border-sand"
                  >
                    <div className="h-9 w-9 flex-shrink-0 rounded-full border border-sand/40 bg-teal-deep/5 flex items-center justify-center text-teal-deep">
                      <Icon className="w-4 h-4 text-bronze" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] uppercase tracking-wider text-stone-light font-medium">
                        {detail.label}
                      </p>
                      {detail.href ? (
                        <a
                          href={detail.href}
                          target={detail.href.startsWith("http") ? "_blank" : undefined}
                          rel={detail.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="mt-0.5 block text-sm font-medium text-teal-deep hover:text-sand-dark transition-colors break-words"
                          style={{ fontFamily: "var(--font-sans)" }}
                        >
                          {detail.value}
                        </a>
                      ) : (
                        <p
                          className="mt-0.5 text-sm font-medium text-teal-deep"
                          style={{ fontFamily: "var(--font-sans)" }}
                        >
                          {detail.value}
                        </p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* Social Media Profiles Card */}
            {(facebookUrl || instagramUrl || tiktokUrl || youtubeUrl) && (
              <div className="p-5 border border-sand/20 bg-teal-mid text-ivory">
                <p
                  className="text-xs uppercase tracking-[0.22em] text-sand font-medium mb-3"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  Follow Us on Social Media
                </p>
                <SocialLinks
                  facebookUrl={facebookUrl}
                  instagramUrl={instagramUrl}
                  tiktokUrl={tiktokUrl}
                  youtubeUrl={youtubeUrl}
                  variant="contact"
                />
              </div>
            )}
          </div>

          {/* Contact Form */}
          <div className="scroll-reveal stagger-3 lg:col-span-7 border border-sand/25 bg-ivory-warm p-6 sm:p-8 md:p-10 shadow-md">
            {isSubmitSuccessful ? (
              <div className="py-12 text-center" aria-live="polite">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-sand text-sand">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3
                  className="text-xl font-light text-teal-deep mb-2"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  Message Sent
                </h3>
                <p className="text-sm font-light text-stone max-w-sm mx-auto">
                  Thank you for messaging Sri Shahrukh Lake Resort. We will reply to your inquiry soon.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="space-y-4"
                aria-label="Contact inquiry form"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="contact-name"
                      className="text-[11px] uppercase tracking-[0.2em] text-stone font-medium"
                    >
                      Your Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="Your name"
                      {...register("name")}
                      className="border border-sand/30 bg-ivory px-3.5 py-2.5 min-h-[46px] text-sm text-charcoal outline-none transition-all focus:border-sand touch-manipulation"
                      aria-invalid={!!errors.name}
                    />
                    {errors.name && (
                      <p className="text-xs text-error">{errors.name.message}</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="contact-email"
                      className="text-[11px] uppercase tracking-[0.2em] text-stone font-medium"
                    >
                      Email Address *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="your@email.com"
                      {...register("email")}
                      className="border border-sand/30 bg-ivory px-3.5 py-2.5 min-h-[46px] text-sm text-charcoal outline-none transition-all focus:border-sand touch-manipulation"
                      aria-invalid={!!errors.email}
                    />
                    {errors.email && (
                      <p className="text-xs text-error">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-phone"
                    className="text-[11px] uppercase tracking-[0.2em] text-stone font-medium"
                  >
                    Phone / WhatsApp Number
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    placeholder="e.g. 077 123 4567"
                    {...register("phone")}
                    className="border border-sand/30 bg-ivory px-3.5 py-2.5 min-h-[46px] text-sm text-charcoal outline-none transition-all focus:border-sand touch-manipulation"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-message"
                    className="text-[11px] uppercase tracking-[0.2em] text-stone font-medium"
                  >
                    Message / Inquiry *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    placeholder="Ask about room availability, check-in time, Yala safari jeep options, bicycle rentals, or airport shuttle..."
                    {...register("message")}
                    className="border border-sand/30 bg-ivory px-3.5 py-2.5 text-sm text-charcoal outline-none transition-all focus:border-sand resize-none touch-manipulation"
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && (
                    <p className="text-xs text-error">{errors.message.message}</p>
                  )}
                </div>

                <button
                  id="contact-submit"
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-shimmer flex items-center justify-center gap-2 w-full min-h-[46px] px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50"
                  style={{
                    background: "var(--color-teal-deep)",
                    color: "var(--color-ivory)",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  {isSubmitting ? (
                    <span>Transmitting Inquiry…</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5 text-sand" />
                      <span>Send Direct Inquiry</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
