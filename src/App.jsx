import React, { useState, useEffect, useRef } from 'react';
import {
  ShoppingCart, Heart, Search, MapPin, User, ChevronDown, Menu, X, Star, Truck, Shield,
  RotateCcw, Award, Grid, List, MessageCircle, Send, Sparkles, ChevronRight, BadgePercent,
  CheckCircle, Clock, TrendingUp, Zap, Tag, Gift, CreditCard, Bell, Filter, SlidersHorizontal
} from 'lucide-react';

// SearchInput Component with React.memo to prevent re-renders

const SearchInput = React.memo(({ searchQuery, setSearchQuery, setShowSearchSuggestions }) => {
  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleClick = () => {
    setShowSearchSuggestions(true);
  };

  return (
    <input
      type="text"
      placeholder="🔍 Search for products, brands and more..."
      value={searchQuery}
      onChange={handleChange}
      onClick={handleClick}
      className="flex-1 px-4 py-3 focus:outline-none"
      autoComplete="off"
    />
  );
});

SearchInput.displayName = 'SearchInput';
SearchInput.displayName = 'SearchInput';const categories = [
  { name: 'Electronics', icon: '📱', color: 'from-blue-500 to-cyan-500', subcats: ['Mobiles', 'Laptops', 'Cameras', 'Headphones'] },
  { name: 'Fashion', icon: '👕', color: 'from-pink-500 to-rose-500', subcats: ['Men', 'Women', 'Kids', 'Accessories'] },
  { name: 'Home & Kitchen', icon: '🏠', color: 'from-orange-500 to-amber-500', subcats: ['Furniture', 'Appliances', 'Decor', 'Kitchen'] },
  { name: 'Books', icon: '📚', color: 'from-purple-500 to-violet-500', subcats: ['Fiction', 'Non-Fiction', 'Comics', 'Education'] },
  { name: 'Sports', icon: '⚽', color: 'from-green-500 to-emerald-500', subcats: ['Fitness', 'Outdoor', 'Sports Wear', 'Equipment'] },
  { name: 'Beauty', icon: '💄', color: 'from-red-500 to-pink-500', subcats: ['Makeup', 'Skincare', 'Haircare', 'Fragrances'] },
];


// Move hardcoded products to a backup variable
const DUMMY_PRODUCTS = [
  { id: 1, name: "Apple iPhone 15 Pro Max", brand: "Apple", category: "Electronics", price: 134999, originalPrice: 159999, rating: 4.6, reviews: 45234, image: "📱", delivery: "Free", tag: "Bestseller", discount: 16, inStock: true, prime: true, features: ["256GB Storage", "A17 Pro Chip", "48MP Camera"] },
  { id: 2, name: "Samsung Galaxy S24 Ultra", brand: "Samsung", category: "Electronics", price: 124999, originalPrice: 134999, rating: 4.5, reviews: 32156, image: "📱", delivery: "Free", tag: "Trending", discount: 7, inStock: true, prime: true, features: ["512GB Storage", "S Pen", "200MP Camera"] },
  { id: 3, name: "Sony WH-1000XM5 Headphones", brand: "Sony", category: "Electronics", price: 29990, originalPrice: 34990, rating: 4.7, reviews: 12890, image: "🎧", delivery: "Free", tag: "Top Rated", discount: 14, inStock: true, prime: true, features: ["ANC", "30hrs Battery", "Premium Sound"] },
{ id: 4, name: "Dell XPS 15 Laptop", brand: "Dell", category: "Electronics", price: 184999, originalPrice: 209999, rating: 4.8, reviews: 5432, image: "💻", delivery: "Free", tag: "Premium", discount: 12, inStock: true, prime: true, features: ["Intel i9", "32GB RAM", "1TB SSD"] },
{ id: 5, name: "Apple MacBook Air M2", brand: "Apple", category: "Electronics", price: 114900, originalPrice: 119900, rating: 4.8, reviews: 8934, image: "💻", delivery: "Free", tag: "Bestseller", discount: 4, inStock: true, prime: true, features: ["M2 Chip", "8GB RAM", "256GB SSD"] },
{ id: 6, name: "Canon EOS 3000D DSLR", brand: "Canon", category: "Electronics", price: 31999, originalPrice: 39995, rating: 4.5, reviews: 6234, image: "📷", delivery: "Free", tag: "Deal", discount: 20, inStock: true, prime: true, features: ["18MP", "Full HD Video", "WiFi Enabled"] },
{ id: 7, name: "JBL Flip 6 Bluetooth Speaker", brand: "JBL", category: "Electronics", price: 11999, originalPrice: 14999, rating: 4.6, reviews: 15234, image: "🔊", delivery: "Free", tag: "Popular", discount: 20, inStock: true, prime: true, features: ["Waterproof", "12hrs Battery", "Deep Bass"] },
{ id: 8, name: "Apple Watch Series 9", brand: "Apple", category: "Electronics", price: 44900, originalPrice: 49900, rating: 4.7, reviews: 12456, image: "⌚", delivery: "Free", tag: "Trending", discount: 10, inStock: true, prime: true, features: ["GPS", "Heart Rate", "Water Resistant"] },
{ id: 9, name: "Nike Air Max 270", brand: "Nike", category: "Fashion", price: 12995, originalPrice: 15995, rating: 4.4, reviews: 8765, image: "👟", delivery: "₹40", tag: "Deal", discount: 19, inStock: true, prime: false, features: ["Max Air Unit", "Mesh Upper", "Multiple Colors"] },
{ id: 10, name: "Levi's Men's Jeans", brand: "Levi's", category: "Fashion", price: 2499, originalPrice: 3999, rating: 4.3, reviews: 23456, image: "👖", delivery: "Free", tag: "Popular", discount: 38, inStock: true, prime: true, features: ["Regular Fit", "Cotton", "Classic Design"] },
{ id: 11, name: "Adidas Running Shoes", brand: "Adidas", category: "Fashion", price: 4999, originalPrice: 7999, rating: 4.5, reviews: 18934, image: "👟", delivery: "Free", tag: "Bestseller", discount: 38, inStock: true, prime: true, features: ["Lightweight", "Breathable", "Comfortable"] },
{ id: 12, name: "Puma Men's T-Shirt", brand: "Puma", category: "Fashion", price: 799, originalPrice: 1299, rating: 4.2, reviews: 34567, image: "👕", delivery: "Free", tag: "Popular", discount: 38, inStock: true, prime: true, features: ["Cotton", "Regular Fit", "Multiple Colors"] },
{ id: 13, name: "Ray-Ban Aviator Sunglasses", brand: "Ray-Ban", category: "Fashion", price: 8999, originalPrice: 12990, rating: 4.6, reviews: 9876, image: "🕶️", delivery: "Free", tag: "Premium", discount: 31, inStock: true, prime: true, features: ["UV Protection", "Metal Frame", "Classic Style"] },
{ id: 14, name: "Fossil Men's Watch", brand: "Fossil", category: "Fashion", price: 7995, originalPrice: 12995, rating: 4.4, reviews: 6543, image: "⌚", delivery: "Free", tag: "Deal", discount: 38, inStock: true, prime: true, features: ["Analog", "Leather Strap", "Water Resistant"] },
{ id: 15, name: "Philips Air Fryer", brand: "Philips", category: "Home & Kitchen", price: 9999, originalPrice: 14995, rating: 4.5, reviews: 28934, image: "🍳", delivery: "Free", tag: "Bestseller", discount: 33, inStock: true, prime: true, features: ["1400W", "4.1L Capacity", "Oil-Free Cooking"] },
{ id: 16, name: "Prestige Induction Cooktop", brand: "Prestige", category: "Home & Kitchen", price: 2499, originalPrice: 3995, rating: 4.3, reviews: 45678, image: "🔥", delivery: "Free", tag: "Popular", discount: 37, inStock: true, prime: true, features: ["2000W", "Auto Shutoff", "Touch Panel"] },
{ id: 17, name: "Milton Water Bottle Set", brand: "Milton", category: "Home & Kitchen", price: 699, originalPrice: 1299, rating: 4.4, reviews: 67890, image: "🍶", delivery: "Free", tag: "Deal", discount: 46, inStock: true, prime: true, features: ["1L Capacity", "BPA Free", "Set of 3"] },
{ id: 18, name: "Pigeon Mixer Grinder", brand: "Pigeon", category: "Home & Kitchen", price: 3499, originalPrice: 5999, rating: 4.2, reviews: 34567, image: "🔌", delivery: "Free", tag: "Popular", discount: 42, inStock: true, prime: true, features: ["750W", "3 Jars", "Stainless Steel"] },
{ id: 19, name: "Amazon Basics Bedsheet Set", brand: "Amazon Basics", category: "Home & Kitchen", price: 1299, originalPrice: 2499, rating: 4.3, reviews: 89012, image: "🛏️", delivery: "Free", tag: "Bestseller", discount: 48, inStock: true, prime: true, features: ["Cotton", "King Size", "Multiple Colors"] },
{ id: 20, name: "Wipro LED Bulb Pack", brand: "Wipro", category: "Home & Kitchen", price: 399, originalPrice: 799, rating: 4.4, reviews: 123456, image: "💡", delivery: "Free", tag: "Deal", discount: 50, inStock: true, prime: true, features: ["9W", "Pack of 4", "Energy Saving"] },
{ id: 21, name: "Hawkins Pressure Cooker", brand: "Hawkins", category: "Home & Kitchen", price: 2199, originalPrice: 3500, rating: 4.6, reviews: 56789, image: "🍲", delivery: "Free", tag: "Top Rated", discount: 37, inStock: true, prime: true, features: ["5L Capacity", "Aluminum", "ISI Certified"] },
{ id: 22, name: "Cello Water Jug", brand: "Cello", category: "Home & Kitchen", price: 449, originalPrice: 799, rating: 4.2, reviews: 34567, image: "💧", delivery: "Free", tag: "Popular", discount: 44, inStock: true, prime: true, features: ["2L Capacity", "Plastic", "Durable"] },
{ id: 23, name: "Atomic Habits by James Clear", brand: "Penguin", category: "Books", price: 399, originalPrice: 599, rating: 4.8, reviews: 145678, image: "📖", delivery: "Free", tag: "Bestseller", discount: 33, inStock: true, prime: true, features: ["Self-Help", "Paperback", "English"] },
{ id: 24, name: "Rich Dad Poor Dad", brand: "Plata Publishing", category: "Books", price: 349, originalPrice: 499, rating: 4.7, reviews: 234567, image: "📚", delivery: "Free", tag: "Top Rated", discount: 30, inStock: true, prime: true, features: ["Finance", "Bestseller", "Paperback"] },
{ id: 25, name: "The Psychology of Money", brand: "Jaico", category: "Books", price: 299, originalPrice: 499, rating: 4.8, reviews: 98765, image: "📕", delivery: "Free", tag: "Trending", discount: 40, inStock: true, prime: true, features: ["Finance", "Self-Help", "Paperback"] },
{ id: 26, name: "Ikigai: Japanese Secret", brand: "Penguin", category: "Books", price: 299, originalPrice: 399, rating: 4.6, reviews: 87654, image: "📗", delivery: "Free", tag: "Popular", discount: 25, inStock: true, prime: true, features: ["Self-Help", "Wellness", "Paperback"] },
{ id: 27, name: "Think Like a Monk", brand: "Simon & Schuster", category: "Books", price: 349, originalPrice: 499, rating: 4.5, reviews: 76543, image: "📘", delivery: "Free", tag: "Deal", discount: 30, inStock: true, prime: true, features: ["Self-Help", "Motivation", "Paperback"] },
{ id: 28, name: "Harry Potter Box Set", brand: "Bloomsbury", category: "Books", price: 3499, originalPrice: 5999, rating: 4.9, reviews: 234567, image: "📚", delivery: "Free", tag: "Bestseller", discount: 42, inStock: true, prime: true, features: ["Complete Series", "Paperback", "7 Books"] },
{ id: 29, name: "Nivia Storm Football", brand: "Nivia", category: "Sports", price: 599, originalPrice: 999, rating: 4.3, reviews: 23456, image: "⚽", delivery: "Free", tag: "Popular", discount: 40, inStock: true, prime: true, features: ["Size 5", "Rubber", "Hand Stitched"] },
{ id: 30, name: "Cosco Cricket Bat", brand: "Cosco", category: "Sports", price: 1499, originalPrice: 2499, rating: 4.2, reviews: 12345, image: "🏏", delivery: "Free", tag: "Deal", discount: 40, inStock: true, prime: true, features: ["Kashmir Willow", "Full Size", "Professional"] },
{ id: 31, name: "Yonex Badminton Racket", brand: "Yonex", category: "Sports", price: 3999, originalPrice: 5999, rating: 4.6, reviews: 8765, image: "🏸", delivery: "Free", tag: "Top Rated", discount: 33, inStock: true, prime: true, features: ["Graphite", "Strung", "Professional"] },
{ id: 32, name: "Boldfit Gym Shaker Bottle", brand: "Boldfit", category: "Sports", price: 299, originalPrice: 599, rating: 4.4, reviews: 67890, image: "🥤", delivery: "Free", tag: "Bestseller", discount: 50, inStock: true, prime: true, features: ["700ml", "BPA Free", "Leak Proof"] },
{ id: 33, name: "Strauss Yoga Mat", brand: "Strauss", category: "Sports", price: 799, originalPrice: 1499, rating: 4.3, reviews: 45678, image: "🧘", delivery: "Free", tag: "Popular", discount: 47, inStock: true, prime: true, features: ["6mm Thick", "Anti-Slip", "With Bag"] },
{ id: 34, name: "Fitness Resistance Bands Set", brand: "Boldfit", category: "Sports", price: 499, originalPrice: 999, rating: 4.5, reviews: 34567, image: "💪", delivery: "Free", tag: "Deal", discount: 50, inStock: true, prime: true, features: ["Set of 5", "Latex", "Multiple Resistance"] },
{ id: 35, name: "Nivia Dominator Basketball", brand: "Nivia", category: "Sports", price: 899, originalPrice: 1499, rating: 4.4, reviews: 15678, image: "🏀", delivery: "Free", tag: "Popular", discount: 40, inStock: true, prime: true, features: ["Size 7", "Rubber", "Indoor/Outdoor"] },
{ id: 36, name: "Adidas Gym Bag", brand: "Adidas", category: "Sports", price: 1299, originalPrice: 2199, rating: 4.3, reviews: 23456, image: "🎒", delivery: "Free", tag: "Deal", discount: 41, inStock: true, prime: true, features: ["Large Capacity", "Multiple Pockets", "Durable"] },
{ id: 37, name: "Lakme Foundation", brand: "Lakme", category: "Beauty", price: 399, originalPrice: 599, rating: 4.2, reviews: 45678, image: "💄", delivery: "Free", tag: "Popular", discount: 33, inStock: true, prime: true, features: ["All Skin Types", "Natural Finish", "SPF 25"] },
{ id: 38, name: "Maybelline Mascara", brand: "Maybelline", category: "Beauty", price: 499, originalPrice: 799, rating: 4.4, reviews: 67890, image: "💅", delivery: "Free", tag: "Bestseller", discount: 38, inStock: true, prime: true, features: ["Waterproof", "Long Lasting", "Volume Boost"] },
{ id: 39, name: "The Body Shop Body Butter", brand: "The Body Shop", category: "Beauty", price: 1295, originalPrice: 1795, rating: 4.6, reviews: 23456, image: "🧴", delivery: "Free", tag: "Premium", discount: 28, inStock: true, prime: true, features: ["200ml", "Moisturizing", "Multiple Fragrances"] },
{ id: 40, name: "Nivea Soft Cream", brand: "Nivea", category: "Beauty", price: 199, originalPrice: 299, rating: 4.5, reviews: 123456, image: "🧴", delivery: "Free", tag: "Bestseller", discount: 33, inStock: true, prime: true, features: ["50ml", "All Skin Types", "Non-Greasy"] },
];


