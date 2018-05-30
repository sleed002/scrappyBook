\c scrapbook_db

ALTER TABLE posts ADD COLUMN post_title varchar(2000) NOT NULL;
ALTER TABLE photos ADD COLUMN photo_caption varchar(2000);
ALTER TABLE photos ADD COLUMN photo_public_id varchar(255);
