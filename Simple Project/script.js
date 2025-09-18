// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Smooth scroll to section (if sections exist)
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // CTA Button interaction
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // You can add your CTA logic here
            console.log('Get Started button clicked!');
            
            // Example: Show alert or redirect
            // alert('Thank you for your interest! We will contact you soon.');
            // window.location.href = 'contact.html';
        });
    }
    
    // Screen button interaction (in laptop mockup)
    const screenButton = document.querySelector('.screen-button');
    if (screenButton) {
        screenButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            console.log('Learn More button clicked!');
        });
    }
    
    // Laptop screen hover effect
    const laptopScreen = document.querySelector('.laptop-screen');
    if (laptopScreen) {
        laptopScreen.addEventListener('mouseenter', function() {
            this.style.transform = 'perspective(1000px) rotateY(-5deg) rotateX(2deg) scale(1.02)';
        });
        
        laptopScreen.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateY(-10deg) rotateX(5deg) scale(1)';
        });
    }
    
    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Mobile menu toggle (for smaller screens)
    function createMobileMenu() {
        const nav = document.querySelector('.nav');
        const navMenu = document.querySelector('.nav-menu');
        
        // Create mobile menu button
        const mobileMenuButton = document.createElement('button');
        mobileMenuButton.className = 'mobile-menu-button';
        mobileMenuButton.innerHTML = '☰';
        mobileMenuButton.setAttribute('aria-label', 'Toggle mobile menu');
        
        // Add mobile menu styles
        const style = document.createElement('style');
        style.textContent = `
            .mobile-menu-button {
                display: none;
                background: none;
                border: none;
                color: #ffffff;
                font-size: 24px;
                cursor: pointer;
                padding: 10px;
            }
            
            @media (max-width: 768px) {
                .mobile-menu-button {
                    display: block;
                }
                
                .nav-menu {
                    display: none;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: rgba(68, 87, 253, 0.95);
                    backdrop-filter: blur(10px);
                    flex-direction: column;
                    padding: 20px;
                    gap: 15px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                }
                
                .nav-menu.active {
                    display: flex;
                }
                
                .nav {
                    position: relative;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Add button to nav
        nav.appendChild(mobileMenuButton);
        
        // Toggle mobile menu
        mobileMenuButton.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.innerHTML = navMenu.classList.contains('active') ? '✕' : '☰';
        });
        
        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                mobileMenuButton.innerHTML = '☰';
            });
        });
    }
    
    // Initialize mobile menu
    createMobileMenu();
    
    // Parallax effect for laptop mockup (subtle)
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const laptopContainer = document.querySelector('.laptop-container');
        
        if (laptopContainer && window.innerWidth > 768) {
            const rate = scrolled * -0.5;
            laptopContainer.style.transform = `translateY(${rate}px)`;
        }
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe hero content for animation
    const heroContent = document.querySelector('.hero-content');
    const heroLaptop = document.querySelector('.hero-laptop');
    
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        heroContent.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(heroContent);
    }
    
    if (heroLaptop) {
        heroLaptop.style.opacity = '0';
        heroLaptop.style.transform = 'translateY(30px)';
        heroLaptop.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(heroLaptop);
    }
    
    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close mobile menu if open
            const navMenu = document.querySelector('.nav-menu');
            const mobileMenuButton = document.querySelector('.mobile-menu-button');
            
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuButton.innerHTML = '☰';
            }
        }
    });
    
    // Performance optimization: Debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Apply debouncing to scroll events
    const debouncedScrollHandler = debounce(function() {
        // Scroll-based animations can be added here
    }, 10);
    
    window.addEventListener('scroll', debouncedScrollHandler);
    
    console.log('DO Media website loaded successfully!');
});
