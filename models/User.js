
import mongoose from "mongoose";
import { USER_ROLES, DOCUMENT_TYPES } from "../constants/index.js";


const documentSchema = new mongoose.Schema(
    {
        originalName: {
            type: String,
            required: true
        },

        fileName: {
            type: String,
            required: true
        },

        path: {
            type: String,
            required: true
        },

        mimeType: {
            type: String,
            required: true
        },

        size: {
            type: String,
            required: true
        },

        type: {
            type: String,
            required: true 
        }
    },
    {
        timestamps: true
    }

)



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
            type: [documentSchema],
            default: []
        },


    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model("User", userSchema);