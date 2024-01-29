'use strict'

const ValidationContract = require('../fluent-validator');   //importa o validador

let erros = [];

exports.Erros = () => {
    return erros;
}

exports.Validation = (data) => {
         
        let contract = new ValidationContract();
        contract.hasMinLen(data.name, 3, 'O Nome deve conter pelo menos 3 caracteres');
        contract.isEmail(data.email, 'O informe um Email válido');
        contract.hasMinLen(data.password, 6, 'A senha deve conter pelo menos 6 caracteres');
        erros = contract.errors();
        return contract;
}
