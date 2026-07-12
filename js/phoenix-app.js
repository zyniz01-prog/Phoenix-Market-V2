const sessionKey = "phoenix-session";
const session = JSON.parse(localStorage.getItem(sessionKey) || "null");
const isAdminPage = location.pathname.includes("IT-II-ZynXiz-Admin");
if (!session || (isAdminPage && session.role !== "admin"))
  location.href = session ? "IT-II-ZynXiz-Beranda.html" : "index.html";
if (
  session?.role === "admin" &&
  location.pathname.includes("IT-II-ZynXiz-Keranjang")
)
  location.href = "IT-II-ZynXiz-Admin.html";
if (
  session?.role === "admin" &&
  location.pathname.includes("IT-II-ZynXiz-Produk")
)
  location.href = "IT-II-ZynXiz-Admin.html";
if (
  session?.role === "admin" &&
  location.pathname.includes("IT-II-ZynXiz-Beranda")
)
  location.href = "IT-II-ZynXiz-Admin.html";

let products = [
  [
    "laptop",
    "Laptop Kerja Slim",
    "Gadget",
    15500000,
    "images/Laptop Slim.jpeg",
    "Laptop slim ringan untuk belajar dan bekerja.",
  ],
  [
    "iphone",
    "Iphone 17 Pro Max",
    "Gadget",
    50000000,
    "images/Iphone-17-Pro-Max.jpeg",
    "Smartphone premium dengan performa tinggi.",
  ],
  [
    "headphone",
    "Headphone Wireless",
    "Aksesoris",
    750000,
    "images/Headphone-Wireless.jpg",
    "Headphone nirkabel dengan suara jernih.",
  ],
  [
    "earphone",
    "Earphone Wireless",
    "Aksesoris",
    800000,
    "images/EarPhone.jpeg",
    "Earphone ringkas dengan case pengisi daya.",
  ],
  [
    "jam",
    "Jam Tangan Analog",
    "Aksesoris",
    1200000,
    "images/JT-Analog.jpeg",
    "Jam tangan bergaya elegan.",
  ],
  [
    "dslr",
    "Kamera DSLR Pro",
    "Elektronik",
    5000000,
    "images/DSLR.jpg",
    "Kamera tajam untuk fotografi dan konten kreatif.",
  ],
  [
    "mouse",
    "Mouse Gaming RGB",
    "Elektronik",
    450000,
    "images/Mouse-RGB.jpeg",
    "Mouse ergonomis dengan respons cepat.",
  ],
  [
    "tv",
    "Smart TV",
    "Elektronik",
    4000000,
    "images/Smart TV.jpeg",
    "Smart TV layar lebar untuk hiburan keluarga.",
  ],
  [
    "lampu",
    "Lampu Meja Antik",
    "Elektronik",
    8000000,
    "images/Lampu meja.jpeg",
    "Lampu meja premium untuk ruang kerja.",
  ],
  [
    "ac",
    "AC Premium",
    "Elektronik",
    5000000,
    "images/AC Premium.jpeg",
    "AC hemat energi dengan pendinginan cepat.",
  ],
  [
    "kulkas",
    "Kulkas dua pintu",
    "Elektronik",
    10000000,
    "images/Kulkas Dua Pintu.jpeg",
    "Kulkas modern dengan kapasitas luas.",
  ],
  [
    "ipad",
    "Apple iPad Pro",
    "Gadget",
    18000000,
    "images/Apple iPad Pro.jpeg",
    "Tablet untuk belajar, bekerja, dan kreativitas.",
  ],
].map(([id, name, category, price, image, description], index) => ({
  id,
  name,
  category,
  price,
  image,
  description,
  stock: 8 + index * 3,
}));

const cartKey = "phoenix-cart",
  orderKey = "phoenix-orders",
  adminKey = "phoenix-admin-products";
const wishlistKey = "phoenix-wishlist",
  reviewKey = "phoenix-reviews",
  voucherKey = "phoenix-voucher";
const stockKey = "phoenix-product-stocks";
const getJSON = (key, fallback) =>
  JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
const getCart = () => getJSON(cartKey, {}),
  getOrders = () => getJSON(orderKey, []),
  getAdminProducts = () => getJSON(adminKey, []);
const saveCart = (value) => {
  localStorage.setItem(cartKey, JSON.stringify(value));
  updateCartBadge();
};
const saveOrders = (value) =>
  localStorage.setItem(orderKey, JSON.stringify(value));
const saveAdminProducts = (value) =>
  localStorage.setItem(adminKey, JSON.stringify(value));
const getWishlist = () => getJSON(wishlistKey, []),
  saveWishlist = (value) =>
    localStorage.setItem(wishlistKey, JSON.stringify(value));
const getReviews = () => getJSON(reviewKey, {}),
  saveReviews = (value) =>
    localStorage.setItem(reviewKey, JSON.stringify(value));
products = products.concat(getAdminProducts());
const savedStocks = getJSON(stockKey, {});
products.forEach((product) => {
  if (savedStocks[product.id] !== undefined)
    product.stock = savedStocks[product.id];
});

function rupiah(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}
function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}
function getProduct(id) {
  return products.find((product) => product.id === id);
}
function stockOf(product) {
  return Math.max(0, Number(product?.stock ?? 0));
}
function saveAdminState() {
  saveAdminProducts(products.filter((product) => product.isAdmin));
}
function saveProductStocks() {
  localStorage.setItem(
    stockKey,
    JSON.stringify(
      Object.fromEntries(
        products.map((product) => [product.id, stockOf(product)]),
      ),
    ),
  );
}

