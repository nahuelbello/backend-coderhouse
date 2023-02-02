import { Schema, model } from "mongoose";


const useCollection = "carts";

const userSchema = new Schema(
    { products: Array },
    { versionKey: false }
);

const cartModel = model(useCollection, userSchema);


export default cartModel;