import mongoose from "mongoose";

const useCollection = "carts";

const userSchema = new mongoose.Schema({
    products: Array
});

const cartModel = mongoose.model(useCollection, userSchema);

export default cartModel;