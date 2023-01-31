import { Router } from "express";
import DbManager from "../dao/dbManager.js";

const viewsRouter = Router();
const dbManager = new DbManager();


viewsRouter.get("/", async (req, res) => {
    try {
        const products = await dbManager.getProducts();
        res.render("home", {
            products: products
        });
    } catch (err) {
        res.status(404).send(err);
    }
});

viewsRouter.get("/realtimeproducts", async (req, res) => {
    try {
        const products = await dbManager.getProducts();
        res.render("realTimeProducts", {
            products: products
        });
    } catch (err) {
        res.status(404).send(err);
    }
});


export default viewsRouter;