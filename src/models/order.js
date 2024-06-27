const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    totalValue: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    fulfillmentTime: Number // in hours
});

module.exports = mongoose.model('Order', orderSchema);
