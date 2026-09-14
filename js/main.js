/**
 * Xử lý Tương tác, Giỏ Hàng & Đặt Hàng Website Hủ Tiếu Nam Vang
 */

// Trạng thái Giỏ hàng (Cart State)
let cart = JSON.parse(localStorage.getItem('hutieu_cart')) || [];
let activeCategory = 'all';
let searchQuery = '';

// Khởi chạy khi DOM sẵn sàng
document.addEventListener('DOMContentLoaded', () => {
    initRestaurantInfo();
    renderCategories();
    renderMenuItems();
    renderReviews();
    updateCartUI();
    initEventListeners();
});

/**
 * Hiển thị thông tin quán từ data.js lên giao diện
 */
function initRestaurantInfo() {
    if (typeof RESTAURANT_INFO === 'undefined') return;

    // Cập nhật Tên quán
    const brandElements = document.querySelectorAll('.dynamic-brand-name');
    brandElements.forEach(el => {
        if (RESTAURANT_INFO.name.toUpperCase().includes("THIÊN LỘC")) {
            el.innerHTML = `HỦ TIẾU NAM VANG <span class="brand-highlight">THIÊN LỘC</span>`;
        } else {
            el.textContent = RESTAURANT_INFO.name;
        }
    });

    // Cập nhật Slogan
    const sloganElements = document.querySelectorAll('.dynamic-slogan');
    sloganElements.forEach(el => {
        if (!RESTAURANT_INFO.slogan) {
            el.style.display = 'none';
        } else {
            el.textContent = RESTAURANT_INFO.slogan;
        }
    });

    // Cập nhật Hotline
    const hotlineElements = document.querySelectorAll('.dynamic-hotline');
    const cleanPhone = RESTAURANT_INFO.hotline.replace(/[^\d+]/g, '');
    hotlineElements.forEach(el => {
        el.textContent = RESTAURANT_INFO.hotline;
        if (el.tagName === 'A') el.href = `tel:${cleanPhone}`;
    });

    const floatPhone = document.querySelector('.float-phone');
    if (floatPhone) {
        floatPhone.href = `tel:${cleanPhone}`;
        floatPhone.setAttribute('title', `Gọi Hotline: ${RESTAURANT_INFO.hotline}`);
    }

    // Cập nhật Zalo
    const zaloElements = document.querySelectorAll('.dynamic-zalo');
    const cleanZalo = (RESTAURANT_INFO.zalo || RESTAURANT_INFO.hotline).replace(/[^\d+]/g, '');
    zaloElements.forEach(el => {
        el.textContent = `Nhắn Zalo Quán (${RESTAURANT_INFO.hotline})`;
        if (el.tagName === 'A') el.href = `https://zalo.me/${cleanZalo}`;
    });
    const floatZalo = document.querySelector('.float-zalo');
    if (floatZalo) floatZalo.href = `https://zalo.me/${cleanZalo}`;

    // Cập nhật Địa chỉ
    const addressElements = document.querySelectorAll('.dynamic-address');
    addressElements.forEach(el => el.textContent = RESTAURANT_INFO.address);

    // Cập nhật Giờ mở cửa
    const hoursElements = document.querySelectorAll('.dynamic-hours');
    hoursElements.forEach(el => el.textContent = RESTAURANT_INFO.openHours);
}

/**
 * Khởi tạo danh mục thực đơn
 */
function renderCategories() {
    const categoryContainer = document.getElementById('categoryTabs');
    if (!categoryContainer || typeof CATEGORIES === 'undefined') return;

    categoryContainer.innerHTML = CATEGORIES.map(cat => `
        <button class="category-btn ${cat.id === activeCategory ? 'active' : ''}" data-category="${cat.id}">
            <span>${cat.icon}</span>
            <span>${cat.name}</span>
        </button>
    `).join('');

    // Bắt sự kiện chọn danh mục
    categoryContainer.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            categoryContainer.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeCategory = btn.dataset.category;
            renderMenuItems();
        });
    });
}

