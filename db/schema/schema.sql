/* Schema for SQL tables Users, Listings and Favorites */

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS favorites CASCADE;
DROP TABLE IF EXISTS listings CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  address TEXT,
  email VARCHAR(255),
  phone_number VARCHAR(255)
);

CREATE TABLE listings (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  name VARCHAR(255),
  description TEXT,
  price NUMERIC,
  photo_url VARCHAR(255),
  size VARCHAR(255),
  gender VARCHAR(255),
  condition VARCHAR(255),
  listing_date DATE NOT NULL,
  sold_date TIMESTAMP,
  isSold BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE favorites (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  listing_id INTEGER REFERENCES listings(id) ON DELETE CASCADE
);
