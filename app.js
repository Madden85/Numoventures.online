/***********************
 * NUMO CUSTOMER WEBSITE V6
 * Simple store layout
 ***********************/

const API_URL = "https://script.google.com/macros/s/AKfycbwqqBJ1A9tqYhPhEJe37Ik3-HGKZOHUUHqdf_jtLJuTv8tqQpt6WqX5jUBQwKPMbM92tw/exec";
let telegramUsername = "ownernumoventures";
let selectedCategory = "Semua";

let editableContent = {
  brandName: "NUMO VENTURES",
  brandTagline: "Trusted Since 2015",
  topbarCta: "Order Sekarang",
  heroBadge: "PROMO PREMIUM TERKINI",
  heroTitle: "Akaun premium murah, trusted & full warranty.",
  heroDesc: "Pilih produk pilihan anda, tekan order, dan terus chat admin Telegram.",
  heroPrimaryBtn: "Lihat Produk",
  heroSecondaryBtn: "Chat Admin",
  heroEmoji: "⭐",
  heroCardTitle: "Premium Account",
  heroCardText: "Netflix, YouTube, Disney, Sooka, Viu, iQiyi dan Spotify dalam satu tempat.",
  productSectionTitle: "Produk Premium",
  productSectionSubtitle: "Pilih produk yang anda berminat.",
  testimoniTitle: "Testimoni Customer",
  testimoniSubtitle: "Antara bukti customer yang pernah order dengan NUMO VENTURES.",
  footerTitle: "Nak order sekarang?",
  footerText: "Tekan button di bawah dan terus chat dengan admin Telegram NUMO VENTURES.",
  footerBtn: "Chat Admin Sekarang",
  stickyTitle: "Nak order sekarang?",
  stickyText: "Terus chat admin Telegram",
  stickyBtn: "Order",
  copyrightText: "© 2026 NUMO VENTURES. Semua hak cipta terpelihara.",
  logo: "Numologo.jpg",
  trustCards: [
    { title: "Trusted Since 2015", text: "Seller dipercayai, support aktif dan ramai customer repeat order." },
    { title: "Full Warranty", text: "Jika ada masalah sepanjang tempoh langganan, admin akan bantu." },
    { title: "Fast Response", text: "Tekan order dan terus chat dengan admin melalui Telegram." }
  ],
  orderSteps: [
    { title: "Pilih produk", text: "Cari produk yang anda nak dan pilih plan yang sesuai." },
    { title: "Tekan order", text: "Button order akan terus buka Telegram dengan mesej siap-siap." },
    { title: "Admin proses", text: "Admin akan confirm bayaran dan bagi detail akaun anda." }
  ]
};

