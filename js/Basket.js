function Basket(items = []) {
    this.cost = 0;
    this.items = items;
    this.addItems = function (items = []) {
        this.items = this.items.concat(items)
    };
    this.removeItems = function (items = []) {

    };
    this.getItems = function () {
        return this.items
    };
    this.getCost = function () {
        return this.cost
    };
}