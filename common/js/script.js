Vue.component('search-input', {
    template: '' +
        '<div>' +
        '<label> Поиск: <input v-on:input="$emit(\'input\', $event.target.value)" type="text" title="search"></label>' +
        '</div>',
});

Vue.component('basket', {
    props: ['basket'],
    template: '' +
        '<div id="basket">' +
        '   <div id="itemsPool">' +
        '       <div id="basketPanel">Сумма = {{basket.amount}} <input type="button" value="Очистить" v-on:click="$emit(\'clear\')"></div>' +
        '       <div id="basketItems" v-for="item in basket.contents">' +
        '           <span class="itemName">{{item.title}} </span>' +
        '           <input type="button" value="Удалить" v-on:click="$emit(\'delete\', item)">' +
        '           <span class="itemCount"> x{{item.quantity}} </span> ' +
        '       </div>' +
        '   </div>' +
        '</div>'
});

Vue.component('alert', {
    template: '<div id="alert"> Не судьба. ¯\\_(ツ)_/¯</div>'
});

let app = new Vue({
    el: '#app',
    data: {
        goods: [],
        filteredGoods: [],
        filter: '',
        isVisibleCart: false,
        basket: {
            amount: 0,
            countGoods: 0,
            contents: [],
        }
    },
    methods: {
        search: function (filter) {
            this.filter = filter;
            this.filteredGoods = [];
            for (let i in this.goods) {
                if (this.goods[i].title.toLowerCase().indexOf(this.filter.toLowerCase()) >= 0 || this.filter === '') {
                    this.filteredGoods.push(this.goods[i]);
                }
            }
        },
        visibleBasket: function () {
            this.isVisibleCart = !this.isVisibleCart
        },
        makeXHR: function (url, method, data) {
            return new Promise((resolve, reject) => {
                const xhr = window.XMLHttpRequest
                    ? new window.XMLHttpRequest() : new window.ActiveXObject();
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            resolve(JSON.parse(xhr.responseText))
                        }
                        reject(new Error())
                    }
                };

                xhr.open(method, url, true);
                xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
                xhr.send(data)
            })
        },
        getGoods: function () {
            let promise = this.makeXHR('http://localhost:3000/catalogData', 'GET');
            promise.then(result => {
                    this.goods = result;
                    this.filteredGoods = result;
                },
                error => {
                    console.log(error)
                },
            );
        },
        getBasket: function () {
            let promise = this.makeXHR('http://localhost:3000/getBasket', 'GET');
            promise.then(result => {
                    this.basket = result
                },
                error => {
                    console.log(error)
                },
            );
        },
        addToCart: function (item) {
            let promise = this.makeXHR('http://localhost:3000/addToCart', 'POST', JSON.stringify(item));
            promise.then(result => {
                    this.getBasket()
                },
                error => {
                    console.log(error)
                },
            );
        },
        removeFromCart: function (item) {
            let promise = this.makeXHR('http://localhost:3000/deleteFromBasket', 'POST', JSON.stringify(item));
            promise.then(result => {
                    this.getBasket()
                },
                error => {
                    console.log(error)
                },
            );
        },
        clearBasket: function () {
            let promise = this.makeXHR('http://localhost:3000/deleteAllBasket', 'POST');
            promise.then(result => {
                    this.getBasket()
                },
                error => {
                    console.log(error)
                },
            );
        }
    },
    created: function () {
        this.getGoods();
        this.getBasket();
    }
});