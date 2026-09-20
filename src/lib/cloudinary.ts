import { v2 as cloudinary } from "cloudinary";

// Configure with CLOUDINARY_URL or explicit credentials with fallback
if (process.env.CLOUDINARY_URL) {
  cloudinary.config({
    cloudinary_url: process.env.CLOUDINARY_URL,
    secure: true,
  });
} else {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "znj9faa6",
    api_key: process.env.CLOUDINARY_API_KEY || "811945456774955",
    api_secret: process.env.CLOUDINARY_API_SECRET || "KUgrkTKqp-1d_VvCLNca-ihHOmE",
    secure: true,
  });
}

export async function uploadImageToCloudinary(
  base64Data: string,
  folder = "srishahrukh"
): Promise<{ url: string; publicId: string }> {
  const uploadResponse = await cloudinary.uploader.upload(base64Data, {
    folder,
    resource_type: "auto",
    transformation: [
      { quality: "auto", fetch_format: "auto" }
    ],
  });

  return {
    url: uploadResponse.secure_url,
    publicId: uploadResponse.public_id,
  };
}

export default cloudinary;
