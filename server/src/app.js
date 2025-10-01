 const express = require('express');
 require('express-async-errors');
 const helmet = require('helmet');
 const cors = require('cors');
 const morgan = require('morgan');
 const rateLimit = require('express-rate-limit');
 const authRoutes = require('./routes/auth');
 const productRoutes = require('./routes/products');
 const cartRoutes = require('./routes/cart');
 const orderRoutes = require('./routes/orders');
 const { errorHandler } = require('./middlewares/error');
 const app = express();
 app.use(helmet());
 app.use(cors());
 app.use(express.json());
 app.use(morgan('dev'));
 const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 200 });
 app.use(limiter);
 app.use('/api/auth', authRoutes);
 app.use('/api/products', productRoutes);
 app.use('/api/cart', cartRoutes);
 app.use('/api/orders', orderRoutes);
 module.exports = app;

app.use((req, res) => res.status(404).json({ message: 'Not Found' }));
 app.use(errorHandler)