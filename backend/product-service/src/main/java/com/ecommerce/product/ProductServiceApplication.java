package com.ecommerce.product;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ProductServiceApplication {
    
    public static void main(String[] args) {
        SpringApplication.run(ProductServiceApplication.class, args);
        System.out.println("🚀 Product Service is running on http://localhost:8081");
    }
    
    @Bean
    CommandLineRunner initDatabase(ProductRepository repository) {
        return args -> {
            // Only load products if database is empty
            if (repository.count() == 0) {
                // Electronics
                repository.save(createProduct(
                    "iPhone 15 Pro", 
                    "Electronics", 
                    999.99, 
                    1099.99,
                    4.8, 
                    2547,
                    "Latest iPhone with A17 Pro chip, titanium design, and advanced camera system",
                    "Apple",
                    "https://images.unsplash.com/photo-1696446702061-cbd2d0c67f3f?w=500",
                    "New Arrival",
                    50
                ));
                
                repository.save(createProduct(
                    "MacBook Pro 16\"", 
                    "Electronics", 
                    2499.99, 
                    2799.99,
                    4.9, 
                    1823,
                    "Powerful laptop with M3 Max chip, 16-inch Liquid Retina XDR display",
                    "Apple",
                    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500",
                    "Best Seller",
                    30
                ));
                
                repository.save(createProduct(
                    "Sony WH-1000XM5", 
                    "Electronics", 
                    399.99, 
                    449.99,
                    4.7, 
                    3421,
                    "Industry-leading noise canceling headphones with exceptional sound quality",
                    "Sony",
                    "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500",
                    "Featured",
                    100
                ));
                
                repository.save(createProduct(
                    "Samsung Galaxy S24 Ultra", 
                    "Electronics", 
                    1199.99, 
                    1299.99,
                    4.6, 
                    1954,
                    "Flagship Android phone with S Pen, AI features, and 200MP camera",
                    "Samsung",
                    "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500",
                    "New Arrival",
                    45
                ));
                
                repository.save(createProduct(
                    "iPad Air M2", 
                    "Electronics", 
                    599.99, 
                    699.99,
                    4.7, 
                    1234,
                    "Lightweight tablet with M2 chip, perfect for creativity and productivity",
                    "Apple",
                    "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500",
                    "Best Seller",
                    80
                ));
                
                // Fashion
                repository.save(createProduct(
                    "Nike Air Max 270", 
                    "Fashion", 
                    150.00, 
                    180.00,
                    4.5, 
                    892,
                    "Comfortable running shoes with Air cushioning technology",
                    "Nike",
                    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
                    "Trending",
                    200
                ));
                
                repository.save(createProduct(
                    "Levi's 501 Original Jeans", 
                    "Fashion", 
                    89.99, 
                    110.00,
                    4.6, 
                    2156,
                    "Classic straight fit jeans, the original since 1873",
                    "Levi's",
                    "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500",
                    "Classic",
                    150
                ));
                
                repository.save(createProduct(
                    "Adidas Ultraboost 23", 
                    "Fashion", 
                    180.00, 
                    200.00,
                    4.8, 
                    1567,
                    "High-performance running shoes with responsive Boost cushioning",
                    "Adidas",
                    "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500",
                    "Featured",
                    120
                ));
                
                // Home & Kitchen
                repository.save(createProduct(
                    "Instant Pot Duo Plus", 
                    "Home", 
                    119.99, 
                    149.99,
                    4.7, 
                    5432,
                    "9-in-1 multi-cooker with pressure cooking, slow cooking, and more",
                    "Instant Pot",
                    "https://images.unsplash.com/photo-1585515320310-259814833e62?w=500",
                    "Best Seller",
                    90
                ));
                
                repository.save(createProduct(
                    "Dyson V15 Detect", 
                    "Home", 
                    649.99, 
                    749.99,
                    4.6, 
                    987,
                    "Cordless vacuum with laser dust detection and powerful suction",
                    "Dyson",
                    "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500",
                    "Premium",
                    40
                ));
                
                repository.save(createProduct(
                    "KitchenAid Stand Mixer", 
                    "Home", 
                    379.99, 
                    449.99,
                    4.9, 
                    3210,
                    "Professional 5-quart mixer for all your baking needs",
                    "KitchenAid",
                    "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=500",
                    "Best Seller",
                    65
                ));
                
                // Books
                repository.save(createProduct(
                    "Atomic Habits", 
                    "Books", 
                    16.99, 
                    27.00,
                    4.8, 
                    12543,
                    "Tiny changes, remarkable results - transform your habits",
                    "Penguin Random House",
                    "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=500",
                    "Best Seller",
                    500
                ));
                
                System.out.println("✅ Loaded 12 products into database");
            } else {
                System.out.println("ℹ️ Database already contains " + repository.count() + " products");
            }
        };
    }
    
    private Product createProduct(String name, String category, double price, double originalPrice,
                                   double rating, int reviews, String description, String brand,
                                   String image, String tag, int stock) {
        Product product = new Product();
        product.setName(name);
        product.setCategory(category);
        product.setPrice(price);
        product.setOriginalPrice(originalPrice);
        product.setRating(rating);
        product.setReviews(reviews);
        product.setDescription(description);
        product.setBrand(brand);
        product.setInStock(stock > 0);
        product.setStock(stock);
        product.setDiscount((int)Math.round(((originalPrice - price) / originalPrice) * 100));
        product.setPrime(true);
        product.setImage(image);
        product.setTag(tag);
        product.setDelivery(price > 25 ? "Free Delivery" : "Standard Delivery");
        return product;
    }
}