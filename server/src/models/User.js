const mongoose = require('mongoose');
const { Schema } = mongoose;
const UserSchema = new Schema({
    email: {
        type: String, required: true, unique: true, lowercase: true, index:
            true
    },
    password: { type: String, required: true },
    name: { type: String },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    address: {
        line1: String, city: String, postalCode: String, country: String
    },
    createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('user', UserSchema);