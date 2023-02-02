import productModel from "./models/product.model.js";
import cartModel from "./models/cart.model.js";


class ProductManager {

    // Trae todos los productos.
    async getProducts() {
        try {
            const products = await productModel.find().lean();
            return products;
        } catch (err) {
            throw err;
        }
    }

    // Trae el producto que que corresponde al id ingresado. Si no lo encuentra, devuelve error.
    async getProductById(id) {
        try {
            const product = await productModel.findOne({ _id: id }).lean();
            return product;
        }
        catch (err) {
            throw(err);
        }
    }

    // Agrega un producto a la coleccion. Si el code es el mismo que el de un producto previamente ingresado, devuelve error.
    // Define el atributo status en true por default.
    async addProduct(product) {
        try {
            const prod = {
                title: product.title,
                description: product.description,
                code: product.code,
                price: product.price,
                thumbnails: product.thumbnails,
                stock: product.stock,
                category: product.category,
                status: product.status
            }
            await productModel.create(prod);
        }
        catch (err) {
            throw(err);
        }
    }

    // Actualiza el producto que corresponde al id ingresado. Si no lo encuentra, devuelve error.
    // Si se intenta modificar el code o el id, lo ignora.
    async updateProduct(id, product) {
        try {
            const prod = await this.getProductById(id);
            await productModel.updateOne(
                { _id: id },
                {
                    $set: {
                        title: product.title || prod.title,
                        description: product.description || prod.description,
                        price: product.price || prod.price,
                        thumbnails: product.thumbnails || prod.thumbnails,
                        stock: product.stock || prod.stock,
                        category: product.category || prod.category,
                        status: product.status || prod.status
                    },
                }
            );
        }
        catch (err) {
            throw(err);
        }
    }

    // Elimina el producto que corresponde al id ingresado. Si no lo encuentra, devuelve error.
    async deleteProduct(id) {
        try {
            await productModel.deleteOne({ _id: id })
        }
        catch (err) {
            throw(err);
        }
    }
};


class CartManager {

    // Trae el carrito que corresponde al id ingresado. Si no lo encuentra, devuelve error.
    async getCartById(id) {
        try {
            const cart = await cartModel.findOne({ id: id }).lean();
            return cart;
        }
        catch (err) {
            throw(err);
        }
    }

    // Crea un carrito nuevo con un array de productos vacio.
    async addCart() {
        try {
            await cartModel.create({});
        }
        catch (err) {
            throw(err);
        }
    }

    // Agrega un producto al carrito indicado en "idCart". Si no encuentra el carrito, devuelve error.
    // Si el producto no existe, devuelve error. Si el producto ya fue ingresado, suma la cantidad nueva a la cantidad ya ingresada.
    async addProduct(idCart, product) {
        try {
            await cartModel.updateOne(
                { _id: idCart },
                {
                    $push: {
                            "products": {
                                product : product.id,
                                quantity: product.quantity
                            }
                    }
                }
            );
        } catch (err) {
            throw(err);
        }
    }
};


export { ProductManager, CartManager };