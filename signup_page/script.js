document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.querySelector("form");

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent the form from submitting normally

        const emailInput = document.querySelector(".field.email input").value;
        const passwordInput = document.querySelector(".field.password input").value;

        let users = JSON.parse(localStorage.getItem('users')) || [];

        // Check if the user exists and password matches
        const user = users.find(user => user.email === emailInput && user.password === passwordInput);
        if (user) {
            if (emailInput === "admin") {
                alert("Welcome, Admin!");
                localStorage.setItem('userRole', 'admin');
                window.location.href = "/home_page/index.html"; // Redirect to admin dashboard
            } else {
                alert(`Welcome, ${emailInput}!`);
                localStorage.setItem('userRole', `${emailInput}`);
                window.location.href = "/home_page/index.html"; // Redirect to customer dashboard
            }
        } 
        else if(emailInput === "admin" && passwordInput === "admin"){
            alert("Welcome, Admin!");
                localStorage.setItem('userRole', 'admin');
                window.location.href = "/home_page/index.html";
        }
        else {
            alert("Invalid credentials. Please try again.");
        }
        
        // Optionally, clear the form fields
        document.querySelector(".field.email input").value = "";
        document.querySelector(".field.password input").value = "";
    });
});

