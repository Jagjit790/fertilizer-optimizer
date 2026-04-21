// PRELOADER
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("preloader").style.display = "none";
    document.getElementById("content").style.display = "block";
  }, 2500);
});

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

function goToAnalyze() {
  window.location.href = "analyze.html";
}
