import { auth } from "@/src/lib/auth";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const ALLOWED_EXTENSIONS = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
] as const;

const MAX_FILE_SIZE = 5;

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function uploadToCloudinary(
  buffer: Buffer,
  userId: string,
): Promise<UploadApiResponse> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: "avatars",
          public_id: `user_${userId}`,
          overwrite: true,
          transformation: [
            { width: 400, height: 400, crop: "fill", gravity: "face" },
          ],
          format: "webp",
        },
        (error, result) => {
          if (error || !result)
            return reject(error ?? new Error("Cloudinary upload failed"));
          resolve(result);
        },
      )
      .end(buffer);
  });
}

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session)
    return NextResponse.json(
      { error: "User is not authenticated" },
      { status: 401 },
    );

  const formData = await req.formData();
  const file = formData.get("file");

  if (!(file instanceof File))
    return NextResponse.json({ error: "No file provided" }, { status: 400 });

  if (
    !ALLOWED_EXTENSIONS.includes(
      file.type as (typeof ALLOWED_EXTENSIONS)[number],
    )
  )
    return NextResponse.json(
      { error: "Invalid file type. Allowed: JPEG, PNG, WEBP, HEIC" },
      { status: 415 },
    );

  if (file.size > MAX_FILE_SIZE * 1024 * 1024)
    return NextResponse.json(
      { error: `Image must be smaller than ${MAX_FILE_SIZE}MB` },
      { status: 413 },
    );

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await uploadToCloudinary(buffer, session.user.id);
    return NextResponse.json({ url: result.secure_url }, { status: 200 });
  } catch (error) {
    console.error("[upload-avatar] Cloudinary error:", error);

    return NextResponse.json(
      { error: "Failed to upload image. Please try again." },
      { status: 500 },
    );
  }
}
