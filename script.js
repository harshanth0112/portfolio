/* ═══════════════════════════════════════════════════════
   HARSHANTH R — PORTFOLIO SCRIPT
   EmailJS · GSAP splash · Cursor · Scroll · Counters · Modal
═══════════════════════════════════════════════════════ */

/* ── EMAIL JS INIT ──────────────────────────────────── */
const EMAILJS_PUBLIC_KEY = "XlFoEFbUUr2clNY0I";
(function () {
  emailjs.init(EMAILJS_PUBLIC_KEY);
})();

/* ═══════════════════════════════════════════════════════
   CUSTOM CURSOR
═══════════════════════════════════════════════════════ */
(function initCursor() {
  const cursor = document.getElementById("cursor");
  const ring   = document.getElementById("cursor-ring");
  if (!cursor || !ring) return;

  let mx = 0, my = 0;   // mouse position
  let rx = 0, ry = 0;   // ring lag position

  document.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + "px";
    cursor.style.top  = my + "px";
  });

  // Smooth ring follow
  function animRing() {
    rx += (mx - rx) * 0.11;
    ry += (my - ry) * 0.11;
    ring.style.left = rx + "px";
    ring.style.top  = ry + "px";
    requestAnimationFrame(animRing);
  }
  animRing();

  // Enlarge on interactive elements
  const hoverTargets = "a, button, .cert-card, .project-row, .skill-item, .stat-box, .social-pill";
  document.querySelectorAll(hoverTargets).forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.width  = "20px";
      cursor.style.height = "20px";
      ring.style.width    = "56px";
      ring.style.height   = "56px";
    });
    el.addEventListener("mouseleave", () => {
      cursor.style.width  = "10px";
      cursor.style.height = "10px";
      ring.style.width    = "36px";
      ring.style.height   = "36px";
    });
  });
})();

/* ═══════════════════════════════════════════════════════
   SCROLL PROGRESS LINE
═══════════════════════════════════════════════════════ */
window.addEventListener("scroll", () => {
  const scrollTop  = window.scrollY;
  const docHeight  = document.body.scrollHeight - window.innerHeight;
  const pct        = docHeight > 0 ? scrollTop / docHeight : 0;
  const line       = document.getElementById("scroll-line");
  if (line) line.style.transform = `scaleX(${pct})`;
}, { passive: true });

/* ═══════════════════════════════════════════════════════
   NAVBAR — background on scroll + hamburger
═══════════════════════════════════════════════════════ */
(function initNavbar() {
  const navbar    = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const navMenu   = document.getElementById("nav-menu");

  // Scroll glass effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 60) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }, { passive: true });

  // Hamburger toggle
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("open");
      navMenu.classList.toggle("open");
    });
  }
})();

function closeMenu() {
  const hamburger = document.getElementById("hamburger");
  const navMenu   = document.getElementById("nav-menu");
  if (hamburger) hamburger.classList.remove("open");
  if (navMenu)   navMenu.classList.remove("open");
}

/* ═══════════════════════════════════════════════════════
   SPLASH SCREEN  (GSAP)
═══════════════════════════════════════════════════════ */
window.addEventListener("load", function () {
  const chars  = document.querySelectorAll("#splash-name .char");
  const tag    = document.getElementById("splash-tag");
  const bar    = document.getElementById("splash-bar");
  const splash = document.getElementById("splash");

  const tl = gsap.timeline({
    onComplete: () => {
      // Hide splash, init scroll reveals
      splash.style.display = "none";
      initScrollReveal();
      initCounters();
    }
  });

  // Staggered character entrance
  tl.to(chars, {
    y: 0,
    opacity: 1,
    duration: 0.65,
    stagger: 0.055,
    ease: "power3.out"
  });

  // Tag line fade in
  tl.to(tag, {
    opacity: 1,
    duration: 0.4,
    ease: "power2.out"
  }, "-=0.15");

  // Progress bar sweeps across
  tl.to(bar, {
    width: "100%",
    duration: 0.75,
    ease: "power2.inOut"
  }, "+=0.25");

  // Slide splash up and away
  tl.to(splash, {
    yPercent: -100,
    duration: 0.65,
    ease: "power3.inOut"
  }, "+=0.05");
});

/* ═══════════════════════════════════════════════════════
   SCROLL REVEAL  (GSAP + ScrollTrigger)
═══════════════════════════════════════════════════════ */
function initScrollReveal() {
  gsap.registerPlugin(ScrollTrigger);

  document.querySelectorAll(".reveal").forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.85,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        once: true,
      }
    });
  });
}

/* ═══════════════════════════════════════════════════════
   ANIMATED COUNTERS  (stat boxes in About)
═══════════════════════════════════════════════════════ */
function initCounters() {
  const counters = document.querySelectorAll(".stat-number[data-target]");

  counters.forEach((el) => {
    const target   = parseInt(el.dataset.target, 10);
    const duration = 1400; // ms
    const start    = Date.now();

    // Only animate when visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        function tick() {
          const elapsed  = Date.now() - start;
          const progress = Math.min(elapsed / duration, 1);
          // ease-out
          const eased    = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(eased * target);
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.3 });

    observer.observe(el);
  });
}

/* ═══════════════════════════════════════════════════════
   CERTIFICATE MODAL
═══════════════════════════════════════════════════════ */
function openModal(src) {
  const modal = document.getElementById("modal");
  const img   = document.getElementById("modal-img");
  if (!modal || !img) return;
  img.src = src;
  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const modal = document.getElementById("modal");
  if (!modal) return;
  modal.classList.remove("open");
  document.body.style.overflow = "";
}

