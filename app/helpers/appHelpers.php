<?php
use Slim\Slim;

class helpers {

  static function send( $error = true, $message = '', $data = '' ) {      
    $app               = Slim::getInstance();
    $response          = new stdClass();
    $response->error   = $error; 
    $response->message  = $message;
    $response->json    = json_decode($data);

    $app->response()->header('Content-Type', 'application/json');
    return $app->response()->body( json_encode($response) );

  }

  static function getParam( $param  = '', &$return) {

    $app     = Slim::getInstance();
    $request = $app->request();
    $body    = $request->getBody();
    if ( $param == '' ){
      return json_decode($body);
    }else{
      $r = json_decode($body);
      if ( array_key_exists($param, $r) ){ 
        $return = $r->$param;
        return true;
      }else{
        $return = 'parametro nao encontrado!';
        return false;
      }
    }

  }

}