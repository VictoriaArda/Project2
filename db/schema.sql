-- Creates login database
DROP DATABASE IF EXISTS loginDB;
CREATE DATABASE loginDB;
USE loginDB;
-- Creates table
CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);