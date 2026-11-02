
/* =========================================================
   KUMUL BUSINESS HUB PNG
   Main Website JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* -----------------------------------------------------
       1. MOBILE NAVIGATION
    ----------------------------------------------------- */

    const menuButton = document.querySelector(".menu-btn");
    const mainNav = document.querySelector("#mainNav");

    if (menuButton && mainNav) {

        menuButton.addEventListener("click", function () {

            const isOpen = mainNav.classList.toggle("active");

            menuButton.setAttribute("aria-expanded", isOpen);
            menuButton.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );

            menuButton.textContent = isOpen ? "✕" : "☰";

        });

        // Close the menu after selecting a navigation link.
        mainNav.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {

                mainNav.classList.remove("active");

                menuButton.setAttribute("aria-expanded", "false");
                menuButton.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

                menuButton.textContent = "☰";

            });

        });

    }


    /* -----------------------------------------------------
       2. BUSINESS DIRECTORY SEARCH
    ----------------------------------------------------- */

    const searchInput = document.querySelector("#searchInput");
    const businessList = document.querySelector("#businessList");
    const searchButton = document.querySelector(".search-box button");

    function searchBusinesses() {

        if (!searchInput || !businessList) {
            return;
        }

        const searchTerm = searchInput.value
            .toLowerCase()
            .trim();

        const businessCards = businessList.querySelectorAll(
            ".business-card"
        );

        let resultsFound = 0;

        businessCards.forEach(function (card) {

            const businessDetails = card.textContent.toLowerCase();

            const matches = businessDetails.includes(searchTerm);

            card.style.display = matches ? "" : "none";

            if (matches) {
                resultsFound++;
            }

        });

        // Display a message when no businesses match.
        let noResults = businessList.querySelector(".no-results");

        if (resultsFound === 0) {

            if (!noResults) {

                noResults = document.createElement("p");

                noResults.className = "no-results";

                noResults.textContent =
                    "No businesses found. Please try another search.";

                businessList.appendChild(noResults);

            }

        } else if (noResults) {

            noResults.remove();

        }

    }

    // Search automatically while typing.
    if (searchInput) {

        searchInput.addEventListener("input", searchBusinesses);

    }

    // Search when the Search button is tapped.
    if (searchButton) {

        searchButton.addEventListener("click", searchBusinesses);

    }


    /* -----------------------------------------------------
       3. BUSINESS REGISTRATION FORM
    ----------------------------------------------------- */

    const businessForm = document.querySelector("#businessForm");

    if (businessForm) {

        businessForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const formData = new FormData(businessForm);

            const businessName = formData.get("businessName")
                ?.toString()
                .trim();

            const email = formData.get("email")
                ?.toString()
                .trim();

            if (!businessName || !email) {

                alert("Please enter your business name and email address.");

                return;

            }

            alert(
                "Thank you for submitting " +
                businessName +
                ". This is a demonstration form. Your details have not yet been sent or saved."
            );

            businessForm.reset();

        });

    }


    /* -----------------------------------------------------
       4. SMOOTH PAGE NAVIGATION
    ----------------------------------------------------- */

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    /* -----------------------------------------------------
       5. WEBSITE INITIALIZATION
    ----------------------------------------------------- */

    console.log("Kumul Business Hub PNG website initialized.");

});
