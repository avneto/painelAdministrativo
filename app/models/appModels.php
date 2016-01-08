<?php

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
  /* inherited */
}

class Adicional extends Model
{
  protected $table = 'adicionais';
}

class AdicionalItem extends Model
{
  protected $table = 'adicionais_itens';
}

class Imagem extends Model
{
  protected $table = 'imagens';
}

class Categoria extends Model
{
  /* inherited */
}

class SubCategoria extends Model
{
  protected $table = 'sub_categorias';
}

class Descricao extends Model
{
  protected $table = 'descricao';
}

class Usuario extends Model
{
  /* inherited */
}

class GrupoUsuario extends Model
{
  protected $table = 'grupo_usuarios';
}

class Permissao extends Model
{
  protected $table = 'permissoes';
}