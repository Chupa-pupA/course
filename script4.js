const products = [
    { id: 1, name: "Samsung Galaxy", price: 20000, image: "img/1111.jpg", category: "smartphones" },
    { id: 2, name: "iPhone 12", price: 30000, image: "img/apple_iphone_12.jpg", category: "smartphones" },
    { id: 3, name: "Xiaomi Redmi", price: 15000, image: "img/redmi.webp", category: "smartphones" },
    { id: 4, name: "Huawei P30", price: 18000, image: "img/HUAWEI1.jpg", category: "smartphones" },
    { id: 5, name: "Ноутбук ASUS", price: 25000, image: "img/Dell.jpg", category: "laptops" },
    { id: 6, name: "Ноутбук Dell", price: 30000, image: "img/macbookair.png", category: "laptops" },
    { id: 7, name: "Ноутбук HP", price: 35000, image: "img/HP.jpg", category: "laptops" },
    { id: 8, name: "Ноутбук Lenovo", price: 28000, image: "img/lenovo.webp", category: "laptops" },
    { id: 9, name: "Телевізор LG", price: 40000, image: "img/LG.jpg", category: "tv" },
    { id: 10, name: "Телевізор Samsung", price: 45000, image: "img/samsungTV.jpg", category: "tv" },
    { id: 11, name: "Телевізор Sony", price: 50000, image: "img/sony.jpg", category: "tv" },
    { id: 12, name: "Телевізор Panasonic", price: 47000, image: "img/PH.jpg", category: "tv" }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function renderProducts() {
    const categories = {
        smartphones: document.getElementById('smartphones-list'),
        laptops: document.getElementById('laptops-list'),
        tv: document.getElementById('tv-list'),
        tablets: document.getElementById('tablets-list')
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
                    <button class="btn" onclick="addToCart(${product.id})">Додати до кошика</button>
                `;
                categoryContainer.appendChild(productItem);
            });
    });
}

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
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    cartList.innerHTML = ''; 
    let total = 0;

    cart.forEach(item => {
        const cartItem = document.createElement('li');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <span class="cart-item-name">${item.name}</span>
            <span class="cart-item-price">${item.price} грн</span>
            <span class="cart-item-quantity">Кількість: ${item.quantity}</span>
        `;
        cartList.appendChild(cartItem);
        total += item.price * item.quantity;
    });

    cartTotal.textContent = `Загальна сума: ${total} грн`;
}



function renderCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartList = document.getElementById("cart-list");
    const cartTotal = document.getElementById("cart-total");
    cartList.innerHTML = ""; 
    let total = 0;

    cart.forEach(item => {
        const cartItem = document.createElement("li");
        cartItem.textContent = ${item.name} - ${item.price} грн x ${item.quantity};
        cartList.appendChild(cartItem);
        total += item.price * item.quantity; 
    });

    cartTotal.textContent = Загальна сума: ${total} грн; 
}


function clearCart() {
    localStorage.removeItem('cart');
    updateCart();
    alert('Кошик очищено!');
}

document.addEventListener('DOMContentLoaded', () => {
    updateCart(); 
});


function clearCart() {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart)); 
    updateCart();
    alert('Кошик очищено!');
}

document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCart();
});
