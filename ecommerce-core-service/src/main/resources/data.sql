-- Seed Data for E-Commerce Platform
-- This file is automatically loaded by Spring Boot

-- Insert Categories (only if not exists)
INSERT IGNORE INTO categories (name, description, image, active) VALUES
('Electronics', 'Electronic devices, gadgets, and accessories', 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400', TRUE),
('Fashion', 'Clothing, shoes, and fashion accessories', 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400', TRUE),
('Home & Garden', 'Home decor, furniture, and garden supplies', 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=400', TRUE),
('Sports & Outdoors', 'Sports equipment and outdoor gear', 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400', TRUE),
('Books & Media', 'Books, music, movies, and games', 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400', TRUE),
('Health & Beauty', 'Health, wellness, and beauty products', 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400', TRUE);

-- Insert Products (only if table is empty)
INSERT INTO products (name, description, price, category_id, image, stock, rating, active)
SELECT * FROM (
    SELECT 'Laptop Pro 15"' as name, 'High-performance laptop with 16GB RAM, 512GB SSD, and Intel Core i7 processor.' as description, 1299.99 as price, 1 as category_id, 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400' as image, 15 as stock, 4.5 as rating, TRUE as active
) AS tmp
WHERE NOT EXISTS (SELECT 1 FROM products LIMIT 1);

INSERT INTO products (name, description, price, category_id, image, stock, rating, active)
SELECT * FROM (
    SELECT 'Wireless Headphones' as name, 'Premium noise-cancelling wireless headphones with 30-hour battery life.' as description, 299.99 as price, 1 as category_id, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400' as image, 30 as stock, 4.7 as rating, TRUE as active
) AS tmp
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Wireless Headphones');

INSERT INTO products (name, description, price, category_id, image, stock, rating, active)
SELECT * FROM (
    SELECT 'Smart Watch Pro' as name, 'Advanced smartwatch with health monitoring, GPS, and 7-day battery life.' as description, 399.99 as price, 1 as category_id, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400' as image, 25 as stock, 4.3 as rating, TRUE as active
) AS tmp
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Smart Watch Pro');

INSERT INTO products (name, description, price, category_id, image, stock, rating, active)
SELECT * FROM (
    SELECT 'Classic Cotton T-Shirt' as name, 'Comfortable 100% organic cotton t-shirt. Available in multiple colors.' as description, 29.99 as price, 2 as category_id, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400' as image, 100 as stock, 4.2 as rating, TRUE as active
) AS tmp
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Classic Cotton T-Shirt');

INSERT INTO products (name, description, price, category_id, image, stock, rating, active)
SELECT * FROM (
    SELECT 'Running Sneakers' as name, 'Lightweight running sneakers with advanced cushioning technology.' as description, 129.99 as price, 2 as category_id, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400' as image, 60 as stock, 4.5 as rating, TRUE as active
) AS tmp
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Running Sneakers');

INSERT INTO products (name, description, price, category_id, image, stock, rating, active)
SELECT * FROM (
    SELECT 'Coffee Maker Deluxe' as name, 'Programmable coffee maker with thermal carafe. Makes up to 12 cups.' as description, 89.99 as price, 3 as category_id, 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=400' as image, 35 as stock, 4.4 as rating, TRUE as active
) AS tmp
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Coffee Maker Deluxe');

INSERT INTO products (name, description, price, category_id, image, stock, rating, active)
SELECT * FROM (
    SELECT 'Yoga Mat Premium' as name, 'Non-slip yoga mat with carrying strap. Extra thick for comfort.' as description, 45.99 as price, 4 as category_id, 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400' as image, 70 as stock, 4.7 as rating, TRUE as active
) AS tmp
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Yoga Mat Premium');

INSERT INTO products (name, description, price, category_id, image, stock, rating, active)
SELECT * FROM (
    SELECT 'Bestseller Novel' as name, 'Award-winning fiction novel. #1 New York Times Bestseller.' as description, 24.99 as price, 5 as category_id, 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400' as image, 150 as stock, 4.8 as rating, TRUE as active
) AS tmp
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Bestseller Novel');

INSERT INTO products (name, description, price, category_id, image, stock, rating, active)
SELECT * FROM (
    SELECT 'Skincare Set' as name, 'Complete skincare routine set with cleanser, toner, and moisturizer.' as description, 79.99 as price, 6 as category_id, 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400' as image, 30 as stock, 4.6 as rating, TRUE as active
) AS tmp
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Skincare Set');
