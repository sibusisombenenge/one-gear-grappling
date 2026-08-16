// ======================================
// Hamburger Menu
// ======================================
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  navLinks.classList.toggle("open");
});

function closeMenu() {
  hamburger.classList.remove("open");
  navLinks.classList.remove("open");
}

// ======================================
// Active Navigation Highlight
// ======================================
const sections = document.querySelectorAll("section");
const links = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    if (pageYOffset >= section.offsetTop - 120) {
      current = section.getAttribute("id");
    }
  });
  links.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

// ======================================
// Fade In Sections
// ======================================
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("show");
  });
}, { threshold: 0.15 });

document.querySelectorAll(".fade-in").forEach(section => {
  observer.observe(section);
});

// ======================================
// Prefill Contact Form from Program Buttons
// ======================================
function prefillContact(program) {
  const select = document.getElementById("program");
  if (select) {
    select.value = program;
  }
  const msg = document.getElementById("message");
  if (msg && !msg.value) {
    msg.value = `Hi Andrew, I'm interested in the ${program} program and would like to book a free trial.`;
  }
  document.getElementById("contact-form").scrollIntoView({ behavior: "smooth", block: "start" });
  setTimeout(() => document.getElementById("fname").focus(), 600);
}

// ======================================
// Validation Helpers
// ======================================
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
}

function validatePhone(phone) {
  // Accept SA formats: 0XX XXX XXXX, +27XX XXX XXXX, digits only variants
  const cleaned = phone.replace(/[\s\-()]/g, "");
  return /^(\+27|0)[0-9]{9}$/.test(cleaned);
}

function normalizePhone(phone) {
  const cleaned = phone.replace(/[\s\-()]/g, "");
  if (cleaned.startsWith("0")) return "+27" + cleaned.slice(1);
  return cleaned;
}

// ======================================
// Rate Limiting
// ======================================
let lastSubmit = 0;
const RATE_LIMIT_MS = 30000; // 30 seconds

// ======================================
// Contact Form — WhatsApp Submit
// ======================================
const form = document.getElementById("contact-form");

if (form) {
  form.addEventListener("submit", function(e) {
    e.preventDefault();

    const now = Date.now();
    if (now - lastSubmit < RATE_LIMIT_MS) {
      const wait = Math.ceil((RATE_LIMIT_MS - (now - lastSubmit)) / 1000);
      document.getElementById("form-feedback").textContent =
        `Please wait ${wait} seconds before sending again.`;
      return;
    }

    const fname = document.getElementById("fname").value.trim();
    const lname = document.getElementById("lname").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const program = document.getElementById("program").value;
    const message = document.getElementById("message").value.trim();

    let valid = true;

    // Phone validation
    const phoneError = document.getElementById("phone-error");
    if (!validatePhone(phone)) {
      phoneError.textContent = "Please enter a valid SA phone number (e.g. 081 302 0360 or +27813020360).";
      valid = false;
    } else {
      phoneError.textContent = "";
    }

    // Email validation
    const emailError = document.getElementById("email-error");
    if (!validateEmail(email)) {
      emailError.textContent = "Please enter a valid email address.";
      valid = false;
    } else {
      emailError.textContent = "";
    }

    // Required fields
    if (!fname || !lname) {
      document.getElementById("form-feedback").textContent = "Please enter your first and last name.";
      valid = false;
    }

    if (!valid) return;

    lastSubmit = now;

    // Build WhatsApp message
    const waMessage = [
      `Hi Andrew, I'd like to enquire about One Gear Grappling.`,
      ``,
      `Name: ${fname} ${lname}`,
      `Phone: ${normalizePhone(phone)}`,
      `Email: ${email}`,
      program ? `Program: ${program}` : "",
      message ? `Message: ${message}` : "",
    ].filter(Boolean).join("\n");

    const waURL = `https://wa.me/27813020360?text=${encodeURIComponent(waMessage)}`;
    window.open(waURL, "_blank");

    document.getElementById("form-feedback").textContent =
      "WhatsApp opened with your details. Send the message to Andrew to get started!";

    form.reset();
  });
}