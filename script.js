
/* =========================================================
   MORO DIGITAL
   WEBSITE FUNCTIONALITY
   Version 3.0
   CONNECT • INNOVATE • GROW
   ========================================================= */


/* 1. MOBILE NAVIGATION */

const menuButton = document.querySelector(".menu-btn");
const mainNav = document.querySelector("#mainNav");

function closeMenu() {

    if (!menuButton || !mainNav) return;

    mainNav.classList.remove("active");

    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute(
        "aria-label",
        "Open navigation menu"
    );

    menuButton.textContent = "☰";
}

if (menuButton && mainNav) {

    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation menu");

    menuButton.addEventListener("click", function () {

        const isOpen = mainNav.classList.toggle("active");

        menuButton.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuButton.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );

        menuButton.textContent = isOpen ? "×" : "☰";

    });

    // Close menu after selecting a navigation link

    mainNav.querySelectorAll("a").forEach(function (link) {

        link.addEventListener("click", closeMenu);

    });

    // Close menu when clicking outside

    document.addEventListener("click", function (event) {

        const clickedInsideMenu = mainNav.contains(event.target);
        const clickedMenuButton = menuButton.contains(event.target);

        if (!clickedInsideMenu && !clickedMenuButton) {
            closeMenu();
        }

    });

    // Close menu using Escape key

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {
            closeMenu();
        }

    });

}


/* 2. TECHNOLOGY MARKETPLACE SEARCH */

const searchInput = document.querySelector("#searchInput");
const categoryFilter = document.querySelector("#categoryFilter");
const businessList = document.querySelector("#businessList");
const searchButton = document.querySelector(".search-box button");


function filterProducts() {

    if (!businessList) return;

    const searchTerm = searchInput
        ? searchInput.value.toLowerCase().trim()
        : "";

    const selectedCategory = categoryFilter
        ? categoryFilter.value
        : "all";

    const productCards = businessList.querySelectorAll(
        ".business-card"
    );

    let resultsFound = 0;

    productCards.forEach(function (card) {

        const productText = card.textContent.toLowerCase();

        const productCategory = card.dataset.category || "";

        const matchesSearch = productText.includes(searchTerm);

        const matchesCategory =
            selectedCategory === "all" ||
            productCategory === selectedCategory;

        const isVisible = matchesSearch && matchesCategory;

        card.hidden = !isVisible;

        if (isVisible) {
            resultsFound++;
        }

    });


    // Show or remove the no-results message

    let noResults = businessList.querySelector(".no-results");

    if (resultsFound === 0) {

        if (!noResults) {

            noResults = document.createElement("p");

            noResults.className = "no-results";

            noResults.textContent =
                "No products found. Try another search or category.";

            businessList.appendChild(noResults);

        }

    } else if (noResults) {

        noResults.remove();

    }

}


// Search automatically while typing

if (searchInput) {

    searchInput.addEventListener(
        "input",
        filterProducts
    );

}


// Filter products when category changes

if (categoryFilter) {

    categoryFilter.addEventListener(
        "change",
        filterProducts
    );

}


// Search button

if (searchButton) {

    searchButton.addEventListener("click", function (event) {

        event.preventDefault();

        filterProducts();

    });

}


// Allow Enter key to run a search

if (searchInput) {

    searchInput.addEventListener("keydown", function (event) {

        if (event.key === "Enter") {

            event.preventDefault();

            filterProducts();

        }

    });

}


/* 3. MARKETPLACE WHATSAPP ENQUIRIES */

document.querySelectorAll(".business-card button").forEach(
    function (button) {

        button.addEventListener("click", function () {

            const productCard = button.closest(".business-card");

            if (!productCard) return;

            const productName =
                productCard.querySelector("h3")?.textContent.trim()
                || "a product";

            const message =
                "Hello Moro Digital, I am interested in " +
                productName +
                ". Please provide more information about availability and pricing.";

            const whatsappURL =
                "https://wa.me/67578336234?text=" +
                encodeURIComponent(message);

            window.open(
                whatsappURL,
                "_blank",
                "noopener,noreferrer"
            );

        });

    }
);


/* 4. INITIALISE MARKETPLACE */

filterProducts();


/* =========================================================
   END OF MORO DIGITAL SCRIPT
   ========================================================= */

// MORO DIGITAL - WHATSAPP CUSTOMER ENQUIRY FORM

const enquiryForm = document.querySelector("#serviceEnquiryForm");

if (enquiryForm) {
    enquiryForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.querySelector("#customerName").value.trim();
        const phone = document.querySelector("#customerPhone").value.trim();
        const service = document.querySelector("#serviceType").value;
        const message = document.querySelector("#enquiryMessage").value.trim();

        if (!name || !phone || !service || !message) {
            alert("Please complete all enquiry fields.");
            return;
        }

        const whatsappMessage =
            "MORO DIGITAL - CUSTOMER ENQUIRY\n\n" +
            "Name: " + name + "\n" +
            "Phone: " + phone + "\n" +
            "Service Required: " + service + "\n\n" +
            "Enquiry Details:\n" + message;

        const whatsappURL =
            "https://wa.me/67578336234?text=" +
            encodeURIComponent(whatsappMessage);

        window.open(whatsappURL, "_blank", "noopener,noreferrer");
    });
}
