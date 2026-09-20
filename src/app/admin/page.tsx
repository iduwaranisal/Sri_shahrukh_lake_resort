import { Suspense } from "react";
import type { Metadata } from "next";
import AdminClient from "./AdminClient";

export const metadata: Metadata = {
  title: "Admin Portal | Sri Shahrukh Lake Resort",
  description: "Management console for bookings and dynamic website sections.",
  robots: "noindex, nofollow",
};

export default function AdminPage() {
  return (
    <Suspense
      fallback={
        <div
          className="min-h-screen flex items-center justify-center text-ivory"
          style={{ background: "var(--color-teal-deep)" }}
        >
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-sand border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs uppercase tracking-widest text-sand">Loading Admin Portal…</p>
          </div>
        </div>
      }
    >
      <AdminClient />
    </Suspense>
  );
}
