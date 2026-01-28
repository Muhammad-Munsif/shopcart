
// DOM Elements
const cartIcon = document.getElementById('cartIcon');
const cartSidebar = document.getElementById('cartSidebar');
const closeCart = document.getElementById('closeCart');
const overlay = document.getElementById('overlay');
const cartItemsContainer = document.getElementById('cartItems');
const cartSubtotal = document.getElementById('cartSubtotal');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const cartCount = document.querySelector('.cart-count');
const productGrid = document.getElementById('productGrid');
const productsCount = document.getElementById('productsCount');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');
const themeToggle = document.getElementById('themeToggle');
const shippingCost = document.getElementById('shippingCost');

// Sample Product Data
const products = [
  {
    id: 1,
    title: "Premium Wireless Headphones",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Noise-cancelling wireless headphones with premium sound quality.",
    rating: 4.5,
    reviews: 128
  },
  {
    id: 2,
    title: "Smart Fitness Watch",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Track your health and fitness with this advanced smartwatch.",
    rating: 4.7,
    reviews: 89
  },
  {
    id: 3,
    title: "Wireless Bluetooth Speaker",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Portable Bluetooth speaker with 360° sound and 12-hour battery.",
    rating: 4.3,
    reviews: 56
  },
  {
    id: 4,
    title: "Professional Camera",
    price: 899.99,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Capture stunning photos with this professional-grade camera.",
    rating: 4.9,
    reviews: 42
  },
  {
    id: 5,
    title: "Gaming Laptop",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "High-performance gaming laptop with RTX graphics.",
    rating: 4.8,
    reviews: 67
  },
  {
    id: 6,
    title: "Smart Home Assistant",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1543512214-318c7553f230?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Voice-controlled smart home assistant with premium sound.",
    rating: 4.4,
    reviews: 112
  },
  {
    id: 7,
    title: "Wireless Earbuds",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1590658165737-15a047b8b5e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "True wireless earbuds with active noise cancellation.",
    rating: 4.6,
    reviews: 93
  },
  {
    id: 8,
    title: "Tablet Pro",
    price: 499.99,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Professional tablet with stunning display and powerful performance.",
    rating: 4.7,
    reviews: 78
  }
];

// Cart State
let cart = [];

// Initialize the application
function init() {
  renderProducts();
  loadCart();
  updateCart();
  setupEventListeners();
  updateProductsCount();
}

// Render products to the page
function renderProducts() {
  productGrid.innerHTML = products.map(product => `
        <div class="product-card animate" data-id="${product.id}">
          <div style="overflow: hidden;">
            <img src="${product.image}" alt="${product.title}" class="product-image">
          </div>
          <div class="product-info">
            <div class="product-header">
              <h4 class="product-title">${product.title}</h4>
              <span class="product-price">$${product.price.toFixed(2)}</span>
            </div>
            <p class="product-description">${product.description}</p>
            <div class="product-rating">
              ${renderStars(product.rating)}
              <span class="rating-count">(${product.reviews})</span>
            </div>
            <button class="add-to-cart-btn" data-id="${product.id}">
              <i class="fas fa-cart-plus"></i> Add to Cart
            </button>
          </div>
        </div>
      `).join('');
}

// Render star rating
function renderStars(rating) {
  let stars = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars += '<i class="fas fa-star"></i>';
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars += '<i class="fas fa-star-half-alt"></i>';
    } else {
      stars += '<i class="far fa-star"></i>';
    }
  }
  return stars;
}

