/***********************
 * NUMO CUSTOMER WEBSITE STEP 4 V7.5
 * RESELLER REFERRAL LINK + STATUS FALLBACK
 * Hot Selling + Auto Assign Reseller + 5-min Admin Handoff
 ***********************/

const API_URL = "https://script.google.com/macros/s/AKfycbwqqBJ1A9tqYhPhEJe37Ik3-HGKZOHUUHqdf_jtLJuTv8tqQpt6WqX5jUBQwKPMbM92tw/exec";
const REFERRAL_CODE = getReferralCodeFromUrl();
const STORAGE_KEY = "numo_active_lead_v75";
const ADMIN_TELEGRAM_USERNAME = "ownernumoventures";
const ADMIN_TELEGRAM_URL = "https://t.me/" + ADMIN_TELEGRAM_USERNAME;

let selectedCategory = "Semua";
let activeLead = null;
let pendingSookaOrder = null;
let countdownTimer = null;
let hotItems = [];
let hotIndex = 0;
let hotTimer = null;

let uiText = {
  categoryAll: "Semua",
  searchPlaceholder: "Cari produk...",
  emptySearchText: "Tiada produk dijumpai.",
  syncing: "Syncing...",
  liveStockPromo: "Live stock & promo",
  offlinePriceMode: "Tidak dapat sync. Sila refresh.",
  readyLabel: "Ready",
  soldOutLabel: "Habis Stok",
  viewPackages: "Lihat Pakej",
  closePackages: "Tutup Pakej",
  buyNow: "Beli Sekarang",
  assigning: "Mencari reseller...",
  openTelegram: "Buka Telegram Reseller",
  findAnother: "Hubungi Admin",
  findingAnother: "Membuka Telegram admin...",
  contactAdmin: "Hubungi Admin",
  waitingAdminInfo: "Jika reseller belum membalas, button Hubungi Admin akan aktif selepas 5 minit.",
  contactAdminInfo: "Reseller belum reply? Anda boleh terus hubungi admin untuk bantuan.",
  leadLabel: "Lead ID",
  deviceAvailableTitle: "Device Available",
  noHotSelling: "Tiada Hot Selling aktif sekarang.",
  resumeOrder: "Buka Order Saya"
};

let editable = {
  brandName: "NUMO VENTURES",
  brandTagline: "Trusted Since 2015",
  topbarCta: "Beli Sekarang",
  heroBadge: "PROMO PREMIUM TERKINI",
  heroTitle: "Akaun premium murah, trusted & full warranty.",
  heroDesc: "Pilih pakej dan kami hubungkan anda dengan reseller rasmi NUMO.",
  heroPrimaryBtn: "Lihat Hot Selling",
  heroSecondaryBtn: "Lihat Semua Produk",
  hotTitle: "🔥 Pilihan Paling Hot",
  hotDesc: "Deal promo terpilih.",
  productSectionTitle: "Produk Premium",
  productSectionSubtitle: "Tekan produk untuk lihat pakej dan harga.",
  stepsTitle: "3 langkah mudah",
  stepsDesc: "Kami hubungkan anda kepada reseller rasmi yang aktif.",
  footerTitle: "Ready untuk order?",
  footerText: "Pilih pakej dan sistem akan hubungkan anda dengan reseller rasmi NUMO.",
  footerBtn: "Pilih Pakej Sekarang",
  stickyTitle: "Nak order sekarang?",
  stickyText: "Pilih pakej untuk dapatkan reseller rasmi",
  stickyBtn: "Beli",
  copyrightText: "© 2026 NUMO VENTURES. Semua hak cipta terpelihara.",
  logo: "Numologo.jpg",
  trustCards: [],
  orderSteps: []
};

