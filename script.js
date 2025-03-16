// Global variables
const API_URL = 'https://fakestoreapi.com/products';
let products = [];
let cart = [];
let currentProduct = null;

// DOM Elements
const productsContainer = document.getElementById('productsContainer');
const searchInput = document.getElementById('searchInput');
const cartCount = document.getElementById('cartCount');
const cartItemsList = document.getElementById('cartItemsList');
const cartTotal = document.getElementById('cartTotal');
const emptyCart = document.getElementById('emptyCart');
const cartItems = document.getElementById('cartItems');
const checkoutBtn = document.getElementById('checkoutBtn');
const modalProductName = document.getElementById('modalProductName');
const modalProductPrice = document.getElementById('modalProductPrice');
const modalProductImage = document.getElementById('modalProductImage');
const productQuantity = document.getElementById('productQuantity');
const decreaseQuantity = document.getElementById('decreaseQuantity');
const increaseQuantity = document.getElementById('increaseQuantity');
const addToCartBtn = document.getElementById('addToCartBtn');
const processPaymentBtn = document.getElementById('processPaymentBtn');

// Bootstrap Modal instances
const quantityModal = new bootstrap.Modal(document.getElementById('quantityModal'));
const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
const paymentModal = new bootstrap.Modal(document.getElementById('paymentModal'));

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
    setupEventListeners();
});

// Setup all event listeners
function setupEventListeners() {
    searchInput.addEventListener('input', filterProducts);
    decreaseQuantity.addEventListener('click', () => updateQuantity(-1));
    increaseQuantity.addEventListener('click', () => updateQuantity(1));
    addToCartBtn.addEventListener('click', addProductToCart);
    checkoutBtn.addEventListener('click', showPaymentModal);
    processPaymentBtn.addEventListener('click', processPayment);
}

// Fetch products from API
async function fetchProducts() {
    try {
        const response = await fetch(API_URL);
        products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        productsContainer.innerHTML = `
            <div class="col-12 text-center">
                <p class="text-danger">Error al cargar los productos. Por favor, intenta nuevamente.</p>
            </div>
        `;
    }
}

// Display products in the container
function displayProducts(productsToDisplay) {
    productsContainer.innerHTML = '';
    
    if (productsToDisplay.length === 0) {
        productsContainer.innerHTML = `
            <div class="col-12 text-center">
                <p>No se encontraron productos que coincidan con tu búsqueda.</p>
            </div>
        `;
        return;
    }
    
    productsToDisplay.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'col-md-4 col-lg-3 mb-4';
        productCard.innerHTML = `
            <div class="product-card">
                <div class="product-img-container">
                    <img src="${product.image}" alt="${product.title}" class="product-img">
                </div>
                <div class="product-info">
                    <h5 class="product-title">${product.title}</h5>
                    <p class="product-category">${product.category}</p>
                    <p class="product-price">$${product.price.toFixed(2)}</p>
                    <button class="btn btn-outline-primary add-to-cart-btn" data-product-id="${product.id}">
                        <i class="fas fa-shopping-cart me-2"></i>Añadir al carrito
                    </button>
                </div>
            </div>
        `;
        productsContainer.appendChild(productCard);
        
        // Add event listener to the Add to Cart button
        const addButton = productCard.querySelector('.add-to-cart-btn');
        addButton.addEventListener('click', () => showQuantityModal(product));
    });
}

// Filter products based on search input
function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    if (searchTerm === '') {
        displayProducts(products);
        return;
    }
    
    const filteredProducts = products.filter(product => 
        product.title.toLowerCase().includes(searchTerm) || 
        product.category.toLowerCase().includes(searchTerm)
    );
    
    displayProducts(filteredProducts);
}

// Show quantity modal when adding a product
function showQuantityModal(product) {
    currentProduct = product;
    modalProductName.textContent = product.title;
    modalProductPrice.textContent = `$${product.price.toFixed(2)}`;
    modalProductImage.src = product.image;
    productQuantity.value = 1;
    quantityModal.show();
}

// Update quantity in the modal
function updateQuantity(change) {
    const currentValue = parseInt(productQuantity.value);
    const newValue = currentValue + change;
    if (newValue >= 1) {
        productQuantity.value = newValue;
    }
}

// Add product to cart
function addProductToCart() {
    const quantity = parseInt(productQuantity.value);
    
    // Check if product already exists in cart
    const existingProduct = cart.find(item => item.id === currentProduct.id);
    
    if (existingProduct) {
        existingProduct.quantity += quantity;
    } else {
        cart.push({
            ...currentProduct,
            quantity
        });
    }
    
    // Update cart UI
    updateCartUI();
    
    // Close modal
    quantityModal.hide();
    
    // Animate cart count
    cartCount.classList.add('badge-animation');
    setTimeout(() => {
        cartCount.classList.remove('badge-animation');
    }, 500);
}

