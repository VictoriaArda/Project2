USE loginDB;
INSERT INTO favorites (title, image, url, UserId) VALUES  ("SECOND fav", "SECOND image", "SECOND url", 2);

-- Testing queries

USE loginDB;
SELECT * FROM users;

USE loginDB;
SELECT * FROM favorites;

USE loginDB;
SELECT * FROM favorites JOIN users ON favorites.UserId = users.id;