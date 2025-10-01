const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const signToken = (user) => jwt.sign({ id: user._id, role: user.role },
    process.env.JWT_SECRET || 'verysecret_change_me', {
    expiresIn:
        process.env.JWT_EXPIRES_IN || '1d'
});
// function signToken(user) {
//   return jwt.sign(
//     { id: user._id }, // 👈 must match what you expect in auth middleware
//     process.env.JWT_SECRET || 'verysecret_change_me',
//     { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
//   );
// }
exports.register = async (req, res) => {
    const { email, password, name } = req.body;
    if (!email || !password) return res.status(400).json({
        message: 'Email and password required'
    });
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email in use' });
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hash, name });
    const token = signToken(user);
    res.json({
        token, user: {
            id: user._id, email: user.email, name:
                user.name
        }
    });
};
exports.login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({
        message: 'Email and password required'
    });
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
    const token = signToken(user);
    res.json({ token });
};
exports.me = async (req, res) => {
    res.json(req.user);
};