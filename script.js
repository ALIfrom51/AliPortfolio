/* ===================================================
   PORTFOLIO JAVASCRIPT - Ali Rebbouh
   Interactive Features & Animations
   ================================================== */

// ===== DOM ELEMENTS =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-menu a');
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const projectsGrid = document.getElementById('projectsGrid');

// ===== MOBILE MENU TOGGLE =====
/**
 * Toggle mobile navigation menu
 */
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

/**
 * Close menu when a link is clicked
 */
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

/**
 * Close menu when clicking outside
 */
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// ===== SMOOTH SCROLL WITH OFFSET =====
/**
 * Smooth scroll to sections with navbar offset
 */
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ===== SCROLL REVEAL ANIMATION =====
/**
 * Reveal elements as they come into view
 */
class ScrollReveal {
    constructor() {
        this.elements = document.querySelectorAll(
            'section, .skill-category, .project-card, .cert-card, .interest-card'
        );
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animation = 'fadeIn 0.8s ease-out forwards';
                        observer.unobserve(entry.target);
                    }
                });
            }, this.observerOptions);

            this.elements.forEach(el => {
                observer.observe(el);
            });
        }
    }
}

// Initialize scroll reveal on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    new ScrollReveal();
});

// ===== PROJECT FILTERING =====
/**
 * Filter projects by category
 */
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Filter projects
        const filterValue = button.getAttribute('data-filter');
        filterProjects(filterValue);
    });
});

/**
 * Filter and animate projects
 */
function filterProjects(filter) {
    projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
            card.classList.remove('hidden');
            card.style.animation = 'slideUp 0.6s ease-out forwards';
        } else {
            card.style.animation = 'fadeOut 0.3s ease-out forwards';
            setTimeout(() => {
                card.classList.add('hidden');
            }, 300);
        }
    });
}

// Add fadeOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== CONTACT FORM HANDLING =====
/**
 * Handle contact form submission
 */
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validation
    if (!name || !email || !message) {
        showFormMessage('Please fill in all fields', 'error');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showFormMessage('Please enter a valid email address', 'error');
        return;
    }

    // Simulate form submission (in production, this would send to a backend)
    const formData = {
        name,
        email,
        message,
        timestamp: new Date().toISOString()
    };

    console.log('Form submitted:', formData);
    
    // Save to localStorage (for demo purposes)
    saveFormSubmission(formData);

    // Show success message
    showFormMessage(
        'Thank you! I\'ll get back to you as soon as possible.',
        'success'
    );

    // Reset form
    contactForm.reset();

    // Auto-hide message after 5 seconds
    setTimeout(() => {
        formMessage.classList.remove('success', 'error');
        formMessage.textContent = '';
    }, 5000);
});

/**
 * Display form message
 */
function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
}

/**
 * Save form submission (demo - using localStorage)
 */
function saveFormSubmission(data) {
    try {
        let submissions = JSON.parse(localStorage.getItem('portfolioSubmissions')) || [];
        submissions.push(data);
        localStorage.setItem('portfolioSubmissions', JSON.stringify(submissions));
    } catch (error) {
        console.log('Note: localStorage not available. Form data would be sent to backend in production.');
    }
}

// ===== ACTIVE NAV LINK ON SCROLL =====
/**
 * Update active nav link based on scroll position
 */
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===== TERMINAL ANIMATION =====
/**
 * Animate terminal cursor
 */
function initTerminalCursor() {
    const terminalOutput = document.querySelector('.terminal-output');
    if (terminalOutput) {
        const lastLine = terminalOutput.parentElement.lastElementChild;
        if (lastLine && lastLine.classList.contains('terminal-output')) {
            const cursor = document.createElement('span');
            cursor.textContent = '▁';
            cursor.style.animation = 'blink 1s step-start infinite';
            lastLine.appendChild(cursor);

            // Add blink animation
            if (!document.querySelector('style[data-terminal-blink]')) {
                const blinkStyle = document.createElement('style');
                blinkStyle.setAttribute('data-terminal-blink', 'true');
                blinkStyle.textContent = `
                    @keyframes blink {
                        0%, 49% { opacity: 1; }
                        50%, 100% { opacity: 0; }
                    }
                `;
                document.head.appendChild(blinkStyle);
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', initTerminalCursor);

// ===== NAVBAR SCROLL EFFECT =====
/**
 * Add shadow to navbar on scroll
 */
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 30px rgba(0, 217, 255, 0.15)';
    } else {
        navbar.style.boxShadow = '0 0 30px rgba(0, 217, 255, 0.15)';
    }
});

// ===== PREVENT RIGHT CLICK ON CV DOWNLOAD (for security context) =====
/**
 * Handle CV download
 */
const downloadCVBtn = document.querySelector('a[href="#contact"]');
if (downloadCVBtn) {
    downloadCVBtn.addEventListener('click', (e) => {
        // In production, this would trigger an actual CV download
        // For now, it scrolls to contact section
        e.preventDefault();
        const contactSection = document.getElementById('contact');
        contactSection.scrollIntoView({ behavior: 'smooth' });
    });
}

// ===== PARALLAX EFFECT ON HERO SECTION =====
/**
 * Create parallax scrolling effect
 */
function initParallax() {
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            heroBackground.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        });

        // Also on mouse move for hero section
        document.querySelector('.hero').addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;
            
            const orbs = document.querySelectorAll('.gradient-orb');
            orbs.forEach((orb, index) => {
                const speed = (index + 1) * 0.5;
                orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', initParallax);

// ===== TYPING EFFECT FOR TERMINAL =====
/**
 * Add typing effect to terminal output
 */
function typeWriter(element, text, speed = 50) {
    let index = 0;
    element.textContent = '';

    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Apply typing effect on page load
document.addEventListener('DOMContentLoaded', () => {
    const terminalLines = document.querySelectorAll('.terminal-output');
    terminalLines.forEach((line, index) => {
        const originalText = line.textContent;
        line.textContent = '';
        setTimeout(() => {
            typeWriter(line, originalText, 30);
        }, index * 300);
    });
});

// ===== PERFORMANCE OPTIMIZATION =====
/**
 * Lazy load images if any
 */
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

document.addEventListener('DOMContentLoaded', initLazyLoading);

// ===== KEYBOARD NAVIGATION =====
/**
 * Improved keyboard navigation
 */
document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }

    // Quick navigation with keyboard (Alt + number)
    if (e.altKey && e.key >= '1' && e.key <= '6') {
        const navItems = ['hero', 'about', 'skills', 'projects', 'certifications', 'contact'];
        const index = parseInt(e.key) - 1;
        if (navItems[index]) {
            const target = document.getElementById(navItems[index]);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }
});

// ===== DARK MODE TOGGLE (Optional Enhancement) =====
/**
 * Check system preference for dark mode
 */
function initTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    if (prefersDark.matches) {
        document.documentElement.style.colorScheme = 'dark';
    }

    // Listen for changes
    prefersDark.addEventListener('change', (e) => {
        document.documentElement.style.colorScheme = e.matches ? 'dark' : 'light';
    });
}

