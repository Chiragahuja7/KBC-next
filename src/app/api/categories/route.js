import connectDB from "@/src/lib/mongodb";
import Category from "@/src/models/Category";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();
        const categories = await Category.find().sort({ name: 1 });
        return NextResponse.json({ success: true, categories });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message });
    }
}

export async function POST(req) {
    try {
        await connectDB();
        const { name } = await req.json();
        if (!name?.trim()) {
            return NextResponse.json({ success: false, error: "Category name is required" });
        }
        const category = await Category.create({ name: name.trim() });
        return NextResponse.json({ success: true, category });
    } catch (error) {
        if (error.code === 11000) {
            return NextResponse.json({ success: false, error: "Category already exists" });
        }
        return NextResponse.json({ success: false, error: error.message });
    }
}

export async function DELETE(req) {
    try {
        await connectDB();
        const { id } = await req.json();
        if (!id) return NextResponse.json({ success: false, error: "Provide id" });
        await Category.findByIdAndDelete(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message });
    }
}
