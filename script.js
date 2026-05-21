document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-list a, .hero__actions a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Get the height of the fixed header to offset scroll position
                    const headerOffset = document.querySelector('.main-header').offsetHeight;
                    const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - headerOffset - 20; // -20 for a little extra padding

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Highlight active navigation link based on scroll position
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-list a');
    const header = document.querySelector('.main-header');

    window.addEventListener('scroll', () => {
        let current = '';
        const headerHeight = header.offsetHeight; // Get dynamic header height

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 50; // Adjust for header and some padding
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });

        // Add sticky class to header if scrolled
        if (window.pageYOffset > 0) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Add sticky class immediately if page is loaded already scrolled
    if (window.pageYOffset > 0) {
        document.querySelector('.main-header').classList.add('sticky');
    }

    // Optional: Simple Fade-in/Scroll-Reveal Effect (using Intersection Observer)
    const fadeElements = document.querySelectorAll('.hero-container, .about-content, .service-card, .project-item, .testimonial-card, .contact-info, .social-links, .section-title');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of element visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        el.classList.add('fade-in-hidden'); // Add initial hidden state
        observer.observe(el);
    });
});