document.addEventListener('DOMContentLoaded', initTheme);

// ===== UTILITY: COPY TO CLIPBOARD =====
/**
 * Utility to copy text to clipboard
 */
function copyToClipboard(text, feedbackElement) {
    navigator.clipboard.writeText(text).then(() => {
        if (feedbackElement) {
            const originalText = feedbackElement.textContent;
            feedbackElement.textContent = 'Copied!';
            setTimeout(() => {
                feedbackElement.textContent = originalText;
            }, 2000);
        }
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

// ===== ANALYTICS TRACKING (for production) =====
/**
 * Simple event tracking
 */
function trackEvent(eventName, eventData = {}) {
    // In production, this would send data to analytics service
    console.log(`Event: ${eventName}`, eventData);
    
    // Example: send to Google Analytics or similar
    // if (window.gtag) {
    //     gtag('event', eventName, eventData);
    // }
}

// Track when users view sections
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                trackEvent('section_viewed', {
                    section: entry.target.id
                });
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(section => sectionObserver.observe(section));
});

// Track project card clicks
document.addEventListener('click', (e) => {
    if (e.target.closest('.project-link')) {
        const projectCard = e.target.closest('.project-card');
        const projectTitle = projectCard?.querySelector('.project-title')?.textContent;
        trackEvent('project_clicked', { project: projectTitle });
    }
});

// ===== CONSOLE MESSAGE FOR DEVELOPERS =====
/**
 * Welcome message in console
 */
console.log('%c🔐 Welcome to Ali Rebbouh\'s Portfolio', 'color: #00d9ff; font-size: 16px; font-weight: bold;');
console.log('%cNetwork & Cybersecurity Engineering Student at ENSA Safi', 'color: #9d4edd; font-size: 12px;');
console.log('%c💡 Interested in learning more? Check out the GitHub links in the projects section!', 'color: #39ff14; font-size: 11px;');
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #00d9ff;');

// ===== MOBILE TOUCH OPTIMIZATIONS =====
/**
 * Add touch feedback to interactive elements
 */
if (window.matchMedia('(hover: none)').matches) {
    // Device doesn't support hover (likely mobile)
    const interactiveElements = document.querySelectorAll('.btn, .project-link, .social-link, .tool-badge');
    
    interactiveElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.opacity = '0.8';
        });
        
        element.addEventListener('touchend', function() {
            this.style.opacity = '1';
        });
    });
}

// ===== PRELOAD CRITICAL RESOURCES =====
/**
 * Preload fonts and critical resources
 */
function preloadResources() {
    // Fonts would be preloaded if using custom fonts
    // const fonts = ['Courier New', 'Fira Code'];
    // fonts.forEach(font => {
    //     const link = document.createElement('link');
    //     link.rel = 'preload';
    //     link.as = 'font';
    //     link.href = `/fonts/${font}.woff2`;
    //     document.head.appendChild(link);
    // });
}

document.addEventListener('DOMContentLoaded', preloadResources);

// ===== PAGE UNLOAD WARNING (for forms) =====
/**
 * Warn user if they have unsaved form data
 */
let hasUnsavedChanges = false;

contactForm.addEventListener('input', () => {
    const values = [
        document.getElementById('name').value,
        document.getElementById('email').value,
        document.getElementById('message').value
    ];
    hasUnsavedChanges = values.some(v => v.trim() !== '');
});

window.addEventListener('beforeunload', (e) => {
    if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
    }
});

contactForm.addEventListener('submit', () => {
    hasUnsavedChanges = false;
});

// ===== INITIALIZATION =====
/**
 * Run all initializations when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio loaded successfully! 🚀');
    
    // Set initial aria labels for accessibility
    navToggle.setAttribute('aria-label', 'Toggle navigation menu');
    navToggle.setAttribute('aria-expanded', 'false');
    
    navMenu.setAttribute('aria-label', 'Main navigation');
});

// Update aria-expanded when menu state changes
navToggle.addEventListener('click', () => {
    const isExpanded = navMenu.classList.contains('active');
    navToggle.setAttribute('aria-expanded', isExpanded);
});
