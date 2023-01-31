import mongoose from "mongoose";


const useCollection = "products";

const userSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            require: true
        },
        description: {
            type: String,
            require: true
        },
        code: {
            type: String,
            require: true
        },
        price: {
            type: Number,
            require: true
        },
        thumbnail: {
            type: String,
            require: true
        },
        stock: {
            type: Number,
            require: true
        },
        category: {
            type: String,
            require: true
        },
        status: {
            type: Boolean,
            default: true
        }
    },
    { versionKey: false }
);

const productModel = mongoose.model(useCollection, userSchema);


export default productModel;