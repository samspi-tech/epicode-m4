'use strict';

const sideNavbar = document.getElementById('sideNavbar');
const burgerButton = document.getElementById('burgerButton');
const closeSideNavButton = document.getElementById('closeSideNavButton');

const toggleSideNav = () => {
    sideNavbar.classList.toggle('hide-side-nav');
    closeSideNavButton.classList.toggle('opacity-0');
};

burgerButton.addEventListener('click', toggleSideNav);
closeSideNavButton.addEventListener('click', toggleSideNav);
