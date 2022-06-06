create or alter procedure createBook @id varchar(255), @name varchar(100), @pages int, @image varchar(255), @author varchar(100), @description varchar(400)
AS 
BEGIN

insert into books(id, name, pages, image, author, description)
values(@id, @name, @pages, @image, @author, @description)

END

-- exec createBook @id = 12345, @name = 'Kidagaa Kimemwozea', @pages = 89, @image = '', @author = 'Harrison'