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
                // Animate proficiency bars
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
        const text = "Business Data Analyst";
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

    // Add dynamic particle bursts
    function createParticleBurst() {
        setInterval(() => {
            const burst = document.createElement('div');
            burst.style.position = 'fixed';
            burst.style.left = Math.random() * 100 + '%';
            burst.style.top = Math.random() * 100 + '%';
            burst.style.width = '3px';
            burst.style.height = '3px';
            burst.style.background = `hsl(${Math.random() * 60 + 200}, 70%, 60%)`;
            burst.style.borderRadius = '50%';
            burst.style.pointerEvents = 'none';
            burst.style.zIndex = '1';
            burst.style.animation = 'burstFade 1.5s ease-out forwards';
            burst.style.boxShadow = `0 0 10px currentColor`;
            
            document.body.appendChild(burst);
            
            setTimeout(() => {
                burst.remove();
            }, 1500);
        }, 2000);
    }

    // Add burst animation
    const burstStyle = document.createElement('style');
    burstStyle.textContent = `
        @keyframes burstFade {
            0% {
                transform: scale(0) rotate(0deg);
                opacity: 1;
            }
            50% {
                transform: scale(4) rotate(180deg);
                opacity: 0.8;
            }
            100% {
                transform: scale(0) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(burstStyle);

    // Initialize effects
    addHeroGlow();
    setTimeout(createParticleBurst, 2000);

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
                    value: 60,
                    density: {
                        enable: true,
                        value_area: 1000
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
                    value: 0.4,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 0.8,
                        opacity_min: 0.1,
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
                    distance: 120,
                    color: "#3182ce",
                    opacity: 0.2,
                    width: 1
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
                        enable: true,
                        mode: "repulse" // MKBHD-style repulsion effect
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.5
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

// Add custom cursor effect for additional interactivity
document.addEventListener('mousemove', function(e) {
    // Create cursor trail effect
    if (Math.random() < 0.1) { // Only create trail 10% of the time for performance
        const trail = document.createElement('div');
        trail.style.position = 'fixed';
        trail.style.left = e.clientX + 'px';
        trail.style.top = e.clientY + 'px';
        trail.style.width = '4px';
        trail.style.height = '4px';
        trail.style.background = '#63b3ed';
        trail.style.borderRadius = '50%';
        trail.style.pointerEvents = 'none';
        trail.style.zIndex = '999';
        trail.style.opacity = '0.6';
        trail.style.animation = 'cursorTrail 0.8s ease-out forwards';
        
        document.body.appendChild(trail);
        
        setTimeout(() => {
            trail.remove();
        }, 800);
    }
});

// Add cursor trail animation
const trailStyle = document.createElement('style');
trailStyle.textContent = `
    @keyframes cursorTrail {
        0% {
            transform: scale(1);
            opacity: 0.6;
        }
        100% {
            transform: scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(trailStyle);
