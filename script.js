document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navButtons = document.querySelector('.nav-buttons');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        
        // Create mobile menu if it doesn't exist
        if (!document.querySelector('.mobile-menu')) {
            const mobileMenu = document.createElement('div');
            mobileMenu.className = 'mobile-menu';
            
            const navLinksCopy = navLinks.cloneNode(true);
            const navButtonsCopy = navButtons.cloneNode(true);
            
            mobileMenu.appendChild(navLinksCopy);
            mobileMenu.appendChild(navButtonsCopy);
            
            document.body.appendChild(mobileMenu);
            
            // Add styles for mobile menu
            const style = document.createElement('style');
            style.textContent = `
                .mobile-menu {
                    position: fixed;
                    top: 80px;
                    left: 0;
                    width: 100%;
                    background: var(--white);
                    box-shadow: var(--shadow-md);
                    padding: 20px;
                    z-index: 999;
                    display: none;
                    flex-direction: column;
                    gap: 30px;
                }
                
                .mobile-menu .nav-links {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 20px;
                }
                
                .mobile-menu .nav-buttons {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                    width: 100%;
                }
                
                .mobile-menu .nav-buttons a {
                    width: 100%;
                    text-align: center;
                }
                
                .hamburger.active span:nth-child(1) {
                    transform: rotate(45deg) translate(5px, 5px);
                }
                
                .hamburger.active span:nth-child(2) {
                    opacity: 0;
                }
                
                .hamburger.active span:nth-child(3) {
                    transform: rotate(-45deg) translate(5px, -5px);
                }
                
                .mobile-menu.active {
                    display: flex;
                }
            `;
            
            document.head.appendChild(style);
        }
        
        const mobileMenu = document.querySelector('.mobile-menu');
        mobileMenu.classList.toggle('active');
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const mobileMenu = document.querySelector('.mobile-menu');
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    hamburger.click();
                }
            }
        });
    });

    // Testimonial slider
    const dots = document.querySelectorAll('.dot');
    const testimonials = document.querySelectorAll('.testimonial');
    let currentSlide = 0;
    
    function showSlide(index) {
        // Hide all testimonials and deactivate all dots
        testimonials.forEach(testimonial => {
            testimonial.style.opacity = '0.4';
            testimonial.style.transform = 'scale(0.9)';
        });
        
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show current testimonial and activate current dot
        testimonials[index].style.opacity = '1';
        testimonials[index].style.transform = 'scale(1)';
        dots[index].classList.add('active');
        
        currentSlide = index;
    }
    
    // Initialize first slide
    showSlide(0);
    
    // Add click event for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Auto slide every 5 seconds
    setInterval(() => {
        const nextSlide = (currentSlide + 1) % testimonials.length;
        showSlide(nextSlide);
    }, 5000);

    // Sticky header on scroll
    const header = document.querySelector('header');
    let lastScrollPosition = 0;
    
    window.addEventListener('scroll', () => {
        const currentScrollPosition = window.pageYOffset;
        
        if (currentScrollPosition > 100) {
            header.style.boxShadow = 'var(--shadow-md)';
            header.style.padding = '15px 0';
        } else {
            header.style.boxShadow = 'var(--shadow-sm)';
            header.style.padding = '20px 0';
        }
        
        lastScrollPosition = currentScrollPosition;
    });

    // Animation for features on scroll
    const featureCards = document.querySelectorAll('.feature-card');
    
    const observerOptions = {
        threshold: 0.2
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });

    // Display current year in the footer
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = yearElement.textContent.replace('2025', currentYear);
    }
});