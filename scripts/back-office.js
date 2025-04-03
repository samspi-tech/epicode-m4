'use strict';

const form = document.querySelector('form');

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
        brand: form.brand.value,
        name: form.productName.value,
        imageUrl: form.imageUrl.value,
        description: form.description.value,
        price: Number(form.price.value),
    };

    return payload;
};

form.addEventListener('submit', async event => {
    event.preventDefault();
    const payload = getFormValues();

    await addNewProduct(payload).then(product => console.log(product));
});
