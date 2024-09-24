let cart = [];
let totalPrice = 0;

function addToCart(dishName, price) {
    const existingDish = cart.find(item => item.dishName === dishName);
    if (existingDish) {
        existingDish.quantity++;
    } else {
        cart.push({ dishName, price, quantity: 1 });
    }
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';
    totalPrice = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = ${item.dishName} - $${item.price} x ${item.quantity};
        
        // Remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = () => removeFromCart(item.dishName);
        li.appendChild(removeButton);
        
        cartItems.appendChild(li);
        totalPrice += item.price * item.quantity;
    });

    document.getElementById('totalPrice').textContent = totalPrice;
}

function removeFromCart(dishName) {
    cart = cart.filter(item => item.dishName !== dishName);
    updateCart();
}

function checkout() {
    alert(Your total is $${totalPrice}. Thank you for your order!);
    cart = [];
    updateCart();
}
