import { Router } from "express";
import { ProductManager } from "../dao/dbManager.js";


const viewsRouter = Router();
const productManager = new ProductManager();


// Vista home.
viewsRouter.get("/", async (req, res) => {
    try {
        res.render("index");
    } catch (err) {
        res.status(404).send(err);
    }
});


// Trae los productos de la categoria especificada (opcional), los ordena (opcional) y los pagina (opcional).
viewsRouter.get("/realtimeproducts", async (req, res) => {
    try {
        await productManager.getProducts(req.query || {}).then(products => {
            res.render("products", {
                products: products.docs.map(products => products.toJSON()),
                first_name: req.session.first_name,
                last_name: req.session.last_name
            })
        });
    } catch (err) {
        res.status(404).send(err);
    }
});


export default viewsRouter;