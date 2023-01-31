import { Router } from "express";
import DbManager from "../dao/dbManager.js";

const cartsRouter = Router();
const dbManager = new DbManager();


/*
cartsRouter.get("/:cid", async (req, res) => {
    try {
        const id = parseInt(req.params.cid);
        const cart = await cartManager.getCartById(id);
        if (cart) {
            res.send(cart);
        }
    } catch (err) {
        res.status(404).send(err);
    }
});

cartsRouter.post("/", async (req, res) => {
    try {
        cartManager.addCart();
        res.sendStatus(200);
    } catch (err) {
        res.status(500).send(err);
    }
});

cartsRouter.post("/:cid", async (req, res) => {
    try {
        const id = parseInt(req.params.cid);
        cartManager.addProduct(id, req.body);
        res.sendStatus(200);
    } catch (err) {
        res.status(500).send(err);
    }
});
*/

export default cartsRouter;