const PRODUCTS = [
  {
    name: "NETFLIX PREMIUM",
    display: "Netflix Premium",
    image: "netflix.jpg",
    category: "Streaming",
    desc: "Private profile dan warranty penuh.",
    plans: [
      { duration: "1 Bulan", price: "RM25" },
      { duration: "2 Bulan", price: "RM50" },
      { duration: "3 Bulan Promo", label: "3 Bulan", price: "RM75" },
      { duration: "6 Bulan", price: "RM150" },
      { duration: "12 Bulan", price: "RM300" }
    ]
  },
  {
    name: "YOUTUBE PREMIUM",
    display: "YouTube Premium",
    image: "youtube.jpg",
    category: "Streaming",
    desc: "Email Sendiri atau Email Seller.",
    sections: [
      {
        title: "Email Sendiri",
        plans: [
          { duration: "1 Bulan", price: "RM16" },
          { duration: "3 Bulan", price: "RM45" },
          { duration: "6 Bulan", price: "RM85" },
          { duration: "12 Bulan", price: "RM144" }
        ]
      },
      {
        title: "Email Seller",
        plans: [
          { duration: "1 Bulan", price: "RM10" },
          { duration: "3 Bulan", price: "RM27" },
          { duration: "6 Bulan", price: "RM48" },
          { duration: "12 Bulan", price: "RM84" }
        ]
      }
    ]
  },
  {
    name: "DISNEY+ HOTSTAR",
    display: "Disney+ Hotstar",
    image: "disney.jpg",
    category: "Streaming",
    desc: "Premium entertainment dengan warranty.",
    plans: [
      { duration: "1 Bulan", price: "RM25" },
      { duration: "2 Bulan", price: "RM45" },
      { duration: "Promo 3 Bulan", label: "3 Bulan", price: "RM60" },
      { duration: "6 Bulan", price: "RM120" },
      { duration: "12 Bulan", price: "RM230" }
    ]
  },
  {
    name: "SOOKA PREMIUM",
    display: "Sooka Premium",
    image: "sooka.jpg",
    category: "Streaming",
    desc: "Pilih device TV, Phone atau Tablet.",
    plans: [
      { duration: "1 Bulan", price: "RM25" },
      { duration: "2 Bulan", price: "RM46" },
      { duration: "6 Bulan", price: "RM120" },
      { duration: "12 Bulan", price: "RM216" }
    ]
  },
  {
    name: "VIU PREMIUM",
    display: "Viu Premium",
    image: "viu.jpg",
    category: "Streaming",
    desc: "Drama dan entertainment premium.",
    plans: [
      { duration: "1 Bulan", price: "RM15" },
      { duration: "2 Bulan", price: "RM26" },
      { duration: "6 Bulan", price: "RM66" },
      { duration: "12 Bulan", price: "RM120" }
    ]
  },
  {
    name: "iQIYI PREMIUM",
    display: "iQiyi Premium",
    image: "iqiyi.jpg",
    category: "Streaming",
    desc: "Movie dan drama premium.",
    plans: [
      { duration: "1 Bulan", price: "RM15" },
      { duration: "2 Bulan", price: "RM26" },
      { duration: "Promo 3 Bulan", label: "3 Bulan", price: "RM33" },
      { duration: "6 Bulan", price: "RM66" },
      { duration: "12 Bulan", price: "RM120" }
    ]
  },
  {
    name: "PRIME VIDEO",
    display: "Prime Video",
    image: "primevideo.jpg",
    category: "Streaming",
    desc: "Movie dan siri premium daripada Prime Video.",
    plans: [
      { duration: "1 Bulan", price: "RM20" },
      { duration: "2 Bulan", price: "RM38" },
      { duration: "6 Bulan", price: "RM108" },
      { duration: "12 Bulan", price: "RM198" }
    ]
  },
  {
    name: "SPOTIFY PREMIUM",
    display: "Spotify Premium",
    image: "spotify.jpg",
    category: "Music",
    desc: "Music tanpa iklan dan offline mode.",
    plans: [
      { duration: "1 Bulan", price: "RM15" },
      { duration: "2 Bulan", price: "RM28" },
      { duration: "Promo 2 Bulan", label: "2 Bulan Promo", price: "RM25" },
      { duration: "6 Bulan", price: "RM72" },
      { duration: "12 Bulan", price: "RM120" }
    ]
  }
];

const SOOKA_DEVICES = [
  { key: "TV", label: "TV" },
  { key: "PHONE", label: "Phone" },
  { key: "TABLET", label: "Tablet" }
];

let control = {
  stock: [],
  promos: [],
  hotSelling: [],
  meta: {},
  loaded: false
};

const $ = id => document.getElementById(id);

