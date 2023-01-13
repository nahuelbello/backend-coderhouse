import { Router } from "express";
import path from "path";
import { ProductManager } from "../productManager.js";

const viewsRouter = Router();
const productManager = new ProductManager(path.resolve("./public/products.json"));


viewsRouter.get("/", async (req, res) => {
    try {
        const PRODUCTS = await productManager.getProducts();
        res.render("home", {
            PRODUCTS
        });
    } catch (err) {
        res.status(404).send(err);
    }
});

viewsRouter.get("/realtimeproducts", async (req, res) => {
    try {
        const PRODUCTS = await productManager.getProducts();
        res.render("realTimeProducts", {
            PRODUCTS
        });
    } catch (err) {
        res.status(404).send(err);
    }
});

viewsRouter.post("/realtimeproducts", async (req, res) => {
    try {
        productManager.addProduct(req.body);
        res.sendStatus(200);
    } catch (err) {
        res.status(500).send(err);
    }
});

viewsRouter.delete("/realtimeproducts/:pid", async (req, res) => {
    console.log("asdas")
    try {
        const ID = parseInt(req.params.pid);
        productManager.deleteProduct(ID);
        res.sendStatus(200);
    } catch (err) {
        res.status(500).send(err);
    }
});




export default viewsRouter;