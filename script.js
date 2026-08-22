/* =========================================================
   KUMUL BUSINESS HUB PNG
   Website JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* ---------- MOBILE MENU ---------- */

    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", function () {
            navMenu.classList.toggle("active");

            const isOpen = navMenu.classList.contains("active");

            menuToggle.setAttribute("aria-expanded", isOpen);
            menuToggle.textContent = isOpen ? "✕" : "☰";
        });

        /* Close menu after clicking a navigation link */

        const navLinks = navMenu.querySelectorAll("a");

        navLinks.forEach(function (link) {
            link.addEventListener("click", function () {
                navMenu.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.textContent = "☰";
            });
        });
    }


    /* ---------- BUSINESS SEARCH ---------- */

    const searchInput = document.querySelector("#business-search");
    const categorySelect = document.querySelector("#business-category");
    const businessCards = document.querySelectorAll(".business-card");

    function filterBusinesses() {

        if (!searchInput || !categorySelect || !businessCards.length) {
            return;
        }

        const searchTerm = searchInput.value.toLowerCase().trim();
        const selectedCategory = categorySelect.value.toLowerCase();

        businessCards.forEach(function (card) {

            const cardText = card.textContent.toLowerCase();
            const cardCategory =
                card.getAttribute("data-category")?.toLowerCase() || "";

            const matchesSearch =
                cardText.includes(searchTerm);

            const matchesCategory =
                selectedCategory === "" ||
                cardCategory === selectedCategory;

            if (matchesSearch && matchesCategory) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }
        });
    }

    if (searchInput) {
        searchInput.addEventListener("input", filterBusinesses);
    }

    if (categorySelect) {
        categorySelect.addEventListener("change", filterBusinesses);
    }


    /* ---------- CONTACT FORM ---------- */

    const contactForm = document.querySelector("#contact-form");

    if (contactForm) {

        contactForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const name =
                document.querySelector("#name")?.value.trim();

            const email =
                document.querySelector("#email")?.value.trim();

            const message =
                document.querySelector("#message")?.value.trim();

            if (!name || !email || !message) {
                alert("Please complete all required fields.");
                return;
            }

            alert(
                "Thank you, " +
                name +
                "! Your message has been received."
            );

            contactForm.reset();
        });
    }


    /* ---------- SMOOTH SCROLL ---------- */

    const pageLinks = document.querySelectorAll('a[href^="#"]');

    pageLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId =
                this.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });


    /* ---------- CURRENT YEAR ---------- */

    const yearElement =
        document.querySelector("#current-year");

    if (yearElement) {
        yearElement.textContent =
            new Date().getFullYear();
    }


    /* ---------- BACK TO TOP ---------- */

    const backToTop =
        document.querySelector("#back-to-top");

    if (backToTop) {

        window.addEventListener("scroll", function () {

            if (window.scrollY > 500) {
                backToTop.classList.add("show");
            } else {
                backToTop.classList.remove("show");
            }
        });

        backToTop.addEventListener("click", function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

});