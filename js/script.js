// Loader functionality
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').style.display = 'none';
        document.querySelector('.main-content').style.display = 'block';
    }, 2000);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact form submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = contactForm.elements.name.value;
            const email = contactForm.elements.email.value;
            const subject = contactForm.elements.subject.value || 'New Contact Form Submission';
            const message = contactForm.elements.message.value;
            
            // Validate form
            if (!name || !email || !message) {
                formStatus.innerHTML = '<p class="error">Please fill in all required fields.</p>';
                return;
            }
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                formStatus.innerHTML = '<p class="error">Please enter a valid email address.</p>';
                return;
            }
            
            formStatus.innerHTML = '<p class="sending">Preparing your message...</p>';
            
            // Simulate sending process (in a real implementation, this would use a service)
            setTimeout(() => {
                // Create mailto link that opens in user's email client
                const mailtoLink = `mailto:arquesedge@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
                
                // Open email client
                window.location.href = mailtoLink;
                
                // Show success message
                formStatus.innerHTML = '<p class="success">Your email client has opened with your message ready to send. Please click send in your email program.</p>';
                
                // Reset form
                contactForm.reset();
                
            }, 1500);
        });
    }
});