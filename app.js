var htmlEditor = ace.edit("html");
htmlEditor.setTheme("ace/theme/tomorrow_night_bright");
htmlEditor.session.setMode("ace/mode/html");
htmlEditor.resize();
htmlEditor.setHighlightActiveLine(false);
htmlEditor.setOptions({
  enableBasicAutocompletion: true, // Shows suggestions when typing
  enableLiveAutocompletion: true,  // Real-time autocomplete
  enableSnippets: true,            // Enables code snippets
});


var cssEditor = ace.edit("css");
cssEditor.setTheme("ace/theme/tomorrow_night_bright");
cssEditor.session.setMode("ace/mode/css");
cssEditor.resize();
cssEditor.setHighlightActiveLine(false);
cssEditor.setOptions({
  enableBasicAutocompletion: true,
  enableLiveAutocompletion: true,
  enableSnippets: true,
});

var jsEditor = ace.edit("js");
jsEditor.setTheme("ace/theme/tomorrow_night_bright");
jsEditor.session.setMode("ace/mode/javascript");
jsEditor.resize();
jsEditor.setHighlightActiveLine(false);
jsEditor.setOptions({
  enableBasicAutocompletion: true,
  enableLiveAutocompletion: true,
  enableSnippets: true,
});

function compiler() {
  var htmlValue = htmlEditor.getValue();
  var cssValue = cssEditor.getValue();
  var jsValue = jsEditor.getValue();
  var result = document.getElementById("result").contentWindow.document;

  result.open();
  result.writeln(
    "<style>" +
    cssValue +
    "</style>" +
    htmlValue +
    "<script>" +
    jsValue +
    "</script>"
  );
  result.close();
}

// Login and Sign-up /





var allButtons = document.querySelectorAll("#button-wrapper button");
var allPanels = document.querySelectorAll("#ide-container .panel-wrapper");
const getstarted = document.querySelector("#start-btn");



// Selecting web-page sections
const landingPage = document.querySelector(".landing-page");
const aboutPage = document.querySelector(".about-section");
const codeUI = document.querySelector("#ide-parent");

// Selecting navigation buttons
const homeBtn = document.querySelector("#home-btn");
const codeUIBtn = document.querySelector("#CodeUI-btn");
const aboutBtn = document.querySelector("#About-btn");





// Function to switch pages dynamically

function switchPage(page) {
  // Hide all pages properly
  landingPage.style.display = "none";
  landingPage.style.visibility = "hidden"; 
  aboutPage.style.display = "none";
  aboutPage.style.visibility = "hidden";
  codeUI.style.display = "none";
  codeUI.style.visibility = "hidden";

  // Remove active class from all buttons
  homeBtn.classList.remove("active");
  codeUIBtn.classList.remove("active");
  aboutBtn.classList.remove("active");

  // Show selected page and ensure it's visible
  if (page === "home") {
      landingPage.style.display = "flex";
      landingPage.style.visibility = "visible";
      document.querySelector(".landing-page").style.animation = "fadeIn 0.8s ease-in-out";
      homeBtn.classList.add("active");  
  } else if (page === "codeui") {
      codeUI.style.display = "block";
      codeUI.style.visibility = "visible";
      codeUIBtn.classList.add("active");  
  } else if (page === "about") {
      aboutPage.style.display = "flex";
      aboutPage.style.visibility = "visible";
      aboutBtn.classList.add("active");  
  }
}

// Set landing page as default after DOM loads
window.addEventListener("DOMContentLoaded", () => {
  switchPage("home");
});


// Add event listeners to navigation buttons
homeBtn.addEventListener("click", () => switchPage("home"));
codeUIBtn.addEventListener("click", () => switchPage("codeui"));
aboutBtn.addEventListener("click", () => switchPage("about"));
getstarted.addEventListener( "click" , () => switchPage("codeui"));





function switchPanel(panelIndex) {
  switcher(panelIndex);
}

switchPanel(0);

function runEdit(panelIndex) {
  switcher(panelIndex);
  compiler();
}

function switcher(panelIndex) {
  allButtons.forEach(function (node) {
    node.style.background = "";
  });
  allButtons[panelIndex].style.background = "#000";
  allPanels.forEach(function (node) {
    node.style.display = "none";
  });
  allPanels[panelIndex].style.display = "block";
}

//navbar transition
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section"); // All sections
  const navButtons = document.querySelectorAll("nav ul li button");

  function changeActiveButton() {
    let scrollPosition = window.scrollY + 100; // Offset for better accuracy

    sections.forEach((section) => {
      if (
        scrollPosition >= section.offsetTop &&
        scrollPosition < section.offsetTop + section.offsetHeight
      ) {
        navButtons.forEach((btn) => btn.classList.remove("active")); // Remove active

        let activeButton = document.querySelector(
          `nav ul li button[data-section="${section.id}"]`
        );
        if (activeButton) activeButton.classList.add("active"); // Add active to current section
      }
    });
  }


  
  window.addEventListener("scroll", changeActiveButton);
  changeActiveButton(); // Run once on page load
});


// download Function

/* ===== Download Individual Code Files in TXT Format ===== */
function downloadFile(type) {
  let fileName = "";
  let fileContent = "";
  
  if (type === "html") {
      fileName = "code.html";
      fileContent = htmlEditor.getValue();
  } else if (type === "css") {
      fileName = "style.css";
      fileContent = cssEditor.getValue();
  } else if (type === "js") {
      fileName = "script.js";
      fileContent = jsEditor.getValue();
  }

  // Create Blob and Download Link
  var blob = new Blob([fileContent], { type: "text/plain" });
  var link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

//Navbar-button-toggle

document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll("ul li button");

  buttons.forEach((button) => {
      button.addEventListener("click", function () {
          // Remove "active" class from all buttons
          buttons.forEach((btn) => btn.classList.remove("active"));

          // Add "active" class to the clicked button
          this.classList.add("active");
      });
  });
});



document.querySelectorAll(".submit-btn").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector(".landing-page").style.display = "flex";
  });
});


function toggleAuth() {
  let createAccount = document.getElementById("create-account");
  let logoutBtn = document.getElementById("logout-btn");

  // Toggle button visibility
  if (createAccount.style.display === "none") {
      createAccount.style.display = "block";
      logoutBtn.style.display = "none";
  } else {
      createAccount.style.display = "none";
      logoutBtn.style.display = "block";
  }
  
}

document.querySelector("#create-account").addEventListener("click" , () => {
  document.querySelector(".auth-container").style.display = "flex" ;
  setTimeout(() => {
    document.querySelector(".dropbtn").style.removeProperty("display");
     document.querySelector("#result").style.display = "block" ;
  } , 1500);
})





function logout() {
  // Clear session/local storage (if used for authentication)
  localStorage.removeItem("user");  // Adjust this based on how you store login info

  window.location.reload(); 
  toggleAuth(); 

}





