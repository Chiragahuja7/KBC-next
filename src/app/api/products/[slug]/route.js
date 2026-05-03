import connectDB from "@/src/lib/mongodb";
import Product from "@/src/models/Product";
import { NextResponse } from "next/server";
import { optimizeProduct } from "@/src/lib/optimizeImage";

export async function GET(req, context) {
  try {
    await connectDB();

    const params = await context.params;
    const slug = params.slug;

    const productRaw = await Product.findOne({
      slug: slug
    }).lean();

    if (!productRaw) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    const product = optimizeProduct(productRaw);

    return NextResponse.json({ success: true, product });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
