$app.controller('CategoryCtrl', function($scope, $rootScope, $http, $cookies, $location, $routeParams, sv, $timeout, fileUpload){
    $scope.alert  = [];
    $scope.record = {};
    $scope.category = {};
    $scope.subcategories = [];
    $scope.edit_mode = false;
    $scope.setFocus = false;
    $scope.image = {};
    
    $scope.onFocus = function(){ setFocus() };
    function setFocus(){
        $scope.setFocus = true;
        $timeout(function() {
            $scope.setFocus = false;
        }, 200);
    }
    
    $scope.id = ( $routeParams.id ? $routeParams.id : false );
    if ( !$scope.id ){
            $location.path('/home');
    }
    
    if ( sv.checkResponse() ){
        sv.getWithKey('private/find/category/id/'+$scope.id).success( function(resp){  
            $scope.category = resp.json;
        });
    }
    
    $scope.newRecord = function(notFocus){
        $scope.edit_mode = !$scope.edit_mode;
        $scope.record = {};
        $scope.selectImage = null;
        $scope.image = {};
        if ( !notFocus ) setFocus();
    }
    
    $scope.editRecord = function(i, notFocus){
        $scope.edit_mode = true;
        $scope.record = $scope.subcategories[i];
        $scope.selectImage = ''+$scope.record.id;
        $scope.image = {};
        if ( !notFocus ) setFocus();
    };
    
    $scope.$watch('selectImage', function( n, o){
        if ( typeof n !== 'undefined' ){
            for( var i = 0; i < $scope.subcategories.length; i++){ 
                if ( n == $scope.subcategories[i].id ){
                    $scope.record = $scope.subcategories[i];
                    i = $scope.subcategories.length;
                }
            }
        }
    });
   
    getSubCategories();
    $scope.getSubCategories = function(){ getSubCategories(false); };
    function getSubCategories(reloadActiveRecord){
        $scope.image = {};
        if ( sv.checkResponse() ){
            sv.getWithKey('private/find/subcategory/id_category/'+$scope.id).success( function(resp){  
                if ( !resp.error ){
                    $scope.subcategories = [];
                    $scope.subcategories = resp.json;
                    
                    if( reloadActiveRecord ){
                        for( var i = 0; i < $scope.subcategories.length; i++ ){
                            if ($scope.record.id == $scope.subcategories[i].id){
                                var index = i;
                                i = $scope.subcategories.length;
                            }
                        }
                        $scope.record = $scope.subcategories[index];
                    }
                    
                }
            });
        };
    }
    
    
    $scope.update = function(){
        $scope.record.id_category = $scope.id;
        
        var id = $scope.record.id;
        var type = 'update';
        if (typeof id === 'undefined'){
            type = 'new';
            id = '';
        }
        else id = '/'+id;
        if ( sv.checkResponse() ){
            sv.getWithKey('private/find/subcategory/name/' + $scope.record.name).success( function(resp){  
                if ( !resp.error ){
                $scope.alert.push({message: 'Já existe um registro com essa descrição.', 
                                   class: 'alert-warning',
                                   error: !resp.error,
                                   type: 'Oh não!',
                                   icon: 'fa-warning'});
                }else{
                    sv.postWithKey('private/'+type+'/subcategory'+id, $scope.record).success( function(resp){
                        if ( resp.error ){
                            $scope.alert.push({message: resp.message, 
                                               class: 'alert-danger',
                                               error: resp.error,
                                               type: 'Ocorreu um erro :(',
                                               icon: 'fa-ban'});
                        }else{
                            $scope.alert.push({message: resp.message, 
                                               class: 'alert-success',
                                               error: resp.error,
                                               type: 'Sucesso!',
                                               icon: 'fa-check'});
                            getSubCategories();
                            if ( type == 'new') $scope.record = {};
                            else $scope.record = resp.json;
                        }
                    });
                }
            });
        };
    };
    
    $scope.delete = function(id){
        if (!id) id = '';
        else id = '/'+id;
        if ( sv.checkResponse() ){
            sv.delWithKey('private/delete/subcategory'+id).success( function(resp){ 
                $scope.edit_mode = true; 
                if ( resp.error ){
                    $scope.alert.push({message: resp.message, 
                                       class: 'alert-danger',
                                       error: resp.error,
                                       type: 'Ocorreu um erro :(',
                                       icon: 'fa-ban'});
                }else{
                    $scope.alert.push({message: resp.message, 
                                       class: 'alert-success',
                                       error: resp.error,
                                       type: 'Sucesso!',
                                       icon: 'fa-check'});
                }
                getSubCategories();
                $scope.record = {};
            });
        };
    };
    
    $scope.alert.remove = function(i){
        $scope.alert.splice(i, 1);
    }
    
   $scope.upload = function(){
       var id = $scope.record.id;
       var chave = '/' + $rootScope.access.chave;
       var file = $scope.image.file;
       var uploadUrl = path_server+'private/upload/subcategory/'+id+chave;
       fileUpload.uploadFileToUrl(file, uploadUrl).success(function(resp){
            $scope.edit_mode = true;
            if ( resp.error ){
                $scope.alert.push({message: resp.message, 
                                   class: 'alert-danger',
                                   error: resp.error,
                                   type: 'Ocorreu um erro :(',
                                   icon: 'fa-ban'});
            }else{
                $scope.alert.push({message: resp.message, 
                                   class: 'alert-success',
                                   error: resp.error,
                                   type: 'Sucesso!',
                                  });
                getSubCategories(true);
            }
       });
   }
   
   $scope.deleteImage = function(){
       sv.postWithKey('private/image/delete/subcategory/'+$scope.record.id).success( function(resp){
            $scope.edit_mode = true;
            if ( resp.error ){
                $scope.alert.push({message: resp.message, 
                                   class: 'alert-danger',
                                   error: resp.error,
                                   type: 'Ocorreu um erro :(',
                                   icon: 'fa-ban'});
            }else{
                $scope.alert.push({message: resp.message, 
                                   class: 'alert-success',
                                   error: resp.error,
                                   type: 'Sucesso!',
                                   icon: 'fa-check'});
                getSubCategories(true);
            }
       });
   };
    
});