
import mongoose from "mongoose";
import { USER_ROLES, DOCUMENT_TYPES } from "../constants/index.js";


const addressSchema = new mongoose.Schema(
    {
        label: {
            type: String,
            enum: ["home", "work"],
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

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },

        lastName: {
            type: String,
            required: true
        },

        images: {
            type: [String],
            default: []
        },        

        email: {
            type: String,
            required: true,
            unique: true
        },

        addresses: {
            type: [addressSchema],
            required: true,
            default: []
        },

        password: {
            type: String,
            required: true
        },

        role: {
            type: String,
            enum: Object.values(USER_ROLES),
            default: USER_ROLES.CUSTOMER
        },


        // info adicional dooumentos para verificar la identidad, 
        // licencia de conducir, comprobante de entrega.

        documents: {
            type: [{ type: String, enum: Object.values(DOCUMENT_TYPES) }],
            default: []
        },


    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model("User", userSchema);