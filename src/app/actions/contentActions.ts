"use server";

import { connectToDatabase } from "@/lib/mongodb";
import { SiteContent, type ISiteContent, type IReview, type IAmenity } from "@/models/SiteContent";
import { revalidatePath } from "next/cache";

export interface SerializedSiteContent {
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
}

export async function getSiteContent(): Promise<SerializedSiteContent> {
  try {
    await connectToDatabase();

    let doc = await SiteContent.findOne().lean();

    if (!doc) {
      const created = await SiteContent.create({});
      doc = created.toObject();
    }

    return {
      resortName: doc.resortName,
      tagline: doc.tagline,
      phone: doc.phone,
      whatsapp: doc.whatsapp,
      email: doc.email,
      address: doc.address,
      mapUrl: doc.mapUrl,
      ratingScore: doc.ratingScore,
      ratingLabel: doc.ratingLabel,
      heroTitle: doc.heroTitle,
      heroSubtitle: doc.heroSubtitle,
      aboutStory: doc.aboutStory,
      homestayTitle: doc.homestayTitle,
      homestayDescription: doc.homestayDescription,
      amenities: (doc.amenities || []).map((a: IAmenity) => ({
        title: a.title,
        desc: a.desc,
        icon: a.icon,
      })),
      reviews: (doc.reviews || []).map((r: IReview, idx: number) => ({
        id: r._id ? r._id.toString() : String(idx),
        name: r.name,
        location: r.location,
        flag: r.flag || "🇱🇰",
        rating: r.rating || 4.8,
        quote: r.quote,
        date: r.date || "Verified Review",
      })),
    };
  } catch (err: unknown) {
    console.error("[Get Site Content Error]", err);
    // Fallback defaults
    return {
      resortName: "Sri Shahrukh Lake Resort",
      tagline: "Homestay in Tissamaharama",
      phone: "077 621 9245",
      whatsapp: "0757273416",
      email: "lakeresortsrishahrukh@gmail.com",
      address: "135/1 Suduwella Tikiri Udanapura, Tissamaharama",
      mapUrl: "https://maps.google.com/maps?q=77VQ%2BX6+Tissamaharama",
      ratingScore: "4.8",
      ratingLabel: "Rating Across All Platforms",
      heroTitle: "Sri Shahrukh Lake Resort",
      heroSubtitle:
        "A peaceful, friendly homestay in Tissamaharama. Enjoy clean comfortable rooms, tranquil garden views, free Wi-Fi, free private parking, fresh daily breakfast, and Yala safari tour arrangements.",
      aboutStory:
        "Sri Shahrukh Lake Resort is a peaceful homestay located at 135/1 Suduwella Tikiri Udanapura in Tissamaharama. We offer a quiet and relaxing stay where every guest receives friendly personal care and warm Sri Lankan hospitality. Our story began in 2004, when our founder Geeth met Bollywood film star Shah Rukh Khan during his visit to Sri Lanka. Inspired by his kindness and warmth, Geeth named this homestay in his honor, welcoming travelers from all over the world.",
      homestayTitle: "Comfortable Living, Quiet Homestay Accommodation",
      homestayDescription:
        "Sri Shahrukh Lake Resort welcomes you with peaceful garden surroundings, clean and comfortable rooms, and warm Sri Lankan hospitality right here in Tissamaharama.",
      amenities: [
        { title: "Air Conditioning", desc: "Cool air conditioning and ceiling fans for restful sleep", icon: "Wind" },
        { title: "Hot Water Bathrooms", desc: "Private attached bathrooms with continuous hot water", icon: "Droplets" },
        { title: "Free High-Speed Wi-Fi", desc: "Fast internet access throughout the property", icon: "Wifi" },
        { title: "Fresh Breakfast", desc: "Daily Sri Lankan or continental breakfast prepared fresh", icon: "Coffee" },
        { title: "Garden & Verandah", desc: "Tranquil outdoor sitting areas with natural green views", icon: "TreePine" },
        { title: "Free Private Parking", desc: "Safe on-site vehicle parking for all guests", icon: "Car" },
        { title: "Safari Assistance", desc: "4x4 Jeep tour arrangements for Yala and Bundala parks", icon: "Compass" },
        { title: "Personal Host Care", desc: "Warm hospitality and attentive assistance from host Geeth", icon: "Sparkles" },
      ],
      reviews: [
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
    };
  }
}

export async function updateSiteContent(updates: Partial<SerializedSiteContent>) {
  try {
    await connectToDatabase();

    let doc = await SiteContent.findOne();
    if (!doc) {
      doc = new SiteContent({});
    }

    Object.assign(doc, updates);
    await doc.save();

    revalidatePath("/");
    revalidatePath("/book");
    revalidatePath("/admin");

    return { success: true };
  } catch (err: unknown) {
    const error = err as Error;
    console.error("[Update Site Content Error]", error);
    return { success: false, error: error.message || "Failed to update content" };
  }
}

export async function addReview(review: Omit<IReview, "id">) {
  try {
    await connectToDatabase();

    let doc = await SiteContent.findOne();
    if (!doc) {
      doc = new SiteContent({});
    }

    doc.reviews.unshift(review);
    await doc.save();

    revalidatePath("/");
    revalidatePath("/admin");

    return { success: true };
  } catch (err: unknown) {
    const error = err as Error;
    console.error("[Add Review Error]", error);
    return { success: false, error: error.message || "Failed to add review" };
  }
}

export async function deleteReview(index: number) {
  try {
    await connectToDatabase();

    const doc = await SiteContent.findOne();
    if (!doc) return { success: false, error: "Content not found" };

    if (index >= 0 && index < doc.reviews.length) {
      doc.reviews.splice(index, 1);
      await doc.save();
      revalidatePath("/");
      revalidatePath("/admin");
      return { success: true };
    }

    return { success: false, error: "Invalid review index" };
  } catch (err: unknown) {
    const error = err as Error;
    console.error("[Delete Review Error]", error);
    return { success: false, error: error.message || "Failed to delete review" };
  }
}

export async function addAmenity(amenity: IAmenity) {
  try {
    await connectToDatabase();

    let doc = await SiteContent.findOne();
    if (!doc) {
      doc = new SiteContent({});
    }

    doc.amenities.push(amenity);
    await doc.save();

    revalidatePath("/");
    revalidatePath("/admin");

    return { success: true };
  } catch (err: unknown) {
    const error = err as Error;
    console.error("[Add Amenity Error]", error);
    return { success: false, error: error.message || "Failed to add amenity" };
  }
}

export async function deleteAmenity(index: number) {
  try {
    await connectToDatabase();

    const doc = await SiteContent.findOne();
    if (!doc) return { success: false, error: "Content not found" };

    if (index >= 0 && index < doc.amenities.length) {
      doc.amenities.splice(index, 1);
      await doc.save();
      revalidatePath("/");
      revalidatePath("/admin");
      return { success: true };
    }

    return { success: false, error: "Invalid amenity index" };
  } catch (err: unknown) {
    const error = err as Error;
    console.error("[Delete Amenity Error]", error);
    return { success: false, error: error.message || "Failed to delete amenity" };
  }
}
