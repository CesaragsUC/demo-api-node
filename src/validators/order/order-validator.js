'use strict'

const ValidationContract = require('../fluent-validator');   //importa o validador

let erros = [];

exports.Erros = () => {
    return erros;
}

exports.Validation = (data) => {
         
        let contract = new ValidationContract();
        contract.isRequired(data.customer, 'O Customer não pode ser vazio');
        contract.isRequired(data.number, 'O Numero  do pedido não pode ser menor que zero');
        contract.isEmpty(data.items, 'Pedido deve possuir pelo menos um item');
        erros = contract.errors();
        return contract;
}
