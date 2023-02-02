import { Router } from "express";
import { ProductManager } from "../dao/dbManager.js";


const viewsRouter = Router();
const productManager = new ProductManager();


viewsRouter.get("/", async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.render("index", {
            products: products.map(product => product.toJSON())
        });
    } catch (err) {
        res.status(404).send(err);
    }
});


export default viewsRouter;