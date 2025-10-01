const router = require('express').Router();
const ctrl = require('../controllers/products');
const { auth, admin } = require('../middlewares/auth');
router.get('/', ctrl.list);
router.get('/:id', ctrl.get);
router.post('/', auth, admin, ctrl.create);
router.put('/:id', auth, admin, ctrl.update);
router.delete('/:id', auth, admin, ctrl.remove);
module.exports = router