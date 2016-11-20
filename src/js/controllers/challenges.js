angular.module('goApp')
  .controller('ChallengesIndexController', ChallengesIndexController)
  .controller('ChallengesNewController', ChallengesNewController)
  .controller('ChallengesShowController', ChallengesShowController)
  .controller('ChallengesEditController', ChallengesEditController);

ChallengesIndexController.$inject = ['Challenge'];
function ChallengesIndexController(Challenge) {
  const challengesIndex = this;

  challengesIndex.all = Challenge.query();
  console.log("In the challenge index controller");
}


ChallengesNewController.$inject = ['Challenge', '$state'];
function ChallengesNewController(Challenge, $state) {
  const challengesNew = this;

  challengesNew.challenge = {};

  function create() {
    Challenge.save(challengesNew.challenge, () => {
      $state.go('challengesIndex');
    });
  }

  challengesNew.create = create;
}

//SHOW
ChallengesShowController.$inject = ['Challenge', '$state', '$auth'];
function ChallengesShowController(Challenge, $state, $auth) {

  const challengesShow = this;
  challengesShow.authUser = $auth.getPayload();
  if (challengesShow.authUser) {
    challengesShow.authUser = challengesShow.authUser._id;
  }

  challengesShow.challenge = Challenge.get($state.params);
  console.log(challengesShow.challenge);
  function deleteChallenge() {
    challengesShow.challenge.$remove(() => {
      $state.go('challengesIndex');
    });
  }

  function challengeLike() {
    challengesShow.challenge.like ++;
    challengesShow.challenge.$update();
  }

  function participate() {
    challengesShow.challenge.participants.data.push(challengesShow.authUser);
    challengesShow.challenge.participants.userId.push(challengesShow.authUser);
    challengesShow.challenge.$update((data) => {
      console.log(data);
    });
  }

  challengesShow.participate = participate;
  challengesShow.incrementLikes = challengeLike;
  challengesShow.isLoggedIn = $auth.isAuthenticated;
  challengesShow.delete = deleteChallenge;
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
