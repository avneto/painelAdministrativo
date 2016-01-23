<?php

$app->get('/public/categorias', function() use ($app){
//    $c = Category::find(0);
    $c = SubCategory::all();
    
    $error = false;
    $mensagem = '';
    
    if ( ( count($c) < 1 ) ){
        $error = true;
        $mensagem = 'Nenhum registro encontrado';        
    }
    
    helpers::send( $error, $mensagem, $c );
});
