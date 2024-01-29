'use strict' 

// Customer Model

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({

    name: {
        type: String,
        required: [true,"O Nome é obrigatório"], // mensagem de erro
        trim: true // remove os espaços em branco
    },

    email: {
        type: String,
        required: [true, 'O Email é obrigatório'],
        unique: true
    },

    password: {
        type: String,
        required: [true, 'O Password é obrigatório'],
    },
    roles: [{
        type: String,
        required: true,
        enum: ['user','admin'],
        default: 'user'
    }],
});

module.exports = mongoose.model('Customer', schema); // exporta o model
