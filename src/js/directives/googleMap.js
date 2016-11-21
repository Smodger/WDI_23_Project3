angular.module('goApp')
  .directive('googleMap', googleMap);

googleMap.$inject = ['$window', 'Challenge'];

function googleMap($window, Challenge) {
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="google-map">Google Map HERE</div>',
    scope: {
      challenge: '='
    },
    link: function(scope, element) {
      scope.$watch('challenge', () => {
        if(scope.challenge) {

          const map = new $window.google.maps.Map(element[0], {
            center: scope.challenge.location,
            zoom: 6
          });

          new $window.google.maps.Marker({
            position: scope.challenge.location,
            map: map,
            animation: $window.google.maps.Animation.DROP
          });
        }
      });

    }
  };
}
