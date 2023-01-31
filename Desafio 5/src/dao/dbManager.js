import mongoose from "mongoose";
import productModel from "./models/product.model.js";
import cartModel from "./models/cart.model.js";


class DbManager {
    async getProducts() {
        try {
            const products = await productModel.find();
            return products;
        } catch (err) {
            throw err;
        }
    }

    async getProductByCode(code) {
        try {
            const product = await productModel.findOne({ code: code });
            return product;
        }
        catch (err) {
            throw(err);
        }
    }

    async addProduct(product) {
        try {
            const prod = {
                title: product.title,
                description: product.description,
                code: product.code,
                price: product.price,
                thumbnail: product.thumbnail,
                stock: product.stock,
                category: product.category,
                status: product.status
            }
            await productModel.create(prod);
        }
        catch (err) {
            throw(err);
        }
    }

    async updateProduct(code, product) {
        try {
            const prod = await this.getProductByCode(code);
            await productModel.updateOne(
                { code: code },
                {
                    $set: {
                        title: product.title || prod.title,
                        description: product.description || prod.description,
                        price: product.price || prod.price,
                        thumbnail: product.thumbnail || prod.thumbnail,
                        stock: product.stock || prod.stock,
                        category: product.category || prod.category,
                        status: product.status || prod.status
                    },
                }
            );
        }
        catch (err) {
            throw(err);
        }
    }

    async deleteProduct(code) {
        try {
            await productModel.deleteOne({ code: code })
        }
        catch (err) {
            throw(err);
        }
    }
}


export default DbManager;