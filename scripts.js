// Navigation and Section Management
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Update active navigation link based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    }

    // Listen for scroll events
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Initialize active link on page load
    updateActiveNavLink();

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'var(--navbar-bg-scroll)';
            navbar.style.boxShadow = '0 4px 30px var(--shadow-medium)';
        } else {
            navbar.style.background = 'var(--navbar-bg)';
            navbar.style.boxShadow = '0 2px 20px var(--shadow-medium)';
        }
        
        // Update active nav link
        updateActiveNavLink();
    });

    // Counter Animation for Hero Stats
    function animateCounters() {
        const counters = document.querySelectorAll('.hero-stats .stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const increment = target / 50;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                counter.textContent = Math.floor(current);
            }, 40);
        });
    }

    // Start counter animation when page loads
    setTimeout(animateCounters, 1000);

    // Contact Form Handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message
            const form = e.target;
            const button = form.querySelector('button[type="submit"]');
            const originalText = button.innerHTML;
            
            button.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';
            button.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                button.innerHTML = '<i class="bi bi-check-circle-fill"></i> Message Sent!';
                button.classList.remove('btn-primary-custom');
                button.classList.add('btn-success');
                
                // Reset form after 3 seconds
                setTimeout(() => {
                    form.reset();
                    button.innerHTML = originalText;
                    button.classList.remove('btn-success');
                    button.classList.add('btn-primary-custom');
                    button.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

    // Animate skill proficiency bars
    const observerOptions = {
        threshold: 0.3
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate proficiency segments (new system)
                const toolCards = entry.target.querySelectorAll('.tool-card');
                toolCards.forEach((card, cardIndex) => {
                    const level = parseInt(card.getAttribute('data-level'));
                    const segments = card.querySelectorAll('.segment');
                    
                    // Animate segments based on level
                    segments.forEach((segment, segmentIndex) => {
                        setTimeout(() => {
                            if (segmentIndex < level) {
                                segment.classList.add('filled');
                            }
                        }, 200 + (cardIndex * 200) + (segmentIndex * 150));
                    });
                });

                // Legacy proficiency bars (for backward compatibility)
                const proficiencyBars = entry.target.querySelectorAll('.proficiency-fill');
                proficiencyBars.forEach((bar, index) => {
                    const width = bar.getAttribute('data-width') + '%';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 300 + (index * 100));
                });
            }
        });
    }, observerOptions);

    // Observe skills section
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        observer.observe(skillsSection);
    }

    // Add typing effect to hero title
    function typeWriter() {
        const text = "Data Analytics & Business Intelligence Professional";
        const speed = 100;
        let i = 0;
        const element = document.querySelector('.hero-subtitle');
        
        if (element && !element.style.color) {
            element.innerHTML = '';
            
            function type() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            }
            
            type();
        }
    }

    // Start typing effect when page loads
    setTimeout(typeWriter, 500);

    // Add dynamic glow effect to hero avatar
    function addHeroGlow() {
        const heroAvatar = document.querySelector('.hero-avatar');
        if (heroAvatar) {
            const glowColors = [
                '0 20px 40px rgba(49, 130, 206, 0.4), 0 0 60px rgba(49, 130, 206, 0.2)',
                '0 20px 40px rgba(99, 179, 237, 0.4), 0 0 60px rgba(99, 179, 237, 0.2)',
                '0 20px 40px rgba(44, 82, 130, 0.5), 0 0 60px rgba(44, 82, 130, 0.2)',
                '0 20px 40px rgba(56, 161, 105, 0.4), 0 0 60px rgba(56, 161, 105, 0.2)'
            ];
            
            let colorIndex = 0;
            setInterval(() => {
                heroAvatar.style.boxShadow = glowColors[colorIndex];
                colorIndex = (colorIndex + 1) % glowColors.length;
            }, 2500);
        }
    }



    // Initialize effects
    addHeroGlow();

    // Initialize tooltips if using Bootstrap tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Initialize Particles.js with MKBHD-style interaction
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 85,
                    density: {
                        enable: true,
                        value_area: 900
                    }
                },
                color: {
                    value: ["#3182ce", "#63b3ed", "#2c5282"]
                },
                shape: {
                    type: "circle",
                    stroke: {
                        width: 0,
                        color: "#000000"
                    }
                },
                opacity: {
                    value: 0.45,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 0.8,
                        opacity_min: 0.15,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.5,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 135,
                    color: "#3182ce",
                    opacity: 0.25,
                    width: 1.2
                },
                move: {
                    enable: true,
                    speed: 0.8, // Reduced speed for slower movement
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: false
                    },
                    onclick: {
                        enable: false
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 180,
                        line_linked: {
                            opacity: 0.6
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 6,
                        duration: 0.3,
                        opacity: 0.8,
                        speed: 3
                    },
                    repulse: {
                        distance: 120, // Distance at which particles are repulsed
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    } else {
        console.warn('Particles.js not loaded. Make sure to include the particles.js library.');
    }
});


