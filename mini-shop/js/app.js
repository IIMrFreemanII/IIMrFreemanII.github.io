'use strict';

const currencyToUSD = 27;

createContainerWithRowAndColumns();

showCategories();

const categoriesButtons = document.querySelectorAll('.categories .list-group button');
const productsList = document.querySelector('.col-4.productsList');
const product = document.querySelector('.col-6.product');