angular.module('goApp')
.controller('RegisterController', RegisterController)
.controller('ConfirmController', ConfirmController)
.controller('LoginController', LoginController);

RegisterController.$inject = ['$auth', '$state'];
function RegisterController($auth, $state) {
  const register = this;

  register.user = {};

  function submit() {
    $auth.signup(register.user)
    .then(() => {
      $state.go('registerInterim');
    });
  }

  register.submit = submit;
}


ConfirmController.$inject = ['$http', '$state'];
function ConfirmController($http, $state) {
  $http({
    method: 'POST',
    url: `/confirm/${$state.params.confirmationCode}`
  });
}


LoginController.$inject = ['$auth', '$state', 'User', 'user'];
function LoginController($auth, $state, User, user) {
  const login = this;

  login.credentials = {};

  function submit() {
    login.isLoggedIn = true;
    console.log(login.isLoggedIn);
    $auth.login(login.credentials)
    .then(() => {
      login.currentUser = $auth.getPayload();

      if(login.currentUser) {
        User.get({ id: login.currentUser._id }, (data) => {
          user.account = data;
          console.log(user.currentUser);
        });
      }
      $state.go('home');
    });
  }
  function authenticate(service) {
    $auth.authenticate(service)
    .then(() => {
      $state.go('home');
    });
  }
  login.submit = submit;
  login.authenticate = authenticate;
}
