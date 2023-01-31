import express from "express";
import mongoose from "mongoose";
import handlebars from "express-handlebars";
import cartsRouter from "./routes/carts.router.js";
import productsRouter from "./routes/products.router.js";
// import viewsRouter from "./routes/views.router.js";


const app = express();
const PORT = process.env.PORT || 8080;
const httpServer = app.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`));
// const socketServer = new Server(httpServer);


app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views/");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
// app.use("/", viewsRouter);


mongoose.connect("mongodb+srv://nahuelbe:nahuelbe@cluster0.9jlfml1.mongodb.net/ecommerce?retryWrites=true&w=majority", (error) => {
    if (error) {
        console.log("Error de conexion");
    } else {
        console.log("Conectado a la base de datos");
    }
});


/*
socketServer.on("connection", socket => {
    console.log("Cliente conectado");

    socket.on("add", (data) => {
        try {
            productManager.addProduct(data);
            // res.sendStatus(200);
        } catch (err) {
            // res.status(500).send(err);
        }
    });

    socket.on("delete", (data) => {
        try {
            const id = parseInt(data);
            productManager.deleteProduct(id);
            // res.sendStatus(200);
        } catch (err) {
            // res.status(500).send(err);
        }
    }); 
});
*/
