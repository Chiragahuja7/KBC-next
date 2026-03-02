import mongoose from "mongoose";

const BannerSchema = new mongoose.Schema(
    {
        image: {
            url: String,
            public_id: String,
        },
        link: String,
        order: { type: Number, default: 0 },
    },
    { timestamps: true }
);

export default mongoose.models.Banner ||
    mongoose.model("Banner", BannerSchema);
