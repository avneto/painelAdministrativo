<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

require 'vendor/autoload.php';

$app = new \Slim\Slim(array(
  'debug' => true
));


# Constantes
define("DIR", dirname(__FILE__) . '\app');

# Confugaçoes
require_once DIR . '\config\database.php';

# Helpers
require_once DIR . '\helpers\appHelpers.php';

# Models
require_once DIR . '\models\appModels.php';

# Controllers
require_once DIR . '\controllers\appControllers.php';

# Iniciar servidor
$app->run();