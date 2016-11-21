const router = require('express').Router();
const authController = require('../controllers/auth');
const users = require('../controllers/users');
const challenges = require('../controllers/challenges');

router
  .post('/register', authController.register)
  .post('/confirm/:confirmationCode', authController.confirm)
  .post('/login', authController.login);

router.route('/users')
  .get(users.index)
  .post(users.create);

router.route('/users/:id')
  .get(users.show)
  .put(users.update)
  .delete(users.delete);

router.route('/challenges')
  .get(challenges.index)
  .post(challenges.create);

router.route('/challenges/:id')
  .get(challenges.show)
  .put(challenges.update)
  .patch(challenges.update)
  .delete(challenges.delete);

module.exports = router;
