import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: String,
    slug: {
      type: String,
      unique: true,
    },
    description: String,
    // price: Number,
    images: [
      {
        url: String,
        public_id: String,
      },
    ],
    sizes: [
      {
        size: String,
        price: Number,     
        oldPrice: Number,   
        // stock
        image: {
          url: String,
          public_id: String,
        },
      },
    ],
    category: [String],
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);

//   const ProductSchema = new mongoose.Schema(
//   {
//     name: String,
//     slug: {
//       type: String,
//       unique: true,
//     },
//     description: String,

//     images: [
//       {
//         url: String,
//         public_id: String,
//       },
//     ],

//     sizes: [
//       {
//         size: String,
//         price: Number,     
//         oldPrice: Number,   
//         stock: Number,
//         image: {
//           url: String,
//           public_id: String,
//         },
//       },
//     ],

//     category: String,
//   },
//   { timestamps: true }
// );