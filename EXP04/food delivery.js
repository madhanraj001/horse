let cart = [];
let total = 0;

function addToCart(itemName, itemPrice) {
    // Add item to cart
    cart.push({ name: itemName, price: itemPrice });
    total += itemPrice;

    // Update cart display
    updateCart();
}

function updateCart() {
    const cartItemsElement = document.getElementById('cartItems');
    cartItemsElement.innerHTML = ''; // Clear previous items

    // Display each item in the cart
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price}`;
        cartItemsElement.appendChild(li);
    });

    // Update total price
    document.getElementById('totalPrice').textContent = total.toFixed(2);
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
    } else {
        alert(`Thank you for your order!\nTotal: $${total.toFixed(2)}`);
        // Reset cart
        cart = [];
        total = 0;
        updateCart();
    }
}
