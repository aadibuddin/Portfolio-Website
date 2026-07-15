function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    entry.target.classList.toggle("visible", entry.isIntersecting);
  });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

