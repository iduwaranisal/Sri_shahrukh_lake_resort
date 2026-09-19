import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0a1815",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://srishahrukhlakeresort.com"),
  title: "Sri Shahrukh Lake Resort | Tissamaharama, Sri Lanka",
  description:
    "Sri Shahrukh Lake Resort is a peaceful budget homestay located at 135/1 Suduwella Tikiri Udanapura in Tissamaharama. Free Wi-Fi, private parking, garden views, and Yala safari assistance.",
  keywords:
    "Sri Shahrukh Lake Resort, Tissamaharama budget homestay, Tissamaharama small hotel, Suduwella Tikiri Udanapura, Tissa Wewa accommodation, Yala safari Sri Lanka",
  openGraph: {
    title: "Sri Shahrukh Lake Resort | Tissamaharama, Sri Lanka",
    description:
      "A welcoming budget homestay in Tissamaharama near Tissa Wewa and Yala National Park. Free Wi-Fi, private parking, breakfast, and safari tour arrangements.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
