import path from "path";
import express from "express";
import mongoose from "mongoose";
import { Server } from "socket.io"
import handlebars from "express-handlebars";
import cartsRouter from "./routes/carts.router.js";
import productsRouter from "./routes/products.router.js";
import viewsRouter from "./routes/views.router.js";
import { ProductManager } from "./dao/dbManager.js";


const productManager = new ProductManager();


const app = express();
const PORT = process.env.PORT || 8080;
const httpServer = app.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`));
const io = new Server(httpServer);


app.set("views", "./src/views/");
app.set("view engine", "hbs");
app.engine("hbs", handlebars.engine({
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    defaultLayout: "main",
    extname: ".hbs"
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);


mongoose.connect("mongodb+srv://nahuelbe:nahuelbe@cluster0.9jlfml1.mongodb.net/ecommerce?retryWrites=true&w=majority", (error) => {
    if (error) {
        console.log("Error de conexion");
    } else {
        console.log("Conectado a la base de datos");
    }
});


io.on("connection", socket => {
    console.log("Cliente conectado");

    socket.on("add", (product) => {
        try {
            productManager.addProduct(product);
            const products = productManager.getProducts();
            const data = render("realTimeProducts", {
                products: products.map(product => product.toJSON())
            });
            sockets.emit("refresh", data);
            // res.sendStatus(200);
        } catch (err) {
            // res.status(500).send(err);
        }
    });

    socket.on("delete", (id) => {
        try {
            productManager.deleteProduct(id);
            // res.sendStatus(200);
        } catch (err) {
            // res.status(500).send(err);
        }
    }); 
});