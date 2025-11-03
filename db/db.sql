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
