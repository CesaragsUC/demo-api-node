'use strict' // serve para o node entender que vamos usar o js no modo strict, ou seja, mais seguro

const customerValiador = require('../validators/customer/customer-validator');
const repository = require('../repository/customer-repository');
const emailService = require('../services/email-service');
const md5 = require('md5');
const authSevice = require('../services/auth-service');

const config = require('../config');

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


//metodo post
exports.post = async (req, res, next) => {
   
    if(!customerValiador.Validation(req.body).isValid()){
        res.status(400).send(customerValiador.Erros()).end();
        return;
    }

    let customer = {
        name: req.body.name,
        email: req.body.email,
        password: md5(req.body.password + global.SALT_KEY),
        roles : ["user"]
    };

     try {
         
        await repository.create(customer);
        emailService.send( req.body.email, 'Bem vindo ao Node Store', global.EMAIL_TMPL.replace('{0}', req.body.name));

         res.status(201).send({ message: 'Cliente cadastrado com sucesso!'  });
         
     } catch (error) {
        res.status(400).send({
            message: 'Falha ao cadastrar o Cliente :',error});
     }
};

//metodo put
exports.put = async (req, res, next) => {

    if(!customerValiador.Validation(req.body).isValid()){
        res.status(400).send(customerValiador.Erros()).end();
        return;
    }
    
    try {
        await repository.update(req.params.id, req.body);
        res.status(201).send({message: 'Produto atualizado com sucesso!' });
    } catch (error) {
        res.status(400).send({message: 'Falha ao atualizar o produto', error});
    }
};


exports.authenticate = async (req, res, next) => {
   
    let customer = {
        email: req.body.email,
        password: md5(req.body.password + global.SALT_KEY),
    };

     try {
         
        const custumer = await repository.authenticate(customer);

        if(!custumer){
            res.status(404).send({
                message: 'Usuário ou senha inválidos!'
            });
            return;
        }

       const token = await authSevice.generateToken({
            id: custumer._id,
            email: custumer.email,
            name: custumer.name,
            roles: custumer.roles
        });
        

        res.status(201).send({ 
             token: token, 
             data: {
                id: custumer._id,
                email: custumer.email,
                name: custumer.name,
                roles: custumer.roles
             }
        });  
         
     } catch (error) {
        res.status(400).send({
            message: 'Ocorreu um erro:',error});
     }
};



exports.refreshToken = async (req, res, next) => {
   
    //recuperar o token
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    //decodificar o token
    const data = await authSevice.decodeToken(token);

     try {
         
        const custumer = await repository.getById(data.id);

        if(!custumer){
            res.status(404).send({
                message: 'Usuario nao encontrado!'
            });
            return;
        }

       const _newToken = await authSevice.generateToken({
            id: custumer._id,
            email: custumer.email,
            name: custumer.name,
            roles: custumer.roles
        });
        

        res.status(201).send({ 
             token: _newToken, 
             data: {
                id: custumer._id,
                email: custumer.email,
                name: custumer.name,
                roles: custumer.roles
             }
        });  
         
     } catch (error) {
        res.status(400).send({
            message: 'Ocorreu um erro:',error});
     }
};

//metodo delete
exports.delete = async (req, res, next) => {

    try {
        await repository.delete(req.params.id);
        res.status(201).send({message: 'Produto removido com sucesso!' });
    } catch (error) {
        res.status(400).send({message:  'Falha ao remover o produto!'});
    }
};