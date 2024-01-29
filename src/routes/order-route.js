'use strict' 

// Customer Route

const express = require("express");
const router = express.Router();
const authSevice = require('../services/auth-service');
const controller = require('../controllers/order-controller');

router.get('/',authSevice.authorize, controller.get);
router.get('/byid/:id', authSevice.authorize,controller.getById); //ex: http://localhost:3000/products/byid/65a14d46a47e2c898cc0842c
router.post('/',authSevice.authorize, controller.post);
router.put('/:id',authSevice.authorize, controller.put);
router.delete('/:id',authSevice.authorize, controller.delete);

module.exports = router;