document.addEventListener("DOMContentLoaded", async () => {
  await loadUiText();
  await loadEditable();

  applyEditable();
  bindEvents();

  activeLead = loadLead();
  updateResume();

  renderTrust();
  renderSteps();
  renderCategories();
  renderProducts();

  await loadControl();

  renderHotSelling();
  renderProducts();
});

async function loadUiText() {
  await new Promise(resolve => {
    const s = document.createElement("script");
    s.src = `app2.js?_=${Date.now()}`;
    s.onload = () => {
      if (window.NUMO_BUTTON_TEXT) uiText = { ...uiText, ...window.NUMO_BUTTON_TEXT };
      resolve();
    };
    s.onerror = resolve;
    document.head.appendChild(s);
  });
}

async function loadEditable() {
  try {
    const r = await fetch(`index2.html?_=${Date.now()}`);
    const doc = new DOMParser().parseFromString(await r.text(), "text/html");
    const root = doc.querySelector("#editable-content");

    if (!root) return;

    editable.logo = root.dataset.logo || editable.logo;

    root.querySelectorAll("[data-key]").forEach(el => {
      editable[el.dataset.key] = el.textContent.trim();
    });

    editable.trustCards = [...root.querySelectorAll("#trustCards>div")].map(el => ({
      title: el.dataset.title,
      text: el.textContent.trim()
    }));

    editable.orderSteps = [...root.querySelectorAll("#orderSteps>div")].map(el => ({
      title: el.dataset.title,
      text: el.textContent.trim()
    }));
  } catch (e) {
    console.warn(e.message);
  }
}

function applyEditable() {
  [
    "brandName",
    "brandTagline",
    "topbarCta",
    "heroBadge",
    "heroTitle",
    "heroDesc",
    "heroPrimaryBtn",
    "heroSecondaryBtn",
    "hotTitle",
    "hotDesc",
    "productSectionTitle",
    "productSectionSubtitle",
    "stepsTitle",
    "stepsDesc",
    "footerTitle",
    "footerText",
    "footerBtn",
    "stickyTitle",
    "stickyText",
    "stickyBtn",
    "copyrightText"
  ].forEach(id => setText(id, editable[id]));

  if ($("brandLogo")) $("brandLogo").src = editable.logo;
  if ($("searchInput")) $("searchInput").placeholder = uiText.searchPlaceholder;
  if ($("emptyBox")) $("emptyBox").textContent = uiText.emptySearchText;
  if ($("resumeOrderBtn")) $("resumeOrderBtn").textContent = uiText.resumeOrder;
}

function bindEvents() {
  if ($("searchInput")) $("searchInput").addEventListener("input", renderProducts);
  if ($("closeHandoffBtn")) $("closeHandoffBtn").onclick = closeHandoff;
  if ($("closeDeviceBtn")) $("closeDeviceBtn").onclick = () => hide("deviceModal");
  if ($("resumeOrderBtn")) $("resumeOrderBtn").onclick = () => activeLead && showHandoff(activeLead);
  if ($("reassignBtn")) $("reassignBtn").onclick = contactAdmin;

  if ($("handoffModal")) {
    $("handoffModal").onclick = e => {
      if (e.target.id === "handoffModal") closeHandoff();
    };
  }

  if ($("deviceModal")) {
    $("deviceModal").onclick = e => {
      if (e.target.id === "deviceModal") hide("deviceModal");
    };
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopHotAutoplay();
    else startHotAutoplay();
  });

  window.addEventListener("beforeunload", stopHotAutoplay);
}

function renderTrust() {
  if (!$("trustGrid")) return;

  $("trustGrid").innerHTML = editable.trustCards.map(x => `
    <article class="trust">
      <strong>${safe(x.title)}</strong>
      <p>${safe(x.text)}</p>
    </article>
  `).join("");
}

function renderSteps() {
  if (!$("stepsGrid")) return;

  $("stepsGrid").innerHTML = editable.orderSteps.map((x, i) => `
    <article class="step">
      <div class="num">${i + 1}</div>
      <strong>${safe(x.title)}</strong>
      <p>${safe(x.text)}</p>
    </article>
  `).join("");
}