function App() {
  const [view, setView] = useState('home');
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCategories, setShowCategories] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sortBy, setSortBy] = useState('relevance');
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [primeOnly, setPrimeOnly] = useState(false);
  const [pincode, ] = useState('560001');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [toast, setToast] = useState(null);
  const [page, setPage] = useState(1);
  const pageSize = 12;
  const [products, setProducts] = useState(DUMMY_PRODUCTS);
  const searchInputRef = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
const [currentUser, setCurrentUser] = useState(null);
    const [currentOrder, setCurrentOrder] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
const [showAdminLogin, setShowAdminLogin] = useState(false);
const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
const [searchHistory, setSearchHistory] = useState([]);
const [searchSuggestions, setSearchSuggestions] = useState([]);

  useEffect(() => {
  const savedCart = localStorage.getItem('cart');
  const savedWishlist = localStorage.getItem('wishlist');
  const savedUser = localStorage.getItem('currentUser');
  const adminStatus = localStorage.getItem('isAdmin');
  
  if (savedCart) setCart(JSON.parse(savedCart));
  if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
  
  if (savedUser) {
    setCurrentUser(JSON.parse(savedUser));
    setIsLoggedIn(true);
  }
  
  if (adminStatus === 'true') {
    setIsAdmin(true);
  }
  
  // ADD THESE 3 LINES:
  const savedSearchHistory = localStorage.getItem('searchHistory');
  if (savedSearchHistory) {
    setSearchHistory(JSON.parse(savedSearchHistory));
  }
}, []);
// Close search suggestions when clicking outside
// Close search when clicking outside
// Close search suggestions when clicking outside
useEffect(() => {
  if (!showSearchSuggestions) return;
  
  const handleClick = (e) => {
    const input = searchInputRef.current;
    const suggestions = document.querySelector('.search-suggestions');
    
    if (input && !input.contains(e.target) && suggestions && !suggestions.contains(e.target)) {
      setShowSearchSuggestions(false);
    }
  };
  
  setTimeout(() => {
    document.addEventListener('click', handleClick);
  }, 0);
  
  return () => document.removeEventListener('click', handleClick);
}, [showSearchSuggestions]);
// Generate search suggestions based on query
useEffect(() => {
  if (searchQuery.length > 0) {
    const query = searchQuery.toLowerCase();
    
    // Filter products by name and brand
    const matches = products.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.brand.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query)
    ).slice(0, 8); // Show max 8 suggestions
    
    setSearchSuggestions(matches);
    setShowSearchSuggestions(true);
  } else {
    setSearchSuggestions([]);
    setShowSearchSuggestions(false);
  }
}, [searchQuery, products]);
  useEffect(() => {
  // Try to load products from backend

  
  fetch('http://localhost:8081/api/products')
    .then(res => {
      if (!res.ok) throw new Error('Backend not available');
      return res.json();
    })
    .then(data => {
      console.log('✅ Loaded products from backend:', data.length);
      setProducts(data);
      
    })
    .catch(() => {
  console.log('⚠️ Backend not running, using dummy data');
  setProducts(DUMMY_PRODUCTS);
  
});
}, []);
  const notify = (text, type = 'success') => {
    setToast({ text, type });
    setTimeout(() => setToast(null), 2000);
  };

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.id === product.id ? {...item, quantity: item.quantity + 1} : item));
      notify('Quantity updated in cart!');
    } else {
      setCart([...cart, {...product, quantity: 1}]);
      notify('Added to cart!');
    }
  };

  const toggleWishlist = (product) => {
    if (wishlist.find(item => item.id === product.id)) {
      setWishlist(wishlist.filter(item => item.id !== product.id));
      notify('Removed from wishlist', 'info');
    } else {
      setWishlist([...wishlist, product]);
      notify('Added to wishlist!');
    }
  };

  const handleChat = (message) => {
    setChatMessages([...chatMessages, { type: 'user', text: message }]);
    setTimeout(() => {
      const lowerMsg = message.toLowerCase();
      let response = "👋 Hi! I'm your AI shopping assistant. Ask me about products, deals, delivery, or returns!";
      if (lowerMsg.includes('recommend')) response = "🎯 Based on trending items, I recommend the iPhone 15 Pro Max and Sony WH-1000XM5. Both have 4.6+ ratings!";
      else if (lowerMsg.includes('delivery')) response = "🚚 FREE delivery on Prime items! Standard delivery: 2-3 days, Express: 1 day.";
      else if (lowerMsg.includes('return')) response = "🔄 Easy 7-day return policy. No questions asked!";
      else if (lowerMsg.includes('deal')) response = "🎉 Flash Sale: Up to 50% off on Electronics! Extra 10% with HDFC cards!";
      setChatMessages(prev => [...prev, { type: 'bot', text: response }]);
    }, 500);
    setUserInput('');
  };

  const getFilteredProducts = () => {
    let filtered = products;
    if (selectedCategory !== 'all') filtered = filtered.filter(p => p.category === selectedCategory);
    if (searchQuery) filtered = filtered.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.brand.toLowerCase().includes(searchQuery.toLowerCase()));
    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (selectedBrands.length) filtered = filtered.filter(p => selectedBrands.includes(p.brand));
    if (minRating) filtered = filtered.filter(p => p.rating >= minRating);
    if (primeOnly) filtered = filtered.filter(p => p.prime);
    
    switch(sortBy) {
      case 'price-low': return filtered.sort((a, b) => a.price - b.price);
      case 'price-high': return filtered.sort((a, b) => b.price - a.price);
      case 'rating': return filtered.sort((a, b) => b.rating - a.rating);
      case 'discount': return filtered.sort((a, b) => b.discount - a.discount);
      case 'popular': return filtered.sort((a, b) => b.reviews - a.reviews);
      default: return filtered;
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const Header = () => (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-2 px-4">
        <div className="container mx-auto flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>Deliver to <span className="font-bold">{pincode}</span></span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <button className="flex items-center gap-1 hover:underline">
              <Bell size={16} />
              Notifications
            </button>
            <button className="flex items-center gap-1 hover:underline">
              <Gift size={16} />
              Gift Cards
            </button>
            <button className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full font-bold hover:bg-white/30 transition">
              <Sparkles size={16} />
              Prime
            </button>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center gap-6">
          <div className="text-2xl font-black cursor-pointer flex items-center gap-2 group" onClick={() => setView('home')}>
            <span className="text-4xl group-hover:scale-110 transition-transform">🛒</span>
            <div>
              <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-lg shadow-lg">AI</span>
              <span className="ml-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Commerce</span>
            </div>
          </div>
          
   <div className="relative flex-1 max-w-2xl">
  <div className="flex shadow-lg rounded-lg overflow-hidden">
    <button className="bg-gray-100 px-4 py-3 border-r border-gray-300 flex items-center gap-1 hover:bg-gray-200 transition">
      <span className="hidden md:inline">All</span>
      <ChevronDown size={16} />
    </button>
    <input
  type="text"
  placeholder="🔍 Search for products, brands and more..."
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  className="flex-1 px-4 py-3 focus:outline-none"
  autoComplete="off"
/>

    {searchQuery && (
      <button 
        onClick={() => {
          setSearchQuery('');
          setShowSearchSuggestions(false);
          
        }}
        className="px-3 hover:bg-gray-100 transition"
      >
        <X size={20} className="text-gray-500" />
      </button>
    )}
    <button 
      onClick={() => {
        if (searchQuery) {
          const newHistory = [searchQuery, ...searchHistory.filter(h => h !== searchQuery)].slice(0, 10);
          setSearchHistory(newHistory);
          localStorage.setItem('searchHistory', JSON.stringify(newHistory));
          setView('products');
          setShowSearchSuggestions(false);
        }
      }}
      className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 hover:from-orange-600 hover:to-orange-700 transition"
    >
      <Search size={22} className="text-white" />
    </button>
  </div>
  
 
  {showSearchSuggestions && (
    <div className="relative z-50">
      <SearchSuggestions 
        suggestions={searchSuggestions}
        searchQuery={searchQuery}
        searchHistory={searchHistory}
        onSelectProduct={(product) => {
          setSelectedProduct(product);
          setShowSearchSuggestions(false);
          setSearchQuery('');
          const newHistory = [product.name, ...searchHistory.filter(h => h !== product.name)].slice(0, 10);
          setSearchHistory(newHistory);
          localStorage.setItem('searchHistory', JSON.stringify(newHistory));
        }}
        onSelectHistory={(term) => {
          setSearchQuery(term);
          setView('products');
          setShowSearchSuggestions(false);
        }}
        onClearHistory={() => {
          setSearchHistory([]);
          localStorage.removeItem('searchHistory');
          
        }}
      />
    </div>
  )}
</div>
          
          <div className="flex items-center gap-4">
            <button 
  onClick={() => isLoggedIn ? setView('profile') : setView('login')}
  className="hidden md:flex flex-col items-center hover:text-orange-600 transition"
>
  <User size={24} />
  <span className="text-xs font-semibold">
    {isLoggedIn ? currentUser.name.split(' ')[0] : 'Login'}
  </span>
</button>
<button 
  onClick={() => isAdmin ? setView('admin') : setShowAdminLogin(true)}
  className="hidden md:flex flex-col items-center hover:text-purple-600 transition"
>
  <Shield size={24} />
  <span className="text-xs font-semibold">
    {isAdmin ? 'Admin' : 'Admin'}cclear
  </span>
</button>
            
          <button onClick={() => setView('wishlist')} className="relative flex flex-col items-center hover:text-red-600 transition group">
  <Heart size={24} className="group-hover:fill-red-600" />
  <span className="text-xs font-semibold">Wishlist</span>
  {wishlist.length > 0 && (
    <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold animate-pulse shadow-lg">
      {wishlist.length}
    </span>
  )}
</button>
<button onClick={() => setView('orders')} className="relative flex flex-col items-center hover:text-blue-600 transition group">
  <ShoppingCart size={24} />
  <span className="text-xs font-semibold">Orders</span>
</button>
            <button onClick={() => setView('cart')} className="relative flex flex-col items-center hover:text-green-600 transition group">
              <ShoppingCart size={24} className="group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold animate-bounce shadow-lg">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-200 bg-gradient-to-r from-gray-50 to-white">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center gap-6 text-sm overflow-x-auto">
            <button 
              onClick={() => setShowCategories(!showCategories)}
              className="flex items-center gap-2 font-bold hover:text-orange-600 transition whitespace-nowrap"
            >
              <Menu size={18} />
              All Categories
            </button>
            {categories &&categories.map(cat => (
              <button 
                key={cat.name}
                onClick={() => { setSelectedCategory(cat.name); setView('products'); }}
                className="flex items-center gap-2 hover:text-orange-600 font-semibold transition whitespace-nowrap"
              >
                <span className="text-lg">{cat.icon}</span>
                {cat.name}
              </button>
            ))}
            <button className="flex items-center gap-1 text-orange-600 font-bold hover:text-orange-700 transition whitespace-nowrap">
              <BadgePercent size={18} />
              Today's Deals
            </button>
          </div>
        </div>
      </div>
    </header>
  );

  const ProductCard = ({ product }) => {
    const isInWishlist = wishlist.some(item => item.id === product.id);
    const isInCart = cart.some(item => item.id === product.id);
    const cat = categories.find(c => c.name === product.category);
    
    return (
      <div className="bg-white rounded-2xl border border-gray-200 hover:shadow-2xl transition-all duration-300 p-4 relative group overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${cat?.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
        
        <button
          onClick={() => toggleWishlist(product)}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:scale-125 transition-transform z-10 group/heart"
        >
          <Heart size={18} className={`${isInWishlist ? 'fill-red-500 text-red-500' : 'text-gray-400'} group-hover/heart:text-red-500 transition-colors`} />
        </button>
        
        {product.tag && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white text-xs px-3 py-1.5 rounded-full font-bold shadow-lg animate-pulse">
            {product.tag}
          </div>
        )}
        
        <div className="text-8xl text-center py-8 cursor-pointer transform group-hover:scale-110 transition-transform duration-300" onClick={() => setSelectedProduct(product)}>
          {product.image}
        </div>
        
        <div className="space-y-2 relative z-10">
          <div className="text-sm text-gray-600 font-medium">{product.brand}</div>
          <h3 className="font-bold text-gray-800 line-clamp-2 cursor-pointer hover:text-blue-600 transition" onClick={() => setSelectedProduct(product)}>
            {product.name}
          </h3>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-gradient-to-r from-green-600 to-green-500 text-white px-2 py-1 rounded-lg text-sm font-bold shadow">
              {product.rating}
              <Star size={12} fill="white" />
            </div>
            <span className="text-sm text-gray-500">({product.reviews.toLocaleString()})</span>
          </div>
          
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-3xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">₹{product.price.toLocaleString()}</span>
            <span className="text-sm text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
            <span className="text-sm font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">{product.discount}% OFF</span>
          </div>
          
          {product.prime && (
            <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-cyan-50 px-3 py-1.5 rounded-lg border border-blue-200">
              <Sparkles size={14} className="text-blue-600" />
              <span className="text-blue-700 font-bold text-sm">Prime</span>
              <span className="text-gray-600 text-sm">FREE Delivery</span>
            </div>
          )}
          
          <div className="flex gap-2 pt-2">
            <button
              onClick={() => addToCart(product)}
              className={`flex-1 ${isInCart ? 'bg-gradient-to-r from-green-600 to-emerald-600' : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700'} text-white py-3 px-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105`}
            >
              {isInCart ? '✓ In Cart' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const HomePage = () => (
    <div>
      <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full mb-6 animate-bounce">
            <Zap size={20} className="text-yellow-300" />
            <span className="font-bold">MEGA SALE - UP TO 80% OFF!</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-black mb-6 drop-shadow-2xl">Big Billion Days!</h1>
          <p className="text-2xl mb-8 opacity-95 font-medium">Unbeatable Deals on Electronics, Fashion & More</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button onClick={() => setView('products')} className="bg-white text-purple-600 px-10 py-4 rounded-full font-black text-lg hover:shadow-2xl transition-all transform hover:scale-110 flex items-center gap-2">
              <ShoppingCart size={24} />
              Shop Now
            </button>
            <button onClick={() => setChatOpen(true)} className="bg-transparent border-3 border-white backdrop-blur-sm px-10 py-4 rounded-full font-black text-lg hover:bg-white hover:text-purple-600 transition-all transform hover:scale-110 flex items-center gap-2">
              <MessageCircle size={24} />
              AI Assistant
            </button>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { icon: <Truck size={48} />, title: "FREE Delivery", desc: "On all Prime orders", color: "from-blue-500 to-cyan-500" },
            { icon: <Shield size={48} />, title: "100% Secure", desc: "Safe payments guaranteed", color: "from-green-500 to-emerald-500" },
            { icon: <RotateCcw size={48} />, title: "Easy Returns", desc: "7-day return policy", color: "from-orange-500 to-amber-500" },
            { icon: <Award size={48} />, title: "Top Quality", desc: "Verified sellers only", color: "from-purple-500 to-pink-500" },
          ].map((feature, idx) => (
            <div key={idx} className={`bg-gradient-to-br ${feature.color} p-8 rounded-2xl text-white text-center hover:shadow-2xl transition-all transform hover:-translate-y-2 cursor-pointer`}>
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="font-black text-xl mb-2">{feature.title}</h3>
              <p className="text-sm opacity-90">{feature.desc}</p>
            </div>
          ))}
        </div>
        
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-4xl font-black bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-3">
              <TrendingUp size={36} className="text-orange-600" />
              Trending Now
            </h2>
            <button onClick={() => setView('products')} className="text-blue-600 font-bold flex items-center gap-2 hover:gap-4 transition-all">
              View All <ChevronRight size={20} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 8).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-3xl p-8 mb-12 border-2 border-orange-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-4xl font-black bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">🏠 Home & Kitchen</h2>
            <button onClick={() => { setSelectedCategory('Home & Kitchen'); setView('products'); }} className="text-orange-600 font-bold flex items-center gap-2 hover:gap-4 transition-all">
              Shop Category <ChevronRight size={20} />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {products.filter(p => p.category === 'Home & Kitchen').map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl p-8 mb-12 border-2 border-purple-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-4xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">📚 Bestselling Books</h2>
            <button onClick={() => { setSelectedCategory('Books'); setView('products'); }} className="text-purple-600 font-bold flex items-center gap-2 hover:gap-4 transition-all">
              Shop Books <ChevronRight size={20} />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {products.filter(p => p.category === 'Books').map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 mb-12 border-2 border-green-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-4xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">⚽ Sports & Fitness</h2>
            <button onClick={() => { setSelectedCategory('Sports'); setView('products'); }} className="text-green-600 font-bold flex items-center gap-2 hover:gap-4 transition-all">
              Shop Sports <ChevronRight size={20} />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.filter(p => p.category === 'Sports').slice(0, 8).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const ProductsPage = () => {
    const filtered = getFilteredProducts();
    const totalPages = Math.ceil(filtered.length / pageSize);
    const paged = filtered.slice((page - 1) * pageSize, page * pageSize);
    const brands = [...new Set(products.map(p => p.brand))].sort();
    
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-xl shadow">
            <div className="text-sm text-gray-600">
              Showing <span className="font-bold text-gray-900">{filtered.length}</span> results
              {selectedCategory !== 'all' && <span className="ml-1">in <span className="font-bold text-orange-600">{selectedCategory}</span></span>}
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => setShowMobileFilters(true)} className="md:hidden flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-lg font-semibold">
                <Filter size={18} />
                Filters
              </button>
              <div className="hidden md:flex items-center gap-2">
                <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-orange-500 text-white' : 'bg-white'} border`}>
                  <Grid size={18} />
                </button>
                <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-orange-500 text-white' : 'bg-white'} border`}>
                  <List size={18} />
                </button>
              </div>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border-2 border-gray-200 rounded-lg px-4 py-2 font-semibold focus:border-orange-500 focus:outline-none">
                <option value="relevance">Relevance</option>
                <option value="popular">Popularity</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
                <option value="discount">Discount</option>
              </select>
            </div>
          </div>
          
          <div className="flex gap-6">
            <aside className="hidden md:block w-72 bg-white rounded-xl shadow-lg p-6 h-fit sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-black text-xl flex items-center gap-2">
                  <SlidersHorizontal size={20} />
                  Filters
                </h3>
                <button onClick={() => {
                  setSelectedCategory('all');
                  setSelectedBrands([]);
                  setPriceRange([0, 200000]);
                  setMinRating(0);
                  setPrimeOnly(false);
                }} className="text-sm text-orange-600 font-bold hover:underline">Clear All</button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold mb-3 text-gray-800">Category</h4>
                  <div className="space-y-2">
                    {['all', ...categories.map(c => c.name)].map(cat => (
                      <label key={cat} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded transition">
                        <input type="radio" name="category" checked={selectedCategory === cat} onChange={() => setSelectedCategory(cat)} className="w-4 h-4" />
                        <span className="text-sm">{cat === 'all' ? '✨ All Products' : categories.find(c => c.name === cat)?.icon + ' ' + cat}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h4 className="font-bold mb-3 text-gray-800">Price Range</h4>
                  <div className="flex gap-2 mb-3">
                    <input type="number" value={priceRange[0]} onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])} className="w-full border rounded px-2 py-1 text-sm" placeholder="Min" />
                    <span>-</span>
                    <input type="number" value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])} className="w-full border rounded px-2 py-1 text-sm" placeholder="Max" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[999, 4999, 9999, 49999].map(price => (
                      <button key={price} onClick={() => setPriceRange([0, price])} className="text-xs bg-gray-100 hover:bg-orange-500 hover:text-white px-3 py-1 rounded-full transition">
                        Under ₹{(price/1000).toFixed(0)}k
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h4 className="font-bold mb-3 text-gray-800">Brand</h4>
                  <div className="max-h-48 overflow-y-auto space-y-2">
                    {brands.map(brand => (
                      <label key={brand} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded transition">
                        <input type="checkbox" checked={selectedBrands.includes(brand)} onChange={(e) => {
                          if (e.target.checked) setSelectedBrands([...selectedBrands, brand]);
                          else setSelectedBrands(selectedBrands.filter(b => b !== brand));
                        }} className="w-4 h-4" />
                        <span className="text-sm">{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h4 className="font-bold mb-3 text-gray-800">Rating</h4>
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map(rating => (
                      <button key={rating} onClick={() => setMinRating(minRating === rating ? 0 : rating)} className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 transition ${minRating === rating ? 'bg-green-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>
                        <Star size={16} fill={minRating === rating ? 'white' : 'orange'} className={minRating === rating ? 'text-white' : 'text-orange-500'} />
                        <span className="text-sm font-semibold">{rating}★ & above</span>
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <label className="flex items-center gap-3 cursor-pointer bg-gradient-to-r from-blue-50 to-cyan-50 p-3 rounded-lg border-2 border-blue-200 hover:border-blue-400 transition">
                    <input type="checkbox" checked={primeOnly} onChange={(e) => setPrimeOnly(e.target.checked)} className="w-5 h-5" />
                    <div className="flex items-center gap-2">
                      <Sparkles size={18} className="text-blue-600" />
                      <span className="font-bold text-blue-700">Prime Only</span>
                    </div>
                  </label>
                </div>
              </div>
            </aside>
            
            <main className="flex-1">
              {paged.length === 0 ? (
                <div className="bg-white rounded-2xl p-16 text-center shadow-lg">
                  <Search size={80} className="mx-auto text-gray-300 mb-6" />
                  <h3 className="text-3xl font-black text-gray-600 mb-3">No products found</h3>
                  <p className="text-gray-500 mb-6">Try adjusting your filters or search query</p>
                  <button onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setSelectedBrands([]);
                    setPriceRange([0, 200000]);
                    setMinRating(0);
                  }} className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-full font-bold hover:shadow-lg transition">
                    Reset Filters
                  </button>
                </div>
              ) : (
                <>
                  <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
                    {paged.map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                  
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-3 mt-8">
                      <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-6 py-3 border-2 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition">
                        Previous
                      </button>
                      <div className="flex items-center gap-2">
                        {[...Array(totalPages)].map((_, i) => (
                          <button key={i} onClick={() => setPage(i + 1)} className={`w-10 h-10 rounded-xl font-bold transition ${page === i + 1 ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg' : 'bg-white hover:bg-gray-50'}`}>
                            {i + 1}
                          </button>
                        ))}
                      </div>
                      <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-6 py-3 border-2 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition">
                        Next
                      </button>
                    </div>
                  )}
                </>
              )}
            </main>
          </div>
        </div>
      </div>
    );
  };

  const CartPage = () => (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {cart.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center shadow-2xl max-w-2xl mx-auto">
            <div className="text-9xl mb-6">🛒</div>
            <h2 className="text-4xl font-black text-gray-800 mb-4">Your Cart is Empty</h2>
            <p className="text-gray-600 mb-8 text-lg">Looks like you haven't added anything to your cart yet</p>
            <button onClick={() => setView('products')} className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-10 py-4 rounded-full font-black text-lg hover:shadow-2xl transition-all transform hover:scale-110">
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-black mb-4 flex items-center gap-3">
                  <ShoppingCart size={28} />
                  Shopping Cart ({cartCount} items)
                </h2>
                <div className="divide-y">
                  {cart.map(item => (
                    <div key={item.id} className="py-6 flex gap-6">
                      <div className="text-7xl cursor-pointer" onClick={() => setSelectedProduct(item)}>{item.image}</div>
                      <div className="flex-1">
                        <div className="text-sm text-gray-600 font-medium">{item.brand}</div>
                        <h3 className="font-bold text-xl mb-2">{item.name}</h3>
                        <div className="flex items-baseline gap-3 mb-4">
                          <span className="text-3xl font-black">₹{item.price.toLocaleString()}</span>
                          <span className="text-gray-400 line-through">₹{item.originalPrice.toLocaleString()}</span>
                          <span className="text-green-600 font-bold">{item.discount}% off</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden">
                            <button onClick={() => setCart(cart.map(i => i.id === item.id ? {...i, quantity: Math.max(1, i.quantity - 1)} : i))} className="px-4 py-2 hover:bg-gray-100 font-bold text-xl">-</button>
                            <span className="px-6 py-2 font-bold text-lg border-x-2">{item.quantity}</span>
                            <button onClick={() => setCart(cart.map(i => i.id === item.id ? {...i, quantity: i.quantity + 1} : i))} className="px-4 py-2 hover:bg-gray-100 font-bold text-xl">+</button>
                          </div>
                          <button onClick={() => setCart(cart.filter(i => i.id !== item.id))} className="text-red-500 hover:text-red-700 font-bold flex items-center gap-2">
                            <X size={18} />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-2xl p-8 sticky top-24 border-2 border-green-200">
                <h3 className="text-2xl font-black mb-6 flex items-center gap-2">
                  <CreditCard size={24} />
                  Order Summary
                </h3>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-700">Subtotal ({cartCount} items)</span>
                    <span className="font-bold">₹{cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-700">Discount</span>
                    <span className="font-bold text-green-600">-₹{(cartTotal * 0.05).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-700">Delivery</span>
                    <span className="font-bold text-green-600">FREE</span>
                  </div>
                  <div className="border-t-2 border-green-300 pt-4">
                    <div className="flex justify-between text-2xl">
                      <span className="font-black">Total</span>
                      <span className="font-black text-green-700">₹{(cartTotal * 0.95).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <button 
  onClick={() => setView('checkout')}
  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-black text-lg hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center gap-2"
>
  <CheckCircle size={24} />
  PROCEED TO CHECKOUT
</button>
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3 bg-white p-3 rounded-lg">
                    <Shield size={20} className="text-green-600" />
                    <span className="text-sm font-semibold">100% Secure Payments</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white p-3 rounded-lg">
                    <Truck size={20} className="text-blue-600" />
                    <span className="text-sm font-semibold">FREE Delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const WishlistPage = () => (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-4xl font-black mb-8 flex items-center gap-3">
        <Heart size={36} className="text-red-500" />
        My Wishlist ({wishlist.length})
      </h2>
      {wishlist.length === 0 ? (
        <div className="bg-white rounded-3xl p-16 text-center shadow-2xl max-w-2xl mx-auto">
          <div className="text-9xl mb-6">💝</div>
          <h3 className="text-4xl font-black text-gray-800 mb-4">Your Wishlist is Empty</h3>
          <p className="text-gray-600 mb-8 text-lg">Save your favorite items here!</p>
          <button onClick={() => setView('products')} className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-10 py-4 rounded-full font-black text-lg hover:shadow-2xl transition-all transform hover:scale-110">
            Explore Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
<main>
  {view === 'home' && <HomePage />}
  {view === 'products' && <ProductsPage />}
  {view === 'cart' && <CartPage />}
  {view === 'wishlist' && <WishlistPage />}
  
  {/* ✅ LOGIN - Fixed with props */}
  {view === 'login' && (
    <LoginPage 
      onLogin={(user) => {
        setIsLoggedIn(true);
        setCurrentUser(user);
        setView('home');
      }} 
      onClose={() => setView('home')}
    />
  )}
  
  {/* ✅ PROFILE - Keep only this one */}
  {view === 'profile' && isLoggedIn && (
    <ProfilePage 
      user={currentUser} 
      setView={setView}
      onLogout={() => {
        setIsLoggedIn(false);
        setCurrentUser(null);
        localStorage.removeItem('currentUser');
        setView('home');
      }} 
    />
  )}
  
  {/* CHECKOUT */}
  {view === 'checkout' && (
    <CheckoutPage 
      cart={cart} 
      cartTotal={cartTotal} 
      onOrderComplete={(order) => {
        setCurrentOrder(order);
        setCart([]);
        setView('order-success');
      }} 
    />
  )}
  
  {/* ORDER SUCCESS */}
  {view === 'order-success' && currentOrder && (
    <OrderSuccessPage 
      order={currentOrder} 
      onContinue={() => setView('home')} 
    />
  )}
  
  {/* MY ORDERS */}
  {view === 'orders' && <MyOrdersPage />}
  
  {/* ADMIN DASHBOARD */}
  {view === 'admin' && isAdmin && <AdminDashboard 
  products={products} 
  setProducts={setProducts}
  categories={categories}
  onLogout={() => {
    setIsAdmin(false);
    localStorage.removeItem('isAdmin');
    setView('home');
  }} 
/>}
  
  {/* ADMIN LOGIN MODAL */}
  {showAdminLogin && (
    <AdminLogin 
      onLogin={() => setIsAdmin(true)} 
      onClose={() => setShowAdminLogin(false)} 
    />
  )}
</main>
      {/* Categories overlay */}
      {showCategories && (
        <div className="fixed inset-0 z-50" onClick={() => setShowCategories(false)}>
          <div className="absolute inset-0 bg-black/40"></div>
          <div
            className="absolute left-1/2 -translate-x-1/2 top-24 w-[95%] max-w-5xl bg-white rounded-2xl shadow-2xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-black flex items-center gap-2">
                <Menu size={20} />
                All Categories
              </h3>
              <button className="p-2 rounded-full hover:bg-gray-100" onClick={() => setShowCategories(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories &&categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => {
                    setSelectedCategory(cat.name);
                    setView('products');
                    setShowCategories(false);
                    setPage(1);
                  }}
                  className={`group border rounded-xl p-4 hover:shadow-lg transition bg-gradient-to-br ${cat.color} text-white`}
                >
                  <div className="text-4xl mb-2">{cat.icon}</div>
                  <div className="font-bold">{cat.name}</div>
                  <div className="text-xs opacity-90 mt-1">{cat.subcats.length} subcategories</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Product quick view modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50" onClick={() => setSelectedProduct(null)}>
          <div className="absolute inset-0 bg-black/50"></div>
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-xl font-black">{selectedProduct.name}</h3>
              <button onClick={() => setSelectedProduct(null)} className="p-2 rounded-full hover:bg-gray-100">
                <X size={20} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              <div className="flex items-center justify-center p-8 text-[8rem]">{selectedProduct.image}</div>
              <div className="p-6 space-y-4">
                <div className="text-sm text-gray-600 font-medium">{selectedProduct.brand}</div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-green-600 text-white px-2 py-1 rounded-lg text-sm font-bold">
                    {selectedProduct.rating} <Star size={12} fill="white" />
                  </div>
                  <span className="text-sm text-gray-500">({selectedProduct.reviews.toLocaleString()} reviews)</span>
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-black">₹{selectedProduct.price.toLocaleString()}</span>
                  <span className="text-gray-400 line-through">₹{selectedProduct.originalPrice.toLocaleString()}</span>
                  <span className="text-green-600 font-bold">{selectedProduct.discount}% off</span>
                </div>
                {selectedProduct.prime && (
                  <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200 w-fit">
                    <Sparkles size={14} className="text-blue-600" />
                    <span className="text-blue-700 font-bold text-sm">Prime</span>
                    <span className="text-gray-600 text-sm">FREE Delivery</span>
                  </div>
                )}
                <div>
                  <h4 className="font-bold mb-2">Key features</h4>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                   {selectedProduct.features?.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => {
                      addToCart(selectedProduct);
                    }}
                    className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => toggleWishlist(selectedProduct)}
                    className="px-4 py-3 rounded-xl font-bold border-2 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Heart
                      size={18}
                      className={wishlist.some((w) => w.id === selectedProduct.id) ? 'text-red-500 fill-red-500' : ''}
                    />
                    {wishlist.some((w) => w.id === selectedProduct.id) ? 'Wishlisted' : 'Wishlist'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Filters drawer */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 md:hidden" onClick={() => setShowMobileFilters(false)}>
          <div className="absolute inset-0 bg-black/40"></div>
          <div
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-black flex items-center gap-2">
                <SlidersHorizontal size={20} />
                Filters
              </h3>
              <button onClick={() => setShowMobileFilters(false)} className="p-2 rounded-full hover:bg-gray-100">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-6">
              <div>
                <h4 className="font-bold mb-3">Category</h4>
                <div className="grid grid-cols-2 gap-2">
                  {['all', ...categories.map((c) => c.name)].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-2 rounded-lg border ${
                        selectedCategory === cat ? 'border-orange-500 bg-orange-50 text-orange-700' : 'border-gray-200'
                      }`}
                    >
                      {cat === 'all' ? 'All' : cat}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-bold mb-3">Price range</h4>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value || 0), priceRange[1]])}
                    className="w-full border rounded px-2 py-2"
                    placeholder="Min"
                  />
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value || 0)])}
                    className="w-full border rounded px-2 py-2"
                    placeholder="Max"
                  />
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {[999, 4999, 9999, 49999].map((price) => (
                    <button
                      key={price}
                      onClick={() => setPriceRange([0, price])}
                      className="text-xs bg-gray-100 hover:bg-orange-500 hover:text-white px-3 py-1 rounded-full transition"
                    >
                      Under ₹{(price / 1000).toFixed(0)}k
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-bold mb-3">Brand</h4>
                <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                  {[...new Set(products.map((p) => p.brand))]
                    .sort()
                    .map((brand) => (
                      <label key={brand} className="flex items-center gap-2 text-sm border rounded px-2 py-2">
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand)}
                          onChange={(e) => {
                            if (e.target.checked) setSelectedBrands([...selectedBrands, brand]);
                            else setSelectedBrands(selectedBrands.filter((b) => b !== brand));
                          }}
                        />
                        {brand}
                      </label>
                    ))}
                </div>
              </div>
              <div>
                <h4 className="font-bold mb-3">Rating</h4>
                <div className="flex gap-2">
                  {[4, 3, 2, 1].map((r) => (
                    <button
                      key={r}
                      onClick={() => setMinRating(minRating === r ? 0 : r)}
                      className={`px-3 py-2 rounded-lg border flex items-center gap-1 ${
                        minRating === r ? 'border-green-600 bg-green-50 text-green-700' : 'border-gray-200'
                      }`}
                    >
                      <Star size={14} className="text-orange-500" fill="currentColor" />
                      {r}★ & up
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="flex items-center gap-3 p-3 border rounded-lg">
                  <input
                    type="checkbox"
                    className="w-5 h-5"
                    checked={primeOnly}
                    onChange={(e) => setPrimeOnly(e.target.checked)}
                  />
                  <div className="flex items-center gap-2">
                    <Sparkles size={18} className="text-blue-600" /> Prime only
                  </div>
                </label>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedBrands([]);
                    setPriceRange([0, 200000]);
                    setMinRating(0);
                    setPrimeOnly(false);
                  }}
                  className="flex-1 border-2 border-gray-300 rounded-xl py-3 font-bold"
                >
                  Clear all
                </button>
                <button
                  onClick={() => {
                    setShowMobileFilters(false);
                    setPage(1);
                  }}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl py-3 font-bold"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chat widget */}
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:scale-105 transition"
          aria-label="Open chat"
        >
          <MessageCircle size={24} />
        </button>
      )}
      {chatOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-80 md:w-96 h-[28rem] bg-white rounded-2xl shadow-2xl border overflow-hidden flex flex-col">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 flex items-center justify-between">
            <div className="font-black flex items-center gap-2">
              <Sparkles size={18} />
              AI Assistant
            </div>
            <button onClick={() => setChatOpen(false)} className="p-1 rounded hover:bg-white/20">
              <X size={18} />
            </button>
          </div>
          <div className="flex-1 p-3 overflow-y-auto space-y-2">
            {chatMessages.length === 0 && (
              <div className="text-sm text-gray-500 p-3 bg-gray-50 rounded-lg">
                Say hi or ask for recommendations, delivery, returns, or deals.
              </div>
            )}
            {chatMessages.map((m, idx) => (
              <div key={idx} className={`flex ${m.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`${
                    m.type === 'user' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-800'
                  } px-3 py-2 rounded-2xl max-w-[80%]`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t flex items-center gap-2">
            <input
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && userInput.trim()) handleChat(userInput.trim());
              }}
              placeholder="Type a message..."
              className="flex-1 border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={() => userInput.trim() && handleChat(userInput.trim())}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl px-3 py-2 font-bold flex items-center gap-1 disabled:opacity-50"
              disabled={!userInput.trim()}
            >
              <Send size={16} />
              Send
            </button>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
          <div
            className={`px-5 py-3 rounded-xl shadow-2xl font-semibold ${
              toast.type === 'success'
                ? 'bg-green-600 text-white'
                : toast.type === 'info'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-white'
            }`}
          >
            {toast.text}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-16 border-t bg-white">
        <div className="container mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
          <div>
            <div className="font-black text-lg mb-3">AI Commerce</div>
            <p className="text-gray-600">Smart shopping with AI recommendations and blazing fast UI.</p>
          </div>
          <div>
            <div className="font-bold mb-3">Categories</div>
            <div className="space-y-1">
              {categories.slice(0, 6).map((c) => (
                <button
                  key={c.name}
                  onClick={() => {
                    setSelectedCategory(c.name);
                    setView('products');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="block text-left text-gray-600 hover:text-gray-900"
                >
                  {c.icon} {c.name}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="font-bold mb-3">Help</div>
            <div className="space-y-1 text-gray-600">
              <div className="flex items-center gap-2">
                <Truck size={14} /> Shipping
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw size={14} /> Returns
              </div>
              <div className="flex items-center gap-2">
                <Shield size={14} /> Security
              </div>
            </div>
          </div>
          <div>
            <div className="font-bold mb-3">Contact</div>
            <div className="space-y-1 text-gray-600">
              <div className="flex items-center gap-2">
                <MapPin size={14} /> Deliver to {pincode}
              </div>
              <div className="flex items-center gap-2">
                <Bell size={14} /> Alerts
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 text-center text-xs text-gray-500 py-4">
          © {new Date().getFullYear()} AI Commerce — Built with ❤️
        </div>
      </footer>
    </div>
  );
}
const LoginPage = ({ onLogin, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSignup, setIsSignup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple mock login
    const user = {
      name: isSignup ? name : email.split('@')[0],
      email: email,
      joinDate: new Date().toLocaleDateString(),
      orders: 0,
      saved: 0
    };
    
    localStorage.setItem('currentUser', JSON.stringify(user));
    onLogin(user);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 m-4" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full">
          <X size={20} />
        </button>
        
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">👋</div>
          <h2 className="text-3xl font-black mb-2">{isSignup ? 'Create Account' : 'Welcome Back!'}</h2>
          <p className="text-gray-600">Shop smarter with AI Commerce</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
              required
            />
          )}
          
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
            required
          />
          
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
            required
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transition"
          >
            {isSignup ? 'Sign Up' : 'Login'}
          </button>
        </form>

        <div className="text-center mt-6">
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-orange-600 font-semibold hover:underline"
          >
            {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};
const ProfilePage = ({ user, setView, onLogout }) => {
  const [orders] = useState([
    { id: 1, date: '2024-01-15', items: 3, total: 45999, status: 'Delivered' },
    { id: 2, date: '2024-01-10', items: 1, total: 12999, status: 'Shipped' },
    { id: 3, date: '2024-01-05', items: 2, total: 8499, status: 'Processing' },
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 text-white mb-6">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-5xl">
              👤
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-black mb-2">{user.name}</h1>
              <p className="text-white/90">{user.email}</p>
              <p className="text-white/80 text-sm mt-1">Member since {user.joinDate}</p>
            </div>
            <button
              onClick={onLogout}
              className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-xl font-bold transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <button 
  onClick={() =>setView('orders')}
  className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-all transform hover:-translate-y-1"
>
  <div className="text-4xl mb-2">📦</div>
  <div className="text-3xl font-black text-orange-600">{orders.length}</div>
  <div className="text-gray-600 font-semibold">Total Orders</div>
</button>
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="text-4xl mb-2">💝</div>
            <div className="text-3xl font-black text-pink-600">0</div>
            <div className="text-gray-600 font-semibold">Wishlist Items</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="text-4xl mb-2">🎁</div>
            <div className="text-3xl font-black text-purple-600">₹500</div>
            <div className="text-gray-600 font-semibold">Rewards</div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-black mb-4 flex items-center gap-2">
            <ShoppingCart size={24} />
            Recent Orders
          </h2>
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.id} className="border-2 border-gray-100 rounded-xl p-4 hover:border-orange-200 transition">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="font-bold text-lg">Order #{order.id}</div>
                    <div className="text-sm text-gray-600">{order.date}</div>
                  </div>
                  <div className={`px-4 py-2 rounded-full font-bold text-sm ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                    order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                    'bg-orange-100 text-orange-700'
                  }`}>
                    {order.status}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-gray-600">{order.items} items</div>
                  <div className="text-xl font-black">₹{order.total.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
const CheckoutPage = ({ cart, cartTotal, onOrderComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    paymentMethod: 'card'
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    const order = {
      id: Date.now(),
      items: cart,
      total: cartTotal * 0.95,
      date: new Date().toLocaleDateString(),
      status: 'Processing',
      shipping: formData
    };
    
    // Save order to localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    onOrderComplete(order);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          {[1, 2, 3].map(s => (
            <div key={s} className="flex items-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                step >= s ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {s}
              </div>
              {s < 3 && <div className={`w-24 h-1 ${step > s ? 'bg-green-500' : 'bg-gray-200'}`}></div>}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Shipping Details */}
            {step === 1 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
                  <Truck size={28} className="text-blue-600" />
                  Shipping Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name *"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="col-span-2 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email *"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone *"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                    required
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Address *"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="col-span-2 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                    required
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="City *"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                    required
                  />
                  <input
                    type="text"
                    name="pincode"
                    placeholder="Pincode *"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                    required
                  />
                </div>
                <button
                  onClick={() => setStep(2)}
                  disabled={!formData.name || !formData.email || !formData.phone || !formData.address}
                  className="w-full mt-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition"
                >
                  Continue to Payment
                </button>
              </div>
            )}

            {/* Step 2: Payment Method */}
            {step === 2 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
                  <CreditCard size={28} className="text-green-600" />
                  Payment Method
                </h2>
                <div className="space-y-4">
                  {[
                    { id: 'card', icon: '💳', name: 'Credit/Debit Card', desc: 'Visa, Mastercard, Rupay' },
                    { id: 'upi', icon: '📱', name: 'UPI', desc: 'GooglePay, PhonePe, Paytm' },
                    { id: 'netbanking', icon: '🏦', name: 'Net Banking', desc: 'All major banks' },
                    { id: 'cod', icon: '💵', name: 'Cash on Delivery', desc: 'Pay when you receive' }
                  ].map(method => (
                    <button
                      key={method.id}
                      onClick={() => setFormData({ ...formData, paymentMethod: method.id })}
                      className={`w-full text-left p-4 border-2 rounded-xl transition ${
                        formData.paymentMethod === method.id
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-3xl">{method.icon}</div>
                        <div className="flex-1">
                          <div className="font-bold text-lg">{method.name}</div>
                          <div className="text-sm text-gray-600">{method.desc}</div>
                        </div>
                        {formData.paymentMethod === method.id && (
                          <CheckCircle size={24} className="text-orange-500" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
                <div className="flex gap-4 mt-6">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 border-2 border-gray-300 py-4 rounded-xl font-bold hover:bg-gray-50 transition"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-xl font-bold hover:shadow-lg transition"
                  >
                    Review Order
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Review & Confirm */}
            {step === 3 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
                  <CheckCircle size={28} className="text-purple-600" />
                  Review Order
                </h2>
                
                <div className="space-y-6">
                  {/* Shipping Info */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="font-bold mb-2">Shipping To:</h3>
                    <p className="text-gray-700">{formData.name}</p>
                    <p className="text-gray-700">{formData.address}, {formData.city} - {formData.pincode}</p>
                    <p className="text-gray-700">{formData.phone}</p>
                  </div>

                  {/* Payment Info */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="font-bold mb-2">Payment:</h3>
                    <p className="text-gray-700 capitalize">{formData.paymentMethod.replace('-', ' ')}</p>
                  </div>

                  {/* Items */}
                  <div>
                    <h3 className="font-bold mb-2">Items ({cart.length}):</h3>
                    <div className="space-y-2">
                      {cart.slice(0, 3).map(item => (
                        <div key={item.id} className="flex items-center gap-4 text-sm">
                          <span className="text-2xl">{item.image}</span>
                          <span className="flex-1">{item.name}</span>
                          <span className="font-bold">₹{item.price.toLocaleString()}</span>
                        </div>
                      ))}
                      {cart.length > 3 && (
                        <p className="text-sm text-gray-500">+ {cart.length - 3} more items</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 border-2 border-gray-300 py-4 rounded-xl font-bold hover:bg-gray-50 transition"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-bold hover:shadow-lg transition flex items-center justify-center gap-2"
                  >
                    <CheckCircle size={20} />
                    Place Order
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right - Order Summary (Sticky) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h3 className="text-xl font-black mb-4">Order Summary</h3>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-700">Subtotal ({cart.length} items)</span>
                  <span className="font-bold">₹{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Discount (5%)</span>
                  <span className="font-bold">-₹{(cartTotal * 0.05).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Delivery</span>
                  <span className="font-bold">FREE</span>
                </div>
                <div className="border-t-2 pt-3 flex justify-between text-xl">
                  <span className="font-black">Total</span>
                  <span className="font-black text-green-700">₹{(cartTotal * 0.95).toLocaleString()}</span>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-green-600">
                  <Shield size={16} />
                  <span>100% Secure Payments</span>
                </div>
                <div className="flex items-center gap-2 text-blue-600">
                  <Truck size={16} />
                  <span>FREE Delivery</span>
                </div>
                <div className="flex items-center gap-2 text-orange-600">
                  <RotateCcw size={16} />
                  <span>7-Day Easy Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const OrderSuccessPage = ({ order, onContinue }) => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white rounded-3xl shadow-2xl p-12">
          <div className="text-8xl mb-6 animate-bounce">🎉</div>
          <h1 className="text-4xl font-black mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Order Placed Successfully!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Thank you for your order. We'll send you a confirmation email shortly.
          </p>
          
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 mb-8">
            <div className="text-sm text-gray-600 mb-2">Order ID</div>
            <div className="text-3xl font-black text-green-700 mb-4">#{order.id}</div>
            <div className="flex items-center justify-center gap-6 text-sm">
              <div>
                <div className="text-gray-600">Items</div>
                <div className="font-bold">{order.items.length}</div>
              </div>
              <div className="w-px h-10 bg-gray-300"></div>
              <div>
                <div className="text-gray-600">Total</div>
                <div className="font-bold">₹{order.total.toLocaleString()}</div>
              </div>
              <div className="w-px h-10 bg-gray-300"></div>
              <div>
                <div className="text-gray-600">Status</div>
                <div className="font-bold text-orange-600">{order.status}</div>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={onContinue}
              className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-xl font-bold hover:shadow-lg transition"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => window.print()}
              className="flex-1 border-2 border-gray-300 py-4 rounded-xl font-bold hover:bg-gray-50 transition"
            >
              Print Receipt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(savedOrders.reverse()); // Show newest first
  }, []);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Delivered': return 'from-green-500 to-emerald-500';
      case 'Shipped': return 'from-blue-500 to-cyan-500';
      case 'Processing': return 'from-orange-500 to-amber-500';
      case 'Cancelled': return 'from-red-500 to-pink-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Delivered': return '✅';
      case 'Shipped': return '🚚';
      case 'Processing': return '⏳';
      case 'Cancelled': return '❌';
      default: return '📦';
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-black mb-8 flex items-center gap-3">
          <ShoppingCart size={36} className="text-orange-600" />
          My Orders
        </h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center shadow-2xl max-w-2xl mx-auto">
            <div className="text-9xl mb-6">📦</div>
            <h3 className="text-4xl font-black text-gray-800 mb-4">No Orders Yet</h3>
            <p className="text-gray-600 mb-8 text-lg">Start shopping and your orders will appear here</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-10 py-4 rounded-full font-black text-lg hover:shadow-2xl transition-all transform hover:scale-110"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Orders List */}
            <div className="lg:col-span-2 space-y-4">
              {orders.map(order => (
                <div 
                  key={order.id} 
                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer"
                  onClick={() => setSelectedOrder(order)}
                >
                  {/* Order Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="text-sm text-gray-600">Order ID</div>
                      <div className="text-xl font-black">#{order.id}</div>
                      <div className="text-sm text-gray-500 mt-1">{order.date}</div>
                    </div>
                    <div className={`px-4 py-2 rounded-full bg-gradient-to-r ${getStatusColor(order.status)} text-white font-bold flex items-center gap-2`}>
                      <span>{getStatusIcon(order.status)}</span>
                      {order.status}
                    </div>
                  </div>

                  {/* Order Items Preview */}
                  <div className="flex gap-3 mb-4 overflow-x-auto pb-2">
                    {order.items.slice(0, 4).map((item, idx) => (
                      <div key={idx} className="flex-shrink-0">
                        <div className="text-4xl bg-gray-50 rounded-lg p-3">
                          {item.image}
                        </div>
                      </div>
                    ))}
                    {order.items.length > 4 && (
                      <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 font-bold">
                        +{order.items.length - 4}
                      </div>
                    )}
                  </div>

                  {/* Order Footer */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="text-gray-600">
                      {order.items.length} item{order.items.length > 1 ? 's' : ''}
                    </div>
                    <div className="text-2xl font-black text-green-700">
                      ₹{order.total.toLocaleString()}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex gap-3 mt-4">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedOrder(order);
                      }}
                      className="flex-1 bg-orange-500 text-white py-2 rounded-lg font-bold hover:bg-orange-600 transition"
                    >
                      View Details
                    </button>
                    {order.status === 'Delivered' && (
                      <button 
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 border-2 border-orange-500 text-orange-500 py-2 rounded-lg font-bold hover:bg-orange-50 transition"
                      >
                        Buy Again
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Order Details Sidebar */}
            <div className="lg:col-span-1">
              {selectedOrder ? (
                <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-black">Order Details</h3>
                    <button 
                      onClick={() => setSelectedOrder(null)}
                      className="p-2 hover:bg-gray-100 rounded-full"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <div className="space-y-6">
                    {/* Status */}
                    <div>
                      <div className="text-sm text-gray-600 mb-2">Status</div>
                      <div className={`px-4 py-2 rounded-lg bg-gradient-to-r ${getStatusColor(selectedOrder.status)} text-white font-bold text-center`}>
                        {getStatusIcon(selectedOrder.status)} {selectedOrder.status}
                      </div>
                    </div>

                    {/* Timeline */}
                    {selectedOrder.status !== 'Cancelled' && (
                      <div>
                        <div className="text-sm text-gray-600 mb-3">Order Timeline</div>
                        <div className="space-y-3">
                          {[
                            { label: 'Order Placed', done: true },
                            { label: 'Processing', done: selectedOrder.status !== 'Processing' },
                            { label: 'Shipped', done: selectedOrder.status === 'Delivered' || selectedOrder.status === 'Shipped' },
                            { label: 'Delivered', done: selectedOrder.status === 'Delivered' }
                          ].map((step, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                step.done ? 'bg-green-500' : 'bg-gray-200'
                              }`}>
                                {step.done && <CheckCircle size={16} className="text-white" />}
                              </div>
                              <span className={step.done ? 'font-semibold' : 'text-gray-500'}>{step.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Shipping Address */}
                    <div>
                      <div className="text-sm text-gray-600 mb-2">Shipping Address</div>
                      <div className="bg-gray-50 rounded-lg p-3 text-sm">
                        <p className="font-semibold">{selectedOrder.shipping.name}</p>
                        <p className="text-gray-700">{selectedOrder.shipping.address}</p>
                        <p className="text-gray-700">{selectedOrder.shipping.city} - {selectedOrder.shipping.pincode}</p>
                        <p className="text-gray-700">{selectedOrder.shipping.phone}</p>
                      </div>
                    </div>

                    {/* Payment */}
                    <div>
                      <div className="text-sm text-gray-600 mb-2">Payment Method</div>
                      <div className="bg-gray-50 rounded-lg p-3 text-sm font-semibold capitalize">
                        {selectedOrder.shipping.paymentMethod.replace('-', ' ')}
                      </div>
                    </div>

                    {/* Items */}
                    <div>
                      <div className="text-sm text-gray-600 mb-2">Items ({selectedOrder.items.length})</div>
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {selectedOrder.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-3 bg-gray-50 rounded-lg p-2">
                            <span className="text-2xl">{item.image}</span>
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-sm truncate">{item.name}</div>
                              <div className="text-xs text-gray-600">Qty: {item.quantity}</div>
                            </div>
                            <div className="font-bold text-sm">₹{item.price.toLocaleString()}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Total */}
                    <div className="border-t pt-4">
                      <div className="flex justify-between text-xl font-black">
                        <span>Total</span>
                        <span className="text-green-700">₹{selectedOrder.total.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-2">
                      <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transition">
                        Download Invoice
                      </button>
                      {selectedOrder.status === 'Processing' && (
                        <button className="w-full border-2 border-red-500 text-red-500 py-3 rounded-xl font-bold hover:bg-red-50 transition">
                          Cancel Order
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-24 text-center">
                  <div className="text-6xl mb-4">👈</div>
                  <p className="text-gray-600">Click on an order to view details</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
const AdminLogin = ({ onLogin, onClose }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple password check (in production, use proper authentication)
    if (password === 'admin123') {
      localStorage.setItem('isAdmin', 'true');
      onLogin();
      onClose();
    } else {
      setError('Invalid password!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 m-4" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full">
          <X size={20} />
        </button>
        
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🔐</div>
          <h2 className="text-3xl font-black mb-2">Admin Access</h2>
          <p className="text-gray-600">Enter admin password</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="Admin Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError('');
            }}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
            autoFocus
          />
          
          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-semibold">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transition"
          >
            Login as Admin
          </button>

          <div className="text-center text-sm text-gray-500 mt-4">
            Demo password: <span className="font-mono bg-gray-100 px-2 py-1 rounded">admin123</span>
          </div>
        </form>
      </div>
    </div>
  );
};
const AdminDashboard = ({ products, setProducts,categories, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [editingProduct, setEditingProduct] = useState(null);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setAllOrders(savedOrders);
  }, []);

  // Calculate stats
  const totalRevenue = allOrders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = allOrders.length;
  const totalProducts = products.length;
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const updated = products.filter(p => p.id !== id);
      setProducts(updated);
      // In production, this would sync with backend
    }
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    const updated = allOrders.map(o => 
      o.id === orderId ? { ...o, status: newStatus } : o
    );
    setAllOrders(updated);
    localStorage.setItem('orders', JSON.stringify(updated));
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-5xl">👨‍💼</div>
              <div>
                <h1 className="text-3xl font-black">Admin Dashboard</h1>
                <p className="text-purple-200">Manage your e-commerce store</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-xl font-bold transition flex items-center gap-2"
            >
              <User size={20} />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-white shadow-lg">
            <div className="text-4xl mb-3">💰</div>
            <div className="text-3xl font-black mb-1">₹{totalRevenue.toLocaleString()}</div>
            <div className="text-blue-100">Total Revenue</div>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl p-6 text-white shadow-lg">
            <div className="text-4xl mb-3">📦</div>
            <div className="text-3xl font-black mb-1">{totalOrders}</div>
            <div className="text-green-100">Total Orders</div>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl p-6 text-white shadow-lg">
            <div className="text-4xl mb-3">📱</div>
            <div className="text-3xl font-black mb-1">{totalProducts}</div>
            <div className="text-orange-100">Total Products</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white shadow-lg">
            <div className="text-4xl mb-3">📊</div>
            <div className="text-3xl font-black mb-1">₹{avgOrderValue.toLocaleString()}</div>
            <div className="text-purple-100">Avg Order Value</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg mb-6">
          <div className="flex border-b">
            {[
              { id: 'overview', icon: '📊', label: 'Overview' },
              { id: 'products', icon: '📱', label: 'Products' },
              { id: 'orders', icon: '📦', label: 'Orders' },
              { id: 'analytics', icon: '📈', label: 'Analytics' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-6 py-4 font-bold transition flex items-center justify-center gap-2 ${
                  activeTab === tab.id
                    ? 'border-b-4 border-purple-600 text-purple-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span className="text-2xl">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Recent Orders */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-black mb-4">Recent Orders</h3>
                  <div className="space-y-3">
                    {allOrders.slice(0, 5).map(order => (
                      <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-bold">Order #{order.id}</div>
                          <div className="text-sm text-gray-600">{order.items.length} items</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">₹{order.total.toLocaleString()}</div>
                          <div className={`text-xs font-semibold ${
                            order.status === 'Delivered' ? 'text-green-600' : 
                            order.status === 'Shipped' ? 'text-blue-600' : 'text-orange-600'
                          }`}>
                            {order.status}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Products */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-black mb-4">Top Products</h3>
                  <div className="space-y-3">
                    {products.slice(0, 5).map(product => (
                      <div key={product.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="text-3xl">{product.image}</div>
                        <div className="flex-1">
                          <div className="font-bold text-sm">{product.name}</div>
                          <div className="text-xs text-gray-600">{product.brand}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-green-600">₹{product.price.toLocaleString()}</div>
                          <div className="text-xs text-gray-600">Stock: {product.stock}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Products Tab */}
          {activeTab === 'products' && (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-black">Manage Products</h3>
                <button
                  onClick={() => setShowAddProduct(true)}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition flex items-center gap-2"
                >
                  <span className="text-xl">+</span>
                  Add Product
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-bold">Product</th>
                      <th className="px-4 py-3 text-left font-bold">Category</th>
                      <th className="px-4 py-3 text-left font-bold">Price</th>
                      <th className="px-4 py-3 text-left font-bold">Stock</th>
                      <th className="px-4 py-3 text-left font-bold">Rating</th>
                      <th className="px-4 py-3 text-left font-bold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(product => (
                      <tr key={product.id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{product.image}</span>
                            <div>
                              <div className="font-bold">{product.name}</div>
                              <div className="text-sm text-gray-600">{product.brand}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">{product.category}</td>
                        <td className="px-4 py-3 font-bold">₹{product.price.toLocaleString()}</td>
                        <td className="px-4 py-3">
                          <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                            product.stock > 10 ? 'bg-green-100 text-green-700' : 
                            product.stock > 0 ? 'bg-orange-100 text-orange-700' : 
                            'bg-red-100 text-red-700'
                          }`}>
                            {product.stock}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <Star size={16} fill="orange" className="text-orange-500" />
                            <span className="font-bold">{product.rating}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button
                              onClick={() => setEditingProduct(product)}
                              className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm font-bold hover:bg-blue-600 transition"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm font-bold hover:bg-red-600 transition"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-2xl font-black mb-6">All Orders</h3>
              <div className="space-y-4">
                {allOrders.map(order => (
                  <div key={order.id} className="border-2 border-gray-200 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="font-black text-lg">Order #{order.id}</div>
                        <div className="text-sm text-gray-600">{order.date}</div>
                      </div>
                      <select
                        value={order.status}
                        onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                        className="px-4 py-2 border-2 border-gray-300 rounded-lg font-bold focus:border-purple-500 focus:outline-none"
                      >
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <div className="text-gray-600">Customer</div>
                        <div className="font-bold">{order.shipping.name}</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Items</div>
                        <div className="font-bold">{order.items.length}</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Total</div>
                        <div className="font-bold text-green-600">₹{order.total.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Payment</div>
                        <div className="font-bold capitalize">{order.shipping.paymentMethod}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Analytics Tab */}
                   {activeTab === 'analytics' && (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-2xl font-black mb-6">Sales Analytics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border-2 border-gray-200 rounded-xl p-6">
                  <h4 className="font-bold mb-4">Orders by Status</h4>
                  <div className="space-y-3">
                    {['Processing', 'Shipped', 'Delivered', 'Cancelled'].map(status => {
                      const count = allOrders.filter(o => o.status === status).length;
                      const percentage = totalOrders > 0 ? (count / totalOrders * 100).toFixed(1) : 0;
                      return (
                        <div key={status}>
                          <div className="flex justify-between mb-1">
                            <span className="font-semibold">{status}</span>
                            <span className="text-gray-600">{count} ({percentage}%)</span>
                          </div>
                          <div className="bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                status === 'Delivered' ? 'bg-green-500' :
                                status === 'Shipped' ? 'bg-blue-500' :
                                status === 'Processing' ? 'bg-orange-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

               <div className="border-2 border-gray-200 rounded-xl p-6">
  <h4 className="font-bold mb-4">Products by Category</h4>
  <div className="space-y-3">
    {categories && categories.map(cat =>  {
                      const count = products.filter(p => p.category === cat.name).length;
                      const percentage = totalProducts > 0 ? (count / totalProducts * 100).toFixed(1) : 0;
                      return (
                        <div key={cat.name}>
                          <div className="flex justify-between mb-1">
                            <span className="font-semibold flex items-center gap-2">
                              <span>{cat.icon}</span>
                              {cat.name}
                            </span>
                            <span className="text-gray-600">{count} ({percentage}%)</span>
                          </div>
                          <div className="bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full bg-gradient-to-r ${cat.color}`}
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 🔥 ADD PRODUCT MODAL - ADD THIS ENTIRE BLOCK 🔥 */}
      {(showAddProduct || editingProduct) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={() => {
          setShowAddProduct(false);
          setEditingProduct(null);
        }}>
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl p-8 m-4 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => {
                setShowAddProduct(false);
                setEditingProduct(null);
              }} 
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
            >
              <X size={20} />
            </button>
            
            <h2 className="text-3xl font-black mb-6">
              {editingProduct ? '✏️ Edit Product' : '➕ Add New Product'}
            </h2>

            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const newProduct = {
                id: editingProduct ? editingProduct.id : Date.now(),
                name: formData.get('name'),
                brand: formData.get('brand'),
                category: formData.get('category'),
                price: Number(formData.get('price')),
                originalPrice: Number(formData.get('originalPrice')),
                stock: Number(formData.get('stock')),
                rating: Number(formData.get('rating')),
                reviews: Number(formData.get('reviews')),
                image: formData.get('image'),
                description: formData.get('description'),
                delivery: "Free",
                tag: formData.get('tag'),
                discount: Math.round(((Number(formData.get('originalPrice')) - Number(formData.get('price'))) / Number(formData.get('originalPrice'))) * 100),
                inStock: true,
                prime: true,
                features: [formData.get('feature1'), formData.get('feature2'), formData.get('feature3')].filter(f => f)
              };

              if (editingProduct) {
                setProducts(products.map(p => p.id === editingProduct.id ? newProduct : p));
              } else {
                setProducts([...products, newProduct]);
              }

              setShowAddProduct(false);
              setEditingProduct(null);
            }} className="space-y-4">
              
              <div className="grid grid-cols-2 gap-4">
                <input
                  name="name"
                  type="text"
                  placeholder="Product Name *"
                  defaultValue={editingProduct?.name}
                  className="col-span-2 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                  required
                />

                <input
                  name="brand"
                  type="text"
                  placeholder="Brand *"
                  defaultValue={editingProduct?.brand}
                  className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                  required
                />

                <select
                  name="category"
                  defaultValue={editingProduct?.category}
                  className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                  required
                >
                  <option value="">Select Category *</option>
                  {categories && categories.map(cat => (
                    <option key={cat.name} value={cat.name}>{cat.icon} {cat.name}</option>
                  ))}
                </select>

                <input
                  name="price"
                  type="number"
                  placeholder="Price *"
                  defaultValue={editingProduct?.price}
                  className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                  required
                />

                <input
                  name="originalPrice"
                  type="number"
                  placeholder="Original Price *"
                  defaultValue={editingProduct?.originalPrice}
                  className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                  required
                />

                <input
                  name="stock"
                  type="number"
                  placeholder="Stock *"
                  defaultValue={editingProduct?.stock}
                  className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                  required
                />

                <input
                  name="rating"
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  placeholder="Rating (0-5) *"
                  defaultValue={editingProduct?.rating}
                  className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                  required
                />

                <input
                  name="reviews"
                  type="number"
                  placeholder="Number of Reviews *"
                  defaultValue={editingProduct?.reviews}
                  className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                  required
                />

                <input
                  name="image"
                  type="text"
                  placeholder="Emoji (📱, 💻, etc) *"
                  defaultValue={editingProduct?.image}
                  className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                  required
                  maxLength={2}
                />

                <input
                  name="tag"
                  type="text"
                  placeholder="Tag (Bestseller, Deal, etc)"
                  defaultValue={editingProduct?.tag}
                  className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                />

                <textarea
                  name="description"
                  placeholder="Description"
                  defaultValue={editingProduct?.description}
                  className="col-span-2 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                  rows={3}
                ></textarea>

                <input
                  name="feature1"
                  type="text"
                  placeholder="Feature 1"
                  defaultValue={editingProduct?.features?.[0]}
                  className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                />

                <input
                  name="feature2"
                  type="text"
                  placeholder="Feature 2"
                  defaultValue={editingProduct?.features?.[1]}
                  className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                />

                <input
                  name="feature3"
                  type="text"
                  placeholder="Feature 3"
                  defaultValue={editingProduct?.features?.[2]}
                  className="col-span-2 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddProduct(false);
                    setEditingProduct(null);
                  }}
                  className="flex-1 border-2 border-gray-300 py-3 rounded-xl font-bold hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transition"
                >
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
const SearchSuggestions = ({ 
  suggestions, 
  searchQuery, 
  searchHistory, 
  onSelectProduct, 
  onSelectHistory,
  onClearHistory
}) => {
  const popularSearches = ['iPhone', 'Laptop', 'Headphones', 'Watch', 'Shoes', 'Books'];
  
  return (
    <div className="search-suggestions absolute top-full left-0 right-0 bg-white rounded-2xl shadow-2xl mt-2 max-h-96 overflow-y-auto z-50 border-2 border-gray-200">
      {/* Search Suggestions - Products */}
      {searchQuery && suggestions.length > 0 && (
        <div className="p-4">
          <div className="text-xs font-bold text-gray-500 mb-3 flex items-center gap-2">
            <Search size={14} />
            PRODUCTS ({suggestions.length})
          </div>
          <div className="space-y-1">
            {suggestions.map(product => (
              <button
                key={product.id}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectProduct(product);
                }}
                className="w-full flex items-center gap-3 p-3 hover:bg-orange-50 rounded-xl transition text-left"
              >
                <span className="text-3xl">{product.image}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm truncate">{product.name}</div>
                  <div className="text-xs text-gray-600">{product.brand} • {product.category}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-600">₹{product.price.toLocaleString()}</div>
                  <div className="flex items-center gap-1 text-xs">
                    <Star size={12} fill="orange" className="text-orange-500" />
                    {product.rating}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Search History */}
      {!searchQuery && searchHistory.length > 0 && (
        <div className="p-4 border-t">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs font-bold text-gray-500 flex items-center gap-2">
              <Clock size={14} />
              RECENT SEARCHES
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onClearHistory();
              }}
              className="text-xs text-orange-600 font-bold hover:underline"
            >
              Clear All
            </button>
          </div>
          <div className="space-y-1">
            {searchHistory.slice(0, 5).map((term, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectHistory(term);
                }}
                className="w-full flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition text-left"
              >
                <Clock size={16} className="text-gray-400" />
                <span className="flex-1 text-sm">{term}</span>
                <ChevronRight size={16} className="text-gray-400" />
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Popular Searches */}
      {!searchQuery && (
        <div className="p-4 border-t">
          <div className="text-xs font-bold text-gray-500 mb-3 flex items-center gap-2">
            <TrendingUp size={14} />
            POPULAR SEARCHES
          </div>
          <div className="flex flex-wrap gap-2">
            {popularSearches.map((term, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectHistory(term);
                }}
                className="px-4 py-2 bg-gradient-to-r from-orange-50 to-pink-50 hover:from-orange-100 hover:to-pink-100 rounded-full text-sm font-semibold text-orange-700 transition"
              >
                🔥 {term}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* No Results */}
      {searchQuery && suggestions.length === 0 && (
        <div className="p-8 text-center">
          <div className="text-5xl mb-3">🔍</div>
          <div className="font-bold text-gray-700 mb-1">No products found</div>
          <div className="text-sm text-gray-500">Try searching for something else</div>
        </div>
      )}
    </div>
  );
};
export default App;