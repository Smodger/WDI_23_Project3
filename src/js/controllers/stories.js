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

  User.get({ id: storiesCreate.authUser }, (data) => {
    storiesCreate.userInfo = data;
  });

  storiesCreate.story = {
    userId: storiesCreate.authUser
  };

  function create() {
    Story.save(storiesCreate.story, (data) => {
      $state.go('storiesCreateEntry', {id: data._id});
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

  Story.get( $state.params, (data) => {
    storiesCreateEntry.story = data;


    storiesCreateEntry.new = {
      order: storiesCreateEntry.story.entries.length + 1
    };
  });

  function addEntry() {
    storiesCreateEntry.story.entries.push(storiesCreateEntry.new);

    storiesCreateEntry.story.$update(() => {
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
StoriesEditController.$inject = ['Story', '$state'];
function StoriesEditController(Story, $state) {
  const storiesEdit = this;
  console.log('I am working');

  Story.get($state.params, (data) => {
    storiesEdit.entry = data;
  });

  function update() {
    console.log(storiesEdit.entry);
    // storiesEdit.entry.$update((data) => {
    //   $state.go('storiesShow', { id: storiesEdit.authUser });
    // });
  }

  storiesEdit.update = update;
}
