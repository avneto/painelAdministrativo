
$app.run(['sv', '$rootScope', '$location',
  function (sv, $rootScope, $location) {
    $rootScope.enableMenus = false;
    $rootScope.path = $location.path();
    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        $rootScope.enableMenus = sv.checkResponse();
        $rootScope.gm = sv.checkAccess();
        $rootScope.userData = sv.getUserData();
        $rootScope.path_server = path_server;
        $rootScope.refresh = true;
    });
}]);

$app.config(function($routeProvider, $locationProvider) {
  $routeProvider
   .when('/', {
    redirectTo: '/home'
  })
   .when('/home', {
    templateUrl: 'pages/home.html',
    controller: 'dashboardCtrl'
  })
   .when('/settings', {
    templateUrl: 'pages/settings.html',
    controller: 'SettingsCtrl'
  })
  .when('/error', {
    templateUrl: 'pages_error/404.html',
    controller: ''
  })
  .when('/login', {
    templateUrl: 'pages/login.html',
    controller: 'loginCtrl'
  })
  .when('/logout', {
    templateUrl: 'pages/logout.html',
    controller: 'logoutCtrl'
  })
  .when('/category/:id', {
    templateUrl: 'pages/category.html',
    controller: 'CategoryCtrl'
  })
  .when('/item/:id', {
    templateUrl: 'pages/item.html',
    controller: 'ItemCtrl'
  })
  .when('/user/:id', {
    templateUrl: 'pages/user.html',
    controller: 'UserCtrl'
  })
  .when('/user', {
    templateUrl: 'pages/user.html',
    controller: 'UserCtrl'
  })
  .otherwise({
      redirectTo: '/error'
  });

  $locationProvider.html5Mode(true);
});