DROP DATABASE IF EXISTS shope;
CREATE DATABASE shope;
USE shope;
CREATE TABLE `products` (
    `product_id` INT AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT,
    `price DECIMAL`(10, 2) NOT NULL,
    `quantity_available` INT NOT NULL,
    PRIMARY KEY (`product_id`)
);
CREATE TABLE  `customer` (
    `customer_id` INT AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `address` VARCHAR(255),
    `phone` VARCHAR(20),
    `email` VARCHAR(100),
    PRIMARY KEY (`cliente_id`)
);
CREATE TABLE  `sale` (
    `sale_id` INT AUTO_INCREMENT,
    `product_id` INT,
    `customer_id` INT,
    `quantity_purchased` INT,
    `sale_date` DATE,
    `total_sale_amount` DECIMAL(10, 2),
    PRIMARY KEY (`sale_id`)
);