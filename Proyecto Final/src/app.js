import express from "express";
import cartsRouter from "./routes/carts.router.js";
import productsRouter from "./routes/products.router.js";

const app = express();
const PORT = process.env.PORT || 8080;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static("public"));


app.use("/api/carts", cartsRouter);
app.use("/api/products", productsRouter);


app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
});