"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db/db.js');
const itemData = require('./data/items_data.js');
const userData = require('./data/users_data.js');

const app = express();
const port = process.env.PORT || 3000;

// for storing users
let items = [];
let users = [];
let carts = [];
let login;

app.use(cors());

// setting up body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//List of post commands to get info from user in browser

app.post('/item', (req, res) => {
    const item = req.body;
    
    // output to console for debugging
    console.log(item);
    items.push(item);
    let newreq = req;
    let newres = res;
    db.createItem(newreq, newres);

    res.send('item added to the database');
});

app.post('/cart', (req, res) => {
    const toAdd = req.body;
    
    // output to console for debugging
    console.log(toAdd);
    carts.push(toAdd);
    db.createCartItem(req, res);
    res.send('item added to cart');
});

app.post('/user', (req, res) => {
    const user = req.body;
    
    // output to console for debugging
    console.log(user);
    users.push(user);
    db.createUser(req,res);
    res.send('user registered!');
});

app.post('/logged', async (req, res) => {
    const logdeets = req.body;
    let result = await db.checkEmailPasswordCombo(req, res);
    if(result.length !== 0) {
        login = logdeets;
        res.send('user logged in!');
    }else {
        res.send('Incorrect password or email');
    }
    
});

app.get('/items', (req, res) => {
    res.json(itemData.concat(items));
});

app.get('/users', (req, res) => {
    res.json(userData.concat(users));
});

app.get('/carts', (req, res) => {
    res.json(carts);
});

app.get('/logindeets', (req, res) => {
    res.json(login);
});

//get commands to display html files

app.get('/additem', (req, res) => {
    res.sendFile('C:/Users/R9/Documents/QuestaGame/project/new_item.html');
});

app.get('/login', (req, res) => {
    res.sendFile('C:/Users/R9/Documents/QuestaGame/project/login.html');
});

app.get('/addtocart', (req, res) => {
    res.sendFile('C:/Users/R9/Documents/QuestaGame/project/add_to_cart.html');
});

app.get('/itemlist', (req, res) => {
    res.sendFile('C:/Users/R9/Documents/QuestaGame/project/item_list.html');
});

app.get('/register', (req, res) => {
    res.sendFile('C:/Users/R9/Documents/QuestaGame/project/register.html');
});

app.get('/', (req, res) => {
    res.sendFile('C:/Users/R9/Documents/QuestaGame/project/main.html');
});

//functions from db unsure if necessary
app.get('/users', db.getUsers);
app.get('/users/:id', db.getUserById);
app.post('/users', db.createUser);
app.put('/users/:id', db.updateUser);
app.delete('/users/:id', db.deleteUser);

app.listen(port, () => console.log(`e-commerce app listening on port ${port}!`));