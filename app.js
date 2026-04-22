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
      { duration: "6 Bulan", price: "RM120" },
      { duration: "12 Bulan", price: "RM230" }
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
          { duration: "6 Bulan", price: "RM85" },
          { duration: "12 Bulan", price: "RM144" }
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
          { duration: "6 Bulan", price: "RM48" },
          { duration: "12 Bulan", price: "RM84" }
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
      { duration: "6 Bulan", price: "RM120" },
      { duration: "12 Bulan", price: "RM230" }
    ]
  },
  {
    name: "SOOKA PREMIUM",
    badge: "Exclusive",
    plans: [
      { duration: "1 Bulan", price: "RM25", orderText: "Sooka 1 bulan", order: true },
      { duration: "2 Bulan", price: "RM46", orderText: "Sooka 2 bulan", order: true },
      { duration: "6 Bulan", price: "RM120" },
      { duration: "12 Bulan", price: "RM216" }
    ]
  },
  {
    name: "VIU PREMIUM",
    badge: "Value",
    plans: [
      { duration: "1 Bulan", price: "RM15", orderText: "Viu 1 bulan", order: true },
      { duration: "2 Bulan", price: "RM26", orderText: "Viu 2 bulan", order: true },
      { duration: "6 Bulan", price: "RM66" },
      { duration: "12 Bulan", price: "RM120" }
    ]
  },
  {
    name: "iQIYI PREMIUM",
    badge: "Popular",
    plans: [
      { duration: "1 Bulan", price: "RM15", orderText: "IQIYI 1 bulan", order: true },
      { duration: "2 Bulan", price: "RM26", orderText: "IQIYI 2 bulan", order: true },
      { duration: "Promo 3 Bulan", price: "RM33", orderText: "IQIYI 3 bulan", order: true },
      { duration: "6 Bulan", price: "RM66" },
      { duration: "12 Bulan", price: "RM120" }
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
      { duration: "Promo 2 Bulan", price: "RM25", orderText: "Spotify promo", order: true },
      { duration: "6 Bulan", price: "RM72" },
      { duration: "12 Bulan", price: "RM120" }
    ]
  }
];

const testimonies = Array.from({ length: 10 }, (_, i) => ({
  title: `Testimoni ${i + 1}`,
  image: `testimoni${i + 1}.jpg`
}));

function createTelegramLink(text) {
  return `https://t.me/${telegramUsername}?text=${encodeURIComponent(text)}`;
}

/* RENDER PLANS (CLICKABLE) */
function renderPlans(plans = [], productName) {
  return `
    <div class="plans">
      ${plans.map((plan, i) => `
        <div class="plan" onclick="selectPlan(this, '${productName}', '${plan.orderText || plan.duration}')">
          <div class="plan-text">
            <span class="plan-duration">${plan.duration}</span>
            <span class="plan-note">${plan.note ? plan.note : "Pakej tersedia"}</span>
          </div>
          <div class="price">${plan.price}</div>
        </div>
      `).join("")}
    </div>
  `;
}

/* SELECT PLAN */
function selectPlan(el, product, planText) {

  const parent = el.parentElement;
  parent.querySelectorAll(".plan").forEach(p => p.classList.remove("active"));
  el.classList.add("active");

  // remove old button
  const oldBtn = parent.querySelector(".btn-order");
  if (oldBtn) oldBtn.remove();

  // create new button
  const btn = document.createElement("a");
  btn.className = "btn-order";
  btn.innerText = "Order Sekarang";
  btn.href = createTelegramLink(product + " - " + planText);
  btn.target = "_blank";

  parent.appendChild(btn);
}

/* FEATURES */
function renderFeatures(features = []) {
  if (!features.length) return "";
  return `
    <ul class="features">
      ${features.map(item => `<li>${item}</li>`).join("")}
    </ul>
  `;
}

/* SECTIONS */
function renderSections(sections = [], productName) {
  return sections.map(section => `
    <div class="sub-block">
      <div class="sub-title">${section.title}</div>
      ${renderFeatures(section.features)}
      ${renderPlans(section.plans, productName)}
    </div>
  `).join("");
}

/* PRODUCTS */
function renderProducts() {
  const container = document.getElementById("products");

  container.innerHTML = products.map(product => `
    <article class="product-card">
      <div class="product-head">
        <h3 class="product-title">${product.name}</h3>
        <span class="product-badge">${product.badge || "Premium"}</span>
      </div>

      ${product.features ? renderFeatures(product.features) : ""}
      ${product.sections ? renderSections(product.sections, product.name) : ""}
      ${product.plans ? renderPlans(product.plans, product.name) : ""}
    </article>
  `).join("");
}

/* TESTIMONI */
function renderTestimonies() {
  const container = document.getElementById("testimoni");

  container.innerHTML = testimonies.map(item => `
    <div class="testimoni-card">
      <img src="${item.image}">
      <p>${item.title}</p>
    </div>
  `).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  renderTestimonies();
});