async function loadControl() {
  setSync(uiText.syncing, "warn");

  try {
    const r = await jsonp({
      mode: "getWebsiteControl",
      _: Date.now()
    });

    if (!r.ok) throw new Error(r.error);

    control = {
      stock: r.data?.stock || [],
      promos: r.data?.promos || [],
      hotSelling: r.data?.hotSelling || [],
      meta: r.data?.meta || {},
      loaded: true
    };

    setSync(uiText.liveStockPromo, "live");
  } catch (e) {
    control.loaded = false;
    setSync(uiText.offlinePriceMode, "warn");
  }
}

function setSync(t, c) {
  if (!$("syncStatus")) return;

  $("syncStatus").textContent = t;
  $("syncStatus").className = `sync ${c}`;
}

function renderCategories() {
  if (!$("categoryButtons")) return;

  const cats = [uiText.categoryAll, ...new Set(PRODUCTS.map(p => p.category))];

  $("categoryButtons").innerHTML = cats.map(c => `
    <button class="category ${c === selectedCategory ? "active" : ""}" data-category="${attr(c)}">
      ${safe(c)}
    </button>
  `).join("");

  $("categoryButtons").querySelectorAll("button").forEach(b => {
    b.onclick = () => {
      selectedCategory = b.dataset.category;
      renderCategories();
      renderProducts();
    };
  });
}

function renderHotSelling() {
  if (!$("hot") || !$("hotGrid")) return;

  hotItems = control.hotSelling
    .filter(x => isAvailable(x.product, x.section || "ALL"))
    .slice(0, 3);

  stopHotAutoplay();

  if (!hotItems.length) {
    hide("hot");
    return;
  }

  show("hot");

  const slides = hotItems.map(x => {
    const p = findProduct(x.product);
    const local = findLocalPlan(x.product, x.section || "ALL", x.duration);
    const badge = x.hotBadge || x.badge || x.hotSellingBadge || "Hot Selling";
    const old = local?.price && local.price !== x.promoPrice
      ? `<span class="old">${safe(local.price)}</span>`
      : "";

    return `
      <div class="hot-slide">
        <article class="hot">
          <div class="hot-img">
            <img src="${attr(p?.image || "")}" alt="${attr(p?.display || x.product)}">
            <span class="hot-badge">${safe(badge)}</span>
          </div>
          <div class="hot-body">
            <div class="hot-name">${safe(p?.display || x.product)}</div>
            <div class="hot-plan">
              ${safe(displayDuration(x.duration))}
              ${normalize(x.section || "ALL") !== "ALL" ? " • " + safe(x.section) : ""}
            </div>
            <div>
              <span class="hot-price">${safe(x.promoPrice)}</span>${old}
            </div>
            <button
              class="buy"
              data-buy-product="${attr(x.product)}"
              data-buy-section="${attr(x.section || "ALL")}"
              data-buy-duration="${attr(x.duration)}"
              data-buy-price="${attr(x.promoPrice)}"
            >${safe(uiText.buyNow)}</button>
          </div>
        </article>
      </div>
    `;
  }).join("");

  const dots = hotItems.map((_, i) => `
    <button class="hot-dot ${i === 0 ? "active" : ""}" data-hot-dot="${i}" aria-label="Hot ${i + 1}"></button>
  `).join("");

  $("hotGrid").innerHTML = `
    <div class="hot-stage">
      <div id="hotTrack" class="hot-track">${slides}</div>
    </div>
    <div class="hot-controls">
      <button id="hotPrev" class="hot-arrow" type="button" aria-label="Sebelumnya">‹</button>
      <div id="hotDots" class="hot-dots">${dots}</div>
      <button id="hotNext" class="hot-arrow" type="button" aria-label="Seterusnya">›</button>
    </div>
  `;

  hotIndex = 0;
  updateHotSlider();

  if ($("hotPrev")) $("hotPrev").onclick = () => moveHot(-1);
  if ($("hotNext")) $("hotNext").onclick = () => moveHot(1);

  if ($("hotDots")) {
    $("hotDots").querySelectorAll("[data-hot-dot]").forEach(b => {
      b.onclick = () => goHot(Number(b.dataset.hotDot));
    });
  }

  $("hotGrid").addEventListener("touchstart", stopHotAutoplay, { passive: true });
  $("hotGrid").addEventListener("touchend", startHotAutoplay, { passive: true });

  bindBuy($("hotGrid"));
  startHotAutoplay();
}

