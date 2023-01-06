class ProductManager {
    constructor() {
        this.products = [];
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        if (title === undefined || description === undefined || price === undefined || thumbnail === undefined || code === undefined || stock === undefined) {
            return console.log("Todos los campos son obligatorios.");
        }
        const codeExists = this.products.find((product) => product.code === code);
        if (codeExists) {
            return console.log("El producto ya existe.");
        }
        const newProduct = {
            id: this.products.length +1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };
        this.products.push(newProduct);
    }

    getProducts() {
        return this.products; 
    }

    getProductById(id) {
        let productFound = null
        this.products.forEach((product) => {
            if (product.id === id) {
                productFound = product;
            }
        });
        if (productFound === null) {
            return console.log("Producto no encontrado.");
        }
        return console.log(productFound);
    }
}


let products = new ProductManager();