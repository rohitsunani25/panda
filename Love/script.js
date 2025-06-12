const correctPassword = "240724"; // Replace with your desired password
let attempts = 3;

function checkAuthentication() {
    if (sessionStorage.getItem("authenticated") === "true") {
        sessionStorage.removeItem("authenticated");
        attempts = 3;
    }
}

function verifyPassword() {
    const inputPassword = document.getElementById("password-input").value;
    const errorMessage = document.getElementById("error-message");

    if (inputPassword === correctPassword) {
        sessionStorage.setItem("authenticated", "true");
        window.location.href = "love.html";
    } else {
        attempts--;
        errorMessage.textContent = `Incorrect Password! ${attempts} attempt(s) remaining.`;
        errorMessage.style.display = "block";
        document.getElementById("password-input").value = ""; // Clear input field

        if (attempts === 0) {
            closePage();
        }
    }
}

function sendWhatsAppAlert() {
    fetch("http://localhost:3000/send-alert", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: "Access Denied: Too many incorrect attempts." })
    })
    .then(response => response.json())
    .then(data => console.log("WhatsApp alert sent:", data))
    .catch(error => console.error("Error sending WhatsApp alert:", error));
}

function closePage() {
    const passwordPopup = document.getElementById("password-popup");
    passwordPopup.className = "access-denied";
    passwordPopup.innerHTML = `
        <div class="alert-icon">⚠️</div>
        <h2>Access Denied</h2>
        <p>Too many incorrect attempts.</p>
    `;
    sendWhatsAppAlert();
    setTimeout(() => {
        window.close();
    }, 3000);
}

checkAuthentication();
