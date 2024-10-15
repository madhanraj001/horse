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

function submitOrder() {
    if (cart.length === 0) {
        alert('Your cart is empty! please add items to the cart before submitting.');
    } else {
        let orderSummary = 'your order details:\n';
        cart.forEach(item =>{
            orderSummary +=`${item.name} - Quantity: ${item.quantity}, Total: $${item.totalprice.tofixed(2)}\n`;
        });
        orderSummary += `grand total: $${total.tofixed(2)}`;
        alert(orderSummary);
        // Reset cart
        cart = [];
        total = 0;
        updateCart();
    }
}
