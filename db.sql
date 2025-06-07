Create DATABASE if NOT exists hw1;
USE hw1;

CREATE TABLE if NOT exists users (
    id integer primary key auto_increment,
    username varchar(16) not null unique,
    password varchar(255) not null,
    email varchar(255) not null unique,
    name varchar(255) not null,
    surname varchar(255) not null
) Engine = INNODB;

CREATE TABLE if NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  snippet TEXT,
  price VARCHAR(100),
  thumbnail TEXT,
  foreign key (user_id) references users(id)
);

CREATE TABLE if NOT EXISTS cart (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  snippet TEXT,
  price VARCHAR(100),
  thumbnail TEXT,
  foreign key (user_id) references users(id)
);


CREATE TABLE if NOT exists recensioni (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  qualita INT NOT NULL,
  spedizione INT NOT NULL,
  assistenza INT NOT NULL,
  commento TEXT,
  data TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
