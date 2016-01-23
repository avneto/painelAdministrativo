$app.controller('SettingsCtrl', function($scope, $rootScope, $http, $cookies, $location, $routeParams, sv){
    $scope.alert  = [];
    $scope.check  = {};
    $scope.category = {};
    $scope.subcategory = {};
   
    getCategories();
    getSubCategories();
    getSettings();

    $scope.$watch('select.category', function(n, o){
        if ( n == '') $scope.category.id   = '';
        else if ( typeof n !== 'undefined' ){
            $scope.category   = $scope.categories[n];              
        }
    });

    $scope.$watch('select.subcategory', function(n, o){
        if ( n == '') $scope.subcategory.id   = '';
        else if ( typeof n !== 'undefined' ){
            $scope.subcategory   = $scope.subcategories[n];           
        }
    });

    $scope.$watch('select.settings', function(n, o){
        if ( n == '') $scope.setting.id   = '';
        else if ( typeof n !== 'undefined' && n != '' ){
//            $scope.setting.id   = $scope.settings[n].id;            
//            $scope.setting.name = $scope.settings[n].name;            
        }
    });

    $scope.getCategories = function(){ getCategories(); };
    function getCategories(){
        if ( sv.checkResponse() ){
            sv.getWithKey('private/all/category').success( function(resp){ 
                console.log(resp.json);
                if ( resp.error ){
                    $scope.alert.push({message: resp.message, type: 'alert-danger'});
                }else{
                    $scope.categories = resp.json;
                }
            });
        };
    }
   
    
    $scope.getSubCategories = function(){ getSubCategories(); };
    function getSubCategories(){
        if ( sv.checkResponse() ){
            sv.getWithKey('private/all/subcategory').success( function(resp){  
                if ( resp.error ){
                    $scope.alert.push({message: resp.message, type: 'danger'});
                }else{
                    $scope.subcategories = resp.json;
                }
            });
        };
    }
   
    $scope.getSettings = function(){ getSettings(); }
    function getSettings(){
        if ( sv.checkResponse() ){
            sv.getWithKey('private/all/settings').success( function(resp){  
                if ( resp.error ){
                    $scope.alert.push({message: resp.message, type: 'alert-danger'});
                }else{
                    $scope.settings = resp.json;
                }
            });
        };
    }
    
    $scope.update = function(model, id){
        var type = 'new';
        if (!id) id = '';
        else{
          var type = 'update';
          id = '/'+id;
        } 
        var data = $scope.$eval(model);
        
        if ( type == 'new' ){
            if ( sv.checkResponse() ){
                sv.getWithKey('private/find/'+model+'/name/' + data.name).success( function(resp){  
                    console.log(resp);
                    if ( !resp.error ){
                    $scope.alert.push({message: 'Já existe um registro com essa descrição.', 
                                       type: 'alert-warning',
                                       error: !resp.error});
                    }
                    else update(model, '', type, data);
                });
            };
        }else{
            update(model, id, type, data);
        }
    };
    
    function update(model, id, type, data){
        if ( sv.checkResponse() ){
            sv.postWithKey('private/'+type+'/'+model+id, data).success( function(resp){  
                if ( resp.error ){
                    $scope.alert.push({message: resp.message, type: 'alert-danger'});
                }else{
                    $scope.alert.push({message: resp.message, type: 'alert-success'});
                }
                switch(model){
                    case 'category':    
                        getCategories();
                        $scope.category = {}; 
                        $scope.category = resp.json[0]; 
                        break;
                    case 'setting':     
                        getSettings(); 
                        $scope.setting = {};
                        $scope.setting = resp.json[0];
                        break;
                }
                $rootScope.refresh = true;
            });
        };
    }
    
    $scope.delete = function(model, id){
        if (!id) id = '';
        else id = '/'+id;
        if ( sv.checkResponse() ){
            sv.delWithKey('private/delete/'+model+id).success( function(resp){  
                if ( resp.error ){
                    $scope.alert.push({message: resp.message, type: 'alert-danger', error: resp.error});
                }else{
                    $scope.alert.push({message: resp.message, type: 'alert-success', error: resp.error});
                }
                switch(model){
                    case 'category':    
                        getCategories(); 
                        $scope.category = {};
                        break;
                    case 'setting':     
                        getSettings(); 
                        $scope.setting = {};
                        break;
                }
                $rootScope.refresh = true;
            });
        };
    };
    
    $scope.alert.remove = function(i){
        $scope.alert.splice(i, 1);
    }
});