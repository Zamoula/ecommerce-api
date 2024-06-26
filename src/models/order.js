const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    total: { type: Number, required: true },
    orderDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
