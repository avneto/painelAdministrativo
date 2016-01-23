$app.controller('rootCtrl', function($rootScope, $scope, sv, $location){
    
    $rootScope.categories = [];
    $rootScope.subcategories = [];
    $rootScope.refresh = false;
    
    $rootScope.$watch('refresh', function(n,o){
        if (typeof n !== 'undefined' && n ) loadConfigs();
        $rootScope.refresh = false;
    });
    
    loadConfigs();
    
    function loadConfigs(){
        if ( sv.checkResponse() ){
            sv.getWithKey('private/all/category').success( function(resp){
                    if (!resp.error){
                        $rootScope.categories = resp.json;
                        for( var i = 0; i < $rootScope.categories.length; i++){
                            sv.getWithKey('private/find/subcategory/id_category/'+$rootScope.categories[i].id).success( function(resp){
                                if ( !resp.error ){
                                    $rootScope.subcategories.push(resp.json);
                                }
                            })
                        }
                    }

            });
        }
    };
    
    
    $rootScope.getPath = function(path){
        if($location.path() == '/'+path){
            return true;
        }else{
            return false;
        }
    }

})