$app.controller('loginCtrl',
    function ($scope, $rootScope, $location, $http, $cookies) {
        $rootScope.enableMenus = false;
    
        $scope.login = function () {
            var dados = {usuario : $scope.usuario, senha : $scope.senha};
            $http.post(path_server+'autenticar', dados).success(function(data){
                $cookies.putObject('permission', data.json);
                var cr = $cookies.get('currentRoute');
                if ( cr && cr != '/login' ){
                    $cookies.put('currentRoute');
                    $location.path( cr );
                }else{
                    $location.path( '/' );
                }
            });
        };
    });