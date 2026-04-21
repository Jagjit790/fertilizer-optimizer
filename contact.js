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
document.querySelector(".button").addEventListener("click", function() {
 
    let name = document.getElementById("name").value.trim();
    let email = document.querySelector('input[placeholder="Enter Your Email"]').value.trim();
    let subject = document.getElementById("Subject").value.trim();
    let message = document.querySelector("textarea").value.trim();

 
    if (!name || !email || !subject || !message) {
        alert("⚠️ Please fill in all fields before sending.");
        return;
    }


    let whatsappNumber = "918146264594";  

    
    let whatsappMessage = 
        `Hello, I would like to contact you:%0A
Name: ${name}%0A
Email: ${email}%0A
Subject: ${subject}%0A
Message: ${message}`;

   
    let whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
    window.open(whatsappURL, "_blank");
});