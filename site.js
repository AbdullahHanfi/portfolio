// Loading Screen
window.addEventListener("load", () => {
  setTimeout(() => {
    document.querySelector(".loader-wrapper").style.opacity = "0";
    document.querySelector(".loader-wrapper").style.visibility = "hidden";
  }, 1000);
});

// Firebase and Analytics Configuration
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
  trackVisitorActions();
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

// Enhanced Interactive Features
document.addEventListener("DOMContentLoaded", () => {
  // Add enhanced hover effects to project cards
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Add progressive enhancement for supported features
  if ('IntersectionObserver' in window) {
    // Enhanced scroll animations are handled by animations.js
    console.log('Enhanced animations enabled');
  }
  
  if ('serviceWorker' in navigator) {
    // Future: Add service worker for offline functionality
    console.log('Service Worker support detected');
  }
});