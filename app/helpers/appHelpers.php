<?php
session_start();

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
      $return =  json_decode($body);
      return true;
    }else{
      $r = json_decode($body);
      if ( isset($r) && array_key_exists($param, $r) ){ 
        $return = $r->$param;
        return true;
      }else{
        $return = 'parametro nao encontrado!';
        return false;
      }
    }

  }
    
  static function redirect($param = '/'){
     $app = Slim::getInstance();
     $app->redirect(PATH.$param);
  }
    
  static function saveCurrentRoute(){
    $app = Slim::getInstance();

    $path = $app->request()->getPath();
    $route = explode(PATH, $path);
    $route = $route[1];
    setcookie('currentRoute', $route); 
  }
    
  static function continue2Route(){
    $app = Slim::getInstance();
      
    if ( isset($_COOKIE['currentRoute']) ){
      $app->redirect(PATH.$_COOKIE['currentRoute']);
      setcookie('currentRoute');
    }else{
      $app->redirect(PATH.'\error');
    }
  }

  static function Slug($str){
    # special accents
    $a = array('À','Á','Â','Ã','Ä','Å','Æ','Ç','È','É','Ê','Ë','Ì','Í','Î','Ï','Ð','Ñ','Ò','Ó','Ô','Õ','Ö','Ø','Ù','Ú','Û','Ü','Ý','ß','à','á','â','ã','ä','å','æ','ç','è','é','ê','ë','ì','í','î','ï','ñ','ò','ó','ô','õ','ö','ø','ù','ú','û','ü','ý','ÿ','A','a','A','a','A','a','C','c','C','c','C','c','C','c','D','d','Ð','d','E','e','E','e','E','e','E','e','E','e','G','g','G','g','G','g','G','g','H','h','H','h','I','i','I','i','I','i','I','i','I','i','?','?','J','j','K','k','L','l','L','l','L','l','?','?','L','l','N','n','N','n','N','n','?','O','o','O','o','O','o','Œ','œ','R','r','R','r','R','r','S','s','S','s','S','s','Š','š','T','t','T','t','T','t','U','u','U','u','U','u','U','u','U','u','U','u','W','w','Y','y','Ÿ','Z','z','Z','z','Ž','ž','?','ƒ','O','o','U','u','A','a','I','i','O','o','U','u','U','u','U','u','U','u','U','u','?','?','?','?','?','?');
    $b = array('A','A','A','A','A','A','AE','C','E','E','E','E','I','I','I','I','D','N','O','O','O','O','O','O','U','U','U','U','Y','s','a','a','a','a','a','a','ae','c','e','e','e','e','i','i','i','i','n','o','o','o','o','o','o','u','u','u','u','y','y','A','a','A','a','A','a','C','c','C','c','C','c','C','c','D','d','D','d','E','e','E','e','E','e','E','e','E','e','G','g','G','g','G','g','G','g','H','h','H','h','I','i','I','i','I','i','I','i','I','i','IJ','ij','J','j','K','k','L','l','L','l','L','l','L','l','l','l','N','n','N','n','N','n','n','O','o','O','o','O','o','OE','oe','R','r','R','r','R','r','S','s','S','s','S','s','S','s','T','t','T','t','T','t','U','u','U','u','U','u','U','u','U','u','U','u','W','w','Y','y','Y','Z','z','Z','z','Z','z','s','f','O','o','U','u','A','a','I','i','O','o','U','u','U','u','U','u','U','u','U','u','A','a','AE','ae','O','o');
    return strtolower(preg_replace(array('/[^a-zA-Z0-9 -]/','/[ -]+/','/^-|-$/'),array('','-',''),str_replace($a,$b,$str)));
  }

}

class session {
    static function set($name, $value = null){
        $_SESSION[$name] = $value;
    }
    static function get($name){
        if (isset($_SESSION[$name])){
            return $_SESSION[$name];
        }else{
            return false;
        }
    }
    static function delete($name){
        unset($_SESSION[$name]);
    }
}