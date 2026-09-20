/**
 * Cloudinary & Web Image Optimization Utility
 *
 * Automatically injects Cloudinary on-the-fly transformations:
 * - f_auto (format: WebP / AVIF based on browser support)
 * - q_auto (quality: perceptual compression, drops file sizes by 60–90%)
 * - c_limit,w_{width} (prevents loading huge 4K camera photos on smaller viewports)
 */

export interface OptimizeOptions {
  width?: number;
  height?: number;
  quality?: "auto" | "auto:best" | "auto:good" | "auto:eco" | "auto:low" | number;
  format?: "auto" | "webp" | "avif" | "jpg" | "png";
  crop?: "limit" | "fill" | "scale" | "thumb" | "crop";
}

export function optimizeImage(
  url: string | undefined | null,
  options: OptimizeOptions = {}
): string {
  if (!url || typeof url !== "string") return url || "";

  // Cloudinary URL Optimization
  if (url.includes("res.cloudinary.com") && url.includes("/upload/")) {
    const {
      width,
      height,
      quality = "auto",
      format = "auto",
      crop = "limit",
    } = options;

    // Avoid double transforming if already transformed
    if (
      url.includes("/image/upload/f_auto") ||
      url.includes("/image/upload/q_auto") ||
      url.includes("/image/upload/w_")
    ) {
      return url;
    }

    const parts: string[] = [];
    if (format) parts.push(`f_${format}`);
    if (quality) parts.push(`q_${quality}`);
    if (crop && (width || height)) parts.push(`c_${crop}`);
    if (width) parts.push(`w_${width}`);
    if (height) parts.push(`h_${height}`);

    const transformStr = parts.join(",");
    if (!transformStr) return url;

    const uploadMarker = "/image/upload/";
    const splitIndex = url.indexOf(uploadMarker);
    if (splitIndex !== -1) {
      const before = url.slice(0, splitIndex + uploadMarker.length);
      const after = url.slice(splitIndex + uploadMarker.length);
      return `${before}${transformStr}/${after}`;
    }
  }

  // Unsplash Optimization
  if (url.includes("images.unsplash.com")) {
    try {
      const parsed = new URL(url);
      parsed.searchParams.set("auto", "format");
      parsed.searchParams.set("fit", "crop");
      if (options.quality) {
        parsed.searchParams.set(
          "q",
          typeof options.quality === "number" ? String(options.quality) : "80"
        );
      }
      if (options.width) parsed.searchParams.set("w", String(options.width));
      return parsed.toString();
    } catch {
      return url;
    }
  }

  return url;
}
