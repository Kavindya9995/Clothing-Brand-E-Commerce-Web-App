const router = require('express').Router();
const ctrl = require('../controllers/orders');
const { auth, admin } = require('../middlewares/auth');
router.use(auth);
router.post('/', ctrl.createOrder);
router.get('/', ctrl.getOrders);
router.get('/:id', ctrl.getOrder);
module.exports = router