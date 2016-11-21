angular.module('goApp')
  .service('currentUser', currentUser);

currentUser.$inject = ['User', '$auth'];
function currentUser (User, $auth) {
  var user = this;

  // const isLoggedIn = $auth.isAuthenticated;
  const currentUser = $auth.getPayload();

  if(currentUser) {
    User.get({ id: currentUser._id }, (data) => {
      user.account = data;
    });
  }
}
