create or alter procedure registeruser @id varchar(255), @username varchar(100), @email varchar(100), @password varchar(255)
AS
BEGIN

insert into users(id, username, email, password)
values(@id, @username, @email, @password)

END