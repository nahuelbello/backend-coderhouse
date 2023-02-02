const socket = io();
const title = document.getElementById("title");
const description = document.getElementById("description");
const code = document.getElementById("code");
const price = document.getElementById("price");
const statusInput = document.getElementById("status");
const stock = document.getElementById("stock");
const category = document.getElementById("category");
const thumbnails = document.getElementById("thumbnails");
const deleteId = document.getElementById("deleteId");
const productsBox = document.getElementById("products-box");
const addProduct = document.getElementById("addProduct");
const deleteProduct = document.getElementById("deleteProduct");



const resetValues = () => {
    title.value = "";
    description.value = "";
    code.value = "";
    price.value = "";
    statusInput.value = "";
    stock.value = "";
    category.value = "";
    thumbnails.value = "";
    deleteId.value = "";
}


const renderProducts = (data) => {
    let products = "";
    data.forEach((e) => {
        products += `
            <div class="product">
                <p><b>ID:</b> ${e._id}</p>
                <p><b>Title:</b> ${e.title}</p>
                <p><b>Description:</b> ${e.description}</p>
                <p><b>Code:</b> ${e.code}</p>
                <p><b>Price:</b> $ ${e.price}</p>
                <p><b>Status:</b> ${e.status}</p>
                <p><b>Stock:</b> ${e.stock}</p>
                <p><b>Category:</b> ${e.category}</p>
                <p><b>Thumbnails:</b> ${e.thumbnails}</p>
            </div>
        `;
    });
    productsBox.innerHTML = products;
};


addProduct.addEventListener("click", function () {
    const data = {
        title: title.value,
        description: description.value,
        code: code.value,
        price: price.value,
        status: statusInput.value === "false" ? false : true,
        stock: stock.value,
        category: category.value,
        thumbnails: thumbnails.value
    }
    socket.emit("client:addProduct", data);
    resetValues();
});


deleteProduct.addEventListener("click", function () {
    const data = document.getElementById("deleteId").value;
    socket.emit("client:deleteProduct", data);
    resetValues();
});


socket.on("server:addProduct", (data) => {
    renderProducts(data);
});


socket.on("server:deleteProduct", (data) => {
    renderProducts(data);
});