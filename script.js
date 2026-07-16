/**
 * Mobile navigation (hamburger) toggle.
 * Behavior:
 *   - Click hamburger to open / close the full-screen nav overlay.
 *   - Toggles the 'menu-open' class on <body> (all visuals live in CSS).
 *   - Closes when a nav link is clicked (navigation follows).
 *   - Closes on the Escape key.
 *   - Basic focus management: focus the first link on open, return focus
 *     to the toggle on close.
 */
(function () {
  "use strict";

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector("header nav");
  if (!toggle || !nav) return;

  var body = document.body;
  var navLinks = Array.from(nav.querySelectorAll("a"));

  function isOpen() {
    return body.classList.contains("menu-open");
  }

  function openMenu() {
    body.classList.add("menu-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close menu");
    if (navLinks.length) navLinks[0].focus();
  }

  function closeMenu(returnFocus) {
    body.classList.remove("menu-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
    if (returnFocus !== false) toggle.focus();
  }

  toggle.addEventListener("click", function () {
    if (isOpen()) closeMenu();
    else openMenu();
  });

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      closeMenu(false);
    });
  });

  document.addEventListener("keydown", function (e) {
    if (!isOpen()) return;
    if (e.key === "Escape") {
      e.preventDefault();
      closeMenu();
    }
  });
})();

(function () {
  "use strict";

  var btn = document.querySelector(".copy-email-btn");
  if (!btn) return;

  var email = btn.getAttribute("data-email");
  var resetTimer;

  function fallbackCopy(text) {
    var textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    try {
      document.execCommand("copy");
    } catch (err) {
      /* no-op: clipboard unavailable */
    }
    document.body.removeChild(textarea);
  }

  function showCopied() {
    btn.classList.add("copied");
    clearTimeout(resetTimer);
    resetTimer = setTimeout(function () {
      btn.classList.remove("copied");
    }, 1600);
  }

  btn.addEventListener("click", function () {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(email).then(showCopied, function () {
        fallbackCopy(email);
        showCopied();
      });
    } else {
      fallbackCopy(email);
      showCopied();
    }
  });
})();

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    entry.target.classList.toggle("visible", entry.isIntersecting);
  });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));
