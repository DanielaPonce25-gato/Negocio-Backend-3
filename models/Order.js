
import mongoose from "mongoose";
import { ORDER_STATUS, DELIVERY_PRIORITY } from "../constants/index.js";

const deliveryAddressSchema = new mongoose.Schema(  // la direccion de preferencia del usuario para la entrega de la orden
    {
        label: {
            type: String,
            required: true
        },

        address: {
            type: String,
            required: true
        },

        reference: {
            type: String,
            default: ""
        }
    },
    {
        _id: false
    }
);

const orderProductSchema = new mongoose.Schema(  // los productos que el usuario compra en la orden
    {
        
        image: {
            type: String,
            required: true
        },
        
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },

        name: {
            type: String,
            required: true
        },

        price: {
            type: Number,
            required: true
        },

        quantity: {
            type: Number,
            required: true,
            min: 1,
            default: 1
        }
    },
    {
        _id: false
    }
);

const orderSchema = new mongoose.Schema( // la orden es creada por el usuario
    {
        buyer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        store: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Store",
            required: true
        },

        products: {
            type: [orderProductSchema],
            required: true
        },

        deliveryAddress: {
            type: deliveryAddressSchema,
            required: true
        },

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
        },

        proof: {
            type: Object,
            default: null
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model("Order", orderSchema);