// Close on backdrop click
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal");
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
  }

  // Close modal with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
});

/* ═══════════════════════════════════════════════════════
   CONTACT FORM  (EmailJS) — success overlay + inline errors
═══════════════════════════════════════════════════════ */
function formatEmailJsError(error) {
  const status = error && typeof error.status === "number" ? error.status : 0;
  let raw =
    error && typeof error.text === "string" ? error.text : String(error || "");

  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.message === "string") raw = parsed.message;
    else if (parsed && typeof parsed.text === "string") raw = parsed.text;
  } catch (_) {
    /* plain text response */
  }

  const lower = raw.toLowerCase();
  if (status === 403 || lower.includes("domain")) {
    return "EmailJS blocked this page: add your site under EmailJS → Account → Security (Allowed domains). For local testing use http://localhost with Live Server.";
  }
  if (status === 400 && lower.includes("template")) {
    return "Template or service ID mismatch. Check EmailJS dashboard IDs and template variables.";
  }
  if (status === 0 || lower.includes("network")) {
    return "Network error. Check your connection and try again.";
  }
  if (raw && raw.length > 0 && raw.length < 220) {
    return raw;
  }
  return "Failed to send message. Please try again or email directly.";
}

function sendEmail(event) {
  event.preventDefault();

  const serviceID = "service_5n2ormd";
  const templateID = "template_ojsb5p2";
  const submitButton =
    document.getElementById("submit-btn") ||
    document.querySelector(".contact-form button");
  const formMsg = document.getElementById("form-msg");

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    displayErrorMessage("Please fill all fields");
    return;
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    displayErrorMessage("Please enter a valid email");
    return;
  }

  if (formMsg) formMsg.style.display = "none";

  submitButton.disabled = true;
  submitButton.textContent = "Sending...";
  gsap.to(submitButton, { opacity: 0.7, duration: 0.3 });

  /* Match your EmailJS template: {{from_name}} {{from_email}} {{message}} */
  const templateParams = {
    from_name: name,
    from_email: email,
    message: message,
  };

  /* v3 API: 4th arg is public key string (same as init, avoids init timing issues) */
  emailjs
    .send(serviceID, templateID, templateParams, EMAILJS_PUBLIC_KEY)
    .then(() => {
      displaySuccessMessage();
      document.querySelector(".contact-form").reset();
    })
    .catch((error) => {
      console.error("EmailJS Error:", error);
      displayErrorMessage(formatEmailJsError(error));
    })
    .finally(() => {
      submitButton.disabled = false;
      submitButton.textContent = "Send Message";
      gsap.to(submitButton, { opacity: 1, duration: 0.3 });
    });
}

function displayErrorMessage(text) {
  const formMsg = document.getElementById("form-msg");
  if (!formMsg) return;
  formMsg.className = "error";
  formMsg.textContent = text;
  formMsg.style.display = "block";
  setTimeout(() => {
    formMsg.style.display = "none";
  }, 6000);
}

function closeOverlay(overlay) {
  if (!overlay || !overlay.parentNode) return;
  if (overlay._escapeHandler) {
    document.removeEventListener("keydown", overlay._escapeHandler);
    overlay._escapeHandler = null;
  }
  if (overlay._autoCloseTimer) {
    clearTimeout(overlay._autoCloseTimer);
    overlay._autoCloseTimer = null;
  }
  overlay.remove();
  document.body.style.overflow = "";
}

function displaySuccessMessage() {
  const existingOverlay = document.querySelector(".success-overlay");
  if (existingOverlay) existingOverlay.remove();

  const overlay = document.createElement("div");
  overlay.className = "success-overlay";
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
  document.body.style.overflow = "hidden";

  const lottiePlayer = overlay.querySelector("dotlottie-player");

  function safeClose() {
    closeOverlay(overlay);
  }

  overlay.addEventListener("click", safeClose);

  const closeOnEscape = (e) => {
    if (e.key === "Escape") safeClose();
  };
  overlay._escapeHandler = closeOnEscape;
  document.addEventListener("keydown", closeOnEscape);

  const fallbackMs = 8000;
  overlay._autoCloseTimer = setTimeout(safeClose, fallbackMs);

  const scheduleAfterAnimation = (ms) => {
    if (overlay._autoCloseTimer) {
      clearTimeout(overlay._autoCloseTimer);
      overlay._autoCloseTimer = null;
    }
    overlay._autoCloseTimer = setTimeout(safeClose, ms);
  };

  if (lottiePlayer) {
    const onReady = () => {
      let seconds = 4;
      try {
        const d =
          typeof lottiePlayer.getDuration === "function"
            ? lottiePlayer.getDuration()
            : null;
        if (typeof d === "number" && !Number.isNaN(d) && d > 0) seconds = d;
      } catch (_) {
        /* use default */
      }
      scheduleAfterAnimation(seconds * 1000 + 500);
    };

    lottiePlayer.addEventListener("ready", onReady, { once: true });
    // If ready never fires (e.g. slow network), fallback timer still runs
  } else {
    scheduleAfterAnimation(3500);
  }
}

/* ═══════════════════════════════════════════════════════
   SMOOTH SCROLL — offset for fixed nav
═══════════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (!target) return;
      e.preventDefault();

      const navH   = parseInt(
        getComputedStyle(document.documentElement)
          .getPropertyValue("--nav-h") || "70"
      );
      const top = target.getBoundingClientRect().top + window.scrollY - navH;

      window.scrollTo({ top, behavior: "smooth" });
    });
  });
});