function updateCartBadge() {
  const badge = document.getElementById("cartBadge");
  if (!badge) return;
  const total = Object.values(getCart()).reduce(
    (sum, qty) => sum + Number(qty),
    0,
  );
  badge.textContent = total;
  badge.hidden = total === 0;
}
function showToast(message, type = "success") {
  let toast = document.getElementById("phoenixToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "phoenixToast";
    toast.className = "phoenix-toast";
    document.body.appendChild(toast);
  }
  toast.className = `phoenix-toast show ${type}`;
  toast.innerHTML = `<strong>${type === "success" ? "✓" : "!"}</strong><span>${message}</span>`;
  clearTimeout(window.phoenixToastTimer);
  window.phoenixToastTimer = setTimeout(
    () => toast.classList.remove("show"),
    2800,
  );
}
function addToCart(id) {
  if (session?.role === "admin")
    return showToast(
      "Admin tidak dapat menggunakan keranjang atau checkout.",
      "error",
    );
  const product = getProduct(id),
    cart = getCart();
  if (!product || stockOf(product) === 0)
    return showToast("Maaf, stok produk sedang habis.", "error");
  if ((cart[id] || 0) >= stockOf(product))
    return showToast("Jumlah sudah mencapai stok tersedia.", "error");
  cart[id] = (cart[id] || 0) + 1;
  saveCart(cart);
  showToast("Produk berhasil masuk keranjang!");
}
function toggleWishlist(id) {
  const items = getWishlist();
  saveWishlist(
    items.includes(id) ? items.filter((item) => item !== id) : [...items, id],
  );
  renderProducts();
}

function renderProducts(list = products) {
  const grid = document.getElementById("productGrid");
  if (!grid) return;
  const wishlist = getWishlist();
  grid.innerHTML = list
    .map((product) => {
      const empty = stockOf(product) === 0;
      return `<article class="card"><a href="#" onclick="showDetail('${product.id}');return false"><img src="${product.image}" alt="${product.name}"></a><small>${product.category}</small><h3>${product.name}</h3><p>${rupiah(product.price)}</p><p class="stock-label ${empty ? "stock-empty" : ""}">Stok: ${stockOf(product)}</p><button class="btn-detail" type="button" onclick="showDetail('${product.id}')">Detail Produk</button><button class="btn-wishlist" type="button" onclick="toggleWishlist('${product.id}')">${wishlist.includes(product.id) ? "♥ Tersimpan" : "♡ Wishlist"}</button><button class="btn-buy" onclick="addToCart('${product.id}')" ${empty ? "disabled" : ""}>${empty ? "Stok Habis" : "Tambah ke Keranjang"}</button></article>`;
    })
    .join("");
}
function showDetail(id) {
  const product = getProduct(id),
    modal = document.getElementById("productModal");
  if (!product || !modal) return;
  setText("modalCategory", product.category);
  setText("modalName", product.name);
  setText("modalPrice", rupiah(product.price));
  setText("modalDescription", product.description);
  setText(
    "modalStock",
    stockOf(product)
      ? `Stok tersedia: ${stockOf(product)}`
      : "Stok sedang habis",
  );
  const image = document.getElementById("modalImage");
  if (image) {
    image.src = product.image;
    image.alt = product.name;
  }
  const add = document.getElementById("modalAddCart");
  if (add) {
    add.onclick = () => addToCart(id);
    add.disabled = !stockOf(product) || session?.role === "admin";
    add.textContent =
      session?.role === "admin"
        ? "Mode Admin"
        : stockOf(product)
          ? "Tambah ke Keranjang"
          : "Stok Habis";
  }
  renderReviewList(id);
  modal.hidden = false;
  document.body.classList.add("modal-open");
}
function closeDetail() {
  const modal = document.getElementById("productModal");
  if (modal) modal.hidden = true;
  document.body.classList.remove("modal-open");
}
function filterProducts() {
  const search =
      document.getElementById("searchProduct")?.value.toLowerCase() || "",
    category = document.getElementById("categoryFilter")?.value || "Semua",
    price = document.getElementById("priceFilter")?.value || "Semua";
  const filtered = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search) &&
      (category === "Semua" || product.category === category) &&
      (price === "Semua" ||
        (price === "Murah" && product.price < 1000000) ||
        (price === "Menengah" &&
          product.price >= 1000000 &&
          product.price <= 7000000) ||
        (price === "Premium" && product.price > 7000000)),
  );
  renderProducts(filtered);
  const empty = document.getElementById("emptyProduct");
  if (empty) empty.hidden = filtered.length > 0;
}

function totals() {
  const cart = getCart();
  const subtotal = Object.entries(cart).reduce(
    (sum, [id, qty]) => sum + (getProduct(id)?.price || 0) * Number(qty),
    0,
  );
  const admin = subtotal ? 10000 : 0,
    regular = subtotal >= 5000000 ? subtotal * 0.05 : 0,
    voucher =
      localStorage.getItem(voucherKey) === "HEMAT10" && subtotal >= 1000000
        ? subtotal * 0.1
        : 0,
    discount = Math.max(regular, voucher);
  return { subtotal, admin, discount, total: subtotal + admin - discount };
}
function renderCart() {
  const list = document.getElementById("cartItems");
  if (!list) return;
  const cart = getCart(),
    ids = Object.keys(cart);
  list.innerHTML = ids.length
    ? ids
        .map((id) => {
          const product = getProduct(id),
            qty = Number(cart[id]);
          if (!product) return "";
          return `<article class="cart-item-card"><img class="cart-item-image" src="${product.image}" alt="${product.name}"><div class="cart-item-info"><h3>${product.name}</h3><small>${product.category} · Stok tersisa ${stockOf(product)}</small><p class="cart-item-price">${rupiah(product.price)}</p><div class="qty-area"><button type="button" class="qty-btn" onclick="updateQty('${id}',${qty - 1})">-</button><span class="qty-number">${qty}</span><button type="button" class="qty-btn" onclick="updateQty('${id}',${qty + 1})">+</button></div></div><div class="cart-item-action"><span class="item-total">${rupiah(product.price * qty)}</span><button class="cart-remove-btn" type="button" onclick="removeItem('${id}')">Hapus</button></div></article>`;
        })
        .join("")
    : `<article class="cart-empty-card"><h3>Keranjang masih kosong</h3><p>Silakan pilih produk dulu.</p><a class="btn-link" href="IT-II-ZynXiz-Produk.html">Belanja Produk</a></article>`;
  const t = totals();
  setText("cartSubtotal", rupiah(t.subtotal));
  setText("cartAdmin", rupiah(t.admin));
  setText("cartDiscount", "-" + rupiah(t.discount));
  setText("cartTotal", rupiah(t.total));
  setText(
    "voucherMessage",
    localStorage.getItem(voucherKey) === "HEMAT10"
      ? "Voucher HEMAT10 aktif: diskon 10%."
      : "Pakai HEMAT10 untuk diskon 10% min. Rp1.000.000.",
  );
}
function updateQty(id, qty) {
  const cart = getCart(),
    product = getProduct(id);
  if (qty > stockOf(product)) return alert("Jumlah melebihi stok tersedia.");
  if (qty <= 0) delete cart[id];
  else cart[id] = qty;
  saveCart(cart);
  renderCart();
}
function removeItem(id) {
  const cart = getCart();
  delete cart[id];
  saveCart(cart);
  renderCart();
}
function applyVoucher() {
  const code = document
    .getElementById("voucherCode")
    ?.value.trim()
    .toUpperCase();
  if (code === "HEMAT10") localStorage.setItem(voucherKey, code);
  else {
    localStorage.removeItem(voucherKey);
    alert("Kode voucher tidak valid. Coba HEMAT10.");
  }
  renderCart();
}

