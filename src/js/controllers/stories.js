angular.module('goApp')
  .controller('StoriesIndexController', StoriesIndexController)
  .controller('StoriesNewController', StoriesNewController)
  .controller('StoriesShowController', StoriesShowController)
  .controller('StoriesEditController', StoriesEditController);


//INDEX
StoriesIndexController.$inject = ['Story'];
function StoriesIndexController(Story) {
  const storiesIndex = this;
  storiesIndex.all = Story.query();
}

//CREATE
StoriesNewController.$inject = ['Story', '$state'];
function StoriesNewController(Story, $state) {
  const storiesNew = this;
  storiesNew.story = {};

  function create() {
    Story.save(storiesNew.story, () => {
      $state.go('storyIndex');
    });
  }
  storiesNew.create = create;
}

//SHOW & DELETE
StoriesShowController.$inject = ['Story', '$state', '$auth'];
function StoriesShowController(Story, $state, $auth) {
  const storiesShow = this;

  Story.get($state.params, (data) => {
    storiesShow.story = data;

    storiesShow.authStory = $auth.getPayload();
    if (storiesShow.authStory) {
      storiesShow.authStory = storiesShow.authStory._id;
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
