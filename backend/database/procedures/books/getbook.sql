create or alter procedure getbook @id varchar(255)
AS 
BEGIN

SELECT * FROM books WHERE id = @id

END