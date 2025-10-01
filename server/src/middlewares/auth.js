const jwt = require('jsonwebtoken');
const User = require('../models/User');
exports.auth = async (req, res, next) => {
    const header = req.headers.authorization;
    console.log("Authorization Header:", header);
    if (!header || !header.startsWith('Bearer ')) return res.status(401).json({
        message: 'Unauthorized'
    });
    const token = header.split(' ')[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET ||
            'verysecret_change_me');
        console.log("Decoded JWT payload:", payload);
        const user = await User.findById(payload.id).select('-password');
        if (!user) return res.status(401).json({ message: 'Unauthorized' });
        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

exports.admin = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') return res.status(403).json({
        message: 'Forbidden'
    });
    next();
};