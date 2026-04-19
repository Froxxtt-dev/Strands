
const products = [
    {
        id: 1,
        name: 'Brazilian Body Wave Lace Front',
        description: '18″ virgin Brazilian body wave, transparent lace front, pre-plucked hairline. Natural density, heat-safe styling.',
        keywords: 'brazilian body wave lace front curly human virgin',
        images: [
            'https://goodpappa.com/wp-content/uploads/2024/08/S0ead35f87d1947f180c523856b5d069dT-1-600x600-1.jpg',
            'https://m.media-amazon.com/images/I/71I9CzYqciL._AC_UF1000,1000_QL80_.jpg',
            'https://i.ebayimg.com/images/g/WpkAAOSwSntjqO75/s-l1200.jpg'
        ],
        rating: 4.9,
        buyPrice: 1250,
        rentPrice: 180,
        rentDays: '3 days',
    },
    {
        id: 2,
        name: 'Indian Straight 360 Lace',
        description: 'Silky Indian straight bundles on a 360 lace band. Versatile updos, middle or side part. Medium brown lace.',
        keywords: 'indian straight 360 lace silky bundles',
        images: [
            'https://www.bestlacewigs.com/media/catalog/product/cache/2283775ee1fa61e33225f66e3d787912/s/s/ss-2_7.jpg',
            'https://image.made-in-china.com/202f0j00POuTFcVMnWrB/Natural-Black-Dyeable-Soft-Women-Hair-Accessories-Remy-Brazilian-Indian-Human-Hair-Kinky-Straight-360-Lace-Frontal-Closure.jpg',
            'https://m.media-amazon.com/images/I/61MfB767zdL.jpg'
        ],
        rating: 4.7,
        buyPrice: 1450,
        rentPrice: 220,
        rentDays: '3 days',
    },
    {
        id: 3,
        name: 'Curly Bob Wig',
        description: 'Shoulder-length curly bob with tight coils. Lightweight cap, breathable mesh—ideal for events and weekends.',
        keywords: 'ghana curly bob coil short african',
        images: [
            'https://m.media-amazon.com/images/I/51-aYbjvKHL._SL500_.jpg',
            'https://i.ebayimg.com/images/g/c3EAAOSwo~9m0CJH/s-l400.jpg',
            'https://goodpappa.com/wp-content/uploads/2024/08/S61313d0290054c72bb2a601ce18ccb17J-600x600-1.jpg'
        ],
        rating: 4.8,
        buyPrice: 950,
        rentPrice: 150,
        rentDays: '3 days',
    },
    {
        id: 4,
        name: 'Luxury Deep Wave 24″',
        description: 'Long deep wave texture, full volume. Double-wefted cap for durability. Glam look for photoshoots and parties.',
        keywords: 'deep wave long 24 inch volume glam',
        images: [
            'https://m.media-amazon.com/images/I/71CNYlgLbeL._AC_UF894,1000_QL80_.jpg',
            'https://m.media-amazon.com/images/I/91Csq8JiA2L._AC_UF1000,1000_QL80_.jpg',
            'https://m.media-amazon.com/images/I/715WG7dUO+L._AC_UF1000,1000_QL80_.jpg'
        ],
        rating: 5.0,
        buyPrice: 1680,
        rentPrice: 250,
        rentDays: '3 days',
    },
    {
        id: 5,
        name: 'Jet Black Straight Human Hair',
        description: 'Classic 1B straight cut, blunt ends. Glueless install friendly. Low maintenance for daily wear or office.',
        keywords: 'black straight jet human classic blunt',
        images: [
            'https://www.nanavirginhair.com/cdn/shop/files/Raw_Hair_Jet_Black_Straight_frontal_wig.jpg?v=1740212552&width=2048',
            'https://m.media-amazon.com/images/I/71PS2sU397L._AC_UF1000,1000_QL80_.jpg',
            'https://www.nanavirginhair.com/cdn/shop/files/jet_black_straight_wig_8.jpg?v=1740381298&width=2048'
        ],
        rating: 4.6,
        buyPrice: 1100,
        rentPrice: 160,
        rentDays: '3 days',
    },
    {
        id: 6,
        name: 'Honey Blonde Balayage Lace',
        description: 'Hand-painted honey and caramel tones on a lace front. Rooted for realism. Perfect for summer events.',
        keywords: 'blonde balayage honey lace caramel summer',
        images: [
            'https://m.media-amazon.com/images/I/81x9L9tUSpL._AC_UF1000,1000_QL80_.jpg',
            'https://www.everydaywigs.com/cdn/shop/files/layered-body-waves-honey-blonde-balayage-lace-front-glueless-human-hair-wig-4725869.jpg?v=1751300680',
            'https://wholesale.rpgshow.com/cdn/shop/files/long-middle-part-golden-honey-blonde-balayage-lace-front-wigs-sofiathewigstylist014_3_1.jpg?v=1750836061'
        ],
        rating: 4.9,
        buyPrice: 1890,
        rentPrice: 280,
        rentDays: '3 days',
    },
];

window.products = products;

/** Featured cards on Home (NO price, shows name + description + rating) */
window.productCardHTML = function productCardHTML(product) {
    const esc = (s) =>
        String(s)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/"/g, '&quot;');
    const desc = esc(product.description);
    return `
        <img src="${esc(product.images[0])}" alt="${esc(product.name)}" loading="lazy" width="700" height="420">
        <div class="product-info">
            <h3>${esc(product.name)}</h3>
            <p class="product-desc">${desc.substring(0, 85)}...</p>
            <div style="color:#d4af37; font-size:1.15rem; margin-top:8px;">
                ${'★'.repeat(Math.floor(product.rating))} 
                <span style="color:#aaa; font-size:0.95rem;">(${product.rating})</span>
            </div>
        </div>
    `;
};

/** Shop grid tile: image + name + heart like button */
window.shopTileHTML = function shopTileHTML(product) {
    const esc = (s) =>
        String(s)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/"/g, '&quot;');
    return `
        <span class="shop-tile-media">
            <img src="${esc(product.images[0])}" alt="" loading="lazy">
            <button class="like-btn" data-id="${product.id}" aria-label="Like this wig">&#9825;</button>
        </span>
        <span class="shop-tile-name">${esc(product.name)}</span>
        <span class="shop-tile-hint">Tap for details</span>
    `;
};