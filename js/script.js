// Loading Animation
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loader').style.display = 'none';
            document.querySelector('.main-content').classList.add('show');
        }, 500);
    }, 3000);
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

// Scroll Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.glass-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = 'all 0.6s ease-out';
    observer.observe(card);
});