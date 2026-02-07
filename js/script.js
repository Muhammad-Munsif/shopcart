<script>
    // Enhanced Shopping Cart Application
    document.addEventListener('DOMContentLoaded', () => {
      // Initialize the application
      init();
    });

    // Global State
    let cart = [];
    let currentProducts = [];
    let activeCategory = 'all';

    // DOM Elements
    const elements = {
      cartIcon: document.getElementById('cartIcon'),
      cartSidebar: document.getElementById('cartSidebar'),
      closeCart: document.getElementById('closeCart'),
      overlay: document.getElementById('overlay'),
      cartItemsContainer: document.getElementById('cartItems'),
      cartSubtotal: document.getElementById('cartSubtotal'),
      cartTotal: document.getElementById('cartTotal'),
      checkoutBtn: document.getElementById('checkoutBtn'),
      cartCount: document.querySelector('.cart-count'),
      productGrid: document.getElementById('productGrid'),
      productsCount: document.getElementById('productsCount'),
      toast: document.getElementById('toast'),
      toastMessage: document.getElementById('toastMessage'),
      themeToggle: document.getElementById('themeToggle'),
      shippingCost: document.getElementById('shippingCost'),
      discount: document.getElementById('discount'),
      mobileMenuBtn: document.getElementById('mobileMenuBtn'),
      navLinks: document.getElementById('navLinks'),
      header: document.getElementById('header'),
      exploreBtn: document.getElementById('exploreBtn'),
      loadingSpinner: document.getElementById('loadingSpinner'),
      categories: document.getElementById('categories')
    };

    // Enhanced Product Data
    const products = [
      {
        id: 1,
        title: "Premium Wireless Headphones",
        price: 129.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Noise-cancelling wireless headphones with premium sound quality and 30-hour battery life.",
        rating: 4.5,
        reviews: 128,
        category: "electronics",
        badges: ["Bestseller", "-20%"],
        colors: ["Black", "White", "Blue"],
        stock: 15
      },
      {
        id: 2,
        title: "Smart Fitness Watch Pro",
        price: 249.99,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Track your health and fitness with this advanced smartwatch featuring ECG and blood oxygen monitoring.",
        rating: 4.7,
        reviews: 89,
        category: "electronics",
        badges: ["New", "Limited"],
        colors: ["Black", "Silver", "Gold"],
        stock: 8
      },
      {
        id: 3,
        title: "Wireless Bluetooth Speaker",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Portable Bluetooth speaker with 360° immersive sound and 12-hour battery life.",
        rating: 4.3,
        reviews: 56,
        category: "electronics",
        badges: ["Popular"],
        colors: ["Black", "Red", "Blue"],
        stock: 25
      },
      {
        id: 4,
        title: "Professional DSLR Camera",
        price: 899.99,
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Capture stunning photos with this professional-grade camera featuring 4K video recording.",
        rating: 4.9,
        reviews: 42,
        category: "electronics",
        badges: ["Premium"],
        colors: ["Black"],
        stock: 5
      },
      {
        id: 5,
        title: "Gaming Laptop Pro",
        price: 1299.99,
        image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "High-performance gaming laptop with RTX 4070 graphics and 240Hz refresh rate display.",
        rating: 4.8,
        reviews: 67,
        category: "electronics",
        badges: ["Gaming"],
        colors: ["Black", "RGB"],
        stock: 12
      },
      {
        id: 6,
        title: "Smart Home Assistant",
        price: 59.99,
        image: "https://images.unsplash.com/photo-1543512214-318c7553f230?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Voice-controlled smart home assistant with premium sound and home automation features.",
        rating: 4.4,
        reviews: 112,
        category: "electronics",
        badges: ["Smart Home"],
        colors: ["Black", "White"],
        stock: 30
      },
      {
        id: 7,
        title: "Wireless Earbuds Pro",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1590658165737-15a047b8b5e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "True wireless earbuds with active noise cancellation and transparency mode.",
        rating: 4.6,
        reviews: 93,
        category: "electronics",
        badges: ["Wireless"],
        colors: ["White", "Black", "Pink"],
        stock: 20
      },
      {
        id: 8,
        title: "Tablet Pro 12.9\"",
        price: 499.99,
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Professional tablet with stunning Liquid Retina XDR display and M2 chip performance.",
        rating: 4.7,
        reviews: 78,
        category: "electronics",
        badges: ["Pro"],
        colors: ["Space Gray", "Silver"],
        stock: 18
      }
    ];

    // Initialize the application
    function init() {
      currentProducts = [...products];
      renderProducts();
      loadCart();
      updateCart();
      setupEventListeners();
      updateProductsCount();
      loadTheme();
      setupScrollEffects();
      setupCategoryFilters();
    }

    // Setup event listeners
    function setupEventListeners() {
      // Toggle cart sidebar
      elements.cartIcon.addEventListener('click', toggleCart);
      elements.closeCart.addEventListener('click', toggleCart);
      elements.overlay.addEventListener('click', toggleCart);

      // Add to cart buttons
      elements.productGrid.addEventListener('click', (e) => {
        if (e.target.closest('.add-to-cart-btn')) {
          const productId = parseInt(e.target.closest('.add-to-cart-btn').dataset.id);
          const product = currentProducts.find(p => p.id === productId);
          if (product) {
            addToCart(product);
          }
        }
        
        // Quick view button
        if (e.target.closest('.quick-view-btn')) {
          const productId = parseInt(e.target.closest('.product-card').dataset.id);
          const product = currentProducts.find(p => p.id === productId);
          if (product) {
            showQuickView(product);
          }
        }
      });

      // Cart item actions
      elements.cartItemsContainer.addEventListener('click', (e) => {
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
      elements.checkoutBtn.addEventListener('click', checkout);

      // Theme toggle
      elements.themeToggle.addEventListener('click', toggleTheme);

      // Mobile menu
      elements.mobileMenuBtn.addEventListener('click', toggleMobileMenu);

      // Explore features button
      elements.exploreBtn.addEventListener('click', () => {
        document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
      });

      // Close mobile menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!e.target.closest('#navLinks') && !e.target.closest('#mobileMenuBtn')) {
          elements.navLinks.classList.remove('active');
        }
      });

      // Prevent body scroll when cart is open
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          if (elements.cartSidebar.classList.contains('active')) {
            toggleCart();
          }
          if (elements.navLinks.classList.contains('active')) {
            toggleMobileMenu();
          }
        }
      });
    }

    // Setup scroll effects
    function setupScrollEffects() {
      window.addEventListener('scroll', () => {
        // Header scroll effect
        if (window.scrollY > 50) {
          elements.header.classList.add('scrolled');
        } else {
          elements.header.classList.remove('scrolled');
        }
      });
    }

    // Setup category filters
    function setupCategoryFilters() {
      elements.categories.addEventListener('click', (e) => {
        if (e.target.classList.contains('category-btn')) {
          // Update active category button
          document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active');
          });
          e.target.classList.add('active');
          
          // Filter products
          const category = e.target.dataset.category;
          filterProducts(category);
        }
      });
    }

    // Filter products by category
    function filterProducts(category) {
      activeCategory = category;
      
      if (category === 'all') {
        currentProducts = [...products];
      } else {
        currentProducts = products.filter(product => product.category === category);
      }
      
      renderProducts();
      updateProductsCount();
    }

    // Render products to the page
    function renderProducts() {
      // Show loading spinner
      elements.productGrid.innerHTML = '';
      elements.loadingSpinner.style.display = 'block';
      
      // Simulate loading delay for better UX
      setTimeout(() => {
        elements.loadingSpinner.style.display = 'none';
        
        elements.productGrid.innerHTML = currentProducts.map(product => `
          <div class="product-card animate" data-id="${product.id}">
            ${product.badges ? product.badges.map(badge => `
              <span class="product-badge">${badge}</span>
            `).join('') : ''}
            
            <div class="product-image-container">
              <img src="${product.image}" alt="${product.title}" class="product-image" loading="lazy">
              <button class="quick-view-btn">
                <i class="fas fa-eye"></i> Quick View
              </button>
            </div>
            
            <div class="product-info">
              <div class="product-header">
                <h4 class="product-title">${product.title}</h4>
                <span class="product-price">$${product.price.toFixed(2)}</span>
              </div>
              
              <p class="product-description">${product.description}</p>
              
              ${product.colors ? `
                <div class="product-colors">
                  <span>Colors:</span>
                  ${product.colors.map(color => `
                    <span class="color-dot" style="background-color: ${color.toLowerCase()}" title="${color}"></span>
                  `).join('')}
                </div>
              ` : ''}
              
              <div class="product-meta">
                <div class="product-rating">
                  ${renderStars(product.rating)}
                  <span class="rating-count">(${product.reviews})</span>
                </div>
                <div class="product-stock ${product.stock < 10 ? 'low-stock' : ''}">
                  <i class="fas fa-box"></i> ${product.stock} left
                </div>
              </div>
              
              <button class="add-to-cart-btn" data-id="${product.id}" ${product.stock === 0 ? 'disabled' : ''}>
                <i class="fas fa-cart-plus"></i> 
                ${product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
            </div>
          </div>
        `).join('');
        
        // Add animation delays
        document.querySelectorAll('.product-card').forEach((card, index) => {
          card.style.animationDelay = `${index * 0.1}s`;
        });
      }, 300);
    }

    // Render star rating
    function renderStars(rating) {
      let stars = '';
      const fullStars = Math.floor(rating);
      const hasHalfStar = rating % 1 >= 0.5;
      
      for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
          stars += '<i class="fas fa-star"></i>';
        } else if (i === fullStars + 1 && hasHalfStar) {
          stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
          stars += '<i class="far fa-star"></i>';
        }
      }
      return stars;
    }

    // Cart functions
    function addToCart(product) {
      if (product.stock === 0) {
        showToast(`${product.title} is out of stock!`, false);
        return;
      }
      
      const existingItem = cart.find(item => item.id === product.id);

      if (existingItem) {
        if (existingItem.quantity >= product.stock) {
          showToast(`Only ${product.stock} items available in stock!`, false);
          return;
        }
        existingItem.quantity += 1;
      } else {
        cart.push({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity: 1,
          maxStock: product.stock
        });
      }

      saveCart();
      updateCart();
      showToast(`${product.title} added to cart!`);
      
      // Animate cart icon
      elements.cartIcon.style.transform = 'scale(1.2)';
      setTimeout(() => {
        elements.cartIcon.style.transform = 'scale(1)';
      }, 300);
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
          if (item.quantity >= item.maxStock) {
            showToast(`Only ${item.maxStock} items available in stock!`, false);
            return;
          }
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
        elements.cartItemsContainer.innerHTML = `
          <div class="empty-cart">
            <div class="empty-cart-icon">
              <i class="fas fa-shopping-cart"></i>
            </div>
            <h4>Your cart is empty</h4>
            <p>Add some products to get started!</p>
            <button class="cta-btn cta-btn-secondary" onclick="toggleCart()">
              <i class="fas fa-shopping-bag"></i> Continue Shopping
            </button>
          </div>
        `;
        return;
      }

      elements.cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
          <img src="${item.image}" alt="${item.title}" class="cart-item-image" loading="lazy">
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
      const discount = subtotal > 200 ? subtotal * 0.1 : 0; // 10% discount for orders over $200
      const total = subtotal + shipping - discount;

      elements.cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
      elements.cartTotal.textContent = `$${total.toFixed(2)}`;
      elements.shippingCost.textContent = subtotal > 100 ? 'FREE' : `$${shipping.toFixed(2)}`;
      elements.shippingCost.style.color = subtotal > 100 ? 'var(--success)' : 'var(--text-primary)';
      elements.discount.textContent = discount > 0 ? `-$${discount.toFixed(2)}` : '$0.00';
      elements.discount.style.color = discount > 0 ? 'var(--success)' : 'var(--text-primary)';

      // Enable/disable checkout button
      elements.checkoutBtn.disabled = cart.length === 0;
      
      // Show discount notification
      if (discount > 0 && !elements.checkoutBtn.disabled) {
        showToast(`🎉 You saved $${discount.toFixed(2)} with 10% discount!`);
      }
    }

    function updateCartCount() {
      const count = cart.reduce((sum, item) => sum + item.quantity, 0);
      elements.cartCount.textContent = count;
      
      // Update cart icon animation
      if (count > 0) {
        elements.cartCount.style.display = 'flex';
      } else {
        elements.cartCount.style.display = 'none';
      }
    }

    function updateProductsCount() {
      elements.productsCount.textContent = `${currentProducts.length} Products`;
    }

    function toggleCart() {
      elements.cartSidebar.classList.toggle('active');
      elements.overlay.classList.toggle('active');
      document.body.style.overflow = elements.cartSidebar.classList.contains('active') ? 'hidden' : '';
      
      // Close mobile menu if open
      elements.navLinks.classList.remove('active');
    }

    function toggleMobileMenu() {
      elements.navLinks.classList.toggle('active');
    }

    function showToast(message, isSuccess = true) {
      elements.toastMessage.textContent = message;
      elements.toast.style.borderLeftColor = isSuccess ? 'var(--success)' : 'var(--danger)';
      elements.toast.querySelector('i').style.color = isSuccess ? 'var(--success)' : 'var(--danger)';

      elements.toast.classList.add('show');

      setTimeout(() => {
        elements.toast.classList.remove('show');
      }, 3000);
    }

    function showQuickView(product) {
      // Create quick view modal
      const modalHTML = `
        <div class="quick-view-modal">
          <div class="modal-content">
            <button class="close-modal">&times;</button>
            <div class="modal-body">
              <img src="${product.image}" alt="${product.title}" class="modal-image">
              <div class="modal-details">
                <h3>${product.title}</h3>
                <div class="modal-price">$${product.price.toFixed(2)}</div>
                <div class="modal-rating">
                  ${renderStars(product.rating)}
                  <span>(${product.reviews} reviews)</span>
                </div>
                <p class="modal-description">${product.description}</p>
                <div class="modal-actions">
                  <button class="add-to-cart-btn" onclick="addToCart(${JSON.stringify(product).replace(/"/g, '&quot;')}); document.querySelector('.quick-view-modal').remove();">
                    <i class="fas fa-cart-plus"></i> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
      
      // Add to DOM
      document.body.insertAdjacentHTML('beforeend', modalHTML);
      
      // Add styles
      const style = document.createElement('style');
      style.textContent = `
        .quick-view-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.8);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2001;
          animation: fadeIn 0.3s ease;
        }
        
        .modal-content {
          background: var(--bg-card);
          border-radius: var(--radius-lg);
          max-width: 900px;
          width: 90%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          animation: slideUp 0.4s ease;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        .close-modal {
          position: absolute;
          top: 20px;
          right: 20px;
          background: none;
          border: none;
          font-size: 2rem;
          color: var(--text-secondary);
          cursor: pointer;
          z-index: 2;
        }
        
        .modal-body {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          padding: 2rem;
        }
        
        .modal-image {
          width: 100%;
          height: 400px;
          object-fit: cover;
          border-radius: var(--radius);
        }
        
        @media (max-width: 768px) {
          .modal-body {
            grid-template-columns: 1fr;
          }
        }
      `;
      document.head.appendChild(style);
      
      // Add close functionality
      const modal = document.querySelector('.quick-view-modal');
      const closeBtn = modal.querySelector('.close-modal');
      
      closeBtn.addEventListener('click', () => {
        modal.remove();
        style.remove();
      });
      
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.remove();
          style.remove();
        }
      });
    }

    function checkout() {
      if (cart.length === 0) return;

      const total = parseFloat(elements.cartTotal.textContent.replace('$', ''));
      
      // Create checkout modal
      const modalHTML = `
        <div class="checkout-modal">
          <div class="modal-content">
            <button class="close-checkout">&times;</button>
            <div class="modal-header">
              <h3><i class="fas fa-check-circle"></i> Order Confirmation</h3>
            </div>
            <div class="modal-body">
              <div class="success-icon">
                <i class="fas fa-shopping-bag"></i>
              </div>
              <h4>Thank you for your order!</h4>
              <p>Your order has been successfully placed and will be processed shortly.</p>
              <div class="order-summary">
                <div class="summary-row">
                  <span>Order Total:</span>
                  <span class="total">$${total.toFixed(2)}</span>
                </div>
                <div class="summary-row">
                  <span>Estimated Delivery:</span>
                  <span>3-5 business days</span>
                </div>
              </div>
              <div class="modal-actions">
                <button class="cta-btn cta-btn-primary" onclick="completeCheckout()">
                  <i class="fas fa-home"></i> Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
      
      // Add to DOM
      document.body.insertAdjacentHTML('beforeend', modalHTML);
      
      // Add styles
      const style = document.createElement('style');
      style.textContent = `
        .checkout-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.8);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2001;
          animation: fadeIn 0.3s ease;
        }
        
        .checkout-modal .modal-content {
          background: var(--bg-card);
          border-radius: var(--radius-lg);
          max-width: 500px;
          width: 90%;
          animation: slideUp 0.4s ease;
        }
        
        .modal-header {
          padding: 2rem 2rem 1rem;
          text-align: center;
          border-bottom: 1px solid var(--border-color);
        }
        
        .modal-header h3 {
          color: var(--success);
          font-size: 1.5rem;
        }
        
        .modal-body {
          padding: 2rem;
          text-align: center;
        }
        
        .success-icon {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, var(--success), var(--secondary));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          color: white;
          font-size: 2rem;
          animation: bounce 1s infinite alternate;
        }
        
        @keyframes bounce {
          from { transform: translateY(0); }
          to { transform: translateY(-10px); }
        }
        
        .order-summary {
          background: var(--bg-secondary);
          border-radius: var(--radius);
          padding: 1.5rem;
          margin: 2rem 0;
          text-align: left;
        }
        
        .summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1rem;
        }
        
        .summary-row .total {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--primary);
        }
        
        .close-checkout {
          position: absolute;
          top: 20px;
          right: 20px;
          background: none;
          border: none;
          font-size: 2rem;
          color: var(--text-secondary);
          cursor: pointer;
          z-index: 2;
        }
      `;
      document.head.appendChild(style);
      
      // Add close functionality
      const modal = document.querySelector('.checkout-modal');
      const closeBtn = modal.querySelector('.close-checkout');
      
      closeBtn.addEventListener('click', () => {
        modal.remove();
        style.remove();
      });
      
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.remove();
          style.remove();
        }
      });
    }

    function completeCheckout() {
      cart = [];
      saveCart();
      updateCart();
      toggleCart();
      
      // Remove checkout modal
      const modal = document.querySelector('.checkout-modal');
      if (modal) {
        modal.remove();
      }
      
      showToast('Order placed successfully! Thank you for shopping with us.');
      
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Theme functions
    function toggleTheme() {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);

      const icon = elements.themeToggle.querySelector('i');
      icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
      
      // Add theme transition animation
      document.body.style.opacity = '0.8';
      setTimeout(() => {
        document.body.style.opacity = '1';
      }, 300);
    }

    function loadTheme() {
      const savedTheme = localStorage.getItem('theme') || 
                         (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      
      document.documentElement.setAttribute('data-theme', savedTheme);
      const icon = elements.themeToggle.querySelector('i');
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

    // Make functions globally available for HTML onclick handlers
    window.addToCart = addToCart;
    window.toggleCart = toggleCart;
    window.completeCheckout = completeCheckout;
  </script>