let cart = normalizeCart(JSON.parse(localStorage.getItem('cart')) || []);
persistCart();

function normalizeCart(rawCart) {
    const source = Array.isArray(rawCart) ? rawCart : [];
    const merged = [];
    source.forEach((item) => {
        if (!item || typeof item !== 'object') return;
        const qty = Math.max(1, Number(item.quantity) || 1);
        const existing = merged.find((entry) => entry.id === item.id && entry.type === item.type);
        if (existing) {
            existing.quantity += qty;
            existing.timestamp = Math.max(existing.timestamp || 0, item.timestamp || 0);
            return;
        }
        merged.push({ ...item, quantity: qty });
    });
    return merged;
}

function persistCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(productId, type, options = {}) { // type = 'buy' or 'rent'
    const product = window.products.find(p => p.id === productId);
    if (!product) return;
    const quantityToAdd = Math.max(1, Number(options.quantity) || 1);

    const item = {
        ...product,
        type: type,
        price: type === 'buy' ? product.buyPrice : product.rentPrice,
        quantity: quantityToAdd,
        color: options.color || 'Natural Black',
        timestamp: Date.now()
    };

    const existing = cart.find((entry) => entry.id === item.id && entry.type === item.type && (entry.color || 'Natural Black') === item.color);
    if (existing) {
        existing.quantity += quantityToAdd;
        existing.timestamp = Date.now();
    } else {
        cart.push(item);
    }
    persistCart();
    if (!options.silent) {
        alert(`${quantityToAdd} x ${product.name} added to cart as ${type.toUpperCase()}!`);
    }
    updateCartCount();
}

function updateCartCount() {
    const countEl = document.getElementById('cart-count');
    if (countEl) countEl.textContent = String(cart.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0));
}

function getCart() {
    cart = normalizeCart(JSON.parse(localStorage.getItem('cart')) || []);
    persistCart();
    return cart;
}

function clearCart() {
    cart = [];
    localStorage.removeItem('cart');
}

// Export functions
window.addToCart = addToCart;
window.getCart = getCart;
window.clearCart = clearCart;