const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const port = 3000;

// Set the views directory
app.set('views', path.join(__dirname, 'views'));
// Set the view engine to use Handlebars
app.set('view engine', 'hbs');

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// Use method-override middleware
app.use(methodOverride('_method'));

// Dummy product data
let products = {
    '1': { id: '1', name: 'iPhone', price: 999 },
    '2': { id: '2', name: 'MacBook', price: 1999 },
    // Add more products here
};

// Home route
app.get('/', (req, res) => {
    res.render('index', { products: Object.values(products) });
});

// Product details route
app.get('/product/:id', (req, res) => {
    const productId = req.params.id;
    const product = products[productId];
    if (product) {
        res.render('product', { product });
    } else {
        res.status(404).send('Product not found');
    }
});

// Add product route (POST request)
app.post('/product/add', (req, res) => {
    const { id, name, price } = req.body;
    if (id && name && price) {
        products[id] = { id, name, price };
        res.redirect('/');
    } else {
        res.status(400).send('Invalid request: Missing required parameters');
    }
});


app.delete('/product/:id', (req, res) => {
    const productId = req.params.id;
    console.log('Deleting product with ID:', productId);
    if (productId && products[productId]) {
        delete products[productId];
        console.log('Product deleted:', products);
        res.redirect('/');
    } else {
        res.status(404).send('Product not found');
    }
});

mongoose.connect('mongodb://127.0.0.1:27017/BlogPage')
.then(()=>{
    app.listen(port, () => {
        console.log(`Server is listening at http://localhost:${port}`);
    })
})

