const router = require('express').Router();
const authController = require('../controllers/auth');
const users = require('../controllers/users');
const challenges = require('../controllers/challenges');
const stories = require('../controllers/stories');
const secureRoute = require('../lib/secureRoute');
const oauthController = require('../controllers/oauth');

router
  .post('/register', authController.register)
  .post('/confirm/:confirmationCode', authController.confirm)
  .post('/auth/facebook', oauthController.facebook)
  .post('/login', authController.login);

router.route('/users')
  .get(users.index)
  .post(users.create);

router.route('/users/:id')
  .get(users.show)
  .put(secureRoute, users.update)
  .delete(secureRoute, users.delete);

router.route('/challenges')
  .get(challenges.index)
  .post(challenges.create);

router.route('/challenges/:id')
  .get(challenges.show)
  .put(secureRoute, challenges.update)
  .patch(secureRoute, challenges.update)
  .delete(secureRoute, challenges.delete);

router.route('/stories')
  .get(stories.index)
  .post(stories.create);

router.route('/stories/:id')
  .get(stories.show)
  .put(stories.update)
  .patch(secureRoute, stories.update)
  .delete(secureRoute, stories.delete);



module.exports = router;
