import { Router } from 'express';
import path from "path";
import DbManager from "../dao/dbManager.js";



const productsRouter = Router();
const dbManager = new DbManager(path.resolve("./public/products.json"));


productsRouter.get("/", async (req, res) => {
    try {
        const products = await dbManager.read();
        res.send(products);
    } catch (err) {
        res.status(500).send(err);
    }
});


/*
productsRouter.get("/:pid", async (req, res) => {
    try {
        const id = parseInt(req.params.pid);
        const product = await productManager.getProductById(id);
        if (product) {
            res.send(product);
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
        const id = parseInt(req.params.pid);
        productManager.updateProduct(id, req.body);
        res.sendStatus(200);
    } catch (err) {
        res.status(500).send(err);
    }
});

productsRouter.delete("/:pid", async (req, res) => {
    try {
        const id = parseInt(req.params.pid);
        productManager.deleteProduct(id);
        res.sendStatus(200);
    } catch (err) {
        res.status(500).send(err);
    }
});
*/


export default productsRouter;