// Update cart UI
function updateCartUI() {
    // Update cart count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Enable/disable checkout button
    checkoutBtn.disabled = totalItems === 0;
    
    // Show empty cart message if cart is empty
    if (totalItems === 0) {
        emptyCart.classList.remove('d-none');
        cartItems.classList.add('d-none');
        return;
    } else {
        emptyCart.classList.add('d-none');
        cartItems.classList.remove('d-none');
    }
    
    // Update cart items list
    cartItemsList.innerHTML = '';
    
    let cartTotalValue = 0;
    
    cart.forEach(item => {
        const subtotal = item.price * item.quantity;
        cartTotalValue += subtotal;
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="cart-item-title">
                <img src="${item.image}" alt="${item.title}" class="cart-item-img">
                <span>${item.title.substring(0, 30)}${item.title.length > 30 ? '...' : ''}</span>
            </td>
            <td>$${item.price.toFixed(2)}</td>
            <td>${item.quantity}</td>
            <td>$${subtotal.toFixed(2)}</td>
            <td>
                <button class="btn-remove" data-product-id="${item.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        
        cartItemsList.appendChild(row);
        
        // Add event listener to remove button
        const removeButton = row.querySelector('.btn-remove');
        removeButton.addEventListener('click', () => removeFromCart(item.id));
    });
    
    // Update cart total
    cartTotal.textContent = `$${cartTotalValue.toFixed(2)}`;
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

// Show payment modal
function showPaymentModal() {
    cartModal.hide();
    document.getElementById('paymentForm').reset();
    paymentModal.show();
}

// Process payment and generate invoice
function processPayment() {
    // Get form data
    const fullName = document.getElementById('fullName').value;
    const cardNumber = document.getElementById('cardNumber').value;
    
    // Basic form validation
    if (!fullName || !cardNumber) {
        alert('Por favor completa todos los campos requeridos');
        return;
    }
    
    // Generate invoice PDF
    generateInvoice(fullName);
    
    // Close modal and show success message
    paymentModal.hide();
    
    // Reset cart
    cart = [];
    updateCartUI();
    
    // Show success alert
    alert('¡Pago procesado correctamente! Se ha generado tu factura.');
}

// Generate invoice PDF using jsPDF
function generateInvoice(customerName) {
    // Import jsPDF from CDN
    const { jsPDF } = window.jspdf;
    
    // Create new PDF document
    const doc = new jsPDF();
    
    // Add invoice header
    doc.setFontSize(20);
    doc.text('ShopEasy - Factura de Compra', 20, 20);
    
    // Add date
    const date = new Date().toLocaleDateString();
    doc.setFontSize(12);
    doc.text(`Fecha: ${date}`, 20, 30);
    
    // Add customer info
    doc.text(`Cliente: ${customerName}`, 20, 40);
    
    // Add invoice items
    doc.setFontSize(14);
    doc.text('Detalle de compra:', 20, 55);
    
    let y = 65;
    
    // Add table headers
    doc.setFontSize(10);
    doc.text('Producto', 20, y);
    doc.text('Precio', 120, y);
    doc.text('Cantidad', 150, y);
    doc.text('Subtotal', 180, y);
    y += 10;
    
    // Add horizontal line
    doc.line(20, y - 5, 190, y - 5);
    
    // Add cart items
    let total = 0;
    
    cart.forEach((item) => {
        const subtotal = item.price * item.quantity;
        total += subtotal;
        
        // Truncate product title if too long
        const title = item.title.length > 40 ? item.title.substring(0, 40) + '...' : item.title;
        
        doc.text(title, 20, y);
        doc.text(`$${item.price.toFixed(2)}`, 120, y);
        doc.text(`${item.quantity}`, 150, y);
        doc.text(`$${subtotal.toFixed(2)}`, 180, y);
        
        y += 10;
        
        // Add new page if needed
        if (y > 270) {
            doc.addPage();
            y = 20;
        }
    });
    
    // Add horizontal line
    doc.line(20, y, 190, y);
    y += 10;
    
    // Add total
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text(`Total: $${total.toFixed(2)}`, 150, y);
    
    // Add footer
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text('Gracias por tu compra en ShopEasy', 20, y + 20);
    
    // Save PDF
    doc.save('ShopEasy-Factura.pdf');
}
