// EmailJS Initialization
(function () {
    emailjs.init("XlFoEFbUUr2clNY0I"); // Replace with your EmailJS Public Key
})();

// Enhanced Send Email Function
function sendEmail(event) {
    event.preventDefault();

    const serviceID = "service_q3a9wju"; // Replace with your EmailJS Service ID
    const templateID = "template_ui3tftu"; // Replace with your EmailJS Template ID
    const submitButton = document.querySelector('.contact-form button');
    const formMessage = document.getElementById('form-message');

    // Input Validation
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
        displayErrorMessage("Please fill all fields");
        return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
        displayErrorMessage("Please enter a valid email");
        return;
    }

    // Disable button and show loading state
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    gsap.to(submitButton, {
        opacity: 0.7,
        duration: 0.3
    });

    const templateParams = { name, email, message };

    emailjs.send(serviceID, templateID, templateParams)
        .then(response => {
            displaySuccessMessage();
            document.querySelector(".contact-form").reset();
        })
        .catch(error => {
            displayErrorMessage("Failed to send message. Please try again!");
            console.error("EmailJS Error:", error);
        })
        .finally(() => {
            // Reset button state
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
            gsap.to(submitButton, {
                opacity: 1,
                duration: 0.3
            });
        });
}

// Display Success Message with Lottie
function displaySuccessMessage() {
    // Remove any existing overlay
    const existingOverlay = document.querySelector('.success-overlay');
    if (existingOverlay) {
        existingOverlay.remove();
    }

    // Create full-screen overlay
    const overlay = document.createElement('div');
    overlay.className = 'success-overlay';
    overlay.innerHTML = `
        <div class="success-content">
            <dotlottie-player
                src="https://lottie.host/7c8f1646-178a-49dc-a0c0-1d32d8a1a856/DwPTMCMVkw.lottie"
                background="transparent"
                speed="1.2"
                style="width: 300px; height: 300px;"
                loop
                autoplay
            ></dotlottie-player>
            <h2>Message Sent Successfully!</h2>
        </div>
    `;
    document.body.appendChild(overlay);

    // Prevent scrolling while overlay is active
    document.body.style.overflow = 'hidden';

    // Get the Lottie player instance
    const lottiePlayer = overlay.querySelector('dotlottie-player');
    
    // Wait for Lottie to load
    lottiePlayer.addEventListener('ready', () => {
        // Get the total duration of the animation
        const totalDuration = lottiePlayer.getDuration();
        
        // Set a timeout to close the overlay after the animation completes
        // Add minimal extra time to ensure the animation is visible
        setTimeout(() => {
            closeOverlay(overlay);
        }, (totalDuration * 1000) + 500); // Add just 0.5 seconds extra time
    });

    // Add click event to close overlay
    overlay.addEventListener('click', () => {
        closeOverlay(overlay);
    });

    // Add keyboard event to close overlay with Escape key
    document.addEventListener('keydown', function closeOnEscape(e) {
        if (e.key === 'Escape') {
            closeOverlay(overlay);
            document.removeEventListener('keydown', closeOnEscape);
        }
    });

    // Function to close overlay with animation
    function closeOverlay(overlay) {
        overlay.style.animation = 'fadeOut 0.3s ease forwards';
        setTimeout(() => {
            document.body.style.overflow = '';
            overlay.remove();
            // Reset form after overlay is removed
            document.querySelector(".contact-form").reset();
        }, 300);
    }

    // Add GSAP animation for extra smoothness
    gsap.from(overlay.querySelector('.success-content'), {
        scale: 0.9,
        opacity: 0,
        duration: 0.4,
        ease: "back.out(1.7)"
    });
}

// Display Error Message
function displayErrorMessage(message) {
    const formMessage = document.getElementById('form-message');
    formMessage.innerHTML = `
        <div class="message-container error">
            <p>${message}</p>
        </div>
    `;
    setTimeout(() => formMessage.innerHTML = '', 5000);
}

// GSAP Initialization
gsap.registerPlugin(ScrollTrigger);

