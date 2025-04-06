'use strict';

const PRODUCTS_API = 'https://striveschool-api.herokuapp.com/api/product/';
const ACCESS_TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RmYzUzNmQyZWM1YzAwMTUzOTM4MGUiLCJpYXQiOjE3NDM2MTQ2MTYsImV4cCI6MTc0NDgyNDIxNn0.7n77yIzfN7AcDP7EsmembYT-UEcqHExS9W084_8ZYaw';

const addProductForm = document.getElementById('addProductForm');

const tableBody = document.getElementById('tableBody');
const productID = document.getElementById('productID');
const editProductForm = document.getElementById('editProductForm');
const closeModalButton = document.getElementById('closeModalButton');
const editProductModal = document.getElementById('editProductModal');

const showModal = id => {
    editProductModal.showModal();

    editProductForm.childNodes.forEach(child => {
        const isChildInput = child.nodeType === 1;

        if (isChildInput) {
            getProducts().then(products => {
                products.forEach(product => {
                    Object.keys(product).forEach(key => {
                        const isProductEditButton =
                            child.name === key && id === product._id;

                        if (isProductEditButton) {
                            child.value = product[key];
                            productID.innerText = product._id;
                        }
                    });
                });
            });
        }
    });
};

const closeModal = () => editProductModal.close();

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

    const payload = getFormValues(addProductForm);
    await addNewProduct(payload);

    window.location.reload();
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
    tableBody.appendChild(tr);
};

getProducts().then(products =>
    products.forEach(product => generateTableRow(product))
);
