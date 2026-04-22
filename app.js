const telegramUsername = "ownernumoventures";

/* DATA */
const products = [
{
name:"NETFLIX PREMIUM",
plans:[
{duration:"1 Bulan",price:"RM25",text:"Netflix 1 bulan"},
{duration:"2 Bulan",price:"RM45",text:"Netflix 2 bulan"},
{duration:"3 Bulan Promo",price:"RM60",text:"Netflix 3 bulan"},
{duration:"6 Bulan",price:"RM120",text:"Netflix 6 bulan"},
{duration:"12 Bulan",price:"RM230",text:"Netflix 12 bulan"}
]
},

{
name:"YOUTUBE PREMIUM",
plans:[
{duration:"1 Bulan",price:"RM16",text:"YT 1 bulan"},
{duration:"3 Bulan",price:"RM45",text:"YT 3 bulan"},
{duration:"6 Bulan",price:"RM85",text:"YT 6 bulan"},
{duration:"12 Bulan",price:"RM144",text:"YT 12 bulan"}
]
},

{
name:"DISNEY+ HOTSTAR",
plans:[
{duration:"1 Bulan",price:"RM25",text:"Disney 1 bulan"},
{duration:"2 Bulan",price:"RM45",text:"Disney 2 bulan"},
{duration:"3 Bulan Promo",price:"RM60",text:"Disney 3 bulan"},
{duration:"6 Bulan",price:"RM120",text:"Disney 6 bulan"},
{duration:"12 Bulan",price:"RM230",text:"Disney 12 bulan"}
]
},

{
name:"SOOKA PREMIUM",
plans:[
{duration:"1 Bulan",price:"RM25",text:"Sooka 1 bulan"},
{duration:"2 Bulan",price:"RM46",text:"Sooka 2 bulan"},
{duration:"6 Bulan",price:"RM120",text:"Sooka 6 bulan"},
{duration:"12 Bulan",price:"RM216",text:"Sooka 12 bulan"}
]
},

{
name:"VIU PREMIUM",
plans:[
{duration:"1 Bulan",price:"RM15",text:"Viu 1 bulan"},
{duration:"2 Bulan",price:"RM26",text:"Viu 2 bulan"},
{duration:"6 Bulan",price:"RM66",text:"Viu 6 bulan"},
{duration:"12 Bulan",price:"RM120",text:"Viu 12 bulan"}
]
},

{
name:"iQIYI PREMIUM",
plans:[
{duration:"1 Bulan",price:"RM15",text:"IQIYI 1 bulan"},
{duration:"2 Bulan",price:"RM26",text:"IQIYI 2 bulan"},
{duration:"3 Bulan Promo",price:"RM33",text:"IQIYI 3 bulan"},
{duration:"6 Bulan",price:"RM66",text:"IQIYI 6 bulan"},
{duration:"12 Bulan",price:"RM120",text:"IQIYI 12 bulan"}
]
},

{
name:"SPOTIFY PREMIUM",
plans:[
{duration:"1 Bulan",price:"RM15",text:"Spotify 1 bulan"},
{duration:"2 Bulan",price:"RM28",text:"Spotify 2 bulan"},
{duration:"Promo 2 Bulan",price:"RM25",text:"Spotify promo"},
{duration:"6 Bulan",price:"RM72",text:"Spotify 6 bulan"},
{duration:"12 Bulan",price:"RM120",text:"Spotify 12 bulan"}
]
}
];

/* TELEGRAM LINK */
function tg(text){
return `https://t.me/${telegramUsername}?text=${encodeURIComponent(text)}`;
}

/* TESTIMONI */
const tContainer=document.getElementById("testimoni");

for(let i=1;i<=10;i++){
tContainer.innerHTML+=`
<div class="testimoni-card">
<img src="testimoni${i}.jpg">
</div>
`;
}

/* PRODUCTS */
const pContainer=document.getElementById("products");

products.forEach((p,i)=>{

let html=`<div class="box"><h3>${p.name}</h3>`;

p.plans.forEach((plan,j)=>{
html+=`
<div class="plan" onclick="selectPlan(${i},${j},this)">
<b>${plan.duration}</b><br>
<span class="price">${plan.price}</span>
</div>
`;
});

html+=`</div>`;
pContainer.innerHTML+=html;

});

/* SELECT PLAN */
function selectPlan(pi,pj,el){

const allPlans=el.parentElement.querySelectorAll(".plan");
allPlans.forEach(p=>{
p.classList.remove("active");
const btn=p.querySelector(".btn-order");
if(btn)btn.remove();
});

el.classList.add("active");

const plan=products[pi].plans[pj];

const btn=document.createElement("a");
btn.className="btn-order";
btn.innerText="Order Sekarang";
btn.href=tg(products[pi].name+" - "+plan.duration);
btn.target="_blank";

el.appendChild(btn);
}