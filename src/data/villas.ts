export interface VillaFeature {
  icon: "bed" | "guests" | "size" | "view" | "pool" | "ac" | "dining" | "bath" | "wifi" | "butler" | "bar" | "transfer";
  label: string;
  value: string;
}

export interface Villa {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  shortDescription: string;
  description: string;
  image: string;
  gallery: string[];
  specs: {
    size: string;
    occupancy: string;
    bed: string;
    view: string;
  };
  amenities: string[];
  features: VillaFeature[];
  highlightBadge?: string;
}

export const villasData: Villa[] = [
  {
    id: "deluxe-double-lake-view",
    name: "Deluxe Double Room (Lake & Garden View)",
    slug: "deluxe-double-lake-view",
    tagline: "Comfortable homestay room with outdoor & lake views",
    highlightBadge: "Popular Choice",
    shortDescription:
      "A bright and airy room equipped with air conditioning, comfortable queen bed, en-suite bathroom, free Wi-Fi, and tranquil outdoor garden and lake views.",
    description:
      "Our Deluxe Double Room offers a restful retreat after an exhilarating safari day in Yala National Park. Enjoy cooling air conditioning, high-speed free Wi-Fi, clean linens, an attached private bathroom with hot water, and a peaceful verandah sitting area looking out over our garden and the Tissa landscape.",
    image: "/images/img2.jpg",
    gallery: ["/images/img2.jpg", "/images/im 3.png", "/images/tissa-lake-sunrise.jpg"],
    specs: {
      size: "24 m² (258 sq ft)",
      occupancy: "Up to 2 guests",
      bed: "1 Large Double Bed",
      view: "Garden & Lake / Outdoor View",
    },
    amenities: [
      "Free High-Speed Wi-Fi",
      "Air Conditioning & Ceiling Fan",
      "Private En-Suite Bathroom with Hot Water",
      "Daily Room Cleaning & Fresh Linens",
      "Daily Breakfast (Continental, English, or Sri Lankan)",
      "Free Private Parking on Premises",
    ],
    features: [
      { icon: "bed", label: "Bed Setup", value: "1 Double Bed" },
      { icon: "guests", label: "Occupancy", value: "2 Guests" },
      { icon: "ac", label: "Climate", value: "A/C & Fan" },
      { icon: "wifi", label: "Internet", value: "Free Wi-Fi" },
      { icon: "view", label: "View", value: "Garden & Outdoor View" },
      { icon: "bath", label: "Bathroom", value: "Private Bathroom" },
      { icon: "dining", label: "Breakfast", value: "Daily Breakfast Available" },
      { icon: "transfer", label: "Transport", value: "Safari & Shuttle Service" },
      { icon: "size", label: "Room Size", value: "24 m²" },
      { icon: "butler", label: "Service", value: "Host Assistance & Luggage" },
    ],
  },
  {
    id: "standard-double-room",
    name: "Standard Double Room",
    slug: "standard-double-room",
    tagline: "Affordable and cozy budget homestay accommodation",
    highlightBadge: "Best Value",
    shortDescription:
      "A budget-friendly room ideal for travelers and backpackers seeking clean, comfortable lodging close to Yala safari starting points.",
    description:
      "Featuring essential comforts for value-conscious visitors, the Standard Double Room includes a double bed, mosquito net, private attached bathroom, work desk, and access to the shared garden terrace. Perfectly positioned for early morning departures to Yala National Park.",
    image: "/images/img1.jpg",
    gallery: ["/images/img1.jpg", "/images/im 4.png", "/images/im 6.png"],
    specs: {
      size: "20 m² (215 sq ft)",
      occupancy: "Up to 2 guests",
      bed: "1 Double Bed",
      view: "Courtyard & Garden View",
    },
    amenities: [
      "Free Wi-Fi Access",
      "Private Attached Bathroom",
      "Free On-Site Private Parking",
      "Daily Housekeeping",
      "Bicycle and Car Rental Assistance",
      "Breakfast Available on Request",
    ],
    features: [
      { icon: "bed", label: "Bed Setup", value: "1 Double Bed" },
      { icon: "guests", label: "Occupancy", value: "2 Guests" },
      { icon: "ac", label: "Climate", value: "Cooling Fan / A/C" },
      { icon: "wifi", label: "Internet", value: "Free Wi-Fi" },
      { icon: "view", label: "View", value: "Garden Courtyard" },
      { icon: "bath", label: "Bathroom", value: "Private Bathroom" },
      { icon: "dining", label: "Breakfast", value: "Breakfast Options" },
      { icon: "transfer", label: "Transport", value: "Car & Bike Rental" },
      { icon: "size", label: "Room Size", value: "20 m²" },
      { icon: "butler", label: "Reception", value: "Friendly Local Host" },
    ],
  },
  {
    id: "triple-room-garden-view",
    name: "Triple Room (Garden View)",
    slug: "triple-room-garden-view",
    tagline: "Spacious triple room for small families or friends",
    highlightBadge: "Great for Groups",
    shortDescription:
      "Designed with 1 double bed and 1 single bed, accommodating up to 3 guests comfortably with garden access and free Wi-Fi.",
    description:
      "An affordable room configuration tailored for small groups or families traveling together. Located ground-level with convenient access to the garden and parking. Includes private bathroom facilities, air conditioning, and room to store safari gear and luggage.",
    image: "/images/img3.jpg",
    gallery: ["/images/img3.jpg", "/images/im 5.png", "/images/hero 4.jpeg"],
    specs: {
      size: "28 m² (301 sq ft)",
      occupancy: "Up to 3 guests",
      bed: "1 Double Bed + 1 Single Bed",
      view: "Garden & Outdoor Area",
    },
    amenities: [
      "Free Wi-Fi",
      "Air Conditioning",
      "Private Bathroom with Hot Shower",
      "Luggage Storage & Daily Cleaning",
      "Choice of Continental or Sri Lankan Breakfast",
      "Yala 4x4 Safari Jeep Tour Booking",
    ],
    features: [
      { icon: "bed", label: "Bed Setup", value: "1 Double + 1 Single" },
      { icon: "guests", label: "Occupancy", value: "Up to 3 Guests" },
      { icon: "ac", label: "Climate", value: "Air Conditioned" },
      { icon: "wifi", label: "Internet", value: "Free Wi-Fi" },
      { icon: "view", label: "View", value: "Garden View" },
      { icon: "bath", label: "Bathroom", value: "Private Bathroom" },
      { icon: "dining", label: "Breakfast", value: "Breakfast Available" },
      { icon: "transfer", label: "Safari", value: "Jeep Safari Booking" },
      { icon: "size", label: "Room Size", value: "28 m²" },
      { icon: "butler", label: "Service", value: "Luggage Storage" },
    ],
  },
  {
    id: "budget-family-room",
    name: "Budget Family Room",
    slug: "budget-family-room",
    tagline: "Economical family room for comfortable group stays",
    highlightBadge: "Family Friendly",
    shortDescription:
      "Accommodates up to 4 guests with multiple beds, air conditioning, private bathroom, and ample room for family luggage.",
    description:
      "Ideal for budget-conscious families visiting Tissamaharama's historical sites and Yala's wildlife sanctuaries. Provides plenty of space, complimentary Wi-Fi, safe on-site parking, and delicious home-cooked breakfasts to start your adventure.",
    image: "/images/im 10.png",
    gallery: ["/images/im 10.png", "/images/im 7.png", "/images/hero2.jpeg"],
    specs: {
      size: "34 m² (366 sq ft)",
      occupancy: "Up to 4 guests",
      bed: "2 Double Beds",
      view: "Garden & Mountain / Open View",
    },
    amenities: [
      "Free Wi-Fi & Private Parking",
      "Air Conditioning & Fan",
      "Private Attached Bathroom",
      "Airport Shuttle Service (Paid)",
      "Bicycle Rental & Safari Tour Arrangements",
      "Luggage Storage Facility",
    ],
    features: [
      { icon: "bed", label: "Bed Setup", value: "2 Double Beds" },
      { icon: "guests", label: "Occupancy", value: "Up to 4 Guests" },
      { icon: "ac", label: "Climate", value: "A/C & Fan" },
      { icon: "wifi", label: "Internet", value: "Free Wi-Fi" },
      { icon: "view", label: "View", value: "Open Garden View" },
      { icon: "bath", label: "Bathroom", value: "Private Bathroom" },
      { icon: "dining", label: "Breakfast", value: "Home Breakfast" },
      { icon: "transfer", label: "Shuttle", value: "Airport Shuttle" },
      { icon: "size", label: "Room Size", value: "34 m²" },
      { icon: "butler", label: "Cleaning", value: "Daily Housekeeping" },
    ],
  },
];
