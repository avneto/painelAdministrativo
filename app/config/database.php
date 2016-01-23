<?php
// Configuração da conexão
$settings = array(
  'driver'    => 'mysql',
  'host'      => 'localhost',
  'database'  => 'boechat',
  'username'  => 'boechat',
  'password'  => 'EJMq6NBBr8GpMnu5',
  'charset'   => 'utf8',
  'collation' => 'utf8_unicode_ci',
  'prefix'    => ''
);

use Illuminate\Database\Capsule\Manager as Capsule;
$capsule = new Capsule;
$capsule->addConnection( $settings );
$capsule->bootEloquent();