const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// for storing users
let items = [];

app.use(cors());

// setting up body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/item', (req, res) => {
    const item = req.body;
    
    // output to console for debugging
    console.log(item);
    items.push(item);

    res.send('item added to the database');
});

app.get('/items', (req, res) => {
    res.json(items);
});

app.get('/', (req, res) => {
    res.sendFile('C:/Users/R9/Documents/QuestaGame/project/new_item.html');
});

app.listen(port, () => console.log(`e-commerce app listening on port ${port}!`));

