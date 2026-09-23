import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0a1815",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://srishahrukhlakeresort.hotel.lk"),
  title: {
    default: "Sri Shahrukh Lake Resort | Best Resort & Homestay in Tissamaharama, Hambantota",
    template: "%s | Sri Shahrukh Lake Resort Tissamaharama",
  },
  description:
    "Discover Sri Shahrukh Lake Resort — top-rated tranquil resort & homestay in Tissamaharama, Hambantota near Yala National Park. Deluxe rooms, lake views, authentic dining, and direct 4x4 safari excursions.",
  keywords: [
    "Sri Shahrukh Lake Resort",
    "srishahrukhlakeresort.hotel.lk",
    "hotel in Tissamaharama",
    "resort in Tissamaharama",
    "resorts around Tissamaharama",
    "resort in Hambantota",
    "resorts around Hambantota",
    "best resort in Tissamaharama",
    "Tissamaharama homestay",
    "hotels in Tissamaharama",
    "hotels near Yala National Park",
    "Tissa Wewa resort",
    "lake resort Tissamaharama",
    "places to stay in Tissamaharama",
    "Yala safari accommodation",
    "Suduwella Tikiri Udanapura resort",
    "luxury homestay Hambantota",
    "Southern Province Sri Lanka resort",
    "hotel lk Tissamaharama",
    "Sri Lanka hotel resort",
  ],
  authors: [{ name: "Sri Shahrukh Lake Resort", url: "https://srishahrukhlakeresort.hotel.lk" }],
  creator: "Sri Shahrukh Lake Resort",
  publisher: "Sri Shahrukh Lake Resort",
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
  alternates: {
    canonical: "https://srishahrukhlakeresort.hotel.lk",
  },
  openGraph: {
    title: "Sri Shahrukh Lake Resort | Best Resort & Homestay in Tissamaharama, Hambantota",
    description:
      "A peaceful boutique resort & homestay in Tissamaharama with deluxe rooms, lake views, private parking, and tailored Yala safari tours.",
    url: "https://srishahrukhlakeresort.hotel.lk",
    siteName: "Sri Shahrukh Lake Resort",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/znj9faa6/image/upload/v1789894691/srishahrukh/img2.jpg",
        width: 1200,
        height: 630,
        alt: "Sri Shahrukh Lake Resort in Tissamaharama, Hambantota",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sri Shahrukh Lake Resort | Best Resort in Tissamaharama, Hambantota",
    description:
      "Tranquil resort & homestay in Tissamaharama near Yala National Park. Warm personalized hospitality.",
    images: ["https://res.cloudinary.com/znj9faa6/image/upload/v1789894691/srishahrukh/img2.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "geo.region": "LK-33",
    "geo.placename": "Tissamaharama, Hambantota, Sri Lanka",
    "geo.position": "6.2847;81.2885",
    ICBM: "6.2847, 81.2885",
  },
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Resort", "Hotel", "LodgingBusiness", "BedAndBreakfast"],
      "@id": "https://srishahrukhlakeresort.hotel.lk/#resort",
      name: "Sri Shahrukh Lake Resort",
      alternateName: [
        "Sri Shahrukh Lake Resort Tissamaharama",
        "Shahrukh Lake Resort",
        "Sri Shahrukh Homestay",
        "Sri Shahrukh Lake Resort Hambantota",
      ],
      description:
        "Sri Shahrukh Lake Resort is a tranquil boutique resort and homestay located in Tissamaharama, Hambantota District near Yala National Park and Tissa Wewa. Offering luxury rooms, lake views, private 4x4 Yala safari tours, authentic dining, and warm hospitality.",
      url: "https://srishahrukhlakeresort.hotel.lk",
      telephone: "+94776219245",
      email: "lakeresortsrishahrukh@gmail.com",
      image: [
        "https://res.cloudinary.com/znj9faa6/image/upload/v1789894691/srishahrukh/img2.jpg",
        "https://res.cloudinary.com/znj9faa6/image/upload/v1789894645/srishahrukh/hero1.jpg",
        "https://res.cloudinary.com/znj9faa6/image/upload/v1789894717/srishahrukh/tissa-lake-sunrise.jpg",
      ],
      address: {
        "@type": "PostalAddress",
        streetAddress: "135/1 Suduwella Tikiri Udanapura",
        addressLocality: "Tissamaharama",
        addressRegion: "Southern Province",
        postalCode: "82600",
        addressCountry: "LK",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 6.2847,
        longitude: 81.2885,
      },
      hasMap: "https://maps.google.com/?q=6.2847,81.2885",
      priceRange: "$$",
      currenciesAccepted: "USD, LKR, EUR, GBP",
      paymentAccepted: "Cash, Bank Transfer",
      checkinTime: "14:00",
      checkoutTime: "11:00",
      starRating: {
        "@type": "Rating",
        ratingValue: "4.8",
        bestRating: "5",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        reviewCount: "128",
        bestRating: "5",
        worstRating: "1",
      },
      amenityFeature: [
        { "@type": "LocationFeatureSpecification", name: "Free High-Speed Wi-Fi", value: true },
        { "@type": "LocationFeatureSpecification", name: "Free Private Parking", value: true },
        { "@type": "LocationFeatureSpecification", name: "Air Conditioned Deluxe Rooms", value: true },
        { "@type": "LocationFeatureSpecification", name: "Yala Safari Jeep Arrangements", value: true },
        { "@type": "LocationFeatureSpecification", name: "Lakeside Garden & Terrace", value: true },
        { "@type": "LocationFeatureSpecification", name: "Authentic Sri Lankan Breakfast", value: true },
        { "@type": "LocationFeatureSpecification", name: "Bicycle Rental", value: true },
        { "@type": "LocationFeatureSpecification", name: "24-Hour Front Desk Support", value: true },
      ],
      containedInPlace: {
        "@type": "Place",
        name: "Tissamaharama, Hambantota District, Southern Province, Sri Lanka",
      },
      sameAs: ["https://maps.google.com/?q=6.2847,81.2885"],
    },
    {
      "@type": "FAQPage",
      "@id": "https://srishahrukhlakeresort.hotel.lk/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "Why is Sri Shahrukh Lake Resort the best resort in Tissamaharama?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Situated just 2.5 km from the ancient Tissa Wewa reservoir and 28 km from Yala National Park, Sri Shahrukh Lake Resort offers peaceful garden surroundings, deluxe air-conditioned rooms, warm personalized hospitality, and direct safari jeep arrangements.",
          },
        },
        {
          "@type": "Question",
          name: "How far is Sri Shahrukh Lake Resort from Yala National Park?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sri Shahrukh Lake Resort is located approximately 28 km (a 30-minute scenic drive) from the main gates of Yala National Park Block 1. The resort coordinates custom 4x4 private and shared safari jeeps with experienced wildlife trackers picking you up directly from the resort.",
          },
        },
        {
          "@type": "Question",
          name: "Where is Sri Shahrukh Lake Resort located in Hambantota District?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The resort is situated at 135/1 Suduwella Tikiri Udanapura in Tissamaharama, Hambantota District, Southern Province, Sri Lanka (GPS: 6.2847° N, 81.2885° E), just minutes from Tissa Lake, Tissamaharama Raja Maha Vihara, and Kataragama.",
          },
        },
        {
          "@type": "Question",
          name: "What amenities and dining options are provided at the resort?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Guests enjoy complimentary high-speed Wi-Fi, free private parking, spacious air-conditioned rooms with garden and lake views, daily authentic Sri Lankan breakfast, afternoon tea, bicycle rentals, and 24/7 guest assistance.",
          },
        },
        {
          "@type": "Question",
          name: "How can I book a stay or safari at Sri Shahrukh Lake Resort?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You can book directly through our official website booking portal, contact us via WhatsApp at +94 75 727 3416, or call direct phone +94 77 621 9245 for the best direct booking rates and guaranteed safari jeep reservations.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Schema.org Structured Data for Google Rich Snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
        {/* Font preconnect for fastest delivery */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        {/* Google Fonts with display=swap and preconnect for fast non-blocking delivery */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;1,9..144,300;1,9..144,400&family=Playfair+Display:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
