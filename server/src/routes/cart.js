const router = require('express').Router();
const ctrl = require('../controllers/cart');
const { auth } = require('../middlewares/auth');
router.use(auth);
router.get('/', ctrl.getCart);
router.post('/', ctrl.addItem);
router.delete('/:productId', ctrl.removeItem);
module.exports = router;