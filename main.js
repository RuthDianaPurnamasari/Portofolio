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

  /* =========================================================
     BAHASA (ID / EN)
     Teks Indonesia ada di HTML. Terjemahan Inggris ada di sini.
     ========================================================= */
  const EN = {
    skip: "Skip to content",
    nA: "About", nE: "Experience", nS: "Skills", nP: "Projects", nO: "Organizations", nU: "Publications", nC: "Contact",

    eyebrow: "Professional portfolio",
    hello: "Hi, I'm",
    role: "Applied Informatics Engineering graduate | Front-End & Mobile Developer, QA Software, IT Support",
    lead: "Applied Informatics Engineering graduate from Universitas Logistik dan Bisnis Internasional with internship experience as a mobile front-end developer at PT Pos Indonesia in a three-person team, plus a vocational school internship (PKL) logging technician data and monitoring service tickets. Project experience in front-end development, quality assurance, and data processing, and used to working carefully, in a structured way, and collaboratively.",
    b1: "View Experience & Projects", b2: "Contact Me", bcv: "Download CV",
    sticker: "ULBI Graduate<br>2026",
    rh: "Skills summary",
    r1s: "Excel, Word, documentation",
    r2s: "Tickets, basic troubleshooting",
    r4t: "Administration & data",
    rf: "Ready to contribute.",

    aS: "Working on projects from interface to testing, and writing up the results in scientific publications.",
    a1: "I graduated from the Applied Informatics Engineering program (D4) at Universitas Logistik dan Bisnis Internasional (ULBI). During my studies I worked on various projects, from websites and mobile apps to dashboards that evaluate deep learning models.",
    a2: "While in vocational high school, I completed a field internship (PKL) at PT Wredatama Mitra Telematika, logging technician activities and monitoring service tickets. I also joined an internship at PT Pos Indonesia, contributing to the interface of the Mailing Room mobile app using Flutter and Dart.",
    a3: "I work carefully and in a structured way, and I keep learning. I am looking for opportunities to grow in IT administration, IT support, quality assurance, or application development.",
    fG: "GPA", fP: "Projects", fU: "Publications & book",
    eduH: "Education",
    ed1: "Bachelor of Applied Science in Informatics Engineering (D4), GPA 3.57 / 4.00",
    ed2: "Telecommunication Transmission Engineering",

    xH: "Experience",
    xP: "An internship at PT Pos Indonesia and a vocational school internship at PT Wredatama, two experiences that shaped how I work: careful, communicative, and used to teamwork.",
    j1: "Contributed as one of two front-end developers in a three-person team on the Mailing Room mobile app, using Flutter and Dart. Built the interfaces for registration, login, dashboard, mail delivery, mail details, and mail tracking, and coordinated with the back-end developer and fellow front-end developer so the UI matched system requirements.",
    j2: "During my vocational school internship (PKL), I logged and monitored customer complaint tickets and new installation requests, recorded technician activity and attendance using Microsoft Excel, and documented ODP information.",
    c1: "Team activity", c2: "App presentation and demo",
    c3: "Work activity", c4: "Monitoring", c5: "Technician monitoring", c6: "Ticket tracking",

    sH: "Skills and tools",
    sP: "Grouped by field. Levels reflect my current ability.",
    k1h: "Administration & data", k1e: "Data recap and logging", lvB: "Basic", lvP: "Projects & internship",
    k1a: "Data logging", k1b: "Documentation", k1c: "Data recapitulation",
    k2a: "Ticket monitoring", k2b: "Basic troubleshooting", k2c: "Technical documentation", k2d: "Cisco (basic)",
    k3p: "Testing features, writing test cases, and documenting the bugs found.",
    k3b: "Bug documentation",
    k4h: "Application development",
    kF: "Mobile app interfaces", kH: "Page structure", kC: "Styling and layout", kJ: "Interactivity", kG: "Go programming",
    wH: "Ways of working", w1: "Detail-oriented", w3: "Communication", w4: "Time management",
    tH: "Supporting tools",

    pH: "Projects",
    pP: "Academic projects, applications, dashboards, and testing work I have done.",
    fAll: "All",
    hint: "Swipe to see more projects",
    lblR: "My role", lblW: "Main work", lblK: "My contribution", lnkG: "Code on GitHub", lnkT: "Team repository on GitHub",
    p1t: "KaloriKu: Calorie Tracking Web Application",
    p1g: "Developed the user interface of KaloriKu to support calorie tracking and monitoring, in collaboration with a teammate responsible for the back-end.",
    p1r: "Front-End Developer, team of 2.",
    p1w1: "Developed the web application interface and user interface.", p1w2: "Implemented front-end components according to the application's feature requirements.", p1w3: "Collaborated with my teammate on application development.", j2r: "Assurance Intern (vocational school internship)",
    p2t: "KaloriKu: Mobile Application",
    p2g: "A Flutter mobile app to access KaloriKu information through an easy-to-use interface.",
    p2w: "App interface using Flutter and Dart.",
    p2n: "The backend is no longer active, so the app is shown through a demo video.",
    p8n: "The app demo is shown through a video.",
    p3t: "Hospital Management System",
    p3r: "Front-End Developer.",
    p3w: "Developed user interfaces to support the display and interaction of the hospital information system features.",
    p3g: "A hospital information system with patient registration, doctor schedule management, and medicine management.",
    p4t: "Catering Equipment Rental App",
    p4g: "An app to browse catering equipment, manage orders, and track order status.",
    p4r: "Front-end developer. Also documented the process in a tutorial book (published 2023).",
    p5t: "Mail Archive Classification",
    p5g: "An interactive Streamlit dashboard that presents the evaluation results of a deep learning model for mail archive classification.",
    p5r: "Built the dashboard and wrote up the results in the Nuansa Informatika journal.",
    p6t: "IDIBIZ: website testing",
    p6g: "Testing the IDIBIZ website to make sure its features work as required.",
    p6w: "Manual and automated testing with Katalon Studio, test cases, UAT, and bug documentation. The video shows testing of the register feature.",
    p7t: "Indonesian News Classification",
    p7g: "A Streamlit dashboard comparing CNN and Attention-BiLSTM models for Indonesian news classification with different text representations.",
    p7r: "Final project research and dashboard development. Accepted at Jurnal Ilmiah Informatika Komputer.",
    p8g: "A mobile app to manage incoming mail, outgoing mail, tracking, and delivery.",
    p8r: "Front-end developer in a three-person team (internship at PT Pos Indonesia).",
    p8w: "Interfaces for registration, login, dashboard, mail delivery, mail details, and mail tracking.",
    p9g: "The website you are viewing, built to showcase my experience, projects, skills, and organizations.",
    p9r: "Designed and built it myself.",
    p9w: "Responsive design, project filter, bilingual display, and accessibility improvements.",

    oH: "Organizations and committees",
    oP: "Where I learned to lead, coordinate, and work together.",
    o1t: "Chair of the 2024 Informatics Engineering Public Lecture",
    o1d: "Responsible for coordinating the preparation, execution, and management of the event.",
    o2d: "Active in the Informatics Engineering Student Association of ULBI and involved in various activities and committees.",

    uH: "Publications",
    uP: "Scientific papers and a book I have written.",
    u1: "Jurnal Ilmiah Informatika Komputer. Letter of Acceptance (LoA) available upon request.",
    u2: "Nuansa Informatika, January 2026",
    stA: "Accepted", stP: "Published", stB: "Book",
    lnkA: "Read article ↗", lnkB: "View book ↗",

    cH: "Have a job opportunity or project in mind?",
    cP: "Let's connect and talk about job opportunities or professional collaboration.",
    cCopy: "Copy email",
    fR: "All rights reserved."
  };

  const UI = {
    id: {
      title: "Ruth Diana Purnamasari Sagala | Portfolio",
      desc: "Portfolio Ruth Diana Purnamasari Sagala, S.Tr.Kom — lulusan Teknik Informatika Terapan dengan pengalaman IT support, administrasi data, quality assurance, dan pengembangan aplikasi.",
      langLabel: "Switch language to English",
      menuOpen: "Buka menu navigasi", menuClose: "Tutup menu navigasi",
      lbLabel: "Foto diperbesar", lbClose: "Tutup foto", zoom: "Perbesar foto: ",
      copied: "Email disalin", copyFail: "Gagal menyalin. Silakan salin manual."
    },
    en: {
      title: "Ruth Diana Purnamasari Sagala | Portfolio",
      desc: "Portfolio of Ruth Diana Purnamasari Sagala, S.Tr.Kom — Applied Informatics Engineering graduate with experience in IT support, data administration, quality assurance, and application development.",
      langLabel: "Ganti bahasa ke Bahasa Indonesia",
      menuOpen: "Open navigation menu", menuClose: "Close navigation menu",
      lbLabel: "Enlarged photo", lbClose: "Close photo", zoom: "Enlarge photo: ",
      copied: "Email copied", copyFail: "Could not copy. Please copy it manually."
    }
  };

  const i18nEls = document.querySelectorAll("[data-i]");
  i18nEls.forEach((el) => { el.dataset.idText = el.innerHTML; });

  // Label aksesibilitas (aria-label) yang ikut berganti bahasa
  const AR = {
    aBrand: "Ruth Diana home", aNav: "Main navigation", aFocus: "Focus areas",
    aRun: "Skills summary", aFil: "Filter projects"
  };
  const iaEls = document.querySelectorAll("[data-ia]");
  iaEls.forEach((el) => { el.dataset.iaId = el.getAttribute("aria-label"); });

  const langToggle = document.getElementById("lang-toggle");
  let lang = "id";

  function safeGet(key) { try { return localStorage.getItem(key); } catch (e) { return null; } }
  function safeSet(key, val) { try { localStorage.setItem(key, val); } catch (e) { /* diabaikan */ } }

  function applyLang(next) {
    lang = next === "en" ? "en" : "id";
    document.documentElement.lang = lang;

    i18nEls.forEach((el) => {
      const key = el.dataset.i;
      el.innerHTML = lang === "en" && EN[key] !== undefined ? EN[key] : el.dataset.idText;
    });

    iaEls.forEach((el) => {
      el.setAttribute("aria-label", lang === "en" && AR[el.dataset.ia] ? AR[el.dataset.ia] : el.dataset.iaId);
    });

    document.title = UI[lang].title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", UI[lang].desc);

    if (langToggle) {
      langToggle.setAttribute("aria-label", UI[lang].langLabel);
      langToggle.querySelector(".lang-id").classList.toggle("is-on", lang === "id");
      langToggle.querySelector(".lang-en").classList.toggle("is-on", lang === "en");
    }
    if (menuToggle && nav) {
      menuToggle.setAttribute("aria-label", nav.classList.contains("open") ? UI[lang].menuClose : UI[lang].menuOpen);
    }
    document.querySelectorAll(".job-photos img, .org-photo img").forEach((img) => {
      img.setAttribute("aria-label", UI[lang].zoom + img.alt);
    });
    if (lightbox) {
      lightbox.setAttribute("aria-label", UI[lang].lbLabel);
      lbClose.setAttribute("aria-label", UI[lang].lbClose);
    }
    document.querySelectorAll("[data-cv]").forEach((a) => {
      a.setAttribute("href", "files/CV RUTH DIANA - English Version.pdf");
      a.setAttribute("download", "CV RUTH DIANA - English Version.pdf");
    });
    safeSet("lang", lang);
  }

  if (langToggle) {
    langToggle.addEventListener("click", () => applyLang(lang === "id" ? "en" : "id"));
  }

  /* ---------- Menu mobile ---------- */
  function setMenu(open) {
    if (!nav || !menuToggle) return;
    nav.classList.toggle("open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? UI[lang].menuClose : UI[lang].menuOpen);
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

  window.addEventListener("resize", () => {
    if (!isMobile() && nav && nav.classList.contains("open")) setMenu(false);
  });

  /* ---------- Scroll: header, progress, nav aktif, tombol mengambang ---------- */
  let lastY = window.scrollY;
  let ticking = false;

  function onScroll() {
    const y = window.scrollY;

    if (header) {
      header.classList.toggle("scrolled", y > 20);

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

  if (!hasIO || reduceMotion) {
    document.querySelectorAll(revealSelector).forEach((el) => el.classList.add("is-in"));
  }

  if (hasIO && !reduceMotion) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

    document.querySelectorAll(revealSelector).forEach((el, i) => {
      el.classList.add("reveal");
      el.style.setProperty("--d", (i % 3) * 80 + "ms");
      revealObserver.observe(el);
    });
  }

  /* ---------- Angka berhitung ---------- */
  document.querySelectorAll("[data-count]").forEach((el) => {
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || "0", 10);
    const format = (v) => v.toFixed(decimals);

    if (!hasIO || reduceMotion) { el.textContent = format(target); return; }

    const counter = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      counter.disconnect();
      const start = performance.now();
      const duration = 1100;
      (function step(now) {
        const t = Math.min((now - start) / duration, 1);
        el.textContent = format(target * (1 - Math.pow(1 - t, 3)));
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
    if (!cards.length) { countEl.textContent = "0 / 0"; return; }

    // Hitung posisi kartu relatif terhadap grid (bukan halaman)
    const gridRect = grid.getBoundingClientRect();
    const center = gridRect.left + gridRect.width / 2;
    let best = 0, bestDist = Infinity;
    cards.forEach((card, i) => {
      const r = card.getBoundingClientRect();
      const dist = Math.abs(r.left + r.width / 2 - center);
      if (dist < bestDist) { bestDist = dist; best = i; }
    });
    countEl.textContent = (best + 1) + " / " + cards.length;
  }

  if (grid) {
    grid.addEventListener("scroll", () => window.requestAnimationFrame(updateProjectCount), { passive: true });
    window.addEventListener("resize", () => window.requestAnimationFrame(updateProjectCount));
  }

  const filterStatus = document.getElementById("filter-status");

  function applyFilter(value, announce) {
    filterButtons.forEach((b) => {
      const active = b.dataset.filter === value;
      b.classList.toggle("is-active", active);
      b.setAttribute("aria-pressed", active ? "true" : "false");
    });
    projectCards.forEach((card) => {
      const match = value === "all" || card.dataset.cat.split(" ").includes(value);
      card.classList.toggle("is-hidden", !match);
    });
    if (grid) grid.scrollTo({ left: 0 });
    updateProjectCount();
    window.requestAnimationFrame(updateProjectCount);
    if (announce && filterStatus) {
      const n = visibleCards().length;
      filterStatus.textContent = lang === "en"
        ? "Showing " + n + (n === 1 ? " project" : " projects")
        : "Menampilkan " + n + " proyek";
    }
  }

  filterButtons.forEach((b) => b.addEventListener("click", () => applyFilter(b.dataset.filter, true)));
  applyFilter("all", false);

  /* =========================================================
     LIGHTBOX (aksesibel)
     - Tutup hanya lewat tombol tutup, klik latar, atau Escape
     - Klik pada gambar TIDAK menutup
     - Fokus dikunci di dalam dialog dan dikembalikan ke foto asal
     ========================================================= */
  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.setAttribute("role", "dialog");
  lightbox.setAttribute("aria-modal", "true");
  lightbox.setAttribute("aria-label", UI.id.lbLabel);
  lightbox.innerHTML =
    '<button type="button" class="lightbox-close" aria-label="' + UI.id.lbClose + '">×</button>' +
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
    if (lastFocus && document.contains(lastFocus)) lastFocus.focus();
  }

  document.querySelectorAll(".job-photos img, .org-photo img").forEach((img) => {
    img.setAttribute("tabindex", "0");
    img.setAttribute("role", "button");
    img.addEventListener("click", () => openLightbox(img));
    img.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLightbox(img); }
    });
  });

  lbClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();   // hanya klik latar
  });
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("open")) return;
    if (e.key === "Escape") { closeLightbox(); return; }
    if (e.key === "Tab") { e.preventDefault(); lbClose.focus(); }  // fokus tetap di dialog
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
        showToast(UI[lang].copied);
        if (navigator.vibrate) navigator.vibrate(30);
      } catch (error) {
        showToast(UI[lang].copyFail);
      }
    });
  }

  /* ---------- Tahun di footer ---------- */
  const year = document.getElementById("current-year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Terapkan bahasa tersimpan ---------- */
  applyLang(safeGet("lang") === "en" ? "en" : "id");

});