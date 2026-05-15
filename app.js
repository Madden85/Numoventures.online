const telegramUsername = "ownernumoventures";

// Apps Script Web App URL untuk STOCK_CONTROL + PROMO_CONTROL
const WEBSITE_CONTROL_API_URL = "https://script.google.com/macros/s/AKfycbwqqBJ1A9tqYhPhEJe37Ik3-HGKZOHUUHqdf_jtLJuTv8tqQpt6WqX5jUBQwKPMbM92tw/exec";

let websiteControl = {
  stock: [],
  promos: [],
  meta: {}
};

const products = [
  {
    name: "NETFLIX PREMIUM",
    badge: "Best Seller",
    features: [
      "Dapat 1 private profile (boleh set nama sendiri)",
      "Profile boleh letak pincode sendiri (orang lain tak boleh access)",
      "Tiada masalah screen limit sebab 1 profile 1 user je yang guna"
    ],
    plans: [
      { duration: "1 Bulan", price: "RM25", orderText: "Netflix 1 bulan", order: true },
      { duration: "2 Bulan", price: "RM45", orderText: "Netflix 2 bulan", order: true },
      { duration: "3 Bulan Promo", price: "RM60", note: "Promo", orderText: "Netflix 3 bulan", order: true },
      { duration: "6 Bulan", price: "RM120", order: false },
      { duration: "12 Bulan", price: "RM230", order: false }
    ]
  },
  {
    name: "YOUTUBE PREMIUM",
    badge: "Hot Deal",
    sections: [
      {
        title: "Email Sendiri",
        features: [
          "Boleh guna email sendiri",
          "Family invitation"
        ],
        plans: [
          { duration: "1 Bulan", price: "RM16", orderText: "YT Sendiri 1 bulan", order: true },
          { duration: "3 Bulan", price: "RM45", orderText: "YT Sendiri 3 bulan", order: true },
          { duration: "6 Bulan", price: "RM85", order: false },
          { duration: "12 Bulan", price: "RM144", order: false }
        ]
      },
      {
        title: "Email Seller",
        features: [
          "Guna email dari seller",
          "Dapat email dan password, terus boleh sign in"
        ],
        plans: [
          { duration: "1 Bulan", price: "RM10", orderText: "YT Seller 1 bulan", order: true },
          { duration: "3 Bulan", price: "RM27", orderText: "YT Seller 3 bulan", order: true },
          { duration: "6 Bulan", price: "RM48", order: false },
          { duration: "12 Bulan", price: "RM84", order: false }
        ]
      }
    ]
  },
  {
    name: "DISNEY+ HOTSTAR",
    badge: "Premium",
    plans: [
      { duration: "1 Bulan", price: "RM25", orderText: "Disney 1 bulan", order: true },
      { duration: "2 Bulan", price: "RM45", orderText: "Disney 2 bulan", order: true },
      { duration: "Promo 3 Bulan", price: "RM60", orderText: "Disney 3 bulan", order: true },
      { duration: "6 Bulan", price: "RM120", order: false },
      { duration: "12 Bulan", price: "RM230", order: false }
    ]
  },
  {
    name: "SOOKA PREMIUM",
    badge: "Exclusive",
    plans: [
      { duration: "1 Bulan", price: "RM25", orderText: "Sooka 1 bulan", order: true },
      { duration: "2 Bulan", price: "RM46", orderText: "Sooka 2 bulan", order: true },
      { duration: "6 Bulan", price: "RM120", order: false },
      { duration: "12 Bulan", price: "RM216", order: false }
    ]
  },
  {
    name: "VIU PREMIUM",
    badge: "Value",
    plans: [
      { duration: "1 Bulan", price: "RM15", orderText: "Viu 1 bulan", order: true },
      { duration: "2 Bulan", price: "RM26", orderText: "Viu 2 bulan", order: true },
      { duration: "6 Bulan", price: "RM66", order: false },
      { duration: "12 Bulan", price: "RM120", order: false }
    ]
  },
  {
    name: "iQIYI PREMIUM",
    badge: "Popular",
    plans: [
      { duration: "1 Bulan", price: "RM15", orderText: "IQIYI 1 bulan", order: true },
      { duration: "2 Bulan", price: "RM26", orderText: "IQIYI 2 bulan", order: true },
      { duration: "Promo 3 Bulan", price: "RM33", orderText: "IQIYI 3 bulan", order: true },
      { duration: "6 Bulan", price: "RM66", order: false },
      { duration: "12 Bulan", price: "RM120", order: false }
    ]
  },
  {
    name: "SPOTIFY PREMIUM",
    badge: "Music Deal",
    features: [
      "Tiada iklan",
      "Skip tanpa had",
      "Offline mode",
      "Audio high quality"
    ],
    plans: [
      { duration: "1 Bulan", price: "RM15", orderText: "Spotify 1 bulan", order: true },
      { duration: "2 Bulan", price: "RM28", orderText: "Spotify 2 bulan", order: true },
      { duration: "Promo 2 Bulan", price: "RM25", note: "Promo", orderText: "Spotify promo", order: true },
      { duration: "6 Bulan", price: "RM72", order: false },
      { duration: "12 Bulan", price: "RM120", order: false }
    ]
  }
];

