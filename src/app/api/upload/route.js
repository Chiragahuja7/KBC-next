import cloudinary from "@/src/lib/cloudinary";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files");
    if (!files || files.length === 0) {
      const single = formData.get("file");
      if (single) files.push(single);
    }

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const uploads = await Promise.all(
      files.map(async (file) => {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const result = await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream({ folder: "nextjs_uploads" }, (error, result) => {
              if (error) reject(error);
              else resolve(result);
            })
            .end(buffer);
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
