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

const SiteContentSchema = new Schema<ISiteContent>(
  {
    resortName: { type: String, default: "Sri Shahrukh Lake Resort" },
    tagline: { type: String, default: "Homestay in Tissamaharama" },
    phone: { type: String, default: "077 621 9245" },
    whatsapp: { type: String, default: "0757273416" },
    email: { type: String, default: "lakeresortsrishahrukh@gmail.com" },
    address: { type: String, default: "135/1 Suduwella Tikiri Udanapura, Tissamaharama" },
    mapUrl: { type: String, default: "https://maps.google.com/maps?q=77VQ%2BX6+Tissamaharama" },
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
  },
  { timestamps: true }
);

export const SiteContent: Model<ISiteContent> =
  mongoose.models.SiteContent || mongoose.model<ISiteContent>("SiteContent", SiteContentSchema);
