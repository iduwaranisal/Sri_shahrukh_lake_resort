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
  title: "Sri Shahrukh Lake Resort | Peaceful Homestay in Tissamaharama",
  description:
    "Sri Shahrukh Lake Resort is a peaceful homestay located at 135/1 Suduwella Tikiri Udanapura in Tissamaharama. Rated 4.8/5 across all platforms. Free Wi-Fi, private parking, garden views, and Yala safari tour arrangements.",
  keywords:
    "Sri Shahrukh Lake Resort, Tissamaharama homestay, Tissamaharama boutique hotel, Suduwella Tikiri Udanapura, Tissa Wewa accommodation, Yala safari Sri Lanka",
  openGraph: {
    title: "Sri Shahrukh Lake Resort | Tissamaharama, Sri Lanka",
    description:
      "A peaceful boutique homestay in Tissamaharama rated 4.8/5 across platforms. Free Wi-Fi, private parking, breakfast, and personalized safari arrangements.",
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
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      </head>
      <body>{children}</body>
    </html>
  );
}
