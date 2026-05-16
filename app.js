/***********************
 * NUMO CUSTOMER WEBSITE
 * V4 - Sooka device availability
 ***********************/

const API_URL = "https://script.google.com/macros/s/AKfycbwqqBJ1A9tqYhPhEJe37Ik3-HGKZOHUUHqdf_jtLJuTv8tqQpt6WqX5jUBQwKPMbM92tw/exec";
const telegramUsername = "ownernumoventures";

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

const sookaDevices = [
  { key: "TV", label: "TV" },
  { key: "PHONE", label: "Phone" },
  { key: "TABLET", label: "Tablet" }
];

let websiteControl = {
  stock: [],
  promos: [],
  meta: {},
  loaded: false
};

document.addEventListener("DOMContentLoaded", async () => {
  renderProductNav();
  renderProducts();
  renderTestimonies();
  initProductNav();
  initFooterYear();

  await loadWebsiteControl();

  renderProducts();
});

async function loadWebsiteControl() {
  try {
    const result = await jsonp({
      mode: "getWebsiteControl",
      _: Date.now()
    });

    if (!result.ok) {
      throw new Error(result.error || "Gagal load website control.");
    }

    websiteControl = {
      stock: result.data?.stock || [],
      promos: result.data?.promos || [],
      meta: result.data?.meta || {},
      loaded: true
    };

    showSyncNote("");

  } catch (error) {
    websiteControl.loaded = false;
    showSyncNote("Status stok/promo gagal sync buat sementara. Harga asal masih dipaparkan.");
  }
}

function createTelegramLink(text = "Hi nak order") {
  return `https://t.me/${telegramUsername}?text=${encodeURIComponent(text)}`;
}

function safeText(value = "") {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function safeAttr(value = "") {
  return safeText(value);
}

function normalize(value = "") {
  return String(value || "").trim().toUpperCase();
}

function slugify(text = "") {
  return String(text)
    .toLowerCase()
    .replace(/\+/g, "plus")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
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

function getStock(product, section = "ALL") {
  return websiteControl.stock.find(item =>
    normalize(item.product) === normalize(product) &&
    normalize(item.section || "ALL") === normalize(section || "ALL")
  );
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

    return {
      ...device,
      exists: Boolean(stock),
      status: stock ? (normalize(stock.status) === "OFF" ? "OFF" : "ON") : "MISSING",
      stockText: stock?.stockText || "Habis Stok"
    };
  });

  const hasDeviceRows = deviceRows.some(device => device.exists);

  if (!hasDeviceRows) {
    const fallbackOn = isStockOn("SOOKA PREMIUM", "ALL");

    return sookaDevices.map(device => ({
      ...device,
      exists: false,
      status: fallbackOn ? "ON" : "OFF",
      stockText: getStockText("SOOKA PREMIUM", "ALL")
    }));
  }

  return deviceRows;
}

function getAvailableSookaDevices() {
  return getSookaDeviceStates().filter(device => device.status === "ON");
}

function isProductAvailable(productName, section = "ALL") {
  if (productName === "SOOKA PREMIUM") {
    return getAvailableSookaDevices().length > 0;
  }

  return isStockOn(productName, section);
}

