DROP DATABASE IF EXISTS database_development_db;

CREATE DATABASE database_development_db;

USE database_development_db;

CREATE TABLE user
(
	id int NOT NULL AUTO_INCREMENT,
	username varchar(255) NOT NULL,
	password varchar ( 255 ) NOT NULL,
	PRIMARY KEY (id),
);