// Theme Toggle Functionality
function initializeThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.textContent = '🌙';
    themeToggle.className = 'theme-toggle';
    document.body.appendChild(themeToggle);

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        themeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
        localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    });

    // Load saved theme preference
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
    }
}

// Animation Setup
function initializeAnimations() {
    // Splash Screen Animation
    const splashScreen = document.getElementById("splash-screen");
    const hLetter = document.querySelector(".h-letter");

    gsap.from(hLetter, {
        scale: 0,
        opacity: 0,
        duration: 1.5,
        ease: "elastic.out(1, 0.3)",
    });

    gsap.to(splashScreen, {
        opacity: 0,
        duration: 1,
        delay: 2,
        ease: "power2.in",
        onComplete: () => {
            splashScreen.style.display = "none";
            document.getElementById("main-content").style.display = "block";
            gsap.from("#main-content > *", {
                opacity: 0,
                y: 20,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out"
            });
        }
    });

    // Section Animations
    gsap.from(".header", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".header",
            start: "top 90%",
        }
    });

    gsap.utils.toArray('.section').forEach((section) => {
        gsap.from(section.children, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
            }
        });
    });
}

// Navigation Highlighting
function initializeNavHighlight() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY + 100;
        
        document.querySelectorAll('.section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Smooth scrolling for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            target.scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// Modal Functionality
function initializeModal() {
    const modal = document.getElementById('certModal');
    const modalImg = document.getElementById('fullCertImg');

    window.openModal = (imgSrc) => {
        modalImg.src = imgSrc;
        gsap.fromTo(modal, 
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)", display: 'flex' }
        );
    };

    window.closeModal = () => {
        gsap.to(modal, {
            scale: 0,
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => modal.style.display = 'none'
        });
    };

    // Close modal on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Close with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') closeModal();
    });
}

// Add scroll progress indicator
function initializeScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = `${progress}%`;
    });
}

// Enhanced card interactions
function initializeCardInteractions() {
    const cards = document.querySelectorAll('.detail-card, .skill-card, .certification-card, .project-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}

// Enhanced form interactions
function initializeFormInteractions() {
    const inputs = document.querySelectorAll('.input-group input, .input-group textarea');
    
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });
}

// Enhanced navigation interactions
function initializeNavInteractions() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            gsap.to(link, {
                y: -2,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        link.addEventListener('mouseleave', () => {
            gsap.to(link, {
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
}

// Enhanced button interactions
function initializeButtonInteractions() {
    const buttons = document.querySelectorAll('.view-btn, .contact-form button');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
}

// About Section Animations
function initializeAboutAnimations() {
    // Animate cards on scroll
    gsap.utils.toArray('.about-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top bottom-=100",
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.2
        });
    });

    // Animate project tags on hover
    document.querySelectorAll('.project-tag').forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            gsap.to(tag, {
                scale: 1.02,
                duration: 0.3
            });
        });

        tag.addEventListener('mouseleave', () => {
            gsap.to(tag, {
                scale: 1,
                duration: 0.3
            });
        });
    });
}