const products = [
  { name: "NETFLIX PREMIUM",
    image: "netflix.jpg", category: "Streaming", desc: "Private profile, boleh set nama sendiri dan pincode.", emoji: "🎬", badge: "Best Seller", color: "linear-gradient(135deg, #fee2e2, #ef4444)", plans: [
    { duration: "1 Bulan", price: "RM25", orderText: "Netflix 1 bulan", order: true },
    { duration: "2 Bulan", price: "RM45", orderText: "Netflix 2 bulan", order: true },
    { duration: "3 Bulan Promo", price: "RM60", orderText: "Netflix 3 bulan", note: "Promo", order: true },
    { duration: "6 Bulan", price: "RM120", order: false },
    { duration: "12 Bulan", price: "RM230", order: false }
  ]},
  { name: "YOUTUBE PREMIUM",
    image: "youtube.jpg", category: "Streaming", desc: "Pilihan Email Sendiri atau Email Seller.", emoji: "▶️", badge: "Hot Deal", color: "linear-gradient(135deg, #fee2e2, #f87171)", sections: [
    { title: "Email Sendiri", plans: [
      { duration: "1 Bulan", price: "RM16", orderText: "YT Sendiri 1 bulan", order: true },
      { duration: "3 Bulan", price: "RM45", orderText: "YT Sendiri 3 bulan", order: true },
      { duration: "6 Bulan", price: "RM85", order: false },
      { duration: "12 Bulan", price: "RM144", order: false }
    ]},
    { title: "Email Seller", plans: [
      { duration: "1 Bulan", price: "RM10", orderText: "YT Seller 1 bulan", order: true },
      { duration: "3 Bulan", price: "RM27", orderText: "YT Seller 3 bulan", order: true },
      { duration: "6 Bulan", price: "RM48", order: false },
      { duration: "12 Bulan", price: "RM84", order: false }
    ]}
  ]},
  { name: "DISNEY+ HOTSTAR",
    image: "disney.jpg", category: "Streaming", desc: "Akaun Disney+ Hotstar premium dengan warranty.", emoji: "🏰", badge: "Premium", color: "linear-gradient(135deg, #dbeafe, #2563eb)", plans: [
    { duration: "1 Bulan", price: "RM25", orderText: "Disney 1 bulan", order: true },
    { duration: "2 Bulan", price: "RM45", orderText: "Disney 2 bulan", order: true },
    { duration: "Promo 3 Bulan", price: "RM60", orderText: "Disney 3 bulan", order: true },
    { duration: "6 Bulan", price: "RM120", order: false },
    { duration: "12 Bulan", price: "RM230", order: false }
  ]},
  { name: "SOOKA PREMIUM",
    image: "sooka.jpg", category: "Streaming", desc: "Sooka premium dengan pilihan device TV, Phone atau Tablet.", emoji: "📡", badge: "Device", color: "linear-gradient(135deg, #dcfce7, #22c55e)", plans: [
    { duration: "1 Bulan", price: "RM25", orderText: "Sooka 1 bulan", order: true },
    { duration: "2 Bulan", price: "RM46", orderText: "Sooka 2 bulan", order: true },
    { duration: "6 Bulan", price: "RM120", order: false },
    { duration: "12 Bulan", price: "RM216", order: false }
  ]},
  { name: "VIU PREMIUM",
    image: "viu.jpg", category: "Streaming", desc: "Viu premium untuk drama, movie dan entertainment.", emoji: "📱", badge: "Value", color: "linear-gradient(135deg, #fef3c7, #f59e0b)", plans: [
    { duration: "1 Bulan", price: "RM15", orderText: "Viu 1 bulan", order: true },
    { duration: "2 Bulan", price: "RM26", orderText: "Viu 2 bulan", order: true },
    { duration: "6 Bulan", price: "RM66", order: false },
    { duration: "12 Bulan", price: "RM120", order: false }
  ]},
  { name: "iQIYI PREMIUM",
    image: "iqiyi.jpg", category: "Streaming", desc: "iQiyi premium murah dan sesuai untuk kaki drama.", emoji: "🎥", badge: "Popular", color: "linear-gradient(135deg, #d9f99d, #65a30d)", plans: [
    { duration: "1 Bulan", price: "RM15", orderText: "IQIYI 1 bulan", order: true },
    { duration: "2 Bulan", price: "RM26", orderText: "IQIYI 2 bulan", order: true },
    { duration: "Promo 3 Bulan", price: "RM33", orderText: "IQIYI 3 bulan", order: true },
    { duration: "6 Bulan", price: "RM66", order: false },
    { duration: "12 Bulan", price: "RM120", order: false }
  ]},
  { name: "SPOTIFY PREMIUM",
    image: "spotify.jpg", category: "Music", desc: "Spotify premium tanpa iklan, boleh skip dan offline mode.", emoji: "🎧", badge: "Music", color: "linear-gradient(135deg, #dcfce7, #16a34a)", plans: [
    { duration: "1 Bulan", price: "RM15", orderText: "Spotify 1 bulan", order: true },
    { duration: "2 Bulan", price: "RM28", orderText: "Spotify 2 bulan", order: true },
    { duration: "Promo 2 Bulan", price: "RM25", orderText: "Spotify promo", note: "Promo", order: true },
    { duration: "6 Bulan", price: "RM72", order: false },
    { duration: "12 Bulan", price: "RM120", order: false }
  ]}
];

const testimonies = Array.from({ length: 10 }, (_, index) => ({
  title: `Testimoni ${index + 1}`,
  image: `testimoni${index + 1}.jpg`
}));

const sookaDevices = [
  { key: "TV", label: "TV" },
  { key: "PHONE", label: "Phone" },
  { key: "TABLET", label: "Tablet" }
];

let websiteControl = { stock: [], promos: [], meta: {}, loaded: false };

const productsGrid = document.getElementById("productsGrid");
const productCount = document.getElementById("productCount");
const emptyBox = document.getElementById("emptyBox");
const searchInput = document.getElementById("searchInput");
const categoryButtons = document.getElementById("categoryButtons");
const syncStatus = document.getElementById("syncStatus");

document.addEventListener("DOMContentLoaded", async () => {
  await loadEditableContent();
  applyEditableContent();
  renderCategoryButtons();
  renderTrustCards();
  renderSteps();
  renderTestimonies();
  renderProducts();
  await loadWebsiteControl();
  renderProducts();
  renderCategoryButtons();
});

