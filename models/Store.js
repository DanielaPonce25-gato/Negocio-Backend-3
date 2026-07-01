import mongoose from "mongoose";

const storeSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        name: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            default: ""
        },

        address: {
            type: String,
            required: true
        },

        phone: {
            type: String,
            default: ""
        },

        email: {
            type: String,
            default: ""
        },

        image: {
            type: String,
            default: ""
        },

        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model("Store", storeSchema);