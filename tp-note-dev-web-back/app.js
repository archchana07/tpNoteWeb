//Ce fichier permet de configurer le server Express
//On importe 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());

const products_routes = require('./src/productRoutes.js');
const carts_routes = require('./src/cartRoutes.js');

mongoose.connect('mongodb://localhost:27017/dbdemo');


app.listen(3004, () => {
    console.log('server is listening on port 3004');
})



app.use(express.json());
app.use('/api/products', products_routes);
app.use('/api/carts', carts_routes);