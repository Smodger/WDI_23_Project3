angular.module('goApp')
.controller('RegisterController', RegisterController)
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
  function authenticate(service) {
    $auth.authenticate(service, () => {
      $state.go('challengesIndex');
    });
  }

  login.authenticate = authenticate;
  login.submit = submit;
}

// function onSignIn(googleUser) {
//   const profile = googleUser.getBasicProfile();
//   console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
//   console.log('Name: ' + profile.getName());
//   console.log('Image URL: ' + profile.getImageUrl());
//   console.log('Email: ' + profile.getEmail());
// }
