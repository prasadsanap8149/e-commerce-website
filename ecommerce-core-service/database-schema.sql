-- Ecommerce Database Schema
-- Run this script to initialize the database

-- Drop tables if they exist (for clean setup)
-- DROP TABLE IF EXISTS enquiries;
-- DROP TABLE IF EXISTS products;
-- DROP TABLE IF EXISTS categories;

-- Create Categories Table
CREATE TABLE IF NOT EXISTS categories (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    image VARCHAR(500),
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_active (active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create Products Table
CREATE TABLE IF NOT EXISTS products (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category_id BIGINT,
    image VARCHAR(500),
    stock INT NOT NULL DEFAULT 0,
    rating DECIMAL(3, 2) DEFAULT 0,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_category (category_id),
    INDEX idx_active (active),
    FULLTEXT INDEX ft_search (name, description),
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create Enquiries Table
CREATE TABLE IF NOT EXISTS enquiries (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    message TEXT,
    product_id BIGINT,
    status ENUM('PENDING', 'REVIEWED', 'RESOLVED') NOT NULL DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_status (status),
    INDEX idx_product (product_id),
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- SEED DATA
-- ============================================

-- Insert Categories
INSERT INTO categories (name, description, image) VALUES
('Electronics', 'Electronic devices, gadgets, and accessories', 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400'),
('Fashion', 'Clothing, shoes, and fashion accessories', 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400'),
('Home & Garden', 'Home decor, furniture, and garden supplies', 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=400'),
('Sports & Outdoors', 'Sports equipment and outdoor gear', 'https://images.unsplash.com/photo-1461896836934- voices-1?w=400'),
('Books & Media', 'Books, music, movies, and games', 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400'),
('Health & Beauty', 'Health, wellness, and beauty products', 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400')
ON DUPLICATE KEY UPDATE description = VALUES(description);

-- Insert Products
INSERT INTO products (name, description, price, category_id, image, stock, rating, active) VALUES
-- Electronics
('Laptop Pro 15"', 'High-performance laptop with 16GB RAM, 512GB SSD, and Intel Core i7 processor. Perfect for work and gaming.', 1299.99, 1, 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400', 15, 4.5, TRUE),
('Wireless Headphones', 'Premium noise-cancelling wireless headphones with 30-hour battery life and Hi-Fi sound quality.', 299.99, 1, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', 30, 4.7, TRUE),
('Smart Watch Pro', 'Advanced smartwatch with health monitoring, GPS, and 7-day battery life.', 399.99, 1, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400', 25, 4.3, TRUE),
('Wireless Earbuds', 'True wireless earbuds with active noise cancellation and touch controls.', 149.99, 1, 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400', 50, 4.4, TRUE),

-- Fashion
('Classic Cotton T-Shirt', 'Comfortable 100% organic cotton t-shirt. Available in multiple colors.', 29.99, 2, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', 100, 4.2, TRUE),
('Denim Jacket', 'Classic denim jacket with a modern fit. Perfect for casual outings.', 89.99, 2, 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400', 40, 4.6, TRUE),
('Running Sneakers', 'Lightweight running sneakers with advanced cushioning technology.', 129.99, 2, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', 60, 4.5, TRUE),
('Leather Wallet', 'Premium genuine leather wallet with RFID protection.', 49.99, 2, 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400', 80, 4.3, TRUE),

-- Home & Garden
('Coffee Maker Deluxe', 'Programmable coffee maker with thermal carafe. Makes up to 12 cups.', 89.99, 3, 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=400', 35, 4.4, TRUE),
('Indoor Plant Set', 'Set of 3 low-maintenance indoor plants in decorative pots.', 59.99, 3, 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400', 20, 4.1, TRUE),
('Throw Blanket', 'Soft fleece throw blanket. Perfect for cozy nights.', 39.99, 3, 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400', 45, 4.6, TRUE),

-- Sports
('Yoga Mat Premium', 'Non-slip yoga mat with carrying strap. Extra thick for comfort.', 45.99, 4, 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400', 70, 4.7, TRUE),
('Fitness Tracker', 'Water-resistant fitness tracker with heart rate monitor and sleep tracking.', 79.99, 4, 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400', 55, 4.2, TRUE),
('Dumbbell Set', 'Adjustable dumbbell set (5-25 lbs). Space-saving design.', 199.99, 4, 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400', 25, 4.5, TRUE),

-- Books
('Bestseller Novel', 'Award-winning fiction novel. #1 New York Times Bestseller.', 24.99, 5, 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400', 150, 4.8, TRUE),
('Cookbook Collection', 'Over 200 recipes from around the world with beautiful photography.', 34.99, 5, 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=400', 40, 4.4, TRUE),

-- Health & Beauty
('Skincare Set', 'Complete skincare routine set with cleanser, toner, and moisturizer.', 79.99, 6, 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400', 30, 4.6, TRUE),
('Electric Toothbrush', 'Rechargeable electric toothbrush with smart timer and multiple modes.', 69.99, 6, 'https://images.unsplash.com/photo-1559591937-abc133b399e0?w=400', 45, 4.3, TRUE)
ON DUPLICATE KEY UPDATE description = VALUES(description);

-- Insert Sample Enquiries
INSERT INTO enquiries (name, email, phone, message, product_id, status) VALUES
('John Doe', 'john@example.com', '+1-555-0101', 'I would like to know more about the warranty for the Laptop Pro.', 1, 'PENDING'),
('Jane Smith', 'jane@example.com', '+1-555-0102', 'Is the Wireless Headphones compatible with iPhone?', 2, 'REVIEWED'),
('Bob Wilson', 'bob@example.com', '+1-555-0103', 'Do you offer bulk discounts on the Cotton T-Shirts?', 5, 'RESOLVED');

-- ============================================
-- USEFUL QUERIES
-- ============================================

-- Get all active products with category name
-- SELECT p.*, c.name as category_name 
-- FROM products p 
-- LEFT JOIN categories c ON p.category_id = c.id 
-- WHERE p.active = TRUE;

-- Get products by category
-- SELECT * FROM products WHERE category_id = 1 AND active = TRUE;

-- Get pending enquiries
-- SELECT * FROM enquiries WHERE status = 'PENDING' ORDER BY created_at DESC;

-- Search products by name
-- SELECT * FROM products WHERE MATCH(name, description) AGAINST('laptop' IN NATURAL LANGUAGE MODE);
