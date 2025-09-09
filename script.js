document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const cartIcon = document.querySelector(".cart-icon");
  const cartSidebar = document.querySelector(".cart-sidebar");
  const closeCart = document.querySelector(".close-cart");
  const overlay = document.querySelector(".overlay");
  const cartItemsContainer = document.querySelector(".cart-items");
  const cartTotal = document.querySelector(".cart-total span");
  const cartCount = document.querySelector(".cart-count");
  const productGrid = document.querySelector(".product-grid");
  const checkoutBtn = document.querySelector(".checkout-btn");

  // Sample product data
  const products = [
    {
      id: 1,
      title: "Wireless Headphones",
      price: 99.99,
      image:
        "https://media.istockphoto.com/id/1372906882/photo/modern-blue-wireless-headphones-isolated-on-white-background-with-clipping-path.jpg?s=612x612&w=0&k=20&c=0k-2JFElEQ0QTvXsgtLx3i2JotQo_Eb8aEwyN-BOZjA=",
    },
    {
      id: 2,
      title: "Smart Watch",
      price: 199.99,
      image:
        "https://media.gettyimages.com/id/481616102/photo/apple-watch-sport.jpg?s=612x612&w=gi&k=20&c=y0vleYzoJnMML_SoO_Dbq5g4c3AyAgwBnADRTQHCTXY=",
    },
    {
      id: 3,
      title: "Bluetooth Speaker",
      price: 79.99,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuL_ou8S-WcBk6avDXitUTWwFQWBxYKGgDDA&s",
    },
    {
      id: 4,
      title: "Laptop Backpack",
      price: 49.99,
      image:
        "https://www.shutterstock.com/image-photo/laptop-modern-gadgets-accessories-work-260nw-2476125191.jpg",
    },
    {
      id: 5,
      title: "Wireless Mouse",
      price: 29.99,
      image:
        "https://media.istockphoto.com/id/184370848/photo/modern-pc-mouse-from-above-on-white.jpg?s=612x612&w=0&k=20&c=akaNUET2qDPmKtUdwP23M08nqd0M8jdEar3p8IW7mYk=",
    },
    {
      id: 6,
      title: "USB-C Cable",
      price: 12.99,
      image:
        "https://static.vecteezy.com/system/resources/thumbnails/006/708/381/small/usb-type-c-cable-isolated-on-white-background-with-clipping-path-free-photo.jpg",
    },
  ];

  // Cart state
  let cart = [];

  // Initialize the app
  function init() {
    renderProducts();
    loadCart();
    updateCart();
    setupEventListeners();
  }

  // Render products to the page
  function renderProducts() {
    productGrid.innerHTML = products
      .map(
        (product) => `
            <div class="product-card" data-id="${product.id}">
                <img src="${product.image}" alt="${
          product.title
        }" class="product-image">
                <div class="product-info">
                    <h3 class="product-title">${product.title}</h3>
                    <span class="product-price">$${product.price.toFixed(
                      2
                    )}</span>
                    <button class="add-to-cart">Add to Cart</button>
                </div>
            </div>
        `
      )
      .join("");
  }

  // Setup event listeners
  function setupEventListeners() {
    // Toggle cart sidebar
    cartIcon.addEventListener("click", toggleCart);
    closeCart.addEventListener("click", toggleCart);
    overlay.addEventListener("click", toggleCart);

    // Add to cart buttons
    productGrid.addEventListener("click", (e) => {
      if (e.target.classList.contains("add-to-cart")) {
        const productId = parseInt(
          e.target.closest(".product-card").dataset.id
        );
        const product = products.find((p) => p.id === productId);
        addToCart(product);
      }
    });

    // Cart item actions
    cartItemsContainer.addEventListener("click", (e) => {
      const cartItem = e.target.closest(".cart-item");
      if (!cartItem) return;

      const productId = parseInt(cartItem.dataset.id);

      if (e.target.classList.contains("remove-item")) {
        removeFromCart(productId);
      } else if (e.target.classList.contains("quantity-btn")) {
        const isIncrease = e.target.textContent === "+";
        updateQuantity(productId, isIncrease);
      }
    });

    // Checkout button
    checkoutBtn.addEventListener("click", checkout);
  }

  // Cart functions
  function addToCart(product) {
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      });
    }

    saveCart();
    updateCart();
    showAddToCartFeedback();
  }

  function removeFromCart(productId) {
    cart = cart.filter((item) => item.id !== productId);
    saveCart();
    updateCart();
  }

  function updateQuantity(productId, isIncrease) {
    const item = cart.find((item) => item.id === productId);

    if (item) {
      if (isIncrease) {
        item.quantity += 1;
      } else {
        item.quantity = Math.max(1, item.quantity - 1);
      }
    }

    saveCart();
    updateCart();
  }

  function updateCart() {
    renderCartItems();
    updateCartTotal();
    updateCartCount();
  }

  function renderCartItems() {
    if (cart.length === 0) {
      cartItemsContainer.innerHTML =
        '<div class="empty-cart">Your cart is empty</div>';
      return;
    }

    cartItemsContainer.innerHTML = cart
      .map(
        (item) => `
            <div class="cart-item" data-id="${item.id}">
                <img src="${item.image}" alt="${
          item.title
        }" class="cart-item-image">
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.title}</h4>
                    <span class="cart-item-price">$${item.price.toFixed(
                      2
                    )}</span>
                    <div class="cart-item-actions">
                        <button class="quantity-btn">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn">+</button>
                        <button class="remove-item">Remove</button>
                    </div>
                </div>
            </div>
        `
      )
      .join("");
  }

  function updateCartTotal() {
    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    cartTotal.textContent = total.toFixed(2);
  }

  function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = count;
  }

  function toggleCart() {
    cartSidebar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("no-scroll");
  }

  function showAddToCartFeedback() {
    const feedback = document.createElement("div");
    feedback.className = "add-to-cart-feedback";
    feedback.textContent = "Added to cart!";
    document.body.appendChild(feedback);

    setTimeout(() => {
      feedback.classList.add("show");
    }, 10);

    setTimeout(() => {
      feedback.classList.remove("show");
      setTimeout(() => {
        feedback.remove();
      }, 300);
    }, 2000);
  }

  function checkout() {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    alert(
      `Checkout - Total: $${cartTotal.textContent}\nThank you for your purchase!`
    );
    cart = [];
    saveCart();
    updateCart();
    toggleCart();
  }

  // Local storage functions
  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function loadCart() {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      cart = JSON.parse(savedCart);
    }
  }

  // Initialize the application
  init();
});
