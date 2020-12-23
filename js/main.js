// для товаров в корзине
let cart = {};

//region Вычитывае файл и передаем его другой функции
const init = () => {
    $.getJSON("goods.json", goodsOut);

};

//endregion

//region Вывод товара на главную страницу
const goodsOut = (data) => {

    let out = "";

    for (let key in data.product) {
        out += `<div class="cart">
<p class="name">` + data.product[key].name + `</p>
<img class="img-small" src="./images/` + data.product[key].img + `" alt="">
<div class="cost">` + data.product[key].cost + `</div>
<button class="add-to-cart" data-id="${key}">В корзину</button></div>`
    }
//Добавление на страницу
    $(".goods-out").html(out);

//Добавил обработчик
    $(`.add-to-cart`).on("click", addToCart);

    function addToCart() {
        const id = $(this).attr("data-id");
        if (cart[id] === undefined) {
            cart[id] = 1;
        } else cart[id]++;
        showMiniCard();
        saveCart();
    }
};


function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}


function showMiniCard() {
    let out = "";

    for (let key in cart) {
        out += key + "----" + cart[key] + "<br>";
    }
    $(".mini-cart").html(out);

}

//чтение товаров с корзины
function loadCart() {
    if (localStorage.getItem("cart")) {
        cart=JSON.parse(localStorage.getItem("cart"));
        showMiniCard();
    }
}

$(document).ready(() => {
    init();
    loadCart();

});

//endregion