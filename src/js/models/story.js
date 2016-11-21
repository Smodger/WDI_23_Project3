angular
  .module('goApp')
  .factory('Story', Story);

Story.$inject = ['$resource'];

function Story($resource) {
  return new $resource('/stories/:id', { id: '@_id' }, {
    update: { method: 'PUT' }
  });
}
