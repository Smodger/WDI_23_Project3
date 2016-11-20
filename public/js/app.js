"use strict";function Router(e,l){e.state("challengesIndex",{url:"/challenges",templateUrl:"/templates/challengesIndex.html",controller:"ChallengesIndexController as challengesIndex"}).state("challengesNew",{url:"/challenges/new",templateUrl:"/templates/challengesNew.html",controller:"ChallengesNewController as challengesNew"}).state("challengesShow",{url:"/challenges/:id",templateUrl:"/templates/challengesShow.html",controller:"ChallengesShowController as challengesShow"}).state("challengesEdit",{url:"/challenges/:id/edit",templateUrl:"/templates/challengesEdit.html",controller:"ChallengesEditController as challengesEdit"}).state("register",{url:"/register",templateUrl:"/templates/register.html",controller:"RegisterController as register"}).state("login",{url:"/login",templateUrl:"/templates/login.html",controller:"LoginController as login"}).state("home",{url:"/",templateUrl:"/templates/home.html"}).state("usersIndex",{url:"/challengers",templateUrl:"/templates/usersIndex.html",controller:"UsersIndexController as usersIndex"}).state("usersEdit",{url:"/challengers/:id/edit",templateUrl:"/templates/usersEdit.html",controller:"UsersEditController as usersEdit"}).state("usersShow",{url:"/challengers/:id",templateUrl:"/templates/usersShow.html",controller:"UsersShowController as usersShow"}),l.otherwise("/challenges")}function Auth(e){e.loginUrl="/login",e.signupUrl="/register",e.tokenPrefix=""}function RegisterController(e,l){function t(){e.signup(r.user).then(function(){l.go("home")})}var r=this;r.user={},r.submit=t}function LoginController(e,l,t,r){function n(){o.isLoggedIn=!0,console.log(o.isLoggedIn),e.login(o.credentials).then(function(){o.currentUser=e.getPayload(),o.currentUser&&t.get({id:o.currentUser._id},function(e){r.account=e,console.log(r.currentUser)}),l.go("home")})}var o=this;o.credentials={},o.submit=n}function Challenge(e){return new e("/challenges/:id",{id:"@_id"},{update:{method:"PUT"}})}function ChallengesIndexController(e){var l=this;l.all=e.query(),console.log("In the challenge index controller")}function ChallengesNewController(e,l){function t(){e.save(r.challenge,function(){l.go("challengesIndex")})}var r=this;r.challenge={},r.create=t}function ChallengesShowController(e,l,t,r){function n(){a.challenge.$remove(function(){t.go("challengesIndex")})}function o(){var e=a.challenge.like.indexOf(a.authUser);!a.challenge.like.includes(a.authUser)&&a.authUser?(a.challenge.like.push(a.authUser),a.challenge.$update()):a.challenge.like.includes(a.authUser)&&a.authUser&&(a.challenge.like.splice(e,1),a.challenge.$update())}function s(){a.challenge.participants.data.push(a.authUser),a.challenge.participants.userId.push(a.authUser),a.userProfile.activeChallenges.push(a.challenge._id),a.challenge.$update(),a.userProfile.$update()}var a=this;a.authUser=r.getPayload(),a.authUser&&(a.authUser=a.authUser._id,l.get({id:a.authUser},function(e){a.userProfile=e})),a.challenge=e.get(t.params),a.participate=s,a.incrementLikes=o,a.isLoggedIn=r.isAuthenticated,a.delete=n}function ChallengesEditController(e,l){function t(){r.challenge.$update(function(){l.go("challengesShow",l.params)})}var r=this;r.challenge=e.get(l.params),this.update=t}function currentUser(e,l){var t=this,r=l.getPayload();r&&e.get({id:r._id},function(e){t.account=e})}function MainController(e){function l(){console.log("in toggle menu"),t.menuActive=!t.menuActive,console.log(t.menuActive)}var t=this;t.isLoggedIn=e.isAuthenticated,t.currentUser=e.getPayload(),t.toggleMenu=l,t.togglePopUp=!t.togglePopUp}function ProfileController(e,l,t,r){function n(){e.logout().then(function(){o.account=null,l.go("home")})}var o=this;o.isLoggedIn=e.isAuthenticated,e.getPayload()&&(o.currentUserId=e.getPayload()._id),o.currentUser=r,o.isLoggedIn()&&t.get({id:o.currentUserId},function(e){r.account=e}),o.logout=n,o.message=null}function UsersIndexController(e){var l=this;l.all=e.query()}function UsersNewController(e,l){function t(){e.save(r.user,function(){l.go("userIndex")})}var r=this;r.user={},r.create=t}function UsersShowController(e,l,t){function r(){!o.user.likes.includes(o.authUser)&&o.authUser&&(o.user.likes.push(o.authUser),o.user.$update())}function n(){o.user.$remove(function(){l.go("usersIndex")})}var o=this;e.get(l.params,function(e){o.user=e,o.authUser=t.getPayload(),o.authUser&&(o.authUser=o.authUser._id),o.incrementLikes=r,o.isLoggedIn=t.isAuthenticated,o.delete=n})}function UsersEditController(e,l,t){function r(){n.user.$update(function(e){console.log(e.bio),l.go("usersShow",{id:n.authUser})})}var n=this;n.authUser=t.getPayload(),n.authUser&&(n.authUser=n.authUser._id),e.get({id:n.authUser},function(e){n.user=e,console.log(n.user)}),n.update=r}function User(e){return new e("/users/:id",{id:"@_id"},{update:{method:"PUT"}})}function user(){var e=this;e.account={}}angular.module("goApp",["ngResource","ui.router","satellizer"]).config(Router).config(Auth),Router.$inject=["$stateProvider","$urlRouterProvider"],Auth.$inject=["$authProvider"],angular.module("goApp").controller("RegisterController",RegisterController).controller("LoginController",LoginController),RegisterController.$inject=["$auth","$state"],LoginController.$inject=["$auth","$state","User","user"],angular.module("goApp").factory("Challenge",Challenge),Challenge.$inject=["$resource"],angular.module("goApp").controller("ChallengesIndexController",ChallengesIndexController).controller("ChallengesNewController",ChallengesNewController).controller("ChallengesShowController",ChallengesShowController).controller("ChallengesEditController",ChallengesEditController),ChallengesIndexController.$inject=["Challenge"],ChallengesNewController.$inject=["Challenge","$state"],ChallengesShowController.$inject=["Challenge","User","$state","$auth"],ChallengesEditController.$inject=["Challenge","$state"],angular.module("goApp").service("currentUser",currentUser),currentUser.$inject=["User","$auth"],angular.module("goApp").controller("MainController",MainController),MainController.$inject=["$auth"],angular.module("goApp").controller("ProfileController",ProfileController),ProfileController.$inject=["$auth","$state","User","user"],angular.module("goApp").controller("UsersIndexController",UsersIndexController).controller("UsersNewController",UsersNewController).controller("UsersShowController",UsersShowController).controller("UsersEditController",UsersEditController),UsersIndexController.$inject=["User"],UsersNewController.$inject=["User","$state"],UsersShowController.$inject=["User","$state","$auth"],UsersEditController.$inject=["User","$state","$auth"],angular.module("goApp").factory("User",User),User.$inject=["$resource"],angular.module("goApp").service("user",user);
//# sourceMappingURL=app.js.map