function createOrder(cart) {
  const items = Object.entries(cart)
      .map(([id, qty]) => {
        const p = getProduct(id);
        return (
          p && {
            id,
            name: p.name,
            category: p.category,
            price: p.price,
            qty: Number(qty),
            total: p.price * Number(qty),
          }
        );
      })
      .filter(Boolean),
    t = totals();
  return {
    id: "#PM" + Math.floor(100000 + Math.random() * 900000),
    owner: session?.username || "Pelanggan",
    buyer: document.getElementById("nama")?.value.trim() || "Pelanggan",
    phone: document.getElementById("telepon")?.value.trim() || "-",
    city: document.getElementById("kota")?.value.trim() || "-",
    address: document.getElementById("alamat")?.value.trim() || "-",
    payment:
      document.querySelector("input[name='payment']:checked")?.value ||
      "Belum dipilih",
    ...t,
    status: "Menunggu Pembayaran",
    items,
    createdAt: new Date().toISOString(),
  };
}
function showSuccessModal(id) {
  setText("orderNumber", id || "#PM000000");
  document.getElementById("successModal")?.classList.add("show");
}
function closeSuccessModal() {
  document.getElementById("successModal")?.classList.remove("show");
}
function openCheckoutModal() {
  if (!Object.keys(getCart()).length) return alert("Keranjang masih kosong.");
  const t = totals();
  setText("modalSubtotal", rupiah(t.subtotal));
  setText("modalAdmin", rupiah(t.admin));
  setText("modalDiscount", "-" + rupiah(t.discount));
  setText("modalTotal", rupiah(t.total));
  document.getElementById("checkoutModal")?.classList.add("show");
}
function closeCheckoutModal() {
  document.getElementById("checkoutModal")?.classList.remove("show");
}
function selectPaymentInfo() {
  const info = document.getElementById("paymentInfo"),
    payment = document.querySelector("input[name='payment']:checked")?.value;
  if (!info || !payment) return;
  info.hidden = false;
  if (payment === "QRIS") {
    info.innerHTML = `<strong>Scan QRIS untuk membayar</strong><img class="qris-image" src="images/qris-phoenix.jpeg" alt="QRIS Phoenix Market" style="display:block;width:min(230px,100%);aspect-ratio:1;margin:12px auto;border:8px solid #fff;border-radius:8px;object-fit:cover"><small>QRIS Phoenix Market · Nominal mengikuti total checkout.</small>`;
    return;
  }
  info.innerHTML =
    payment === "E-Wallet"
      ? "Pilih E-Wallet setelah pesanan dibuat. Nomor pembayaran akan muncul pada simulasi pesanan."
      : "Transfer ke rekening Phoenix Market: <strong>BCA 1234567890 a.n. Phoenix Market</strong>.";
}
function renderCustomerOrderList() {
  const list = document.getElementById("customerOrderList");
  if (!list) return;
  const orders = getOrders();
  list.innerHTML = orders.length
    ? orders
        .map(
          (order) =>
            `<article class="order-row"><p><strong>${order.id}</strong> · ${new Date(order.createdAt).toLocaleDateString("id-ID")}</p><p>${order.items.map((item) => `${item.name} (${item.qty})`).join(", ")}</p><p>Total: <strong>${rupiah(order.total)}</strong></p><p>Status: <span>${order.status}</span></p></article>`,
        )
        .join("")
    : "<p>Belum ada pesanan. Pesanan yang sudah checkout akan tampil di sini.</p>";
}
function renderAccountPage() {
  const name = document.getElementById("accountName");
  if (!name || !session) return;
  const role = session.role === "admin" ? "Admin" : "User";
  setText("accountName", session.username);
  setText("accountRole", role);
  setText("accountInitial", session.username.charAt(0).toUpperCase());
  const userPanel = document.getElementById("userAccountPanel"),
    adminPanel = document.getElementById("adminAccountPanel");
  if (session.role === "admin") {
    userPanel.hidden = true;
    adminPanel.hidden = false;
    const orders = getOrders();
    setText("accountProductTotal", products.length);
    setText("accountOrderTotal", orders.length);
    setText(
      "accountRevenueTotal",
      rupiah(orders.reduce((sum, order) => sum + Number(order.total || 0), 0)),
    );
    return;
  }
  adminPanel.hidden = true;
  userPanel.hidden = false;
  const orders = getOrders(),
    counts = { "Menunggu Pembayaran": 0, Diproses: 0, Dikirim: 0, Selesai: 0 };
  orders.forEach((order) => {
    if (counts[order.status] !== undefined) counts[order.status]++;
  });
  setText("accountWaiting", counts["Menunggu Pembayaran"]);
  setText("accountProcessing", counts.Diproses);
  setText("accountShipping", counts.Dikirim);
  setText("accountFinished", counts.Selesai);
  const list = document.getElementById("accountOrderList");
  if (list)
    list.innerHTML = orders.length
      ? orders
          .slice(0, 4)
          .map(
            (order) =>
              `<article class="order-row"><p><strong>${order.id}</strong> · ${order.status}</p><p>${order.items.map((item) => `${item.name} (${item.qty})`).join(", ")}</p><p>Total: <strong>${rupiah(order.total)}</strong></p></article>`,
          )
          .join("")
      : "<p>Belum ada pesanan. Yuk, mulai belanja sekarang.</p>";
}

