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
        {/* Font preconnect for fastest delivery */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        {/* Non-blocking font loading with display=swap (text visible immediately with fallback) */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;1,9..144,300;1,9..144,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          media="print"
          // @ts-expect-error — onLoad handler for non-blocking font strategy
          onLoad="this.media='all'"
        />
        <noscript>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;1,9..144,300;1,9..144,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          />
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
