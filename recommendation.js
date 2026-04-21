// ======================
// 🔥 CLEAR NAV ACTIVE
// ======================
window.addEventListener("DOMContentLoaded", () => {
  const clearNav = localStorage.getItem("clearNavActive");

  if (clearNav === "true") {
    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach(item => item.classList.remove("active"));

    localStorage.removeItem("clearNavActive");
  }
});

// NAV ACTIVE
const navItems = document.querySelectorAll(".nav-item");
navItems.forEach(item => {
  item.addEventListener("click", function () {
    navItems.forEach(nav => nav.classList.remove("active"));
    this.classList.add("active");
  });
});


const authBtn = document.getElementById("authBtn");

// CHECK LOGIN STATE
const token = localStorage.getItem("token");

if (token) {
  authBtn.innerText = "Logout";
} else {
  authBtn.innerText = "Login";
}

// CLICK HANDLER
document.addEventListener("DOMContentLoaded", () => {

  const authBtn = document.getElementById("authBtn");

  if (!authBtn) return; // safety

  const token = localStorage.getItem("token");

  // SET TEXT
  authBtn.innerText = token ? "Logout" : "Login";

  // CLICK HANDLER
  authBtn.addEventListener("click", () => {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
      alert("Logged out");
      window.location.href = "home.html";
    } else {
      window.location.href = "login.html";
    }
  });

});

function goToLogin() {
  window.location.href = "login.html";
}

// SELECT DIVS
const summaryDiv = document.getElementById("summary");
const resultDiv = document.getElementById("results");

// ======================
// 🔥 GET DATA FROM BACKEND
// ======================
let selectedId = localStorage.getItem("selectedSoil");

if (!selectedId) {
  alert("No data found!");
  window.location.href = "analyze.html";
}

// ✅ FETCH FROM BACKEND
fetch(`http://localhost:3000/api/soil/${selectedId}`)
  .then(res => res.json())
  .then(data => {

    // CONVERT
    data.nitrogen = Number(data.nitrogen);
    data.phosphorus = Number(data.phosphorus);
    data.potassium = Number(data.potassium);
    data.ph = Number(data.ph);

    // ======================
    // SUMMARY
    // ======================
    summaryDiv.innerHTML = `
      <div class="summary-box">Nitrogen <strong>${data.nitrogen}</strong></div>
      <div class="summary-box">Phosphorus <strong>${data.phosphorus}</strong></div>
      <div class="summary-box">Potassium <strong>${data.potassium}</strong></div>
      <div class="summary-box">pH <strong>${data.ph}</strong></div>
      <div class="summary-box">Crop <strong>${data.crop}</strong></div>
    `;

    // ======================
    // STATUS FUNCTION
    // ======================
    function getStatus(value, type) {
      if (type === "N") return value < 120 ? "Low" : value <= 160 ? "Optimal" : "High";
      if (type === "P") return value < 40 ? "Low" : value <= 60 ? "Optimal" : "High";
      if (type === "K") return value < 40 ? "Low" : value <= 60 ? "Optimal" : "High";
    }

    // ======================
    // SOIL HEALTH
    // ======================
    resultDiv.innerHTML = `
      <div class="card">
        <h3>🌱 Soil Health Status</h3>
        <p>Nitrogen: <strong>${getStatus(data.nitrogen, "N")}</strong></p>
        <p>Phosphorus: <strong>${getStatus(data.phosphorus, "P")}</strong></p>
        <p>Potassium: <strong>${getStatus(data.potassium, "K")}</strong></p>
      </div>
    `;

    // ======================
    // RECOMMENDATION
    // ======================
    let results = [];

    if (data.nitrogen < 120) {
  results.push({
    name: "Urea (46-0-0)",
    nutrient: "Nitrogen",
    current: data.nitrogen,
    optimal: "120-160 mg/kg",
    qty: `${Math.round((120 - data.nitrogen) * 0.8)} kg/hectare`,
    timing: "Apply in 2 split doses: 50% at sowing, 50% at tillering stage",
    level: "Medium"
  });
}

if (data.phosphorus < 40) {
  results.push({
    name: "DAP (18-46-0)",
    nutrient: "Phosphorus",
    current: data.phosphorus,
    optimal: "40-60 mg/kg",
    qty: `${Math.round((40 - data.phosphorus) * 1.2)} kg/hectare`,
    timing: "Apply as basal dose before sowing",
    level: "Medium"
  });
}

if (data.potassium < 40) {
  results.push({
    name: "MOP (0-0-60)",
    nutrient: "Potassium",
    current: data.potassium,
    optimal: "40-60 mg/kg",
    qty: `${Math.round((40 - data.potassium) * 0.5)} kg/hectare`,
    timing: "Apply 50% basal, 50% at flowering stage",
    level: "Medium"
  });
}

    // DISPLAY
    results.forEach(r => {
  resultDiv.innerHTML += `
    <div class="card">
      
      <span class="badge">${r.level}</span>

      <h3>${r.name}</h3>

      <p>
        ${r.nutrient} is low at ${r.current} mg/kg. 
        Optimal range: ${r.optimal}
      </p>

      <div class="row">
        <div class="box">
          <strong>Quantity</strong><br>
          ${r.qty}
        </div>

        <div class="box">
          <strong>Timing</strong><br>
          ${r.timing}
        </div>
      </div>

    </div>
  `;
});

    if (results.length === 0) {
      resultDiv.innerHTML += `
        <div class="card">
          <h3>✅ Soil is Healthy</h3>
        </div>
      `;
    }

  })
  .catch(() => {
    alert("Server error");
  });