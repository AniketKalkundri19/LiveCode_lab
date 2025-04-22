document.addEventListener("DOMContentLoaded", () => {
    // Check if landing page should be hidden
    if (localStorage.getItem("hideLandingPage")) {
      document.querySelector(".landing-page").style.display = "none";
    }
  
    // Handle Sign-Up Form Submission
    document.querySelector("#signup-form").addEventListener("submit", async (e) => {
      e.preventDefault(); // Prevent page reload
  
      let username = document.querySelector("#signup-form input[type='text']").value.trim();
      let email = document.querySelector("#signup-form input[type='email']").value.trim();
      let password = document.querySelector("#signup-form input[type='password']").value.trim();
  
      if (!username || !email || !password) {
        alert("⚠️ Please fill all fields!");
        return;
      }
  
      try {
        let response = await fetch("https://livecode-lab.onrender.com/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password })
        });
  
        let result = await response.json();
        console.log("Signup Response:", result); // Debugging
  
        if (response.ok) {
          
          localStorage.setItem("hideLandingPage", "false"); // Hide landing page after sign-up
         
          document.querySelector("#greeting").innerHTML = `Hi, ${username}`;
        } else {
          alert("⚠️ " + result.error);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("❌ Could not connect to the server!");
        setTimeout(() => {
            window.location.reload();
          }, 500);
      }
    });
    
    // Handle Login Form Submission
    document.querySelector("#login-form").addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const username = document.querySelector("#login-form input[type='text']").value.trim();
      const password = document.querySelector("#login-form input[type='password']").value.trim();
  
      if (!username || !password) {
        alert("❌ Please enter both username and password!");
        return;
      }
  
      try {
        const response = await fetch("https://livecode-lab.onrender.com/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });
  
        const result = await response.json();
        console.log("Login Response:", result); // Debugging
  
        if (response.ok) {
        
          localStorage.setItem("hideLandingPage", "false"); // Hide landing page after login
          
          document.querySelector(".auth-container").style.display = "none";
          document.querySelector("#greeting").innerHTML = `Hi, ${username}`;
        } else {
          alert("❌ " + result.error);
          setTimeout(() => {
            window.location.reload(); // Reload only on incorrect login
          }, 500);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("❌ Please Sign-Up First...🙏🏻");
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    });
  
    // Show landing page only if not logged in
    if (!localStorage.getItem("hideLandingPage")) {
      document.querySelector(".landing-page").style.display = "flex";
    }
  });
  
  
