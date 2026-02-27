import cloudinary from "@/src/lib/cloudinary";
import { NextResponse } from "next/server";
import sharp from "sharp";

export async function POST(req) {
  try {
    const formData = await req.formData();
    let files = formData.getAll("files");
    if (!files || files.length === 0) {
      const single = formData.get("file");
      if (single) files = [single];
    }

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const uploads = await Promise.all(
      files.map(async (file) => {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Convert to WebP for optimization
        const webpBuffer = await sharp(buffer)
          .webp({ quality: 80 })
          .toBuffer();

        const result = await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              { folder: "nextjs_uploads", format: "webp" },
              (error, result) => {
                if (error) reject(error);
                else resolve(result);
              }
            )
            .end(webpBuffer);
        });
        return { url: result.secure_url, public_id: result.public_id };
      })
    );

    return NextResponse.json({ uploads });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
