const mongoose = require('mongoose');
const { Schema } = mongoose;
const OrderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{
        product: { type: Schema.Types.ObjectId, ref: 'Product' },
        title: String,
        qty: Number,
        unitPrice: Number
    }],
    subtotal: Number,
    shipping: Number,
    tax: Number,
    total: Number,
    payment: {
        status: {
            type: String, enum: ['pending', 'paid', 'failed', 'refunded'],
            default: 'pending'
        },
        method: String,
        transactionId: String
    },
    shippingAddress: {
        line1: String, city: String, postalCode: String,
        country: String
    },
    status: {
        type: String, enum:
            ['processing', 'shipped', 'delivered', 'cancelled'], default: 'processing'
    },
    createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('order', OrderSchema);