// Scroll to contact section
function scrollToContact() {
    document.getElementById('contact').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

// Copy phone number functionality
function copyPhoneNumber() {
    const phone = '+91 9842584621';
    if (navigator.clipboard) {
        navigator.clipboard.writeText(phone).then(() => {
            showCopyFeedback();
        });
    } else {
        // fallback for older browsers
        const tempInput = document.createElement('input');
        tempInput.value = phone;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        showCopyFeedback();
    }
}

function showCopyFeedback() {
    const phoneElem = document.getElementById('phone-number');
    const original = phoneElem.textContent;
    phoneElem.textContent = 'Copied!';
    setTimeout(() => { phoneElem.textContent = original; }, 1200);
}

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
    // Initialize About Swiper
    const aboutSwiper = new Swiper('.about-swiper', {
        effect: 'cards',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        cardsEffect: {
            perSlideOffset: 8,
            perSlideRotate: 2,
            rotate: true,
            slideShadows: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        loop: true,
    });

    // Initialize Skills Swiper
    const skillsSwiper = new Swiper('.skills-swiper', {
        effect: 'flip',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        flipEffect: {
            slideShadows: true,
            limitRotation: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        loop: true,
    });

    // Initialize Certifications Swiper
    const certificationsSwiper = new Swiper('.certifications-swiper', {
        direction: 'horizontal',
        loop: true,
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        spaceBetween: 30,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 20
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 30
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 40
            }
        }
    });

    // Initialize Projects Swiper (existing code)
    const projectSwiper = new Swiper('.project-swiper', {
        direction: 'horizontal',
        loop: true,
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 20
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 30
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 40
            }
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
    });

    // Add keyboard navigation for all swipers
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            aboutSwiper.slidePrev();
            skillsSwiper.slidePrev();
            certificationsSwiper.slidePrev();
            projectSwiper.slidePrev();
        }
        if (e.key === 'ArrowRight') {
            aboutSwiper.slideNext();
            skillsSwiper.slideNext();
            certificationsSwiper.slideNext();
            projectSwiper.slideNext();
        }
    });

    initializeThemeToggle();
    initializeAnimations();
    initializeNavHighlight();
    initializeModal();
    
    // Lazy loading for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.setAttribute('loading', 'lazy');
    });

    // Touch support for phone number copy
    const phoneElem = document.getElementById('phone-number');
    if (phoneElem) {
        phoneElem.addEventListener('touchstart', function (e) {
            copyPhoneNumber();
            e.stopPropagation();
        });
    }

    // Touch support for LinkedIn and Github links
    const linkSelectors = [
        'a[href^="https://www.linkedin.com/in/harshanth0112h/"]',
        'a[href^="https://github.com/harshanth-hash"]'
    ];
    linkSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(link => {
            link.addEventListener('touchstart', function (e) {
                window.open(link.href, '_blank');
                e.stopPropagation();
            });
        });
    });

    // Make entire LinkedIn and Github card touch/clickable
    document.querySelectorAll('.detail-card[data-link]').forEach(card => {
        const url = card.getAttribute('data-link');
        card.addEventListener('touchstart', function (e) {
            window.open(url, '_blank');
        });
        card.addEventListener('click', function (e) {
            // Prevent double open if link is clicked directly
            if (e.target.tagName.toLowerCase() !== 'a') {
                window.open(url, '_blank');
            }
        });
    });

    document.getElementById('linkedin-card').addEventListener('click', function() {
        window.open('https://www.linkedin.com/in/harshanth0112h/', '_blank');
    });
    document.getElementById('github-card').addEventListener('click', function() {
        window.open('https://github.com/harshanth-hash', '_blank');
    });

    document.getElementById('email-card').addEventListener('click', function() {
        window.open('mailto:harshanth.ai22@krct.ac.in', '_self');
    });
    
    initializeScrollProgress();
    initializeCardInteractions();
    initializeFormInteractions();
    initializeNavInteractions();
    initializeButtonInteractions();
    
    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: target,
                        offsetY: 70
                    },
                    ease: "power2.inOut"
                });
            }
        });
    });

    initializeAboutAnimations();

    // Hamburger menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    if (navToggle && navMenu) {
        navToggle.setAttribute('aria-controls', 'main-nav-menu');
        navMenu.setAttribute('id', 'main-nav-menu');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.addEventListener('click', (e) => {
            const isOpen = navMenu.classList.toggle('open');
            navToggle.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
        // Close menu and smooth scroll to section on nav link click (mobile)
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    // If mobile, close menu first
                    if (window.innerWidth <= 768) {
                        navMenu.classList.remove('open');
                        navToggle.classList.remove('open');
                        navToggle.setAttribute('aria-expanded', 'false');
                        setTimeout(() => {
                            const target = document.querySelector(href);
                            if (target) {
                                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                        }, 120);
                    } else {
                        // On desktop/full size, just smooth scroll
                        const target = document.querySelector(href);
                        if (target) {
                            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    }
                }
            });
        });
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navMenu.classList.remove('open');
                navToggle.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
});
