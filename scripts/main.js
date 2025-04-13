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
                'Content-Type': 'application/json',
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
    cardCoverContainer.setAttribute('class', 'card border-0');

    const image = document.createElement('img');
    image.setAttribute('class', 'img-fluid');
    image.src = productImage;
    image.alt = productName;

    const button = document.createElement('button');
    button.setAttribute('class', 'card-btn');
    button.innerText = 'Add to cart';

    button.addEventListener('click', () => {
        cartBadge.innerText++;
        addProductToLocalStorage(data);
    });

    cardCoverContainer.append(image, button);
    return cardCoverContainer;
};

const generateCardBody = data => {
    const {
        _id: id,
        brand: productBrand,
        name: productName,
        price: productPrice,
    } = data;

    const cardBodyContainer = document.createElement('div');
    cardBodyContainer.setAttribute('class', 'card-body p-2');

    const brand = document.createElement('small');
    brand.setAttribute('class', 'card-brand text-secondary');
    brand.innerText = productBrand;

    const title = document.createElement('h3');
    title.setAttribute('class', 'card-title mt-1 mb-3');
    title.innerText = productName;

    const cardFooter = document.createElement('div');
    cardFooter.setAttribute('class', 'd-flex align-items-center gap-1');

    const price = document.createElement('p');
    price.setAttribute('class', 'card-price mb-0');
    price.innerText = `${productPrice} €`;

    const details = document.createElement('a');
    details.setAttribute('class', 'card-details');
    details.href = `./product-details.html?id=${id}`;
    details.innerText = 'Details';

    cardFooter.append(price, details);
    cardBodyContainer.append(brand, title, cardFooter);
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
