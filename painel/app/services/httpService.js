'use strict';
  
$app.factory('sv',
    ['$http', '$cookies', '$location', '$rootScope',
    function ($http, $cookies, $location, $rootScope) {
        var service = {};
  
        service.post = function (path, data) {
            return $http.post(path_server+path, data)
        };
  
        service.postWithKey = function (path, data) {
            var chave = '/' + $rootScope.access.chave;
            return $http.post(path_server+path+chave, data)
        };
  
        service.get = function (path) {
            return $http.get(path_server+path);
        };
  
        service.getWithKey = function (path) {
            var chave = '/' + $rootScope.access.chave;
            return $http.get(path_server+path+chave);
        };
  
        service.delWithKey = function (path) {
            var chave = '/' + $rootScope.access.chave;
            return $http.delete(path_server+path+chave);
        };
        
        service.checkResponse = function(){
            if ( $cookies.getObject('permission') ){
                var data = $cookies.getObject('permission')[0];
                $rootScope.access = { usuario : data.id, chave : data.accesskey };
                return true;
            }else{
               $cookies.put('currentRoute', $location.path()); 
               $location.path('/login');
                return false;
            }
        }
        
        service.checkAccess = function(){
            if ($cookies.getObject('permission') ){
                var data = $cookies.getObject('permission')[0];
                return ( data.id == 0 );
            }else{
                return false;
            }
        }
        
        service.getUserData = function(){
            if ($cookies.getObject('permission') ){
                var data = $cookies.getObject('permission')[0];
                return data;
            }else{
                return false;
            }
        }
        
        
        return service;
    }])