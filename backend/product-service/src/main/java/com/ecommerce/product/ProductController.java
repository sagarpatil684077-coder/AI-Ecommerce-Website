package com.ecommerce.product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {
    
    @Autowired
    private ProductService productService;
    
    @GetMapping
    public List<Product> getAllProducts() {
        System.out.println("📦 GET /api/products - Fetching all products");
        return productService.getAllProducts();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        System.out.println("📦 GET /api/products/" + id);
        Product product = productService.getProductById(id);
        if (product != null) {
            return ResponseEntity.ok(product);
        }
        return ResponseEntity.notFound().build();
    }
    
    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        System.out.println("✅ POST /api/products - Creating: " + product.getName());
        return productService.createProduct(product);
    }
    
    @PutMapping("/{id}")
    public Product updateProduct(@PathVariable Long id, @RequestBody Product product) {
        System.out.println("✏️ PUT /api/products/" + id);
        return productService.updateProduct(id, product);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        System.out.println("🗑️ DELETE /api/products/" + id);
        productService.deleteProduct(id);
        return ResponseEntity.ok().build();
    }
    
    @GetMapping("/search")
    public List<Product> searchProducts(@RequestParam String q) {
        System.out.println("🔍 SEARCH /api/products?q=" + q);
        return productService.searchProducts(q);
    }
}