async function loadEditableContent() {
  try {
    const response = await fetch(`index2.html?_=${Date.now()}`);
    if (!response.ok) throw new Error("index2.html not found");
    const html = await response.text();
    const doc = new DOMParser().parseFromString(html, "text/html");
    const root = doc.querySelector("#editable-content");
    if (!root) throw new Error("editable-content not found");
    telegramUsername = root.dataset.telegramUsername || telegramUsername;
    editableContent.logo = root.dataset.logo || editableContent.logo;
    root.querySelectorAll("[data-key]").forEach(item => {
      editableContent[item.dataset.key] = item.textContent.trim();
    });
    const trustCards = [...root.querySelectorAll("#trustCards > div")].map(item => ({
      title: item.dataset.title || "",
      text: item.textContent.trim()
    })).filter(item => item.title || item.text);
    if (trustCards.length) editableContent.trustCards = trustCards;
    const orderSteps = [...root.querySelectorAll("#orderSteps > div")].map(item => ({
      title: item.dataset.title || "",
      text: item.textContent.trim()
    })).filter(item => item.title || item.text);
    if (orderSteps.length) editableContent.orderSteps = orderSteps;
  } catch (error) {
    console.warn("Using default editable content:", error.message);
  }
}

function applyEditableContent() {
  document.title = editableContent.brandName + " | Premium Account Store";
  ["brandName","brandTagline","topbarCta","heroBadge","heroTitle","heroDesc","heroPrimaryBtn","heroSecondaryBtn","heroEmoji","heroCardTitle","heroCardText","productSectionTitle","productSectionSubtitle","testimoniTitle","testimoniSubtitle","footerTitle","footerText","footerBtn","stickyTitle","stickyText","stickyBtn","copyrightText"].forEach(id => setText(id, editableContent[id]));
  setImage("brandLogo", editableContent.logo);
  setLink("topbarCta", createTelegramLink("Hi nak order"));
  setLink("heroSecondaryBtn", createTelegramLink("Hi nak order"));
  setLink("footerBtn", createTelegramLink("Hi nak order"));
  setLink("stickyBtn", createTelegramLink("Hi nak order"));
}

async function loadWebsiteControl() {
  setSyncStatus("Syncing...", "warn");
  try {
    const result = await jsonp({ mode: "getWebsiteControl", _: Date.now() });
    if (!result.ok) throw new Error(result.error || "Gagal load website control.");
    websiteControl = {
      stock: result.data?.stock || [],
      promos: result.data?.promos || [],
      meta: result.data?.meta || {},
      loaded: true
    };
    setSyncStatus("Live stock & promo", "ok");
  } catch (error) {
    websiteControl.loaded = false;
    setSyncStatus("Offline price mode", "warn");
  }
}

function setSyncStatus(text, type) {
  syncStatus.textContent = text;
  syncStatus.className = `sync-pill ${type || ""}`;
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text || "";
}
function setImage(id, src) {
  const el = document.getElementById(id);
  if (el && src) el.src = src;
}
function setLink(id, href) {
  const el = document.getElementById(id);
  if (el && href) el.href = href;
}
function createTelegramLink(text = "Hi nak order") {
  return `https://t.me/${telegramUsername}?text=${encodeURIComponent(text)}`;
}
function safeText(value = "") {
  return String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}
function safeAttr(value = "") { return safeText(value); }
function normalize(value = "") { return String(value || "").trim().toUpperCase(); }

function getCategories() {
  return ["Semua", ...new Set(products.map(product => product.category))];
}
function renderCategoryButtons() {
  categoryButtons.innerHTML = getCategories().map(category => {
    const activeClass = category === selectedCategory ? "active" : "";
    return `<button class="category-btn ${activeClass}" data-category="${safeAttr(category)}">${safeText(category)}</button>`;
  }).join("");
  categoryButtons.querySelectorAll(".category-btn").forEach(button => {
    button.addEventListener("click", () => {
      selectedCategory = button.dataset.category;
      renderCategoryButtons();
      renderProducts();
    });
  });
}
function renderTrustCards() {
  document.getElementById("trustStrip").innerHTML = editableContent.trustCards.map(card => `
    <div class="trust-card"><strong>${safeText(card.title)}</strong><p>${safeText(card.text)}</p></div>
  `).join("");
}
function renderSteps() {
  document.getElementById("stepsGrid").innerHTML = editableContent.orderSteps.map((step, index) => `
    <div class="step"><div class="step-no">${index + 1}</div><h3>${safeText(step.title)}</h3><p>${safeText(step.text)}</p></div>
  `).join("");
}

