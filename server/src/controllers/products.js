const Product = require('../models/Product');
exports.create = async (req, res) => {
    const body = req.body;
    const p = await Product.create(body);
    res.status(201).json(p);
};
exports.update = async (req, res) => {
    const p = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new:
            true
    });
    res.json(p);
};
exports.remove = async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
};
exports.get = async (req, res) => {
    const p = await Product.findById(req.params.id);
    if (!p) return res.status(404).json({ message: 'Not found' });
    res.json(p);
};
exports.list = async (req, res) => {
    const { q, category, brand, minPrice, maxPrice, size, color, page = 1, limit
        = 20, sort = '-createdAt' } = req.query;
    const filter = {};
    if (q) filter.$text = { $search: q };
    if (category) filter.category = category;
    if (brand) filter.brand = brand;
    if (size) filter.sizes = size;
    if (color) filter.colors = color;
    if (minPrice || maxPrice) filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
    const pageNum = Math.max(1, Number(page));
    const lim = Math.min(100, Number(limit));
    const skip = (pageNum - 1) * lim;
    const total = await Product.countDocuments(filter);
    let query = Product.find(filter).sort(sort).skip(skip).limit(lim);
    if (q) query = query.select({ score: { $meta: 'textScore' } }).sort({
        score:
            { $meta: 'textScore' }
    });
    const products = await query.exec();
    res.json({ meta: { total, page: pageNum, limit: lim }, data: products });
};