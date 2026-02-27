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
    images: [
      {
        url: String,
        public_id: String,
      },
    ],
    sizes: [String],
    category: [String],
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);