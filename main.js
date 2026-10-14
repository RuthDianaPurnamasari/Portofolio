document.addEventListener("DOMContentLoaded", () => {

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile = () => window.matchMedia("(max-width: 900px)").matches;
  const hasIO = "IntersectionObserver" in window;

  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  const navLinks = document.querySelectorAll(".main-nav a");
  const sections = document.querySelectorAll("main section[id]");
  const progress = document.getElementById("progress");
  const fab = document.getElementById("fab");
  const contact = document.getElementById("kontak");

  /* ---------- Menu mobile ---------- */
  function setMenu(open) {
    if (!nav || !menuToggle) return;
    nav.classList.toggle("open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Tutup menu navigasi" : "Buka menu navigasi");
    if (open && header) header.classList.remove("is-hidden");
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

  /* ---------- Scroll: header, progress bar, nav aktif, tombol mengambang ---------- */
  let lastY = window.scrollY;
  let ticking = false;

  function onScroll() {
    const y = window.scrollY;

    if (header) {
      header.classList.toggle("scrolled", y > 20);

      // Di HP: header menyembunyikan diri saat scroll turun, muncul lagi saat scroll naik
      if (isMobile() && !(nav && nav.classList.contains("open"))) {
        const delta = y - lastY;
        if (Math.abs(delta) > 6) {
          header.classList.toggle("is-hidden", delta > 0 && y > 140);
          lastY = y;
        }
        if (y <= 140) header.classList.remove("is-hidden");
      } else {
        header.classList.remove("is-hidden");
        lastY = y;
      }
    }

    if (progress) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.transform = "scaleX(" + (max > 0 ? Math.min(y / max, 1) : 0) + ")";
    }

    let current = "";
    sections.forEach((section) => {
      if (section.getBoundingClientRect().top <= 160) current = section.id;
    });
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === "#" + current);
    });

    if (fab && contact) {
      const pastHero = y > window.innerHeight * 0.8;
      const contactInView = contact.getBoundingClientRect().top < window.innerHeight - 80;
      const menuOpen = nav && nav.classList.contains("open");
      fab.classList.toggle("is-visible", pastHero && !contactInView && !menuOpen);
    }

    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(onScroll);
    }
  }
  onScroll();
  window.addEventListener("scroll", requestTick, { passive: true });
  window.addEventListener("resize", requestTick);

  /* ---------- Muncul halus saat di-scroll ---------- */
  const revealSelector = [
    ".section-heading", ".about-statement", ".about-body", ".education",
    ".job", ".bento-card", ".tools", ".filters", ".swipe-hint",
    ".org-item", ".pub-item", ".contact-box"
  ].join(",");
  const revealTargets = document.querySelectorAll(revealSelector);

  if (hasIO && !reduceMotion) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

    revealTargets.forEach((el, i) => {
      el.classList.add("reveal");
      el.style.setProperty("--d", (i % 3) * 80 + "ms");
      revealObserver.observe(el);
    });
  }

  /* ---------- Angka berhitung (IPK, proyek, publikasi) ---------- */
  document.querySelectorAll("[data-count]").forEach((el) => {
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || "0", 10);
    const format = (v) => v.toFixed(decimals);

    if (!hasIO || reduceMotion) { el.textContent = format(target); return; }

    el.textContent = format(0);
    const counter = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      counter.disconnect();
      const start = performance.now();
      const duration = 1100;
      (function step(now) {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = format(target * eased);
        if (t < 1) requestAnimationFrame(step);
        else el.textContent = format(target);
      })(start);
    }, { threshold: 0.6 });
    counter.observe(el);
  });

  /* ---------- Filter proyek + penghitung geser ---------- */
  const filterButtons = document.querySelectorAll(".filter");
  const projectCards = document.querySelectorAll(".project-card");
  const grid = document.getElementById("project-grid");
  const countEl = document.getElementById("project-count");
  const hint = document.getElementById("swipe-hint");

  const visibleCards = () => Array.from(projectCards).filter((c) => !c.classList.contains("is-hidden"));

  function updateProjectCount() {
    if (!grid || !countEl) return;
    const cards = visibleCards();
    if (hint) hint.classList.toggle("is-empty", cards.length < 2);
    if (!cards.length) return;
    const gridCenter = grid.scrollLeft + grid.clientWidth / 2;
    let best = 0, bestDist = Infinity;
    cards.forEach((card, i) => {
      const dist = Math.abs(card.offsetLeft + card.offsetWidth / 2 - gridCenter);
      if (dist < bestDist) { bestDist = dist; best = i; }
    });
    countEl.textContent = (best + 1) + " / " + cards.length;
  }

  if (grid) {
    grid.addEventListener("scroll", () => window.requestAnimationFrame(updateProjectCount), { passive: true });
    window.addEventListener("resize", updateProjectCount);
  }

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
      if (grid) grid.scrollTo({ left: 0 });
      updateProjectCount();
    });
  });
  updateProjectCount();

  /* ---------- Ketuk foto untuk memperbesar ---------- */
  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.setAttribute("role", "dialog");
  lightbox.setAttribute("aria-modal", "true");
  lightbox.setAttribute("aria-label", "Foto diperbesar");
  lightbox.innerHTML =
    '<button type="button" class="lightbox-close" aria-label="Tutup foto">×</button>' +
    '<figure><img alt=""><figcaption></figcaption></figure>';
  document.body.appendChild(lightbox);

  const lbImg = lightbox.querySelector("img");
  const lbCaption = lightbox.querySelector("figcaption");
  const lbClose = lightbox.querySelector(".lightbox-close");
  let lastFocus = null;

  function openLightbox(img) {
    lastFocus = document.activeElement;
    lbImg.src = img.currentSrc || img.src;
    lbImg.alt = img.alt;
    const cap = img.closest("figure") && img.closest("figure").querySelector("figcaption");
    lbCaption.textContent = cap ? cap.textContent : img.alt;
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
    lbClose.focus();
  }
  function closeLightbox() {
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }

  document.querySelectorAll(".job-photos img, .org-photo img").forEach((img) => {
    img.setAttribute("tabindex", "0");
    img.setAttribute("role", "button");
    img.setAttribute("aria-label", "Perbesar foto: " + img.alt);
    img.addEventListener("click", () => openLightbox(img));
    img.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLightbox(img); }
    });
  });
  lightbox.addEventListener("click", closeLightbox);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("open")) closeLightbox();
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
        if (navigator.vibrate) navigator.vibrate(30);
      } catch (error) {
        showToast("Gagal menyalin. Silakan salin manual.");
      }
    });
  }

  /* ---------- Tahun di footer ---------- */
  const year = document.getElementById("current-year");
  if (year) year.textContent = new Date().getFullYear();

});