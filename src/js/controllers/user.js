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
  console.log(usersIndex.user);
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

  usersShow.user = User.get($state.params, (data) => {
    data.likes.push(usersShow.authUser);
    data.totalLikes = data.likes.length;
  });
  usersShow.authUser = $auth.getPayload()._id;

  // usersShow.user.totalLikes = usersShow.user.likes.length();

  console.log(usersShow.user);

  function userLikes() {
    if (!usersShow.user.likes.includes(usersShow.authUser)) {
      usersShow.user = User.get($state.params, (data) => {
        data.likes.push(usersShow.authUser);
        data.totalLikes = data.likes.length;
      });
      usersShow.user.$update();
    }
  }

  usersShow.user = User.get($state.params);
  console.log(usersShow.user);
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
UsersEditController.$inject = ['User', '$state', '$auth'];
function UsersEditController(User, $state, $auth) {
  const usersEdit = this;
  usersEdit.user = User.get({ id: $auth.getPayload()._id });

  console.log(usersEdit.user);

  function update() {
    usersEdit.user.$update(() => {
      $state.go('usersShow', $state.params);
    });
  }

  usersEdit.update = update;
}
