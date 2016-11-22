angular.module('goApp')
  .controller('StoriesIndexController', StoriesIndexController)
  .controller('StoriesCreateController', StoriesCreateController)
  .controller('StoriesCreateEntryController', StoriesCreateEntryController)
  .controller('StoriesShowController', StoriesShowController)
  .controller('StoriesEditController', StoriesEditController);


//INDEX
StoriesIndexController.$inject = ['Story'];
function StoriesIndexController(Story) {
  const storiesIndex = this;
  storiesIndex.all = Story.query();
}

//CREATE
StoriesCreateController.$inject = ['Story', '$state', '$auth', 'User'];
function StoriesCreateController(Story, $state, $auth, User) {
  const storiesCreate = this;

  storiesCreate.authUser = $auth.getPayload();
  if (storiesCreate.authUser) {
    storiesCreate.authUser = storiesCreate.authUser._id;
  }

  User.get({id: storiesCreate.authUser }, (data) => {
    storiesCreate.userInfo = data;
  });

  storiesCreate.story = {
    userId: storiesCreate.authUser
  };

  function create() {
    Story.save(storiesCreate.story, () => {
      $state.go('storiesCreateEntry');
    });
  }
  storiesCreate.create = create;
}

// Create entry
StoriesCreateEntryController.$inject = ['Story', '$state', '$auth'];
function StoriesCreateEntryController(Story, $state, $auth) {
  const storiesCreateEntry = this;

  storiesCreateEntry.authUser = $auth.getPayload();
  if (storiesCreateEntry.authUser) {
    storiesCreateEntry.authUser = storiesCreateEntry.authUser._id;
  }

  Story.get( $state.params , (data) => {
    // console.log(data);
    // if(!data) {
    //   $state.go('storiesCreate');
    // } else {
    storiesCreateEntry.story = data;
    console.log(storiesCreateEntry.story);
    // }
  });

  storiesCreateEntry.entry = [];

  function addEntry() {
    storiesCreateEntry.story.entries.push(storiesCreateEntry.new);

    console.log(storiesCreateEntry.new);

    storiesCreateEntry.story.$update((data) => {
      console.log(data);
      $state.go('storiesShow', $state.params );
    });
  }

  storiesCreateEntry.addEntry = addEntry;
}

//SHOW & DELETE
StoriesShowController.$inject = ['Story', '$state', '$auth'];
function StoriesShowController(Story, $state, $auth) {
  const storiesShow = this;

  Story.get($state.params, (data) => {
    storiesShow.story = data;

    storiesShow.authUser = $auth.getPayload();
    if (storiesShow.authUser) {
      storiesShow.authUser = storiesShow.authUser._id;
    }

    storiesShow.isLoggedIn = $auth.isAuthenticated;
    storiesShow.delete = deleteStory;
  });

  function deleteStory() {
    storiesShow.story.$remove(() => {
      $state.go('storiesIndex');
    });
  }
}

//EDIT
StoriesEditController.$inject = ['Story', '$state', '$auth'];
function StoriesEditController(Story, $state, $auth) {
  const storiesEdit = this;

  storiesEdit.authUser = $auth.getPayload();
  if (storiesEdit.authUser) {
    storiesEdit.authUser = storiesEdit.authUser._id;
  }

  Story.get({ id: storiesEdit.authUser }, (data) => {
    storiesEdit.story = data;
  });

  function update() {
    storiesEdit.story.$update((data) => {
      console.log(data.bio);
      $state.go('storiesShow', { id: storiesEdit.authUser });
    });
  }

  storiesEdit.update = update;
}
