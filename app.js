const telegram = "https://t.me/ownernumoventures?text=";

const products = [
  {
    name: "Netflix Premium",
    plans: [
      { text: "1 Bulan", price: "RM25" },
      { text: "2 Bulan", price: "RM45" },
      { text: "3 Bulan Promo", price: "RM60" },
      { text: "6 Bulan", price: "RM120" }
    ]
  },
  {
    name: "Youtube Premium",
    plans: [
      { text: "1 Bulan", price: "RM16" },
      { text: "3 Bulan", price: "RM45" },
      { text: "6 Bulan", price: "RM85" }
    ]
  },
  {
    name: "Disney+",
    plans: [
      { text: "1 Bulan", price: "RM25" },
      { text: "2 Bulan", price: "RM45" },
      { text: "3 Bulan", price: "RM60" }
    ]
  },
  {
    name: "Spotify",
    plans: [
      { text: "1 Bulan", price: "RM15" },
      { text: "2 Bulan", price: "RM28" }
    ]
  }
];

/* TESTIMONI */
const testimoniContainer = document.getElementById("testimoni");

for(let i=1;i<=8;i++){
  testimoniContainer.innerHTML += `
    <div class="testimoni">
      <img src="testimoni${i}.jpg">
      <p>Testimoni ${i}</p>
    </div>
  `;
}

/* PRODUK */
const container = document.getElementById("products");

products.forEach((p,index)=>{

  let plansHTML = p.plans.map((plan,i)=>`
    <div class="plan" onclick="selectPlan(${index},${i})">
      ${plan.text}<br>
      <span class="price">${plan.price}</span>
    </div>
  `).join("");

  container.innerHTML += `
    <div class="box">
      <div class="product-title">${p.name}</div>

      ${plansHTML}

      <button id="btn${index}" class="order-btn">Order Sekarang</button>
    </div>
  `;
});

/* SELECT PLAN */
function selectPlan(productIndex, planIndex){

  const productBox = document.querySelectorAll(".box")[productIndex+1];
  const plans = productBox.querySelectorAll(".plan");

  plans.forEach(p=>p.classList.remove("active"));
  plans[planIndex].classList.add("active");

  const selectedPlan = products[productIndex].plans[planIndex];

  const btn = document.getElementById("btn"+productIndex);

  btn.classList.add("show");

  btn.onclick = () => {
    window.open(
      telegram + encodeURIComponent(products[productIndex].name + " - " + selectedPlan.text),
      "_blank"
    );
  };
}