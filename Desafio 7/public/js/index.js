const socket = io();
const code = document.getElementById('code');
const price = document.getElementById('price');
const title = document.getElementById('title');
const stock = document.getElementById('stock');
const category = document.getElementById('category');
const deleteId = document.getElementById('deleteId');
const statusInput = document.getElementById('status');
const thumbnails = document.getElementById('thumbnails');
const addProduct = document.getElementById('addProduct');
const description = document.getElementById('description');
const productsBox = document.getElementById('products-box');
const deleteProduct = document.getElementById('deleteProduct');


const resetValues = () => {
    title.value = '';
    description.value = '';
    code.value = '';
    price.value = '';
    statusInput.value = '';
    stock.value = '';
    category.value = '';
    thumbnails.value = '';
    deleteId.value = '';
}


const renderProductCards = (data) => {
    let products = '';
    data.forEach((e) => {
        products += `
            <div class='product-card'>
                <div>
                    <img src='${e.thumbnails}' class='card-img'>
                </div>
                <div>
                    <p><b>${e.title}</b></p>
                    <p><b>$ ${e.price}</b></p>
                </div>
            </div>
        `;
    });
    productsBox.innerHTML = products;
};


addProduct.addEventListener('click', function () {
    const data = {
        title: title.value,
        description: description.value,
        code: code.value,
        price: price.value,
        status: statusInput.value === 'false' ? false : true,
        stock: stock.value,
        category: category.value,
        thumbnails: thumbnails.value
    }
    socket.emit('client:addProduct', data);
    resetValues();
});


deleteProduct.addEventListener('click', function () {
    const data = document.getElementById('deleteId').value;
    socket.emit('client:deleteProduct', data);
    resetValues();
});


socket.on('server:addProduct', (data) => {
    renderProductCards(data);
});


socket.on('server:deleteProduct', (data) => {
    renderProductCards(data);
});