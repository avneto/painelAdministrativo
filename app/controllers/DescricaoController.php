<?php
# === api
# ==================================================
$app->get('/Descricao', function() use ($app) {
  $results = Descricao::all();
  return helpers::send(false, '', $results );
}); 