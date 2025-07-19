// Navigation and scroll management
class NavigationManager {
    constructor() {
        this.navbar = document.getElementById("navbar");
        this.mobileNav = document.querySelector(".mobile-nav");
        this.mobileMenu = document.querySelector(".mobile-menu");
        this.closeMenu = document.querySelector(".close-menu");
        this.backToTop = document.getElementById("back-to-top");
        this.lastScrollY = 0;
        
        this.init();
    }

    init() {
        this.setupScrollEffects();
        this.setupMobileMenu();
        this.setupSmoothScroll();
        this.setupActiveNavigation();
        this.setupBackToTop();
    }

    setupScrollEffects() {
        let ticking = false;

        window.addEventListener("scroll", () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    handleScroll() {
        const currentScrollY = window.scrollY;

        // Navbar background effect
        if (currentScrollY > 50) {
            this.navbar.classList.add("scrolled");
        } else {
            this.navbar.classList.remove("scrolled");
        }

        // Hide/show navbar on scroll
        if (currentScrollY > this.lastScrollY && currentScrollY > 100) {
            this.navbar.style.transform = "translateY(-100%)";
        } else {
            this.navbar.style.transform = "translateY(0)";
        }

        // Back to top button
        if (currentScrollY > 500) {
            this.backToTop.classList.add("visible");
        } else {
            this.backToTop.classList.remove("visible");
        }

        this.lastScrollY = currentScrollY;
    }

    setupMobileMenu() {
        this.mobileMenu.addEventListener("click", () => {
            this.openMobileMenu();
        });

        this.closeMenu.addEventListener("click", () => {
            this.closeMobileMenu();
        });

        // Close menu when clicking on links
        document.querySelectorAll(".mobile-nav-links a").forEach((link) => {
            link.addEventListener("click", () => {
                this.closeMobileMenu();
            });
        });

        // Close menu when clicking outside
        document.addEventListener("click", (e) => {
            if (this.mobileNav.classList.contains("active") && 
                !this.mobileNav.contains(e.target) && 
                !this.mobileMenu.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
    }

    openMobileMenu() {
        this.mobileNav.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    closeMobileMenu() {
        this.mobileNav.classList.remove("active");
        document.body.style.overflow = "auto";
    }

    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener("click", (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute("href"));
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: "smooth",
                    });
                }
            });
        });
    }

    setupActiveNavigation() {
        const sections = document.querySelectorAll("section");
        const navLinks = document.querySelectorAll(".nav-link");

        window.addEventListener("scroll", () => {
            let current = "";
            sections.forEach((section) => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute("id");
                }
            });

            navLinks.forEach((link) => {
                link.classList.remove("active");
                if (link.getAttribute("href").slice(1) === current) {
                    link.classList.add("active");
                }
            });
        });
    }

    setupBackToTop() {
        this.backToTop.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        });
    }
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new NavigationManager();
});