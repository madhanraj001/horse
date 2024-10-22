let products = [];
let loggedInUser = null;

// Load users and products from localStorage
if (localStorage.getItem('users')) {
    loggedInUser = JSON.parse(localStorage.getItem('users')).find(user => user.loggedIn);
}

if (localStorage.getItem('products')) {
    products = JSON.parse(localStorage.getItem('products'));
}

// Register user
document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('User registered successfully!');
    document.getElementById('register-form').reset();
});

// Login user
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const users = JSON.parse(localStorage.getItem('users'));
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        loggedInUser = user;
        user.loggedIn = true;
        localStorage.setItem('users', JSON.stringify(users));
        alert('Login successful!');
        document.getElementById('auth-section').style.display = 'none';
        document.getElementById('product-section').style.display = 'block';
        displayProducts();
    } else {
        alert('Invalid credentials');
    }
});

// Add product
document.getElementById('product-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('product-title').value;
    const description = document.getElementById('product-description').value;
    const price = document.getElementById('product-price').value;
    const category = document.getElementById('product-category').value;

    const product = { id: Date.now(), title, description, price, category };
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
    displayProducts();
    document.getElementById('product-form').reset();
});

// Display products
function displayProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.forEach((product) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div>
                <strong>${product.title}</strong> <br>
                ${product.description} <br>
                Price: $${product.price} | Category: ${product.category}
            </div>
            <div>
                <button class="edit-button" onclick="editProduct(${product.id})">Edit</button>
                <button class="delete-button" onclick="deleteProduct(${product.id})">Delete</button>
            </div>
        `;
        productList.appendChild(li);
    });
}

// Edit product
function editProduct(id) {
    const product = products.find(p => p.id === id);
    if (product) {
        document.getElementById('product-title').value = product.title;
        document.getElementById('product-description').value = product.description;
        document.getElementById('product-price').value = product.price;
        document.getElementById('product-category').value = product.category;
        
        deleteProduct(id); // Remove the product before re-adding it
    }
}

// Delete product
function deleteProduct(id) {
    products = products.filter(p => p.id !== id);
    localStorage.setItem('products', JSON.stringify(products));
    displayProducts();
}

// Search products
function searchProducts() {
    const searchValue = document.getElementById('search').value.toLowerCase();
    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchValue) || 
        product.description.toLowerCase().includes(searchValue)
    );
    
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    filteredProducts.forEach((product) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div>
                <strong>${product.title}</strong> <br>
                ${product.description} <br>
                Price: $${product.price} | Category: ${product.category}
            </div>
            <div>
                <button class="edit-button" onclick="editProduct(${product.id})">Edit</button>
                <button class="delete-button" onclick="deleteProduct(${product.id})">Delete</button>
            </div>
        `;
        productList.appendChild(li);
    });
}
