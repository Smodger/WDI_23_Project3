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

  User.get($state.params, (data) => {
    usersShow.user = data;
    data.totalLikes = usersShow.user.likes.length;

    usersShow.authUser = $auth.getPayload();

    if (usersShow.authUser) {
      usersShow.authUser = usersShow.authUser._id;
    }

    usersShow.incrementLikes = userLikes;
    usersShow.isLoggedIn = $auth.isAuthenticated;
    usersShow.delete = deleteUser;
  });

  function userLikes() {
    if (!usersShow.user.likes.includes(usersShow.authUser) && !!usersShow.authUser) {
      usersShow.user.likes.push(usersShow.authUser);
      // usersShow.user.$update();
      console.log(usersShow.user);
      usersShow.user.$update((data) => {
        console.log(data);
      });
    }
  }

  // usersShow.user = User.get($state.params);
  function deleteUser() {
    usersShow.user.$remove(() => {
      $state.go('usersIndex');
    });
  }
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
