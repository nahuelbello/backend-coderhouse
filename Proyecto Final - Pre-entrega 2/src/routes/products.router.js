import { Router } from "express";
import { ProductManager } from "../dao/dbManager.js";


const productsRouter = Router();
const productManager = new ProductManager();


// Trae los productos de la categoria especificada (opcional), los ordena (opcional) y los pagina (opcional).
productsRouter.get("/", async (req, res) => {
    try {
        const products = await productManager.getProducts(req.query || {});
        res.send({ status: 'success', products: products });
        await productManager.getProducts(req.query || {}).then(products => {
            res.render("index", {
                products: products.docs.map(products => products.toJSON())
            })
        });
    } catch (err) {
        res.status(500).send(err);
    }
});


// Trae un producto por ID.
productsRouter.get("/:pid", async (req, res) => {
    try {
        const product = await productManager.getProductById(req.params.pid);
        res.send(product);
    } catch (err) {
        res.status(500).send(err);
    }
});


// Crea un producto.
productsRouter.post("/", async (req, res) => {
    try {
        await productManager.addProduct(req.body);
        res.sendStatus(200);
    } catch (err) {
        res.status(500).send(err);
    }
});


// Modifica un producto.
productsRouter.put("/:pid", async (req, res) => {
    try {
        await productManager.updateProduct(req.params.pid, req.body);
        res.sendStatus(200);
    } catch (err) {
        res.status(500).send(err);
    }
});


// Elimina un producto.
productsRouter.delete("/:pid", async (req, res) => {
    try {
        await productManager.deleteProduct(req.params.pid);
        res.sendStatus(200);
    } catch (err) {
        res.status(500).send(err);
    }
});


export default productsRouter;