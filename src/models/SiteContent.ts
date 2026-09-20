import mongoose, { Schema, Document, Model } from "mongoose";

export interface IReview {
  id?: string;
  _id?: any;
  name: string;
  location: string;
  flag: string;
  rating: number;
  quote: string;
  date: string;
}

export interface IAmenity {
  _id?: any;
  title: string;
  desc: string;
  icon: string;
}

export interface IHeroSlide {
  _id?: any;
  src: string;
  alt: string;
  caption?: string;
}

export interface IAboutImage {
  src: string;
  alt: string;
  caption?: string;
  subCaption?: string;
}

export interface IHomestayImage {
  _id?: any;
  src: string;
  title: string;
}

export interface IGalleryImage {
  _id?: any;
  src: string;
  alt: string;
  category: string;
}

export interface IExploreImage {
  _id?: any;
  id: string;
  name: string;
  src: string;
}

export interface ISiteContent extends Document {
  resortName: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  mapUrl: string;
  ratingScore: string;
  ratingLabel: string;
  heroTitle: string;
  heroSubtitle: string;
  aboutStory: string;
  homestayTitle: string;
  homestayDescription: string;
  amenities: IAmenity[];
  reviews: IReview[];
  heroImages: IHeroSlide[];
  aboutImage: IAboutImage;
  homestayImages: IHomestayImage[];
  galleryImages: IGalleryImage[];
  exploreImages: IExploreImage[];
  facebookUrl?: string;
  instagramUrl?: string;
  tiktokUrl?: string;
  youtubeUrl?: string;
  updatedAt: Date;
}

const ReviewSubSchema = new Schema<IReview>({
  name: { type: String, required: true },
  location: { type: String, required: true },
  flag: { type: String, default: "🇱🇰" },
  rating: { type: Number, default: 4.8 },
  quote: { type: String, required: true },
  date: { type: String, default: "Verified Review" },
});

const AmenitySubSchema = new Schema<IAmenity>({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  icon: { type: String, default: "Sparkles" },
});

const HeroSlideSubSchema = new Schema<IHeroSlide>({
  src: { type: String, required: true },
  alt: { type: String, required: true },
  caption: { type: String },
});

const AboutImageSubSchema = new Schema<IAboutImage>(
  {
    src: { type: String, default: "https://res.cloudinary.com/znj9faa6/image/upload/v1789894712/srishahrukh/owner-srk.jpg" },
    alt: { type: String, default: "Founder Geeth with Bollywood actor Shah Rukh Khan in Sri Lanka" },
    caption: { type: String, default: "Founder Geeth with Shah Rukh Khan · 2004" },
    subCaption: {
      type: String,
      default: "The encounter that inspired our homestay name: Sri Shahrukh Lake Resort.",
    },
  },
  { _id: false }
);

const HomestayImageSubSchema = new Schema<IHomestayImage>({
  src: { type: String, required: true },
  title: { type: String, required: true },
});

const GalleryImageSubSchema = new Schema<IGalleryImage>({
  src: { type: String, required: true },
  alt: { type: String, required: true },
  category: { type: String, required: true },
});

const ExploreImageSubSchema = new Schema<IExploreImage>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  src: { type: String, required: true },
});