function submitReview() {
  const id = document.getElementById("reviewProductId")?.value,
    name = document.getElementById("reviewName")?.value.trim(),
    rating = Number(document.getElementById("reviewRating")?.value),
    comment = document.getElementById("reviewComment")?.value.trim();
  if (!id || !name || !rating || !comment) return;
  const reviews = getReviews();
  reviews[id] = [
    { name, rating, comment, date: new Date().toLocaleDateString("id-ID") },
    ...(reviews[id] || []),
  ];
  saveReviews(reviews);
  document.getElementById("reviewForm")?.reset();
  renderReviewList(id);
}
function renderReviewList(id) {
  const list = document.getElementById("reviewList"),
    hiddenId = document.getElementById("reviewProductId");
  if (!list || !hiddenId) return;
  hiddenId.value = id;
  const reviews = getReviews()[id] || [];
  if (!reviews.length && list.children.length) return;
  const displayReviews = reviews.length
    ? reviews
    : [
        {
          name: "Raka",
          rating: 5,
          comment: "Produknya sesuai deskripsi dan kualitasnya sangat bagus.",
          date: "12/07/2026",
        },
        {
          name: "Dina",
          rating: 5,
          comment:
            "Pengiriman cepat, packing aman, dan produk berfungsi dengan baik.",
          date: "10/07/2026",
        },
        {
          name: "Arif",
          rating: 4,
          comment: "Tampilannya premium dan cocok untuk kebutuhan sehari-hari.",
          date: "08/07/2026",
        },
        {
          name: "Salsa",
          rating: 5,
          comment: "Sangat puas berbelanja di Phoenix Market.",
          date: "05/07/2026",
        },
      ];
  list.innerHTML = displayReviews.length
    ? displayReviews
        .map(
          (r) =>
            `<article class="review-item"><strong>${r.name}</strong> <span>${"★".repeat(r.rating)}${"☆".repeat(5 - r.rating)}</span><p>${r.comment}</p><small>${r.date}</small></article>`,
        )
        .join("")
    : "<p>Belum ada ulasan untuk produk ini.</p>";
}

function renderAdminProductList() {
  const list = document.getElementById("adminProductList");
  if (!list) return;
  list.innerHTML = products
    .map(
      (p) =>
        `<div class="admin-product-row"><div><strong>${p.name}</strong><p>${p.category} · ${rupiah(p.price)}</p><p>Stok: <strong>${stockOf(p)}</strong></p></div><div class="admin-actions"><button class="btn-b" type="button" onclick="updateStock('${p.id}')">Atur Stok</button>${p.isAdmin ? `<button class="btn-b" type="button" onclick="editAdminProduct('${p.id}')">Edit</button><button class="btn-b" type="button" onclick="deleteAdminProduct('${p.id}')">Hapus</button>` : ""}</div></div>`,
    )
    .join("");
}
function updateStock(id) {
  const product = getProduct(id),
    value = prompt(
      `Masukkan stok baru untuk ${product.name}:`,
      stockOf(product),
    );
  if (value === null) return;
  const stock = Number(value);
  if (!Number.isInteger(stock) || stock < 0)
    return alert("Stok harus berupa bilangan bulat 0 atau lebih.");
  product.stock = stock;
  saveProductStocks();
  renderProducts();
  renderCart();
  renderAdminProductList();
}
function openAdminProductModal(isEdit = false) {
  const modal = document.getElementById("adminProductModal");
  if (!modal) return;
  if (!isEdit) {
    document.getElementById("adminProductForm")?.reset();
    setText("adminFormTitle", "Tambah Produk");
    setText("adminEditId", "");
    const preview = document.getElementById("previewImage");
    if (preview) preview.src = "images/pngegg.png";
  }
  modal.hidden = false;
  document.body.classList.add("modal-open");
}
function closeAdminProductModal() {
  const modal = document.getElementById("adminProductModal");
  if (modal) modal.hidden = true;
  document.body.classList.remove("modal-open");
}
function editAdminProduct(id) {
  const p = getProduct(id);
  if (!p) return;
  [
    ["adminProductName", p.name],
    ["adminProductPrice", p.price],
    ["adminProductCategory", p.category],
    ["adminProductStock", stockOf(p)],
    ["adminProductDescription", p.description],
    ["adminEditId", p.id],
  ].forEach(([field, value]) => {
    const el = document.getElementById(field);
    if (el) el.value = value;
  });
  setText("adminFormTitle", "Edit Produk");
  document.getElementById("previewImage").src = p.image;
  openAdminProductModal(true);
}
function deleteAdminProduct(id) {
  if (!confirm("Yakin ingin menghapus produk ini?")) return;
  products = products.filter((p) => p.id !== id);
  saveAdminState();
  saveProductStocks();
  renderProducts();
  renderAdminProductList();
  renderAdminDashboard();
}
function renderAdminOrderList() {
  const list = document.getElementById("adminOrderList");
  if (!list) return;
  const orders = getOrders();
  list.innerHTML = orders.length
    ? orders
        .map(
          (order) =>
            `<div class="order-row"><p><strong>${order.id}</strong> - ${order.buyer}</p><small>${order.payment}</small><p>Kota: ${order.city} | Item: ${order.items.reduce((sum, item) => sum + item.qty, 0)}</p><p>Total: <strong>${rupiah(order.total)}</strong></p><p>Status: <span>${order.status}</span></p><button class="btn-buy" type="button" onclick="updateOrderStatus('${order.id}')">Update Status</button></div>`,
        )
        .join("")
    : "<p>Belum ada pesanan masuk.</p>";
}
const statuses = ["Menunggu Pembayaran", "Diproses", "Dikirim", "Selesai"];
function updateOrderStatus(id) {
  saveOrders(
    getOrders().map((order) =>
      order.id === id
        ? {
            ...order,
            status:
              statuses[(statuses.indexOf(order.status) + 1) % statuses.length],
          }
        : order,
    ),
  );
  renderAdminDashboard();
}
function renderAdminDashboard() {
  setText("adminProductCount", products.length + " Produk");
  const orders = getOrders();
  setText("adminOrderCount", orders.length + " Pesanan");
  setText(
    "adminRevenue",
    rupiah(orders.reduce((sum, o) => sum + Number(o.total || 0), 0)),
  );
  renderAdminOrderList();
}

