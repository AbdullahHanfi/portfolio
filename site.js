// Loading Screen
window.addEventListener("load", () => {
  setTimeout(() => {
    document.querySelector(".loader-wrapper").style.opacity = "0";
    document.querySelector(".loader-wrapper").style.visibility = "hidden";
  }, 1000);
});

// Typing Effect
const typedTextElement = document.getElementById("typed-text");
const textArray = [
  "I develop scalable applications",
  "I like solving problems with background of competitive programming",
  "I build amazing web experiences",
  "I turn ideas into reality",
];
let textArrayIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
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
}

type();

// Particles Background
function createParticles() {
  const particlesContainer = document.getElementById("particles");
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 20 + "s";
    particle.style.animationDuration = Math.random() * 20 + 10 + "s";
    particlesContainer.appendChild(particle);
  }
}

createParticles();

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");

      // Animate skill bars
      if (entry.target.classList.contains("skill-progress")) {
        const width = entry.target.getAttribute("data-width");
        entry.target.style.width = width + "%";
      }
    }
  });
}, observerOptions);

document
  .querySelectorAll(
    ".fade-in, .fade-in-left, .fade-in-right, .scale-in, .skill-progress"
  )
  .forEach((el) => {
    observer.observe(el);
  });

// Navbar scroll effect
let lastScrollY = 0;
window.addEventListener("scroll", function () {
  const navbar = document.getElementById("navbar");
  const currentScrollY = window.scrollY;

  if (currentScrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // Hide/show navbar on scroll
  if (currentScrollY > lastScrollY && currentScrollY > 100) {
    navbar.style.transform = "translateY(-100%)";
  } else {
    navbar.style.transform = "translateY(0)";
  }

  lastScrollY = currentScrollY;

  // Show/hide back to top button
  const backToTop = document.getElementById("back-to-top");
  if (currentScrollY > 500) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }
});

// Active navigation link
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
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

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Mobile menu toggle
const mobileMenu = document.querySelector(".mobile-menu");
const mobileNav = document.querySelector(".mobile-nav");
const closeMenu = document.querySelector(".close-menu");
const mobileNavLinks = document.querySelectorAll(".mobile-nav-links a");

mobileMenu.addEventListener("click", () => {
  mobileNav.classList.add("active");
  document.body.style.overflow = "hidden";
});

closeMenu.addEventListener("click", () => {
  mobileNav.classList.remove("active");
  document.body.style.overflow = "auto";
});

mobileNavLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("active");
    document.body.style.overflow = "auto";
  });
});

// Theme toggle
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle.querySelector("i");
const savedTheme = localStorage.getItem("theme") || "light";

if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
  themeIcon.classList.remove("fa-moon");
  themeIcon.classList.add("fa-sun");
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");

  if (isDark) {
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
    localStorage.setItem("theme", "dark");
  } else {
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
    localStorage.setItem("theme", "light");
  }
});

// Back to top
document.getElementById("back-to-top").addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

const fBC = {
  apiKey: "AIzaSyCfLo5BBejy8dzDhmDuCsN39mqIKIo4LGU",
  authDomain: "portfolio-b721f.firebaseapp.com",
  projectId: "portfolio-b721f",
  storageBucket: "portfolio-b721f.firebasestorage.app",
  messagingSenderId: "901284611635",
  appId: "1:901284611635:web:4b9c81241f510f0ffc8546",
  measurementId: "G-LKFMTY06DC",
};

firebase.initializeApp(fBC);
const db = firebase.firestore();

async function getVisitorInfo() {
  const res = await fetch("https://ipapi.co/json/");
  const data = await res.json();

  let visitorId = localStorage.getItem("visitorId");
  if (!visitorId) {
    visitorId = data.ip.replace(/\./g, "");
    localStorage.setItem("visitorId", visitorId);
  }

  const visitorInfo = {
    location: {
      ip: data.ip,
      city: data.city,
      region: data.region,
      country: data.country_name,
      countryCode: data.country_code,
      timezone: data.timezone,
      org: data.org,
    },
    device: {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      screenResolution: `${screen.width}x${screen.height}`,
      colorDepth: screen.colorDepth,
      pixelRatio: window.devicePixelRatio,
      touchSupport: "ontouchstart" in window,
      cookiesEnabled: navigator.cookieEnabled,
      onlineStatus: navigator.onLine,
    },
    session: {
      referrer: document.referrer || "Direct",
      currentPage: window.location.href,
      visitTime: new Date().toISOString(),
      localTime: new Date().toLocaleString(),
    },
  };

  const personDoc = db.collection("visitors").doc(visitorId);

  await personDoc.set(
    {
      Visit: firebase.firestore.FieldValue.serverTimestamp(),
      visitCount: firebase.firestore.FieldValue.increment(1),
      lastLocation: visitorInfo.location,
    },
    { merge: true }
  );

  await personDoc.collection("visits").add(visitorInfo);
}

