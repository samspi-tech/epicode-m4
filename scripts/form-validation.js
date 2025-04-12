'use strict';

const errorMessage = document.querySelectorAll('.input-error');
const addProductForm = document.getElementById('addProductForm');
const addProductInputs = addProductForm.querySelectorAll('.form-control');

const textInput = Object.values(addProductInputs);
const textInputMessage = Object.values(errorMessage);

const [, , imageInput] = Object.values(addProductInputs);
const [, , imageMessage] = Object.values(errorMessage);

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

const checkInputValue = () =>
    textInputMessage.map((inputMessage, i) => {
        const iconValid = '<i class="bi bi-check-circle-fill"></i>';

        isInputValueEmpty(textInput[i])
            ? (inputMessage.innerHTML = 'Required')
            : (inputMessage.innerHTML = iconValid);

        return isInputValueEmpty(textInput[i]);
    });

const validateInputs = () => {
    checkInputValue();

    switch (true) {
        case !isValidUrl(imageInput.value):
            imageMessage.innerHTML = 'Invalid URL';
            return false;
        case checkInputValue().includes(true):
            return false;
        default:
            return true;
    }
};
