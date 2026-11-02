
/* =========================================================
   KUMUL BUSINESS HUB PNG
   WEBSITE FUNCTIONALITY
   Version 2.1
   ========================================================= */


/* 1. MOBILE NAVIGATION */

const menuButton = document.querySelector(".menu-btn");
const mainNav = document.querySelector("#mainNav");

if (menuButton && mainNav) {

    menuButton.addEventListener("click", function () {

        const isOpen = mainNav.classList.toggle("active");

        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

        menuButton.textContent = isOpen ? "×" : "☰";

    });

    // Close menu after selecting a navigation link

    mainNav.querySelectorAll("a").forEach(function (link) {

        link.addEventListener("click", function () {

            mainNav.classList.remove("active");

            menuButton.setAttribute("aria-expanded", "false");
            menuButton.setAttribute("aria-label", "Open navigation menu");

            menuButton.textContent = "☰";

        });

    });

}


/* 2. BUSINESS DIRECTORY SEARCH AND CATEGORY FILTER */

const searchInput = document.querySelector("#searchInput");
const categoryFilter = document.querySelector("#categoryFilter");
const businessList = document.querySelector("#businessList");
const searchButton = document.querySelector(".search-box button");


function filterBusinesses() {

    if (!businessList) {
        return;
    }

    const searchTerm = searchInput
        ? searchInput.value.toLowerCase().trim()
        : "";

    const selectedCategory = categoryFilter
        ? categoryFilter.value
        : "all";

    const businessCards = businessList.querySelectorAll(".business-card");

    let resultsFound = 0;

    businessCards.forEach(function (card) {

        const businessText = card.textContent.toLowerCase();

        const businessCategory = card.dataset.category;

        const matchesSearch = businessText.includes(searchTerm);

        const matchesCategory =
            selectedCategory === "all" ||
            businessCategory === selectedCategory;

        const isVisible = matchesSearch && matchesCategory;

        card.style.display = isVisible ? "" : "none";

        if (isVisible) {
            resultsFound++;
        }

    });


    // Display a message when no businesses match

    let noResults = businessList.querySelector(".no-results");

    if (resultsFound === 0) {

        if (!noResults) {

            noResults = document.createElement("p");

            noResults.className = "no-results";

            noResults.textContent =
                "No businesses match your search or selected category.";

            businessList.appendChild(noResults);

        }

    } else if (noResults) {

        noResults.remove();

    }

}


// Search while typing

if (searchInput) {

    searchInput.addEventListener("input", filterBusinesses);

}


// Filter when a category is selected

if (categoryFilter) {

    categoryFilter.addEventListener("change", filterBusinesses);

}


// Search button

if (searchButton) {

    searchButton.addEventListener("click", function (event) {

        event.preventDefault();

        filterBusinesses();

    });

}


/* 3. CONTACT FORM DEMONSTRATION */

const businessForm = document.querySelector("#businessForm");

if (businessForm) {

    businessForm.addEventListener("submit", function (event) {

        event.preventDefault();

        alert(
            "Thank you for your interest in Kumul Business Hub PNG. " +
            "This is currently a demonstration form. " +
            "Your information has not been stored or sent."
        );

        businessForm.reset();

    });

}


/* 4. INITIALISE BUSINESS DIRECTORY */

filterBusinesses();


/* =========================================================
   END OF KUMUL BUSINESS HUB PNG SCRIPT
   ========================================================= */
