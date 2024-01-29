'use strict'

const ValidationContract = require('../fluent-validator');   //importa o validador

let erros = [];

exports.Erros = () => {
    return erros;
}

exports.Validation = (data) => {
         
        let contract = new ValidationContract();
        contract.hasMinLen(data.title, 3, 'O título deve conter pelo menos 3 caracteres');
        contract.hasMinLen(data.slug, 3, 'O slug deve conter pelo menos 3 caracteres');
        contract.hasMinLen(data.description, 3, 'A descrição deve conter pelo menos 3 caracteres');
        contract.isGreaterThan(data.price, 0, 'O preço deve ser maior que zero');
        contract.isEmpty(data.tags, 'A tag não pode ser vazia');
        erros = contract.errors();
        return contract;
}
