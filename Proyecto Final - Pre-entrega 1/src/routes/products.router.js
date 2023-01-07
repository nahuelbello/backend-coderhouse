import {Router} from 'express';
import path from "path";
import {ProductManager} from "../productManager.js";

const productsRouter = Router();
const productManager = new ProductManager(path.resolve("./public/products.json"));


productsRouter.get("/", async (req, res) => {
    try {
        const PRODUCTS = await productManager.getProducts();
        const LIMIT = req.query.limit;
        if (LIMIT) {
            res.send(PRODUCTS.slice(0, LIMIT));
        }
        if (PRODUCTS) {
            res.send(PRODUCTS);
        }
    } catch (err) {
        res.status(404).send(err);
    }
});

productsRouter.get("/:pid", async (req, res) => {
    try {
        const ID = parseInt(req.params.pid);
        const PRODUCT = await productManager.getProductById(ID);
        if (PRODUCT) {
            res.send(PRODUCT);
        }
    } catch (err) {
        res.status(404).send(err);
    }
});

productsRouter.post("/", async (req, res) => {
    try {
        productManager.addProduct(req.body);
        res.sendStatus(200);
    } catch (err) {
        res.status(500).send(err);
    }
});

productsRouter.put("/:pid", async (req, res) => {
    try {
        const ID = parseInt(req.params.pid);
        productManager.updateProduct(ID, req.body);
        res.sendStatus(200);
    } catch (err) {
        res.status(500).send(err);
    }
});

productsRouter.delete("/:pid", async (req, res) => {
    try {
        const ID = parseInt(req.params.pid);
        productManager.deleteProduct(ID);
        res.sendStatus(200);
    } catch (err) {
        res.status(500).send(err);
    }
});

export default productsRouter;