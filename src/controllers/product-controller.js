'use strict' // serve para o node entender que vamos usar o js no modo strict, ou seja, mais seguro

const productValiador = require('../validators/product/product-validator');
const repository = require('../repository/product-repository');
const azureService = require('../services/azure-blob-service');

exports.get = async (req, res, next) => {

     try {
         var data = await repository.get();
         res.status(200).send({data });
     } catch (error) {
         res.status(400).send({message: 'Falha ao processar sua requisição'});
     }
};

exports.getBySlug = async (req, res, next) => {

    try {
        var data = await repository.getBySlug(req.params.slug);
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


exports.getByTag = async(req, res, next) => {

    try {
        var data = await repository.getByTags(req.params.tag);
        res.status(200).send({data });
    } catch (error) {
        res.status(400).send({message: 'Falha ao processar sua requisição'});
    }
    

};

//metodo post
exports.post = async (req, res, next) => {
   
    if(!productValiador.Validation(req.body).isValid()){
        res.status(400).send(productValiador.Erros()).end();
        return;
    }


     try {
         
        await azureService.UploadImage(req.body.image);
        
        await repository.create(req.body);

         res.status(201).send({ message: 'Produto cadastrado com sucesso!' });

     } catch (error) {
        res.status(400).send({
            message: 'Falha ao cadastrar o produto :',error});
     }
};

//metodo put
exports.put = async (req, res, next) => {

    if(!productValiador.Validation(req.body).isValid()){
        res.status(400).send(productValiador.Erros()).end();
        return;
    }

    try {

        await azureService.UploadImage(req.body.image);

        await repository.update(req.params.id, req.body);

        res.status(201).send({message: 'Produto atualizado com sucesso!' });

    } catch (error) {
        res.status(400).send({message: 'Falha ao atualizar o produto', error});
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