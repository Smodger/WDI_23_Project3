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
    .state('login', {
      url: '/login',
      templateUrl: '/templates/login.html',
      controller: 'LoginController as login'
    })
    .state('home', {
      url: '/',
      templateUrl: '/templates/home.html',
      controller: 'HomeController as home'
    })
    .state('challengersIndex', {
      url: '/challengers',
      templateUrl: '/templates/indexProfile.html',
      controller: 'HomeController as home'
    });


  $urlRouterProvider.otherwise('/challenges');
}

Auth.$inject = ['$authProvider'];
function Auth($authProvider) {
  $authProvider.loginUrl = '/login';
  $authProvider.signupUrl = '/register';

  $authProvider.tokenPrefix = '';
}
