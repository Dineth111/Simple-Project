// Example JavaScript for form submission or interaction

// Contact Form Submission (example using alert)
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if(name && email && message) {
        alert('Message sent successfully!');
        // You could replace the alert with actual form submission using AJAX or other methods.
    } else {
        alert('Please fill out all fields!');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
