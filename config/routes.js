const router = require('express').Router();
const authController = require('../controllers/auth');
const oauthController = require('../controllers/oauth');
const users = require('../controllers/users');
const challenges = require('../controllers/challenges');

router
  .post('/login', authController.login)
  .post('/register', authController.register)
  .post('/auth/facebook', oauthController.facebook);

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
