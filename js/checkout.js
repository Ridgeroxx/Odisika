let cart = [];
const checkoutItemsContainer = document.getElementById('checkout-items');

// Function to display checkout items
function displayCheckoutItems() {
    checkoutItemsContainer.innerHTML = '';
    let totalPrice = 0;

    if (cart.length === 0) {
        alert('Your cart is empty. Please add items to your cart before proceeding to checkout.');
        window.location.href = 'cart.html';
        return;
    }

    cart.forEach((item) => {
        const itemPrice = parseFloat(item.price);
        const itemQuantity = parseInt(item.quantity);
        const itemTotalPrice = itemPrice * itemQuantity;
        totalPrice += itemTotalPrice;

        const checkoutItem = document.createElement('div');
        checkoutItem.className = 'checkout-item';
        checkoutItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p class="price">₵${itemTotalPrice.toFixed(2)}</p>
        `;
        checkoutItemsContainer.appendChild(checkoutItem);
    });
}

document.getElementById('payment-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const location = document.getElementById('location').value.trim();
    const paymentOption = document.querySelector('input[name="payment"]:checked').value;
    
    // Validate form
    if (!name || !email || !phone || !location) {
        alert('Please fill in all fields.');
        return;
    }

    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    if (!validatePhone(phone)) {
        alert('Please enter a valid phone number.');
        return;
    }
    
    // Simulate payment prompt
    showPaymentPrompt();

    document.getElementById('confirm-payment-btn').addEventListener('click', function() {
        // Simulate confirmation of payment
        processPayment(paymentOption)
            .then(response => {
                if (response.success) {
                    // Send order details to admin
                    sendOrderDetailsToAdmin({ name, email, phone, location, paymentOption })
                        .then(() => {
                            showThankYouMessage();
                        })
                        .catch(error => {
                            alert('Failed to send order details to the admin. Please try again.');
                        });
                } else {
                    alert('Payment failed. Please check your credentials and try again.');
                }
            })
            .catch(error => {
                alert('Payment failed. Please try again.');
            });
    });
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function validatePhone(phone) {
    const re = /^[0-9]{10}$/;
    return re.test(String(phone));
}

function showPaymentPrompt() {
    const paymentPrompt = document.getElementById('payment-prompt');
    paymentPrompt.style.display = 'flex';
}

function showThankYouMessage() {
    const paymentPrompt = document.getElementById('payment-prompt');
    paymentPrompt.style.display = 'none';
    const thankYou = document.getElementById('thank-you');
    thankYou.style.display = 'flex';
}

function processPayment(paymentOption) {
    return new Promise((resolve) => {
        // Simulate payment processing delay
        setTimeout(() => {
            // Simulate success response
            resolve({ success: true });
        }, 2000);
    });
}

function sendOrderDetailsToAdmin(orderDetails) {
    return new Promise((resolve, reject) => {
        // Simulate sending order details to admin (replace with actual implementation)
        console.log('Sending order details to admin:', orderDetails);
        setTimeout(() => {
            resolve();
        }, 1000);
    });
}

function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        displayCheckoutItems();
    } else {
        alert('Your cart is empty. Please add items to your cart before proceeding to checkout.');
        window.location.href = 'cart.html';
    }
}

window.onload = loadCart;
