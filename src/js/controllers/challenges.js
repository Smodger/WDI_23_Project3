angular.module('goApp')
  .controller('ChallengesIndexController', ChallengesIndexController)
  .controller('ChallengesNewController', ChallengesNewController)
  .controller('ChallengesShowController', ChallengesShowController)
  .controller('ChallengesEditController', ChallengesEditController);

ChallengesIndexController.$inject = ['Challenge'];
function ChallengesIndexController(Challenge) {
  const challengesIndex = this;

  challengesIndex.all = Challenge.query();
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

  challengesShow.challenge = Challenge.get($state.params);

  function deleteChallenge() {
    challengesShow.challenge.$remove(() => {
      $state.go('challengesIndex');
    });
  }

  function challengeLike() {
    challengesShow.challenge.like ++;
    challengesShow.challenge.$update();
  }

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
