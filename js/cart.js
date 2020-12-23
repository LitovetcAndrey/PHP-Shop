//Корзина
let cart = {};

//чтение товаров с корзины
function loadCart() {
    if (localStorage.getItem("cart")) {
        //получил данные с корзины
        cart = JSON.parse(localStorage.getItem("cart"));
        showCart();
    } else $(".main-cart").html("<div>Корзина пуста</div>");
}

//region Вывод  корзины
function showCart() {
    $.getJSON("./../goods.json", function (data) {
        let goods = data.product;
        if (jQuery.isEmptyObject(cart)) {
            $(".main-cart").html("<div>Корзина пуста</div>");
        } else {
            let out = "";
//проход по корзине
            for (let id in cart) {
                out += `<div class="cart">
        <p class="name" data-id="${id}">${goods[id].name}</p>
        <img  class="img-small" src="./../images/` + goods[id].img + `" alt=""/>
        <div  class="cost">${goods[id].cost}</div>      
        <div class="count">Количество ${cart[id]}</div>      
        <button class="delete-cart" data-id="${id}">Удалить</button>
    </div>`;
            }
            //Добавление на страницу
            $(".main-cart").html(out);

            //Добавил обработчик
            $(`.delete-cart`).on("click", deleteGoods);
        }

    });
}

function deleteGoods() {
    const id = $(this).attr("data-id");
    delete cart[id];
    saveCart();
    showCart();
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

$(document).ready(() => {
    loadCart();
})

