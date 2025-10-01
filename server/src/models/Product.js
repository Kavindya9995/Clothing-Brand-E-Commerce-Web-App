const mongoose = require('mongoose');
const { Schema } = mongoose;
const ProductSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    sku: { type: String, unique: true, sparse: true },
    price: { type: Number, required: true },
    brand: String,
    category: String,
    sizes: [String],
    colors: [String],
    images: [String],
    inventory: { type: Number, default: 0 },
    attributes: Schema.Types.Mixed,
    createdAt: { type: Date, default: Date.now }
});
ProductSchema.index({ title: 'text', description: 'text' });
module.exports = mongoose.model('product', ProductSchema);