import connectDB from "@/src/lib/mongodb";
import Product from "@/src/models/Product";
import cloudinary from "@/src/lib/cloudinary";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    console.log("/api/products POST body:", body);

    if (body.price !== undefined) body.price = Number(body.price);
    if (body.oldPrice !== undefined) body.oldPrice = Number(body.oldPrice);

    const product = await Product.create(body);

    return NextResponse.json({
      success: true,
      product,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}

export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 6;
  const skip = (page - 1) * limit;

  const query = {};

  const category = searchParams.get("category");
  if (category) {
    query.category = new RegExp(category, "i");
  }

  const q = searchParams.get("q");
  if (q) {
    query.name = new RegExp(q, "i");
  }

  const inStock = searchParams.get("inStock");
  if (inStock === "true") query["sizes.0"] = { $exists: true };
  if (inStock === "false") query["sizes.0"] = { $exists: false };

  const min = searchParams.get("minPrice");
  const max = searchParams.get("maxPrice");

  if (min || max) {
    query["price"] = {};
    if (min) query["price"].$gte = Number(min);
    if (max) query["price"].$lte = Number(max);
  }

  const sortParam = searchParams.get("sort");
  let sortObj = { createdAt: -1 };
  if (sortParam) {
    switch (sortParam) {
      case "priceLowHigh":
        sortObj = { "price": 1 };
        break;
      case "priceHighLow":
        sortObj = { "price": -1 };
        break;
      case "AlphabeticalAZ":
        sortObj = { name: 1 };
        break;
      case "AlphabeticalZA":
        sortObj = { name: -1 };
        break;
      case "BestSeller":
        sortObj = { createdAt: -1 };
        break;
      default:
        sortObj = { createdAt: -1 };
    }
  }

  const [products, total] = await Promise.all([
    Product.find(query).sort(sortObj).skip(skip).limit(limit),
    Product.countDocuments(query),
  ]);

  return NextResponse.json({
    success: true,
    products,
    total,
    page,
    pages: Math.ceil(total / limit),
  });
}

export async function PUT(req) {
  try {
    await connectDB();

    const body = await req.json();
    console.log("/api/products PUT body:", body);
    const { id, slug, ...update } = body;

    if (!id && !slug) {
      return NextResponse.json({ success: false, error: "Provide id or slug to update" });
    }
    let product;
    if (update.price !== undefined) update.price = Number(update.price);
    if (update.oldPrice !== undefined) update.oldPrice = Number(update.oldPrice);

    if (id) {
      product = await Product.findByIdAndUpdate(id, update, { new: true });
    } else {
      product = await Product.findOneAndUpdate({ slug }, update, { new: true });
    }
    return NextResponse.json({ success: true, product });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

export async function DELETE(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { id, slug } = body;

    if (!id && !slug) {
      return NextResponse.json({
        success: false,
        error: "Provide id or slug to delete",
      });
    }

    let product;
    if (id) product = await Product.findById(id);
    else product = await Product.findOne({ slug });

    if (!product) {
      return NextResponse.json({
        success: false,
        error: "Product not found",
      });
    }

    const publicIds = [];

    if (Array.isArray(product.images)) {
      product.images.forEach((img) => {
        if (img?.public_id) publicIds.push(img.public_id);
      });
    }

    console.log("Deleting from Cloudinary:", publicIds);

    await Promise.all(
      publicIds.map(async (id) => {
        const res = await cloudinary.uploader.destroy(id);
        console.log(id, res.result);
      })
    );

    if (id) await Product.findByIdAndDelete(id);
    else await Product.findOneAndDelete({ slug });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}