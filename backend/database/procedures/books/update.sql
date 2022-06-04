create or alter procedure updatebook @id varchar(255), @pages int, @image varchar(255)
AS
BEGIN

update books
set pages = @pages, image = @image
where id = @id

END