'use strict'

const mongoose = require('mongoose');
const Order = mongoose.model('Order');

exports.get = async() => {

    const res =  await Order.find()
    .populate('customer', 'name')
    .populate('items.product', 'title');

    return res;
};


exports.getById = async(id) => {

    const res =  await  Order.findById(id)
    .populate('customer')
    .populate('items.product');

    return res;
};


exports.create = async(data) => {

    var order = new Order(data);
    await order.save();

}

exports.update = async(id, data) => {

    await Order.findByIdAndUpdate(id,
    {
        $set: {
            items: data.items,
            status: data.status
        }
    
    })

}

exports.delete = async (id) => {

    await  Order.findOneAndDelete(id);

}


