<?php
include_once 'UserController.php';
include_once 'CategoryController.php';
include_once 'uploadController.php';


$app->get('/private/find/:cadastro/:column/:value/:chave', function($class, $column, $value, $chave) use ($app){
    if ( checkPass($chave) ){
        helpers::redirect('/needlogin');
        exit;
    }
    $message = '';
    if ( $column == 'id' ){
        $temp = $class::find($value);
    }else{
        $temp = $class::where($column, $value)->get();
    }
    if( count($temp) > 0 ){
        $id = ($column == 'id' ? $temp->id : $temp[0]->id);
        
        if ( !getClass( $class, $id ) ){
            $temp = false;
        }
        
    }else{
        if ($column != 'id' ){
            $temp = false;
            $message = 'Nenhum registro encontrado';    
        }
    }
    if ( !$temp ){
        $message = 'Nenhum registro encontrado';
    }
    helpers::send(!$temp, $message, $temp);
});

$app->get('/private/all/:cadastro/:chave', function($class, $chave) use ($app){
    if ( checkPass($chave) ){
        helpers::redirect('/needlogin');
        exit;
    }
    
    if( $class == 'category' ){
        $id_c = 'id_category';
    }else if( $class == 'subcategory' ){
        $id_c = 'id_subcategory';
    }
    
    if ( ($class == 'category') || ($class == 'subcategory') ){
        if ( session::get('id_user') == 0 ){
           $c = $class::all();
        }else{
            $p = checkPermisssions(session::get('id_user'));
            $listID = '( ';
            foreach( $p as $x){
                $listID .= $x->$id_c . ',';
            }
            $listID = substr($listID, 0, -1) . ' )';
            $c = $class::where('id', 'in', $listID)->get();
        }
    }else{
        $c = $class::all();
    }
    if ( !$c ){
        $message = 'Nenhum registro encontrado';
    }
    helpers::send(!$c, '', $c);
});
$app->post('/private/new/:cadastro/:chave', function($class, $chave) use ($app){
    if ( checkPass($chave) ){
        helpers::redirect('/needlogin');
        exit;
    }
    
    if ( getClass($class, 'new') ){
        $c = new $class;   
        helpers::getParam( '' , $cData);
        foreach( $cData as $k => $v){
            if ( $k == 'password'){
                $c->password = md5(md5($v));
            }else{
                $c->$k = $v;    
            }
        }
        $c->save();
        $message = 'Registro criado com sucesso!';
  
    }else{
        $c = false;
    }
    
    if (!$c){
        $message = 'Ocorreu um erro ao tentar criar o registro';
    }  
    helpers::send(!$c, $message, $c);
});

$app->post('/private/update/:cadastro/:id/:chave', function($class, $id, $chave) use ($app){
    if ( checkPass($chave) ){
        helpers::redirect('/needlogin');
        exit;
    }
    if ( !getClass( $class, $id ) ){
        $c = false;
        $message = 'Ocorreu um erro ao atualizar o registro';
    }else{
        $message = 'Registro atualizado com sucesso!';
        $c = $class::find($id);
        if ($c) {
            helpers::getParam( '' , $cData);
            foreach( $cData as $k => $v){
                if ( $k == 'password'){
                    $c->password = md5(md5($v));
                }else{
                    $c->$k = $v;    
                }
            }
            $c->save();
        }else{
            $message = 'O Registro '.$id.' não existe';
        }
    }
    helpers::send(!$c, $message, $c);
});

$app->delete('/private/delete/:cadastro/:id/:chave', function($class, $id, $chave) use ($app){
    if ( checkPass($chave) ){
        helpers::redirect('/needlogin');
        exit;
    }
    if ( !getClass( $class, $id ) ){
        $c = false;
        $message = 'Ocorreu um erro ao excluir o registro';
    }else{
        $message = 'Registro apagado com sucesso!';
        $c = $class::find($id);
        if ($c) {            
            $c->delete();
        }else{
            $message = 'O Registro '.$id.' não existe';
        }
    }
        
    helpers::send(!$c, $message, $c);
});


# FUNCOES PROTEGIDAS

function getClass($class, $id){
    
    if ( ($class == 'category') || ($class == 'subcategory') ){
        if ( session::get('id_user') == 0 ){
            return true;
        }else{
            
            if ($class == 'subcategory'){
                if ($id == 'new'){
                    helpers::getParam('id_category', $id);
                }
                $x = $class::find($id);
                if ( !x ){
                    $id = -1;
                }else{
                    $id = $x->id_category;
                }
            }
            
            $p = checkPermisssions(session::get('id_user')); 
            foreach($p as $r){
                if ( $r->id_category == $id ) { $err = true; }
            }
            if ( !$err ){
                return true;
            }else{
                return false;
            }
        }   
    }else{
        return true;
    }
}


function checkPermisssions($id){
        
# select p.ID_CATEGORIAS, p.ID_SUBCATEGORIAS
# from permissoes p
# left join usuarios g on (p.TIPO = 'G') and (g.ID_GRUPO_USUARIOS = p.ID_ESTRANGEIRO )
# left join usuarios u on (p.TIPO = 'U') and (u.ID = p.ID_ESTRANGEIRO )
# where ( p.ID_ESTRANGEIRO = 1 )

    $p = Permission::select('permissions.id_category', 'permissions.id_subcategory')
                  ->leftJoin('users AS g', function($join){

                      $join->on('g.id_usergroup', '=', 'permissions.id_fk')
                           ->where('permissions.type', '=', "'G'");

                })->leftJoin('users AS u', function($join){

                      $join->on('u.id', '=', 'permissions.id_fk')
                           ->where('permissions.type', '=', "'U'");

                })->where("permissions.id_fk", '=', $id )
                  ->get();

    $error = false;
    $mensagem = '';

    if ( ( count($p) < 1 ) ){
        $error = true;
        $mensagem = 'Nenhum registro encontrado';        
    }
    return $p;
};