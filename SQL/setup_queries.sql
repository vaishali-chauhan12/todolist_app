CREATE DATABASE IF NOT EXISTS todolist;

CREATE TABLE IF NOT EXISTS user (user_id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, email varchar(255) NOT NULL, password varchar(255) NOT NULL, username varchar(255) NOT NULL, created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS list (id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, title MEDIUMTEXT NOT NULL, note MEDIUMTEXT, user_id int(11), is_deleted TINYINT(1) DEFAULT 0, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, FOREIGN KEY (user_id) REFERENCES user(user_id)) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS task (id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, title MEDIUMTEXT, details MEDIUMTEXT, status TINYINT(1) DEFAULT 0, scheduled_at DATE, is_deleted TINYINT(1) DEFAULT 0, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS task_list_mapping (task_id int(11) NOT NULL, list_id int(11)) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS reset_tokens (token varchar(255) not null, created_at varchar(255) not null, expires_at varchar(255) not null, user_id int not null, PRIMARY KEY(user_id, token));

INSERT INTO user (username, email, password) VALUES ("Default User", "default-user@todalist.com", "$2a$10$pwPYXOxz4JCln8OUoRpkHuBoNg4QFYPrzCVuppMXEGXbY7AnbszjW");

INSERT INTO list (title, user_id) VALUES ('Home', LAST_INSERT_ID());