document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector("header nav");
  if (nav && session) {
    if (session.role === "admin") {
      nav.querySelector("a[href='IT-II-ZynXiz-Keranjang.html']")?.remove();
      nav.querySelector("a[href='IT-II-ZynXiz-Produk.html']")?.remove();
      document
        .querySelector(".btn-sec-1")
        ?.closest("a")
        ?.setAttribute("hidden", "");
    }
    const account = document.createElement("a");
    account.className = "account-badge";
    account.href = "IT-II-ZynXiz-Akun.html";
    account.textContent = `${session.username} (${session.role === "admin" ? "Admin" : "User"})`;
    nav.prepend(account);
  }
  document
    .querySelectorAll("a[href='index.html']")
    .forEach((link) =>
      link.addEventListener("click", () => localStorage.removeItem(sessionKey)),
    );
  renderProducts();
  renderCart();
  renderCustomerOrderList();
  renderAccountPage();
  renderAdminProductList();
  renderAdminDashboard();
  updateCartBadge();
  document
    .getElementById("searchProduct")
    ?.addEventListener("input", filterProducts);
  document
    .getElementById("categoryFilter")
    ?.addEventListener("change", filterProducts);
  document
    .getElementById("priceFilter")
    ?.addEventListener("change", filterProducts);
  document.getElementById("resetFilter")?.addEventListener("click", () => {
    document.getElementById("searchProduct").value = "";
    document.getElementById("categoryFilter").value = "Semua";
    document.getElementById("priceFilter").value = "Semua";
    filterProducts();
  });
  document.getElementById("reviewForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    submitReview();
  });
  const form = document.getElementById("checkoutForm");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const cart = getCart();
    if (!Object.keys(cart).length || !form.checkValidity())
      return form.reportValidity();
    if (Object.entries(cart).some(([id, qty]) => qty > stockOf(getProduct(id))))
      return alert("Stok berubah. Silakan perbarui keranjang.");
    const order = createOrder(cart);
    Object.entries(cart).forEach(([id, qty]) => {
      const p = getProduct(id);
      p.stock = stockOf(p) - qty;
    });
    saveAdminState();
    saveProductStocks();
    saveOrders([order, ...getOrders()]);
    localStorage.removeItem(cartKey);
    localStorage.removeItem(voucherKey);
    form.reset();
    closeCheckoutModal();
    showSuccessModal(order.id);
    renderCart();
    renderProducts();
    renderCustomerOrderList();
    renderAdminDashboard();
  });
  const image = document.getElementById("adminProductImage");
  image?.addEventListener("change", function () {
    const file = this.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) =>
      (document.getElementById("previewImage").src = e.target.result);
    reader.readAsDataURL(file);
  });
  document
    .getElementById("adminProductForm")
    ?.addEventListener("submit", (e) => {
      e.preventDefault();
      const id = document.getElementById("adminEditId").value,
        file = document.getElementById("adminProductImage").files[0],
        apply = (imageUrl) => {
          const data = {
            id:
              id ||
              document
                .getElementById("adminProductName")
                .value.toLowerCase()
                .trim()
                .replace(/\s+/g, "-") +
                "-" +
                Date.now(),
            name: document.getElementById("adminProductName").value.trim(),
            price: Number(document.getElementById("adminProductPrice").value),
            category: document.getElementById("adminProductCategory").value,
            stock: Number(document.getElementById("adminProductStock").value),
            description: document
              .getElementById("adminProductDescription")
              .value.trim(),
            image: imageUrl,
            isAdmin: true,
          };
          const index = products.findIndex((p) => p.id === id);
          if (index >= 0) products[index] = data;
          else products.push(data);
          saveAdminState();
          saveProductStocks();
          e.target.reset();
          document.getElementById("adminEditId").value = "";
          setText("adminFormTitle", "Tambah Produk");
          document.getElementById("previewImage").src = "images/pngegg.png";
          renderProducts();
          renderAdminProductList();
          renderAdminDashboard();
          alert(
            index >= 0
              ? "Produk berhasil diperbarui."
              : "Produk berhasil ditambahkan!",
          );
        };
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => apply(event.target.result);
        reader.readAsDataURL(file);
      } else apply(id ? getProduct(id).image : "images/pngegg.png");
    });
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeDetail();
});
document.addEventListener("click", (event) => {
  const productId = event.target.dataset.add;
  if (productId) addToCart(productId);
});
document.addEventListener("DOMContentLoaded", () => {
  if (session?.role === "admin")
    document
      .querySelector("header nav a[href='IT-II-ZynXiz-Beranda.html']")
      ?.remove();
});

const baseShowDetail = showDetail;
showDetail = function (id) {
  baseShowDetail(id);
  const product = getProduct(id),
    list = document.getElementById("modalSpecifications");
  if (!product || !list) return;
  const specs =
    product.category === "Gadget"
      ? [
          "Kategori: Gadget",
          "Kondisi: Baru",
          "Garansi: Resmi",
          "Pengiriman: Aman",
        ]
      : product.category === "Elektronik"
        ? [
            "Kategori: Elektronik",
            "Kondisi: Baru",
            "Garansi: Resmi",
            "Daya sesuai produk",
          ]
        : [
            "Kategori: Aksesoris",
            "Kondisi: Baru",
            "Kompatibel untuk penggunaan harian",
            "Pengiriman: Aman",
          ];
  list.innerHTML = specs.map((spec) => `<li>${spec}</li>`).join("");
};

updateStock = function (id) {
  const product = getProduct(id),
    value = prompt(
      `Masukkan stok baru untuk ${product.name}:`,
      stockOf(product),
    );
  if (value === null) return;
  const stock = Number(value);
  if (!Number.isInteger(stock) || stock < 0)
    return alert("Stok harus berupa bilangan bulat 0 atau lebih.");
  product.stock = stock;
  saveProductStocks();
  renderProducts();
  renderCart();
  renderAdminProductList();
  showToast(`Stok ${product.name} berhasil diperbarui.`);
};
deleteAdminProduct = function (id) {
  const product = getProduct(id);
  if (!product || !confirm(`Hapus produk ${product.name}?`)) return;
  products = products.filter((item) => item.id !== id);
  saveAdminState();
  saveProductStocks();
  renderProducts();
  renderAdminProductList();
  renderAdminDashboard();
  showToast("Produk berhasil dihapus.");
};
updateOrderStatus = function (id) {
  const orders = getOrders(),
    order = orders.find((item) => item.id === id);
  if (!order) return;
  const next = statuses[(statuses.indexOf(order.status) + 1) % statuses.length];
  saveOrders(
    orders.map((item) => (item.id === id ? { ...item, status: next } : item)),
  );
  renderAdminDashboard();
  showToast(`Status pesanan ${id} diubah menjadi ${next}.`);
};

