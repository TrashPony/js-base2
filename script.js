const goods = [
    {title: 'Shirt', price: 150},
    {title: 'Socks', price: 50},
    {title: 'Jacket', price: 350},
    {title: 'Shoes'}, // у Shoes нет price, значение подставится из аргумента по умолчанию
];

const renderGoodsItem = (title, price = 250) =>
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
};