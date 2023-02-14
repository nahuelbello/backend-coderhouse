import productsModel from "./models/products.model.js";
import cartsModel from "./models/carts.model.js";


class ProductManager {

    // Trae todos los productos.
    async getProducts(params) {
        try {
            const products = await productsModel.paginate(params.query ? { category: params.query } : {}, {
                sort: { price: parseInt(params.sort) },
                limit: parseInt(params.limit) || 10,
                page: parseInt(params.page) || 1
            });
            return products;
        } catch (err) {
            throw err;
        }
    }

    // Trae el producto que corresponde al id ingresado. Si no lo encuentra, devuelve error.
    async getProductById(pid) {
        try {
            const product = await productsModel.findOne({ _id: pid });
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
            await productsModel.create(prod);
        }
        catch (err) {
            throw(err);
        }
    }

    // Actualiza el producto que corresponde al id ingresado. Si no lo encuentra, devuelve error.
    // Si se intenta modificar el code o el id, lo ignora.
    async updateProduct(pid, product) {
        try {
            const prod = await this.getProductById(pid);
            await productsModel.updateOne(
                { _id: pid },
                {
                    $set: {
                        title: product.title || prod.title,
                        description: product.description || prod.description,
                        price: product.price || prod.price,
                        thumbnails: product.thumbnails || prod.thumbnails,
                        stock: product.stock || prod.stock,
                        category: product.category || prod.category,
                        status: product.status
                    },
                }
            );
        }
        catch (err) {
            throw(err);
        }
    }

    // Elimina el producto que corresponde al id ingresado. Si no lo encuentra, devuelve error.
    async deleteProduct(pid) {
        try {
            await productsModel.deleteOne({ _id: pid })
        }
        catch (err) {
            throw(err);
        }
    }
};


class CartManager {

    // Trae todos los carritos.
    async getCarts() {
        try {
            const carts = await cartsModel.find();
            return carts;
        }
        catch (err) {
            throw(err);
        }
    }

    // Trae el carrito que corresponde al id ingresado. Si no lo encuentra, devuelve error.
    async getCartById(cid) {
        try {
            const cart = await cartsModel.findOne({ _id: cid });
            return cart;
        }
        catch (err) {
            throw(err);
        }
    }    

    // Crea un carrito nuevo con un array de productos vacio.
    async addCart() {
        try {
            await cartsModel.create({});
        }
        catch (err) {
            throw(err);
        }
    }

    // Agrega un producto al carrito indicado en "idCart".
    async addProduct(cid, pid, quantity) {
        try {
            const cart = await cartsModel.findById(cid);
            const product =  cart.products.find(p => p.product.toString() === pid.toString())
            product ? product.quantity = quantity : cart.products.push({ product:pid, quantity: quantity });
            await cartsModel.updateOne({ _id: cid },cart)
        } catch (err) {
            throw(err);
        }
    }

    // Elimina un producto agregado al carrito.
    async deleteProduct(cid, pid) {
        try {
            const cart = await cartsModel.findOne({ _id: cid });
            const product = cart.products.findIndex(p=> p.product.toString() === pid.toString());
            
            cart.products.splice(product, 1)
            const productsUpdated = { products: cart.products }
            await cartsModel.findByIdAndUpdate(cid, productsUpdated);
        } catch (err) {
            throw(err);
        }
    }

    // Vacia carrito.
    async deleteAllProducts(cid) {
        try {
            await cartsModel.findByIdAndUpdate(cid, { products: [] });
        } catch (err) {
            throw(err);
        }
    }
};


export { ProductManager, CartManager };