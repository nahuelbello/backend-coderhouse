import path from "path";
import express from "express";
import mongoose from "mongoose";
import { Server } from "socket.io"
import handlebars from "express-handlebars";
import cartsRouter from "./routes/carts.router.js";
import productsRouter from "./routes/products.router.js";
import viewsRouter from "./routes/views.router.js";
import chatRouter from "./routes/chat.router.js";
import { ProductManager } from "./dao/dbManager.js";
import messageModel from "./dao/models/message.model.js";


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
app.use("/chat", chatRouter);


mongoose.connect("mongodb+srv://nahuelbe:nahuelbe@cluster0.9jlfml1.mongodb.net/ecommerce?retryWrites=true&w=majority", (error) => {
    if (error) {
        console.log("Error de conexion");
    } else {
        console.log("Conectado a la base de datos");
    }
});


io.on("connection", socket => {
    console.log("Cliente conectado");

    socket.on("client:addProduct", async (product) => {
        try {
            await productManager.addProduct(product);
            const products = await productManager.getProducts();
            io.sockets.emit("server:addProduct", products);
        } catch (err) {
            throw (err);
        }
    });

    socket.on("client:deleteProduct", async (id) => {
        try {
            await productManager.deleteProduct(id);
            const products = await productManager.getProducts();
            io.sockets.emit("server:deleteProduct", products);
        } catch (err) {
            throw (err);
        }
    });

    socket.on("client:newMessage", async (data) => {
        try {
            await messageModel.create(data);
            const messages = await messageModel.find().lean();
            io.sockets.emit("server:newMessage", messages);
        } catch (err) {
            throw (err);
        }
    });

    socket.on("client:newUser", async (data) => {
        try {
            socket.user = data.user;
            socket.id = data.id;
            io.sockets.emit("server:newUser", {
                user: socket.user,
                id: socket.id
            });
        } catch (err) {
            throw (err);
        }
    });
});