import { Router } from "express";
import DbManager from "../dao/dbManager.js";

const productsRouter = Router();
const dbManager = new DbManager();


productsRouter.get("/", async (req, res) => {
    try {
        const products = await dbManager.getProducts();
        res.send(products);
    } catch (err) {
        res.status(500).send(err);
    }
});

productsRouter.get("/:pcode", async (req, res) => {
    try {
        const code = parseInt(req.params.pcode);
        const product = await dbManager.getProductByCode(code);
        res.send(product);
    } catch (err) {
        res.status(404).send(err);
    }
});

productsRouter.post("/", async (req, res) => {
    try {
        dbManager.addProduct(req.body);
        res.sendStatus(200);
    } catch (err) {
        res.status(500).send(err);
    }
});

productsRouter.put("/:pcode", async (req, res) => {
    try {
        dbManager.updateProduct(req.params.pcode, req.body);
        res.sendStatus(200);
    } catch (err) {
        res.status(500).send(err);
    }
});

productsRouter.delete("/:pcode", async (req, res) => {
    try {
        dbManager.deleteProduct(req.params.pcode);
        res.sendStatus(200);
    } catch (err) {
        res.status(500).send(err);
    }
});


export default productsRouter;