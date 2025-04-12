'use strict';

const PRODUCTS_API = 'https://striveschool-api.herokuapp.com/api/product/';
const ACCESS_TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RmYzUzNmQyZWM1YzAwMTUzOTM4MGUiLCJpYXQiOjE3NDM2MTQ2MTYsImV4cCI6MTc0NDgyNDIxNn0.7n77yIzfN7AcDP7EsmembYT-UEcqHExS9W084_8ZYaw';

const productID = document.getElementById('productID');
// const addProductForm = document.getElementById('addProductForm');
const editProductForm = document.getElementById('editProductForm');
const closeModalButton = document.getElementById('closeModalButton');
const editProductInputs = editProductForm.querySelectorAll('.form-control');

const modalContainer = document.getElementById('modalContainer');
const tableContainer = document.getElementById('tableContainer');
const tableBodyContainer = document.getElementById('tableBodyContainer');
const modalTitleContainer = document.getElementById('modalTitleContainer');
const tableSpinnerContainer = document.getElementById('tableSpinnerContainer');
const modalSpinnerContainer = document.getElementById('modalSpinnerContainer');

const toggleSpinner = container => container.classList.toggle('d-none');

const generateAlertContainer = () => {
    const div = document.createElement('div');
    div.role = 'alert';
    div.setAttribute('class', 'alert alert-primary text-center mt-3');

    return div;
};

const showAlertMessage = (appender, message) => {
    const alertMessage = generateAlertContainer();
    alertMessage.innerHTML = message;
    appender.appendChild(alertMessage);
};

const populateEditInputValues = async id => {
    const inputs = Object.values(editProductInputs);
    const [brand, name, image, description, price] = inputs;

    toggleSpinner(modalSpinnerContainer);
    try {
        await getProducts().then(products => {
            products.forEach(product => {
                if (id === product._id) {
                    productID.innerText = product._id;
                    brand.value = product.brand;
                    name.value = product.name;
                    image.value = product.imageUrl;
                    description.value = product.description;
                    price.value = product.price;
                }
            });
        });
    } catch (error) {
        modalTitleContainer.innerHTML = '';
        const errorMessage = 'Error! Try later or contact support.';
        showAlertMessage(modalTitleContainer, errorMessage);
    } finally {
        toggleSpinner(modalSpinnerContainer);
    }
};

const showModal = id => {
    modalContainer.showModal();
    populateEditInputValues(id);
};

const closeModal = () => modalContainer.close();

closeModalButton.addEventListener('click', closeModal);

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

const getFormValues = form => {
    const payload = {
        brand: form.brand.value,
        name: form.name.value,
        imageUrl: form.imageUrl.value,
        description: form.description.value,
        price: Number(form.price.value),
    };
    return payload;
};

addProductForm.addEventListener('submit', async event => {
    event.preventDefault();
    const isValidForm = validateInputs();

    if (isValidForm) {
        const payload = getFormValues(addProductForm);
        await addNewProduct(payload);
        window.location.reload();
    }
});

// PRODUCTS LIST
const getProducts = async () => {
    toggleSpinner(tableSpinnerContainer);
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
    } finally {
        toggleSpinner(tableSpinnerContainer);
    }
};

const editProduct = async (productID, payload) => {
    try {
        const response = await fetch(`${PRODUCTS_API}/${productID}`, {
            method: 'PUT',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
        });
        return await response.json();
    } catch (error) {
        console.error(error);
    }
};

editProductForm.addEventListener('submit', async event => {
    event.preventDefault();

    const id = productID.innerText;
    const payload = getFormValues(editProductForm);

    await editProduct(id, payload);
    window.location.reload();
});

const deleteProduct = async productID => {
    try {
        const response = await fetch(`${PRODUCTS_API}/${productID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
        });
        return await response.json();
    } catch (error) {
        console.error(error);
    }
};

const generateTableRow = data => {
    const { _id, brand, name, imageUrl, description, price } = data;
    const tr = document.createElement('tr');

    [brand, name, imageUrl, description, price].forEach(item => {
        const td = document.createElement('td');
        td.textContent = item;

        tr.appendChild(td);
    });

    const editButton = document.createElement('td');
    editButton.innerHTML = '<i class="bi bi-pen edit-btn"></i>';
    editButton.addEventListener('click', () => {
        showModal(_id);
    });

    const deleteButton = document.createElement('td');
    deleteButton.innerHTML = '<i class="bi bi-trash3 delete-btn"></i>';
    deleteButton.addEventListener('click', async () => {
        await deleteProduct(_id);
        window.location.reload();
    });

    tr.append(editButton, deleteButton);
    tableBodyContainer.appendChild(tr);
};

getProducts()
    .then(products => products.forEach(product => generateTableRow(product)))
    .catch(err => {
        const errorMessage = 'Error! Try later or contact support.';
        showAlertMessage(tableContainer, errorMessage);
        console.log(err);
    });
