import { Schema, model } from "mongoose";


const useCollection = "products";

const userSchema = new Schema(
    {
        title: { type: String, require: true },
        description: { type: String, require: true },
        code: { type: String, require: true },
        price: { type: Number, require: true },
        status: { type: Boolean, default: true },
        stock: { type: Number, require: true },
        category: { type: String, require: true },
        thumbnails: { type: String, require: true }
    },
    { versionKey: false }
);

const productModel = model(useCollection, userSchema);


export default productModel;