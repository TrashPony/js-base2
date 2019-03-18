const goods = [
    {title: 'Shirt', price: 150},
    {title: 'Socks', price: 50},
    {title: 'Jacket', price: 350},
    {title: 'Shoes'}, // у Shoes нет price, значение подставится из аргумента по умолчанию
];

const DEFAULT_PRICE = 250;

const renderGoodsItem = (title, price = DEFAULT_PRICE) =>
    `<div class="goods-item">
        <div class="icon"></div>
        <h3>${title}</h3>
        <p>${price}</p>
        <div class="buttonToCart">Купить</div>
    </div>`;

const renderGoodsList = list => {
    const goodsList = list.map(item => renderGoodsItem(item.title, item.price));
    document.querySelector('.goods-list').innerHTML = goodsList.join('');
};

window.onload = () => {
    renderGoodsList(goods);

    let GoodsList = document.querySelector('.goods-list');
    GoodsList.sumAllItem = function () {
        let sum = 0;
        for (let i in goods) {
            if (goods[i].price) {
                sum += goods[i].price
            } else {
                sum += DEFAULT_PRICE
            }
        }
        return sum
    };

    console.log(GoodsList.sumAllItem());
};