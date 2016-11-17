angular.module('goApp')
  .controller('UsersIndexController', UsersIndexController)
  .controller('UsersNewController', UsersNewController)
  .controller('UsersShowController', UsersShowController)
  .controller('UsersEditController', UsersEditController);


//INDEX
UsersIndexController.$inject = ['User'];
function UsersIndexController(User) {
  const usersIndex = this;
  usersIndex.all = User.query();
}

//CREATE
UsersNewController.$inject = ['User', '$state'];
function UsersNewController(User, $state) {
  const usersNew = this;
  usersNew.user = {};

  function create() {
    User.save(usersNew.user, () => {
      $state.go('userIndex');
    });
  }
  usersNew.create = create;
}

//SHOW & DELETE
UsersShowController.$inject = ['User', '$state', '$auth'];
function UsersShowController(User, $state, $auth) {
  const usersShow = this;

  usersShow.user = User.get($state.params);
  usersShow.authUser = $auth.getPayload().id;
  console.log(usersShow.authUser);
  function userLikes() {

    console.log(usersShow.authUser, usersShow.user.likes);
    usersShow.user.like ;
    usersShow.user.$update();
  }

  function deleteUser() {
    usersShow.user.$remove(() => {
      $state.go('usersIndex');
    });
  }

  usersShow.incrementLikes = userLikes;
  usersShow.isLoggedIn = $auth.isAuthenticated;
  usersShow.delete = deleteUser;
}

//EDIT
UsersEditController.$inject = ['User', '$state'];
function UsersEditController(User, $state) {
  const usersEdit = this;

  usersEdit.user = User.get($state.params);

  function update() {
    usersEdit.user.$update(() => {
      $state.go('usersShow', $state.params);
    });
  }

  this.update = update;
}
