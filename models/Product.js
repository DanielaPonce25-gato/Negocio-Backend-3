
import mongoose from "mongoose";
import { USER_ROLES } from "../constants/index.js";

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        price: {
            type: Number,
            required: true
        },

        stock: {
            type: Number,
            required: true,
            default: 0
        },

        category: {
            type: String,
            required: true
        },

        images: {
            type: [String],
            default: []
        },

        seller: {
            type: mongoose.Schema.Types.ObjectId,  // obtiene el id del producto y refleja el modelo de producto
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model("Product", productSchema);