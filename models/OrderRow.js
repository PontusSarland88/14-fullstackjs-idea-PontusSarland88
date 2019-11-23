const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema for OrderRow
const OrderRowSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId, 
        ref: 'products'
    },
    quantity: {
        type: Number,
        required: true
    }
});

module.exports = OrderRow = mongoose.model('orderRows', OrderRowSchema);

