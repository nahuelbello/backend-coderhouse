import fs from "fs";

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    async addProduct(product) {
        try {
            if (product.title === undefined || product.description === undefined || product.price === undefined || product.thumbnail === undefined || product.code === undefined || product.stock === undefined) {
                throw new Error("Todos los campos son obligatorios.");
            }
            const PRODUCTS = await this.getProducts();
            if (PRODUCTS.find((prod) => prod.code === product.code)) {
                throw new Error("El producto ya existe.");
            }
            
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

    async getProductById(id) {
        try {
            let productFound = null;
            const PRODUCTS = await this.getProducts();
            PRODUCTS.forEach((product) => {
                if (product.id === id) {
                    productFound = product;
                }
            });
            if (productFound === null) {
                throw new Error("Producto no encontrado.");
            }
            return PRODUCTS.find((product) => product.id === id);
        }
        catch (err) {
            throw(err);
        }
    }

    async updateProduct(id, field, content) {
        try {
            field = field.toLowerCase();
            if (field === "id") {
                throw new Error("No se puede modificar el ID.");
            }
            let productFound = false;
            const PRODUCTS = await this.getProducts();
            PRODUCTS.forEach((product) => {
                if (product.id === id) {
                    product[field] = content;
                    productFound = true;
                }     
            });
            if (productFound) {
                this.writeFile(PRODUCTS);
                return "Producto actualizado.";
            }
            throw new Error("Producto no encontrado.");
        }
        catch (err) {
            throw(err);
        }
    }

    async deleteProduct(id) {
        try {
            const PRODUCTS = await this.getProducts();
            const INDEX = PRODUCTS.findIndex((product) => product.id === id);
            if (INDEX === -1) {
                throw new Error("Producto no encontrado.");
            }
            PRODUCTS.splice(INDEX, 1);
            await this.writeFile(PRODUCTS);
            return "Producto eliminado.";
        }
        catch (err) {
            throw(err);
        }
    }

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

export default ProductManager;