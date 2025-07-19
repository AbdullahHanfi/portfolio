// Animation utilities and effects
class AnimationManager {
    constructor() {
        this.initScrollAnimations();
        this.initMagneticEffects();
        this.initParticles();
        this.initTypingEffect();
    }

    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -100px 0px",
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");

                    // Animate skill progress bars
                    if (entry.target.classList.contains("skill-progress")) {
                        const width = entry.target.getAttribute("data-width");
                        entry.target.style.width = width + "%";
                    }

                    // Animate counters
                    if (entry.target.classList.contains("counter")) {
                        this.animateCounter(entry.target);
                    }
                }
            });
        }, observerOptions);

        document.querySelectorAll(
            ".fade-in, .fade-in-left, .fade-in-right, .scale-in, .skill-progress, .counter"
        ).forEach((el) => {
            observer.observe(el);
        });
    }

    initMagneticEffects() {
        document.querySelectorAll(".btn, .social-links a, .project-card").forEach((element) => {
            element.addEventListener("mousemove", (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                const intensity = element.classList.contains("project-card") ? 0.1 : 0.3;
                element.style.transform = `translate(${x * intensity}px, ${y * intensity}px)`;
            });

            element.addEventListener("mouseleave", () => {
                element.style.transform = "translate(0, 0)";
            });
        });
    }

    initParticles() {
        const particlesContainer = document.getElementById("particles");
        if (!particlesContainer) return;

        const particleCount = window.innerWidth < 768 ? 30 : 50;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement("div");
            particle.className = "particle";
            particle.style.left = Math.random() * 100 + "%";
            particle.style.animationDelay = Math.random() * 20 + "s";
            particle.style.animationDuration = Math.random() * 20 + 10 + "s";
            particlesContainer.appendChild(particle);
        }
    }

    initTypingEffect() {
        const typedTextElement = document.getElementById("typed-text");
        if (!typedTextElement) return;

        const textArray = [
            "I develop scalable applications",
            "I solve complex problems with competitive programming background",
            "I build amazing web experiences",
            "I turn ideas into reality",
        ];

        let textArrayIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const type = () => {
            const currentText = textArray[textArrayIndex];

            if (isDeleting) {
                typedTextElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typedTextElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textArrayIndex = (textArrayIndex + 1) % textArray.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        };

        type();
    }

    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const start = 0;
        let startTime = null;

        const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const current = Math.floor(progress * target);
            element.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }

    // Smooth reveal animation for elements
    revealElement(element, delay = 0) {
        setTimeout(() => {
            element.classList.add('reveal');
        }, delay);
    }

    // Stagger animation for multiple elements
    staggerReveal(elements, staggerDelay = 100) {
        elements.forEach((element, index) => {
            this.revealElement(element, index * staggerDelay);
        });
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AnimationManager();
});