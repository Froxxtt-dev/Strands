document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    setActiveBottomNav();
    initSearch();
    initLikes();
    initHomeTopSearch();
    initLikedDrawer();
});

function setActiveBottomNav() {
    let current = window.location.pathname.split('/').pop() || 'index.html';
    if (!current || current === '') current = 'index.html';

    document.querySelectorAll('.bottom-nav a[href]').forEach((link) => {
        const href = link.getAttribute('href');
        if (href === current) link.classList.add('active');
    });
}

function initSearch() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;

    const emptyMsg = document.getElementById('search-empty');

    const run = () => {
        const term = searchInput.value.toLowerCase().trim();
        const tiles = document.querySelectorAll('.shop-tile, .product-card');
        tiles.forEach((card) => {
            const blob =
                (card.dataset.search || '') ||
                [
                    card.querySelector('h3')?.textContent,
                    card.querySelector('.product-desc')?.textContent,
                    card.querySelector('.shop-tile-name')?.textContent,
                ]
                    .filter(Boolean)
                    .join(' ')
                    .toLowerCase();
            card.style.display = !term || blob.includes(term) ? '' : 'none';
        });

        if (!emptyMsg) return;
        if (!term) {
            emptyMsg.textContent = '';
            emptyMsg.classList.add('visually-hidden');
            emptyMsg.style.cssText = '';
            return;
        }
        const anyVisible = [...tiles].some((c) => c.style.display !== 'none');
        if (!anyVisible) {
            emptyMsg.textContent =
                'No wigs match your search. Try “lace”, “curly”, “bob”, or “straight”.';
            emptyMsg.classList.remove('visually-hidden');
            emptyMsg.style.cssText =
                'text-align:center;color:#888;margin-top:1rem;font-size:0.95rem;';
        } else {
            emptyMsg.textContent = '';
            emptyMsg.classList.add('visually-hidden');
            emptyMsg.style.cssText = '';
        }
    };

    searchInput.addEventListener('input', run);
    searchInput.addEventListener('search', run);
}

function updateCartCount() {
    const countEl = document.getElementById('cart-count');
    if (countEl) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        countEl.textContent = String(cart.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0));
    }
}

function getLikedIds() {
    try {
        return JSON.parse(localStorage.getItem('likedProducts')) || [];
    } catch (e) {
        return [];
    }
}

function setLikedIds(ids) {
    localStorage.setItem('likedProducts', JSON.stringify(ids));
}

function isLiked(productId) {
    return getLikedIds().includes(Number(productId));
}

function toggleLike(productId) {
    const id = Number(productId);
    const liked = getLikedIds();
    const next = liked.includes(id) ? liked.filter((x) => x !== id) : [...liked, id];
    setLikedIds(next);
    syncLikeButtons();
    updateLikeCount();
    renderLikedDrawer();
}

function syncLikeButtons() {
    document.querySelectorAll('.like-btn[data-id]').forEach((btn) => {
        const liked = isLiked(btn.dataset.id);
        btn.classList.toggle('is-liked', liked);
        btn.innerHTML = liked ? '&#10084;' : '&#9825;';
        btn.setAttribute('aria-label', liked ? 'Unlike this wig' : 'Like this wig');
    });
}

function updateLikeCount() {
    const count = getLikedIds().length;
    const countEl = document.getElementById('like-count');
    if (countEl) countEl.textContent = String(count);
}

function initLikes() {
    document.addEventListener('click', (e) => {
        const target = e.target.closest('.like-btn[data-id]');
        if (!target) return;
        e.preventDefault();
        e.stopPropagation();
        toggleLike(target.dataset.id);
    });
    syncLikeButtons();
    updateLikeCount();
}

function initHomeTopSearch() {
    const toggle = document.getElementById('top-search-toggle');
    const wrap = document.getElementById('top-search-wrap');
    const input = document.getElementById('home-search-input');
    if (!toggle || !wrap || !input) return;

    toggle.addEventListener('click', () => {
        const open = wrap.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        if (open) input.focus();
    });

    input.addEventListener('input', () => {
        const term = input.value.toLowerCase().trim();
        document.querySelectorAll('#featured-track .featured-slide').forEach((card) => {
            const blob = (card.dataset.search || '').toLowerCase();
            card.style.display = !term || blob.includes(term) ? '' : 'none';
        });
    });
}

function renderLikedDrawer() {
    const list = document.getElementById('liked-list');
    if (!list || !window.products) return;
    const liked = getLikedIds();
    if (!liked.length) {
        list.innerHTML = '<p class="liked-empty">No liked wigs yet.</p>';
        return;
    }
    const likedProducts = window.products.filter((p) => liked.includes(p.id));
    list.innerHTML = likedProducts
        .map(
            (p) => `
            <article class="liked-item">
                <img src="${p.images[0]}" alt="${p.name}">
                <div>
                    <h4>${p.name}</h4>
                    <button type="button" class="liked-open" data-like-open="${p.id}">View in shop</button>
                </div>
            </article>
        `
        )
        .join('');
}

function initLikedDrawer() {
    const toggle = document.getElementById('liked-toggle');
    const close = document.getElementById('liked-close');
    const drawer = document.getElementById('liked-drawer');
    if (!toggle || !drawer) return;

    const setOpen = (open) => {
        drawer.hidden = false;
        drawer.classList.toggle('is-open', open);
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        if (!open) {
            setTimeout(() => {
                if (!drawer.classList.contains('is-open')) drawer.hidden = true;
            }, 260);
        }
    };

    toggle.addEventListener('click', () => {
        const open = !drawer.classList.contains('is-open');
        renderLikedDrawer();
        setOpen(open);
    });

    close?.addEventListener('click', () => setOpen(false));
    document.addEventListener('click', (e) => {
        const openLink = e.target.closest('[data-like-open]');
        if (openLink) {
            const id = openLink.getAttribute('data-like-open');
            window.location.href = `shop.html#product-${id}`;
            return;
        }
        if (!drawer.classList.contains('is-open')) return;
        if (!drawer.contains(e.target) && !e.target.closest('#liked-toggle')) setOpen(false);
    });
}

window.toggleLike = toggleLike;
window.getLikedIds = getLikedIds;

document.addEventListener('DOMContentLoaded', () => {
    const current = window.location.pathname.split('/').pop() || 'index.html';
    const map = {
        'index.html': 'tab-home',
        'shop.html': 'tab-shop',
        'checkout.html': 'tab-cart',
        'support.html': 'tab-support'
    };
    if (map[current]) {
        document.getElementById(map[current]).classList.add('active');
    }

    // Update cart count
    const countEl = document.getElementById('cart-count-tab');
    if (countEl) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        countEl.textContent = String(cart.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0));
    }
});