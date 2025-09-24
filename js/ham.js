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