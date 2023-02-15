import fs from "fs";
import path from "path";

class FileManager {
    constructor(path) {
        this.path = path;
    }

    // Busca un objeto dentro de un array segun el id especificado, sea carrito o producto.
    async findObject(array, id) {
        try {
            const index = array.findIndex((object) => object.id === id);
            if (index === -1) {
                throw new Error("No encontrado.");
            }
            return index;
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
            const file = await fs.promises.readFile(this.path, "utf-8");
            if (file === "") {
                return [];
            }
            return JSON.parse(file);
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
            const products = await this.getProducts();
            if (products.find((prod) => prod.code === product.code)) {
                throw new Error("El producto ya existe.");
            }
            product.status ? product.status : product.status = true;

            let new_product = null;
            const max_id = products.reduce((max, product) => (product.id > max ? product.id : max), 0);
            if (max_id > 0) {
                new_product = {
                    id: max_id + 1,
                    ...product
                }
            } else {
                new_product = {
                    id: 1,
                    ...product
            }};
            products.push(new_product);
            await this.writeFile(products);
        }
        catch (err) {
            throw(err);
        }
    }

    // Trae el producto correspondiente segun el id ingresado. Si no lo encuentra, devuelve error.
    async getProductById(id) {
        try {
            const products = await this.getProducts();
            const index = await this.findObject(products, id);
            return products[index];
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
            const products = await this.getProducts();
            const index = await this.findObject(products, id);
            products[index] = {
                id: products[index].id,
                ...newProduct
            }
            await this.writeFile(products);
        }
        catch (err) {
            throw(err);
        }
    }

    // Elimina el producto correspondiente segun el id ingresado. Si no lo encuentra, devuelve error.
    async deleteProduct(id) {
        try {
            const products = await this.getProducts();
            const index = await this.findObject(products, id);
            products.splice(index, 1);
            await this.writeFile(products);
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
            const carts = await this.getProducts();
            let new_cart = null;
            const max_id = carts.reduce((max, cart) => (cart.id > max ? cart.id : max), 0);
            if (max_id > 0) {
                new_cart = {
                    id: max_id + 1,
                    products: []
                }
            } else {
                new_cart = {
                    id: 1,
                    products: []
            }};
            carts.push(new_cart);
            await this.writeFile(carts);
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
            const carts = await this.getProducts();
            const fileManagerTemporal = new FileManager(path.resolve("./public/products.json"));
            const products_array = await fileManagerTemporal.getProducts();
            await this.findObject(products_array, newProduct.product);

            const cart_index = await this.findObject(carts, idCart);
            const product_index = carts[cart_index].products.findIndex((prod) => prod.product === newProduct.product);   
            if (product_index !== -1) {
                carts[cart_index].products[product_index].quantity += newProduct.quantity; 
            } 
            else {
                carts[cart_index].products.push({
                    product: newProduct.product,
                    quantity: newProduct.quantity
                });
            }
            await this.writeFile(carts);
        } catch (err) {
            throw(err);
        }
    }

    // Trae el carrito correspondiente segun el id ingresado. Si no lo encuentra, devuelve error.
    async getCartById(id) {
        try {
            const carts = await this.getProducts();
            const index = await this.findObject(carts, id);
            return carts[index];
        }
        catch (err) {
            throw(err);
        }
    }
};

export { ProductManager, CartManager };