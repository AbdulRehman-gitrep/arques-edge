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

// Contact form submission with Formspree
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formStatus = document.getElementById('formStatus');
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        
        // Disable button and show loading state
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        
        // Get form data
        const formData = new FormData(contactForm);
        
        try {
            // Formspree form endpoint
            const response = await fetch('https://formspree.io/f/mldpaqel', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                if (formStatus) {
                    formStatus.textContent = 'Message sent successfully! We\'ll get back to you soon.';
                    formStatus.style.color = '#4ade80';
                    formStatus.style.marginTop = '1rem';
                }
                contactForm.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            if (formStatus) {
                formStatus.textContent = 'Oops! There was a problem sending your message. Please try again or email us directly at arquesedge@gmail.com';
                formStatus.style.color = '#ef4444';
                formStatus.style.marginTop = '1rem';
            }
        } finally {
            // Re-enable button
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    });
}