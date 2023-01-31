import { Router } from "express";
import { ProductManager } from "../dao/dbManager.js";


const viewsRouter = Router();
const productManager = new ProductManager();


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