import { Router } from "express";
import { ProductManager } from "../dao/dbManager.js";
import productsModel from "../dao/models/products.model.js";


const viewsRouter = Router();
const productManager = new ProductManager();


viewsRouter.get("/", async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.render("index", { products: products });
    } catch (err) {
        res.status(404).send(err);
    }
});


viewsRouter.get("/products", async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;
        const sort = parseInt(req.query.sort);
        const query = req.query.query;
        console.log(typeof(query))
        const paginate = await productsModel.paginate({query}, {
            sort: { price: sort },
            limit: limit,
            page: page
        });

        // El forEach parece que está al pedo, pero si no lo hago, handlebars me tira error y no me renderiza nada.
        const products = [];
        paginate.docs.forEach(e => {
            const prod = {
                _id: e._id,
                title: e.title,
                description: e.description,
                code: e.code,
                price: e.price,
                status: e.status,
                stock: e.stock,
                category: e.category,
                thumbnails: e.thumbnails
            }
            products.push(prod);
        });
        console.log(paginate);

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