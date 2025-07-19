// Theme management
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById("theme-toggle");
        this.themeIcon = this.themeToggle.querySelector("i");
        this.currentTheme = localStorage.getItem("theme") || "light";
        
        this.init();
    }

    init() {
        this.applyTheme(this.currentTheme);
        this.setupToggle();
    }

    applyTheme(theme) {
        if (theme === "dark") {
            document.body.classList.add("dark-mode");
            this.themeIcon.classList.remove("fa-moon");
            this.themeIcon.classList.add("fa-sun");
        } else {
            document.body.classList.remove("dark-mode");
            this.themeIcon.classList.remove("fa-sun");
            this.themeIcon.classList.add("fa-moon");
        }
        
        localStorage.setItem("theme", theme);
        this.currentTheme = theme;
    }

    setupToggle() {
        this.themeToggle.addEventListener("click", () => {
            const newTheme = this.currentTheme === "dark" ? "light" : "dark";
            this.applyTheme(newTheme);
            
            // Add rotation animation
            this.themeToggle.style.transform = "rotate(360deg)";
            setTimeout(() => {
                this.themeToggle.style.transform = "";
            }, 300);
        });
    }

    // Method to programmatically change theme
    setTheme(theme) {
        if (theme === "dark" || theme === "light") {
            this.applyTheme(theme);
        }
    }

    // Get current theme
    getTheme() {
        return this.currentTheme;
    }
}

// Initialize theme manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.themeManager = new ThemeManager();
});