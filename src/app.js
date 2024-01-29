'use strict' // serve para o node entender que vamos usar o js no modo strict, ou seja, mais seguro


const express = require("express");
const router = express.Router();
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');


mongoose.connect(config.connectionString);


// carrega os models
const Product = require('./models/product'); 
const Order = require('./models/order'); 
const Customer = require('./models/custumer'); 


// carrega as rotas
const indexRoute = require('./routes/index-route');
const productRoute = require('./routes/product-route');
const customerRoute = require('./routes/customer-route');
const orderRoute = require('./routes/order-route');

//Caso de erro "PayloadTooLargeError: request entity too large", ao fazer upload de imagem base64
app.use(express.json({ limit: "200mb" })); //configura o limite de tamanho do json
app.use(express.urlencoded({ extended: true, limit: "200mb" })); // configura o limite de tamanho do urlencoded

app.use(bodyParser.json()); // converte o body para json
app.use(bodyParser.urlencoded({ extended: false })); // converte o body para urlencoded

//Habilitar o CORS
app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*'); // permite que todos os dominios acessem a api
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token'); // permite que todos os headers sejam enviados
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // permite que todos os metodos sejam enviados

    next();
});

const route = router.get('/', (req, res, next) => {
    res.status(200).send({
        title: "Node Store API",
        version: "0.0.1"
    });
});

app.use('/', indexRoute); 
app.use('/products', productRoute); 
app.use('/customers', customerRoute); 
app.use('/orders', orderRoute); 

module.exports = app; // exporta o app