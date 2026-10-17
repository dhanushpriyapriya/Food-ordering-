// ===============================
// FOOD ORDERING WEBSITE JAVASCRIPT
// ===============================

let cart = [];
let total = 0;
let itemCount = 0;

// Add item to cart
function addToCartWithQty(button, foodName, price) {

    const card = button.parentElement;
    const qtyElement = card.querySelector('.qty');
    const quantity = parseInt(qtyElement.textContent);

    const itemTotal = quantity * price;

    cart.push({
        name: foodName,
        quantity: quantity,
        price: price,
        total: itemTotal
    });

    total += itemTotal;
    itemCount += quantity;

    updateCart();

    showNotification(`🍽️ ${foodName} added to cart`);
}

// Update cart
function updateCart() {

    const cartItems = document.getElementById('cart-items');

    cartItems.innerHTML = '';

    cart.forEach((item, index) => {

        const li = document.createElement('li');

        li.innerHTML = `
            <div>
                <strong>${item.name}</strong><br>
                Qty: ${item.quantity}
            </div>

            <div>
                ₹${item.total}
                <button class="remove-btn" onclick="removeItem(${index})">❌</button>
            </div>
        `;

        cartItems.appendChild(li);
    });

    updateSummary();
}

// Remove item
function removeItem(index) {

    const item = cart[index];

    total -= item.total;
    itemCount -= item.quantity;

    cart.splice(index, 1);

    updateCart();

    showNotification('🗑️ Item removed');
}

// Change quantity
function changeQuantity(button, change) {

    const qtySpan = button.parentElement.querySelector('.qty');

    let quantity = parseInt(qtySpan.textContent);

    quantity += change;

    if (quantity < 1) {
        quantity = 1;
    }

    qtySpan.textContent = quantity;
}

// Update summary
function updateSummary() {

    document.getElementById('total').textContent = total;
    document.getElementById('itemCount').textContent = itemCount;
    document.getElementById('subtotal').textContent = total;

    const deliveryCharge = total > 0 ? 40 : 0;

    document.getElementById('delivery').textContent = deliveryCharge;
    document.getElementById('grandTotal').textContent = total + deliveryCharge;
}

// Search food
function searchFood() {

    const input = document.getElementById('searchInput').value.toLowerCase();

    const cards = document.querySelectorAll('.food-card');

    cards.forEach(card => {

        const title = card.querySelector('h2').textContent.toLowerCase();

        card.style.display = title.includes(input) ? 'block' : 'none';
    });
}

// Favorite button
function toggleFavorite(button) {

    if (button.textContent === '🤍') {
        button.textContent = '❤️';
        showNotification('❤️ Added to favorites');
    } else {
        button.textContent = '🤍';
        showNotification('🤍 Removed from favorites');
    }
}

// Place order
function placeOrder() {

    if (cart.length === 0) {
        alert('🛒 Your cart is empty!');
        return;
    }

    let message = '🎉 ORDER PLACED SUCCESSFULLY!\\n\\n';

    cart.forEach(item => {
        message += `${item.name} × ${item.quantity} = ₹${item.total}\\n`;
    });

    const delivery = total > 0 ? 40 : 0;
    const grandTotal = total + delivery;

    message += `\\n🧾 Subtotal: ₹${total}`;
    message += `\\n🚚 Delivery: ₹${delivery}`;
    message += `\\n💰 Grand Total: ₹${grandTotal}`;
    message += '\\n\\n💳 Payment Successful';

    alert(message);

    cart = [];
    total = 0;
    itemCount = 0;

    updateCart();

    showNotification('✅ Thank you for your order!');
}

// Dark mode
function toggleDarkMode() {

    document.body.classList.toggle('dark');

    if (document.body.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
}

// Toast notification
function showNotification(message) {

    const toast = document.createElement('div');

    toast.textContent = message;

    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.right = '20px';
    toast.style.background = 'linear-gradient(135deg,#00b09b,#00d4ff)';
    toast.style.color = 'white';
    toast.style.padding = '14px 20px';
    toast.style.borderRadius = '12px';
    toast.style.fontWeight = '600';
    toast.style.boxShadow = '0 6px 15px rgba(0,0,0,0.2)';
    toast.style.zIndex = '9999';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    toast.style.transition = 'all 0.3s ease';

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
    }, 100);

    setTimeout(() => {

        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';

        setTimeout(() => {
            toast.remove();
        }, 300);

    }, 2500);
}

// Load page
window.onload = function () {

    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
    }

    updateSummary();

    console.log('🍔 Food Ordering Website Loaded Successfully');
};