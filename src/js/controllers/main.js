angular.module('goApp')
  .controller('MainController', MainController);

MainController.$inject = ['$auth', '$state'];
function MainController($auth, $state) {
  const main = this;

  console.log($auth.getPayload());
  const tokenInfo = $auth.getPayload();
  main.currentUser = tokenInfo._id;
  main.isLoggedIn = $auth.isAuthenticated;

  console.log(main.currentUser);
  function logout() {
    $auth.logout()
      .then(() => {
        $state.go('home');
      });
  }
  main.logout = logout;

  main.message = null;
  // const protectedStates = ['playersEdit', 'playersNew'];
  //
  // function secureState(e, toState) {
  //   main.message = null;
  //   if(!$auth.isAuthenticated() && protectedStates.includes(toState.name)) {
  //     e.preventDefault();
  //     $state.go('login');
  //     main.message = 'You must be logged in to go there!';
  //   }
  // }

  // $rootScope.$on('$stateChangeStart', secureState);

}
