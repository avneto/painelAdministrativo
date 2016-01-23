<?php

$app->post('/private/upload/:class/:id/:chave', function($class, $id, $chave) use ($app){
    if ( checkPass($chave) ){
        helpers::redirect('/needlogin');
        exit;
    }

    ignore_user_abort(true);
    set_time_limit(0);
    
#    O nome original do arquivo na máquina do cliente.
    $name = $_FILES['file']['name'];

#    O tipo mime do arquivo, se o navegador fornecer essa informação. Um exemplo poderia ser "image/gif". 
    $type = $_FILES['file']['type'];

#    O tamanho, em bytes, do arquivo enviado.
    $size = $_FILES['file']['size'];

#    O nome temporário com o qual o arquivo enviado foi armazenado no servidor.
    $temp = $_FILES['file']['tmp_name'];

#    O código de erro associado a esse upload de arquivo.
    $error = $_FILES['file']['error'];
    
    $type = explode('/', $type);
    $error = ( ($type[0] != 'image') || ($type[1] == 'pdf') || $error );
    
    $file_path = "upload/". $class;
        if ( !file_exists($file_path) ){
            if ( !mkdir($file_path, 0777, true)){
                $error = true;
            }
        }
            
        $file_path .=  "/" . date('d-m-Y_H-i-s') . '_' . helpers::Slug($name);    

        if (!move_uploaded_file($temp, $file_path)) {
            $error = true;
        }
    
     
    if ( !$error ){
        switch( $class ){
            case 'image':
                $c = new $class;
                $c->id_item = $id;
                $c->sequence = 0;
                $c->path = $file_path;
                $c->save();
                $message = "Imagem enviada com sucesso!";
                break;
            default:
                $c = $class::find($id);
                $c->image = $file_path;
                $c->save();
                $message = "Imagem enviada com sucesso!";
                break;
        }
    }
    
    helpers::send($error, $message, $c);
    
});

$app->post('/private/image/delete/:class/:id/:chave', function($class, $id, $chave) use ($app){
    if ( checkPass($chave) ){
        helpers::redirect('/needlogin');
        exit;
    }
    $c = $class::find($id);
    $img_path = $c->path;
    
    if ( file_exists($img_path) ){    
        unlink($img_path);
    }
    
    $c->delete();
    $message = "Imagem excluida com sucesso!";
    $error = false;
    
    helpers::send($error, $message, "");
    
});