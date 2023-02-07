import { Router } from "express";
import { ProductManager } from "../dao/fileSystem.js";


const productsRouter = Router();
const productManager = new ProductManager();


productsRouter.get("/", async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.send(products);
    } catch (err) {
        res.status(500).send(err);
    }
});

productsRouter.get("/:pid", async (req, res) => {
    try {
        const product = await productManager.getProductById(req.params.pid);
        res.send(product);
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
        productManager.updateProduct(req.params.pid, req.body);
        res.sendStatus(200);
    } catch (err) {
        res.status(500).send(err);
    }
});

productsRouter.delete("/:pid", async (req, res) => {
    try {
        productManager.deleteProduct(req.params.pid);
        res.sendStatus(200);
    } catch (err) {
        res.status(500).send(err);
    }
});


export default productsRouter;