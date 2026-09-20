import { v2 as cloudinary } from "cloudinary";

// Automatically configures with CLOUDINARY_URL from process.env
cloudinary.config({
  secure: true,
});

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
