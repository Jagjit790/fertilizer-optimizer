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
const container = document.getElementById("dashboardList");

function calculateRecommendations(item) {
  let count = 0;

  if (Number(item.nitrogen) < 120) count++;
  if (Number(item.phosphorus) < 40) count++;
  if (Number(item.potassium) < 40) count++;

  return count;
}

function loadDashboard() {
  fetch("http://localhost:3000/api/soil")   // ✅ FIXED
    .then(res => res.json())
    .then(history => {

      if (!history || history.length === 0) {
        container.innerHTML = `
          <div class="empty">
            <p>No analyses yet</p>
            <a href="analyze.html">Analyze Soil</a>
          </div>
        `;
        return;
      }

      container.innerHTML = history.map(item => `
        <div class="dash-card" onclick="openDetails('${item._id}')">

          <div class="top">
            <h3>${item.crop}</h3>
            <span class="date">${new Date(item.date || Date.now()).toLocaleDateString()}</span>
            <button onclick="deleteItem(event, '${item._id}')">🗑</button>
          </div>

          <div class="tags">
            <span>N: ${item.nitrogen}</span>
            <span>P: ${item.phosphorus}</span>
            <span>K: ${item.potassium}</span>
            <span>pH: ${item.ph}</span>
            <span class="green">
              ${calculateRecommendations(item)} recommendations
            </span>
          </div>

        </div>
      `).join("");
    })
    .catch(() => {
      container.innerHTML = "<p></p>";
    });
}


// ======================
// DELETE
// ======================
function deleteItem(e, id) {
  e.stopPropagation();

  fetch(`http://localhost:3000/api/delete/${id}`, {  // ✅ FIXED
    method: "DELETE"
  })
  .then(() => loadDashboard());
}


// ======================
// OPEN DETAILS
// ======================
function openDetails(id) {
  localStorage.setItem("selectedSoil", id);
  localStorage.setItem("clearNavActive", "true");
  window.location.href = "recommendation.html";
}


// LOAD
loadDashboard();