function getPromo(product, section, duration) {
  return websiteControl.promos.find(item =>
    normalize(item.product) === normalize(product) &&
    normalize(item.section || "ALL") === normalize(section || "ALL") &&
    normalize(item.duration) === normalize(duration)
  );
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

function renderFeatures(features = []) {
  if (!features.length) return "";

  return `
    <ul class="features">
      ${features.map(item => `<li>${safeText(item)}</li>`).join("")}
    </ul>
  `;
}

function renderSookaDeviceBox() {
  const devices = getSookaDeviceStates();
  const available = devices.filter(device => device.status === "ON").map(device => device.label);

  const subtitle = available.length
    ? `Device available sekarang: ${available.join(", ")}`
    : "Semua device Sooka sedang habis stok buat masa ini.";

  return `
    <div class="device-box">
      <div>
        <div class="device-title">📡 Pilihan Device Sooka</div>
        <div class="device-subtitle">${safeText(subtitle)}</div>
      </div>

      <div class="device-pills">
        ${devices.map(device => {
          const cls = device.status === "ON" ? "on" : device.status === "OFF" ? "off" : "missing";
          const text = device.status === "ON" ? "Available" : device.status === "OFF" ? "Habis" : "Belum setup";

          return `<span class="device-pill ${cls}">${safeText(device.label)} • ${safeText(text)}</span>`;
        }).join("")}
      </div>
    </div>
  `;
}

function renderPlan(plan = {}, productName = "", sectionName = "ALL") {
  const productAvailable = isProductAvailable(productName, sectionName);
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
    if (availableDevices.length) {
      linkText = `${orderText} - Device available: ${availableDevices.join(", ")}`;
    }
  }

  const buttonLabel = !productAvailable
    ? getStockText(productName, sectionName)
    : plan.order === false
      ? "Tanya Admin"
      : "Order";

  const buttonClass = !productAvailable
    ? "plan-btn plan-btn-disabled"
    : plan.order === false
      ? "plan-btn plan-btn-soft"
      : "plan-btn";

  const buttonHtml = !productAvailable
    ? `<span class="${buttonClass}">${safeText(buttonLabel)}</span>`
    : `<a class="${buttonClass}" href="${createTelegramLink(linkText)}" target="_blank" rel="noopener noreferrer">${safeText(buttonLabel)}</a>`;

  return `
    <div class="plan-card ${productAvailable ? "" : "sold-out"}">
      <div class="plan-main">
        <div class="plan-line">
          <span class="plan-duration">${safeText(plan.duration)}</span>
          ${normalNote && !promoActive ? `<span class="plan-note">${safeText(normalNote)}</span>` : ""}
          ${promoActive ? `<span class="promo-badge ${badgeClass}">${safeText(badgeText)}</span>` : ""}
        </div>
        ${promoNote ? `<div class="promo-note-text">${safeText(promoNote)}</div>` : ""}
      </div>

      <div class="plan-side">
        <div class="price-wrap">
          ${promoActive ? `<span class="old-price">${safeText(plan.price)}</span>` : ""}
          <strong class="plan-price">${safeText(displayPrice)}</strong>
        </div>
        ${buttonHtml}
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
      ${sections.map(section => `
        <div class="sub-block">
          <div class="sub-title-wrap">
            <span class="sub-title">${safeText(section.title)}</span>
            <span class="sub-pill">${isProductAvailable(productName, section.title) ? "Available" : "Habis Stok"}</span>
          </div>
          ${renderFeatures(section.features)}
          ${renderPlans(section.plans, productName, section.title)}
        </div>
      `).join("")}
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
    const available = isProductAvailable(product.name, "ALL");

    const productBadge = !available
      ? "Habis Stok"
      : product.badge || "Premium";

    return `
      <article id="${id}" class="product-card ${isFeatured ? "product-featured" : ""}">
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
        ${product.name === "SOOKA PREMIUM" ? renderSookaDeviceBox() : ""}
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
      <img src="${safeAttr(item.image)}" alt="${safeAttr(item.title)}" loading="lazy">
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

function showSyncNote(message = "") {
  const note = document.getElementById("syncNote");
  if (!note) return;

  if (!message) {
    note.classList.remove("show");
    note.textContent = "";
    return;
  }

  note.textContent = message;
  note.classList.add("show");
}

function jsonp(params) {
  return new Promise((resolve, reject) => {
    const callbackName = "numoCustomerCb_" + Date.now() + "_" + Math.floor(Math.random() * 100000);
    const query = new URLSearchParams({
      ...params,
      callback: callbackName
    });

    const script = document.createElement("script");

    const timer = setTimeout(() => {
      cleanup();
      reject(new Error("Request timeout"));
    }, 15000);

    window[callbackName] = result => {
      cleanup();
      resolve(result);
    };

    function cleanup() {
      clearTimeout(timer);
      delete window[callbackName];

      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    }

    script.onerror = () => {
      cleanup();
      reject(new Error("Network/API error"));
    };

    script.src = API_URL + "?" + query.toString();
    document.body.appendChild(script);
  });
}
