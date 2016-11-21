angular.module('goApp')
  .controller('MainController', MainController);

MainController.$inject = ['$auth'];
function MainController($auth) {
  const main = this;

  main.isLoggedIn = $auth.isAuthenticated;
  main.currentUser = $auth.getPayload();

  function toggleMenu() {
    console.log('in toggle menu');
    main.menuActive = !main.menuActive;
    console.log(main.menuActive);
  }
  main.toggleMenu = toggleMenu;









  // main.getProfile = getProfile;

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
