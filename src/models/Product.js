import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: String,
    slug: {
      type: String,
      unique: true,
    },
    description: String,
    price: Number,
    oldPrice: Number,
    isBestSeller: { type: Boolean, default: false },
    isMostPopular: { type: Boolean, default: false },
    isListed: { type: Boolean, default: true },
    images: [
      {
        url: String,
        public_id: String,
      },
    ],
    sizes: [
      {
        label: String,
        price: Number,
        oldPrice: Number,
        image: {
          url: String,
          public_id: String,
        },
      },
    ],
    colors: [String],
    category: [String],
  },
  { timestamps: true }
);

const Product = mongoose.models.Product
  ? (delete mongoose.models.Product, mongoose.model("Product", ProductSchema))
  : mongoose.model("Product", ProductSchema);

export default Product;