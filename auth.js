document.getElementById("show-signup").addEventListener("click", function () {
    document.querySelector(".login").style.display = "none"; // Hide login form
    document.querySelector(".signup").style.display = "block"; // Show signup form
});

document.getElementById("show-login").addEventListener("click", function () {
    document.querySelector(".signup").style.display = "none"; // Hide signup form
    document.querySelector(".login").style.display = "block"; // Show login form
});

document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission
    document.querySelector(".auth-container").style.display = "none"; // Hide login/signup page 
    let landingPage = document.querySelector(".landing-page");
    landingPage.style.display = "flex"; // Show landing page

    // Reset animation by removing and re-adding the class
    landingPage.style.animation = "none";
    setTimeout(() => {
        landingPage.style.animation = "fadeIn 0.8s ease-in-out";
    }, 10);
});


document.getElementById("signup-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission
    document.querySelector(".auth-container").style.display = "none"; // Hide login/signup page
    let landingPage = document.querySelector(".landing-page");
    landingPage.style.display = "flex"; // Show landing page

    // Reset animation by removing and re-adding the class
    landingPage.style.animation = "none";
    setTimeout(() => {
        landingPage.style.animation = "fadeIn 0.8s ease-in-out";
    }, 10);
});


//username & password pattern check
document.getElementById("username").addEventListener("input", function () {
    const username = this.value;
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/;
    
    if (!regex.test(username)) {
        this.setCustomValidity("Username must contain both letters and numbers.");
    } else {
        this.setCustomValidity("");
    }
});

document.getElementById("password").addEventListener("input", function () {
    const password = this.value;
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/;
    
    if (!regex.test(password)) {
        this.setCustomValidity("Password must contain both letters and numbers.");
    } else {
        this.setCustomValidity("");
    }
});

//password-show-toggle

document.addEventListener("DOMContentLoaded", function () {
    const passwordFields = document.querySelectorAll(".password-container input[type='password']");
    const togglePasswordIcons = document.querySelectorAll(".toggle-password");

    togglePasswordIcons.forEach((icon, index) => {
        icon.addEventListener("click", function () {
            let passwordField = passwordFields[index]; // Get corresponding password field

            if (passwordField.type === "password") {
                passwordField.type = "text"; // Show password
                this.classList.remove("fa-eye");
                this.classList.add("fa-eye-slash"); // Change icon
            } else {
                passwordField.type = "password"; // Hide password
                this.classList.remove("fa-eye-slash");
                this.classList.add("fa-eye"); // Change icon back
            }
        });
    });
});

