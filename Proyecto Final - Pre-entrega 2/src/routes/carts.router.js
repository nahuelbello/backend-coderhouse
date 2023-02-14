import { Router } from "express";
import { CartManager } from "../dao/dbManager.js";


const cartsRouter = Router();
const cartManager = new CartManager();


// Trae todos los carritos.
cartsRouter.get("/", async (req, res) => {
    try {
        const carts = await cartManager.getCarts();
        res.send(carts);
    } catch (err) {
        res.status(500).send(err);
    }
});


// Trae el carrito del ID ingresado junto a todos sus productos.
cartsRouter.get("/:cid", async (req, res) => {
    try {
        const cart = await cartManager.getCartById(req.params.cid);
        res.send(cart);
    } catch (err) {
        res.status(500).send(err);
    }
});


// Crea un carrito vacio.
cartsRouter.post("/", async (req, res) => {
    try {
        cartManager.addCart();
        res.sendStatus(200);
    } catch (err) {
        res.status(500).send(err);
    }
});


// Agrega un producto al carrito o modifica la cantidad de uno ya ingresado.
cartsRouter.put("/:cid/products/:pid", async (req, res) => {
    try {
        await cartManager.addProduct(req.params.cid, req.params.pid, req.body.quantity);
        res.sendStatus(200);
    } catch (err) {
        res.status(500).send(err);
    }
});


// Elimina un producto del carrito del ID ingresado.
cartsRouter.delete("/:cid/products/:pid", async (req, res) => {
    try {
        await cartManager.deleteProduct(req.params.cid, req.params.pid);
        res.sendStatus(200);  
    } catch (err) {
        res.status(500).send(err);
    }
});


// Vacia el carrito del ID ingresado.
cartsRouter.delete("/:cid", async (req, res) => {
    try {
        await cartManager.deleteAllProducts(req.params.cid);
        res.sendStatus(200);
    } catch (err) {
        res.status(500).send(err);
    }
});


export default cartsRouter;