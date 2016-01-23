$app.controller('dashboardCtrl', function($scope, $rootScope, $location, sv){
//    $scope.navDashboard = [
//        { icone: 'fa fa-dashboard',   titulo: 'Dashboard',    link: painel_title+'/',             permissao: '0' },
//        { icone: 'fa fa-newspaper-o', titulo: 'Notícias',     link: painel_title+'/noticias',     permissao: '1' },
//        { icone: 'fa fa-archive',     titulo: 'Equipamentos', link: painel_title+'/equipamentos', permissao: '2' },
//        { icone: 'fa fa-file-o',      titulo: 'Páginas',      link: painel_title+'/paginas',      permissao: '2' },
//        { icone: 'fa fa-book',        titulo: 'Clientes',     link: painel_title+'/clientes',     permissao: '3' },
//        { icone: 'fa fa-users',       titulo: 'Usuários',     link: painel_title+'/usuarios',     permissao: '3' },
//        { icone: 'fa fa-database',    titulo: 'Arquivos',     link: painel_title+'/arquivos',     permissao: '0' }
//    ]; 
    

        $scope.teste = {};
        $scope.teste.test = 'barnana';
    
    $scope.x = $scope.$eval('teste.test');

});