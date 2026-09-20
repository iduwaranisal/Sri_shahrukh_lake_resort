"use server";

import { connectToDatabase } from "@/lib/mongodb";
import {
  SiteContent,
  type ISiteContent,
  type IReview,
  type IAmenity,
  type IHeroSlide,
  type IAboutImage,
  type IHomestayImage,
  type IGalleryImage,
  type IExploreImage,
} from "@/models/SiteContent";
import { uploadImageToCloudinary } from "@/lib/cloudinary";
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
  heroImages: IHeroSlide[];
  aboutImage: IAboutImage;
  homestayImages: IHomestayImage[];
  galleryImages: IGalleryImage[];
  exploreImages: IExploreImage[];
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
      heroImages: (doc.heroImages && doc.heroImages.length > 0)
        ? doc.heroImages.map((h: IHeroSlide) => ({
            src: h.src,
            alt: h.alt,
            caption: h.caption || "",
          }))
        : [
            {
              src: "/images/hero1.jpeg",
              alt: "Yala National Park wildlife safari — leopard habitat near Tissamaharama",
              caption: "Yala Safari Gateway · Affordable 4x4 Tours Arranged",
            },
            {
              src: "/images/hero2.jpeg",
              alt: "Sacred Kataragama Devalaya evening ceremonies near Tissamaharama",
              caption: "Kataragama Pilgrimage Sanctuary · 21 km Away",
            },
            {
              src: "/images/tissamaharama-stupa.jpg",
              alt: "Tissamaharama Raja Maha Vihara stupa located 2.2 km from the property",
              caption: "Tissamaharama Stupa · 2.2 km from Homestay",
            },
          ],
      aboutImage: doc.aboutImage?.src
        ? {
            src: doc.aboutImage.src,
            alt: doc.aboutImage.alt || "Founder Geeth with Shah Rukh Khan",
            caption: doc.aboutImage.caption || "Founder Geeth with Shah Rukh Khan · 2004",
            subCaption:
              doc.aboutImage.subCaption ||
              "The encounter that inspired our homestay name: Sri Shahrukh Lake Resort.",
          }
        : {
            src: "/images/owner-srk.jpg",
            alt: "Founder Geeth with Bollywood actor Shah Rukh Khan in Sri Lanka",
            caption: "Founder Geeth with Shah Rukh Khan · 2004",
            subCaption:
              "The encounter that inspired our homestay name: Sri Shahrukh Lake Resort.",
          },
      homestayImages: (doc.homestayImages && doc.homestayImages.length > 0)
        ? doc.homestayImages.map((h: IHomestayImage) => ({
            src: h.src,
            title: h.title,
          }))
        : [
            { src: "/images/img1.jpg", title: "Homestay Exterior & Lush Garden" },
            { src: "/images/img2.jpg", title: "Comfortable Queen Bed Setting" },
            { src: "/images/img3.jpg", title: "Garden Verandah & Terrace" },
            { src: "/images/im 4.png", title: "Clean Room Setting" },
            { src: "/images/im 3.png", title: "Private Bathroom with Hot Shower" },
          ],
      galleryImages: (doc.galleryImages && doc.galleryImages.length > 0)
        ? doc.galleryImages.map((g: IGalleryImage) => ({
            src: g.src,
            alt: g.alt,
            category: g.category,
          }))
        : [
            { src: "/images/img1.jpg", alt: "Peaceful homestay exterior and garden grounds", category: "The Homestay" },
            { src: "/images/img2.jpg", alt: "Comfortable bedroom with clean linens", category: "The Homestay" },
            { src: "/images/tissa-lake-sunrise.jpg", alt: "Tissa Wewa reservoir at dawn with morning mist and lotus blossoms", category: "Lake & Nature" },
            { src: "/images/yala-leopard.jpg", alt: "Sri Lankan leopard basking on granite outcrop in Yala National Park", category: "Wildlife & Heritage" },
            { src: "/images/tissamaharama-stupa.jpg", alt: "Ancient white stupa of Tissamaharama Raja Maha Vihara against sunset", category: "Wildlife & Heritage" },
            { src: "/images/img3.jpg", alt: "Garden terrace and peaceful sitting area", category: "The Homestay" },
            { src: "/images/im 10.png", alt: "Homestay grounds at sunset", category: "The Homestay" },
            { src: "/images/bundala-flamingos.jpg", alt: "Greater Flamingos wading in Bundala UNESCO Ramsar wetland", category: "Wildlife & Heritage" },
            { src: "/images/kataragama-temple.jpg", alt: "Sacred evening puja ceremony with clay oil lamps at Kataragama", category: "Wildlife & Heritage" },
            { src: "/images/kirinda-temple.jpg", alt: "Kirinda cliff temple above crashing southern Indian Ocean waves", category: "Wildlife & Heritage" },
            { src: "/images/im 7.png", alt: "Fresh home-cooked Sri Lankan breakfast", category: "Homestay Life" },
            { src: "/images/hero1.jpeg", alt: "Untamed wilderness of Ruhuna dry-zone forest and granite hills", category: "Lake & Nature" },
            { src: "/images/im 5.png", alt: "Garden relaxation area overlooking tropical greenery", category: "Homestay Life" },
            { src: "/images/im 4.png", alt: "Clean, comfortable room setting", category: "The Homestay" },
            { src: "/images/im 3.png", alt: "Attached private bathroom with hot water shower", category: "The Homestay" },
            { src: "/images/hero 4.jpeg", alt: "Homestay entrance surrounded by tropical palms", category: "Homestay Life" },
          ],
      exploreImages: (doc.exploreImages && doc.exploreImages.length > 0)
        ? doc.exploreImages.map((e: IExploreImage) => ({
            id: e.id,
            name: e.name,
            src: e.src,
          }))
        : [
            { id: "tissa-lake", name: "Tissa Wewa Lake", src: "/images/tissa-lake-sunrise.jpg" },
            { id: "tissamaharama-dagoba", name: "Tissamaharama Stupa", src: "/images/tissamaharama-stupa.jpg" },
            { id: "yala-national-park", name: "Yala National Park Safari", src: "/images/yala-leopard.jpg" },
            { id: "ranminitenna", name: "Ranminitenna Cinema Village", src: "/images/hero2.jpeg" },
            { id: "kirinda-beach", name: "Kirinda Beach & Temple", src: "/images/kirinda-temple.jpg" },
            { id: "bundala-national-park", name: "Bundala Ramsar Wetland", src: "/images/bundala-flamingos.jpg" },
          ],
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
      heroImages: [
        {
          src: "/images/hero1.jpeg",
          alt: "Yala National Park wildlife safari — leopard habitat near Tissamaharama",
          caption: "Yala Safari Gateway · Affordable 4x4 Tours Arranged",
        },
        {
          src: "/images/hero2.jpeg",
          alt: "Sacred Kataragama Devalaya evening ceremonies near Tissamaharama",
          caption: "Kataragama Pilgrimage Sanctuary · 21 km Away",
        },
        {
          src: "/images/tissamaharama-stupa.jpg",
          alt: "Tissamaharama Raja Maha Vihara stupa located 2.2 km from the property",
          caption: "Tissamaharama Stupa · 2.2 km from Homestay",
        },
      ],
      aboutImage: {
        src: "/images/owner-srk.jpg",
        alt: "Founder Geeth with Bollywood actor Shah Rukh Khan in Sri Lanka",
        caption: "Founder Geeth with Shah Rukh Khan · 2004",
        subCaption: "The encounter that inspired our homestay name: Sri Shahrukh Lake Resort.",
      },
      homestayImages: [
        { src: "/images/img1.jpg", title: "Homestay Exterior & Lush Garden" },
        { src: "/images/img2.jpg", title: "Comfortable Queen Bed Setting" },
        { src: "/images/img3.jpg", title: "Garden Verandah & Terrace" },
        { src: "/images/im 4.png", title: "Clean Room Setting" },
        { src: "/images/im 3.png", title: "Private Bathroom with Hot Shower" },
      ],
      galleryImages: [
        { src: "/images/img1.jpg", alt: "Peaceful homestay exterior and garden grounds", category: "The Homestay" },
        { src: "/images/img2.jpg", alt: "Comfortable bedroom with clean linens", category: "The Homestay" },
        { src: "/images/tissa-lake-sunrise.jpg", alt: "Tissa Wewa reservoir at dawn with morning mist and lotus blossoms", category: "Lake & Nature" },
        { src: "/images/yala-leopard.jpg", alt: "Sri Lankan leopard basking on granite outcrop in Yala National Park", category: "Wildlife & Heritage" },
        { src: "/images/tissamaharama-stupa.jpg", alt: "Ancient white stupa of Tissamaharama Raja Maha Vihara against sunset", category: "Wildlife & Heritage" },
        { src: "/images/img3.jpg", alt: "Garden terrace and peaceful sitting area", category: "The Homestay" },
        { src: "/images/im 10.png", alt: "Homestay grounds at sunset", category: "The Homestay" },
        { src: "/images/bundala-flamingos.jpg", alt: "Greater Flamingos wading in Bundala UNESCO Ramsar wetland", category: "Wildlife & Heritage" },
        { src: "/images/kataragama-temple.jpg", alt: "Sacred evening puja ceremony with clay oil lamps at Kataragama", category: "Wildlife & Heritage" },
        { src: "/images/kirinda-temple.jpg", alt: "Kirinda cliff temple above crashing southern Indian Ocean waves", category: "Wildlife & Heritage" },
        { src: "/images/im 7.png", alt: "Fresh home-cooked Sri Lankan breakfast", category: "Homestay Life" },
        { src: "/images/hero1.jpeg", alt: "Untamed wilderness of Ruhuna dry-zone forest and granite hills", category: "Lake & Nature" },
        { src: "/images/im 5.png", alt: "Garden relaxation area overlooking tropical greenery", category: "Homestay Life" },
        { src: "/images/im 4.png", alt: "Clean, comfortable room setting", category: "The Homestay" },
        { src: "/images/im 3.png", alt: "Attached private bathroom with hot water shower", category: "The Homestay" },
        { src: "/images/hero 4.jpeg", alt: "Homestay entrance surrounded by tropical palms", category: "Homestay Life" },
      ],
      exploreImages: [
        { id: "tissa-lake", name: "Tissa Wewa Lake", src: "/images/tissa-lake-sunrise.jpg" },
        { id: "tissamaharama-dagoba", name: "Tissamaharama Stupa", src: "/images/tissamaharama-stupa.jpg" },
        { id: "yala-national-park", name: "Yala National Park Safari", src: "/images/yala-leopard.jpg" },
        { id: "ranminitenna", name: "Ranminitenna Cinema Village", src: "/images/hero2.jpeg" },
        { id: "kirinda-beach", name: "Kirinda Beach & Temple", src: "/images/kirinda-temple.jpg" },
        { id: "bundala-national-park", name: "Bundala Ramsar Wetland", src: "/images/bundala-flamingos.jpg" },
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

export async function uploadImageAction(base64Data: string, folder = "srishahrukh") {
  try {
    if (!base64Data) {
      return { success: false, error: "No image data provided" };
    }
    const res = await uploadImageToCloudinary(base64Data, folder);
    return { success: true, url: res.url, publicId: res.publicId };
  } catch (err: unknown) {
    const error = err as Error;
    console.error("[Upload Image Action Error]", error);
    return { success: false, error: error.message || "Failed to upload image to Cloudinary" };
  }
}

export async function updateHeroImages(heroImages: IHeroSlide[]) {
  try {
    await connectToDatabase();
    let doc = await SiteContent.findOne();
    if (!doc) doc = new SiteContent({});
    doc.heroImages = heroImages;
    await doc.save();
    revalidatePath("/");
    revalidatePath("/admin");
    return { success: true };
  } catch (err: unknown) {
    const error = err as Error;
    console.error("[Update Hero Images Error]", error);
    return { success: false, error: error.message || "Failed to update hero slides" };
  }
}

export async function updateAboutImage(aboutImage: IAboutImage) {
  try {
    await connectToDatabase();
    let doc = await SiteContent.findOne();
    if (!doc) doc = new SiteContent({});
    doc.aboutImage = aboutImage;
    await doc.save();
    revalidatePath("/");
    revalidatePath("/admin");
    return { success: true };
  } catch (err: unknown) {
    const error = err as Error;
    console.error("[Update About Image Error]", error);
    return { success: false, error: error.message || "Failed to update about image" };
  }
}

export async function updateHomestayImages(homestayImages: IHomestayImage[]) {
  try {
    await connectToDatabase();
    let doc = await SiteContent.findOne();
    if (!doc) doc = new SiteContent({});
    doc.homestayImages = homestayImages;
    await doc.save();
    revalidatePath("/");
    revalidatePath("/admin");
    return { success: true };
  } catch (err: unknown) {
    const error = err as Error;
    console.error("[Update Homestay Images Error]", error);
    return { success: false, error: error.message || "Failed to update homestay images" };
  }
}

export async function addGalleryImage(image: Omit<IGalleryImage, "_id">) {
  try {
    await connectToDatabase();
    let doc = await SiteContent.findOne();
    if (!doc) doc = new SiteContent({});
    doc.galleryImages.unshift(image);
    await doc.save();
    revalidatePath("/");
    revalidatePath("/admin");
    return { success: true };
  } catch (err: unknown) {
    const error = err as Error;
    console.error("[Add Gallery Image Error]", error);
    return { success: false, error: error.message || "Failed to add gallery image" };
  }
}

export async function deleteGalleryImage(index: number) {
  try {
    await connectToDatabase();
    const doc = await SiteContent.findOne();
    if (!doc) return { success: false, error: "Content not found" };

    if (index >= 0 && index < doc.galleryImages.length) {
      doc.galleryImages.splice(index, 1);
      await doc.save();
      revalidatePath("/");
      revalidatePath("/admin");
      return { success: true };
    }
    return { success: false, error: "Invalid gallery image index" };
  } catch (err: unknown) {
    const error = err as Error;
    console.error("[Delete Gallery Image Error]", error);
    return { success: false, error: error.message || "Failed to delete gallery image" };
  }
}

export async function updateExploreImage(id: string, src: string) {
  try {
    await connectToDatabase();
    let doc = await SiteContent.findOne();
    if (!doc) doc = new SiteContent({});

    const existingIdx = doc.exploreImages.findIndex((e) => e.id === id);
    if (existingIdx >= 0) {
      doc.exploreImages[existingIdx].src = src;
    } else {
      doc.exploreImages.push({ id, name: id, src });
    }

    await doc.save();
    revalidatePath("/");
    revalidatePath("/admin");
    return { success: true };
  } catch (err: unknown) {
    const error = err as Error;
    console.error("[Update Explore Image Error]", error);
    return { success: false, error: error.message || "Failed to update explore destination image" };
  }
}

