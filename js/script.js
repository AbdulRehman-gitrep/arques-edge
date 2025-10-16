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

// Form Submission
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formStatus = document.getElementById('formStatus');
    formStatus.innerHTML = '<p style="color: #00ffe5;">Sending message...</p>';
    
    const formData = new FormData(e.target);
    
    fetch('send_email.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            formStatus.innerHTML = '<p style="color: #00ffe5;">' + data.message + '</p>';
            e.target.reset();
        } else {
            formStatus.innerHTML = '<p style="color: #ff3366;">' + data.message + '</p>';
        }
    })
    .catch(error => {
        formStatus.innerHTML = '<p style="color: #ff3366;">There was an error sending your message. Please try again later.</p>';
        console.error('Error:', error);
    });
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