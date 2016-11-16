const router = require('express').Router();
const authController = require('../controllers/auth');
const users = require('../controllers/users');

router
  .post('/login', authController.login)
  .post('/register', authController.register);

router.route('/users')
  .get(users.index);

router.route('/users/:id')
  .get(users.show)
  .put(users.update)
  .delete(users.update);

module.exports = router;
