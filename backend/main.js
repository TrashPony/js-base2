const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.listen(3000, function () {
    console.log('server is running on port 3000!');
});

app.use(bodyParser.json());
app.use(express.static('./common'));
app.use(cors());

const addItem = (item, cart) => {
    for (let good of cart.contents) {
        if (good.title === item.title) {
            good.quantity++;
            return;
        }
    }
    item.quantity = 1;
    cart.contents.push(item);
};

app.get('/catalogData', (req, res) => {
    fs.readFile('backend/data/catalog.json', 'utf8', (err, data) => {
        res.send(data);
    });
});

app.get('/getBasket', (req, res) => {
    fs.readFile('backend/data/cart.json', 'utf8', (err, data) => {
        res.send(data);
    });
});

app.post('/addToCart', (req, res) => {
    fs.readFile('backend/data/cart.json', 'utf8', (err, data) => {
        if (err) {
            res.send('{"result": 0}');
        } else {
            const cart = JSON.parse(data);
            cart.countGoods++;
            cart.amount += req.body.price;
            addItem(req.body, cart);
            fs.writeFile('backend/data/cart.json', JSON.stringify(cart), (err) => {
                if (err) {
                    res.send('{"result": 0}');
                } else {
                    res.send('{"result": 1}');
                }
            });
        }
    });
});

app.post('/deleteFromBasket', (req, res) => {
    fs.readFile('backend/data/cart.json', 'utf8', (err, data) => {
        if (err) {
            res.send('{"result": 0}');
        } else {
            const cart = JSON.parse(data);
            cart.contents.forEach(good => {
                if (good.title === req.body.title) {
                    cart.amount -= (good.price * good.quantity);
                    cart.countGoods -= (good.quantity);
                }
            });
            cart.contents = cart.contents.filter(good => good.title !== req.body.title);
            fs.writeFile('backend/data/cart.json', JSON.stringify(cart), (err) => {
                if (err) {
                    res.send('{"result": 0}');
                } else {
                    res.send('{"result": 1}');
                }
            });
        }
    });
});

app.post('/deleteAllBasket', (req, res) => {
    fs.writeFile('backend/data/cart.json', ('{"amount":0,"countGoods":0,"contents":[]}'), (err) => {
        if (err) {
            res.send('{"result": 0}');
        } else {
            res.send('{"result": 1}');
        }
    });
});