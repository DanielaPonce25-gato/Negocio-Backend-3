
import mongoose from "mongoose";
import { USER_ROLES, DOCUMENT_TYPES } from "../constants/index.js";

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

        email: {
            type: String,
            required: true,
            unique: true
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
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model("User", userSchema);