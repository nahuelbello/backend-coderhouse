import mongoose from "mongoose";
import productModel from "./models/product.model.js";
import cartModel from "./models/cart.model.js";


class DbManager {
    async read() {
        try {
            const products = await productModel.find();
            return products;
        } catch (err) {
            throw err;
        }
    }
}


export default DbManager;