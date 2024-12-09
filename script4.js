const products = [
   
    { id: 1, name: "Samsung Galaxy", price: 20000, category: "smartphones", image: "img/1111.jpg" },
    { id: 2, name: "iPhone 12", price: 30000, category: "smartphones", image: "img/apple_iphone_12.jpg" },
    { id: 3, name: "Xiaomi Redmi", price: 15000, category: "smartphones", image: "img/redmi.webp" },
    { id: 4, name: "Huawei P30", price: 18000, category: "smartphones", image: "img/HUAWEI1.jpg" },
   
    { id: 5, name: "Ноутбук ASUS", price: 25000, category: "laptops", image: "img/Dell.jpg" },
    { id: 6, name: "Ноутбук Dell", price: 30000, category: "laptops", image: "img/macbookair.png" },
    { id: 7, name: "Ноутбук HP", price: 35000, category: "laptops", image: "img/HP.jpg" },
    { id: 8, name: "Ноутбук Lenovo", price: 28000, category: "laptops", image: "img/lenovo.webp" },
  
    { id: 9, name: "Телевізор LG", price: 40000, category: "tv", image: "img/LG.jpg" },
    { id: 10, name: "Телевізор Samsung", price: 45000, category: "tv", image: "img/samsungTV.jpg" },
    { id: 11, name: "Телевізор Sony", price: 50000, category: "tv", image: "img/sony.jpg" },
    { id: 12, name: "Телевізор Panasonic", price: 47000, category: "tv", image: "img/PH.jpg" },
];

let cart = [];


function renderProducts() {
    const categories = {
        smartphones: document.getElementById('smartphones-list'),
        laptops: document.getElementById('laptops-list'),
        tv: document.getElementById('tv-list'),
    };

    Object.keys(categories).forEach(category => {
        const categoryContainer = categories[category];
        categoryContainer.innerHTML = '';

        products
            .filter(product => product.category === category)
            .forEach(product => {
                const productItem = document.createElement('div');
                productItem.className = 'product-item';
                productItem.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>${product.price} грн</p>
                    <button class="btn" onclick="confirmAddToCart(${product.id})">Додати в кошик</button>
                `;
                categoryContainer.appendChild(productItem);
            });
    });
}


function searchProducts() {
    const searchValue = document.getElementById('search-input').value.toLowerCase();
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchValue)
    );
    renderSearchResults(filteredProducts);
}

function renderSearchResults(filteredProducts) {
    const productList = document.getElementById('smartphones-list');
    productList.innerHTML = '';
    filteredProducts.forEach(product => {
        const productItem = document.createElement('div');
        productItem.className = 'product-item';
        productItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.price} грн</p>
            <button class="btn" onclick="confirmAddToCart(${product.id})">Додати в кошик</button>
        `;
        productList.appendChild(productItem);
    });
}

let cart = JSON.parse(localStorage.getItem('cart')) || []; 


function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity += 1; 
    } else {
        cart.push({ ...product, quantity: 1 }); 
    }

    localStorage.setItem('cart', JSON.stringify(cart)); 
    updateCart(); 
    alert(`"${product.name}" додано до кошика!`);
}


function updateCart() {
    const cartList = document.getElementById('cart-list');
    const cartTotal = document.getElementById('cart-total');

    cartList.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const cartItem = document.createElement('li');
        cartItem.textContent = `${item.name} - ${item.price} грн x ${item.quantity}`;
        cartList.appendChild(cartItem);

        total += item.price * item.quantity;
    });

    cartTotal.textContent = `Загальна сума: ${total} грн`;
}


function clearCart() {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart)); 
    updateCart();
    alert('Кошик очищено!');
}


document.addEventListener('DOMContentLoaded', updateCart);


function updateCart() {
    const cartList = document.getElementById('cart-list');
    const cartTotal = document.getElementById('cart-total');

    cartList.innerHTML = ''; 
    let total = 0;

    cart.forEach(product => {
        const cartItem = document.createElement('li');
        cartItem.textContent = `${product.name} - ${product.price} грн`;
        cartList.appendChild(cartItem);
        total += product.price;
    });

    cartTotal.textContent = `Загальна сума: ${total} грн`;
}




function confirmAddToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (confirm(`Додати "${product.name}" до кошика?`)) {
        cart.push(product);
        alert(`"${product.name}" додано до кошика!`);
        updateCart(); 
    }
}
