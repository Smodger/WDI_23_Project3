// angular.module('goApp')
//   .directive('dragDrop', dragDrop);
//
// function dragDrop() {
//
//   const reader = new FileReader();
//
//   return {
//     restrict: 'E',
//     place: true,
//     templateUrl: 'templates/dragDrop.html',
//     link($scope, element) {
//
//       reader.onload = () => {
//
//       };
//
//       element
//         .on('dragover', (e)=> {
//           e.preventDefault();
//         })
//         .on('drop', (e)=> {
//           e.preventDefault();
//           const file = (e.target.files || e.dataTransfer.files)[0];
//
//           reader.readAsDataURL(file);
//         });
//     }
//   };
// }
