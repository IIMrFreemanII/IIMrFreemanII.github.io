'use strict';

const categories = [
    {
        name: 'Phones',
        key: 'phones'
    },
    {
        name: 'Laptops',
        key: 'laptops'
    }
];

const products = {
    laptops: [
        {
            name: 'Dell XPS 15',
            price: 2000,
            imgName: 'Dell_XPS_15',
            id: 0 // Индекс товара в массиве категории
        },
        {
            name: 'Apple Macbook Pro 15',
            price: 2500,
            imgName: 'Apple_Macbook_Pro_15',
            id: 1
        },
    ],
    phones: [
        {
            name: 'Apple iPhone X',
            price: 1500,
            imgName: 'Apple_iPhone_X',
            id: 0
        },
        {
            name: 'Samsung Galaxy S10+',
            price: 1200,
            imgName: 'Samsung_Galaxy_S10+',
            id: 1
        },
    ],
};
