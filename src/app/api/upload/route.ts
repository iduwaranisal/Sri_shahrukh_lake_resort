import { NextRequest, NextResponse } from "next/server";
import { uploadImageToCloudinary } from "@/lib/cloudinary";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "srishahrukh";

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided in request" },
        { status: 400 }
      );
    }

    if (file.size > 15 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: "File exceeds 15MB limit" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const mime = file.type || "image/jpeg";
    const base64 = `data:${mime};base64,${buffer.toString("base64")}`;

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
