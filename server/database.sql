CREATE TABLE IF NOT EXISTS  items (

  id INT(99) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  id_category INT(99) UNSIGNED NULL,
  id_subcategory INT(99) UNSIGNED NULL,
  id_description INT(99) UNSIGNED NULL,
  visible CHAR(1) NULL DEFAULT 1,
  sequence INT(99) NOT NULL DEFAULT 0,
  name VARCHAR(80) NOT NULL,

  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  deleted_at timestamp NULL DEFAULT NULL

) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8mb4;

CREATE TABLE IF NOT EXISTS  additionals (

  id INT(99) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  id_item INT(99) UNSIGNED NOT NULL,
  sequence INT(99) NOT NULL DEFAULT 0,
  imagem VARCHAR(80) NULL,
  name VARCHAR(80) NULL,

  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  deleted_at timestamp NULL DEFAULT NULL

) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8mb4;

CREATE TABLE IF NOT EXISTS  additional_items (

  id INT(99) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  id_additional INT(99) UNSIGNED NOT NULL,
  sequence INT(99) NOT NULL DEFAULT 0,
  description TEXT NOT NULL,

  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  deleted_at timestamp NULL DEFAULT NULL

) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8mb4;

CREATE TABLE IF NOT EXISTS  images (

  id INT(99) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  id_item INT(99) UNSIGNED NOT NULL,
  sequence INT(99) NOT NULL DEFAULT 0,
  path TEXT NOT NULL,

  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  deleted_at timestamp NULL DEFAULT NULL

) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8mb4;

CREATE TABLE IF NOT EXISTS  categories (

  id INT(99) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  use_subcategories BOOLEAN NOT NULL,
  use_items BOOLEAN NOT NULL DEFAULT 1,
  use_image BOOLEAN NOT NULL DEFAULT 1,
  use_additionals BOOLEAN NOT NULL DEFAULT 1,
  use_additionalsitems BOOLEAN NOT NULL DEFAULT 1,
  sequence INT(99) NOT NULL DEFAULT 0,
  visible CHAR(1) NULL DEFAULT 1,
  name VARCHAR(80) NOT NULL,
  subcategories_title VARCHAR(80) NULL,
  items_title VARCHAR(80) NULL,
  icon VARCHAR(50) NOT NULL DEFAULT 'fa-link',

  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  deleted_at timestamp NULL DEFAULT NULL

) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8mb4;

CREATE TABLE IF NOT EXISTS  sub_categories (

  id INT(99) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  id_category INT(99) UNSIGNED NOT NULL,
  sequence INT(99) NOT NULL DEFAULT 0,
  visible CHAR(1) NULL DEFAULT 1,
  image TEXT NULL,
  name VARCHAR(80) NULL,

  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  deleted_at timestamp NULL DEFAULT NULL

) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8mb4;

CREATE TABLE IF NOT EXISTS  descriptions (

  id INT(99) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  description TEXT NOT NULL,

  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  deleted_at timestamp NULL DEFAULT NULL

) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8mb4;

CREATE TABLE IF NOT EXISTS  users (

  id INT(99) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  id_usergroup INT(99) UNSIGNED NULL,
  expiration_time INT(99) NOT NULL DEFAULT 1,
  name VARCHAR(80) NULL,
  email VARCHAR(120) NULL,
  username VARCHAR(20) NULL,
  password VARCHAR(32) NULL,
  imagem VARCHAR(80) NULL,

  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  deleted_at timestamp NULL DEFAULT NULL

) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8mb4;

CREATE TABLE IF NOT EXISTS  user_groups (

  id INT(99) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name TEXT NOT NULL,

  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  deleted_at timestamp NULL DEFAULT NULL

) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8mb4;

CREATE TABLE IF NOT EXISTS  permissions (

  id INT(99) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  id_fk INT(99) UNSIGNED NOT NULL,
  type CHAR(1) NOT NULL,
  users_control TINYINT(1) NOT NULL DEFAULT 0,
  id_category INT(99) UNSIGNED NOT NULL,
  id_subcategory INT(99) UNSIGNED NULL,

  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  deleted_at timestamp NULL DEFAULT NULL

) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8mb4;

CREATE TABLE IF NOT EXISTS  accesses (

  id INT(99) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  accesskey VARCHAR(64) NOT NULL,
  id_user INT(99) UNSIGNED NULL,
  ip VARCHAR(15) NULL,
  data_ip TEXT NOT NULL,

  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  deleted_at timestamp NULL DEFAULT NULL

) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8mb4;

CREATE TABLE IF NOT EXISTS  settings (

  id INT(1) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  head_title_panel VARCHAR(20) NOT NULL,
  head_title VARCHAR(70) NOT NULL,
  meta_keywords VARCHAR(150) NOT NULL,
  meta_description VARCHAR(90) NOT NULL,

  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  deleted_at timestamp NULL DEFAULT NULL

) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8mb4;

ALTER TABLE `items` ADD 
    CONSTRAINT `items2cat` 
    FOREIGN KEY (`id_category`) 
    REFERENCES `categories` (`id`) 
    ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE `items` ADD 
    CONSTRAINT `items2subcat` 
    FOREIGN KEY (`id_subcategory`) 
    REFERENCES `sub_categories` (`id`) 
    ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE `items` ADD 
    CONSTRAINT `items2desc` 
    FOREIGN KEY (`id_description`) 
    REFERENCES `descriptions` (`id`) 
    ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE `additionals` ADD 
    CONSTRAINT `additionals2items` 
    FOREIGN KEY (`id_item`) 
    REFERENCES `items` (`id`)  
    ON DELETE CASCADE ON UPDATE CASCADE;


ALTER TABLE `additional_items` ADD 
    CONSTRAINT `additems2adds` 
    FOREIGN KEY (`id_additional`) 
    REFERENCES `additionals` (`id`)  
    ON DELETE CASCADE ON UPDATE CASCADE;


ALTER TABLE `images` ADD 
    CONSTRAINT `images2items` 
    FOREIGN KEY (`id_item`) 
    REFERENCES `items` (`id`) 
    ON DELETE CASCADE ON UPDATE CASCADE;


ALTER TABLE `sub_categories` ADD 
    CONSTRAINT `scat2categories` 
    FOREIGN KEY (`id_category`) 
    REFERENCES `categories` (`id`) 
    ON DELETE CASCADE ON UPDATE CASCADE;


ALTER TABLE `users` ADD 
    CONSTRAINT `user2user_groups` 
    FOREIGN KEY (`id_usergroup`) 
    REFERENCES `user_groups` (`id`)  
    ON DELETE SET NULL ON UPDATE CASCADE;


ALTER TABLE `permissions` ADD 
    CONSTRAINT `perm2cats` 
    FOREIGN KEY (`id_category`) 
    REFERENCES `categories` (`id`) 
    ON DELETE CASCADE ON UPDATE CASCADE;
    
ALTER TABLE `permissions` ADD 
    CONSTRAINT `perm2subcats` 
    FOREIGN KEY (`id_subcategory`) 
    REFERENCES `sub_categories` (`id`) 
    ON DELETE CASCADE ON UPDATE CASCADE;


ALTER TABLE `accesses` ADD 
    CONSTRAINT `access2users` 
    FOREIGN KEY (`id_user`) 
    REFERENCES `users` (`id`) 
    ON DELETE SET NULL ON UPDATE CASCADE;
    
    
INSERT INTO users (id, name, email, username, password, expiration_time, created_at) 
           VALUES (0, 'Anthero Vieira Neto', 'netooo@me.com', 'neto', ( select md5(md5('q1w2e3r4')) ), 360, CURRENT_TIMESTAMP );