/**
 * Hiển thị danh sách món ăn theo bộ lọc
 */
function renderMenuItems() {
    const menuGrid = document.getElementById('menuGrid');
    if (!menuGrid || typeof MENU_ITEMS === 'undefined') return;

    // Lọc theo danh mục và từ khóa tìm kiếm
    let filteredItems = MENU_ITEMS.filter(item => {
        const matchCategory = (activeCategory === 'all' || item.category === activeCategory);
        const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchCategory && matchSearch;
    });

    if (filteredItems.length === 0) {
        menuGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: var(--text-muted);">
                <div style="font-size: 3rem; margin-bottom: 12px;">🔍</div>
                <h3>Không tìm thấy món ăn phù hợp</h3>
                <p>Quý khách vui lòng thử tìm kiếm bằng từ khóa khác.</p>
            </div>
        `;
        return;
    }

    menuGrid.innerHTML = filteredItems.map(item => `
        <div class="dish-card" data-id="${item.id}">
            <div class="dish-img-box">
                <img src="${item.image}" alt="${item.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80'">
                ${item.badge ? `<span class="dish-badge ${item.badge === 'Món Độc Quyền' || item.badge === 'Gây Nghiện' ? 'gold' : ''}">${item.badge}</span>` : ''}
                <div class="dish-rating">
                    <span class="star">★</span>
                    <span>${item.rating}</span>
                </div>
            </div>
            <div class="dish-info">
                <h3 class="dish-name">${item.name}</h3>
                <p class="dish-desc">${item.description}</p>
                <div class="dish-footer">
                    <div class="dish-price-wrap">
                        <span class="dish-price">${formatCurrency(item.price)}</span>
                        ${item.oldPrice ? `<span class="dish-old-price">${formatCurrency(item.oldPrice)}</span>` : ''}
                    </div>
                    <button class="add-to-cart-btn" onclick="addToCart('${item.id}')" title="Thêm vào giỏ">
                        +
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

/**
 * Hiển thị đánh giá khách hàng
 */
function renderReviews() {
    const reviewsGrid = document.getElementById('reviewsGrid');
    if (!reviewsGrid || typeof CUSTOMER_REVIEWS === 'undefined') return;

    reviewsGrid.innerHTML = CUSTOMER_REVIEWS.map(rev => `
        <div class="review-card">
            <div class="quote-icon">“</div>
            <p class="review-text">${rev.comment}</p>
            <div class="reviewer-info">
                <img src="${rev.avatar}" alt="${rev.name}" class="reviewer-avatar">
                <div class="reviewer-meta">
                    <h4>${rev.name}</h4>
                    <span>${rev.role}</span>
                    <div class="stars-row">★★★★★</div>
                </div>
            </div>
        </div>
    `).join('');
}

/**
 * Xử lý Giỏ Hàng
 */
function addToCart(itemId) {
    const item = MENU_ITEMS.find(i => i.id === itemId);
    if (!item) return;

    const existingIndex = cart.findIndex(c => c.id === itemId);
    if (existingIndex > -1) {
        cart[existingIndex].qty += 1;
    } else {
        cart.push({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            qty: 1
        });
    }

    saveCart();
    updateCartUI();
    showToast(`Đã thêm "${item.name}" vào giỏ!`);

    // Hiệu ứng nảy giỏ hàng
    const badge = document.querySelector('.cart-badge');
    if (badge) {
        badge.classList.add('pop');
        setTimeout(() => badge.classList.remove('pop'), 300);
    }
}

function updateQty(itemId, change) {
    const index = cart.findIndex(c => c.id === itemId);
    if (index > -1) {
        cart[index].qty += change;
        if (cart[index].qty <= 0) {
            cart.splice(index, 1);
        }
        saveCart();
        updateCartUI();
    }
}

function removeFromCart(itemId) {
    cart = cart.filter(c => c.id !== itemId);
    saveCart();
    updateCartUI();
}

function saveCart() {
    localStorage.setItem('hutieu_cart', JSON.stringify(cart));
}

function updateCartUI() {
    const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    // Cập nhật số lượng trên icon Header
    const badge = document.querySelector('.cart-badge');
    if (badge) {
        badge.textContent = totalCount;
        badge.style.display = totalCount > 0 ? 'flex' : 'none';
    }

    // Cập nhật nội dung giỏ hàng Drawer
    const cartBody = document.getElementById('cartDrawerBody');
    const cartSubtotalEl = document.getElementById('cartSubtotal');
    const cartTotalEl = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutOpenBtn');

    if (!cartBody) return;

    if (cart.length === 0) {
        cartBody.innerHTML = `
            <div class="cart-empty-state">
                <div class="icon">🛒</div>
                <h4>Giỏ hàng của bạn đang trống</h4>
                <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 6px;">Hãy chọn cho mình tô hủ tiếu thơm ngon nóng hổi nhé!</p>
            </div>
        `;
        if (cartSubtotalEl) cartSubtotalEl.textContent = '0đ';
        if (cartTotalEl) cartTotalEl.textContent = '0đ';
        if (checkoutBtn) checkoutBtn.disabled = true;
    } else {
        cartBody.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <div class="cart-item-price">${formatCurrency(item.price)}</div>
                </div>
                <div class="cart-qty-ctrl">
                    <button class="qty-btn" onclick="updateQty('${item.id}', -1)">-</button>
                    <span class="qty-value">${item.qty}</span>
                    <button class="qty-btn" onclick="updateQty('${item.id}', 1)">+</button>
                </div>
                <button class="remove-item-btn" onclick="removeFromCart('${item.id}')" title="Xóa món">✕</button>
            </div>
        `).join('');

        if (cartSubtotalEl) cartSubtotalEl.textContent = formatCurrency(subtotal);
        if (cartTotalEl) cartTotalEl.textContent = formatCurrency(subtotal);
        if (checkoutBtn) checkoutBtn.disabled = false;
    }
}

/**
 * Mở/Đóng Cart Drawer & Modal Đặt hàng
 */
function toggleCartDrawer(show) {
    const overlay = document.getElementById('cartOverlay');
    if (overlay) {
        if (show) {
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
}

function toggleCheckoutModal(show) {
    const modal = document.getElementById('checkoutModal');
    if (modal) {
        if (show) {
            toggleCartDrawer(false);
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            renderOrderSummaryPreview();
        } else {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
}

function renderOrderSummaryPreview() {
    const summaryContainer = document.getElementById('orderSummaryPreview');
    const totalContainer = document.getElementById('modalOrderTotal');
    if (!summaryContainer) return;

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    summaryContainer.innerHTML = cart.map(i => `
        <div style="display: flex; justify-content: space-between; font-size: 0.9rem; margin-bottom: 6px;">
            <span>${i.name} x <b>${i.qty}</b></span>
            <b>${formatCurrency(i.price * i.qty)}</b>
        </div>
    `).join('');

    if (totalContainer) totalContainer.textContent = formatCurrency(subtotal);
}

/**
 * Xử lý gửi đơn hàng (Trực tiếp hoặc qua Zalo)
 */
function handleOrderSubmit(e, viaZalo = false) {
    if (e) e.preventDefault();

    const name = document.getElementById('customerName')?.value.trim();
    const phone = document.getElementById('customerPhone')?.value.trim();
    const address = document.getElementById('customerAddress')?.value.trim();
    const note = document.getElementById('customerNote')?.value.trim() || 'Không có';
    const payment = document.querySelector('input[name="paymentMethod"]:checked')?.value || 'Tiền mặt khi nhận hàng';

    if (!name || !phone || !address) {
        alert('Vui lòng điền đầy đủ Họ tên, Số điện thoại và Địa chỉ giao hàng!');
        return;
    }

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const orderItemsText = cart.map(i => `- ${i.name} x${i.qty} = ${formatCurrency(i.price * i.qty)}`).join('\n');

    if (viaZalo) {
        // Soạn tin nhắn Zalo gửi đến số chủ quán
        const zaloMsg = `KÍNH GỬI ĐƠN HÀNG HỦ TIẾU:\n` +
            `Khách hàng: ${name}\n` +
            `SĐT: ${phone}\n` +
            `Địa chỉ: ${address}\n` +
            `Ghi chú: ${note}\n` +
            `Thanh toán: ${payment}\n` +
            `---\n` +
            `DANH SÁCH MÓN:\n${orderItemsText}\n` +
            `---\n` +
            `TỔNG CỘNG: ${formatCurrency(subtotal)}`;

        const encodedMsg = encodeURIComponent(zaloMsg);
        const zaloPhone = RESTAURANT_INFO.zalo.replace(/\s+/g, '');
        
        // Mở Zalo
        window.open(`https://zalo.me/${zaloPhone}?text=${encodedMsg}`, '_blank');
    }

    // Thông báo thành công và xóa giỏ hàng
    alert(`🎉 ĐẶT HÀNG THÀNH CÔNG!\nCảm ơn quý khách ${name}. Quán sẽ gọi xác nhận qua SĐT ${phone} và giao hàng trong 20-30 phút!`);
    cart = [];
    saveCart();
    updateCartUI();
    toggleCheckoutModal(false);
}

/**
 * Tiện ích & Event Listeners
 */
function initEventListeners() {
    // Tìm kiếm món ăn
    const searchInput = document.getElementById('searchMenuInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            renderMenuItems();
        });
    }

    // Nút mở/đóng Cart
    document.getElementById('cartOpenBtn')?.addEventListener('click', () => toggleCartDrawer(true));
    document.getElementById('cartCloseBtn')?.addEventListener('click', () => toggleCartDrawer(false));
    document.getElementById('cartOverlay')?.addEventListener('click', (e) => {
        if (e.target.id === 'cartOverlay') toggleCartDrawer(false);
    });

    // Nút Checkout
    document.getElementById('checkoutOpenBtn')?.addEventListener('click', () => toggleCheckoutModal(true));
    document.getElementById('modalCloseBtn')?.addEventListener('click', () => toggleCheckoutModal(false));
    document.getElementById('checkoutModal')?.addEventListener('click', (e) => {
        if (e.target.id === 'checkoutModal') toggleCheckoutModal(false);
    });

    // Form submit
    document.getElementById('checkoutForm')?.addEventListener('submit', (e) => handleOrderSubmit(e, false));
    document.getElementById('orderZaloBtn')?.addEventListener('click', (e) => handleOrderSubmit(e, true));

    // Mobile menu toggle & Auto close
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = navMenu.classList.toggle('active');
            mobileToggle.textContent = isOpen ? '✕' : '☰';
        });

        // Tự động đóng menu khi bấm vào bất kỳ link điều hướng nào
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileToggle.textContent = '☰';
            });
        });

        // Đóng menu khi bấm ra ngoài vùng menu
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && e.target !== mobileToggle) {
                navMenu.classList.remove('active');
                mobileToggle.textContent = '☰';
            }
        });
    }

    // Scroll to Top & Header shadow
    const header = document.querySelector('.site-header');
    const backToTop = document.getElementById('backToTopBtn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }

        if (window.scrollY > 400) {
            backToTop?.classList.add('show');
        } else {
            backToTop?.classList.remove('show');
        }
    });

    backToTop?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Xử lý phát Video giới thiệu
    const videoPlaceholder = document.getElementById('videoPlaceholder');
    const promoVideo = document.getElementById('promoVideo');
    if (videoPlaceholder && promoVideo) {
        videoPlaceholder.addEventListener('click', () => {
            videoPlaceholder.style.display = 'none';
            promoVideo.style.display = 'block';
            promoVideo.play();
        });
    }
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

function showToast(msg) {
    let toast = document.getElementById('toastMsg');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toastMsg';
        toast.className = 'toast-msg success';
        document.body.appendChild(toast);
    }
    toast.innerHTML = `<span>✓</span> ${msg}`;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}
