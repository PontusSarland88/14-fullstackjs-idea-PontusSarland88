const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema for Order
const OrderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId, ref: 'users'
    },
    orderedProducts: [{
        id: {
            type: Number,
            required: true
        },
        productName: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    customerName: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    totalSum: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    active: {
        type: Boolean,
        default: true,
    }
});

module.exports = Order = mongoose.model('orders', OrderSchema);