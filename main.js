// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all functions
    initNavigation();
    initScrollEffects();
    initSkillAnimations();
    initTypingEffect();
    initMobileMenu();
    initSmoothScroll();
    initLoadingAnimations();
    
});

// Navigation Functions
function initNavigation() {
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('.menu ul li a');
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Update active navigation link
        updateActiveNavLink();
    });
    
    // Add click event to nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if open
            closeMobileMenu();
        });
    });
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.menu ul li a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Mobile Menu Functions
function initMobileMenu() {
    // Create mobile menu toggle button
    const nav = document.querySelector('nav .wrapper');
    const menu = document.querySelector('.menu');
    
    // Create toggle button if it doesn't exist
    if (!document.querySelector('.menu-toggle')) {
        const menuToggle = document.createElement('div');
        menuToggle.className = 'menu-toggle';
        menuToggle.innerHTML = '<span></span><span></span><span></span>';
        nav.appendChild(menuToggle);
        
        // Add click event to toggle button
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            menu.classList.toggle('active');
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        const menuToggle = document.querySelector('.menu-toggle');
        if (!menu.contains(e.target) && !menuToggle.contains(e.target)) {
            closeMobileMenu();
        }
    });
}

function closeMobileMenu() {
    const menu = document.querySelector('.menu');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (menu && menuToggle) {
        menu.classList.remove('active');
        menuToggle.classList.remove('active');
    }
}

// Scroll Effects
function initScrollEffects() {
    // Profile image hover effect
    const profileImage = document.querySelector('#profilePhoto');
    if (profileImage) {
        profileImage.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        profileImage.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    }
    
    // Parallax effect for welcome section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const welcomeSection = document.querySelector('#welcome');
        
        if (welcomeSection) {
            welcomeSection.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// Skill Progress Bar Animations
function initSkillAnimations() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.progress-bar');
                const skillLevel = progressBar.getAttribute('data-skill');
                
                setTimeout(() => {
                    progressBar.style.width = skillLevel + '%';
                }, 200);
                
                // Add animation class
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    skillItems.forEach(item => {
        skillObserver.observe(item);
    });
}

// Typing Effect for Welcome Text
function initTypingEffect() {
    const welcomeTitle = document.querySelector('.welcome-text h1');
    const welcomeDesc = document.querySelector('.welcome-text p');
    
    if (welcomeTitle) {
        const originalTitle = welcomeTitle.textContent;
        const originalDesc = welcomeDesc.textContent;
        
        // Clear text initially
        welcomeTitle.textContent = '';
        welcomeDesc.textContent = '';
        
        // Type title
        typeText(welcomeTitle, originalTitle, 50, () => {
            // Type description after title is complete
            setTimeout(() => {
                typeText(welcomeDesc, originalDesc, 30);
            }, 500);
        });
    }
}

function typeText(element, text, speed, callback) {
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
            if (callback) callback();
        }
    }, speed);
}

// Smooth Scroll
function initSmoothScroll() {
    // Add smooth scrolling to all links with hash
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Loading Animations
function initLoadingAnimations() {
    const animatedElements = document.querySelectorAll('.skill-item, .logoPend, .stat-item, .contact-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const loadingObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loading');
                setTimeout(() => {
                    entry.target.classList.add('loaded');
                }, 100);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        loadingObserver.observe(element);
    });
}

// Counter Animation for Stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-item h3');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace('+', '').replace('%', ''));
        const suffix = counter.textContent.includes('+') ? '+' : 
                     counter.textContent.includes('%') ? '%' : '';
        
        let current = 0;
        const increment = target / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target + suffix;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current) + suffix;
            }
        }, 50);
    });
}

// Initialize counter animation when stats section is visible
function initCounterAnimations() {
    const statsSection = document.querySelector('.about-stats');
    
    if (statsSection) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    }
}

// Add click effects to buttons and links
function initClickEffects() {
    const buttons = document.querySelectorAll('.project-btn, .social-link');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Add CSS for ripple effect
const rippleCSS = `
.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
}

@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`;

// Inject ripple CSS
const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

// Initialize click effects
initClickEffects();

// Initialize counter animations
initCounterAnimations();

// Scroll to top functionality
function initScrollToTop() {
    // Create scroll to top button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.className = 'scroll-to-top';
    scrollTopBtn.style.cssText = `
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
        font-size: 20px;
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
    `;
    
    document.body.appendChild(scrollTopBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top when clicked
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add hover effects
    scrollTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = '0 10px 25px rgba(102, 126, 234, 0.5)';
    });
    
    scrollTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 5px 15px rgba(102, 126, 234, 0.3)';
    });
}

