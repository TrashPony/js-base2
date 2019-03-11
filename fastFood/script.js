let userBasket = new Basket();

function Burger(type, cheese, salad, potato, spice, mayonnaise) {
    this.type = type;
    this.cheese = cheese;
    this.salad = salad;
    this.potato = potato;
    this.spice = spice;
    this.mayonnaise = mayonnaise;

    let price = 0;
    let calories = 0;
    if (type === 'small') {
        price += 50;
        calories += 20;
    } else {
        price += 100;
        calories += 40;
    }

    let calc = function (option, addPrice, addCalories) {
        if (option) {
            price += addPrice;
            calories += addCalories;
        }
    };

    calc(cheese, 10, 20);
    calc(salad, 20, 5);
    calc(potato, 15, 10);
    calc(spice, 15, 0);
    calc(spice, 20, 5);

    this.price = price;
    this.calories = calories;
}

function Basket() {
    this.burgers = [];
    this.addBurger = function (burger) {
        this.burgers.push(burger)
    };
    this.getCalories = function () {
        let sum = 0;
        for (let i in this.burgers) {
            sum += this.burgers[i].calories
        }
        return sum
    };
    this.getPrice = function () {
        let sum = 0;
        for (let i in this.burgers) {
            sum += this.burgers[i].price
        }
        return sum
    };
}

function CreateBurger(type) {
    let cheese, salad, potato, spice, mayonnaise;

    let checkCheckBox = function (id) {
        return document.getElementById(id).checked
    };


    if (type === 'big') {
        cheese = checkCheckBox("bigCheese");
        salad = checkCheckBox("bigSalad");
        potato = checkCheckBox("bigPotato");
        spice = checkCheckBox("bigSpice");
        mayonnaise = checkCheckBox("bigMayonnaise");
        if (!(cheese || salad || potato || spice || mayonnaise)) {
            alert("нехватает опций!");
            return
        }
    } else if (type === 'small') {
        cheese = checkCheckBox("smallCheese");
        salad = checkCheckBox("smallSalad");
        potato = checkCheckBox("smallPotato");
        spice = checkCheckBox("smallSpice");
        mayonnaise = checkCheckBox("smallMayonnaise");
    }
    userBasket.addBurger(new Burger(type, cheese, salad, potato, spice, mayonnaise));
    updateContent();
}

function updateContent() {
    let content = document.getElementById("content");
    content.innerHTML = `
                <tr>
                <th>Тип</th>
                <th>Сыр</th>
                <th>Салат</th>
                <th>Картошка</th>
                <th>Специи</th>
                <th>Майонез</th>
                <th>Цена</th>
                <th>Каллории</th>
            </tr>
    `;

    for (let i in userBasket.burgers) {
        let burger = userBasket.burgers[i];
        content.innerHTML += `
            <tr>
                <td>${burger.type}</td>
                <td>${burger.cheese}</td>
                <td>${burger.salad}</td>
                <td>${burger.potato}</td>
                <td>${burger.spice}</td>
                <td>${burger.mayonnaise}</td>
                <td>${burger.price}</td>
                <td>${burger.calories}</td>
            </tr>
        `
    }

    document.getElementById("calc").innerHTML = `
        <div> Общая цена: ${userBasket.getPrice()} </div> 
        <div> Всего колорий: ${userBasket.getCalories()} </div>
`
}