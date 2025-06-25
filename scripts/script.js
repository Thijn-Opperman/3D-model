// Voor toekomstige functionaliteit, zoals interacties met de 3D-afbeelding
console.log("Script geladen. Klaar voor toekomstige functionaliteit.");

// Product Slider Functionaliteit
class ProductSlider {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.slide');
        this.track = document.querySelector('.slider-track');
        this.prevBtn = document.querySelector('.prev-btn');
        this.nextBtn = document.querySelector('.next-btn');
        this.totalSlides = this.slides.length;
        
        this.init();
    }
    
    init() {
        if (this.prevBtn && this.nextBtn) {
            this.prevBtn.addEventListener('click', () => this.prevSlide());
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }
        
        // Auto-play functionaliteit
        this.startAutoPlay();
        
        // Pause auto-play bij hover
        const sliderContainer = document.querySelector('.slider-container');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', () => this.stopAutoPlay());
            sliderContainer.addEventListener('mouseleave', () => this.startAutoPlay());
        }
    }
    
    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateSlider();
    }
    
    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateSlider();
    }
    
    updateSlider() {
        const offset = -this.currentSlide * 100;
        this.track.style.transform = `translateX(${offset}%)`;
        
        // Update active class
        this.slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === this.currentSlide);
        });
    }
    
    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 5000); // Verander slide elke 5 seconden
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
        }
    }
}

// Smooth Scrolling voor navigatie links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Animaties bij scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observeer alle cards en secties
    const animatedElements = document.querySelectorAll('.card, .store-item, .slide');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// CTA Button functionaliteit
function initCTAButton() {
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            // Scroll naar de info cards sectie
            const infoCards = document.querySelector('.info-cards');
            if (infoCards) {
                infoCards.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
}

// Hover effecten voor store items
function initStoreHoverEffects() {
    const storeItems = document.querySelectorAll('.store-item');
    
    storeItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-10px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Mobile menu toggle (voor toekomstige uitbreiding)
function initMobileMenu() {
    const navBar = document.querySelector('.nav-bar');
    const navLinks = document.querySelectorAll('.nav-left a, .nav-right a');
    
    // Voeg mobile menu toggle toe als scherm klein is
    function handleResize() {
        if (window.innerWidth <= 768) {
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    // Sluit menu na klik (voor toekomstige hamburger menu)
                });
            });
        }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call
}

// Form validatie voor toekomstige formulieren
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basis validatie
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#ff4444';
                } else {
                    input.style.borderColor = '#4CAF50';
                }
            });
            
            if (isValid) {
                // Form is geldig, hier zou je de data kunnen versturen
                console.log('Form is geldig!');
            }
        });
    });
}

// Parallax effect voor hero sectie
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }
}

// Initialize alle functionaliteiten
document.addEventListener('DOMContentLoaded', () => {
    console.log('Opper-Bier website geladen! 🍻');
    
    // Initialize alle componenten
    new ProductSlider();
    initSmoothScrolling();
    initScrollAnimations();
    initCTAButton();
    initStoreHoverEffects();
    initMobileMenu();
    initFormValidation();
    initParallaxEffect();
    
    // Voeg loading animatie toe
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Voeg keyboard navigatie toe voor slider
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        const prevBtn = document.querySelector('.prev-btn');
        if (prevBtn) prevBtn.click();
    } else if (e.key === 'ArrowRight') {
        const nextBtn = document.querySelector('.next-btn');
        if (nextBtn) nextBtn.click();
    }
});

// Voeg touch/swipe functionaliteit toe voor mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe naar links - volgende slide
            const nextBtn = document.querySelector('.next-btn');
            if (nextBtn) nextBtn.click();
        } else {
            // Swipe naar rechts - vorige slide
            const prevBtn = document.querySelector('.prev-btn');
            if (prevBtn) prevBtn.click();
        }
    }
}