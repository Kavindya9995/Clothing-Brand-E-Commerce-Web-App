const Cart = require('../models/Cart');
const Product = require('../models/Product');
exports.getCart = async (req, res) => {
    let cart = await Cart.findOne({
        user:
            req.user._id
    }).populate('items.product');
    if (!cart) cart = { items: [] };
    res.json(cart);
};
exports.addItem = async (req, res) => {
    const { productId, qty = 1 } = req.body;
    if (!productId) return res.status(400).json({
        message: 'productId required'
    });
    const product = await Product.findOne({ _id: productId });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) cart = await Cart.create({ user: req.user._id, items: [] });
    const idx = cart.items.findIndex(it => it.product.toString() === productId);
    if (idx >= 0) cart.items[idx].qty = Math.max(1, cart.items[idx].qty +
        Number(qty));
    else cart.items.push({
        product: product._id, qty: Number(qty), priceAtAdd:
            product.price
    });
    cart.updatedAt = new Date();
    await cart.save();
    cart = await cart.populate('items.product');
    res.json(cart);
};
exports.removeItem = async (req, res) => {
    const { productId } = req.params;
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.json({ items: [] });
    cart.items = cart.items.filter(it => it.product.toString() !== productId);
    await cart.save();
    cart = await cart.populate('items.product');
    res.json(cart);
};