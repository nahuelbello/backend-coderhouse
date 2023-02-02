const socket = io();

document.getElementById("addProduct").addEventListener("click", function () {
    const data = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        price: document.getElementById("price").value,
        code: document.getElementById("code").value,
        price: document.getElementById("price").value,
        status: true,
        stock: document.getElementById("stock").value,
        category: document.getElementById("category").value,
        thumbnails: document.getElementById("thumbnails").value
    }
    socket.emit("client:addProduct", data);
});


document.getElementById("deleteProduct").addEventListener("click", function () {
    const data = document.getElementById("deleteId").value;
    socket.emit("client:deleteProduct", data);
});