// Setup event listeners
function setupEventListeners() {
  // Toggle cart sidebar
  cartIcon.addEventListener('click', toggleCart);
  closeCart.addEventListener('click', toggleCart);
  overlay.addEventListener('click', toggleCart);

  // Add to cart buttons
  productGrid.addEventListener('click', (e) => {
    if (e.target.closest('.add-to-cart-btn')) {
      const productId = parseInt(e.target.closest('.add-to-cart-btn').dataset.id);
      const product = products.find(p => p.id === productId);
      addToCart(product);
    }
  });

  // Cart item actions
  cartItemsContainer.addEventListener('click', (e) => {
    const cartItem = e.target.closest('.cart-item');
    if (!cartItem) return;

    const productId = parseInt(cartItem.dataset.id);

    if (e.target.closest('.remove-item')) {
      removeFromCart(productId);
    } else if (e.target.closest('.quantity-btn')) {
      const isIncrease = e.target.textContent === '+';
      updateQuantity(productId, isIncrease);
    }
  });

  // Checkout button
  checkoutBtn.addEventListener('click', checkout);

  // Theme toggle
  themeToggle.addEventListener('click', toggleTheme);
}

// Cart functions
function addToCart(product) {
  const existingItem = cart.find(item => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  }

  saveCart();
  updateCart();
  showToast(`${product.title} added to cart!`);
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  updateCart();
  showToast('Item removed from cart', false);
}

function updateQuantity(productId, isIncrease) {
  const item = cart.find(item => item.id === productId);

  if (item) {
    if (isIncrease) {
      item.quantity += 1;
    } else {
      if (item.quantity > 1) {
        item.quantity -= 1;
      }
    }
  }

  saveCart();
  updateCart();
}

function updateCart() {
  renderCartItems();
  updateCartTotals();
  updateCartCount();
}

function renderCartItems() {
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
          <div class="empty-cart">
            <div class="empty-cart-icon">
              <i class="fas fa-shopping-cart"></i>
            </div>
            <h4>Your cart is empty</h4>
            <p>Add some products to get started!</p>
          </div>
        `;
    return;
  }

  cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
          <img src="${item.image}" alt="${item.title}" class="cart-item-image">
          <div class="cart-item-details">
            <h4 class="cart-item-title">${item.title}</h4>
            <span class="cart-item-price">$${item.price.toFixed(2)}</span>
            <div class="cart-item-actions">
              <div class="quantity-control">
                <button class="quantity-btn">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn">+</button>
              </div>
              <button class="remove-item">
                <i class="fas fa-trash"></i> Remove
              </button>
            </div>
          </div>
        </div>
      `).join('');
}

function updateCartTotals() {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 5;
  const total = subtotal + shipping;

  cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
  cartTotal.textContent = `$${total.toFixed(2)}`;
  shippingCost.textContent = subtotal > 100 ? 'FREE' : `$${shipping.toFixed(2)}`;
  shippingCost.style.color = subtotal > 100 ? 'var(--success)' : 'var(--text-primary)';

  // Enable/disable checkout button
  checkoutBtn.disabled = cart.length === 0;
}

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = count;
}

function updateProductsCount() {
  productsCount.textContent = `${products.length} Products`;
}

function toggleCart() {
  cartSidebar.classList.toggle('active');
  overlay.classList.toggle('active');
  document.body.style.overflow = cartSidebar.classList.contains('active') ? 'hidden' : '';
}

function showToast(message, isSuccess = true) {
  toastMessage.textContent = message;
  toast.style.borderLeftColor = isSuccess ? 'var(--success)' : 'var(--danger)';
  toast.querySelector('i').style.color = isSuccess ? 'var(--success)' : 'var(--danger)';

  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

function checkout() {
  if (cart.length === 0) return;

  const total = parseFloat(cartTotal.textContent.replace('$', ''));
  alert(`Thank you for your order!\nTotal: $${total.toFixed(2)}\n\nYour order will be processed shortly.`);

  cart = [];
  saveCart();
  updateCart();
  toggleCart();
  showToast('Order placed successfully! Thank you for shopping with us.');
}

// Theme functions
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);

  const icon = themeToggle.querySelector('i');
  icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

function loadTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);

  const icon = themeToggle.querySelector('i');
  icon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Local storage functions
function saveCart() {
  localStorage.setItem('cardShopCart', JSON.stringify(cart));
}

function loadCart() {
  const savedCart = localStorage.getItem('cardShopCart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
  }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  loadTheme();
  init();

  // Add animation delays to product cards
  document.querySelectorAll('.product-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
  });
});
