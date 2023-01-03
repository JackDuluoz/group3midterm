DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS favorites CASCADE;
DROP TABLE IF EXISTS purchases CASCADE;
DROP TABLE IF EXISTS listings CASCADE;

CREATE TABLE users (
  id INT PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  address TEXT,
  email VARCHAR(255),
  phone_number VARCHAR(255)
);

CREATE TABLE listings (
  id INT PRIMARY KEY NOT NULL,
  user_id REFERENCES users(id) ON DELETE CASCADE,
  description TEXT,
  price VARCHAR(255),
  photo_url VARCHAR(255),
  size VARCHAR(255),
  gender VARCHAR(255),
  condition VARCHAR(255),
  listing_date DATE NOT NULL,
  sold_date DATE,
  isSold VARCHAR(255)
);

CREATE TABLE favorites (
  id INT PRIMARY KEY NOT NULL,
  user_id REFERENCES users(id) ON DELETE CASCADE,
  listing_id REFERENCES listings(id) ON DELETE CASCADE
)

CREATE TABLE purchases (
  id INT PRIMARY KEY NOT NULL,
  user_id REFERENCES users(id) ON DELETE CASCADE,
  listing_id REFERENCES listings(id) ON DELETE CASCADE,
  purchase_date DATE
)

CREATE TABLE messages (
  id INT PRIMARY KEY NOT NULL,
  user_id_from REFERENCES users(id) ON DELETE CASCADE,
  user_id_to REFERENCES users(id) ON DELETE CASCADE,
  message TEXT,
  time_sent DATE
  )

  

