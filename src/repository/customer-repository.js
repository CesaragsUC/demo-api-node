'use strict'

const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

exports.get = async() => {

    const res =  await Customer.find(); //especifica os campos que queremos retornar
    return res;
};

exports.getBySlug = async(slug) => {

    const res =  await  Customer.findOne();
    return res;
};

exports.getById = async(id) => {

    const res =  await  Customer.findById(id);
    return res;
};


exports.create = async(data) => {

    var custumer = new Customer(data);
    await custumer.save();

}

exports.update = async(id, data) => {

    await Customer.findByIdAndUpdate(id,
    {
        $set: {
            name: data.name,
            email: data.email,
            password: data.password,

        }
    
    })

}

exports.delete = async (id) => {

    await  Customer.findOneAndDelete(id);

}

exports.authenticate = async(data) => {

    const res = await Customer.findOne({
        email: data.email,
        password: data.password
    });
    return res;
}


