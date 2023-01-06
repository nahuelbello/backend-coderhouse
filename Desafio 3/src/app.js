import express from "express";
import path from "path";
import ProductManager from "./productManager.js";

const app = express();
const PORT = 8080;
const productManager = new ProductManager(path.resolve("./public/products.json"));



app.get("/", (req, res) => {
    res.send("¡Bienvenido/a!");
});

app.get("/products", async (req, res) => {
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

app.get("/products/:pid", async (req, res) => {
    try {
        const PRODUCT = parseInt(req.params.pid);
        const RESULT = await productManager.getProductById(PRODUCT);
        if (RESULT) {
            res.send(RESULT);
        }
    } catch (err) {
        res.status(404).send(err);
    }
});



app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});