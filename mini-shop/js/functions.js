'use strict';

function createAnyElementWithClass(tagName, className, text) {
    let element = document.createElement(tagName);

    if (className !== undefined) {
        element.className = className;
    }

    if (text !== undefined) {
        element.innerHTML = text;
    }

    return element;
}

function createInput(tagName, typeName, className, name, idName, value, placeholder, text) {
    let element = document.createElement(tagName);

    if (className !== undefined) {
        element.className = className;
    }

    if (typeName !== undefined) {
        element.setAttribute('type', typeName);
    }

    if (name !== undefined) {
        element.setAttribute('name', name);
    }

    if (idName !== undefined) {
        element.setAttribute('id', idName);
    }

    if (value !== undefined) {
        element.setAttribute('value', value);
    }

    if (placeholder !== undefined) {
        element.setAttribute('placeholder', placeholder);
    }

    if (text !== undefined) {
        element.innerHTML = text;
    }

    return element;
}


function createContainerWithRowAndColumns() {
    let container = createAnyElementWithClass('div', 'container mt-5');
    let row = createAnyElementWithClass('div', 'row');

    const columnsClass = ['col-2 categories', 'col-4 productsList', 'col-6 product'];
    const titles = ['Категории', 'Список товаров', 'Товар'];

    for (let i = 0; i < columnsClass.length; i++) {
        let col = createAnyElementWithClass('div', columnsClass[i]);
        let columnsTitle = createAnyElementWithClass(
            'div',
            'list-group-item mb-3 text-center font-weight-bold' +
            ' list-group-item-dark',
            titles[i]);

        col.appendChild(columnsTitle);
        row.appendChild(col);
    }

    container.appendChild(row);

    document.body.insertBefore(container, document.body.firstChild);
}

function createButton(someText) {
    return createInput(
        'button',
        'button',
        'list-group-item list-group-item-action',
        undefined,
        undefined,
        undefined,
        undefined,
        someText);
}

function getOrder() {
    let form = document.forms.order;

    let name = getName();
    let surName = getSurname();
    let city = getCity();
    let store = getStore();
    let payInfo = getPayInfo();
    let productAmount = getProductAmount();
    let feedback = getFeedback();

    if (Boolean(name) && Boolean(surName) && Boolean(city) && Boolean(store) && Boolean(productAmount) === true) {
        showOrderInfo();
    }

    function getName() {
        let name = form.elements.name;
        let valueOfName = name.value;

        if (valueOfName === '') {
            name.classList.add('is-invalid');
        } else {
            name.classList.remove('is-invalid');
            return valueOfName;
        }
    }

    function getSurname() {
        let surname = form.elements.surname;
        let valueOfSurname = surname.value;

        if (valueOfSurname === '') {
            surname.classList.add('is-invalid');
        } else {
            surname.classList.remove('is-invalid');
            return valueOfSurname;
        }
    }

    function getCity() {
        let city = form.elements.city;
        let valueOfCity = city.value;

        if (valueOfCity === '') {
            city.classList.add('is-invalid');
        } else {
            city.classList.remove('is-invalid');
            return valueOfCity;
        }
    }

    function getStore() {
        let storage = form.elements.storage;
        let valueOfStorage = storage.value;

        if (valueOfStorage === '') {
            storage.classList.add('is-invalid');
        } else {
            storage.classList.remove('is-invalid');
            return valueOfStorage;
        }
    }

    function getPayInfo() {
        let radiosArray = form.elements.exampleRadios;

        let payInfo;

        for (let i = 0; i < radiosArray.length; i++) {
            if (radiosArray[i].checked) {
                payInfo = radiosArray[i].value;
            }
        }

        return payInfo;
    }

    function getProductAmount() {
        let productAmount = form.elements.productAmount;
        let valueOfProductAmount = Number(productAmount.value);

        if (valueOfProductAmount === 0 || isNaN(valueOfProductAmount)  || valueOfProductAmount <= 0) {
            productAmount.classList.add('is-invalid');
        } else {
            productAmount.classList.remove('is-invalid');
            return valueOfProductAmount;
        }
    }

    function getFeedback() {
        return form.elements.feedback.value;
    }

    function showOrderInfo() {
        let activeButtonInCategory = document.querySelector('.col-2.categories .list-group-item.list-group-item-action.active');
        let activeButtonOfProductList = productsList.querySelector('.active');
        let keyOfActiveButtonInCategory = activeButtonInCategory.getAttribute('data-key');
        let productName = products[keyOfActiveButtonInCategory] // ключ категории
                          [activeButtonOfProductList.getAttribute('data-id')] // индекс объект товара в категории
                          .name;
        let priceForOne = products[keyOfActiveButtonInCategory] // ключ категории
                          [activeButtonOfProductList.getAttribute('data-id')] // индекс объект товара в категории
                          .price * currencyToUSD;

        function getSum() {
            let productPrise = products[keyOfActiveButtonInCategory] // ключ категории
                                       [activeButtonOfProductList.getAttribute('data-id')] // индекс объект товара в категории
                                       .price;

            return ((productPrise * currencyToUSD) * getProductAmount());
        }

        document.write('<p>' + 'Имя: ' + name + '</ p>');
        document.write('<p>' + 'Фамилия: ' + surName + '</ p>');
        document.write('<p>' + 'Город: ' + city + '</ p>');
        document.write('<p>' + 'Отделение почты для отправки: ' + store + '</ p>');
        document.write('<p>' + 'Вид платежа: ' + payInfo + '</ p>');
        document.write('<p>' + 'Товар: ' + productName + '</ p>');
        document.write('<p>' + 'Цена за штуку: ' + priceForOne + 'грн' + '</ p>');
        document.write('<p>' + 'Кол-во товара: ' + productAmount + '</ p>');
        document.write('<p>' + 'Сумма к оплате: ' + getSum() + 'грн' + '</ p>');
        document.write('<p>' + 'Комментарий к заказу: ' + feedback  + '</ p>');
    }
}