function renderProducts() {
  if (!$("productsGrid")) return;

  const q = $("searchInput") ? $("searchInput").value.toLowerCase().trim() : "";

  const items = PRODUCTS.filter(p =>
    (selectedCategory === uiText.categoryAll || p.category === selectedCategory) &&
    (!q || `${p.name} ${p.display} ${p.desc}`.toLowerCase().includes(q))
  );

  if ($("emptyBox")) $("emptyBox").classList.toggle("hidden", !!items.length);

  $("productsGrid").innerHTML = items.map(renderProduct).join("");

  $("productsGrid").querySelectorAll(".expand").forEach(b => {
    b.onclick = () => {
      const p = b.closest(".product");
      const open = p.classList.toggle("open");
      b.textContent = open ? uiText.closePackages : uiText.viewPackages;
    };
  });

  bindBuy($("productsGrid"));
}

function renderProduct(p) {
  const ok = isAvailable(p.name, "ALL");

  return `
    <article class="product">
      <div class="summary">
        <div class="photo-box">
          <img class="photo" src="${attr(p.image)}" alt="${attr(p.display)}">
        </div>
        <div>
          <div class="pname">${safe(p.display)}</div>
          <div class="pdesc">${safe(p.desc)}</div>
          <div class="stat">
            <span class="from">${safe(lowestPrice(p))}</span>
            <span class="pill ${ok ? "" : "off"}">${safe(ok ? uiText.readyLabel : getStockText(p.name, "ALL"))}</span>
          </div>
        </div>
      </div>

      <button class="expand">${safe(uiText.viewPackages)}</button>

      <div class="details">
        ${p.name === "SOOKA PREMIUM" ? renderDevices() : ""}
        ${p.sections
          ? p.sections.map(s => `
              <div class="sub">${safe(s.title)}</div>
              ${renderPlans(p, s.plans, s.title)}
            `).join("")
          : renderPlans(p, p.plans, "ALL")
        }
      </div>
    </article>
  `;
}

function renderPlans(product, plans, section) {
  return plans.map(plan => {
    const ok = isAvailable(product.name, section);
    const promo = findPromo(product.name, section, plan.duration);
    const on = isPromoActive(promo) && promo.promoPrice;
    const price = on ? promo.promoPrice : plan.price;

    const badge = on ? `
      <span class="badge ${badgeClass(promo.badgeColor)}">
        ${safe(promo.badgeText || promo.badgePreset || "Promo")}
      </span>
    ` : "";

    const note = on && promo.note ? `<div class="note">${safe(promo.note)}</div>` : "";

    const button = ok ? `
      <button
        class="buy"
        data-buy-product="${attr(product.name)}"
        data-buy-section="${attr(section)}"
        data-buy-duration="${attr(plan.duration)}"
        data-buy-price="${attr(price)}"
      >${safe(uiText.buyNow)}</button>
    ` : `<button class="buy" disabled>${safe(getStockText(product.name, section))}</button>`;

    return `
      <div class="plan">
        <div class="plan-top">
          <span class="plan-name">${safe(plan.label || displayDuration(plan.duration))}</span>
          ${badge}
        </div>
        ${note}
        <div class="plan-bottom">
          <div>
            <span class="price">${safe(price)}</span>
            ${on && price !== plan.price ? `<span class="old">${safe(plan.price)}</span>` : ""}
          </div>
          ${button}
        </div>
      </div>
    `;
  }).join("");
}

function renderDevices() {
  return `
    <div class="devices">
      <strong>${safe(uiText.deviceAvailableTitle)}</strong>
      <div class="device-row">
        ${sookaStates().map(d => `
          <span class="device ${d.on ? "" : "off"}">${safe(d.label)} ${d.on ? "✓" : "✕"}</span>
        `).join("")}
      </div>
    </div>
  `;
}

function bindBuy(root) {
  if (!root) return;

  root.querySelectorAll("[data-buy-product]").forEach(btn => {
    btn.onclick = () => {
      const order = {
        product: btn.dataset.buyProduct,
        section: btn.dataset.buySection,
        duration: btn.dataset.buyDuration,
        price: btn.dataset.buyPrice
      };

      if (order.product === "SOOKA PREMIUM" && normalize(order.section) === "ALL") {
        chooseSooka(order);
        return;
      }

      assignLead(order, btn);
    };
  });
}

