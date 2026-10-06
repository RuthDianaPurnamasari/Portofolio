document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const header =
        document.querySelector(".site-header");

    const menuToggle =
        document.querySelector(".menu-toggle");

    const nav =
        document.querySelector(".main-nav");

    const navLinks =
        document.querySelectorAll(".main-nav a");

    const revealElements =
        document.querySelectorAll(
            ".reveal, .reveal-left, .reveal-right"
        );

    const sections =
        document.querySelectorAll("section[id]");

    const currentYear =
        document.querySelector("#current-year");


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    if (menuToggle && nav) {

        /*
         * Kondisi awal
         */

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Buka menu navigasi"
        );


        /*
         * Toggle menu
         */

        menuToggle.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();

                const isOpen =
                    nav.classList.toggle("open");


                menuToggle.setAttribute(
                    "aria-expanded",
                    isOpen ? "true" : "false"
                );


                menuToggle.setAttribute(
                    "aria-label",
                    isOpen
                        ? "Tutup menu navigasi"
                        : "Buka menu navigasi"
                );

            }
        );


        /*
         * Klik navigation link
         * → tutup mobile menu
         */

        navLinks.forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    nav.classList.remove("open");

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    menuToggle.setAttribute(
                        "aria-label",
                        "Buka menu navigasi"
                    );

                }
            );

        });


        /*
         * Klik di luar menu
         */

        document.addEventListener(
            "click",
            (event) => {

                const clickedInsideNav =
                    nav.contains(event.target);

                const clickedToggle =
                    menuToggle.contains(event.target);


                if (
                    !clickedInsideNav &&
                    !clickedToggle &&
                    nav.classList.contains("open")
                ) {

                    nav.classList.remove("open");

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    menuToggle.setAttribute(
                        "aria-label",
                        "Buka menu navigasi"
                    );

                }

            }
        );


        /*
         * Tombol Escape
         */

        document.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key === "Escape" &&
                    nav.classList.contains("open")
                ) {

                    nav.classList.remove("open");

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    menuToggle.setAttribute(
                        "aria-label",
                        "Buka menu navigasi"
                    );

                    menuToggle.focus();

                }

            }
        );

    }


    /* =====================================================
       HEADER SCROLL
    ===================================================== */

    function updateHeader() {

        if (!header) {
            return;
        }


        if (window.scrollY > 25) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }


    updateHeader();


    window.addEventListener(
        "scroll",
        updateHeader,
        {
            passive: true
        }
    );


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener(
                "click",
                (event) => {

                    const targetId =
                        link.getAttribute("href");


                    /*
                     * Abaikan href="#"
                     */

                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }


                    let target = null;


                    /*
                     * Cari target dengan aman
                     */

                    try {

                        target =
                            document.querySelector(
                                targetId
                            );

                    } catch (error) {

                        console.warn(
                            "Target navigasi tidak valid:",
                            targetId
                        );

                        return;

                    }


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    const headerHeight =
                        header
                            ? header.offsetHeight
                            : 0;


                    const targetPosition =
                        target.getBoundingClientRect().top
                        +
                        window.scrollY
                        -
                        headerHeight
                        -
                        5;


                    window.scrollTo({

                        top: Math.max(
                            targetPosition,
                            0
                        ),

                        behavior: "smooth"

                    });

                }
            );

        });


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    if (
        "IntersectionObserver" in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(
                        entry => {

                            if (
                                !entry.isIntersecting
                            ) {
                                return;
                            }


                            entry.target
                                .classList
                                .add("show");


                            observer.unobserve(
                                entry.target
                            );

                        }
                    );

                },
                {
                    threshold: 0.12,

                    rootMargin:
                        "0px 0px -60px 0px"
                }
            );


        revealElements.forEach(
            element => {

                revealObserver.observe(
                    element
                );

            }
        );

    } else {

        /*
         * Fallback browser lama
         */

        revealElements.forEach(
            element => {

                element.classList.add(
                    "show"
                );

            }
        );

    }


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    /*
     * Hanya section yang memang ada
     * link-nya di navigation yang akan
     * diberi class active.
     */

    const navTargetIds =
        new Set(
            Array.from(navLinks)
                .map(link =>
                    link.getAttribute("href")
                )
                .filter(href =>
                    href &&
                    href.startsWith("#") &&
                    href !== "#"
                )
        );


    function updateActiveNavigation() {

        if (
            !sections.length ||
            !navLinks.length
        ) {
            return;
        }


        let currentSection = "";


        sections.forEach(section => {

            const rect =
                section.getBoundingClientRect();


            /*
             * Section dianggap aktif ketika
             * sudah melewati bagian atas header.
             */

            if (rect.top <= 180) {

                currentSection =
                    "#" + section.id;

            }

        });


        navLinks.forEach(link => {

            const target =
                link.getAttribute("href");


            link.classList.remove(
                "active"
            );


            if (
                target === currentSection &&
                navTargetIds.has(target)
            ) {

                link.classList.add(
                    "active"
                );

            }

        });

    }


    updateActiveNavigation();


    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        {
            passive: true
        }
    );


    /* =====================================================
       IMAGE ERROR HANDLING
    ===================================================== */

    document
        .querySelectorAll("img")
        .forEach(img => {

            img.addEventListener(
                "error",
                () => {

                    img.classList.add(
                        "image-error"
                    );


                    console.warn(
                        "Gambar tidak ditemukan:",
                        img.getAttribute(
                            "src"
                        )
                    );

                }
            );

        });


    /* =====================================================
       TOOL ICON FALLBACK
    ===================================================== */

    document
        .querySelectorAll(
            ".tool-logo img"
        )
        .forEach(img => {

            const showFallback = () => {

                img.style.display =
                    "none";


                const fallback =
                    img.nextElementSibling;


                if (
                    fallback &&
                    fallback.classList.contains(
                        "tool-fallback"
                    )
                ) {

                    fallback.style.display =
                        "flex";

                }

            };


            /*
             * Jika gambar gagal dimuat
             */

            img.addEventListener(
                "error",
                showFallback
            );


            /*
             * Menangani kondisi ketika
             * gambar sudah gagal sebelum
             * event listener aktif.
             */

            if (
                img.complete &&
                img.naturalWidth === 0
            ) {

                showFallback();

            }

        });


    /* =====================================================
       EXTERNAL LINKS
    ===================================================== */

    document
        .querySelectorAll(
            'a[href^="http"]'
        )
        .forEach(link => {

            try {

                const linkUrl =
                    new URL(
                        link.href,
                        window.location.href
                    );


                /*
                 * Link eksternal dibuka
                 * pada tab baru.
                 */

                if (
                    linkUrl.hostname !==
                    window.location.hostname
                ) {

                    link.setAttribute(
                        "target",
                        "_blank"
                    );

                    link.setAttribute(
                        "rel",
                        "noopener noreferrer"
                    );

                }

            } catch (error) {

                console.warn(
                    "URL tidak valid:",
                    link.href
                );

            }

        });


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    if (currentYear) {

        currentYear.textContent =
            new Date()
                .getFullYear();

    }


    /* =====================================================
       VIDEO
    ===================================================== */

    document
        .querySelectorAll("video")
        .forEach(video => {

            /*
             * Pastikan video berbentuk block
             */

            video.style.display =
                "block";


            /*
             * Error handling
             */

            video.addEventListener(
                "error",
                () => {

                    const source =
                        video.querySelector(
                            "source"
                        );


                    console.warn(
                        "Video tidak dapat dimuat:",
                        source
                            ? source.src
                            : video.currentSrc
                    );

                }
            );


            /*
             * Cek source video
             */

            const source =
                video.querySelector(
                    "source"
                );


            if (
                source &&
                !source.getAttribute("src")
            ) {

                console.warn(
                    "Source video kosong."
                );

            }

        });


    /* =====================================================
       HERO INTRO
    ===================================================== */

    /*
     * Menandakan halaman sudah siap.
     * Bisa digunakan oleh CSS jika diperlukan.
     */

    document.body.classList.add(
        "page-ready"
    );


    /* =====================================================
       INITIAL UPDATE
    ===================================================== */

    updateHeader();

    updateActiveNavigation();

});