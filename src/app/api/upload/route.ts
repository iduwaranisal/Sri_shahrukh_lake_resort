import { NextRequest, NextResponse } from "next/server";
import { uploadImageToCloudinary } from "@/lib/cloudinary";
import { verifyToken, COOKIE_NAME } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/gif",
  "image/svg+xml",
]);

export async function POST(req: NextRequest) {
  try {
    // 1. Enforce Admin Authentication
    const sessionCookie = req.cookies.get(COOKIE_NAME);
    if (!sessionCookie || !verifyToken(sessionCookie.value)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Admin session required to upload files." },
        { status: 401 }
      );
    }

    // 2. Parse Form Data
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "srishahrukh";

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided in request" },
        { status: 400 }
      );
    }

    // 3. Validate MIME type
    const mime = file.type?.toLowerCase() || "image/jpeg";
    if (!ALLOWED_MIME_TYPES.has(mime)) {
      return NextResponse.json(
        { success: false, error: `Unsupported file format (${mime}). Only images are permitted.` },
        { status: 400 }
      );
    }

    // 4. Validate file size (15MB max)
    if (file.size > 15 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: "File exceeds 15MB limit" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = `data:${mime};base64,${buffer.toString("base64")}`;

    // 5. Upload to Cloudinary
    const res = await uploadImageToCloudinary(base64, folder);
    return NextResponse.json({
      success: true,
      url: res.url,
      publicId: res.publicId,
    });
  } catch (err: unknown) {
    const error = err as Error;
    console.error("[API Upload Error]", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Cloudinary upload failed",
      },
      { status: 500 }
    );
  }
}
