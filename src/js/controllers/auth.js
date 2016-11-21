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
        $state.go('home');
      });
  }

  register.submit = submit;
}

ConfirmController.$inject = ['$http', '$state'];
function ConfirmController($http, $state) {
  $http({
    method: 'POST',
    url: `/confirm/${$state.params.confirmationCode}`
  }).then(() => {
    $state.go('login');
  });
}

LoginController.$inject = ['$auth', '$state'];
function LoginController($auth, $state) {
  const login = this;

  login.credentials = {};

  function submit() {
    $auth.login(login.credentials)
      .then(() => {
        $state.go('home');
      });

  }
  login.submit = submit;
}
