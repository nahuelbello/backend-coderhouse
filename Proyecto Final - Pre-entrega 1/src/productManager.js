import fs from "fs";
import path from "path";

class FileManager {
    constructor(path) {
        this.path = path;
    }

    // Busca un objeto dentro de un array segun el id especificado, sea carrito o producto.
    async findObject(array, id) {
        try {
            const INDEX = array.findIndex((object) => object.id === id);
            if (INDEX === -1) {
                throw new Error("No encontrado.");
            }
            return INDEX;
        } catch (err) {
            throw (err);
        } 
    }

    // Verifica que los campos obligatorios sean ingresados, si no, devuelve error.
    async validateObject(object) {
        try {
            if (object.title === undefined || object.description === undefined || object.code === undefined || object.price === undefined || object.status === undefined || object.stock === undefined || object.category === undefined) {
                throw new Error("Todos los campos (excepto Thumbnails) son obligatorios.");
            }
        } catch (err) {
            throw (err);
        }
    }

    // Trae todos los productos o carritos, segun corresponda.
    async getProducts() {
        try {
            const FILE = await fs.promises.readFile(this.path, "utf-8");
            if (FILE === "") {
                return [];
            }
            return JSON.parse(FILE);
        }
        catch (err) {
            throw(err);
        }
    }

    // Escribe el archivo indicado en cada constructor (productos o carritos).
    async writeFile(products) {
        return new Promise((resolve, reject) => {
            fs.writeFile(this.path, JSON.stringify(products, null, 2), (err) => {
            if (err) {
                reject(err);
            }
            resolve();
            });
        });
    }
};


class ProductManager extends FileManager {

    // Agrega un producto al archivo indicado en su constructor. Hace uso de la funcion validateObject(). Si ya existe, devuelve error.
    // Genera ID autoincrementable. Define el atributo status en true por default.
    async addProduct(product) {
        try {
            this.validateObject(product);
            const PRODUCTS = await this.getProducts();
            if (PRODUCTS.find((prod) => prod.code === product.code)) {
                throw new Error("El producto ya existe.");
            }
            product.status ? product.status : product.status = true;

            let new_product = null;
            const MAXID = PRODUCTS.reduce((max, product) => (product.id > max ? product.id : max), 0);
            if (MAXID > 0) {
                new_product = {
                    id: MAXID + 1,
                    ...product
                }
            } else {
                new_product = {
                    id: 1,
                    ...product
            }};
            PRODUCTS.push(new_product);
            await this.writeFile(PRODUCTS);
        }
        catch (err) {
            throw(err);
        }
    }

    // Trae el producto correspondiente segun el id ingresado. Si no lo encuentra, devuelve error.
    async getProductById(id) {
        try {
            const PRODUCTS = await this.getProducts();
            const INDEX = await this.findObject(PRODUCTS, id);
            return PRODUCTS[INDEX];
        }
        catch (err) {
            throw(err);
        }
    }

    // Actualiza el producto correspondiente segun el id ingresado. Si no lo encuentra, devuelve error.
    // Si se intenta modificar el ID, devuelve error.
    async updateProduct(id, newProduct) {
        try {
            if (!newProduct.id === undefined) {
                throw new Error("No se puede modificar el ID.");
            }
            this.validateObject(newProduct);
            const PRODUCTS = await this.getProducts();
            const INDEX = await this.findObject(PRODUCTS, id);
            PRODUCTS[INDEX] = {
                id: PRODUCTS[INDEX].id,
                ...newProduct
            }
            await this.writeFile(PRODUCTS);
        }
        catch (err) {
            throw(err);
        }
    }

    // Elimina el producto correspondiente segun el id ingresado. Si no lo encuentra, devuelve error.
    async deleteProduct(id) {
        try {
            const PRODUCTS = await this.getProducts();
            const INDEX = await this.findObject(PRODUCTS, id);
            PRODUCTS.splice(INDEX, 1);
            await this.writeFile(PRODUCTS);
        }
        catch (err) {
            throw(err);
        }
    }
};


class CartManager extends FileManager {
    
    // Crea un carrito nuevo con un array de productos vacio. Genera ID autoincrementable.
    async addCart() {
        try {
            const CARTS = await this.getProducts();
            let new_cart = null;
            const MAXID = CARTS.reduce((max, cart) => (cart.id > max ? cart.id : max), 0);
            if (MAXID > 0) {
                new_cart = {
                    id: MAXID + 1,
                    products: []
                }
            } else {
                new_cart = {
                    id: 1,
                    products: []
            }};
            CARTS.push(new_cart);
            await this.writeFile(CARTS);
        }
        catch (err) {
            throw(err);
        }
    }

    // Agrega un producto al carrito indicado en "idCart". Verifica que se ingresen los campos obligatorios. Si no encuentra el carrito, devuelve error.
    // Si el producto no existe, devuelve error. Si el producto ya fue ingresado, suma la cantidad nueva a la cantidad ya ingresada.
    async addProduct(idCart, newProduct) {
        try {
            if (newProduct.product === undefined || newProduct.quantity === undefined) {
                throw new Error("Todos los campos son obligatorios.");
            }
            const CARTS = await this.getProducts();
            const fileManagerTemporal = new FileManager(path.resolve("./public/products.json"));
            const ARRAY_PRODUCTOS = await fileManagerTemporal.getProducts();
            await this.findObject(ARRAY_PRODUCTOS, newProduct.product);

            const CART_INDEX = await this.findObject(CARTS, idCart);
            const PRODUCT_INDEX = CARTS[CART_INDEX].products.findIndex((prod) => prod.product === newProduct.product);   
            if (PRODUCT_INDEX !== -1) {
                CARTS[CART_INDEX].products[PRODUCT_INDEX].quantity += newProduct.quantity; 
            } 
            else {
                CARTS[CART_INDEX].products.push({
                    product: newProduct.product,
                    quantity: newProduct.quantity
                });
            }
            await this.writeFile(CARTS);
        } catch (err) {
            throw(err);
        }
    }

    // Trae el carrito correspondiente segun el id ingresado. Si no lo encuentra, devuelve error.
    async getCartById(id) {
        try {
            const CARTS = await this.getProducts();
            const INDEX = await this.findObject(CARTS, id);
            return CARTS[INDEX];
        }
        catch (err) {
            throw(err);
        }
    }
};

export {ProductManager, CartManager};