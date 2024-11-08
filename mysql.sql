CREATE DATABASE sci_astra;
use sci_astra;

CREATE TABLE blog_posts(
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100),
  content TEXT,
  publish_date DATETIME,
  statuc ENUM('published' , 'scheduled') DEFAULT 'scheduled',
  image_url VARCHAR(300) DEFAULT 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvMD5V0P7zfTa_P1lOZPOJ86LzX80XwMoAYg&s'
);

 ALTER TABLE blog_posts
 MODIFY COLUMN image_url LONGBLOB ;