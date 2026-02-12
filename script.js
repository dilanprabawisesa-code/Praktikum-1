// ==================== NAVBAR FUNCTIONALITY ====================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ==================== PARALLAX EFFECT ====================
const floatingShape = document.querySelector('.floating-shape');
document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 30;
    floatingShape.style.transform = `translate(${x}px, ${y}px) rotate(0deg)`;
});

// ==================== CONTACT FORM ====================
const contactForm = document.getElementById('contactForm');

// Prevent default submit behavior
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nameInput = contactForm.querySelector('input[type="text"]');
    const emailInput = contactForm.querySelector('input[type="email"]');
    const messageInput = contactForm.querySelector('textarea');
    const submitBtn = contactForm.querySelector('.submit-button');
    
    if (nameInput.value && emailInput.value && messageInput.value) {
        const originalText = submitBtn.textContent;
        
        // Collect form data
        const formData = new FormData(contactForm);
        
        // Send to Formspree
        fetch('https://formspree.io/f/xqedeylg', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                submitBtn.textContent = '✓ Terkirim!';
                submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                
                // Kosongkan form
                contactForm.reset();
                
                // Reset button setelah 3 detik
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                }, 3000);
            } else {
                alert('Ada error, coba lagi');
            }
        })
        .catch(error => {
            alert('Ada error, coba lagi');
            console.error('Error:', error);
        });
        
    } else {
        alert('Mohon isi semua field!');
    }
});

// ==================== NAVBAR SCROLL EFFECT ====================
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
        navbar.style.boxShadow = '0 5px 30px rgba(102, 126, 234, 0.3)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// ==================== CTA BUTTON ====================
const ctaButton = document.querySelector('.cta-button');
ctaButton.addEventListener('click', () => {
    const aboutSection = document.querySelector('#about');
    aboutSection.scrollIntoView({ behavior: 'smooth' });
});

// ==================== SCROLL TO TOP ====================
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        if (!document.querySelector('.scroll-to-top')) {
            const scrollToTopBtn = document.createElement('button');
            scrollToTopBtn.className = 'scroll-to-top';
            scrollToTopBtn.innerHTML = '↑';
            scrollToTopBtn.style.cssText = `
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 50px;
                height: 50px;
                background: linear-gradient(135deg, #667eea, #764ba2);
                color: white;
                border: none;
                border-radius: 50%;
                cursor: pointer;
                z-index: 999;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.5rem;
                transition: all 0.3s ease;
                box-shadow: 0 5px 20px rgba(102, 126, 234, 0.3);
                animation: float 3s ease-in-out infinite;
            `;
            
            scrollToTopBtn.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.2)';
                this.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.5)';
            });
            
            scrollToTopBtn.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
            
            scrollToTopBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
            
            document.body.appendChild(scrollToTopBtn);
        }
    } else {
        const btn = document.querySelector('.scroll-to-top');
        if (btn) btn.remove();
    }
});

// ==================== ACTIVE NAVBAR LINK ====================
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.style.transition = 'all 0.3s ease';
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = '#667eea';
        } else {
            link.style.color = '';
        }
    });
});