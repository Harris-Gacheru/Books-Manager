create or alter procedure createBook @id varchar(255), @name varchar(100), @pages int, @image varchar(255), @author varchar(100)
AS 
BEGIN

insert into books(id, name, pages, image, author)
values(@id, @name, @pages, @image, @author)

END