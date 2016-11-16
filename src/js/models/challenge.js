angular.module('goApp')
  .factory('Challenge', Challenge);

Challenge.$inject = ['$resource'];
function Challenge($resource) {
  return new $resource('/challenges/:id', { id: '@_id' }, {
    update: { method: 'PUT' }
  });
}
