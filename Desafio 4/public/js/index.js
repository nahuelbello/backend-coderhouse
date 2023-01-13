const socket = io();

document.getElementById("add").addEventListener("click", function () {
    const data = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        price: document.getElementById("price").value,
        code: document.getElementById("code").value,
        price: document.getElementById("price").value,
        status: document.getElementById("status").value,
        stock: document.getElementById("stock").value,
        category: document.getElementById("category").value,
        thumbnails: document.getElementById("thumbnails").value
    }
    socket.emit("add", data);
});



document.getElementById("delete").addEventListener("click", function () {
    const data = document.getElementById("pid").value;
    console.log(data);
  
    socket.emit("delete", data);
});