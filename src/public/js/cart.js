// Function to update cart count badge
function updateCartCount() {
    fetch('/api/marketplace/cart')
        .then(response => response.json())
        .then(data => {
            const cartCount = document.querySelector('.cart-count');
            if (cartCount) {
                const totalItems = data.items.reduce((sum, item) => sum + item.quantity, 0);
                cartCount.textContent = totalItems;
                cartCount.style.display = totalItems > 0 ? 'inline' : 'none';
            }
        })
        .catch(error => console.error('Error fetching cart:', error));
}

// Update cart count when page loads
document.addEventListener('DOMContentLoaded', updateCartCount);

// Function to add item to cart
function addToCart(productId) {
    fetch('/api/marketplace/cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productId, quantity: 1 })
    })
    .then(response => response.json())
    .then(data => {
        updateCartCount();
        // Show success message
        alert('Item added to cart!');
    })
    .catch(error => {
        console.error('Error adding to cart:', error);
        alert('Error adding item to cart. Please try again.');
    });
}

// Function to update item quantity
function updateQuantity(productId, quantity) {
    fetch(`/api/marketplace/cart/${productId}/quantity`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ quantity })
    })
    .then(response => response.json())
    .then(data => {
        updateCartCount();
        // Refresh cart page if on cart page
        if (window.location.pathname === '/cart') {
            window.location.reload();
        }
    })
    .catch(error => {
        console.error('Error updating quantity:', error);
        alert('Error updating quantity. Please try again.');
    });
}

// Function to remove item from cart
function removeFromCart(productId) {
    if (confirm('Are you sure you want to remove this item from your cart?')) {
        fetch(`/api/marketplace/cart/${productId}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            updateCartCount();
            // Refresh cart page if on cart page
            if (window.location.pathname === '/cart') {
                window.location.reload();
            }
        })
        .catch(error => {
            console.error('Error removing from cart:', error);
            alert('Error removing item from cart. Please try again.');
        });
    }
}

// Function to handle checkout
function checkout() {
    fetch('/api/marketplace/checkout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Order placed successfully!');
            window.location.href = '/orders'; // Redirect to orders page
        } else {
            throw new Error(data.message || 'Checkout failed');
        }
    })
    .catch(error => {
        console.error('Error during checkout:', error);
        alert('Error during checkout. Please try again.');
    });
} 