function chooseSooka(order) {
  pendingSookaOrder = order;

  const options = sookaStates().filter(x => x.on);

  if (!$("chooseDeviceList")) return;

  $("chooseDeviceList").innerHTML = options.map(x => `
    <button class="device-btn" data-device="${x.key}">${safe(x.label)}</button>
  `).join("");

  $("chooseDeviceList").querySelectorAll("button").forEach(b => {
    b.onclick = () => {
      hide("deviceModal");
      assignLead({ ...order, section: b.dataset.device }, null);
    };
  });

  show("deviceModal");
}

/****************************************************
 * ASSIGN RESELLER + REFERRAL FALLBACK
 ****************************************************/

async function assignLead(order, button) {
  const old = button?.textContent;

  if (button) {
    button.disabled = true;
    button.textContent = uiText.assigning;
  }

  try {
    let r = await assignResellerRequest(order, {
      source: REFERRAL_CODE ? "RESELLER_LINK" : "MAIN_WEBSITE",
      refCode: REFERRAL_CODE || ""
    });

    if (REFERRAL_CODE && !isValidReferralAssignResult(r)) {
      r = await assignResellerRequest(order, {
        source: "REFERRAL_FALLBACK",
        refCode: "",
        fallbackFromRef: REFERRAL_CODE
      });

      if (r.ok && r.data) {
        r.data.referralFallback = true;
        r.data.fallbackFromRef = REFERRAL_CODE;
        r.data.status = "REASSIGNED";
      }
    }

    if (!r.ok) throw new Error(r.error || "Assign failed");

    activeLead = r.data;
    saveLead(activeLead);
    updateResume();
    showHandoff(activeLead);
  } catch (e) {
    alert(e.message || "Maaf, sistem tidak dapat mencari reseller sekarang. Sila cuba semula.");
  } finally {
    if (button) {
      button.disabled = false;
      button.textContent = old;
    }
  }
}

function assignResellerRequest(order, extra = {}) {
  return jsonp({
    mode: "assignReseller",
    product: order.product,
    section: order.section,
    duration: order.duration,
    price: order.price,
    source: extra.source || "MAIN_WEBSITE",
    refCode: extra.refCode || "",
    fallbackFromRef: extra.fallbackFromRef || ""
  });
}

function isValidReferralAssignResult(r) {
  if (!r || !r.ok || !r.data) return false;

  const lead = r.data;
  const reseller = lead.reseller || {};

  const status = normalize(
    reseller.status ||
    reseller.websiteStatus ||
    lead.resellerStatus ||
    lead.websiteStatus ||
    ""
  );

  if (["OFF", "BLOCKED", "REMOVED", "INACTIVE", "DISABLED"].includes(status)) {
    return false;
  }

  return true;
}

function showHandoff(lead) {
  setText(
    "selectedPackage",
    `${displayProduct(lead.product)} • ${displayDuration(lead.duration)}${normalize(lead.section || "ALL") !== "ALL" ? " • " + lead.section : ""}`
  );

  setText("selectedPrice", lead.price);
  setText("leadIdText", `${uiText.leadLabel}: ${lead.leadId}`);
  setText("resellerName", lead.reseller?.name || lead.resellerName || "Reseller NUMO");

  const user = lead.reseller?.telegramUsername || lead.telegramUsername || "";
  setText("resellerUsername", user ? `@${user}` : "");

  if ($("openTelegramBtn")) {
    $("openTelegramBtn").href = lead.telegramUrl || "#";
    $("openTelegramBtn").textContent = lead.status === "ADMIN_HANDOFF" ? (uiText.contactAdmin || "Hubungi Admin") : uiText.openTelegram;
  }

  if (lead.status === "ADMIN_HANDOFF") {
    setText("handoffTitle", "Admin NUMO");
    setText("handoffStatus", "✅ Reseller belum reply. Anda akan dihubungkan terus kepada admin.");
  } else if (lead.referralFallback) {
    setText("handoffTitle", "Referral Tidak Aktif");
    setText("handoffStatus", "✅ Link referral reseller ini tidak aktif. Kami carikan reseller aktif lain untuk anda.");
  } else {
    setText("handoffTitle", lead.status === "REASSIGNED" ? "Reseller Baru Ditemui" : "Reseller Rasmi Ditemui");
    setText(
      "handoffStatus",
      lead.status === "REASSIGNED"
        ? "✅ Anda dihubungkan dengan reseller rasmi yang baru."
        : "✅ Reseller rasmi tersedia untuk bantu order anda."
    );
  }

  const adminBtn = $("reassignBtn");
  if (adminBtn) {
    adminBtn.onclick = contactAdmin;
    adminBtn.disabled = true;
    adminBtn.classList.remove("ready");
  }

  hideMsg();
  show("handoffModal");
  startCountdown(lead);
}

