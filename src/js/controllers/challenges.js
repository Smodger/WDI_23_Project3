angular.module('goApp')
  .controller('ChallengesIndexController', ChallengesIndexController)
  .controller('ChallengesNewController', ChallengesNewController)
  .controller('ChallengesShowController', ChallengesShowController)
  .controller('ChallengesEditController', ChallengesEditController);

ChallengesIndexController.$inject = ['Challenge'];
function ChallengesIndexController(Challenge) {
  const challengesIndex = this;
  challengesIndex.all = Challenge.query();
  // console.log('In the challenge index controller');
}


ChallengesNewController.$inject = ['Challenge', '$state', '$auth'];
function ChallengesNewController(Challenge, $state, $auth) {
  const challengesNew = this;
  const payload = $auth.getPayload();

  challengesNew.challenge = {};
  challengesNew.challenge.projectCreator = [payload._id];

  function create() {
    Challenge.save(challengesNew.challenge, () => {
      $state.go('challengesIndex');
    });
  }



  challengesNew.create = create;
}

//SHOW
ChallengesShowController.$inject = ['Challenge', 'User', '$state', '$auth'];
function ChallengesShowController(Challenge, User, $state, $auth) {

  const challengesShow = this;
  const payload = $auth.getPayload();

  if (payload) {
    User.get({ id: payload._id }, (data)=> {
      challengesShow.userProfile = data;
    });
  }


  Challenge.get($state.params).$promise.then((challenge) => {
    challengesShow.challenge = challenge;
  });

  function deleteChallenge() {
    challengesShow.challenge.$remove(() => {
      $state.go('challengesIndex');
    });
  }

  function challengeLike() {

    if(!payload){
      $state.go('login');
    } else {
      const userIdIndex = challengesShow.challenge.like.indexOf(payload._id);
      if (!challengesShow.challenge.like.includes(payload._id) && !!payload._id) {
        challengesShow.challenge.like.push(payload._id);
      } else if (challengesShow.challenge.like.includes(payload._id) && !!payload._id) {
        challengesShow.challenge.like.splice(userIdIndex, 1);
      }
      challengesShow.challenge.$update();
    }
  }

  function participate() {
    const indexId = challengesShow.challenge.participants.findIndex((participant) => {
      return payload._id === participant._id;
    });
    if(indexId === -1) {
      challengesShow.challenge.participants.push(challengesShow.userProfile);
      console.log(challengesShow.challenge.participants);

      challengesShow.challenge.$update();
    }
  }

  function Unparticipate() {
    const indexId = challengesShow.challenge.participants.findIndex((participant) => {
      return payload._id === participant._id;
    });
    challengesShow.challenge.participants.splice(indexId, 1);
    challengesShow.challenge.$update();
  }

  function togglePopUp() {
    // console.log('In toggle pop up');
    if(payload) {
      challengesShow.popUpActive = !challengesShow.popUpActive;
    } else {
      $state.go('login');
    }

  }

  function addComment(){
    challengesShow.challenge.comments.push(challengesShow.comment);
    challengesShow.challenge.$update(() => {
      challengesShow.comment = '';
    });
  }

  function isSubscribed() {
    if (payload) {
      if(challengesShow.challenge) {
        return challengesShow.challenge.participants.filter((participant) => {
          return payload._id === participant._id;
        }).length > 0;
      }
    }
  }
  challengesShow.payload = payload;
  challengesShow.isSubscribed = isSubscribed;
  challengesShow.addComment = addComment;
  challengesShow.togglePopUp = togglePopUp;
  challengesShow.Unparticipate = Unparticipate;
  challengesShow.participate = participate;
  challengesShow.incrementLikes = challengeLike;
  challengesShow.isLoggedIn = $auth.isAuthenticated;
  challengesShow.deleteChallenge = deleteChallenge;
}

ChallengesEditController.$inject = ['Challenge', '$state'];
function ChallengesEditController(Challenge, $state) {
  const challengesEdit = this;

  challengesEdit.challenge = Challenge.get($state.params);

  function update() {
    challengesEdit.challenge.$update(() => {
      $state.go('challengesShow', $state.params);
    });
  }

  this.update = update;
}
