create or alter procedure updatebook @id varchar(255),@name varchar(100), @pages int, @image varchar(255), @author varchar(100), @description varchar(400)
AS
BEGIN

update books
set name = @name, pages = @pages, image = @image, author = @author, description = @description
where id = @id

END