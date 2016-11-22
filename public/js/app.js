"use strict";function Router(e,t){e.state("challengesIndex",{url:"/challenges",templateUrl:"/templates/challengesIndex.html",controller:"ChallengesIndexController as challengesIndex"}).state("challengesNew",{url:"/challenges/new",templateUrl:"/templates/challengesNew.html",controller:"ChallengesNewController as challengesNew"}).state("challengesShow",{url:"/challenges/:id",templateUrl:"/templates/challengesShow.html",controller:"ChallengesShowController as challengesShow"}).state("challengesEdit",{url:"/challenges/:id/edit",templateUrl:"/templates/challengesEdit.html",controller:"ChallengesEditController as challengesEdit"}).state("register",{url:"/register",templateUrl:"/templates/register.html",controller:"RegisterController as register"}).state("registerInterim",{url:"/registerInterim",templateUrl:"/templates/registerInterim.html"}).state("confirm",{url:"/confirm/:confirmationCode",templateUrl:"/templates/confirm.html",controller:"ConfirmController as confirm"}).state("login",{url:"/login",templateUrl:"/templates/login.html",controller:"LoginController as login"}).state("home",{url:"/",templateUrl:"/templates/home.html"}).state("usersIndex",{url:"/challengers",templateUrl:"/templates/usersIndex.html",controller:"UsersIndexController as usersIndex"}).state("usersEdit",{url:"/challengers/:id/edit",templateUrl:"/templates/usersEdit.html",controller:"UsersEditController as usersEdit"}).state("usersShow",{url:"/challengers/:id",templateUrl:"/templates/usersShow.html",controller:"UsersShowController as usersShow"}).state("storiesIndex",{url:"/stories",templateUrl:"/templates/storyIndex.html",controller:"StoriesIndexController as storiesIndex"}).state("storysEdit",{url:"/stories/:id/edit",templateUrl:"/templates/storyEdit.html",controller:"StoriesEditController as storiesEdit"}).state("storiesShow",{url:"/stories/:id",templateUrl:"/templates/storyShow.html",controller:"StoriesShowController as storiesShow"}),t.otherwise("/challenges")}function Auth(e){e.loginUrl="/login",e.signupUrl="/register",e.tokenPrefix=""}function RegisterController(e,t){function r(){e.signup(l.user).then(function(){t.go("registerInterim")})}var l=this;l.user={},l.submit=r}function ConfirmController(e,t){e({method:"POST",url:"/confirm/"+t.params.confirmationCode})}function LoginController(e,t,r,l){function o(){n.isLoggedIn=!0,console.log(n.isLoggedIn),e.login(n.credentials).then(function(){n.currentUser=e.getPayload(),n.currentUser&&r.get({id:n.currentUser._id},function(e){l.account=e,console.log(l.currentUser)}),t.go("home")})}var n=this;n.credentials={},n.submit=o}function Challenge(e){return new e("/challenges/:id",{id:"@_id"},{update:{method:"PUT"}})}function ChallengesIndexController(e){var t=this;t.all=e.query()}function ChallengesNewController(e,t){function r(){e.save(l.challenge,function(){t.go("challengesIndex")})}var l=this;l.challenge={},l.create=r}function ChallengesShowController(e,t,r,l){function o(){g.challenge.$remove(function(){r.go("challengesIndex")})}function n(){var e=g.challenge.like.indexOf(g.authUser);!g.challenge.like.includes(g.authUser)&&g.authUser?(g.challenge.like.push(g.authUser),g.challenge.$update()):g.challenge.like.includes(g.authUser)&&g.authUser&&(g.challenge.like.splice(e,1),g.challenge.$update())}function s(){console.log(g.challenge.participants),g.challenge.participants.push(g.authUser),g.userProfile.activeChallenges.push(g.challenge._id),g.challenge.$update(),g.userProfile.$update()}function a(){var e=g.challenge.participants.findIndex(function(e){return g.authUser._id===e._id});g.challenge.participants.splice(e,1),g.challenge.$update()}function i(){console.log("In toggle pop up"),g.popUpActive=!g.popUpActive}function u(){g.challenge.comments.push(g.comment),g.challenge.$update(function(){g.comment=""})}function c(){if(g.challenge)return g.challenge.participants.filter(function(e){return g.authUser._id===e._id}).length>0}var g=this;g.authUser=l.getPayload(),g.authUser&&(g.authUser=g.authUser._id,t.get({id:g.authUser},function(e){g.userProfile=e})),e.get(r.params).$promise.then(function(e){g.challenge=e}),g.isSubscribed=c,g.addComment=u,g.togglePopUp=i,g.Unparticipate=a,g.participate=s,g.incrementLikes=n,g.isLoggedIn=l.isAuthenticated,g.deleteChallenge=o}function ChallengesEditController(e,t){function r(){l.challenge.$update(function(){t.go("challengesShow",t.params)})}var l=this;l.challenge=e.get(t.params),this.update=r}function currentUser(e,t){var r=this,l=t.getPayload();l&&e.get({id:l._id},function(e){r.account=e})}function googleplace(e){return{restrict:"A",require:"ngModel",link:function(t,r,l,o){var n={types:[],componentRestrictions:{}},s=new e.google.maps.places.Autocomplete(r[0],n);s.addListener("place_changed",function(e,t){o.$setViewValue(r.val())})}}}function googleMap(e,t){return{restrict:"E",replace:!0,template:'<div class="google-map">Google Map HERE</div>',scope:{challenge:"="},link:function(t,r){t.$watch("challenge",function(){if(t.challenge){var l=new e.google.maps.Map(r[0],{center:t.challenge.location,zoom:6,scrollwheel:!1});new e.google.maps.Marker({position:t.challenge.location,map:l,animation:e.google.maps.Animation.DROP})}})}}}function MainController(e){function t(){console.log("in toggle menu"),r.menuActive=!r.menuActive,console.log(r.menuActive)}var r=this;r.isLoggedIn=e.isAuthenticated,r.currentUser=e.getPayload(),r.toggleMenu=t}function ProfileController(e,t,r,l){function o(){e.logout().then(function(){n.account=null,t.go("home")})}var n=this;n.isLoggedIn=e.isAuthenticated,e.getPayload()&&(n.currentUserId=e.getPayload()._id),n.currentUser=l,n.isLoggedIn()&&r.get({id:n.currentUserId},function(e){l.account=e}),n.logout=o,n.message=null}function StoriesIndexController(e){var t=this;t.all=e.query()}function StoriesNewController(e,t){function r(){e.save(l.story,function(){t.go("storyIndex")})}var l=this;l.story={},l.create=r}function StoriesShowController(e,t,r){function l(){o.story.$remove(function(){t.go("storiesIndex")})}var o=this;e.get(t.params,function(e){o.story=e,o.authStory=r.getPayload(),o.authStory&&(o.authStory=o.authStory._id),o.isLoggedIn=r.isAuthenticated,o.delete=l})}function StoriesEditController(e,t,r){function l(){o.story.$update(function(e){console.log(e.bio),t.go("storiesShow",{id:o.authUser})})}var o=this;o.authUser=r.getPayload(),o.authUser&&(o.authUser=o.authUser._id),e.get({id:o.authUser},function(e){o.story=e}),o.update=l}function Story(e){return new e("/stories/:id",{id:"@_id"},{update:{method:"PUT"}})}function User(e){return new e("/users/:id",{id:"@_id"},{update:{method:"PUT"}})}function user(){var e=this;e.account={}}function UsersIndexController(e){var t=this;t.all=e.query()}function UsersNewController(e,t){function r(){e.save(l.user,function(){t.go("userIndex")})}var l=this;l.user={},l.create=r}function UsersShowController(e,t,r){function l(){var e=n.user.likes.indexOf(n.authUser);!n.user.likes.includes(n.authUser)&&n.authUser?(n.user.likes.push(n.authUser),n.user.$update()):n.user.likes.includes(n.authUser)&&n.authUser&&(n.user.likes.splice(e,1),n.user.$update())}function o(){n.user.$remove(function(){t.go("usersIndex")})}var n=this;e.get(t.params,function(e){n.user=e,n.authUser=r.getPayload(),n.authUser&&(n.authUser=n.authUser._id),n.incrementLikes=l,n.isLoggedIn=r.isAuthenticated,n.delete=o})}function UsersEditController(e,t,r,l){function o(){n.user.$update(function(e){console.log("DATA HERE",e),console.log(e.bio),t.go("usersShow",{id:n.authUser}),l.account=e})}var n=this;console.log(l),n.authUser=r.getPayload(),n.authUser&&(n.authUser=n.authUser._id),e.get({id:n.authUser},function(e){n.user=e,console.log(n.user)}),n.update=o}angular.module("goApp",["ngResource","ui.router","satellizer"]).config(Router).config(Auth),Router.$inject=["$stateProvider","$urlRouterProvider"],Auth.$inject=["$authProvider"],angular.module("goApp").controller("RegisterController",RegisterController).controller("ConfirmController",ConfirmController).controller("LoginController",LoginController),RegisterController.$inject=["$auth","$state"],ConfirmController.$inject=["$http","$state"],LoginController.$inject=["$auth","$state","User","user"],angular.module("goApp").factory("Challenge",Challenge),Challenge.$inject=["$resource"],angular.module("goApp").controller("ChallengesIndexController",ChallengesIndexController).controller("ChallengesNewController",ChallengesNewController).controller("ChallengesShowController",ChallengesShowController).controller("ChallengesEditController",ChallengesEditController),ChallengesIndexController.$inject=["Challenge"],ChallengesNewController.$inject=["Challenge","$state"],ChallengesShowController.$inject=["Challenge","User","$state","$auth"],ChallengesEditController.$inject=["Challenge","$state"],angular.module("goApp").service("currentUser",currentUser),currentUser.$inject=["User","$auth"],angular.module("goApp").directive("googleMap",googleMap).directive("googleplace",googleplace),googleplace.$inject=["$window"],googleMap.$inject=["$window","Challenge"],angular.module("goApp").controller("MainController",MainController),MainController.$inject=["$auth"],angular.module("goApp").controller("ProfileController",ProfileController),ProfileController.$inject=["$auth","$state","User","user"],angular.module("goApp").controller("StoriesIndexController",StoriesIndexController).controller("StoriesNewController",StoriesNewController).controller("StoriesShowController",StoriesShowController).controller("StoriesEditController",StoriesEditController),StoriesIndexController.$inject=["Story"],StoriesNewController.$inject=["Story","$state"],StoriesShowController.$inject=["Story","$state","$auth"],StoriesEditController.$inject=["Story","$state","$auth"],angular.module("goApp").factory("Story",Story),Story.$inject=["$resource"],angular.module("goApp").factory("User",User),User.$inject=["$resource"],angular.module("goApp").service("user",user),angular.module("goApp").controller("UsersIndexController",UsersIndexController).controller("UsersNewController",UsersNewController).controller("UsersShowController",UsersShowController).controller("UsersEditController",UsersEditController),UsersIndexController.$inject=["User"],UsersNewController.$inject=["User","$state"],UsersShowController.$inject=["User","$state","$auth"],UsersEditController.$inject=["User","$state","$auth","user"];
//# sourceMappingURL=app.js.map
