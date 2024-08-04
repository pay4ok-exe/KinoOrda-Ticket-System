document.addEventListener("DOMContentLoaded", function() {
    const signupForm = document.getElementById('signupForm');

    signupForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Ensure this is not commented out to prevent default form submission

        const email = document.querySelector('.field.email input').value.trim();
        const password = document.querySelector('.field.password input').value.trim();
        
        if (!email || !password) {
            alert('Please fill in all fields.');
            return;
        }

        let users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.some(user => user.email === email)) {
            alert('Email already exists. Please login or use another email.');
            // Clear input fields after showing the alert
            document.querySelector('.field.email input').value = "";
            document.querySelector('.field.password input').value = "";
            return;
        }

        users.push({ email, password });
        localStorage.setItem('users', JSON.stringify(users));

        alert('Registration successful!');
        window.location.href = '/index.html'; // Redirect to login page after signup
    });
});
