let cart = [];
const cartItemsContainer = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');

// Function to display cart items
function displayCartItems() {
    cartItemsContainer.innerHTML = '';
    let totalPrice = 0;

    cart.forEach((item, index) => {
        const itemPrice = parseFloat(item.price);
        const itemQuantity = parseInt(item.quantity);
        const itemTotalPrice = itemPrice * itemQuantity;
        totalPrice += itemTotalPrice;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <div class="quantity">
                <button class="decrease" onclick="changeQuantity(${index}, -1)">-</button>
                <input type="number" value="${itemQuantity}" min="1" onchange="updateQuantity(${index}, this.value)">
                <button class="increase" onclick="changeQuantity(${index}, 1)">+</button>
            </div>
            <p class="price">₵${itemTotalPrice.toFixed(2)}</p>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    totalPriceElement.textContent = totalPrice.toFixed(2);
    updateCartCount();
}

// Function to change item quantity
function changeQuantity(index, delta) {
    const newQuantity = cart[index].quantity + delta;
    if (newQuantity > 0) {
        cart[index].quantity = newQuantity;
        saveCart();
        displayCartItems();
    }
}

// Function to update item quantity from input field
function updateQuantity(index, quantity) {
    quantity = parseInt(quantity);
    if (quantity > 0) {
        cart[index].quantity = quantity;
        saveCart();
        displayCartItems();
    }
}

function removeFromCart(index) {
    const cartItemElement = cartItemsContainer.children[index];
    cartItemElement.classList.add('removing');
    setTimeout(() => {
        cart.splice(index, 1);
        saveCart();
        displayCartItems();
    }, 300);
}


// Function to update cart count
function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartIcon = document.getElementById('cart-icon');
    if (cartIcon) {
        cartIcon.setAttribute('data-count', cartCount);
    }
}

// Function to save cart to local storage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to load cart from local storage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        cart.forEach(item => {
            item.price = parseFloat(item.price);
            item.quantity = parseInt(item.quantity);
        });
        displayCartItems();
    } else {
        updateCartCount();
    }
}

window.onload = loadCart;
