angular.module('goApp')
  .service('user', user);

function user() {
  var self = this;

  self.account = {};
}
