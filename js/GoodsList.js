class GoodsList {
    constructor() {
        this.goods = []
    }

    fetchGoods() {
        return new Promise(function (resolve, reject) {
            this.goods = [
                {title: 'Shirt', price: 150},
                {title: 'Socks', price: 50},
                {title: 'Jacket', price: 350},
                {title: 'Shoes', price: 350},
            ];
            resolve();
        }.bind(this))
    }

    countPrice() {
        let sum = 0;
        for (let i in this.goods) {
            if (this.goods[i].price) {
                sum += this.goods[i].price
            } else {
                sum += DEFAULT_PRICE
            }
        }
        return sum
    };

    render() {
        document.querySelector('.goods-list').innerHTML = '';
        let goodsList = this.goods.map(item => {
            return `<div class="goods-item">
                <div class="icon"></div>
                <h3>${item.title}</h3>
                <p>${item.price}</p>
                <div class="buttonToCart" id="${item.title}">Купить</div>
            </div>`
        });
        document.querySelector('.goods-list').innerHTML = goodsList.join('');

        for (let i in this.goods) {
            let button = document.getElementById(this.goods[i].title);
            if (button) button.onclick = () => {
                basket.addItems([this.goods[i]])
            }
        }
    }
}