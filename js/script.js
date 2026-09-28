document.addEventListener('DOMContentLoaded', () => {

    // ================= 1. STICKY NAVBAR & BACK TO TOP =================
    const navbar = document.getElementById('navbar');
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ================= 2. MOBILE HAMBURGER MENU =================
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // ================= 3. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER) =================
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ================= 4. ANIMATED STAT COUNTERS =================
    const counters = document.querySelectorAll('.counter');
    let hasCounted = false;

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasCounted) {
                hasCounted = true;
                counters.forEach(counter => {
                    const updateCount = () => {
                        const target = +counter.getAttribute('data-target');
                        const count = +counter.innerText;
                        const speed = 2000; // 2 seconds total duration
                        const inc = target / (speed / 16); // 60fps

                        if (count < target) {
                            counter.innerText = Math.ceil(count + inc);
                            setTimeout(updateCount, 16);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    updateCount();
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats-grid');
    if (statsSection) counterObserver.observe(statsSection);

    // ================= 5. TESTIMONIAL SLIDER =================
    const slider = document.getElementById('testimonialSlider');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (slider && prevBtn && nextBtn) {
        let currentIndex = 0;
        const cards = slider.querySelectorAll('.testimonial-card');
        const totalCards = cards.length;

        const updateSlider = () => {
            slider.style.transform = `translateX(-${currentIndex * 100}%)`;
        };

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalCards;
            updateSlider();
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalCards) % totalCards;
            updateSlider();
        });
    }

    // ================= 6. APPOINTMENT FORM VALIDATION =================
    const form = document.getElementById('appointmentForm');
    const formSuccess = document.getElementById('formSuccess');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            // Validate Name
            const name = document.getElementById('name');
            if (name.value.trim() === '') {
                setError(name, 'Please enter your name');
                isValid = false;
            } else {
                removeError(name);
            }

            // Validate Phone (basic regex for 10+ digits)
            const phone = document.getElementById('phone');
            const phoneRegex = /^[\d\s\+\-\(\)]{10,}$/;
            if (!phoneRegex.test(phone.value.trim())) {
                setError(phone, 'Please enter a valid phone number');
                isValid = false;
            } else {
                removeError(phone);
            }

            // Validate Email
            const email = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value.trim())) {
                setError(email, 'Please enter a valid email address');
                isValid = false;
            } else {
                removeError(email);
            }

            if (isValid) {
                // Simulate form submission
                formSuccess.style.display = 'block';
                form.reset();
                setTimeout(() => {
                    formSuccess.style.display = 'none';
                }, 5000);
            }
        });

        const setError = (element, message) => {
            const formGroup = element.parentElement;
            formGroup.classList.add('error');
            const errorMsg = formGroup.querySelector('.error-msg');
            if (errorMsg) errorMsg.innerText = message;
        };

        const removeError = (element) => {
            const formGroup = element.parentElement;
            formGroup.classList.remove('error');
        };

        // Real-time validation clearing
        form.querySelectorAll('input, select, textarea').forEach(input => {
            input.addEventListener('input', () => {
                if (input.parentElement.classList.contains('error')) {
                    removeError(input);
                }
            });
        });
    }

    // ================= 7. DYNAMIC FOOTER YEAR =================
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.innerText = new Date().getFullYear();
    }

    // ================= 8. ACTIVE NAV LINK ON SCROLL =================
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
});