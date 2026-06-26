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
    const sectionTop = section.offsetTop - 120;
    if (pageYOffset >= sectionTop) {
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
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".fade-in").forEach(section => {
  observer.observe(section);
});

// ======================================
// Contact Form Feedback
// ======================================

const form = document.querySelector(".contact-form");

if (form) {
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    const button = this.querySelector("button");
    button.innerHTML = "Sending...";
    button.disabled = true;
    document.getElementById("form-feedback").textContent = "Message sent. We'll be in touch shortly.";
    setTimeout(() => {
      this.reset();
      button.innerHTML = "Send Message";
      button.disabled = false;
    }, 2000);
  });
}