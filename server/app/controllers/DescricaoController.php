<?php
# Descrição Controller
$app->get('/Descricao', function() use ($app) {
  # select * from DESCRICAO
  $results = Descricao::all();
  # send( Deu erro?, Mensagem do erro, Dados a serem enviados )    
  return helpers::send(false, '', $results );
}); 
