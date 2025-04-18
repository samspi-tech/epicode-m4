'use strict';

const PRODUCTS_API = 'https://striveschool-api.herokuapp.com/api/product/';
const ACCESS_TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RmYzUzNmQyZWM1YzAwMTUzOTM4MGUiLCJpYXQiOjE3NDM2MTQ2MTYsImV4cCI6MTc0NDgyNDIxNn0.7n77yIzfN7AcDP7EsmembYT-UEcqHExS9W084_8ZYaw';

const params = new URLSearchParams(location.search);
const id = params.get('id');

const alertContainer = document.getElementById('alertContainer');
const productContainer = document.getElementById('productContainer');
const spinnerContainer = document.getElementById('spinnerContainer');

const toggleSpinner = () => spinnerContainer.classList.toggle('d-none');

const showAlertMessage = message => {
    alertContainer.innerHTML = message;
    alertContainer.classList.remove('d-none');
};

const getProduct = async () => {
    toggleSpinner();
    try {
        const response = await fetch(`${PRODUCTS_API}${id}`, {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
        });
        return await response.json();
    } catch (error) {
        console.error(error);
    } finally {
        toggleSpinner();
    }
};

const generateProductCover = data => {
    const { imageUrl: productImage, name: productName } = data;

    const col = document.createElement('div');
    col.setAttribute('class', 'col-12 col-md-4 cover-container py-3');

    const image = document.createElement('img');
    image.setAttribute('class', 'img-fluid rounded');
    image.src = productImage;
    image.alt = productName;

    col.appendChild(image);
    return col;
};

const generateProductDetails = data => {
    const {
        brand: productBrand,
        name: productName,
        description: productDescription,
        price: productPrice,
    } = data;

    const col = document.createElement('div');
    col.setAttribute('class', 'col-12 col-md-8 d-flex flex-column p-3');

    const brand = document.createElement('h6');
    brand.setAttribute('class', 'text-secondary text-uppercase');
    brand.innerText = productBrand;

    const title = document.createElement('h2');
    title.setAttribute('class', 'display-3');
    title.innerText = productName;

    const description = document.createElement('p');
    description.setAttribute('class', 'fs-5');
    description.innerText = productDescription;

    const price = document.createElement('h2');
    price.setAttribute('class', 'fw-bold mt-auto');
    price.innerText = `${productPrice} €`;

    const buttonsContainer = document.createElement('div');
    buttonsContainer.setAttribute('class', 'btns-container');

    const addToCartButton = document.createElement('button');
    addToCartButton.setAttribute('class', 'add-to-cart-btn');
    addToCartButton.innerHTML = 'Add to cart';

    addToCartButton.addEventListener('click', () => {
        cartBadges.forEach(badge => badge.innerText++);
        addProductToLocalStorage(data);
    });

    const homePage = document.createElement('a');
    homePage.setAttribute('class', 'home-page-link');
    homePage.innerText = 'Take me back';
    homePage.href = './index.html';

    buttonsContainer.append(addToCartButton, homePage);

    col.append(brand, title, description, price, buttonsContainer);
    return col;
};

const generateProductCard = data => {
    const productCover = generateProductCover(data);
    const productDetails = generateProductDetails(data);

    productContainer.append(productCover, productDetails);
};

getProduct()
    .then(product => generateProductCard(product))
    .catch(err => showAlertMessage('Something went wrong! Try again later.'));
