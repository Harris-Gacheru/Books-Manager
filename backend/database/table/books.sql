create table books(
    id varchar(255) not null primary key,
    name varchar(100) not null,
    pages int not null,
    image varchar(255),
    author varchar(100) not null
)