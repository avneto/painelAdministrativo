<?php

$app->post('/autenticar', function () use ($app) {
    helpers::send( !helpers::getParam('usuario', $usuario), '', json_encode(array("usuario" => $usuario)));
});