function showCategories() {
    let parent = document.querySelector('.col-2.categories');
    let listGroup = createAnyElementWithClass('div', 'list-group');

    for (let i = 0; i < categories.length; i++) {
        let button = createButton(categories[i].name);
        button.setAttribute('data-key', categories[i].key);

        button.addEventListener('click', function (e) {
            let activeButtonInCategory = e.target;
            let keyOfActiveButtonInCategory = activeButtonInCategory.getAttribute('data-key');

            for (let j = 0; j < categoriesButtons.length; j++) {
                if (keyOfActiveButtonInCategory === categoriesButtons[j].getAttribute('data-key')) {
                    activeButtonInCategory.classList.add('active');
                } else {
                    categoriesButtons[j].classList.remove('active');
                }
            }

            showProductsList();

            function showProductsList() {
                let listGroup = createAnyElementWithClass('div', 'list-group');

                for (let j = 0; j < products[keyOfActiveButtonInCategory].length; j++) {
                    let productButton = createButton(products[keyOfActiveButtonInCategory][j].name);
                    productButton.setAttribute('data-id', products[keyOfActiveButtonInCategory][j].id);

                    productButton.addEventListener('click', function (e) {
                        let activeButtonOfProductList = e.target;
                        let idOfActiveButtonOfProduct = activeButtonOfProductList.getAttribute('data-id');
                        let arrCurrentButtonsProductsList = productsList.querySelectorAll('button');

                        for (let j = 0; j < arrCurrentButtonsProductsList.length; j++) {
                            let idCurrentProductButton = arrCurrentButtonsProductsList[j].getAttribute('data-id');

                            if (idOfActiveButtonOfProduct === idCurrentProductButton) {
                                productButton.classList.add('active');
                            } else {
                                arrCurrentButtonsProductsList[j].classList.remove('active');

                            }
                        }

                        showProduct();

                        function showProduct() {
                            let card = createAnyElementWithClass('div', 'card');
                            let img = createAnyElementWithClass('img', 'card-img-top align-self-center mt-3');

                            img.setAttribute('src', 'images/' +
                                products[keyOfActiveButtonInCategory][activeButtonOfProductList.getAttribute('data-id')].imgName +
                                '.jpg');
                            img.setAttribute('alt', '...');
                            img.style.width = '18rem';

                            let cardBody = createAnyElementWithClass('div', 'card-body');
                            let cardTitle = createAnyElementWithClass(
                                'h5',
                                'card-title',
                                products[keyOfActiveButtonInCategory][activeButtonOfProductList.getAttribute('data-id')].name);

                            let cardText = createAnyElementWithClass('p', 'card-text' , 'Цена ' + (products[keyOfActiveButtonInCategory][activeButtonOfProductList.getAttribute('data-id')].price * currencyToUSD) + ' грн');
                            let btnBuy = createAnyElementWithClass('a', 'btn btn-primary', 'Купить', 'scroll-to-me');
                            btnBuy.href = '#scroll-to-me';

                            btnBuy.addEventListener('click', function () {
                                let formContainer = document.querySelectorAll('.container')[1];
                                formContainer.style.display = 'block';

                                let form = document.forms.order;

                                form.elements.button.addEventListener('click', function (e) {
                                    e.preventDefault();

                                    getOrder();
                                });
                            });

                            const arrOfCardBodyItems = [cardTitle, cardText, btnBuy];

                            for (let k = 0; k < arrOfCardBodyItems.length; k++) {
                                cardBody.appendChild(arrOfCardBodyItems[k]);
                            }

                            const arrOfCardItems = [img, cardBody];

                            for (let k = 0; k < arrOfCardItems.length; k++) {
                                card.appendChild(arrOfCardItems[k]);
                            }

                            if (product.lastChild === product.querySelector('.card')) {
                                product.removeChild(product.lastChild);
                            }

                            product.appendChild(card);
                        }

                        if (formContainer.style.display === 'block') {
                            formContainer.style.display = 'none';
                        }
                    });

                    listGroup.appendChild(productButton);


                }

                if (productsList.lastChild === productsList.querySelector('.list-group')) {
                    productsList.removeChild(productsList.lastChild);
                }

                productsList.appendChild(listGroup);
            }

            if (product.lastChild === product.querySelector('.card')) {
                product.removeChild(product.lastChild);
            }

            let formContainer = document.body.querySelector('.container.form');

            if (formContainer.style.display === 'block') {
                formContainer.style.display = 'none';
            }
        });

        listGroup.appendChild(button);
    }

    parent.appendChild(listGroup);
}