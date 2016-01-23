<?php
// Configuração da conexão
$settings = array(
  'driver'    => 'mysql',
  'host'      => 'mysql.hostinger.com.br',
  'database'  => 'u220062478_panel',
  'username'  => 'u220062478_panel',
  'password'  => '1#q5rWS?up',
  'charset'   => 'utf8',
  'collation' => 'utf8_unicode_ci',
  'prefix'    => ''
);

use Illuminate\Database\Capsule\Manager as Capsule;
$capsule = new Capsule;
$capsule->addConnection( $settings );
$capsule->bootEloquent();