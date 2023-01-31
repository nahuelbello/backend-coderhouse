import { Router } from "express";
import { ProductManager } from "../dao/dbManager.js";

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

productsRouter.get("/:pcode", async (req, res) => {
    try {
        const code = parseInt(req.params.pcode);
        const product = await productManager.getProductByCode(code);
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

productsRouter.put("/:pcode", async (req, res) => {
    try {
        productManager.updateProduct(req.params.pcode, req.body);
        res.sendStatus(200);
    } catch (err) {
        res.status(500).send(err);
    }
});

productsRouter.delete("/:pcode", async (req, res) => {
    try {
        productManager.deleteProduct(req.params.pcode);
        res.sendStatus(200);
    } catch (err) {
        res.status(500).send(err);
    }
});


export default productsRouter;