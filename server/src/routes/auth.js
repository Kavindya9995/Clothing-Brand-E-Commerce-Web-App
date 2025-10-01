const router = require('express').Router();
const ctrl = require('../controllers/auth');
const { auth } = require('../middlewares/auth');
router.post('/register', ctrl.register);
router.post('/login', ctrl.login);
router.get('/me', auth, ctrl.me);
module.exports = router;