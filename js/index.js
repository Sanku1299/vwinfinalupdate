const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

let currentSlide = 0;

// Function to move to a specific slide
function updateSlide(position) {
  track.style.transform = `translateX(-${position * 100}%)`;
}

// Next and Prev Button Click
nextBtn.addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % slides.length;
  updateSlide(currentSlide);
});

prevBtn.addEventListener('click', () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  updateSlide(currentSlide);
});

// 🔁 Autoplay every 5 seconds
setInterval(() => {
  currentSlide = (currentSlide + 1) % slides.length;
  updateSlide(currentSlide);
}, 5000);

const counters = document.querySelectorAll('.counter');
let hasAnimated = false;

function animateCounters() {
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const showPlus = counter.getAttribute('data-plus') === "true";
    const duration = 2000;
    const stepTime = Math.max(Math.floor(duration / target), 20);
    let current = 0;

    const update = () => {
      current += Math.ceil(target / (duration / stepTime));
      if (current >= target) {
        counter.textContent = target.toLocaleString() + (showPlus ? "+" : "");
      } else {
        counter.textContent = current.toLocaleString();
        requestAnimationFrame(update);
      }
    };

    update();
  });
}

window.addEventListener('scroll', () => {
  const section = document.getElementById('stats-section');
  const sectionTop = section.getBoundingClientRect().top;

  if (!hasAnimated && sectionTop < window.innerHeight - 100) {
    animateCounters();
    hasAnimated = true;
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const ddItems = document.querySelectorAll('.has-dropdown'); // support multiple dropdowns
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  // Dropdown toggle (works for each dropdown)
  ddItems.forEach(ddItem => {
    const caret = ddItem.querySelector('.caret');
    const dropdown = ddItem.querySelector('.dropdown');

    function toggleDropdown() {
      ddItem.classList.toggle('open');
      const isOpen = ddItem.classList.contains('open');
      caret.setAttribute('aria-expanded', String(isOpen));
      caret.classList.toggle("rotate", isOpen);
    }

    // Click caret
    caret.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      toggleDropdown();
    });

    // Keyboard access
    caret.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleDropdown();
      }
    });
  });

  // Mobile menu toggle
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  // Reset nav on resize (desktop view)
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
      document.querySelectorAll(".dropdown").forEach(d => d.style.maxHeight = "");
      navLinks.classList.remove("active");
      hamburger.classList.remove("active");
    }
  });
});