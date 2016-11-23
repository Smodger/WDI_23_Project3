angular
.module('goApp', ['ngResource', 'ui.router', 'satellizer'])
.config(Router)
.config(Auth);

Router.$inject = ['$stateProvider', '$urlRouterProvider'];
function Router($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('challengesIndex', {
    url: '/challenges',
    templateUrl: '/templates/challengesIndex.html',
    controller: 'ChallengesIndexController as challengesIndex'
  })
  .state('challengesNew', {
    url: '/challenges/new',
    templateUrl: '/templates/challengesNew.html',
    controller: 'ChallengesNewController as challengesNew'
  })
  .state('challengesShow', {
    url: '/challenges/:id',
    templateUrl: '/templates/challengesShow.html',
    controller: 'ChallengesShowController as challengesShow'
  })
  .state('challengesEdit', {
    url: '/challenges/:id/edit',
    templateUrl: '/templates/challengesEdit.html',
    controller: 'ChallengesEditController as challengesEdit'
  })
  .state('register', {
    url: '/register',
    templateUrl: '/templates/register.html',
    controller: 'RegisterController as register'
  })
  .state('registerInterim', {
    url: '/registerInterim',
    templateUrl: '/templates/registerInterim.html'
  })
  .state('confirm', {
    url: '/confirm/:confirmationCode',
    templateUrl: '/templates/confirm.html',
    controller: 'ConfirmController as confirm'
  })
  .state('login', {
    url: '/login',
    templateUrl: '/templates/login.html',
    controller: 'LoginController as login'
  })
  .state('home', {
    url: '/',
    templateUrl: '/templates/home.html'
    // controller: 'HomeController as home'
  })
  .state('usersIndex', {
    url: '/challengers',
    templateUrl: '/templates/usersIndex.html',
    controller: 'UsersIndexController as usersIndex'
  })
  .state('usersEdit', {
    url: '/challengers/:id/edit',
    templateUrl: '/templates/usersEdit.html',
    controller: 'UsersEditController as usersEdit'
  })
  .state('usersShow', {
    url: '/challengers/:id',
    templateUrl: '/templates/usersShow.html',
    controller: 'UsersShowController as usersShow'
  })
  .state('storiesIndex', {
    url: '/stories',
    templateUrl: '/templates/storyIndex.html',
    controller: 'StoriesIndexController as storiesIndex'
  })
  .state('storiesCreate', {
    url: '/stories/new',
    templateUrl: '/templates/storyCreate.html',
    controller: 'StoriesCreateController as storiesCreate'
  })
  .state('storiesCreateEntry', {
    url: '/stories/:id/newEntry',
    templateUrl: '/templates/storyCreateEntry.html',
    controller: 'StoriesCreateEntryController as storiesCreateEntry'
  })
  .state('storiesEdit', {
    url: '/stories/entries/:id/',
    templateUrl: '/templates/storyEdit.html',
    controller: 'StoriesEditController as storiesEdit'
  })
  .state('storiesShow', {
    url: '/stories/:id',
    templateUrl: '/templates/storyShow.html',
    controller: 'StoriesShowController as storiesShow'
  });

  $urlRouterProvider.otherwise('/challenges');
}

Auth.$inject = ['$authProvider'];
function Auth($authProvider) {

  $authProvider.facebook({
    clientId: '199317997186512'
  });

  $authProvider.tokenPrefix = '';
  $authProvider.loginUrl = '/login';
  $authProvider.signupUrl = '/register';
}
