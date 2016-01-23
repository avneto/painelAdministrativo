<?php

$app->post('/autenticar', function () use ($app) {
    if ( helpers::getParam('usuario', $usuario) ){
        $u = User::where('username', $usuario)->get();
        
        if ( count($u) > 0 ){    
            if ( helpers::getParam('senha', $senha) ){
                
                $us = User::where('username', $usuario)
                             ->where('password'  , md5(md5($senha)))->get();
                
                if ( count($us) > 0 ){
                    foreach($us as $r){
                        try{
                            $keyAcesso = md5( $r->username . date(DATE_ATOM) ); 
                            $keyAcesso = $keyAcesso . md5( $r->password . date(DATE_ATOM) ); 
                            
                            if ( count($acesso = Access::where('id_user', $r->id)->get()) > 0 ){
                                Access::where('id_user', $r->id)->update(['accesskey' => $keyAcesso]);
                            }else{
                                $acesso = new Access;
                                $acesso->accesskey = $keyAcesso;
                                $acesso->id_user = $r->id;
                                $acesso->save();   
                            }
                            
                            $x = User::where('users.id', $r->id)
                                        ->join('accesses AS a', 'a.id_user', '=', 'users.id')
                                        ->select('users.*', 'a.accesskey')
                                        ->get();
                            
                            helpers::send(false, '', $x);
                        }catch(Exception $e){
                            helpers::send(true, 'Ocorreu um erro ao gerar a key' . $e->getMessage(), '');        
                        }
                    }
                }else{
                  helpers::send(true, 'Senha inválida', '');
                }
            }else{
              helpers::send(true, 'Senha em branco', '');            
            }
        }else{
          helpers::send(true, 'Usuário inválido', '');            
        }
    }else{
      helpers::send(true, 'Usuário em branco', '');            
    }
});

$app->get('/needlogin', function() use ($app){
    helpers::send(true, 'needlogin', '');
});

function checkPass($chave){
    session::delete('id_user'); 
    if ( !( Access::where('accesskey', $chave)->exists() ) ){ 
        return true;
    }else{
        $a = Access::where('accesskey', $chave)->get();
        session::set('id_user', $a[0]->id_user); 
        return false;
    }
}