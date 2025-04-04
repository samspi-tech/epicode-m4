'use strict';

const PRODUCTS_API = 'https://striveschool-api.herokuapp.com/api/product/';
const ACCESS_TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RmYzUzNmQyZWM1YzAwMTUzOTM4MGUiLCJpYXQiOjE3NDM2MTQ2MTYsImV4cCI6MTc0NDgyNDIxNn0.7n77yIzfN7AcDP7EsmembYT-UEcqHExS9W084_8ZYaw';

const alertContainer = document.getElementById('alertContainer');
const slidesContainer = document.getElementById('slidesContainer');
const spinnerContainer = document.getElementById('spinnerContainer');

const toggleSpinner = () => spinnerContainer.classList.toggle('d-none');

const showAlertMessage = message => {
    alertContainer.innerHTML = message;
    alertContainer.classList.remove('d-none');
};

const getProducts = async () => {
    toggleSpinner();
    try {
        const response = await fetch(PRODUCTS_API, {
            headers: {
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

const generateCardCover = data => {
    const { name: productName, imageUrl: productImage } = data;

    const cardCoverContainer = document.createElement('div');
    cardCoverContainer.setAttribute('class', 'card');

    const image = document.createElement('img');
    image.setAttribute('class', 'img-fluid');
    image.src = productImage;
    image.alt = productName;

    const button = document.createElement('button');
    button.setAttribute('class', 'card-btn');
    button.innerText = 'Add to cart';

    cardCoverContainer.append(image, button);
    return cardCoverContainer;
};

const generateCardBody = data => {
    const {
        brand: productBrand,
        name: productName,
        description: productDescription,
        price: productPrice,
    } = data;

    const cardBodyContainer = document.createElement('div');
    cardBodyContainer.setAttribute('class', 'card-body p-2');

    const brand = document.createElement('small');
    brand.setAttribute('class', 'card-brand text-secondary');
    brand.innerText = productBrand;

    const title = document.createElement('h4');
    title.setAttribute('class', 'card-title my-1');
    title.innerText = productName;

    const description = document.createElement('p');
    description.setAttribute('class', 'card-text');
    description.innerText = productDescription;

    const price = document.createElement('p');
    price.setAttribute('class', 'card-price');
    price.innerText = `${productPrice} €`;

    cardBodyContainer.append(brand, title, description, price);
    return cardBodyContainer;
};

const generateProductCard = data => {
    const slide = document.createElement('div');
    slide.setAttribute('class', 'swiper-slide');

    const cardCover = generateCardCover(data);
    const cardBody = generateCardBody(data);
    cardCover.appendChild(cardBody);

    slide.append(cardCover, cardBody);
    slidesContainer.appendChild(slide);
};

getProducts()
    .then(results => results.map(result => generateProductCard(result)))
    .catch(err => showAlertMessage('Something went wrong!'));