function closeHandoff() {
  hide("handoffModal");
  clearInterval(countdownTimer);
}

function contactAdmin() {
  window.open(ADMIN_TELEGRAM_URL, "_blank", "noopener");
}

async function reassignLead() {
  contactAdmin();
}

function startCountdown(lead, seconds) {
  clearInterval(countdownTimer);

  const b = $("reassignBtn");
  const info = $("waitInfo");

  if (!b || !info) return;

  const wait = Number(lead.reassignAfterMinutes || control.meta?.reassignWaitMinutes || 5);
  const finish = new Date(lead.assignedAt || Date.now()).getTime() + wait * 60000;

  let override = seconds || 0;

  const tick = () => {
    const left = override > 0
      ? override--
      : Math.ceil((finish - Date.now()) / 1000);

    if (left <= 0) {
      b.disabled = false;
      b.classList.add("ready");
      b.textContent = uiText.contactAdmin || uiText.findAnother;
      b.onclick = contactAdmin;
      info.textContent = uiText.contactAdminInfo || "Reseller belum reply? Anda boleh terus hubungi admin untuk bantuan.";
      clearInterval(countdownTimer);
      return;
    }

    b.disabled = true;
    b.classList.remove("ready");
    b.textContent = `Tunggu ${Math.floor(left / 60)}:${String(left % 60).padStart(2, "0")}`;
    info.textContent = uiText.waitingAdminInfo || "Jika reseller belum membalas, button Hubungi Admin akan aktif selepas 5 minit.";
  };

  tick();
  countdownTimer = setInterval(tick, 1000);
}

function modalMsg(t) {
  if (!$("modalMsg")) return;
  $("modalMsg").textContent = t;
  $("modalMsg").classList.add("show");
}

function hideMsg() {
  if (!$("modalMsg")) return;
  $("modalMsg").classList.remove("show");
}

/****************************************************
 * HOT SLIDER
 ****************************************************/

function updateHotSlider() {
  const track = $("hotTrack");
  if (!track) return;

  track.style.transform = `translateX(-${hotIndex * 100}%)`;

  $("hotDots")?.querySelectorAll(".hot-dot").forEach((d, i) => {
    d.classList.toggle("active", i === hotIndex);
  });
}

function moveHot(step) {
  if (!hotItems.length) return;

  hotIndex = (hotIndex + step + hotItems.length) % hotItems.length;
  updateHotSlider();
  startHotAutoplay();
}

function goHot(i) {
  if (!hotItems.length) return;

  hotIndex = i;
  updateHotSlider();
  startHotAutoplay();
}

function stopHotAutoplay() {
  if (hotTimer) {
    clearInterval(hotTimer);
    hotTimer = null;
  }
}

function startHotAutoplay() {
  stopHotAutoplay();

  if (hotItems.length <= 1 || document.hidden) return;

  hotTimer = setInterval(() => {
    hotIndex = (hotIndex + 1) % hotItems.length;
    updateHotSlider();
  }, 4000);
}

/****************************************************
 * LOCAL STORAGE
 ****************************************************/

function saveLead(x) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(x));
}

function loadLead() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
  } catch (e) {
    return null;
  }
}

function updateResume() {
  if ($("resumeOrderBtn")) $("resumeOrderBtn").classList.toggle("hidden", !activeLead);
}

/****************************************************
 * PRODUCT / STOCK / PROMO HELPERS
 ****************************************************/

function findProduct(n) {
  return PRODUCTS.find(p => normalize(p.name) === normalize(n));
}

function displayProduct(n) {
  return findProduct(n)?.display || n;
}

