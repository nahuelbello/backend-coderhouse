import { Router } from "express";
import { ProductManager } from "../dao/dbManager.js";


const viewsRouter = Router();
const productManager = new ProductManager();


// Vista home.
viewsRouter.get("/", async (req, res) => {
    try {
        // HACER VISTA HOME
    } catch (err) {
        res.status(404).send(err);
    }
});


// Trae los productos de la categoria especificada (opcional), los ordena (opcional) y los pagina (opcional).
viewsRouter.get("/realtimeproducts", async (req, res) => {
    try {
        await productManager.getProducts(req.query || {}).then(products => {
            res.render("index", {
                products: products.docs.map(products => products.toJSON())
            })
        });
    } catch (err) {
        res.status(404).send(err);
    }
});


export default viewsRouter;