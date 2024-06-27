const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    lastPurchaseDate: Date
});

module.exports = mongoose.model('Customer', customerSchema);
