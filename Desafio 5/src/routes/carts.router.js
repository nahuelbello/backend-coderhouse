import { Router } from 'express';
import path from "path";
// import { CartManager } from "../productManager.js";

const cartsRouter = Router();
// const cartManager = new CartManager(path.resolve("./public/carts.json"));


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