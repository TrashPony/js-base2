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