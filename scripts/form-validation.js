'use strict';

const addProductForm = document.getElementById('addProductForm');
const addFormMessage = addProductForm.querySelectorAll('.input-error');
const addProductInputs = addProductForm.querySelectorAll('.form-control');

const editProductForm = document.getElementById('editProductForm');
const editFormMessage = editProductForm.querySelectorAll('.input-error');
const editProductInputs = editProductForm.querySelectorAll('.form-control');

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
        case !isValidUrl(imageInput.value):
            imageMessage.innerHTML = 'Invalid URL';
            return false;
        case checkForEmptyValue(inputs, messages).includes(true):
            return false;
        default:
            return true;
    }
};
