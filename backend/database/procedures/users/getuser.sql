create or alter procedure getuser @email varchar(100)
AS
BEGIN

select * from users where email = @email

END