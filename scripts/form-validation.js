'use strict';

const forms = document.querySelectorAll('form');
const errorMessage = document.querySelectorAll('.input-error');
const addProductForm = document.getElementById('addProductForm');
const addProductButton = document.getElementById('addProductButton');
const addProductInputs = addProductForm.querySelectorAll('.form-control');

const [, , image] = addProductInputs;
// const [brand, productName, , description, price] = addProductInputs;
const textInput = Object.values(addProductInputs).filter(input => {
    return input.name !== 'imageUrl';
});

const [, , imageMessage] = errorMessage;
const textInputMessage = Object.values(errorMessage).filter(input => {
    return input.className !== 'input-error url';
});

// const checkInputValue = (input, button) => {
//     const inputValue = input.value.trim();

//     return !inputValue
//         ? button.setAttribute('disabled', '')
//         : button.removeAttribute('disabled');
// };

// forms.forEach(form => {
//     const button = form.querySelector('button');
//     button.setAttribute('disabled', '');

//     const inputs = form.querySelectorAll('.form-control');

//     inputs.forEach(input => {
//         form.addEventListener('input', () => {
//             checkInputValue(input, button);
//         });
//     });
// });

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

const validateInputs = () => {
    const imageValue = image.value.trim();
    const valid = '<i class="bi bi-check-circle-fill"></i>';

    textInputMessage.forEach((message, i) => {
        return isInputValueEmpty(textInput[i])
            ? (message.innerHTML = 'Required')
            : (message.innerHTML = `${valid}`);
    });

    switch (true) {
        case imageValue === '':
            return (imageMessage.innerHTML = 'Required');
        case !isValidUrl(imageValue):
            return (imageMessage.innerHTML = 'Invalid URL');
        default:
            return (imageMessage.innerHTML = `${valid}`);
    }
};
