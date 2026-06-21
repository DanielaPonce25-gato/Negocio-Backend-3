
// Acontinuacion 

import mongoose from "mongoose";
import { ORDER_STATUS, DELIVERY_PRIORITY } from "../constants/index.js";

const orderSchema = new mongoose.Schema(
    {
        buyer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        products: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,  // obtiene el id del producto y refleja el modelo de producto
                    ref: "Product",
                    required: true
                },
        
                quantity: {
                    type: Number,
                    required: true,
                    default: 1
                }
            }
        ],

        total: {
            type: Number,
            required: true
        },

        status: {
            type: String,
            enum: Object.values(ORDER_STATUS),
            default: ORDER_STATUS.CREATED
        },

        priority: {
            type: String,
            enum: Object.values(DELIVERY_PRIORITY),
            default: DELIVERY_PRIORITY.NORMAL
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model("Order", orderSchema);