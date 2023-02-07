import { Router } from "express";
import { ProductManager } from "../dao/dbManager.js";
import productsModel from "../dao/models/products.model.js";


const viewsRouter = Router();
const productManager = new ProductManager();


viewsRouter.get("/:limit/:page/:sort/:query", async (req, res) => {
    try {
        const params = {
            limit: req.params.limit || 10,
            page: req.params.page || 1,
            sort: req.params.sort || "",
            query: req.params.query || ""
        }

        const pipeline = await productsModel.aggregate([ 
            { $match: { category: query } },
            { $sort: { sort } }
        ]);
 
        const products = await productManager.getProducts();

        const devolver = {
            status: "success/error",
            payload: "resultado de los productos solicitados",
            prevPage: "pagina anterior",
            nextPage: "pagina siguiente",
            page: "pagina actual",
            hasPrevPage: "indicador para saber si hay pagina anterior",
            hasNextPage: "indicador para saber si hay pagina siguiente",
            prevLink: "link directo a la pagina previa. null si hasPrevPage = false",
            nextLink: "link directo a la pagina siguiente. null si hasNextPage = false"
        }
        res.render("index", { products: products });
    } catch (err) {
        res.status(404).send(err);
    }
});


export default viewsRouter;