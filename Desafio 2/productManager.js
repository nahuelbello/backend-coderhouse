const fs = require("fs");
const path = require("path");

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



const productManager = new ProductManager(path.join(__dirname, "products.json"));

const PRODUCT1 = {
    "title": "Guitarra",
    "description": "Fender Stratocaster",
    "price": 123.45,
    "thumbnail": "https://stuff.fendergarage.com/images/G/6/Q/taxonomy-electric-guitar-stratocaster-american-professional-car@2x.png",
    "code": 111223,
    "stock": 5
};

const PRODUCT2 = {
    "title": "Piano",
    "description": "Roland FP-30",
    "price": 234.56,
    "thumbnail": "https://http2.mlstatic.com/D_NQ_NP_993817-MLA47456372804_092021-O.jpg",
    "code": 464658,
    "stock": 2
};

const PRODUCT3 = {
    "title": "Amplificador",
    "description": "Marshall DSL-40C",
    "price": 345.67,
    "thumbnail": "https://www.show-room.com.ar/wp-content/uploads/2022/09/22359_4-1.jpg",
    "code": 789456,
    "stock": 4
};

const PRODUCT4 = {
    "title": "Music Man",
    "description": "StingRay",
    "price": 463.53,
    "thumbnail": "https://static.sonovente.com/img/library/zoom/62/450/62358_1.jpg",
    "code": 685216,
    "stock": 3
};

const PRODUCT5 = {
    "title": "Bateria",
    "description": "Pearl Export Studio 5",
    "price": 984.21,
    "thumbnail": "https://http2.mlstatic.com/D_NQ_NP_948929-MLA31098256023_062019-O.webp",
    "code": 342867,
    "stock": 1
};

const PRODUCT6 = {
    "title": "Sintetizador",
    "description": "Korg Kronos 61",
    "price": 874.23,
    "thumbnail": "https://m.media-amazon.com/images/I/414kfpGjoCL._SR600%2C315_PIWhiteStrip%2CBottomLeft%2C0%2C35_SCLZZZZZZZ_FMpng_BG255%2C255%2C255.jpg",
    "code": 631524,
    "stock": 2
};

const PRODUCT7 = {
    "title": "Piano Acustico",
    "description": "Walden",
    "price": 453.71,
    "thumbnail": "https://http2.mlstatic.com/D_NQ_NP_603727-MLA49096776579_022022-O.webp",
    "code": 537429,
    "stock": 1
};

const PRODUCT8 = {
    "title": "Guitarra Acustica",
    "description": "Gibson G-45",
    "price": 648.52,
    "thumbnail": "https://ar.xprostore.com/image/cache/data/imagenesweb/mcrsg5an-1600x900.jpg",
    "code": 741856,
    "stock": 5
};

const PRODUCT9 = {
    "title": "Saxo Alto",
    "description": "Yamaha YAS-62",
    "price": 156.48,
    "thumbnail": "https://www.gonzalezvientos.com.ar/gvstore/wp-content/uploads/2016/03/YAS-62-03.jpg",
    "code": 687856,
    "stock": 6
};

const PRODUCT10 = {
    "title": "Trompeta",
    "description": "Yamaha YTR-3330",
    "price": 345.67,
    "thumbnail": "https://solomusica.com.ar/sm2020/6265-large_default/trompeta-yamaha-ytr-2330.jpg",
    "code": 326485,
    "stock": 2
};



const LLAMADOS = async() => {
    /*
    console.log("-------- AGREGANDO PRODUCTOS --------");
    await productManager.addProduct(PRODUCT1);
    
    console.log("-------- BUSCANDO EL PRODUCTO CON ID 100 --------");
    console.log(productManager.getProductById(100));

    console.log("-------- ACTUALIZANDO TITLE EN EL PRODUCTO CON ID 1 --------");
    await productManager.updateProduct(1, "id", "MODIFICADO");
    
    console.log("-------- BORRANDO EL PRODUCTO CON ID 1 --------");
    await productManager.deleteProduct(2);
    */
};

LLAMADOS();