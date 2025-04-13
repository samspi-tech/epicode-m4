'use strict';

const cartBadge = document.getElementById('cartBadge');
const cartMessage = document.getElementById('cartMessage');
const cartCheckout = document.getElementById('cartCheckout');
const openCartButton = document.getElementById('openCartButton');
const closeCartButton = document.getElementById('closeCartButton');
const clearCartButton = document.getElementById('clearCartButton');

const cartContainer = document.getElementById('cartContainer');
const cartProductsContainer = document.getElementById('cartProductsContainer');

const showCart = () => {
    updateCartMessages();
    appendProductToCart();
    cartContainer.showModal();
};
openCartButton.addEventListener('click', showCart);

const hideCart = () => cartContainer.close();
closeCartButton.addEventListener('click', hideCart);

const setLocalStorage = (key, value) => {
    return localStorage.setItem(key, JSON.stringify(value));
};

const getLocalStorage = key => {
    return JSON.parse(localStorage.getItem(key));
};

const addProductToLocalStorage = data => {
    const cart = getLocalStorage('cart') ?? [];
    const newProduct = [...cart, data];
    setLocalStorage('cart', newProduct);
};

const generateCartProductList = data => {
    const { imageUrl: image, name, price } = data;
    const li = document.createElement('li');

    const productImage = document.createElement('img');
    productImage.src = image;
    productImage.alt = name;

    const productDetails = document.createElement('div');
    productDetails.setAttribute('class', 'ps-3');

    const productName = document.createElement('h3');
    productName.setAttribute('class', 'fw-bolder');
    productName.innerText = name;

    const productPrice = document.createElement('h6');
    productPrice.setAttribute('class', 'product-price');
    productPrice.innerText = `${price}€`;

    const removeItemButton = document.createElement('button');
    removeItemButton.setAttribute('class', 'remove-item-btn');
    removeItemButton.innerText = 'Remove item';

    removeItemButton.addEventListener('click', () => {
        const removableItem = removeItemButton.closest('li');
        const cart = getLocalStorage('cart');
        removeItemFromCart(cart, name);
        removableItem.remove();
        appendProductToCart();
        updateCartMessages();
    });

    productDetails.append(productName, productPrice, removeItemButton);
    li.append(productImage, productDetails);

    cartProductsContainer.appendChild(li);
};

const appendProductToCart = () => {
    cartProductsContainer.innerHTML = '';
    const products = getLocalStorage('cart') ?? [];
    products.forEach(product => generateCartProductList(product));
};

const updateCartMessages = () => {
    const products = getLocalStorage('cart') ?? [];
    const plural = products.length > 1 ? 'items' : 'item';

    const checkout = products.reduce((acc, product) => {
        const curr = product.price;
        return acc + curr;
    }, 0);

    const message =
        products.length > 0
            ? `You have ${products.length} ${plural} in your cart`
            : 'Your cart is empty';

    cartMessage.innerText = message;
    cartCheckout.innerText = checkout;
    cartBadge.innerText = products.length;
};

updateCartMessages();

const clearCart = () => {
    localStorage.clear();
    cartBadge.innerText = 0;
    cartCheckout.innerText = 0;
    cartProductsContainer.innerHTML = '';
    cartMessage.innerText = 'Your cart is empty';
};
clearCartButton.addEventListener('click', clearCart);

const removeItemFromCart = (cart, productName) => {
    const keptItems = cart.filter(item => item.name !== productName);
    setLocalStorage('cart', keptItems);
};
