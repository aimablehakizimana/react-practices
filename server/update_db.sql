-- Run this in MySQL to add missing columns
ALTER TABLE users ADD COLUMN last_login TIMESTAMP NULL;
ALTER TABLE users ADD COLUMN is_active BOOLEAN DEFAULT FALSE;
