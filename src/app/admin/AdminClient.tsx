"use client";

import { useState, useEffect, useTransition } from "react";
import Link from "next/link";
import {
  Calendar,
  CheckCircle2,
  Clock,
  MessageCircle,
  Phone,
  Mail,
  User,
  Users,
  Search,
  Filter,
  Plus,
  Trash2,
  Check,
  X,
  ExternalLink,
  ShieldCheck,
  Key,
  LogOut,
  RefreshCw,
  Sparkles,
  AlertCircle,
  Edit3,
  Star,
  Settings,
  Globe,
  Home,
  FileText,
  Camera,
  Upload,
  Image as ImageIcon,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import {
  getBookings,
  updateBookingStatus,
  deleteBooking,
  createBooking,
  type SerializedBooking,
} from "@/app/actions/bookingActions";
import {
  getSiteContent,
  updateSiteContent,
  addReview,
  deleteReview,
  addAmenity,
  deleteAmenity,
  uploadImageAction,
  updateHeroImages,
  updateAboutImage,
  updateHomestayImages,
  addGalleryImage,
  deleteGalleryImage,
  updateExploreImage,
  type SerializedSiteContent,
} from "@/app/actions/contentActions";
import type {
  IHeroSlide,
  IAboutImage,
  IHomestayImage,
  IGalleryImage,
  IExploreImage,
} from "@/models/SiteContent";
import {
  loginAdmin,
  logoutAdmin,
  checkAdminAuth,
  changeAdminPassword,
} from "@/app/actions/adminAuthActions";

export default function AdminClient() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState<"bookings" | "content" | "media" | "reviews" | "amenities" | "security">("bookings");
  const [mediaSection, setMediaSection] = useState<"hero" | "about" | "homestay" | "gallery" | "explore">("hero");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadingTarget, setUploadingTarget] = useState<string | null>(null);

  // Gallery states
  const [galleryFilter, setGalleryFilter] = useState("All Views");
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [newGalleryImage, setNewGalleryImage] = useState({
    src: "",
    alt: "",
    category: "The Homestay",
  });

  // New Hero slide state
  const [showNewHeroModal, setShowNewHeroModal] = useState(false);
  const [newHeroSlide, setNewHeroSlide] = useState({
    src: "",
    alt: "",
    caption: "",
  });

  // New Homestay photo state
  const [showNewHomestayModal, setShowNewHomestayModal] = useState(false);
  const [newHomestayPhoto, setNewHomestayPhoto] = useState({
    src: "",
    title: "",
  });

  // Data states
  const [bookings, setBookings] = useState<SerializedBooking[]>([]);
  const [content, setContent] = useState<SerializedSiteContent | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // Modals & form states
  const [showManualBookingModal, setShowManualBookingModal] = useState(false);
  const [manualBookingData, setManualBookingData] = useState({
    name: "",
    email: "",
    phone: "",
    checkIn: new Date().toISOString().split("T")[0],
    checkOut: new Date(Date.now() + 86400000).toISOString().split("T")[0],
    guests: "2 Guests",
    specialRequests: "",
  });

  // Review Form state
  const [newReview, setNewReview] = useState({
    name: "",
    location: "",
    flag: "🇱🇰",
    rating: 4.8,
    quote: "",
  });

  // Amenity Form state
  const [newAmenity, setNewAmenity] = useState({
    title: "",
    desc: "",
    icon: "Sparkles",
  });

  // Password state
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const uploadFileToCloudinary = async (file: File): Promise<string | null> => {
    if (file.size > 15 * 1024 * 1024) {
      showToast("Image file must be under 15MB");
      return null;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "srishahrukh");

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const res = await response.json();
      if (res.success && res.url) {
        return res.url;
      } else {
        showToast(res.error || "Failed to upload image");
        return null;
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Network error";
      showToast(`Upload failed: ${msg}`);
      return null;
    }
  };

  // Check auth on mount
  useEffect(() => {
    checkAdminAuth().then((res) => {
      setIsAuthenticated(res.authenticated);
      if (res.authenticated) {
        refreshAllData();
      }
    });
  }, []);

  const refreshAllData = () => {
    startTransition(async () => {
      const [bookingsRes, contentRes] = await Promise.all([
        getBookings(statusFilter, searchTerm),
        getSiteContent(),
      ]);
      if (bookingsRes.success && bookingsRes.bookings) {
        setBookings(bookingsRes.bookings);
      }
      if (contentRes) {
        setContent(contentRes);
      }
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    const res = await loginAdmin(loginPassword);
    if (res.success) {
      setIsAuthenticated(true);
      setLoginPassword("");
      refreshAllData();
    } else {
      setLoginError(res.error || "Login failed");
    }
  };

  const handleLogout = async () => {
    await logoutAdmin();
    setIsAuthenticated(false);
  };

  // Status Change Handler
  const handleStatusChange = async (
    id: string,
    status: "pending" | "confirmed" | "completed" | "cancelled"
  ) => {
    const res = await updateBookingStatus(id, status);
    if (res.success) {
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status } : b))
      );
      showToast(`Booking marked as ${status}`);
    } else {
      showToast(res.error || "Failed to update status");
    }
  };

  // Delete Booking Handler
  const handleDeleteBooking = async (id: string) => {
    if (!confirm("Are you sure you want to remove this booking?")) return;
    const res = await deleteBooking(id);
    if (res.success) {
      setBookings((prev) => prev.filter((b) => b.id !== id));
      showToast("Booking removed.");
    } else {
      showToast(res.error || "Failed to remove booking");
    }
  };

  // Create Manual Booking Handler
  const handleCreateManualBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await createBooking(manualBookingData);
    if (res.success) {
      showToast("Manual booking added successfully!");
      setShowManualBookingModal(false);
      setManualBookingData({
        name: "",
        email: "",
        phone: "",
        checkIn: new Date().toISOString().split("T")[0],
        checkOut: new Date(Date.now() + 86400000).toISOString().split("T")[0],
        guests: "2 Guests",
        specialRequests: "",
      });
      refreshAllData();
    } else {
      showToast(res.error || "Failed to add booking");
    }
  };

  // Update Site Content Handler
  const handleSaveContent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content) return;
    const res = await updateSiteContent(content);
    if (res.success) {
      showToast("Website sections updated successfully!");
    } else {
      showToast(res.error || "Failed to update content");
    }
  };

  // Add Review Handler
  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.quote) {
      showToast("Please enter name and review quote");
      return;
    }
    const res = await addReview({
      ...newReview,
      date: "Verified Review",
    });
    if (res.success) {
      showToast("Review added successfully!");
      setNewReview({ name: "", location: "", flag: "🇱🇰", rating: 4.8, quote: "" });
      const updated = await getSiteContent();
      setContent(updated);
    } else {
      showToast(res.error || "Failed to add review");
    }
  };

  // Delete Review Handler
  const handleDeleteReview = async (index: number) => {
    if (!confirm("Delete this review?")) return;
    const res = await deleteReview(index);
    if (res.success) {
      showToast("Review deleted");
      const updated = await getSiteContent();
      setContent(updated);
    }
  };

  // Add Amenity Handler
  const handleAddAmenity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAmenity.title || !newAmenity.desc) return;
    const res = await addAmenity(newAmenity);
    if (res.success) {
      showToast("Amenity added!");
      setNewAmenity({ title: "", desc: "", icon: "Sparkles" });
      const updated = await getSiteContent();
      setContent(updated);
    }
  };

  // Delete Amenity Handler
  const handleDeleteAmenity = async (index: number) => {
    if (!confirm("Delete this amenity?")) return;
    const res = await deleteAmenity(index);
    if (res.success) {
      showToast("Amenity removed");
      const updated = await getSiteContent();
      setContent(updated);
    }
  };

  // Change Password Handler
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match");
      return;
    }
    const res = await changeAdminPassword(oldPassword, newPassword);
    if (res.success) {
      showToast("Admin password updated successfully!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      setPasswordError(res.error || "Failed to update password");
    }
  };

  // ── Media Handlers ──
  const handleReplaceHeroSlideImage = async (index: number, file: File) => {
    if (!content) return;
    setIsUploading(true);
    setUploadingTarget(`hero-${index}`);
    const url = await uploadFileToCloudinary(file);
    setIsUploading(false);
    setUploadingTarget(null);
    if (!url) return;

    const newSlides = [...content.heroImages];
    newSlides[index] = { ...newSlides[index], src: url };
    const res = await updateHeroImages(newSlides);
    if (res.success) {
      showToast("Hero slide image replaced!");
      setContent({ ...content, heroImages: newSlides });
    } else {
      showToast(res.error || "Failed to update hero slide");
    }
  };

  const handleUpdateHeroSlideCaption = async (index: number, caption: string, alt: string) => {
    if (!content) return;
    const newSlides = [...content.heroImages];
    newSlides[index] = { ...newSlides[index], caption, alt };
    const res = await updateHeroImages(newSlides);
    if (res.success) {
      showToast("Hero slide updated");
      setContent({ ...content, heroImages: newSlides });
    }
  };

  const handleAddHeroSlide = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content || !newHeroSlide.src) {
      showToast("Please upload an image first");
      return;
    }
    const newSlides = [...content.heroImages, newHeroSlide];
    const res = await updateHeroImages(newSlides);
    if (res.success) {
      showToast("New hero slide added!");
      setContent({ ...content, heroImages: newSlides });
      setNewHeroSlide({ src: "", alt: "", caption: "" });
      setShowNewHeroModal(false);
    } else {
      showToast(res.error || "Failed to add slide");
    }
  };

  const handleDeleteHeroSlide = async (index: number) => {
    if (!content) return;
    if (content.heroImages.length <= 1) {
      showToast("Must have at least one hero slide");
      return;
    }
    if (!confirm("Delete this hero slide?")) return;
    const newSlides = content.heroImages.filter((_, i) => i !== index);
    const res = await updateHeroImages(newSlides);
    if (res.success) {
      showToast("Hero slide removed");
      setContent({ ...content, heroImages: newSlides });
    }
  };

  const handleMoveHeroSlide = async (index: number, direction: "left" | "right") => {
    if (!content) return;
    const targetIndex = direction === "left" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= content.heroImages.length) return;

    const newSlides = [...content.heroImages];
    const temp = newSlides[index];
    newSlides[index] = newSlides[targetIndex];
    newSlides[targetIndex] = temp;

    const res = await updateHeroImages(newSlides);
    if (res.success) {
      showToast(`Slide moved to position ${targetIndex + 1}`);
      setContent({ ...content, heroImages: newSlides });
    } else {
      showToast(res.error || "Failed to update slide order");
    }
  };

  const handleReplaceAboutImage = async (file: File) => {
    if (!content) return;
    setIsUploading(true);
    setUploadingTarget("about");
    const url = await uploadFileToCloudinary(file);
    setIsUploading(false);
    setUploadingTarget(null);
    if (!url) return;

    const newAboutImage = {
      ...content.aboutImage,
      src: url,
    };
    const res = await updateAboutImage(newAboutImage);
    if (res.success) {
      showToast("About section photo updated!");
      setContent({ ...content, aboutImage: newAboutImage });
    }
  };

  const handleSaveAboutCaptions = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content) return;
    const res = await updateAboutImage(content.aboutImage);
    if (res.success) {
      showToast("About section image details saved!");
    } else {
      showToast(res.error || "Failed to save about details");
    }
  };

  const handleReplaceHomestayImage = async (index: number, file: File) => {
    if (!content) return;
    setIsUploading(true);
    setUploadingTarget(`homestay-${index}`);
    const url = await uploadFileToCloudinary(file);
    setIsUploading(false);
    setUploadingTarget(null);
    if (!url) return;

    const newPhotos = [...content.homestayImages];
    newPhotos[index] = { ...newPhotos[index], src: url };
    const res = await updateHomestayImages(newPhotos);
    if (res.success) {
      showToast("Homestay photo replaced!");
      setContent({ ...content, homestayImages: newPhotos });
    }
  };

  const handleUpdateHomestayTitle = (index: number, title: string) => {
    if (!content) return;
    const newPhotos = [...content.homestayImages];
    newPhotos[index] = { ...newPhotos[index], title };
    setContent({ ...content, homestayImages: newPhotos });
  };

  const handleSaveHomestayPhotos = async () => {
    if (!content) return;
    const res = await updateHomestayImages(content.homestayImages);
    if (res.success) {
      showToast("Homestay showcase photos saved!");
    }
  };

  const handleAddHomestayPhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content || !newHomestayPhoto.src || !newHomestayPhoto.title) {
      showToast("Please upload an image and provide a title");
      return;
    }
    const newPhotos = [...content.homestayImages, newHomestayPhoto];
    const res = await updateHomestayImages(newPhotos);
    if (res.success) {
      showToast("Homestay photo added!");
      setContent({ ...content, homestayImages: newPhotos });
      setNewHomestayPhoto({ src: "", title: "" });
      setShowNewHomestayModal(false);
    }
  };

  const handleDeleteHomestayPhoto = async (index: number) => {
    if (!content) return;
    if (content.homestayImages.length <= 1) {
      showToast("Must have at least one homestay photo");
      return;
    }
    if (!confirm("Delete this photo?")) return;
    const newPhotos = content.homestayImages.filter((_, i) => i !== index);
    const res = await updateHomestayImages(newPhotos);
    if (res.success) {
      showToast("Photo removed from homestay showcase");
      setContent({ ...content, homestayImages: newPhotos });
    }
  };

  const handleAddGalleryImageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGalleryImage.src) {
      showToast("Please select and upload an image");
      return;
    }
    const res = await addGalleryImage({
      src: newGalleryImage.src,
      alt: newGalleryImage.alt || "Sri Shahrukh Lake Resort view",
      category: newGalleryImage.category,
    });
    if (res.success) {
      showToast("Photo added to gallery!");
      setNewGalleryImage({ src: "", alt: "", category: "The Homestay" });
      setShowGalleryModal(false);
      const updated = await getSiteContent();
      setContent(updated);
    } else {
      showToast(res.error || "Failed to add gallery photo");
    }
  };

  const handleDeleteGalleryImage = async (index: number) => {
    if (!confirm("Delete this photo from the gallery?")) return;
    const res = await deleteGalleryImage(index);
    if (res.success) {
      showToast("Photo deleted from gallery");
      const updated = await getSiteContent();
      setContent(updated);
    }
  };

  const handleReplaceExploreImage = async (id: string, file: File) => {
    if (!content) return;
    setIsUploading(true);
    setUploadingTarget(`explore-${id}`);
    const url = await uploadFileToCloudinary(file);
    setIsUploading(false);
    setUploadingTarget(null);
    if (!url) return;

    const res = await updateExploreImage(id, url);
    if (res.success) {
      showToast("Attraction photo updated!");
      const updated = await getSiteContent();
      setContent(updated);
    } else {
      showToast(res.error || "Failed to update attraction photo");
    }
  };

  // Filtered Bookings
  const filteredBookings = bookings.filter((b) => {
    const matchesStatus = statusFilter === "all" || b.status === statusFilter;
    const matchesSearch =
      !searchTerm ||
      b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (b.phone && b.phone.includes(searchTerm));
    return matchesStatus && matchesSearch;
  });

  // KPI Metrics
  const totalCount = bookings.length;
  const pendingCount = bookings.filter((b) => b.status === "pending").length;
  const confirmedCount = bookings.filter((b) => b.status === "confirmed").length;
  const completedCount = bookings.filter((b) => b.status === "completed").length;

  if (isAuthenticated === null) {
    return (
      <div
        className="min-h-screen flex items-center justify-center text-ivory"
        style={{ background: "var(--color-teal-deep)" }}
      >
        <div className="flex items-center gap-3">
          <RefreshCw className="w-5 h-5 animate-spin text-sand" />
          <span className="text-xs uppercase tracking-widest text-sand">Checking Authorization…</span>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 1. LOGIN SCREEN
  // ─────────────────────────────────────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4 py-12"
        style={{ background: "var(--color-teal-deep)" }}
      >
        <div className="w-full max-w-md p-8 border border-sand/30 bg-teal-mid shadow-2xl">
          <div className="text-center mb-8">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-sand/40 bg-sand/10 text-sand">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1
              className="text-xl sm:text-2xl font-light tracking-wide uppercase gold-text-gradient"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Sri Shahrukh Lake Resort
            </h1>
            <p className="text-xs text-sand uppercase tracking-[0.25em] mt-1 font-medium">
              Admin Portal
            </p>
            <p className="text-xs text-ivory/70 mt-2">
              Sign in to manage room bookings and website sections.
            </p>
          </div>

          {loginError && (
            <div className="mb-4 p-3 border border-error/50 bg-error/15 text-ivory text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-error flex-shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="admin-password"
                className="block text-xs uppercase tracking-wider text-sand font-medium mb-1.5"
              >
                Admin Password
              </label>
              <input
                id="admin-password"
                type="password"
                required
                placeholder="Enter admin password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full border border-sand/30 bg-teal-deep px-3.5 py-3 text-xs sm:text-sm text-ivory outline-none focus:border-sand placeholder:text-ivory/30"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-sand text-teal-deep text-xs font-semibold uppercase tracking-[0.2em] shadow-md hover:bg-sand-light transition-all cursor-pointer"
            >
              Sign In to Dashboard
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-[11px] text-ivory/60 hover:text-sand transition-colors uppercase tracking-wider"
            >
              ← Back to Main Resort Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 2. AUTHENTICATED ADMIN DASHBOARD
  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--color-teal-deep)" }}>
      {/* ── Toast Notification ── */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 px-4 py-3 bg-sand text-teal-deep text-xs font-semibold shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ── Top Header ── */}
      <header className="border-b border-sand/20 px-4 sm:px-8 py-3.5 bg-teal-deep/95 sticky top-0 z-30 backdrop-blur-md">
        <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="flex flex-col leading-tight">
              <span
                className="text-base sm:text-lg font-light tracking-wide uppercase gold-text-gradient"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Sri Shahrukh Lake Resort
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-sand font-medium">
                Admin Management Console
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={refreshAllData}
              disabled={isPending}
              className="p-2 border border-sand/25 text-sand hover:bg-teal-mid text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Refresh Data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isPending ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <Link
              href="/"
              target="_blank"
              className="px-3 py-1.5 border border-sand/30 text-sand hover:bg-teal-mid text-xs flex items-center gap-1.5 transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">View Website</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </Link>

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 bg-error/20 border border-error/40 text-ivory hover:bg-error/30 text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* ── Main Navigation Tabs ── */}
      <div className="border-b border-sand/20 bg-teal-mid/50 px-4 sm:px-8">
        <div className="mx-auto max-w-7xl flex overflow-x-auto scrollbar-none gap-2 pt-2">
          <button
            onClick={() => setActiveTab("bookings")}
            className={`flex items-center gap-2 px-4 py-3 text-xs uppercase tracking-wider font-medium border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "bookings"
                ? "border-sand text-sand bg-teal-deep/50"
                : "border-transparent text-ivory/70 hover:text-ivory hover:bg-teal-deep/30"
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Bookings</span>
            {pendingCount > 0 && (
              <span className="px-1.5 py-0.5 text-[10px] bg-sand text-teal-deep font-bold rounded-full">
                {pendingCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("content")}
            className={`flex items-center gap-2 px-4 py-3 text-xs uppercase tracking-wider font-medium border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "content"
                ? "border-sand text-sand bg-teal-deep/50"
                : "border-transparent text-ivory/70 hover:text-ivory hover:bg-teal-deep/30"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Website &amp; Contact</span>
          </button>

          <button
            onClick={() => setActiveTab("media")}
            className={`flex items-center gap-2 px-4 py-3 text-xs uppercase tracking-wider font-medium border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "media"
                ? "border-sand text-sand bg-teal-deep/50"
                : "border-transparent text-ivory/70 hover:text-ivory hover:bg-teal-deep/30"
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>Photos &amp; Media</span>
          </button>

          <button
            onClick={() => setActiveTab("reviews")}
            className={`flex items-center gap-2 px-4 py-3 text-xs uppercase tracking-wider font-medium border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "reviews"
                ? "border-sand text-sand bg-teal-deep/50"
                : "border-transparent text-ivory/70 hover:text-ivory hover:bg-teal-deep/30"
            }`}
          >
            <Star className="w-4 h-4" />
            <span>Reviews ({content?.reviews.length || 0})</span>
          </button>

          <button
            onClick={() => setActiveTab("amenities")}
            className={`flex items-center gap-2 px-4 py-3 text-xs uppercase tracking-wider font-medium border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "amenities"
                ? "border-sand text-sand bg-teal-deep/50"
                : "border-transparent text-ivory/70 hover:text-ivory hover:bg-teal-deep/30"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Amenities</span>
          </button>

          <button
            onClick={() => setActiveTab("security")}
            className={`flex items-center gap-2 px-4 py-3 text-xs uppercase tracking-wider font-medium border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "security"
                ? "border-sand text-sand bg-teal-deep/50"
                : "border-transparent text-ivory/70 hover:text-ivory hover:bg-teal-deep/30"
            }`}
          >
            <Key className="w-4 h-4" />
            <span>Admin Password</span>
          </button>
        </div>
      </div>

      {/* ── Tab Content Container ── */}
      <main className="flex-1 py-8 px-4 sm:px-8">
        <div className="mx-auto max-w-7xl">
          {/* ═════════════════════════════════════════════════════════════════ */}
          {/* TAB 1: BOOKINGS MANAGEMENT */}
          {/* ═════════════════════════════════════════════════════════════════ */}
          {activeTab === "bookings" && (
            <div className="space-y-6">
              {/* Metrics Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 border border-sand/20 bg-teal-mid">
                  <p className="text-[10px] uppercase tracking-wider text-ivory/60">Total Inquiries</p>
                  <p className="text-2xl font-light text-ivory mt-1">{totalCount}</p>
                </div>
                <div className="p-4 border border-sand/40 bg-teal-mid">
                  <p className="text-[10px] uppercase tracking-wider text-sand">Pending Action</p>
                  <p className="text-2xl font-light text-sand mt-1">{pendingCount}</p>
                </div>
                <div className="p-4 border border-emerald-500/30 bg-teal-mid">
                  <p className="text-[10px] uppercase tracking-wider text-emerald-400">Confirmed</p>
                  <p className="text-2xl font-light text-emerald-300 mt-1">{confirmedCount}</p>
                </div>
                <div className="p-4 border border-blue-500/30 bg-teal-mid">
                  <p className="text-[10px] uppercase tracking-wider text-blue-400">Completed Stays</p>
                  <p className="text-2xl font-light text-blue-300 mt-1">{completedCount}</p>
                </div>
              </div>

              {/* Action Bar (Search, Filter & Add Button) */}
              <div className="p-4 border border-sand/20 bg-teal-mid flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-64">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-ivory/40" />
                    <input
                      type="text"
                      placeholder="Search guest, email, phone..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 border border-sand/20 bg-teal-deep text-xs text-ivory outline-none focus:border-sand placeholder:text-ivory/30"
                    />
                  </div>

                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="py-2 px-3 border border-sand/20 bg-teal-deep text-xs text-ivory outline-none focus:border-sand"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <button
                  onClick={() => setShowManualBookingModal(true)}
                  className="w-full sm:w-auto px-4 py-2 bg-sand text-teal-deep text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-sand-light transition-all cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Manual Booking</span>
                </button>
              </div>

              {/* Bookings List */}
              {filteredBookings.length === 0 ? (
                <div className="p-12 text-center border border-sand/20 bg-teal-mid text-ivory/70">
                  <Calendar className="w-8 h-8 mx-auto text-sand mb-2 opacity-50" />
                  <p className="text-sm">No bookings found for the selected criteria.</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {filteredBookings.map((b) => {
                    const statusColors = {
                      pending: "bg-sand/20 text-sand border-sand/40",
                      confirmed: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
                      completed: "bg-blue-500/20 text-blue-300 border-blue-500/40",
                      cancelled: "bg-error/20 text-error border-error/40",
                    };

                    const cleanPhone = b.phone?.replace(/[^0-9]/g, "") || "";
                    const whatsappLink = cleanPhone
                      ? `https://wa.me/${cleanPhone.startsWith("94") ? cleanPhone : `94${cleanPhone.replace(/^0/, "")}`}?text=${encodeURIComponent(
                          `Hello ${b.name}, this is Geeth from Sri Shahrukh Lake Resort regarding your reservation from ${b.checkIn} to ${b.checkOut}.`
                        )}`
                      : `https://wa.me/94757273416?text=${encodeURIComponent(
                          `Inquiry regarding ${b.name}'s stay from ${b.checkIn} to ${b.checkOut}.`
                        )}`;

                    return (
                      <div
                        key={b.id}
                        className="p-5 border border-sand/25 bg-teal-mid shadow-lg flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                      >
                        {/* Guest & Stay Details */}
                        <div className="space-y-1.5 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-base font-medium text-ivory flex items-center gap-1.5">
                              <User className="w-4 h-4 text-sand" />
                              <span>{b.name}</span>
                            </h3>
                            <span
                              className={`px-2 py-0.5 text-[10px] uppercase font-semibold border ${
                                statusColors[b.status] || statusColors.pending
                              }`}
                            >
                              {b.status}
                            </span>
                            <span className="text-[11px] text-ivory/50">
                              Received: {new Date(b.createdAt).toLocaleDateString()} at{" "}
                              {new Date(b.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-4 text-xs text-ivory/80 pt-1">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5 text-sand" />
                              <strong>{b.checkIn}</strong> to <strong>{b.checkOut}</strong>
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="w-3.5 h-3.5 text-sand" />
                              {b.guests}
                            </span>
                            <span className="flex items-center gap-1">
                              <Mail className="w-3.5 h-3.5 text-sand" />
                              <a href={`mailto:${b.email}`} className="underline hover:text-sand">
                                {b.email}
                              </a>
                            </span>
                            {b.phone && (
                              <span className="flex items-center gap-1">
                                <Phone className="w-3.5 h-3.5 text-sand" />
                                <a href={`tel:${b.phone}`} className="underline hover:text-sand">
                                  {b.phone}
                                </a>
                              </span>
                            )}
                          </div>

                          {b.specialRequests && (
                            <div className="text-xs bg-teal-deep/70 p-2.5 border border-sand/15 text-ivory/90 mt-2">
                              <strong className="text-sand-light">Guest Note: </strong>
                              <span>{b.specialRequests}</span>
                            </div>
                          )}
                        </div>

                        {/* Action Controls */}
                        <div className="flex flex-wrap items-center gap-2 pt-2 lg:pt-0 border-t lg:border-t-0 border-sand/15">
                          {/* Direct WhatsApp */}
                          <a
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-2 bg-sand text-teal-deep text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 hover:bg-sand-light transition-all shadow-sm"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>WhatsApp</span>
                          </a>

                          {/* Status Dropdown */}
                          <select
                            value={b.status}
                            onChange={(e) =>
                              handleStatusChange(
                                b.id,
                                e.target.value as "pending" | "confirmed" | "completed" | "cancelled"
                              )
                            }
                            className="px-2.5 py-2 border border-sand/30 bg-teal-deep text-xs text-ivory outline-none focus:border-sand cursor-pointer"
                          >
                            <option value="pending">Mark Pending</option>
                            <option value="confirmed">Mark Confirmed</option>
                            <option value="completed">Mark Completed</option>
                            <option value="cancelled">Mark Cancelled</option>
                          </select>

                          {/* Delete */}
                          <button
                            onClick={() => handleDeleteBooking(b.id)}
                            className="p-2 border border-error/30 text-error hover:bg-error/20 transition-colors cursor-pointer"
                            title="Delete Booking"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ═════════════════════════════════════════════════════════════════ */}
          {/* TAB 2: WEBSITE CONTENT & CONTACT */}
          {/* ═════════════════════════════════════════════════════════════════ */}
          {activeTab === "content" && content && (
            <form onSubmit={handleSaveContent} className="space-y-6">
              <div className="p-6 border border-sand/25 bg-teal-mid space-y-5">
                <h3
                  className="text-lg font-light uppercase gold-text-gradient"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  Contact &amp; Location Information
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-sand font-medium mb-1">
                      Direct Phone Call
                    </label>
                    <input
                      type="text"
                      value={content.phone}
                      onChange={(e) => setContent({ ...content, phone: e.target.value })}
                      className="w-full border border-sand/30 bg-teal-deep px-3 py-2 text-xs text-ivory outline-none focus:border-sand"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-sand font-medium mb-1">
                      WhatsApp Number
                    </label>
                    <input
                      type="text"
                      value={content.whatsapp}
                      onChange={(e) => setContent({ ...content, whatsapp: e.target.value })}
                      className="w-full border border-sand/30 bg-teal-deep px-3 py-2 text-xs text-ivory outline-none focus:border-sand"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-sand font-medium mb-1">
                      Inquiry Email Address
                    </label>
                    <input
                      type="email"
                      value={content.email}
                      onChange={(e) => setContent({ ...content, email: e.target.value })}
                      className="w-full border border-sand/30 bg-teal-deep px-3 py-2 text-xs text-ivory outline-none focus:border-sand"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-sand font-medium mb-1">
                      Rating Score &amp; Label
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={content.ratingScore}
                        onChange={(e) => setContent({ ...content, ratingScore: e.target.value })}
                        className="w-20 border border-sand/30 bg-teal-deep px-3 py-2 text-xs text-ivory outline-none focus:border-sand"
                      />
                      <input
                        type="text"
                        value={content.ratingLabel}
                        onChange={(e) => setContent({ ...content, ratingLabel: e.target.value })}
                        className="flex-1 border border-sand/30 bg-teal-deep px-3 py-2 text-xs text-ivory outline-none focus:border-sand"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs uppercase tracking-wider text-sand font-medium mb-1">
                      Physical Address
                    </label>
                    <input
                      type="text"
                      value={content.address}
                      onChange={(e) => setContent({ ...content, address: e.target.value })}
                      className="w-full border border-sand/30 bg-teal-deep px-3 py-2 text-xs text-ivory outline-none focus:border-sand"
                    />
                  </div>
                </div>
              </div>

              {/* Hero & About Section Text */}
              <div className="p-6 border border-sand/25 bg-teal-mid space-y-5">
                <h3
                  className="text-lg font-light uppercase gold-text-gradient"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  Hero &amp; About Text
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-sand font-medium mb-1">
                      Hero Subtitle Description
                    </label>
                    <textarea
                      rows={3}
                      value={content.heroSubtitle}
                      onChange={(e) => setContent({ ...content, heroSubtitle: e.target.value })}
                      className="w-full border border-sand/30 bg-teal-deep p-3 text-xs text-ivory outline-none focus:border-sand"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-sand font-medium mb-1">
                      About Story (Founder &amp; Hospitality Story)
                    </label>
                    <textarea
                      rows={5}
                      value={content.aboutStory}
                      onChange={(e) => setContent({ ...content, aboutStory: e.target.value })}
                      className="w-full border border-sand/30 bg-teal-deep p-3 text-xs text-ivory outline-none focus:border-sand"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-sand font-medium mb-1">
                      The Homestay Section Intro
                    </label>
                    <textarea
                      rows={3}
                      value={content.homestayDescription}
                      onChange={(e) => setContent({ ...content, homestayDescription: e.target.value })}
                      className="w-full border border-sand/30 bg-teal-deep p-3 text-xs text-ivory outline-none focus:border-sand"
                    />
                  </div>
                </div>
              </div>

              <div className="text-right">
                <button
                  type="submit"
                  className="px-8 py-3 bg-sand text-teal-deep text-xs font-semibold uppercase tracking-[0.2em] shadow-lg hover:bg-sand-light transition-all cursor-pointer"
                >
                  Save Website Changes
                </button>
              </div>
            </form>
          )}

          {/* ═════════════════════════════════════════════════════════════════ */}
          {/* TAB: PHOTOS & MEDIA MANAGEMENT (CLOUDINARY) */}
          {/* ═════════════════════════════════════════════════════════════════ */}
          {activeTab === "media" && content && (
            <div className="space-y-6">
              {/* Media Sub-Navigation */}
              <div className="flex flex-wrap gap-2 p-2 bg-teal-mid border border-sand/20">
                <button
                  type="button"
                  onClick={() => setMediaSection("hero")}
                  className={`px-3.5 py-2 text-xs uppercase tracking-wider font-medium transition-all ${
                    mediaSection === "hero"
                      ? "bg-sand text-teal-deep shadow-md font-semibold"
                      : "text-ivory/80 hover:text-sand hover:bg-teal-deep/50"
                  }`}
                >
                  Hero Slides ({content.heroImages?.length || 0})
                </button>
                <button
                  type="button"
                  onClick={() => setMediaSection("about")}
                  className={`px-3.5 py-2 text-xs uppercase tracking-wider font-medium transition-all ${
                    mediaSection === "about"
                      ? "bg-sand text-teal-deep shadow-md font-semibold"
                      : "text-ivory/80 hover:text-sand hover:bg-teal-deep/50"
                  }`}
                >
                  About Story Photo
                </button>
                <button
                  type="button"
                  onClick={() => setMediaSection("homestay")}
                  className={`px-3.5 py-2 text-xs uppercase tracking-wider font-medium transition-all ${
                    mediaSection === "homestay"
                      ? "bg-sand text-teal-deep shadow-md font-semibold"
                      : "text-ivory/80 hover:text-sand hover:bg-teal-deep/50"
                  }`}
                >
                  Homestay Showcase ({content.homestayImages?.length || 0})
                </button>
                <button
                  type="button"
                  onClick={() => setMediaSection("gallery")}
                  className={`px-3.5 py-2 text-xs uppercase tracking-wider font-medium transition-all ${
                    mediaSection === "gallery"
                      ? "bg-sand text-teal-deep shadow-md font-semibold"
                      : "text-ivory/80 hover:text-sand hover:bg-teal-deep/50"
                  }`}
                >
                  Photo Gallery ({content.galleryImages?.length || 0})
                </button>
                <button
                  type="button"
                  onClick={() => setMediaSection("explore")}
                  className={`px-3.5 py-2 text-xs uppercase tracking-wider font-medium transition-all ${
                    mediaSection === "explore"
                      ? "bg-sand text-teal-deep shadow-md font-semibold"
                      : "text-ivory/80 hover:text-sand hover:bg-teal-deep/50"
                  }`}
                >
                  Attraction Photos ({content.exploreImages?.length || 0})
                </button>
              </div>

              {/* ── 1. HERO SLIDES ── */}
              {mediaSection === "hero" && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 bg-teal-mid border border-sand/20">
                    <div>
                      <h3
                        className="text-lg font-light uppercase gold-text-gradient"
                        style={{ fontFamily: "var(--font-serif)" }}
                      >
                        Hero Slideshow Photos
                      </h3>
                      <p className="text-xs text-ivory/70 mt-0.5">
                        These photos cycle automatically at the top of your homepage with crossfade animation.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowNewHeroModal(true)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-sand text-teal-deep text-xs font-semibold uppercase tracking-wider hover:bg-sand-light shadow-md"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add New Hero Slide</span>
                    </button>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {content.heroImages.map((slide, index) => (
                      <div
                        key={index}
                        className="border border-sand/30 bg-teal-mid flex flex-col justify-between overflow-hidden shadow-lg"
                      >
                        <div className="relative aspect-[16/10] w-full bg-teal-deep group overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={slide.src}
                            alt={slide.alt || `Hero slide ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-teal-deep/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                            <label className="cursor-pointer px-3.5 py-2 bg-sand text-teal-deep text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                              <Upload className="w-3.5 h-3.5" />
                              <span>Replace Photo</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={async (e) => {
                                  const file = e.target.files?.[0];
                                  if (file) await handleReplaceHeroSlideImage(index, file);
                                }}
                              />
                            </label>
                          </div>
                          {isUploading && uploadingTarget === `hero-${index}` && (
                            <div className="absolute inset-0 bg-teal-deep/80 flex items-center justify-center gap-2 text-sand text-xs">
                              <RefreshCw className="w-4 h-4 animate-spin" />
                              <span>Uploading to Cloudinary...</span>
                            </div>
                          )}
                          <div className="absolute top-2 left-2 flex items-center gap-1.5 z-10">
                            <span className="px-2 py-0.5 bg-teal-deep/90 text-sand text-[10px] uppercase tracking-wider font-semibold border border-sand/30 shadow">
                              Slide {index + 1}
                            </span>
                            {content.heroImages.length > 1 && (
                              <div className="flex items-center bg-teal-deep/90 border border-sand/30 shadow">
                                <button
                                  type="button"
                                  disabled={index === 0}
                                  onClick={() => handleMoveHeroSlide(index, "left")}
                                  className={`p-1 transition-colors ${
                                    index === 0
                                      ? "opacity-30 cursor-not-allowed text-ivory/30"
                                      : "text-sand hover:bg-sand/20 cursor-pointer"
                                  }`}
                                  title="Move earlier (Left)"
                                >
                                  <ArrowLeft className="w-3 h-3" />
                                </button>
                                <span className="text-sand/30 text-[10px]">|</span>
                                <button
                                  type="button"
                                  disabled={index === content.heroImages.length - 1}
                                  onClick={() => handleMoveHeroSlide(index, "right")}
                                  className={`p-1 transition-colors ${
                                    index === content.heroImages.length - 1
                                      ? "opacity-30 cursor-not-allowed text-ivory/30"
                                      : "text-sand hover:bg-sand/20 cursor-pointer"
                                  }`}
                                  title="Move later (Right)"
                                >
                                  <ArrowRight className="w-3 h-3" />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                          <div className="space-y-2">
                            <div>
                              <label className="block text-[10px] uppercase tracking-wider text-sand font-medium mb-1">
                                Caption Overlay
                              </label>
                              <input
                                type="text"
                                value={slide.caption || ""}
                                onChange={(e) => {
                                  const newSlides = [...content.heroImages];
                                  newSlides[index].caption = e.target.value;
                                  setContent({ ...content, heroImages: newSlides });
                                }}
                                className="w-full border border-sand/30 bg-teal-deep px-3 py-1.5 text-xs text-ivory outline-none focus:border-sand"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] uppercase tracking-wider text-sand font-medium mb-1">
                                Image Alt Text
                              </label>
                              <input
                                type="text"
                                value={slide.alt || ""}
                                onChange={(e) => {
                                  const newSlides = [...content.heroImages];
                                  newSlides[index].alt = e.target.value;
                                  setContent({ ...content, heroImages: newSlides });
                                }}
                                className="w-full border border-sand/30 bg-teal-deep px-3 py-1.5 text-xs text-ivory outline-none focus:border-sand"
                              />
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-sand/15">
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() =>
                                  handleUpdateHeroSlideCaption(index, slide.caption || "", slide.alt || "")
                                }
                                className="px-3 py-1.5 bg-sand/20 border border-sand/40 text-sand text-xs hover:bg-sand/30 transition-colors cursor-pointer"
                              >
                                Save Details
                              </button>
                              {content.heroImages.length > 1 && (
                                <div className="flex items-center gap-1">
                                  <button
                                    type="button"
                                    disabled={index === 0}
                                    onClick={() => handleMoveHeroSlide(index, "left")}
                                    className="p-1.5 border border-sand/30 text-sand hover:bg-sand/20 disabled:opacity-30 disabled:cursor-not-allowed"
                                    title="Move earlier"
                                  >
                                    <ArrowLeft className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    type="button"
                                    disabled={index === content.heroImages.length - 1}
                                    onClick={() => handleMoveHeroSlide(index, "right")}
                                    className="p-1.5 border border-sand/30 text-sand hover:bg-sand/20 disabled:opacity-30 disabled:cursor-not-allowed"
                                    title="Move later"
                                  >
                                    <ArrowRight className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              )}
                            </div>
                            {content.heroImages.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleDeleteHeroSlide(index)}
                                className="p-1.5 text-error hover:bg-error/20 transition-colors"
                                title="Delete Slide"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── 2. ABOUT STORY PHOTO ── */}
              {mediaSection === "about" && (
                <div className="p-6 border border-sand/25 bg-teal-mid space-y-6">
                  <div>
                    <h3
                      className="text-lg font-light uppercase gold-text-gradient"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      About Story Photo (Founder &amp; Shah Rukh Khan)
                    </h3>
                    <p className="text-xs text-ivory/70 mt-1">
                      This photo is displayed alongside your homestay founding story in the Property Overview section.
                    </p>
                  </div>

                  <div className="grid gap-6 md:grid-cols-12 items-start">
                    <div className="md:col-span-5 relative border border-sand/30 bg-teal-deep overflow-hidden aspect-[4/5] shadow-xl">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={content.aboutImage?.src || "https://res.cloudinary.com/znj9faa6/image/upload/v1789894712/srishahrukh/owner-srk.jpg"}
                        alt={content.aboutImage?.alt || "Founder Geeth with Shah Rukh Khan"}
                        className="w-full h-full object-cover"
                      />
                      {isUploading && uploadingTarget === "about" && (
                        <div className="absolute inset-0 bg-teal-deep/80 flex items-center justify-center gap-2 text-sand text-xs">
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Uploading to Cloudinary...</span>
                        </div>
                      )}
                    </div>

                    <form onSubmit={handleSaveAboutCaptions} className="md:col-span-7 space-y-4">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-sand font-medium mb-1.5">
                          Change Photo
                        </label>
                        <label className="inline-flex items-center gap-2 px-5 py-2.5 bg-sand text-teal-deep text-xs font-semibold uppercase tracking-wider hover:bg-sand-light shadow-md cursor-pointer">
                          <Upload className="w-4 h-4" />
                          <span>Upload New Photo from Device</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file) await handleReplaceAboutImage(file);
                            }}
                          />
                        </label>
                        <p className="text-[11px] text-ivory/60 mt-1">
                          Uploads directly to your Cloudinary storage under <strong>srishahrukh</strong>.
                        </p>
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-sand font-medium mb-1">
                          Photo Title / Top Caption
                        </label>
                        <input
                          type="text"
                          value={content.aboutImage?.caption || ""}
                          onChange={(e) =>
                            setContent({
                              ...content,
                              aboutImage: {
                                ...content.aboutImage,
                                caption: e.target.value,
                              },
                            })
                          }
                          className="w-full border border-sand/30 bg-teal-deep p-3 text-xs text-ivory outline-none focus:border-sand"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-sand font-medium mb-1">
                          Photo Sub-caption / Story Note
                        </label>
                        <textarea
                          rows={3}
                          value={content.aboutImage?.subCaption || ""}
                          onChange={(e) =>
                            setContent({
                              ...content,
                              aboutImage: {
                                ...content.aboutImage,
                                subCaption: e.target.value,
                              },
                            })
                          }
                          className="w-full border border-sand/30 bg-teal-deep p-3 text-xs text-ivory outline-none focus:border-sand"
                        />
                      </div>

                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-sand text-teal-deep text-xs font-semibold uppercase tracking-wider shadow-md hover:bg-sand-light transition-all"
                      >
                        Save Photo Captions
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {/* ── 3. HOMESTAY SHOWCASE PHOTOS ── */}
              {mediaSection === "homestay" && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 bg-teal-mid border border-sand/20">
                    <div>
                      <h3
                        className="text-lg font-light uppercase gold-text-gradient"
                        style={{ fontFamily: "var(--font-serif)" }}
                      >
                        The Homestay Showcase Photos
                      </h3>
                      <p className="text-xs text-ivory/70 mt-0.5">
                        These photos showcase the homestay grounds, bedrooms, terrace, and bathrooms.
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setShowNewHomestayModal(true)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-sand text-teal-deep text-xs font-semibold uppercase tracking-wider hover:bg-sand-light shadow-md"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Photo</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleSaveHomestayPhotos}
                        className="px-4 py-2 border border-sand text-sand text-xs font-semibold uppercase tracking-wider hover:bg-teal-deep transition-all"
                      >
                        Save All Titles
                      </button>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {content.homestayImages.map((photo, index) => (
                      <div
                        key={index}
                        className="border border-sand/30 bg-teal-mid overflow-hidden flex flex-col justify-between shadow-lg"
                      >
                        <div className="relative aspect-[16/10] w-full bg-teal-deep group overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={photo.src} alt={photo.title} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-teal-deep/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                            <label className="cursor-pointer px-3.5 py-2 bg-sand text-teal-deep text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                              <Upload className="w-3.5 h-3.5" />
                              <span>Replace Photo</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={async (e) => {
                                  const file = e.target.files?.[0];
                                  if (file) await handleReplaceHomestayImage(index, file);
                                }}
                              />
                            </label>
                          </div>
                          {isUploading && uploadingTarget === `homestay-${index}` && (
                            <div className="absolute inset-0 bg-teal-deep/80 flex items-center justify-center gap-2 text-sand text-xs">
                              <RefreshCw className="w-4 h-4 animate-spin" />
                              <span>Uploading...</span>
                            </div>
                          )}
                        </div>

                        <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
                          <div>
                            <label className="block text-[10px] uppercase tracking-wider text-sand font-medium mb-1">
                              Display Title
                            </label>
                            <input
                              type="text"
                              value={photo.title}
                              onChange={(e) => handleUpdateHomestayTitle(index, e.target.value)}
                              className="w-full border border-sand/30 bg-teal-deep px-3 py-1.5 text-xs text-ivory outline-none focus:border-sand"
                            />
                          </div>

                          <div className="flex items-center justify-end pt-1">
                            {content.homestayImages.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleDeleteHomestayPhoto(index)}
                                className="p-1.5 text-error hover:bg-error/20 transition-colors"
                                title="Remove photo"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── 4. PHOTO GALLERY ── */}
              {mediaSection === "gallery" && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 bg-teal-mid border border-sand/20">
                    <div>
                      <h3
                        className="text-lg font-light uppercase gold-text-gradient"
                        style={{ fontFamily: "var(--font-serif)" }}
                      >
                        Photo Gallery ({content.galleryImages.length} Images)
                      </h3>
                      <p className="text-xs text-ivory/70 mt-0.5">
                        Add and manage high-resolution photos in the public lightbox gallery.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowGalleryModal(true)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-sand text-teal-deep text-xs font-semibold uppercase tracking-wider hover:bg-sand-light shadow-md"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Upload Photo to Gallery</span>
                    </button>
                  </div>

                  {/* Filter chips */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {[
                      "All Views",
                      "The Homestay",
                      "Lake & Nature",
                      "Wildlife & Heritage",
                      "Homestay Life",
                    ].map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setGalleryFilter(cat)}
                        className={`px-3 py-1 text-xs uppercase tracking-wider border transition-colors ${
                          galleryFilter === cat
                            ? "border-sand bg-sand text-teal-deep font-semibold"
                            : "border-sand/30 text-ivory/80 hover:border-sand hover:text-sand"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    {content.galleryImages
                      .map((img, originalIndex) => ({ img, originalIndex }))
                      .filter(
                        ({ img }) =>
                          galleryFilter === "All Views" || img.category === galleryFilter
                      )
                      .map(({ img, originalIndex }) => (
                        <div
                          key={originalIndex}
                          className="border border-sand/25 bg-teal-mid flex flex-col justify-between overflow-hidden shadow-md group"
                        >
                          <div className="relative aspect-[4/3] w-full bg-teal-deep">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={img.src}
                              alt={img.alt}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <span className="absolute top-2 left-2 px-2 py-0.5 bg-teal-deep/90 text-sand text-[9px] uppercase tracking-wider font-semibold border border-sand/30">
                              {img.category}
                            </span>
                          </div>

                          <div className="p-3 flex items-center justify-between gap-2 border-t border-sand/15">
                            <p className="text-[11px] text-ivory/80 truncate flex-1">{img.alt}</p>
                            <button
                              type="button"
                              onClick={() => handleDeleteGalleryImage(originalIndex)}
                              className="p-1 text-error hover:bg-error/20 transition-colors flex-shrink-0"
                              title="Delete Photo"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* ── 5. ATTRACTION PHOTOS (EXPLORE) ── */}
              {mediaSection === "explore" && (
                <div className="space-y-6">
                  <div className="p-4 bg-teal-mid border border-sand/20">
                    <h3
                      className="text-lg font-light uppercase gold-text-gradient"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      Nearby Attraction Cards (Explore Section)
                    </h3>
                    <p className="text-xs text-ivory/70 mt-0.5">
                      Replace the preview thumbnail photos for the 6 local destinations and safari gateways.
                    </p>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {content.exploreImages.map((attraction) => (
                      <div
                        key={attraction.id}
                        className="border border-sand/30 bg-teal-mid overflow-hidden flex flex-col justify-between shadow-lg"
                      >
                        <div className="relative aspect-[16/10] w-full bg-teal-deep group overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={attraction.src}
                            alt={attraction.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-teal-deep/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                            <label className="cursor-pointer px-3.5 py-2 bg-sand text-teal-deep text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                              <Upload className="w-3.5 h-3.5" />
                              <span>Replace Image</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={async (e) => {
                                  const file = e.target.files?.[0];
                                  if (file) await handleReplaceExploreImage(attraction.id, file);
                                }}
                              />
                            </label>
                          </div>
                          {isUploading && uploadingTarget === `explore-${attraction.id}` && (
                            <div className="absolute inset-0 bg-teal-deep/80 flex items-center justify-center gap-2 text-sand text-xs">
                              <RefreshCw className="w-4 h-4 animate-spin" />
                              <span>Uploading to Cloudinary...</span>
                            </div>
                          )}
                        </div>

                        <div className="p-4 border-t border-sand/15 flex items-center justify-between">
                          <h4 className="text-xs font-medium text-ivory">{attraction.name}</h4>
                          <label className="cursor-pointer text-[11px] uppercase tracking-wider text-sand hover:underline font-semibold flex items-center gap-1">
                            <Camera className="w-3 h-3" />
                            <span>Change</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (file) await handleReplaceExploreImage(attraction.id, file);
                              }}
                            />
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ═════════════════════════════════════════════════════════════════ */}
          {/* TAB 3: REVIEWS MANAGER */}
          {/* ═════════════════════════════════════════════════════════════════ */}
          {activeTab === "reviews" && content && (
            <div className="space-y-6">
              {/* Add New Review Box */}
              <div className="p-6 border border-sand/30 bg-teal-mid">
                <h3
                  className="text-lg font-light uppercase gold-text-gradient mb-4"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  Add New Guest Review
                </h3>
                <form onSubmit={handleAddReview} className="space-y-3">
                  <div className="grid gap-3 sm:grid-cols-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Guest Name *"
                        value={newReview.name}
                        onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                        className="w-full border border-sand/30 bg-teal-deep px-3 py-2 text-xs text-ivory outline-none focus:border-sand"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Location (e.g. Germany)"
                        value={newReview.location}
                        onChange={(e) => setNewReview({ ...newReview, location: e.target.value })}
                        className="w-full border border-sand/30 bg-teal-deep px-3 py-2 text-xs text-ivory outline-none focus:border-sand"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Flag (e.g. 🇩🇪, 🇬🇧)"
                        value={newReview.flag}
                        onChange={(e) => setNewReview({ ...newReview, flag: e.target.value })}
                        className="w-full border border-sand/30 bg-teal-deep px-3 py-2 text-xs text-ivory outline-none focus:border-sand"
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        step="0.1"
                        min="1"
                        max="5"
                        placeholder="Rating (4.8)"
                        value={newReview.rating}
                        onChange={(e) => setNewReview({ ...newReview, rating: parseFloat(e.target.value) || 4.8 })}
                        className="w-full border border-sand/30 bg-teal-deep px-3 py-2 text-xs text-ivory outline-none focus:border-sand"
                      />
                    </div>
                  </div>
                  <div>
                    <textarea
                      rows={2}
                      placeholder="Review Quote *"
                      value={newReview.quote}
                      onChange={(e) => setNewReview({ ...newReview, quote: e.target.value })}
                      className="w-full border border-sand/30 bg-teal-deep p-3 text-xs text-ivory outline-none focus:border-sand"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-sand text-teal-deep text-xs font-semibold uppercase tracking-wider hover:bg-sand-light transition-all cursor-pointer"
                  >
                    + Add Review
                  </button>
                </form>
              </div>

              {/* Reviews List */}
              <div className="space-y-3">
                {content.reviews.map((r, i) => (
                  <div
                    key={i}
                    className="p-4 border border-sand/20 bg-teal-mid flex items-start justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{r.flag}</span>
                        <strong className="text-ivory text-sm">{r.name}</strong>
                        <span className="text-xs text-ivory/60">({r.location})</span>
                        <span className="px-2 py-0.5 text-[10px] bg-sand/20 text-sand border border-sand/30 font-medium">
                          ★ {r.rating} / 5.0
                        </span>
                      </div>
                      <p className="text-xs text-ivory/80 italic font-serif">&ldquo;{r.quote}&rdquo;</p>
                    </div>

                    <button
                      onClick={() => handleDeleteReview(i)}
                      className="p-2 border border-error/30 text-error hover:bg-error/20 transition-colors cursor-pointer"
                      title="Delete Review"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ═════════════════════════════════════════════════════════════════ */}
          {/* TAB 4: AMENITIES */}
          {/* ═════════════════════════════════════════════════════════════════ */}
          {activeTab === "amenities" && content && (
            <div className="space-y-6">
              {/* Add Amenity Form */}
              <div className="p-6 border border-sand/30 bg-teal-mid">
                <h3
                  className="text-lg font-light uppercase gold-text-gradient mb-4"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  Add Homestay Amenity
                </h3>
                <form onSubmit={handleAddAmenity} className="space-y-3">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input
                      type="text"
                      placeholder="Title (e.g. Free Wi-Fi)"
                      value={newAmenity.title}
                      onChange={(e) => setNewAmenity({ ...newAmenity, title: e.target.value })}
                      className="w-full border border-sand/30 bg-teal-deep px-3 py-2 text-xs text-ivory outline-none focus:border-sand"
                    />
                    <input
                      type="text"
                      placeholder="Description"
                      value={newAmenity.desc}
                      onChange={(e) => setNewAmenity({ ...newAmenity, desc: e.target.value })}
                      className="w-full border border-sand/30 bg-teal-deep px-3 py-2 text-xs text-ivory outline-none focus:border-sand"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-sand text-teal-deep text-xs font-semibold uppercase tracking-wider hover:bg-sand-light transition-all cursor-pointer"
                  >
                    + Add Amenity
                  </button>
                </form>
              </div>

              {/* Amenities Grid */}
              <div className="grid gap-3 sm:grid-cols-2">
                {content.amenities.map((a, i) => (
                  <div
                    key={i}
                    className="p-4 border border-sand/20 bg-teal-mid flex items-center justify-between gap-3"
                  >
                    <div>
                      <p className="text-xs font-medium text-ivory">{a.title}</p>
                      <p className="text-[11px] text-ivory/70 mt-0.5">{a.desc}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteAmenity(i)}
                      className="p-2 border border-error/30 text-error hover:bg-error/20 transition-colors cursor-pointer"
                      title="Delete Amenity"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ═════════════════════════════════════════════════════════════════ */}
          {/* TAB 5: SECURITY (CHANGE PASSWORD) */}
          {/* ═════════════════════════════════════════════════════════════════ */}
          {activeTab === "security" && (
            <div className="max-w-md p-6 border border-sand/30 bg-teal-mid space-y-4">
              <h3
                className="text-lg font-light uppercase gold-text-gradient"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Change Admin Password
              </h3>

              {passwordError && (
                <div className="p-3 border border-error/50 bg-error/15 text-ivory text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-error flex-shrink-0" />
                  <span>{passwordError}</span>
                </div>
              )}

              <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-sand font-medium mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="w-full border border-sand/30 bg-teal-deep px-3 py-2 text-xs text-ivory outline-none focus:border-sand"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-sand font-medium mb-1">
                    New Password (Min 4 chars)
                  </label>
                  <input
                    type="password"
                    required
                    minLength={4}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full border border-sand/30 bg-teal-deep px-3 py-2 text-xs text-ivory outline-none focus:border-sand"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-sand font-medium mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    required
                    minLength={4}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full border border-sand/30 bg-teal-deep px-3 py-2 text-xs text-ivory outline-none focus:border-sand"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-sand text-teal-deep text-xs font-semibold uppercase tracking-[0.2em] shadow-md hover:bg-sand-light transition-all cursor-pointer"
                >
                  Update Admin Password
                </button>
              </form>
            </div>
          )}
        </div>
      </main>

      {/* ── Manual Booking Modal ── */}
      {showManualBookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg p-6 border border-sand/30 bg-teal-mid shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-sand/20 mb-4">
              <h3 className="text-base font-medium text-ivory uppercase tracking-wider">
                Add Manual Booking Record
              </h3>
              <button
                onClick={() => setShowManualBookingModal(false)}
                className="text-ivory/60 hover:text-sand"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateManualBooking} className="space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-[11px] uppercase text-sand mb-1">Guest Name *</label>
                  <input
                    type="text"
                    required
                    value={manualBookingData.name}
                    onChange={(e) => setManualBookingData({ ...manualBookingData, name: e.target.value })}
                    className="w-full border border-sand/30 bg-teal-deep px-3 py-2 text-xs text-ivory outline-none focus:border-sand"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase text-sand mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={manualBookingData.email}
                    onChange={(e) => setManualBookingData({ ...manualBookingData, email: e.target.value })}
                    className="w-full border border-sand/30 bg-teal-deep px-3 py-2 text-xs text-ivory outline-none focus:border-sand"
                  />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-[11px] uppercase text-sand mb-1">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    value={manualBookingData.phone}
                    onChange={(e) => setManualBookingData({ ...manualBookingData, phone: e.target.value })}
                    className="w-full border border-sand/30 bg-teal-deep px-3 py-2 text-xs text-ivory outline-none focus:border-sand"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase text-sand mb-1">Guests</label>
                  <select
                    value={manualBookingData.guests}
                    onChange={(e) => setManualBookingData({ ...manualBookingData, guests: e.target.value })}
                    className="w-full border border-sand/30 bg-teal-deep px-3 py-2 text-xs text-ivory outline-none focus:border-sand"
                  >
                    <option value="1 Guest">1 Guest</option>
                    <option value="2 Guests">2 Guests</option>
                    <option value="3 Guests">3 Guests</option>
                    <option value="4+ Guests">4+ Guests</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-[11px] uppercase text-sand mb-1">Check-in Date *</label>
                  <input
                    type="date"
                    required
                    value={manualBookingData.checkIn}
                    onChange={(e) => setManualBookingData({ ...manualBookingData, checkIn: e.target.value })}
                    className="w-full border border-sand/30 bg-teal-deep px-3 py-2 text-xs text-ivory outline-none focus:border-sand"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase text-sand mb-1">Check-out Date *</label>
                  <input
                    type="date"
                    required
                    value={manualBookingData.checkOut}
                    onChange={(e) => setManualBookingData({ ...manualBookingData, checkOut: e.target.value })}
                    className="w-full border border-sand/30 bg-teal-deep px-3 py-2 text-xs text-ivory outline-none focus:border-sand"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase text-sand mb-1">Notes / Safari Inquiries</label>
                <input
                  type="text"
                  placeholder="Walk-in guest, Yala safari, etc."
                  value={manualBookingData.specialRequests}
                  onChange={(e) => setManualBookingData({ ...manualBookingData, specialRequests: e.target.value })}
                  className="w-full border border-sand/30 bg-teal-deep px-3 py-2 text-xs text-ivory outline-none focus:border-sand"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowManualBookingModal(false)}
                  className="px-4 py-2 border border-sand/20 text-ivory text-xs uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-sand text-teal-deep text-xs font-semibold uppercase tracking-wider"
                >
                  Save Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Modal: Add New Hero Slide ── */}
      {showNewHeroModal && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4">
          <div className="bg-teal-mid border border-sand/40 p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-sand/20 pb-3">
              <h3 className="text-base uppercase gold-text-gradient font-serif">Add New Hero Slide</h3>
              <button
                type="button"
                onClick={() => setShowNewHeroModal(false)}
                className="text-ivory/60 hover:text-ivory"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddHeroSlide} className="space-y-4">
              <div>
                <label className="block text-xs uppercase text-sand font-medium mb-1">1. Choose Image *</label>
                <label className="flex flex-col items-center justify-center p-4 border border-dashed border-sand/40 bg-teal-deep text-center cursor-pointer hover:border-sand">
                  {newHeroSlide.src ? (
                    <div className="relative aspect-[16/10] w-full max-h-40 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={newHeroSlide.src} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <>
                      <Upload className="w-6 h-6 text-sand mb-2" />
                      <span className="text-xs text-ivory">Click to select photo from device</span>
                      <span className="text-[10px] text-ivory/50 mt-1">Uploads automatically to Cloudinary</span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      setIsUploading(true);
                      setUploadingTarget("modal-hero");
                      const url = await uploadFileToCloudinary(file);
                      setIsUploading(false);
                      setUploadingTarget(null);
                      if (url) setNewHeroSlide({ ...newHeroSlide, src: url });
                    }}
                  />
                </label>
                {isUploading && uploadingTarget === "modal-hero" && (
                  <p className="text-xs text-sand flex items-center gap-1 mt-1">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Uploading to Cloudinary...
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs uppercase text-sand font-medium mb-1">2. Slide Caption</label>
                <input
                  type="text"
                  placeholder="e.g. Yala Safari Gateway · 4x4 Tours Arranged"
                  value={newHeroSlide.caption}
                  onChange={(e) => setNewHeroSlide({ ...newHeroSlide, caption: e.target.value })}
                  className="w-full border border-sand/30 bg-teal-deep px-3 py-2 text-xs text-ivory outline-none focus:border-sand"
                />
              </div>

              <div>
                <label className="block text-xs uppercase text-sand font-medium mb-1">3. Alt Description</label>
                <input
                  type="text"
                  placeholder="e.g. Scenic view of Tissa Wewa lake at sunrise"
                  value={newHeroSlide.alt}
                  onChange={(e) => setNewHeroSlide({ ...newHeroSlide, alt: e.target.value })}
                  className="w-full border border-sand/30 bg-teal-deep px-3 py-2 text-xs text-ivory outline-none focus:border-sand"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewHeroModal(false)}
                  className="px-4 py-2 border border-sand/20 text-ivory text-xs uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newHeroSlide.src || isUploading}
                  className="px-5 py-2 bg-sand text-teal-deep text-xs font-semibold uppercase tracking-wider disabled:opacity-50"
                >
                  Add Slide
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Modal: Add New Homestay Photo ── */}
      {showNewHomestayModal && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4">
          <div className="bg-teal-mid border border-sand/40 p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-sand/20 pb-3">
              <h3 className="text-base uppercase gold-text-gradient font-serif">Add Homestay Showcase Photo</h3>
              <button
                type="button"
                onClick={() => setShowNewHomestayModal(false)}
                className="text-ivory/60 hover:text-ivory"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddHomestayPhoto} className="space-y-4">
              <div>
                <label className="block text-xs uppercase text-sand font-medium mb-1">1. Choose Photo *</label>
                <label className="flex flex-col items-center justify-center p-4 border border-dashed border-sand/40 bg-teal-deep text-center cursor-pointer hover:border-sand">
                  {newHomestayPhoto.src ? (
                    <div className="relative aspect-[16/10] w-full max-h-40 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={newHomestayPhoto.src} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <>
                      <Upload className="w-6 h-6 text-sand mb-2" />
                      <span className="text-xs text-ivory">Click to select photo</span>
                      <span className="text-[10px] text-ivory/50 mt-1">Uploads to Cloudinary</span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      setIsUploading(true);
                      setUploadingTarget("modal-homestay");
                      const url = await uploadFileToCloudinary(file);
                      setIsUploading(false);
                      setUploadingTarget(null);
                      if (url) setNewHomestayPhoto({ ...newHomestayPhoto, src: url });
                    }}
                  />
                </label>
                {isUploading && uploadingTarget === "modal-homestay" && (
                  <p className="text-xs text-sand flex items-center gap-1 mt-1">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Uploading to Cloudinary...
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs uppercase text-sand font-medium mb-1">2. Display Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Garden Verandah & Terrace"
                  value={newHomestayPhoto.title}
                  onChange={(e) => setNewHomestayPhoto({ ...newHomestayPhoto, title: e.target.value })}
                  className="w-full border border-sand/30 bg-teal-deep px-3 py-2 text-xs text-ivory outline-none focus:border-sand"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewHomestayModal(false)}
                  className="px-4 py-2 border border-sand/20 text-ivory text-xs uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newHomestayPhoto.src || !newHomestayPhoto.title || isUploading}
                  className="px-5 py-2 bg-sand text-teal-deep text-xs font-semibold uppercase tracking-wider disabled:opacity-50"
                >
                  Add Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Modal: Upload Photo to Gallery ── */}
      {showGalleryModal && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4">
          <div className="bg-teal-mid border border-sand/40 p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-sand/20 pb-3">
              <h3 className="text-base uppercase gold-text-gradient font-serif">Upload Photo to Gallery</h3>
              <button
                type="button"
                onClick={() => setShowGalleryModal(false)}
                className="text-ivory/60 hover:text-ivory"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddGalleryImageSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase text-sand font-medium mb-1">1. Choose Photo *</label>
                <label className="flex flex-col items-center justify-center p-4 border border-dashed border-sand/40 bg-teal-deep text-center cursor-pointer hover:border-sand">
                  {newGalleryImage.src ? (
                    <div className="relative aspect-[4/3] w-full max-h-40 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={newGalleryImage.src} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <>
                      <Upload className="w-6 h-6 text-sand mb-2" />
                      <span className="text-xs text-ivory">Click to select photo</span>
                      <span className="text-[10px] text-ivory/50 mt-1">Uploads directly to Cloudinary</span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      setIsUploading(true);
                      setUploadingTarget("modal-gallery");
                      const url = await uploadFileToCloudinary(file);
                      setIsUploading(false);
                      setUploadingTarget(null);
                      if (url) setNewGalleryImage({ ...newGalleryImage, src: url });
                    }}
                  />
                </label>
                {isUploading && uploadingTarget === "modal-gallery" && (
                  <p className="text-xs text-sand flex items-center gap-1 mt-1">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Uploading to Cloudinary...
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs uppercase text-sand font-medium mb-1">2. Gallery Category *</label>
                <select
                  value={newGalleryImage.category}
                  onChange={(e) => setNewGalleryImage({ ...newGalleryImage, category: e.target.value })}
                  className="w-full border border-sand/30 bg-teal-deep px-3 py-2 text-xs text-ivory outline-none focus:border-sand"
                >
                  <option value="The Homestay">The Homestay</option>
                  <option value="Lake & Nature">Lake & Nature</option>
                  <option value="Wildlife & Heritage">Wildlife & Heritage</option>
                  <option value="Homestay Life">Homestay Life</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase text-sand font-medium mb-1">3. Caption / Description</label>
                <input
                  type="text"
                  placeholder="e.g. Garden sitting area under evening sunset"
                  value={newGalleryImage.alt}
                  onChange={(e) => setNewGalleryImage({ ...newGalleryImage, alt: e.target.value })}
                  className="w-full border border-sand/30 bg-teal-deep px-3 py-2 text-xs text-ivory outline-none focus:border-sand"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowGalleryModal(false)}
                  className="px-4 py-2 border border-sand/20 text-ivory text-xs uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newGalleryImage.src || isUploading}
                  className="px-5 py-2 bg-sand text-teal-deep text-xs font-semibold uppercase tracking-wider disabled:opacity-50"
                >
                  Publish to Gallery
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
