angular
  .module('goApp')
  .factory('StoryEntries', StoryEntries);

StoryEntries.$inject = ['$resource'];

function StoryEntries($resource) {
  return new $resource('/stories/entries/:id', { id: '@_id' }, {
    update: { method: 'PUT' }
  });
}
