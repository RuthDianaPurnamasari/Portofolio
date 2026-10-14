document.addEventListener("DOMContentLoaded", () => {

  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  const navLinks = document.querySelectorAll(".main-nav a");
  const sections = document.querySelectorAll("main section[id]");

  /* ---------- Menu mobile ---------- */
  function setMenu(open) {
    if (!nav || !menuToggle) return;
    nav.classList.toggle("open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Tutup menu navigasi" : "Buka menu navigasi");
  }

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      setMenu(!nav.classList.contains("open"));
    });
    navLinks.forEach((link) => link.addEventListener("click", () => setMenu(false)));
    document.addEventListener("click", (e) => {
      if (!nav.contains(e.target) && !menuToggle.contains(e.target)) setMenu(false);
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("open")) {
        setMenu(false);
        menuToggle.focus();
      }
    });
  }

  /* ---------- Header & nav aktif saat scroll ---------- */
  function onScroll() {
    if (header) header.classList.toggle("scrolled", window.scrollY > 20);

    let current = "";
    sections.forEach((section) => {
      if (section.getBoundingClientRect().top <= 160) current = section.id;
    });
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === "#" + current);
    });
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Filter project ---------- */
  const filterButtons = document.querySelectorAll(".filter");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.dataset.filter;

      filterButtons.forEach((b) => {
        const active = b === button;
        b.classList.toggle("is-active", active);
        b.setAttribute("aria-pressed", String(active));
      });

      projectCards.forEach((card) => {
        const match = value === "all" || card.dataset.cat.split(" ").includes(value);
        card.classList.toggle("is-hidden", !match);
      });
    });
  });

  /* ---------- Salin email ---------- */
  const toast = document.getElementById("toast");
  const copyButton = document.getElementById("copy-email");
  const emailLink = document.getElementById("email-link");
  let toastTimer;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
  }

  if (copyButton && emailLink) {
    copyButton.addEventListener("click", async () => {
      const email = emailLink.textContent.trim();
      try {
        await navigator.clipboard.writeText(email);
        showToast("Email disalin");
      } catch (error) {
        showToast("Gagal menyalin. Silakan salin manual.");
      }
    });
  }

  /* ---------- Tahun di footer ---------- */
  const year = document.getElementById("current-year");
  if (year) year.textContent = new Date().getFullYear();

});