$app.controller('logoutCtrl',
function ($scope, $rootScope, $location, $http, $cookies) {
  $cookies.put('permission');
  $location.path('/login');
});