window.alert = function (message) {
  const success = /berhasil|aktif|ditambahkan|diperbarui/i.test(
    String(message),
  );
  showToast(String(message), success ? "success" : "error");
};

const baseFilterProducts = filterProducts;
filterProducts = function () {
  const search =
      document.getElementById("searchProduct")?.value.toLowerCase() || "",
    category = document.getElementById("categoryFilter")?.value || "Semua",
    price = document.getElementById("priceFilter")?.value || "Semua",
    sort = document.getElementById("sortProduct")?.value || "default";
  const filtered = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search) &&
      (category === "Semua" || product.category === category) &&
      (price === "Semua" ||
        (price === "Murah" && product.price < 1000000) ||
        (price === "Menengah" &&
          product.price >= 1000000 &&
          product.price <= 7000000) ||
        (price === "Premium" && product.price > 7000000)),
  );
  if (sort === "low") filtered.sort((a, b) => a.price - b.price);
  if (sort === "high") filtered.sort((a, b) => b.price - a.price);
  if (sort === "stock") filtered.sort((a, b) => stockOf(b) - stockOf(a));
  renderProducts(filtered);
  const empty = document.getElementById("emptyProduct");
  if (empty) empty.hidden = filtered.length > 0;
};

const baseRenderProducts = renderProducts;
renderProducts = function (list = products) {
  baseRenderProducts(list);
  document.querySelectorAll("#productGrid .stock-label").forEach((label) => {
    const stock = Number((label.textContent.match(/\d+/) || [0])[0]);
    label.classList.toggle("stock-low", stock > 0 && stock <= 3);
  });
};

const baseRenderAdminDashboard = renderAdminDashboard;
renderAdminDashboard = function () {
  baseRenderAdminDashboard();
  const badge = document.getElementById("newOrderBadge");
  if (!badge) return;
  const total = getOrders().filter(
    (order) => order.status === "Menunggu Pembayaran",
  ).length;
  badge.textContent = total;
  badge.hidden = total === 0;
};

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("sortProduct")
    ?.addEventListener("change", filterProducts);
  const top = document.getElementById("backToTop");
  if (top) {
    window.addEventListener("scroll", () =>
      top.classList.toggle("show", window.scrollY > 350),
    );
    top.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: "smooth" }),
    );
  }
});

function openDeleteConfirmation(id) {
  const product = getProduct(id);
  if (!product) return;
  let modal = document.getElementById("adminDeleteConfirm");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "adminDeleteConfirm";
    modal.className = "admin-confirm";
    document.body.appendChild(modal);
  }
  modal.innerHTML = `<div class="admin-confirm-backdrop"></div><section class="admin-confirm-card" role="dialog" aria-modal="true" aria-labelledby="deleteConfirmTitle"><h2 id="deleteConfirmTitle">Hapus produk?</h2><p>Produk <strong>${product.name}</strong> akan dihapus dari katalog.</p><div><button type="button" class="btn-b" data-cancel>Batal</button><button type="button" class="btn-buy" data-confirm>Hapus Produk</button></div></section>`;
  modal.hidden = false;
  modal
    .querySelector("[data-cancel]")
    .addEventListener("click", () => (modal.hidden = true));
  modal
    .querySelector(".admin-confirm-backdrop")
    .addEventListener("click", () => (modal.hidden = true));
  modal.querySelector("[data-confirm]").addEventListener("click", () => {
    products = products.filter((item) => item.id !== id);
    saveAdminState();
    saveProductStocks();
    renderProducts();
    renderAdminProductList();
    renderAdminDashboard();
    modal.hidden = true;
    showToast("Produk berhasil dihapus.");
  });
}
deleteAdminProduct = openDeleteConfirmation;
const baseRenderReviewsWithSamples = renderReviewList;
renderReviewList = function (id) {
  const saved = getReviews()[id] || [];
  if (saved.length) return baseRenderReviewsWithSamples(id);
  const list = document.getElementById("reviewList"),
    hiddenId = document.getElementById("reviewProductId");
  if (!list || !hiddenId) return;
  hiddenId.value = id;
  const samples = [
    {
      name: "Raka",
      rating: 5,
      comment: "Produknya sesuai deskripsi, kualitas sangat bagus.",
      date: "12/07/2026",
    },
    {
      name: "Dina",
      rating: 5,
      comment:
        "Pengiriman cepat dan packing aman. Puas belanja di Phoenix Market.",
      date: "10/07/2026",
    },
    {
      name: "Arif",
      rating: 4,
      comment: "Barang berfungsi dengan baik, tampilannya juga premium.",
      date: "08/07/2026",
    },
    {
      name: "Salsa",
      rating: 5,
      comment: "Recommended untuk kebutuhan gadget harian.",
      date: "05/07/2026",
    },
  ];
  list.innerHTML = samples
    .map(
      (review) =>
        `<article class="review-item"><strong>${review.name}</strong> <span>${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}</span><p>${review.comment}</p><small>${review.date}</small></article>`,
    )
    .join("");
};

