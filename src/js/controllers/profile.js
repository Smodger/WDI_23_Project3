angular.module('goApp')
  .controller('ProfileController', ProfileController);

ProfileController.$inject = ['$auth', '$state', 'User', 'user'];
function ProfileController($auth, $state, User, user) {
  const profile = this;

  profile.isLoggedIn = $auth.isAuthenticated;
  if ($auth.getPayload()){
    profile.currentUserId = $auth.getPayload()._id;
  }
  profile.currentUser = user;

  if(profile.isLoggedIn()) {
    User.get({ id: profile.currentUserId }, (data) => {
      user.account = data;
    });
  }

  function logout() {
    $auth.logout()
      .then(() => {
        profile.account = null;
        $state.go('home');
      });
  }
  profile.logout = logout;

  profile.message = null;
}