function findLocalPlan(n, s, d) {
  const p = findProduct(n);
  if (!p) return null;

  const plans = p.sections
    ? (p.sections.find(x => normalize(x.title) === normalize(s))?.plans || [])
    : p.plans;

  return plans.find(x => normalize(x.duration) === normalize(d));
}

function displayDuration(d) {
  return String(d || "")
    .replace(/^Promo\s+/i, "")
    .replace(/\s+Promo$/i, "");
}

function findPromo(p, s, d) {
  return control.promos.find(x =>
    normalize(x.product) === normalize(p) &&
    normalize(x.section || "ALL") === normalize(s || "ALL") &&
    normalize(x.duration) === normalize(d)
  );
}

function isPromoActive(p) {
  return p && ["ON", "YES"].includes(normalize(p.promoActive));
}

function getStock(p, s = "ALL") {
  return control.stock.find(x =>
    normalize(x.product) === normalize(p) &&
    normalize(x.section || "ALL") === normalize(s || "ALL")
  );
}

function isStockOn(p, s = "ALL") {
  const x = getStock(p, s);
  return !x || normalize(x.status) !== "OFF";
}

function getStockText(p, s = "ALL") {
  return getStock(p, s)?.stockText || uiText.soldOutLabel;
}

function sookaStates() {
  const deviceRows = SOOKA_DEVICES.some(d => getStock("SOOKA PREMIUM", d.key));

  return SOOKA_DEVICES.map(d => ({
    ...d,
    on: deviceRows
      ? isStockOn("SOOKA PREMIUM", d.key)
      : isStockOn("SOOKA PREMIUM", "ALL")
  }));
}

function isAvailable(p, s = "ALL") {
  if (normalize(p) === "SOOKA PREMIUM") {
    return sookaStates().some(x => x.on);
  }

  if (normalize(p) === "YOUTUBE PREMIUM" && normalize(s) === "ALL") {
    return isStockOn(p, "Email Sendiri") || isStockOn(p, "Email Seller");
  }

  return isStockOn(p, s);
}

function lowestPrice(p) {
  const list = [];

  if (p.sections) {
    p.sections.forEach(s => {
      s.plans.forEach(x => list.push({ x, s: s.title }));
    });
  } else {
    p.plans.forEach(x => list.push({ x, s: "ALL" }));
  }

  const values = list
    .map(y => {
      const promo = findPromo(p.name, y.s, y.x.duration);
      const v = isPromoActive(promo) && promo.promoPrice ? promo.promoPrice : y.x.price;

      return {
        v,
        n: Number(String(v).replace(/[^0-9.]/g, ""))
      };
    })
    .filter(x => Number.isFinite(x.n))
    .sort((a, b) => a.n - b.n);

  return values.length ? `Dari ${values[0].v}` : "Lihat Harga";
}

/****************************************************
 * BASIC HELPERS
 ****************************************************/

function getReferralCodeFromUrl() {
  const value = new URLSearchParams(window.location.search).get("ref") || "";
  return String(value)
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9_-]/g, "")
    .slice(0, 30);
}

function badgeClass(c) {
  c = normalize(c);
  return ["GREEN", "RED", "BLUE", "DARK"].includes(c) ? c.toLowerCase() : "";
}

function setText(id, t) {
  if ($(id)) $(id).textContent = t || "";
}

function safe(v = "") {
  return String(v ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function attr(v = "") {
  return safe(v);
}

function normalize(v = "") {
  return String(v || "").trim().toUpperCase();
}

function show(id) {
  if ($(id)) $(id).classList.remove("hidden");
}

function hide(id) {
  if ($(id)) $(id).classList.add("hidden");
}

function jsonp(params) {
  return new Promise((resolve, reject) => {
    const cb = "numoC_" + Date.now() + "_" + Math.floor(Math.random() * 100000);
    const s = document.createElement("script");

    const timer = setTimeout(() => {
      clean();
      reject(new Error("Timeout"));
    }, 20000);

    window[cb] = d => {
      clean();
      resolve(d);
    };

    function clean() {
      clearTimeout(timer);
      delete window[cb];
      s.remove();
    }

    s.onerror = () => {
      clean();
      reject(new Error("Network error"));
    };

    s.src = API_URL + "?" + new URLSearchParams({
      ...params,
      callback: cb
    });

    document.body.appendChild(s);
  });
}