function selectShippingInfo() {
  const info = document.getElementById("shippingInfo"),
    shipping = document.querySelector("input[name='shipping']:checked")?.value;
  if (!info || !shipping) return;
  info.textContent =
    shipping === "Express"
      ? "Pengiriman Express: estimasi tiba 1–2 hari kerja."
      : "Pengiriman Reguler: estimasi tiba 2–4 hari kerja.";
}
const baseCreateOrder = createOrder;
createOrder = function (cart) {
  const order = baseCreateOrder(cart),
    shipping =
      document.querySelector("input[name='shipping']:checked")?.value ||
      "Reguler";
  return {
    ...order,
    shipping,
    estimatedDelivery:
      shipping === "Express" ? "1–2 hari kerja" : "2–4 hari kerja",
  };
};
function renderWishlistPage() {
  const grid = document.getElementById("wishlistGrid"),
    empty = document.getElementById("emptyWishlist");
  if (!grid) return;
  const items = products.filter((product) =>
    getWishlist().includes(product.id),
  );
  if (empty) empty.hidden = items.length > 0;
  grid.innerHTML = items
    .map(
      (product) =>
        `<article class="card wishlist-card"><img src="${product.image}" alt="${product.name}"><small>${product.category}</small><h3>${product.name}</h3><p>${rupiah(product.price)}</p><p class="stock-label ${stockOf(product) ? "" : "stock-empty"}">Stok: ${stockOf(product)}</p><a class="btn-detail" href="IT-II-ZynXiz-Produk.html">Lihat Produk</a><button class="btn-wishlist" type="button" onclick="toggleWishlist('${product.id}');renderWishlistPage()">Hapus dari Favorit</button></article>`,
    )
    .join("");
}
const baseDashboardWithInsights = renderAdminDashboard;
renderAdminDashboard = function () {
  baseDashboardWithInsights();
  const low = document.getElementById("adminLowStock"),
    chart = document.getElementById("adminSalesChart"),
    orders = getOrders();
  if (low) {
    const items = products.filter((product) => stockOf(product) <= 3);
    low.innerHTML = items.length
      ? items
          .map(
            (product) =>
              `<p class="low-stock-row"><strong>${product.name}</strong><span>${stockOf(product)} tersisa</span></p>`,
          )
          .join("")
      : "<p>Semua stok dalam kondisi aman.</p>";
  }
  if (chart) {
    const days = Array.from({ length: 7 }, (_, index) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - index));
      return date.toISOString().slice(0, 10);
    });
    const values = days.map((day) =>
      orders
        .filter((order) => order.createdAt?.slice(0, 10) === day)
        .reduce((total, order) => total + Number(order.total || 0), 0),
    );
    const max = Math.max(...values, 1);
    chart.innerHTML = values
      .map(
        (value, index) =>
          `<div class="chart-bar-wrap"><div class="chart-bar" style="height:${Math.max(8, (value / max) * 100)}%" title="${rupiah(value)}"></div><small>${days[index].slice(8)}</small></div>`,
      )
      .join("");
  }
};
document.addEventListener("DOMContentLoaded", () => {
  renderWishlistPage();
  selectShippingInfo();
});
function usePromoShortcut() {
  const input = document.getElementById("voucherCode");
  if (!input) return;
  input.value = "HEMAT10";
  applyVoucher();
  showToast("Kode promo HEMAT10 digunakan.");
}
function useWelcomePromo() {
  const input = document.getElementById("voucherCode");
  if (!input) return;
  input.value = "WELCOME5";
  applyVoucher();
  showToast("Kode promo WELCOME5 digunakan.");
}
const baseRenderCartWithPromo = renderCart;
renderCart = function () {
  baseRenderCartWithPromo();
  const message = document.getElementById("voucherMessage");
  if (message)
    message.textContent = ["HEMAT10", "WELCOME5"].includes(
      localStorage.getItem(voucherKey),
    )
      ? "Voucher aktif."
      : "";
};
const baseCustomerOrdersWithProgress = renderCustomerOrderList;
renderCustomerOrderList = function () {
  baseCustomerOrdersWithProgress();
  const list = document.getElementById("customerOrderList");
  if (!list) return;
  list.querySelectorAll(".order-row").forEach((row) => {
    const status =
        row.querySelector("span")?.textContent || "Menunggu Pembayaran",
      states = ["Menunggu Pembayaran", "Diproses", "Dikirim", "Selesai"],
      current = states.indexOf(status);
    const progress = document.createElement("div");
    progress.className = "order-progress";
    progress.innerHTML = states
      .map(
        (state, index) =>
          `<span class="${index <= current ? "done" : ""}">${state}</span>`,
      )
      .join("");
    row.appendChild(progress);
  });
};
const baseDashboardExtraStats = renderAdminDashboard;
renderAdminDashboard = function () {
  baseDashboardExtraStats();
  const orders = getOrders();
  setText(
    "adminCompletedCount",
    orders.filter((order) => order.status === "Selesai").length,
  );
  setText(
    "adminCustomerCount",
    new Set(orders.map((order) => order.owner || order.buyer)).size,
  );
};

