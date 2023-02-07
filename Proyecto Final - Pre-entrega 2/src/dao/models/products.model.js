import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";


const productsCollection = "products";

const productSchema = new Schema(
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

userSchema.plugin(mongoosePaginate);
const productsModel = model(productsCollection, productSchema);


export default productsModel;