// Initialize tracking when page loads
window.addEventListener("load", () => {
  getVisitorInfo();
});

// Track visitor actions
function trackVisitorActions() {
  // Track clicks
  document.addEventListener("click", (e) => {
    if (e.target.tagName === "A" || e.target.closest("a")) {
      const linkText =
        e.target.textContent || e.target.closest("a").textContent;
      console.log(`🖱️ Clicked: ${linkText.trim()}`);
    }
  });

  // Track scroll depth
  let maxScroll = 0;
  window.addEventListener("scroll", () => {
    const scrollPercentage = Math.round(
      (window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight)) *
        100
    );
    if (scrollPercentage > maxScroll) {
      maxScroll = scrollPercentage;
      if (scrollPercentage % 25 === 0) {
        console.log(`📜 Scrolled to: ${scrollPercentage}%`);
      }
    }
  });

  // Track time on page
  let startTime = Date.now();
  window.addEventListener("beforeunload", () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    console.log(`⏱️ Time spent on page: ${timeSpent} seconds`);
  });

  // Track visibility changes
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      console.log("👋 Tab became inactive");
    } else {
      console.log("👀 Tab became active");
    }
  });

  // Track mouse movement heatmap (sample points)
  let mouseMovements = [];
  let lastRecordTime = 0;

  document.addEventListener("mousemove", (e) => {
    const currentTime = Date.now();
    if (currentTime - lastRecordTime > 100) {
      // Record every 100ms
      mouseMovements.push({
        x: e.clientX,
        y: e.clientY,
        time: currentTime,
      });
      lastRecordTime = currentTime;

      // Keep only last 100 movements
      if (mouseMovements.length > 100) {
        mouseMovements.shift();
      }
    }
  });

  // Track form interactions
  const formInputs = document.querySelectorAll("input, textarea");
  formInputs.forEach((input) => {
    input.addEventListener("focus", () => {
      console.log(
        `📝 Focused on: ${input.name || input.id || "unnamed field"}`
      );
    });
  });
}

// Add some interactive animations
document.addEventListener("DOMContentLoaded", () => {
  // Animate numbers on scroll
  const animateValue = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      element.textContent = Math.floor(progress * (end - start) + start) + "%";
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };

  // Animate skill percentages when they come into view
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const percentage = entry.target.textContent.replace("%", "");
          animateValue(entry.target, 0, parseInt(percentage), 1000);
          skillObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll(".skill-percentage").forEach((el) => {
    skillObserver.observe(el);
  });
});

// Add magnetic effect to buttons
document.querySelectorAll(".btn, .social-links a").forEach((btn) => {
  btn.addEventListener("mousemove", (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "translate(0, 0)";
  });
});

// Easter egg: Konami code
const konamiCode = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];
let konamiIndex = 0;

document.addEventListener("keydown", (e) => {
  if (e.key === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      activateEasterEgg();
      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0;
  }
});

function activateEasterEgg() {
  console.log("🎉 Konami Code Activated!");
  document.body.style.animation = "rainbow 3s linear infinite";

  const style = document.createElement("style");
  style.textContent = `
                @keyframes rainbow {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
            `;
  document.head.appendChild(style);

  setTimeout(() => {
    document.body.style.animation = "";
    style.remove();
  }, 5000);
}

// Lazy loading for images
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src || img.src;
      img.classList.add("loaded");
      observer.unobserve(img);
    }
  });
});

document.querySelectorAll("img").forEach((img) => {
  imageObserver.observe(img);
});

// Add notification for form submission
function showNotification(message, type = "success") {
  const notification = document.createElement("div");
  notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 20px 30px;
                background: ${
                  type === "success"
                    ? "var(--success-color)"
                    : "var(--warning-color)"
                };
                color: white;
                border-radius: 10px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                z-index: 10000;
                animation: slideIn 0.3s ease;
            `;
  notification.textContent = message;

  const style = document.createElement("style");
  style.textContent = `
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
            `;
  document.head.appendChild(style);
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease";
    notification.style.animationFillMode = "forwards";
    setTimeout(() => {
      notification.remove();
      style.remove();
    }, 300);
  }, 3000);
}

// Enhanced form submission with notification
document.getElementById("contact-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);
  const btn = document.querySelector('button[type="submit"]');
  btn.textContent = "Sending...";
  sendMail(data.name, data.email, data.subject, data.message);
  e.target.reset();
});

async function sendMail(name, email, subject, message) {
  try {
    emailjs.init("QYKvBzTvSUQIFgToe");
    const response = await emailjs.send("service_934nst4", "template_vejgz36", {
      name: name,
      from_email: email,
      subject: subject,
      message: message,
    });
    showNotification(
      "Thank you for your message! I will get back to you soon."
    );
  } catch (error) {
    showNotification(
      `Oops! Something went wrong while sending your message. 
        Please try again or email us directly at abdullah.hanfi@protonmail.com`
    );
  }
}
