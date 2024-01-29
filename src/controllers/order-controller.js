'use strict' // serve para o node entender que vamos usar o js no modo strict, ou seja, mais seguro

const orderValiador = require('../validators/order/order-validator');
const repository = require('../repository/order-repository');
const guid = require('guid');
const authSevice = require('../services/auth-service');

exports.get = async (req, res, next) => {

     try {
         var data = await repository.get();
         res.status(200).send({data });
     } catch (error) {
         res.status(400).send({message: 'Falha ao processar sua requisição'});
     }
};


exports.getById = async(req, res, next) => {

    try {
        var data = await repository.getById(req.params.id);
        res.status(200).send({data });
    } catch (error) {
        res.status(400).send({message: 'Falha ao processar sua requisição'});
    }
};


exports.post = async (req, res, next) => {
   
    //recuperar o token
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    //decodificar o token
    const data = await authSevice.decodeToken(token);

    let order = {
        customer: data.id,
        number:  guid.raw().substring(0,6),
        items: req.body.items
    };
    
    if(!orderValiador.Validation(order).isValid()){
        res.status(400).send(orderValiador.Erros()).end();
        return;
    }

     try {
         await repository.create(order);
         res.status(201).send({ 
            message: 'Pedido cadastrado com sucesso!' 
        });
     } catch (error) {
        res.status(400).send({
            message: 'Falha ao cadastrar o Pedido :',error});
     }
};

//metodo put
exports.put = async (req, res, next) => {


    let order = {
        customer: req.body.customer,
        items: req.body.items,
        status: req.body.status
    };
    

    if(!orderValiador.Validation(order).isValid()){
        res.status(400).send(orderValiador.Erros()).end();
        return;
    }
    
    try {
        await repository.update(req.params.id, order);
        res.status(201).send({message: 'Pedido atualizado com sucesso!' });
    } catch (error) {
        res.status(400).send({message: 'Falha ao atualizar o Pedido', error});
    }
};

//metodo delete
exports.delete = async (req, res, next) => {

    try {
        await repository.delete(req.params.id);
        res.status(201).send({message: 'Pedido removido com sucesso!' });
    } catch (error) {
        res.status(400).send({message:  'Falha ao remover o Pedido!'});
    }
};