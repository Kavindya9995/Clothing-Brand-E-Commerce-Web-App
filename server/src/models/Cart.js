const mongoose = require('mongoose');
const { Schema } = mongoose;
const CartSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    items: [{
        product: { type: Schema.Types.ObjectId, ref: 'product' },
        qty: { type: Number, default: 1 },
        priceAtAdd: Number
    }],
    updatedAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('cart', CartSchema);