const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 10,

    breakpoints: {
        768: {
            slidesPerView: 2,
            spaceBetween: 15,
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 15,
        },
        1440: {
            slidesPerView: 4,
            spaceBetween: 15,
        },
    },

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});
