import { Router } from "express";
import path from "path";
import { ProductManager } from "../productManager.js";

const viewsRouter = Router();
const productManager = new ProductManager(path.resolve("./public/products.json"));


viewsRouter.get("/", async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.render("home", {
            products: products
        });
    } catch (err) {
        res.status(404).send(err);
    }
});

viewsRouter.get("/realtimeproducts", async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.render("realTimeProducts", {
            products: products
        });
    } catch (err) {
        res.status(404).send(err);
    }
});


export default viewsRouter;