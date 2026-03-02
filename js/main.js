/**
 * TARIK LAKSSIMI - Professional Website
 * Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initNavigation();
    initScrollEffects();
    initSmoothScroll();
    initRevealAnimations();
    initCookieBanner();
    initLanguageSelector();
});

/**
 * Navigation Module
 */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Active link highlighting
    function updateActiveLink() {
        const sections = document.querySelectorAll('section[id], header[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();
}

/**
 * Scroll Effects Module
 */
function initScrollEffects() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        // Add/remove scrolled class for navbar styling
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Optional: Hide/show navbar on scroll direction
        // Uncomment if you want this behavior
        /*
        if (currentScroll > lastScroll && currentScroll > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        */

        lastScroll = currentScroll;
    });
}

/**
 * Smooth Scroll Module
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Reveal Animations Module
 */
function initRevealAnimations() {
    const revealElements = document.querySelectorAll(
        '.section-header, .profil-text, .profil-highlights, .domaine-card, .publication-item, .contact-info, .contact-form'
    );

    // Add reveal class to elements
    revealElements.forEach(el => {
        el.classList.add('reveal');
    });

    // Intersection Observer for reveal animations
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: unobserve after revealing
                // revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Staggered animation for domaine cards
    const domaineCards = document.querySelectorAll('.domaine-card');
    domaineCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    // Staggered animation for publication items
    const publicationItems = document.querySelectorAll('.publication-item');
    publicationItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.05}s`;
    });
}

/**
 * Utility: Throttle function
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Utility: Debounce function
 */
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

/**
 * Cookie Banner RGPD
 */
function initCookieBanner() {
    const banner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('cookie-accept');
    const refuseBtn = document.getElementById('cookie-refuse');

    if (!banner) return;

    // Check if user already made a choice
    const cookieConsent = localStorage.getItem('cookie-consent');

    if (cookieConsent) {
        banner.classList.add('hidden');
        return;
    }

    // Accept cookies
    acceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookie-consent', 'accepted');
        banner.classList.add('hidden');
    });

    // Refuse cookies
    refuseBtn.addEventListener('click', () => {
        localStorage.setItem('cookie-consent', 'refused');
        banner.classList.add('hidden');
    });
}

/**
 * Language Selector Module
 */
function initLanguageSelector() {
    const langButtons = document.querySelectorAll('.lang-btn');

    if (langButtons.length === 0) {
        console.log('No language buttons found');
        return;
    }

    console.log('Language selector initialized with', langButtons.length, 'buttons');

    // Add click handlers to language buttons
    langButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.getAttribute('data-lang');
            console.log('Language button clicked:', lang);
            setLanguage(lang);
            localStorage.setItem('language', lang);
        });
    });

    // Get saved language or default to French
    const savedLang = localStorage.getItem('language') || 'fr';
    console.log('Applying saved language:', savedLang);
    setLanguage(savedLang);
}

/**
 * Set Language
 */
function setLanguage(lang) {
    console.log('setLanguage called with:', lang);

    // Check if translations exist
    if (typeof translations === 'undefined') {
        console.error('Translations object not found! Make sure translations.js is loaded before main.js');
        return;
    }

    if (!translations[lang]) {
        console.error('Translations not available for language:', lang);
        return;
    }

    const langData = translations[lang];
    let updatedCount = 0;

    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (langData[key]) {
            // Check if element should use innerHTML (for HTML content)
            if (el.getAttribute('data-i18n-html') === 'true') {
                el.innerHTML = langData[key];
            } else {
                el.textContent = langData[key];
            }
            updatedCount++;
        }
    });

    console.log('Updated', updatedCount, 'elements to', lang);

    // Update active button state
    document.querySelectorAll('.lang-btn').forEach(btn => {
        const isActive = btn.getAttribute('data-lang') === lang;
        btn.classList.toggle('active', isActive);
    });

    // Update HTML lang attribute
    document.documentElement.lang = lang;
}