const testimonies = Array.from({ length: 10 }, (_, i) => ({
  title: `Testimoni ${i + 1}`,
  image: `testimoni${i + 1}.jpg`
}));

const productIcons = {
  "NETFLIX PREMIUM": "🎬",
  "YOUTUBE PREMIUM": "▶️",
  "DISNEY+ HOTSTAR": "🏰",
  "SOOKA PREMIUM": "📡",
  "VIU PREMIUM": "📱",
  "iQIYI PREMIUM": "🎥",
  "SPOTIFY PREMIUM": "🎧"
};

function createTelegramLink(text = "Hi nak order") {
  return `https://t.me/${telegramUsername}?text=${encodeURIComponent(text)}`;
}

function safeText(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function slugify(text = "") {
  return String(text)
    .toLowerCase()
    .replace(/\+/g, "plus")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeKey(value = "") {
  return String(value).trim().toUpperCase();
}

function getProductIcon(productName = "") {
  return productIcons[productName] || "⭐";
}

function getTotalPlans(product) {
  if (product.sections) {
    return product.sections.reduce((total, section) => total + (section.plans?.length || 0), 0);
  }
  return product.plans?.length || 0;
}

function getStockSetting(productName = "", sectionName = "ALL") {
  const section = sectionName || "ALL";
  const exact = websiteControl.stock.find(item =>
    normalizeKey(item.product) === normalizeKey(productName) &&
    normalizeKey(item.section || "ALL") === normalizeKey(section)
  );

  if (exact) return exact;

  const fallback = websiteControl.stock.find(item =>
    normalizeKey(item.product) === normalizeKey(productName) &&
    normalizeKey(item.section || "ALL") === "ALL"
  );

  return fallback || {
    product: productName,
    section,
    status: "ON",
    stockText: "Habis Stok"
  };
}

function isStockOn(productName = "", sectionName = "ALL") {
  const stock = getStockSetting(productName, sectionName);
  return normalizeKey(stock.status || "ON") !== "OFF";
}

function getStockText(productName = "", sectionName = "ALL") {
  const stock = getStockSetting(productName, sectionName);
  return stock.stockText || "Habis Stok";
}

function getPromoSetting(productName = "", sectionName = "ALL", duration = "") {
  const section = sectionName || "ALL";
  return websiteControl.promos.find(item =>
    normalizeKey(item.product) === normalizeKey(productName) &&
    normalizeKey(item.section || "ALL") === normalizeKey(section) &&
    normalizeKey(item.duration) === normalizeKey(duration)
  );
}

function isPromoActive(promo) {
  return Boolean(
    promo &&
    normalizeKey(promo.promoActive) === "YES" &&
    String(promo.promoPrice || "").trim()
  );
}

function getBadgeColorClass(color = "Gold") {
  const normalized = String(color || "Gold").toLowerCase().replace(/\s+/g, "-").replace(/\//g, "-");

  if (normalized.includes("green")) return "badge-green";
  if (normalized.includes("red")) return "badge-red";
  if (normalized.includes("blue")) return "badge-blue";
  if (normalized.includes("purple") || normalized.includes("pink")) return "badge-purple";
  if (normalized.includes("dark") || normalized.includes("black")) return "badge-dark";

  return "badge-gold";
}

function updateSyncStatus(status, message) {
  const el = document.getElementById("syncStatus");
  if (!el) return;

  el.classList.remove("ok", "error");
  if (status) el.classList.add(status);
  el.textContent = message;
}

async function loadWebsiteControl() {
  updateSyncStatus("", "⏳ Semak stok & promo...");

  try {
    const url = `${WEBSITE_CONTROL_API_URL}?mode=getWebsiteControl&t=${Date.now()}`;
    const response = await fetch(url);
    const result = await response.json();

    if (!result.ok) {
      throw new Error(result.error || "API error");
    }

    websiteControl = result.data || { stock: [], promos: [], meta: {} };
    updateSyncStatus("ok", "✅ Stok & promo terkini");
  } catch (error) {
    console.error("Website control load failed:", error);
    websiteControl = { stock: [], promos: [], meta: {} };
    updateSyncStatus("error", "⚠️ Gagal sync. Harga asal dipaparkan");
  }
}

function renderFeatures(features = []) {
  if (!features.length) return "";
  return `
    <ul class="features">
      ${features.map(item => `<li>${safeText(item)}</li>`).join("")}
    </ul>
  `;
}

function renderPrice(plan = {}, promo = null) {
  if (isPromoActive(promo)) {
    return `
      <div class="price-wrap">
        <span class="plan-price old-price">${safeText(plan.price)}</span>
        <strong class="promo-price">${safeText(promo.promoPrice)}</strong>
      </div>
    `;
  }

  return `
    <div class="price-wrap">
      <strong class="plan-price">${safeText(plan.price)}</strong>
    </div>
  `;
}

function renderPromoInfo(promo = null) {
  if (!isPromoActive(promo)) return "";

  const badgeText = promo.badgeText || promo.badgePreset || "Promo";
  const badgeClass = getBadgeColorClass(promo.badgeColor || "Gold");
  const note = promo.note ? `<span class="promo-note">${safeText(promo.note)}</span>` : "";

  return `
    <div class="promo-info">
      <span class="promo-badge ${badgeClass}">${safeText(badgeText)}</span>
      ${note}
    </div>
  `;
}

function renderPlan(plan = {}, productName = "", sectionName = "ALL") {
  const promo = getPromoSetting(productName, sectionName, plan.duration);
  const promoActive = isPromoActive(promo);
  const stockOn = isStockOn(productName, sectionName);
  const stockText = getStockText(productName, sectionName);

  const orderText = plan.orderText || `${productName} ${plan.duration}`;
  const askText = `Hi, nak tanya ${productName} ${sectionName !== "ALL" ? sectionName + " " : ""}${plan.duration}`;
  const linkText = plan.order === false ? askText : orderText;
  const buttonLabel = stockOn ? (plan.order === false ? "Tanya Admin" : "Order") : stockText;
  const buttonClass = stockOn
    ? (plan.order === false ? "plan-btn plan-btn-soft" : "plan-btn")
    : "plan-btn plan-btn-disabled";
  const buttonHref = stockOn ? createTelegramLink(linkText) : "#";
  const note = plan.note && !promoActive ? `<span class="plan-note">${safeText(plan.note)}</span>` : "";

  return `
    <div class="plan-card ${promoActive ? "has-promo" : ""} ${stockOn ? "" : "stock-disabled"}">
      <div>
        <div class="plan-main">
          <span class="plan-duration">${safeText(plan.duration)}</span>
          ${note}
        </div>
        ${renderPromoInfo(promo)}
      </div>
      <div class="plan-side">
        ${renderPrice(plan, promo)}
        <a class="${buttonClass}" href="${buttonHref}" ${stockOn ? 'target="_blank" rel="noopener noreferrer"' : 'aria-disabled="true"'}>${safeText(buttonLabel)}</a>
      </div>
    </div>
  `;
}

function renderPlans(plans = [], productName = "", sectionName = "ALL") {
  if (!plans.length) return "";
  return `
    <div class="plans">
      ${plans.map(plan => renderPlan(plan, productName, sectionName)).join("")}
    </div>
  `;
}

function renderSections(sections = [], productName = "") {
  if (!sections.length) return "";
  return `
    <div class="sub-list">
      ${sections.map(section => {
        const stockOn = isStockOn(productName, section.title);
        const stockText = getStockText(productName, section.title);

        return `
          <div class="sub-block ${stockOn ? "" : "stock-off"}">
            <div class="sub-title-wrap">
              <span class="sub-title">${safeText(section.title)}</span>
              <span class="sub-pill ${stockOn ? "" : "stock-pill"}">${stockOn ? "Pilihan" : safeText(stockText)}</span>
            </div>
            ${renderFeatures(section.features)}
            ${renderPlans(section.plans, productName, section.title)}
          </div>
        `;
      }).join("")}
    </div>
  `;
}

function renderProductNav() {
  const nav = document.getElementById("productNav");
  if (!nav) return;

  nav.innerHTML = products.map(product => {
    const id = slugify(product.name);
    return `
      <button class="product-chip" type="button" data-target="${id}">
        <span>${getProductIcon(product.name)}</span>
        <span>${safeText(product.name.replace(" PREMIUM", ""))}</span>
      </button>
    `;
  }).join("");
}

function renderProducts() {
  const container = document.getElementById("products");
  if (!container) return;

  container.innerHTML = products.map((product, index) => {
    const id = slugify(product.name);
    const planCount = getTotalPlans(product);
    const isFeatured = index === 0;
    const productStockOn = product.sections
      ? product.sections.some(section => isStockOn(product.name, section.title))
      : isStockOn(product.name, "ALL");
    const productBadge = productStockOn ? (product.badge || "Premium") : "Habis Stok";

    return `
      <article id="${id}" class="product-card ${isFeatured ? "product-featured" : ""} ${productStockOn ? "" : "stock-off"}">
        <div class="product-glow"></div>
        <div class="product-head">
          <div class="product-identity">
            <div class="product-icon">${getProductIcon(product.name)}</div>
            <div>
              <p class="product-kicker">${planCount} pakej tersedia</p>
              <h3 class="product-title">${safeText(product.name)}</h3>
            </div>
          </div>
          <span class="product-badge">${safeText(productBadge)}</span>
        </div>

        ${product.features ? renderFeatures(product.features) : ""}
        ${product.sections ? renderSections(product.sections, product.name) : ""}
        ${product.plans ? renderPlans(product.plans, product.name, "ALL") : ""}
      </article>
    `;
  }).join("");
}

function renderTestimonies() {
  const container = document.getElementById("testimoni");
  if (!container) return;

  container.innerHTML = testimonies.map(item => `
    <article class="testimoni-card">
      <img src="${safeText(item.image)}" alt="${safeText(item.title)}" loading="lazy">
      <p>${safeText(item.title)}</p>
    </article>
  `).join("");
}

function initProductNav() {
  document.querySelectorAll(".product-chip").forEach(button => {
    button.addEventListener("click", () => {
      const target = document.getElementById(button.dataset.target);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function initFooterYear() {
  const yearEl = document.getElementById("currentYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

async function initSite() {
  renderProductNav();
  renderProducts();
  renderTestimonies();
  initProductNav();
  initFooterYear();

  await loadWebsiteControl();
  renderProducts();
}

document.addEventListener("DOMContentLoaded", initSite);
