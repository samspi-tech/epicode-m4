'use strict';

const PRODUCTS_API = 'https://striveschool-api.herokuapp.com/api/product/';
const ACCESS_TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RmYzUzNmQyZWM1YzAwMTUzOTM4MGUiLCJpYXQiOjE3NDM2MTQ2MTYsImV4cCI6MTc0NDgyNDIxNn0.7n77yIzfN7AcDP7EsmembYT-UEcqHExS9W084_8ZYaw';

const tableBody = document.getElementById('tableBody');
const addProductForm = document.getElementById('addProductForm');

// FORM: ADD NEW PRODUCT
const addNewProduct = async payload => {
    try {
        const response = await fetch(PRODUCTS_API, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
        });
        return await response.json();
    } catch (error) {
        console.error(error);
    }
};

const getFormValues = () => {
    const payload = {
        brand: addProductForm.brand.value,
        name: addProductForm.productName.value,
        imageUrl: addProductForm.imageUrl.value,
        description: addProductForm.description.value,
        price: Number(addProductForm.price.value),
    };

    return payload;
};

addProductForm.addEventListener('submit', async event => {
    event.preventDefault();
    const payload = getFormValues();

    await addNewProduct(payload).then(product => console.log(product));
});

// PRODUCTS LIST
const getProducts = async () => {
    try {
        const response = await fetch(PRODUCTS_API, {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
        });
        return await response.json();
    } catch (error) {
        console.error(error);
    }
};

const generateTableRow = data => {
    const { brand, name, imageUrl, description, price } = data;
    const tr = document.createElement('tr');

    [brand, name, imageUrl, description, price].forEach(item => {
        const td = document.createElement('td');
        td.setAttribute('class', 'table-body-cell');
        td.textContent = item;

        tr.appendChild(td);
    });
    tableBody.appendChild(tr);
};

getProducts().then(products =>
    products.forEach(product => generateTableRow(product))
);