function renderTrackingPage() {
  const list = document.getElementById("trackingList");
  if (!list) return;
  const orders = getOrders();
  list.innerHTML = orders.length
    ? orders
        .map(
          (order) =>
            `<article class="order-row"><h3>${order.id}</h3><p><strong>Resi simulasi:</strong> PMX-${order.id.replace("#PM", "")}-${String(order.items.length).padStart(2, "0")}</p><p>Status: <span>${order.status}</span></p><p>Estimasi tiba: ${order.estimatedDelivery || "2–4 hari kerja"}</p></article>`,
        )
        .join("")
    : "<p>Belum ada pesanan untuk dilacak.</p>";
}
function saveCustomerAddress() {
  const order = getOrders()[0],
    text = document.getElementById("savedAddressText");
  if (!order || !text)
    return showToast("Belum ada alamat dari pesanan.", "error");
  localStorage.setItem(
    "phoenix-saved-address",
    `${order.buyer} — ${order.address}, ${order.city}`,
  );
  text.textContent = localStorage.getItem("phoenix-saved-address");
  showToast("Alamat berhasil disimpan.");
}
const ratingRenderBase = renderProducts;
renderProducts = function (list = products) {
  ratingRenderBase(list);
  document.querySelectorAll("#productGrid .card").forEach((card) => {
    const rating = document.createElement("p");
    rating.className = "product-rating";
    rating.textContent = "★★★★★ 4.8";
    card.querySelector(".stock-label")?.before(rating);
    const stock = card
      .querySelector(".stock-label")
      ?.textContent.match(/\d+/)?.[0];
    if (Number(stock) > 0 && Number(stock) <= 3)
      card
        .querySelector(".stock-label")
        ?.insertAdjacentHTML(
          "afterend",
          "<small class='low-stock-note'>Stok hampir habis</small>",
        );
  });
};
document.addEventListener("DOMContentLoaded", () => {
  renderTrackingPage();
  const address = document.getElementById("savedAddressText");
  if (address && localStorage.getItem("phoenix-saved-address"))
    address.textContent = localStorage.getItem("phoenix-saved-address");
});
const baseTotalsWithWelcome = totals;
totals = function () {
  const value = baseTotalsWithWelcome();
  const code = localStorage.getItem(voucherKey);
  if (code === "WELCOME5" && value.subtotal >= 500000) {
    const discount = Math.max(value.discount, value.subtotal * 0.05);
    return {
      ...value,
      discount,
      total: value.subtotal + value.admin - discount,
    };
  }
  return value;
};
totals = function () {
  const cart = getCart();
  const subtotal = Object.entries(cart).reduce(
    (sum, [id, qty]) => sum + (getProduct(id)?.price || 0) * Number(qty),
    0,
  );
  const admin = subtotal ? 10000 : 0,
    code = localStorage.getItem(voucherKey);
  let discount = 0;
  if (code === "HEMAT10" && subtotal >= 1000000) discount = subtotal * 0.1;
  if (code === "WELCOME5" && subtotal >= 500000) discount = subtotal * 0.05;
  return { subtotal, admin, discount, total: subtotal + admin - discount };
};
document.addEventListener("DOMContentLoaded", () => {
  const left = document.querySelector(".checkout-left");
  if (!left) return;
  const headings = [...left.querySelectorAll("h3")],
    paymentHeading = headings.find(
      (item) => item.textContent.trim() === "Metode Pembayaran",
    ),
    shippingHeading = headings.find(
      (item) => item.textContent.trim() === "Metode Pengiriman",
    );
  if (!paymentHeading || !shippingHeading) return;
  [...left.querySelectorAll("input[name='payment']")]
    .map((input) => input.closest("label"))
    .forEach((node) => shippingHeading.before(node));
  const paymentInfo = document.getElementById("paymentInfo");
  if (paymentInfo) shippingHeading.before(paymentInfo);
});
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("voucherCode")) {
    localStorage.removeItem(voucherKey);
    renderCart();
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const accountLink = document.querySelector(
    "#userAccountPanel .account-section-title a",
  );
  if (accountLink) {
    accountLink.href = "IT-II-ZynXiz-Tracking.html";
    accountLink.textContent = "Lacak Pesanan →";
  }
});
applyVoucher = function () {
  const code = document
    .getElementById("voucherCode")
    ?.value.trim()
    .toUpperCase();
  if (["HEMAT10", "WELCOME5"].includes(code)) {
    localStorage.setItem(voucherKey, code);
    showToast(`${code} berhasil digunakan.`);
  } else {
    localStorage.removeItem(voucherKey);
    showToast("Kode voucher tidak valid.", "error");
  }
  renderCart();
};
const baseFilterWithStock = filterProducts;
filterProducts = function () {
  baseFilterWithStock();
  const checked = document.getElementById("stockAvailable")?.checked;
  if (!checked) return;
  const grid = document.getElementById("productGrid");
  if (!grid) return;
  grid.querySelectorAll(".card").forEach((card) => {
    if (/Stok: 0/.test(card.textContent)) card.remove();
  });
};
function exportOrdersCSV() {
  const rows = [
    ["Nomor Pesanan", "Pembeli", "Total", "Status", "Tanggal"],
    ...getOrders().map((order) => [
      order.id,
      order.buyer,
      order.total,
      order.status,
      new Date(order.createdAt).toLocaleDateString("id-ID"),
    ]),
  ];
  const blob = new Blob(
    [
      rows
        .map((row) =>
          row
            .map((value) => `"${String(value).replaceAll('"', '""')}"`)
            .join(","),
        )
        .join("\n"),
    ],
    { type: "text/csv" },
  );
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "pesanan-phoenix-market.csv";
  link.click();
  URL.revokeObjectURL(link.href);
  showToast("Riwayat pesanan berhasil diekspor.");
}
const baseSuccessWhatsApp = showSuccessModal;
showSuccessModal = function (id) {
  baseSuccessWhatsApp(id);
  const box = document.querySelector("#successModal .success-box");
  if (!box || document.getElementById("whatsappOrderConfirm")) return;
  const link = document.createElement("a");
  link.id = "whatsappOrderConfirm";
  link.className = "btn-b";
  link.target = "_blank";
  link.rel = "noopener";
  link.textContent = "Konfirmasi via WhatsApp";
  link.href = `https://wa.me/6282115287095?text=${encodeURIComponent(`Halo Phoenix Market, saya sudah membuat pesanan ${id}.`)}`;
  box.appendChild(link);
};
document.addEventListener("DOMContentLoaded", () =>
  document
    .getElementById("stockAvailable")
    ?.addEventListener("change", filterProducts),
);

function openStockEditor(id) {
  const product = getProduct(id);
  if (!product) return;
  let modal = document.getElementById("stockEditor");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "stockEditor";
    modal.className = "admin-confirm";
    document.body.appendChild(modal);
  }
  modal.innerHTML = `<div class="admin-confirm-backdrop"></div><section class="admin-confirm-card"><h2>Atur Stok</h2><p>${product.name}</p><input id="stockEditorValue" class="checkout-input" type="number" min="0" value="${stockOf(product)}"><div><button class="btn-b" type="button" data-cancel>Batal</button><button class="btn-buy" type="button" data-save>Simpan</button></div></section>`;
  modal.hidden = false;
  modal.querySelector("[data-cancel]").onclick = () => (modal.hidden = true);
  modal.querySelector(".admin-confirm-backdrop").onclick = () =>
    (modal.hidden = true);
  modal.querySelector("[data-save]").onclick = () => {
    const stock = Number(modal.querySelector("#stockEditorValue").value);
    if (!Number.isInteger(stock) || stock < 0)
      return showToast("Stok harus 0 atau lebih.", "error");
    product.stock = stock;
    saveProductStocks();
    renderProducts();
    renderCart();
    renderAdminProductList();
    modal.hidden = true;
    showToast(`Stok ${product.name} berhasil diperbarui.`);
  };
}
updateStock = openStockEditor;
deleteAdminProduct = openDeleteConfirmation;
document.addEventListener("DOMContentLoaded", () => {
  const brand = document.querySelector("header .e-nama");
  if (!brand) return;
  const title = document.body.classList.contains("admin-theme")
    ? "PHOENIX ADMIN"
    : "PHOENIX MARKET";
  brand.innerHTML = `<img class="nav-brand-image" src="images/pngegg.png" alt="Logo Phoenix" style="width:42px;height:42px;object-fit:contain"><span>${title}</span>`;
});
