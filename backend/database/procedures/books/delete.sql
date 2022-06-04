create or alter procedure deletebook @id varchar(255)
AS
BEGIN

delete from books where id = @id

END