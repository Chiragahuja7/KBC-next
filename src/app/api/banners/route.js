import connectDB from "@/src/lib/mongodb";
import Banner from "@/src/models/Banner";
import cloudinary from "@/src/lib/cloudinary";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();
        const banners = await Banner.find().sort({ order: 1 });
        return NextResponse.json({ success: true, banners });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message });
    }
}

export async function POST(req) {
    try {
        await connectDB();
        const body = await req.json();
        const banner = await Banner.create(body);
        return NextResponse.json({ success: true, banner });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message });
    }
}

export async function DELETE(req) {
    try {
        await connectDB();
        const { id } = await req.json();
        if (!id) return NextResponse.json({ success: false, error: "Provide id" });

        const banner = await Banner.findById(id);
        if (!banner) return NextResponse.json({ success: false, error: "Banner not found" });

        if (banner.image?.public_id) {
            await cloudinary.uploader.destroy(banner.image.public_id);
        }

        await Banner.findByIdAndDelete(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message });
    }
}
