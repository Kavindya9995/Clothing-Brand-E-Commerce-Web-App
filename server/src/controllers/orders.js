const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { sendOrderConfirmation } = require('../services/email');
const mongoose = require('mongoose');
// helper to calculate totals
function calcTotals(items) {
    const subtotal = items.reduce((s, it) => s + (it.unitPrice * it.qty), 0);
    const shipping = subtotal > 5000 ? 0 : 500; // example rule (cents)
    const tax = Math.round(subtotal * 0.08);
    const total = subtotal + shipping + tax;
    return { subtotal, shipping, tax, total };
}
// exports.createOrder = async (req, res) => {
//     // Accepts either server-side cart or body cart
//     const session = await mongoose.startSession();
//     try {
//         session.startTransaction();
//         let items = [];
//         if (req.body.cartId) {
//             const cart = await Cart.findOne({
//                 _id: req.body.cartId, user:
//                     req.user._id
//             }).populate('items.product');
//             if (!cart) throw { status: 400, message: 'Cart not found' };
//             items = cart.items.map(it => ({
//                 product: it.product._id, title:
//                     it.product.title, qty: it.qty, unitPrice: it.priceAtAdd ?? it.product.price
//             }));
//         } else if (req.body.items && Array.isArray(req.body.items)) {
//             // validate items
//             for (const it of req.body.items) {
//                 const p = await Product.findById(it.productId).session(session);
//                 if (!p) throw {
//                     status: 400, message: `Product ${it.productId} not found` };
//                 if (p.inventory < it.qty) throw {
//                     status: 400, message: `Insufficient inventory for ${p.title}`
//                 };
//                 items.push({
//                     product: p._id, title: p.title, qty: it.qty, unitPrice:
//                         p.price
//                 });
//             }
//         } else {
//             throw { status: 400, message: 'Cart or items required' };
//         }
//         // re-check inventory & decrement
//         for (const it of items) {
//             const p = await Product.findById(it.product).session(session);
//             if (p.inventory < it.qty) throw {
//                 status: 400, message: `Insufficient inventory for ${p.title}`
//             };
//             p.inventory -= it.qty;
//             await p.save({ session });
//         }
//         const totals = calcTotals(items);
//         // mock payment: accept any paymentMethod; mark paid
//         const payment = {
//             status: 'paid', method: req.body.paymentMethod || 'mock',
//             transactionId: `mock_${Date.now()}`
//         };
//         const order = await Order.create([{
//             user: req.user._id,
//             items,
//             subtotal: totals.subtotal,
//             shipping: totals.shipping,
//             tax: totals.tax,
//             total: totals.total,
//             payment,
//             shippingAddress: req.body.shippingAddress || {}
//         }], { session });
//         // clear cart if cartId provided
//         if (req.body.cartId) {
//             await Cart.findByIdAndDelete(req.body.cartId).session(session);
//         }
//         await session.commitTransaction();
//         await sendOrderConfirmation(req.user.email, order[0]);
//         res.status(201).json(order[0]);
//     } catch (err) {
//         await session.abortTransaction();
//         throw err;
//     } finally {
//         session.endSession();
//     }
// };
exports.createOrder = async (req, res) => {
  try {
    let items = [];

    // Case 1: From cart
    if (req.body.cartId) {
      const cart = await Cart.findOne({
        _id: req.body.cartId,
        user: req.user._id
      }).populate('items.product');

      if (!cart) {
        return res.status(400).json({ message: 'Cart not found' });
      }

      items = cart.items.map(it => ({
        product: it.product._id,
        title: it.product.title,
        qty: it.qty,
        unitPrice: it.priceAtAdd ?? it.product.price
      }));

      // Decrement inventory for cart items
      for (const it of cart.items) {
        const p = await Product.findById(it.product._id);
        if (!p || p.inventory < it.qty) {
          return res.status(400).json({ message: `Insufficient inventory for ${it.product.title}` });
        }
        p.inventory -= it.qty;
        await p.save();
      }

      // Clear cart
      await Cart.findByIdAndDelete(req.body.cartId);
    }

    // Case 2: From direct items
    else if (req.body.items && Array.isArray(req.body.items)) {
      for (const it of req.body.items) {
        const p = await Product.findById(it.productId);
        if (!p) {
          return res.status(400).json({ message: `Product ${it.productId} not found` });
        }
        if (p.inventory < it.qty) {
          return res.status(400).json({ message: `Insufficient inventory for ${p.title}` });
        }

        p.inventory -= it.qty;
        await p.save();

        items.push({
          product: p._id,
          title: p.title,
          qty: it.qty,
          unitPrice: p.price
        });
      }
    } 
    
    else {
      return res.status(400).json({ message: 'Cart or items required' });
    }

    // Totals & payment
    const totals = calcTotals(items);
    const payment = {
      status: 'paid',
      method: req.body.paymentMethod || 'mock',
      transactionId: `mock_${Date.now()}`
    };

    // Create order
    const order = await Order.create({
      user: req.user._id,
      items,
      subtotal: totals.subtotal,
      shipping: totals.shipping,
      tax: totals.tax,
      total: totals.total,
      payment,
      shippingAddress: req.body.shippingAddress || {}
    });

    // Send confirmation email
    await sendOrderConfirmation(req.user.email, order);

    res.status(201).json(order);

  } catch (err) {
    console.error('CreateOrder Error:', err);
    res.status(err.status || 500).json({ message: err.message || 'Error creating order' });
  }
};


exports.getOrders = async (req, res) => {
    const filter = {};
    if (req.user.role !== 'admin') filter.user = req.user._id;
    const orders = await Order.find(filter).sort('-createdAt');
    res.json(orders);
};
exports.getOrder = async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Not found' });
    if (req.user.role !== 'admin' && order.user.toString() !==
        req.user._id.toString()) return res.status(403).json({ message: 'Forbidden' });
    res.json(order);
};