const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: false },
    stock: { type: Number, required: true },
    rating: Number,
    sales: { type: Number, default: 0 }
});

module.exports = mongoose.model('Product', productSchema);
