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
      { text: "3 Bulan", price: "RM45" }
    ]
  },
  {
    name: "Disney+",
    plans: [
      { text: "1 Bulan", price: "RM25" },
      { text: "2 Bulan", price: "RM45" }
    ]
  }
];

/* TESTIMONI */
const testimoni = document.getElementById("testimoni");

for(let i=1;i<=8;i++){
  testimoni.innerHTML += `
    <div class="testimoni">
      <img src="testimoni${i}.jpg">
    </div>
  `;
}

/* PRODUK */
const container = document.getElementById("products");

products.forEach((p,index)=>{

  let plansHTML = p.plans.map((plan,i)=>`
    <div class="plan" onclick="selectPlan(${index},${i})">
      <b>${plan.text}</b><br>
      <span>Pakej tersedia</span><br><br>
      <span class="price">${plan.price}</span>
    </div>
  `).join("");

  container.innerHTML += `
    <div class="box">
      <h3>${p.name}</h3>

      ${plansHTML}

      <button id="btn${index}" class="order-btn">Order Sekarang</button>
    </div>
  `;
});

/* SELECT PLAN */
function selectPlan(productIndex, planIndex){

  const boxes = document.querySelectorAll(".box")[productIndex+1];
  const plans = boxes.querySelectorAll(".plan");

  plans.forEach(p=>p.classList.remove("active"));
  plans[planIndex].classList.add("active");

  const selected = products[productIndex].plans[planIndex];

  const btn = document.getElementById("btn"+productIndex);
  btn.classList.add("show");

  btn.onclick = () => {
    window.open(
      telegram + encodeURIComponent(products[productIndex].name + " - " + selected.text),
      "_blank"
    );
  };
}