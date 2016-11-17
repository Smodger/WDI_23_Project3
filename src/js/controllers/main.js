angular.module('goApp')
  .controller('MainController', MainController);

MainController.$inject = ['$auth', '$state'];
function MainController($auth, $state) {
  const main = this;

  // console.log($auth.getPayload());
  main.currentUser = $auth.getPayload();

  main.isLoggedIn = $auth.isAuthenticated;

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
