<?php

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Item extends Model
{
  use SoftDeletes;
  /* inherited */
}

class Additional extends Model
{
  use SoftDeletes;
  /* inherited */
  
}

class AdditionalItem extends Model
{
  use SoftDeletes;
  /* inherited */
}

class Image extends Model
{
  use SoftDeletes;
  /* inherited */
}

class Category extends Model
{
  use SoftDeletes;
  /* inherited */
  
//  protected $table = 'categories'; 
}

class SubCategory extends Model
{
  use SoftDeletes;
  /* inherited */
  
//  protected $table = 'subcategories'; 
}

class Description extends Model
{
  use SoftDeletes;
  /* inherited */
}

class User extends Model
{
  use SoftDeletes;
  
  /* inherited */
}

class UserGroup extends Model
{
  use SoftDeletes;
  /* inherited */
}

class Permission extends Model
{
  use SoftDeletes;
  /* inherited */
}

class Access extends Model
{
  use SoftDeletes;
  /* inherited */
}

class Setting extends Model
{
  use SoftDeletes;
  /* inherited */
}