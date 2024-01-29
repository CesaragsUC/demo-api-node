'use strict' 

// Product Model

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({

    title: {
        type: String,
        required: [true,"O título é obrigatório"], // mensagem de erro
        trim: true // remove os espaços em branco
    },

    slug: {
        type: String,
        required: [true, 'O slug é obrigatório'],
        trim: true,
        index: true,
        unique: true
    },

    description: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    active: {
        type: Boolean,
        required: true,
        default: true
    },
    tags: [{
        type: String,
        required: true
    }],
    image: {
        type: String,
        required: true, // mensagem de erro
        trim: true // remove os espaços em branco
    },

});

module.exports = mongoose.model('Product', schema); // exporta o model
