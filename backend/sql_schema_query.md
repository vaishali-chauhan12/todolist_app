<!-- Create DB -->

CREATE DATABASE todolist;

<!-- Create user table -->

CREATE TABLE user (user_id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, email varchar(255) NOT NULL, password varchar(255) NOT NULL, username varchar(255) NOT NULL, created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP) ENGINE=InnoDB DEFAULT CHARSET=utf8;


<!-- Create list table -->

CREATE TABLE list (id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, title MEDIUMTEXT NOT NULL, note MEDIUMTEXT, user_id int(11), is_deleted TINYINT(1) DEFAULT 0, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, FOREIGN KEY (user_id) REFERENCES user(user_id)) ENGINE = InnoDB DEFAULT CHARSET = utf8;

<!-- Create task table -->

CREATE TABLE task (id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, title MEDIUMTEXT, details MEDIUMTEXT, status TINYINT(1) DEFAULT 0, scheduled_at DATE, is_deleted TINYINT(1) DEFAULT 0, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE task_list_mapping (task_id int(11) NOT NULL, list_id int(11)) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE reset_tokens (token varchar(255) not null, created_at varchar(255) not null, expires_at varchar(255) not null, user_id int not null, PRIMARY KEY(user_id, token));