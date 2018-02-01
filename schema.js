CREATE DATABASE Bamazon;
USE Bamazon;

CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ProductName` varchar(45) NOT NULL,
  `Price` decimal(10,2) NOT NULL,
  `DepartmentName` VARCHAR(20) NOT NULL,
  StockQuantity int(11) NOT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO products (ProductName, DepartmentName, Price, StockQuantity)
VALUES ("Live T-Rex", "Animals", 5100.32, 2),
		("Pink Barbell", "Sports", 99.99, 100),
		("Purple Drank", "Grocery", 12.50, 10),
		("Super Flax Milk Special Edition", "Grocery", 5.50, 300),
		("Fancy Feast the Movie", "Electronics", 20.30, 200),
		("Weighted Comfy Slippers", "Sports", 6.66, 1000),
		("Holy Water", "Pharmacy", 10.01, 100),
		("Excalibur Sword Meds", "Pharmacy", 1000, 10),
		("Charmin Toliet Paper Stretch Bands", "Sports", 4.50, 500),
		("Pikachu", "Animals", 8000, 1);
