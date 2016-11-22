angular.module('goApp')
  .directive('googleMap', googleMap);

googleMap.$inject = ['$window', 'Challenge'];

// let geocoder = new google.maps.Geocoder();
// geocoder.geocode( { 'address': $scope.textfield }, function(results, status) {
//   if(status === google.maps.GeocoderStatus.OK && results.length > 0) {
//     let location = results[0].geometry.location;
//     $scope.myMap.panTo(location);
//   }
// });

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
            zoom: 6,
            scrollwheel: false
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
