-- drop database music_library_store_db;
create database if not exists music_library_store_db;
use music_library_store_db;

create table users (
id				int primary key auto_increment not null,
name			varchar(50),
lastname		varchar(50),
username		varchar(100),
email			varchar(100) unique,
password		text,
age				int,
created_at		datetime
);

insert into users (name, lastname, username, email, password, age, created_at)
values ('name', 'lastname', 'username', 'email@gmail.com', 'password123', 20, '2025-01-10 12:35:27');

select * from users;

select * from users where password = '$2b$10$t8klHpHG2.9Frn3fHB6E6.VuktgVOkZ8/tCHmt3k/84EEDjZw0yG6';

select * from users where password = '$2b$10$PtHHVtSknAcwNFvYFwKQI.0BRQsCMjdo4BWD.q7vNP2M22XDNJAZu';

update users set password = "newuser" where id = 1 and password = "password123"