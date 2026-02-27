import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    customerName: String,
    phone: String,
    email: String,
    pincode: String,
    address: String,

    items: [
      {
        productId: mongoose.Schema.Types.ObjectId,
        name: String,
        price: Number,
        qty: Number,
        image: String,
      },
    ],

    totalAmount: Number,

    paymentStatus: {
      type: String,
      default: "pending",
    },

    orderStatus: {
      type: String,
      default: "placed",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order ||
  mongoose.model("Order", OrderSchema);