'use strict';

const addProductForm = document.getElementById('addProductForm');
const addFormMessage = addProductForm.querySelectorAll('.input-error');
const addProductInputs = addProductForm.querySelectorAll('.form-control');

const editProductForm = document.getElementById('editProductForm');
const editFormMessage = editProductForm.querySelectorAll('.input-error');
const editProductInputs = editProductForm.querySelectorAll('.form-control');

const addProductSuccess = document.getElementById('addProductSuccess');
const editProductSuccess = document.getElementById('editProductSuccess');

const getInputs = inputs => Object.values(inputs);
const getInputsMessage = inputMessages => Object.values(inputMessages);

const getImageInput = inputs => {
    const [, , imageInput] = Object.values(inputs);

    return imageInput;
};

const getImageMessage = inputMessages => {
    const [, , imageMessage] = Object.values(inputMessages);

    return imageMessage;
};

const isValidUrl = url => {
    const pattern = new RegExp(
        '^(https?:\\/\\/)?' +
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
            '((\\d{1,3}\\.){3}\\d{1,3}))' +
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
            '(\\?[;&a-z\\d%_.~+=-]*)?' +
            '(\\#[-a-z\\d_]*)?$',
        'i'
    );
    return pattern.test(url);
};

const isInputValueEmpty = input => input.value.trim() === '';

const checkForEmptyValue = (inputs, messages) =>
    getInputsMessage(messages).map((message, i) => {
        const input = getInputs(inputs);
        const iconValid = '<i class="bi bi-check-circle-fill"></i>';

        isInputValueEmpty(input[i])
            ? (message.innerHTML = 'Required')
            : (message.innerHTML = iconValid);

        return isInputValueEmpty(input[i]);
    });

const validateInputs = (inputs, messages) => {
    checkForEmptyValue(inputs, messages);
    const imageInput = getImageInput(inputs);
    const imageMessage = getImageMessage(messages);

    switch (true) {
        case isInputValueEmpty(imageInput):
            imageMessage.innerHTML = 'Required';
            return false;
        case !isValidUrl(imageInput.value):
            imageMessage.innerHTML = 'Invalid URL';
            return false;
        case checkForEmptyValue(inputs, messages).includes(true):
            return false;
        default:
            return true;
    }
};

const showSuccess = successType => {
    successType.classList.remove('visually-hidden');
    successType.classList.remove('hide-add-success');
    successType.classList.add('show-add-success');
};

const hideSuccess = successType => {
    successType.classList.remove('show-add-success');
    successType.classList.add('hide-add-success');
};

const resetFormInputs = (payload, form, message) => {
    Object.keys(payload).forEach(key => (form[key].value = ''));

    getInputsMessage(message).forEach(message => {
        message.innerHTML = '';
    });
};

const appendNewProduct = () => {
    getProducts().then(products => {
        tableBodyContainer.innerHTML = '';
        products.forEach(product => generateTableRow(product));
    });
};