const SiteContentSchema = new Schema<ISiteContent>(
  {
    resortName: { type: String, default: "Sri Shahrukh Lake Resort" },
    tagline: { type: String, default: "Homestay in Tissamaharama" },
    phone: { type: String, default: "077 621 9245" },
    whatsapp: { type: String, default: "0757273416" },
    email: { type: String, default: "lakeresortsrishahrukh@gmail.com" },
    address: { type: String, default: "135/1 Suduwella Tikiri Udanapura, Tissamaharama" },
    mapUrl: { type: String, default: "https://maps.google.com/maps?q=77VQ%2BX6+Tissamaharama" },
    facebookUrl: { type: String, default: "https://www.facebook.com" },
    instagramUrl: { type: String, default: "https://www.instagram.com" },
    tiktokUrl: { type: String, default: "https://www.tiktok.com" },
    youtubeUrl: { type: String, default: "" },
    ratingScore: { type: String, default: "4.8" },
    ratingLabel: { type: String, default: "Rating Across All Platforms" },
    heroTitle: { type: String, default: "Sri Shahrukh Lake Resort" },
    heroSubtitle: {
      type: String,
      default:
        "A peaceful, friendly homestay in Tissamaharama. Enjoy clean comfortable rooms, tranquil garden views, free Wi-Fi, free private parking, fresh daily breakfast, and Yala safari tour arrangements.",
    },
    aboutStory: {
      type: String,
      default:
        "Sri Shahrukh Lake Resort is a peaceful homestay located at 135/1 Suduwella Tikiri Udanapura in Tissamaharama. We offer a quiet and relaxing stay where every guest receives friendly personal care and warm Sri Lankan hospitality. Our story began in 2004, when our founder Geeth met Bollywood film star Shah Rukh Khan during his visit to Sri Lanka. Inspired by his kindness and warmth, Geeth named this homestay in his honor, welcoming travelers from all over the world.",
    },
    homestayTitle: { type: String, default: "Comfortable Living, Quiet Homestay Accommodation" },
    homestayDescription: {
      type: String,
      default:
        "Sri Shahrukh Lake Resort welcomes you with peaceful garden surroundings, clean and comfortable rooms, and warm Sri Lankan hospitality right here in Tissamaharama.",
    },
    amenities: {
      type: [AmenitySubSchema],
      default: [
        { title: "Air Conditioning", desc: "Cool air conditioning and ceiling fans for restful sleep", icon: "Wind" },
        { title: "Hot Water Bathrooms", desc: "Private attached bathrooms with continuous hot water", icon: "Droplets" },
        { title: "Free High-Speed Wi-Fi", desc: "Fast internet access throughout the property", icon: "Wifi" },
        { title: "Fresh Breakfast", desc: "Daily Sri Lankan or continental breakfast prepared fresh", icon: "Coffee" },
        { title: "Garden & Verandah", desc: "Tranquil outdoor sitting areas with natural green views", icon: "TreePine" },
        { title: "Free Private Parking", desc: "Safe on-site vehicle parking for all guests", icon: "Car" },
        { title: "Safari Assistance", desc: "4x4 Jeep tour arrangements for Yala and Bundala parks", icon: "Compass" },
        { title: "Personal Host Care", desc: "Warm hospitality and attentive assistance from host Geeth", icon: "Sparkles" },
      ],
    },
    reviews: {
      type: [ReviewSubSchema],
      default: [
        {
          name: "Alex M.",
          location: "United Kingdom",
          flag: "🇬🇧",
          rating: 4.8,
          quote:
            "A wonderfully peaceful stay near Yala National Park. The host Geeth provided kind and attentive hospitality. Clean room with cold air conditioning, quiet garden views, and a delicious breakfast before our morning safari.",
          date: "Verified Review",
        },
        {
          name: "Elena S.",
          location: "Germany",
          flag: "🇩🇪",
          rating: 5.0,
          quote:
            "Such a lovely, relaxing homestay! It's just a 5-minute drive to Tissa Wewa lake. The home-cooked breakfast was fresh and tasty, and Geeth made sure our safari jeep was on time.",
          date: "Verified Review",
        },
        {
          name: "Thomas & Laura",
          location: "Netherlands",
          flag: "🇳🇱",
          rating: 4.8,
          quote:
            "One of the best homestay experiences in Southern Sri Lanka. Very clean room, safe private parking, fast Wi-Fi, and friendly care from the host family.",
          date: "Verified Review",
        },
        {
          name: "Rohan K.",
          location: "India",
          flag: "🇮🇳",
          rating: 4.9,
          quote:
            "Sri Shahrukh Lake Resort is an absolute gem. Beautiful garden surroundings, great A/C, kind hospitality, and smooth safari arrangements. Highly recommended!",
          date: "Verified Review",
        },
      ],
    },
    heroImages: {
      type: [HeroSlideSubSchema],
      default: [
        {
          src: "https://res.cloudinary.com/znj9faa6/image/upload/v1789894645/srishahrukh/hero1.jpg",
          alt: "Yala National Park wildlife safari — leopard habitat near Tissamaharama",
          caption: "Yala Safari Gateway · Affordable 4x4 Tours Arranged",
        },
        {
          src: "https://res.cloudinary.com/znj9faa6/image/upload/v1789894647/srishahrukh/hero2.jpg",
          alt: "Sacred Kataragama Devalaya evening ceremonies near Tissamaharama",
          caption: "Kataragama Pilgrimage Sanctuary · 21 km Away",
        },
        {
          src: "https://res.cloudinary.com/znj9faa6/image/upload/v1789894722/srishahrukh/tissamaharama-stupa.jpg",
          alt: "Tissamaharama Raja Maha Vihara stupa located 2.2 km from the property",
          caption: "Tissamaharama Stupa · 2.2 km from Homestay",
        },
      ],
    },
    aboutImage: {
      type: AboutImageSubSchema,
      default: () => ({
        src: "https://res.cloudinary.com/znj9faa6/image/upload/v1789894712/srishahrukh/owner-srk.jpg",
        alt: "Founder Geeth with Bollywood actor Shah Rukh Khan in Sri Lanka",
        caption: "Founder Geeth with Shah Rukh Khan · 2004",
        subCaption: "The encounter that inspired our homestay name: Sri Shahrukh Lake Resort.",
      }),
    },
    homestayImages: {
      type: [HomestayImageSubSchema],
      default: [
        { src: "https://res.cloudinary.com/znj9faa6/image/upload/v1789894680/srishahrukh/img1.jpg", title: "Homestay Exterior & Lush Garden" },
        { src: "https://res.cloudinary.com/znj9faa6/image/upload/v1789894691/srishahrukh/img2.jpg", title: "Comfortable Queen Bed Setting" },
        { src: "https://res.cloudinary.com/znj9faa6/image/upload/v1789894702/srishahrukh/img3.jpg", title: "Garden Verandah & Terrace" },
        { src: "https://res.cloudinary.com/znj9faa6/image/upload/v1789894662/srishahrukh/im_4.png", title: "Clean Room Setting" },
        { src: "https://res.cloudinary.com/znj9faa6/image/upload/v1789894660/srishahrukh/im_3.png", title: "Private Bathroom with Hot Shower" },
      ],
    },
    galleryImages: {
      type: [GalleryImageSubSchema],
      default: [
        { src: "https://res.cloudinary.com/znj9faa6/image/upload/v1789894680/srishahrukh/img1.jpg", alt: "Peaceful homestay exterior and garden grounds", category: "The Homestay" },
        { src: "https://res.cloudinary.com/znj9faa6/image/upload/v1789894691/srishahrukh/img2.jpg", alt: "Comfortable bedroom with clean linens", category: "The Homestay" },
        { src: "https://res.cloudinary.com/znj9faa6/image/upload/v1789894717/srishahrukh/tissa-lake-sunrise.jpg", alt: "Tissa Wewa reservoir at dawn with morning mist and lotus blossoms", category: "Lake & Nature" },
        { src: "https://res.cloudinary.com/znj9faa6/image/upload/v1789894726/srishahrukh/yala-leopard.jpg", alt: "Sri Lankan leopard basking on granite outcrop in Yala National Park", category: "Wildlife & Heritage" },
        { src: "https://res.cloudinary.com/znj9faa6/image/upload/v1789894722/srishahrukh/tissamaharama-stupa.jpg", alt: "Ancient white stupa of Tissamaharama Raja Maha Vihara against sunset", category: "Wildlife & Heritage" },
        { src: "https://res.cloudinary.com/znj9faa6/image/upload/v1789894702/srishahrukh/img3.jpg", alt: "Garden terrace and peaceful sitting area", category: "The Homestay" },
        { src: "https://res.cloudinary.com/znj9faa6/image/upload/v1789894657/srishahrukh/im_10.png", alt: "Homestay grounds at sunset", category: "The Homestay" },
        { src: "https://res.cloudinary.com/znj9faa6/image/upload/v1789894641/srishahrukh/bundala-flamingos.jpg", alt: "Greater Flamingos wading in Bundala UNESCO Ramsar wetland", category: "Wildlife & Heritage" },
        { src: "https://res.cloudinary.com/znj9faa6/image/upload/v1789894706/srishahrukh/kataragama-temple.jpg", alt: "Sacred evening puja ceremony with clay oil lamps at Kataragama", category: "Wildlife & Heritage" },
        { src: "https://res.cloudinary.com/znj9faa6/image/upload/v1789894710/srishahrukh/kirinda-temple.jpg", alt: "Kirinda cliff temple above crashing southern Indian Ocean waves", category: "Wildlife & Heritage" },
        { src: "https://res.cloudinary.com/znj9faa6/image/upload/v1789894668/srishahrukh/im_7.png", alt: "Fresh home-cooked Sri Lankan breakfast", category: "Homestay Life" },
        { src: "https://res.cloudinary.com/znj9faa6/image/upload/v1789894645/srishahrukh/hero1.jpg", alt: "Untamed wilderness of Ruhuna dry-zone forest and granite hills", category: "Lake & Nature" },
        { src: "https://res.cloudinary.com/znj9faa6/image/upload/v1789894664/srishahrukh/im_5.png", alt: "Garden relaxation area overlooking tropical greenery", category: "Homestay Life" },
        { src: "https://res.cloudinary.com/znj9faa6/image/upload/v1789894662/srishahrukh/im_4.png", alt: "Clean, comfortable room setting", category: "The Homestay" },
        { src: "https://res.cloudinary.com/znj9faa6/image/upload/v1789894660/srishahrukh/im_3.png", alt: "Attached private bathroom with hot water shower", category: "The Homestay" },
        { src: "https://res.cloudinary.com/znj9faa6/image/upload/v1789894643/srishahrukh/hero_4.jpg", alt: "Homestay entrance surrounded by tropical palms", category: "Homestay Life" },
      ],
    },
    exploreImages: {
      type: [ExploreImageSubSchema],
      default: [
        { id: "tissa-lake", name: "Tissa Wewa Lake", src: "https://res.cloudinary.com/znj9faa6/image/upload/v1789894717/srishahrukh/tissa-lake-sunrise.jpg" },
        { id: "tissamaharama-dagoba", name: "Tissamaharama Stupa", src: "https://res.cloudinary.com/znj9faa6/image/upload/v1789894722/srishahrukh/tissamaharama-stupa.jpg" },
        { id: "yala-national-park", name: "Yala National Park Safari", src: "https://res.cloudinary.com/znj9faa6/image/upload/v1789894726/srishahrukh/yala-leopard.jpg" },
        { id: "ranminitenna", name: "Ranminitenna Cinema Village", src: "https://res.cloudinary.com/znj9faa6/image/upload/v1789894647/srishahrukh/hero2.jpg" },
        { id: "kirinda-beach", name: "Kirinda Beach & Temple", src: "https://res.cloudinary.com/znj9faa6/image/upload/v1789894710/srishahrukh/kirinda-temple.jpg" },
        { id: "bundala-national-park", name: "Bundala Ramsar Wetland", src: "https://res.cloudinary.com/znj9faa6/image/upload/v1789894641/srishahrukh/bundala-flamingos.jpg" },
      ],
    },
  },
  { timestamps: true }
);

export const SiteContent: Model<ISiteContent> =
  mongoose.models.SiteContent || mongoose.model<ISiteContent>("SiteContent", SiteContentSchema);
