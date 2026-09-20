export interface GalleryImage {
  src: string;
  alt: string;
  category: string;
}

export const defaultGalleryImages: GalleryImage[] = [
  {
    src: "https://res.cloudinary.com/znj9faa6/image/upload/v1789894680/srishahrukh/img1.jpg",
    alt: "Peaceful homestay exterior and garden grounds in Tissamaharama",
    category: "The Homestay",
  },
  {
    src: "https://res.cloudinary.com/znj9faa6/image/upload/v1789894691/srishahrukh/img2.jpg",
    alt: "Comfortable bedroom with clean linens and garden view",
    category: "The Homestay",
  },
  {
    src: "https://res.cloudinary.com/znj9faa6/image/upload/v1789894717/srishahrukh/tissa-lake-sunrise.jpg",
    alt: "Tissa Wewa reservoir at dawn with morning mist and lotus blossoms",
    category: "Lake & Nature",
  },
  {
    src: "https://res.cloudinary.com/znj9faa6/image/upload/v1789894726/srishahrukh/yala-leopard.jpg",
    alt: "Sri Lankan leopard basking on granite outcrop in Yala National Park",
    category: "Wildlife & Heritage",
  },
  {
    src: "https://res.cloudinary.com/znj9faa6/image/upload/v1789894722/srishahrukh/tissamaharama-stupa.jpg",
    alt: "Ancient white stupa of Tissamaharama Raja Maha Vihara against sunset",
    category: "Wildlife & Heritage",
  },
  {
    src: "https://res.cloudinary.com/znj9faa6/image/upload/v1789894702/srishahrukh/img3.jpg",
    alt: "Garden terrace and peaceful sitting area",
    category: "The Homestay",
  },
  {
    src: "https://res.cloudinary.com/znj9faa6/image/upload/v1789894657/srishahrukh/im_10.png",
    alt: "Homestay grounds at sunset with tropical greenery",
    category: "The Homestay",
  },
  {
    src: "https://res.cloudinary.com/znj9faa6/image/upload/v1789894641/srishahrukh/bundala-flamingos.jpg",
    alt: "Greater Flamingos wading in Bundala UNESCO Ramsar wetland",
    category: "Wildlife & Heritage",
  },
  {
    src: "https://res.cloudinary.com/znj9faa6/image/upload/v1789894706/srishahrukh/kataragama-temple.jpg",
    alt: "Sacred evening puja ceremony with clay oil lamps at Kataragama",
    category: "Wildlife & Heritage",
  },
  {
    src: "https://res.cloudinary.com/znj9faa6/image/upload/v1789894710/srishahrukh/kirinda-temple.jpg",
    alt: "Kirinda cliff temple above crashing southern Indian Ocean waves",
    category: "Wildlife & Heritage",
  },
  {
    src: "https://res.cloudinary.com/znj9faa6/image/upload/v1789894668/srishahrukh/im_7.png",
    alt: "Fresh home-cooked Sri Lankan breakfast with fresh fruits and Ceylon tea",
    category: "Homestay Life",
  },
  {
    src: "https://res.cloudinary.com/znj9faa6/image/upload/v1789894645/srishahrukh/hero1.jpg",
    alt: "Untamed wilderness of Ruhuna dry-zone forest and granite hills near Yala",
    category: "Lake & Nature",
  },
  {
    src: "https://res.cloudinary.com/znj9faa6/image/upload/v1789894664/srishahrukh/im_5.png",
    alt: "Garden relaxation area overlooking tropical flora",
    category: "Homestay Life",
  },
  {
    src: "https://res.cloudinary.com/znj9faa6/image/upload/v1789894662/srishahrukh/im_4.png",
    alt: "Clean, comfortable room setting with air conditioning",
    category: "The Homestay",
  },
  {
    src: "https://res.cloudinary.com/znj9faa6/image/upload/v1789894660/srishahrukh/im_3.png",
    alt: "Attached private bathroom with hot water shower",
    category: "The Homestay",
  },
  {
    src: "https://res.cloudinary.com/znj9faa6/image/upload/v1789894643/srishahrukh/hero_4.jpg",
    alt: "Homestay entrance surrounded by tropical palms and lush vegetation",
    category: "Homestay Life",
  },
];

export const galleryCategories = [
  "All Views",
  "The Homestay",
  "Lake & Nature",
  "Wildlife & Heritage",
  "Homestay Life",
] as const;
