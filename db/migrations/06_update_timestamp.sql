\c scrapbook_db

ALTER TABLE posts ALTER COLUMN post_time_date TYPE VARCHAR(50);
ALTER TABLE posts ALTER COLUMN post_time_date SET NOT NULL;
