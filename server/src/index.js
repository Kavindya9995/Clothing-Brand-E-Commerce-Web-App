require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mernecom';
mongoose.connect(MONGO_URI, { maxPoolSize: 10 })
    .then(() => {
        console.log('Mongo connected');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => {
        console.error('Mongo connection error', err);
        process.exit(1);
    });