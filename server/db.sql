-- for help \?
-- list database \l
-- Create database CREATE DATABASE database_name
CREATE TABLE products (
  id INT,
  name VARCHAR(50),
  price INT,
  on_sale boolean
);
CREATE TABLE restaurants (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  location VARCHAR(50) NOT NULL,
  price_range INT NOT NULL check(
    price_range >= 1
    and price_range <= 5
  )
);
CREATE TABLE reviews (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
  name VARCHAR(50) NOT NULL,
  review TEXT NOT NULL,
  rating INT NOT NULL check(
    rating >= 1
    and rating <= 5
  )
);
SELECT *
FROM reviews;
SELECT *
FROM restaurants
  left join (
    SELECT restaurant_id,
      COUNT(*),
      TRUNC(AVG(rating), 1) as average_rating
    FROM reviews
    GROUP BY restaurant_id
  ) reviews on restaurants.id = reviews.restaurant_id