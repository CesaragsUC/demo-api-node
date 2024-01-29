'use strict' 

// Product Route

const express = require("express");
const router = express.Router();

const controller = require('../controllers/product-controller');

const authSevice = require('../services/auth-service');


router.get('/', controller.get);
router.get('/:slug', controller.getBySlug);// ex: http://localhost:3000/products/placa-video
router.get('/admin/:id', controller.getById); //ex: http://localhost:3000/products/admin/65a14d46a47e2c898cc0842c
router.get('/tags/:tag', controller.getByTag);
router.post('/',authSevice.isAdmin, controller.post); //jwt somente admin autentiiado com jwt pode cadastrar produto
router.put('/:id',authSevice.isAdmin, controller.put);//jwt somente admin autentiiado com jwt pode atualizar produto
router.delete('/:id', authSevice.isAdmin,controller.delete);

module.exports = router;