function renderTestimonies() {
  const grid = document.getElementById("testimoniGrid");
  const count = document.getElementById("testimoniCount");

  if (!grid) return;

  if (count) count.textContent = `${testimonies.length} gambar`;

  grid.innerHTML = testimonies.map(item => `
    <article class="testimoni-card">
      <img src="${safeAttr(item.image)}" alt="${safeAttr(item.title)}" loading="lazy">
      <p>${safeText(item.title)}</p>
    </article>
  `).join("");
}

function renderProducts() {
  const keyword = searchInput.value.toLowerCase().trim();
  const filteredProducts = products.filter(product => {
    const matchCategory = selectedCategory === "Semua" || product.category === selectedCategory;
    const matchKeyword = product.name.toLowerCase().includes(keyword) || product.category.toLowerCase().includes(keyword) || product.desc.toLowerCase().includes(keyword);
    return matchCategory && matchKeyword;
  });
  productCount.textContent = `${filteredProducts.length} produk`;
  if (filteredProducts.length === 0) {
    productsGrid.innerHTML = "";
    emptyBox.style.display = "block";
    return;
  }
  emptyBox.style.display = "none";
  productsGrid.innerHTML = filteredProducts.map(product => renderProductCard(product)).join("");
}
function renderProductCard(product) {
  const available = isProductAvailable(product.name, "ALL");
  const badgeText = available ? product.badge : "Habis Stok";
  const badgeClass = available ? "" : "sold";
  return `
    <div class="product-card">
      <div class="product-img" style="background: ${product.color};"><span class="badge ${badgeClass}">${safeText(badgeText)}</span><img class="product-photo" src="${safeAttr(product.image || "")}" alt="${safeAttr(product.name)}" loading="lazy" onerror="this.closest('.product-img').classList.add('image-failed')"><span class="product-emoji-fallback">${safeText(product.emoji)}</span></div>
      <div class="product-info">
        <div class="product-category">${safeText(product.category)}</div>
        <div class="product-name">${safeText(product.name)}</div>
        <div class="product-desc">${safeText(product.desc)}</div>
        ${product.name === "SOOKA PREMIUM" ? renderSookaDeviceBox() : ""}
        ${product.sections ? renderProductSections(product) : renderPlans(product.plans, product.name, "ALL")}
      </div>
    </div>`;
}
function renderProductSections(product) {
  return `<div class="section-list">${product.sections.map(section => {
    const available = isStockOn(product.name, section.title);
    return `<div class="section-block"><div class="section-block-title"><span>${safeText(section.title)}</span><span class="mini-stock ${available ? "" : "off"}">${available ? "Ready" : getStockText(product.name, section.title)}</span></div>${renderPlans(section.plans, product.name, section.title)}</div>`;
  }).join("")}</div>`;
}
function renderPlans(plans = [], productName = "", sectionName = "ALL") {
  return `<div class="plans">${plans.map(plan => renderPlan(plan, productName, sectionName)).join("")}</div>`;
}
function renderPlan(plan, productName, sectionName) {
  const available = isProductAvailable(productName, sectionName);
  const promo = getPromo(productName, sectionName, plan.duration);
  const promoActive = isPromoActive(promo) && promo.promoPrice;
  const displayPrice = promoActive ? promo.promoPrice : plan.price;
  const badgeText = promoActive ? getBadgeText(promo) : "";
  const badgeClass = promoActive ? getBadgeColorClass(promo.badgeColor) : "";
  const promoNote = promoActive && promo.note ? promo.note : "";
  const normalNote = plan.note ? plan.note : "";
  const orderText = plan.orderText || `${productName} ${plan.duration}`;
  const askText = `Hi, nak tanya ${productName} ${sectionName !== "ALL" ? sectionName + " " : ""}${plan.duration}`;
  let linkText = plan.order === false ? askText : orderText;
  if (productName === "SOOKA PREMIUM") {
    const availableDevices = getAvailableSookaDevices().map(device => device.label);
    if (availableDevices.length) linkText = `${orderText} - Device available: ${availableDevices.join(", ")}`;
  }
  const buttonLabel = !available ? getStockText(productName, sectionName) : plan.order === false ? "Tanya Admin" : "Order";
  const buttonClass = !available ? "order-btn disabled" : plan.order === false ? "order-btn ask" : "order-btn";
  const buttonHtml = !available ? `<span class="${buttonClass}">${safeText(buttonLabel)}</span>` : `<a class="${buttonClass}" href="${createTelegramLink(linkText)}" target="_blank" rel="noopener noreferrer">${safeText(buttonLabel)}</a>`;
  return `<div class="plan-card ${available ? "" : "sold-out"}"><div class="plan-top"><div><div class="plan-name">${safeText(plan.duration)}</div>${promoNote ? `<div class="plan-note">${safeText(promoNote)}</div>` : ""}${normalNote && !promoActive ? `<div class="plan-note">${safeText(normalNote)}</div>` : ""}</div>${promoActive ? `<span class="promo-badge ${badgeClass}">${safeText(badgeText)}</span>` : ""}</div><div class="price-row"><div><span class="price">${safeText(displayPrice)}</span>${promoActive ? `<span class="old-price">${safeText(plan.price)}</span>` : ""}</div><span class="stock ${available ? "" : "off"}">${available ? "Ready" : getStockText(productName, sectionName)}</span></div>${buttonHtml}</div>`;
}
function renderSookaDeviceBox() {
  const devices = getSookaDeviceStates();
  return `<div class="device-box"><div class="device-title">Device Available</div><div class="device-row">${devices.map(device => {
    const cls = device.status === "ON" ? "on" : "off";
    const icon = device.status === "ON" ? "✅" : "❌";
    return `<span class="device-pill ${cls}">${safeText(device.label)} ${icon}</span>`;
  }).join("")}</div></div>`;
}
function getStock(product, section = "ALL") {
  return websiteControl.stock.find(item => normalize(item.product) === normalize(product) && normalize(item.section || "ALL") === normalize(section || "ALL"));
}
function isStockOn(product, section = "ALL") {
  const stock = getStock(product, section);
  if (!stock) return true;
  return normalize(stock.status) !== "OFF";
}
function getStockText(product, section = "ALL") {
  const stock = getStock(product, section);
  return stock?.stockText || "Habis Stok";
}
function getSookaDeviceStates() {
  const deviceRows = sookaDevices.map(device => {
    const stock = getStock("SOOKA PREMIUM", device.key);
    return { ...device, exists: Boolean(stock), status: stock ? (normalize(stock.status) === "OFF" ? "OFF" : "ON") : "MISSING", stockText: stock?.stockText || "Habis Stok" };
  });
  const hasDeviceRows = deviceRows.some(device => device.exists);
  if (!hasDeviceRows) {
    const fallbackOn = isStockOn("SOOKA PREMIUM", "ALL");
    return sookaDevices.map(device => ({ ...device, exists: false, status: fallbackOn ? "ON" : "OFF", stockText: getStockText("SOOKA PREMIUM", "ALL") }));
  }
  return deviceRows;
}
function getAvailableSookaDevices() {
  return getSookaDeviceStates().filter(device => device.status === "ON");
}
function isProductAvailable(productName, section = "ALL") {
  if (productName === "SOOKA PREMIUM") return getAvailableSookaDevices().length > 0;
  return isStockOn(productName, section);
}
function getPromo(product, section, duration) {
  return websiteControl.promos.find(item => normalize(item.product) === normalize(product) && normalize(item.section || "ALL") === normalize(section || "ALL") && normalize(item.duration) === normalize(duration));
}
function isPromoActive(promo) {
  if (!promo) return false;
  return normalize(promo.promoActive) === "YES" || normalize(promo.promoActive) === "ON";
}
function getBadgeText(promo) {
  if (!promo) return "";
  const preset = promo.badgePreset || "Promo";
  return preset === "Custom" ? (promo.badgeCustomText || "Promo") : (promo.badgeText || preset || "Promo");
}
function getBadgeColorClass(color = "Gold") {
  const value = normalize(color);
  if (value === "GREEN") return "green";
  if (value === "RED") return "red";
  if (value === "BLUE") return "blue";
  if (value === "PURPLE" || value === "PINK") return "purple";
  if (value === "DARK" || value === "BLACK") return "dark";
  return "gold";
}
function jsonp(params) {
  return new Promise((resolve, reject) => {
    const callbackName = "numoCustomerCb_" + Date.now() + "_" + Math.floor(Math.random() * 100000);
    const query = new URLSearchParams({ ...params, callback: callbackName });
    const script = document.createElement("script");
    const timer = setTimeout(() => { cleanup(); reject(new Error("Request timeout")); }, 15000);
    window[callbackName] = result => { cleanup(); resolve(result); };
    function cleanup() {
      clearTimeout(timer);
      delete window[callbackName];
      if (script.parentNode) script.parentNode.removeChild(script);
    }
    script.onerror = () => { cleanup(); reject(new Error("Network/API error")); };
    script.src = API_URL + "?" + query.toString();
    document.body.appendChild(script);
  });
}
searchInput.addEventListener("input", renderProducts);
