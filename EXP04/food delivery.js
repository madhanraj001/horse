let cart = [];
let total = 0;

function addToCart(itemName, itemPrice, quantity) {
    quantity = parseInt(quantity);
    if (quantity > 0) {
        // Check if item already exists in the cart
        const existingItem = cart.find(item => item.name === itemName);
        if (existingItem) {
            existingItem.quantity += quantity; // Update quantity
            existingItem.totalPrice += itemPrice * quantity; // Update total price
        } else {
            // Add new item to cart
            cart.push({ name: itemName, price: itemPrice, quantity, totalPrice: itemPrice * quantity });
        }
        total += itemPrice * quantity; // Update overall total
        updateCart();
        // Reset quantity input
        document.querySelector(`#${itemName.toLowerCase()}Qty`).value = 0;
    } else {
        alert('Please enter a valid quantity.');
    }
}

function updateCart() {
    const cartItemsElement = document.getElementById('cartItems');
    cartItemsElement.innerHTML = ''; // Clear previous items

    // Display each item in the cart
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price} x ${item.quantity} = $${item.totalPrice.toFixed(2)}`;
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