// Initialize scroll to top
initScrollToTop();

// Particle effect for welcome section
function initParticleEffect() {
    const welcomeSection = document.querySelector('#welcome');
    if (!welcomeSection) return;
    
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        pointer-events: none;
        z-index: 1;
    `;
    
    welcomeSection.appendChild(particlesContainer);
    
    // Create particles
    for (let i = 0; i < 50; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 4 + 2;
    const x = Math.random() * 100;
    const animationDuration = Math.random() * 20 + 10;
    const delay = Math.random() * 20;
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        left: ${x}%;
        animation: float-particle ${animationDuration}s ${delay}s infinite linear;
        top: 100%;
    `;
    
    container.appendChild(particle);
    
    // Remove particle after animation and create new one
    setTimeout(() => {
        particle.remove();
        createParticle(container);
    }, (animationDuration + delay) * 1000);
}

// Add particle animation CSS
const particleCSS = `
@keyframes float-particle {
    0% {
        transform: translateY(0) rotate(0deg);
        opacity: 1;
    }
    100% {
        transform: translateY(-100vh) rotate(360deg);
        opacity: 0;
    }
}
`;

const particleStyle = document.createElement('style');
particleStyle.textContent = particleCSS;
document.head.appendChild(particleStyle);

// Initialize particle effect
initParticleEffect();

// Form validation (if contact form exists)
function initFormValidation() {
    const contactForm = document.querySelector('#contact-form');
    if (!contactForm) return;
    
    const inputs = contactForm.querySelectorAll('input, textarea');
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearErrors(this);
        });
    });
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            submitForm(contactForm);
        }
    });
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';
    
    // Clear previous errors
    clearErrors(field);
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        errorMessage = `${fieldName} is required`;
        isValid = false;
    }
    
    // Email validation
    if (fieldName === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            errorMessage = 'Please enter a valid email address';
            isValid = false;
        }
    }
    
    // Phone validation
    if (fieldName === 'phone' && value) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(value.replace(/\s/g, ''))) {
            errorMessage = 'Please enter a valid phone number';
            isValid = false;
        }
    }
    
    if (!isValid) {
        showError(field, errorMessage);
    }
    
    return isValid;
}

function showError(field, message) {
    field.classList.add('error');
    
    let errorElement = field.parentNode.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.style.cssText = `
            color: #e74c3c;
            font-size: 0.8rem;
            margin-top: 0.5rem;
            display: block;
        `;
        field.parentNode.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
}

function clearErrors(field) {
    field.classList.remove('error');
    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
}

function submitForm(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    
    // Simulate form submission (replace with actual form submission logic)
    setTimeout(() => {
        // Reset form
        form.reset();
        
        // Show success message
        showNotification('Message sent successfully!', 'success');
        
        // Reset button
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }, 2000);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 5px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Initialize form validation
initFormValidation();

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Initialize lazy loading
initLazyLoading();

// Theme toggle functionality
function initThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.className = 'theme-toggle';
    themeToggle.style.cssText = `
        position: fixed;
        top: 50%;
        right: 20px;
        width: 50px;
        height: 50px;
        background: rgba(255, 255, 255, 0.9);
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 18px;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(10px);
    `;
    
    document.body.appendChild(themeToggle);
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.classList.add(savedTheme);
        updateThemeToggle(savedTheme === 'dark-theme');
    }
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        
        // Save theme preference
        localStorage.setItem('theme', isDark ? 'dark-theme' : 'light-theme');
        
        updateThemeToggle(isDark);
    });
    
    function updateThemeToggle(isDark) {
        const icon = themeToggle.querySelector('i');
        icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        themeToggle.style.background = isDark ? 'rgba(51, 51, 51, 0.9)' : 'rgba(255, 255, 255, 0.9)';
        themeToggle.style.color = isDark ? '#fff' : '#333';
    }
}

// Note: Theme toggle with localStorage is commented out as it's not supported in Claude artifacts
// initThemeToggle();

// Performance optimization
function initPerformanceOptimizations() {
    // Debounce scroll events
    let scrollTimeout;
    const originalScrollHandler = window.onscroll;
    
    window.onscroll = function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            if (originalScrollHandler) originalScrollHandler();
        }, 10);
    };
    
    // Preload critical images
    const criticalImages = ['/images/rdps.jpg'];
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize performance optimizations
initPerformanceOptimizations();

// Console welcome message
console.log('%c Portfolio Website Loaded Successfully!', 'color: #667eea; font-size: 16px; font-weight: bold;');
console.log('%cMade with by Ruth Diana Putri Sari', 'color: #764ba2; font-size: 12px;');