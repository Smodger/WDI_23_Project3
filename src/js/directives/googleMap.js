angular.module('goApp')
  .directive('googleMap', googleMap)
  .directive('googleplace', googleplace);



// let geocoder = new google.maps.Geocoder();
// geocoder.geocode( { 'address': $scope.textfield }, function(results, status) {
//   if(status === google.maps.GeocoderStatus.OK && results.length > 0) {
//     let location = results[0].geometry.location;
//     $scope.myMap.panTo(location);
//   }
// });
googleplace.$inject = ['$window'];
function googleplace($window) {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attrs, model) {
      const options = {
        types: [],
        componentRestrictions: {}
      };

      const autocomplete = new $window.google.maps.places.Autocomplete(element[0], options);

      autocomplete.addListener('place_changed', (res, status) => {
        model.$setViewValue(element.val());
      });
    }
  };
}

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
