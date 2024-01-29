'use strict' 

// Customer Route

const express = require("express");
const router = express.Router();
const authSevice = require('../services/auth-service');
const controller = require('../controllers/customer-controller');

router.get('/', controller.get);
router.get('/byid/:id', controller.getById); //ex: http://localhost:3000/products/byid/65a14d46a47e2c898cc0842c
router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/:id', controller.delete);
router.post('/authenticate', controller.authenticate);
router.post('/refresh-token',authSevice.authorize, controller.refreshToken);

module.exports = router;