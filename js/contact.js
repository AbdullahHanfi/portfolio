// Contact form and notification management
class ContactManager {
    constructor() {
        this.form = document.getElementById("contact-form");
        this.submitBtn = this.form.querySelector('button[type="submit"]');
        this.originalBtnText = this.submitBtn.textContent;
        
        this.init();
    }

    init() {
        this.setupForm();
        this.setupEmailJS();
    }

    setupForm() {
        this.form.addEventListener("submit", (e) => {
            e.preventDefault();
            this.handleSubmit(e);
        });

        // Add real-time validation
        this.form.querySelectorAll('input, textarea').forEach(field => {
            field.addEventListener('blur', () => this.validateField(field));
            field.addEventListener('input', () => this.clearFieldError(field));
        });
    }

    setupEmailJS() {
        // Initialize EmailJS
        if (typeof emailjs !== 'undefined') {
            emailjs.init("QYKvBzTvSUQIFgToe");
        }
    }

    async handleSubmit(e) {
        if (!this.validateForm()) {
            return;
        }

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        
        this.setSubmitState(true);
        
        try {
            await this.sendEmail(data);
            this.showNotification("Thank you for your message! I will get back to you soon.", "success");
            this.form.reset();
        } catch (error) {
            this.showNotification(
                "Oops! Something went wrong while sending your message. Please try again or email me directly at abdullah.hanfi@protonmail.com",
                "error"
            );
        } finally {
            this.setSubmitState(false);
        }
    }

    async sendEmail(data) {
        if (typeof emailjs === 'undefined') {
            throw new Error('EmailJS not loaded');
        }

        return await emailjs.send("service_934nst4", "template_vejgz36", {
            name: data.name,
            from_email: data.email,
            subject: data.subject,
            message: data.message,
        });
    }

    validateForm() {
        const fields = this.form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;

        fields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Remove existing error
        this.clearFieldError(field);

        if (!value) {
            errorMessage = 'This field is required';
            isValid = false;
        } else if (field.type === 'email' && !this.isValidEmail(value)) {
            errorMessage = 'Please enter a valid email address';
            isValid = false;
        } else if (field.name === 'name' && value.length < 2) {
            errorMessage = 'Name must be at least 2 characters';
            isValid = false;
        } else if (field.name === 'message' && value.length < 10) {
            errorMessage = 'Message must be at least 10 characters';
            isValid = false;
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showFieldError(field, message) {
        field.classList.add('error');
        
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        
        field.parentNode.appendChild(errorElement);
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    setSubmitState(isSubmitting) {
        if (isSubmitting) {
            this.submitBtn.textContent = "Sending...";
            this.submitBtn.disabled = true;
            this.submitBtn.style.opacity = "0.7";
        } else {
            this.submitBtn.textContent = this.originalBtnText;
            this.submitBtn.disabled = false;
            this.submitBtn.style.opacity = "1";
        }
    }

    showNotification(message, type = "success") {
        const notification = document.createElement("div");
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            this.removeNotification(notification);
        }, 5000);

        // Manual close
        notification.querySelector('.notification-close').addEventListener('click', () => {
            this.removeNotification(notification);
        });

        // Trigger animation
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
    }

    removeNotification(notification) {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }
}

// Initialize contact manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ContactManager();
});