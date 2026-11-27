
"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menuToggle");
  const navigation = document.getElementById("navigation");
  const currentYear = document.getElementById("currentYear");
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  // Automatically update the copyright year.
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  // Mobile navigation.
  if (menuToggle && navigation) {
    menuToggle.addEventListener("click", function () {
      const isOpen = navigation.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );
    });

    navigation.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navigation.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
      });
    });
  }

  // Prepare an enquiry in the visitor's email application.
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const formData = new FormData(contactForm);
      const name = String(formData.get("name") || "").trim();
      const email = String(formData.get("email") || "").trim();
      const service = String(formData.get("service") || "").trim();
      const message = String(formData.get("message") || "").trim();

      if (!name || !email || !service || !message) {
        if (formStatus) {
          formStatus.textContent = "Please complete all fields before continuing.";
        }
        return;
      }

      const subject = encodeURIComponent("Moro Digital enquiry: " + service);
      const body = encodeURIComponent(
        "Hello Moro Digital,\n\n" +
        "Name: " + name + "\n" +
        "Email: " + email + "\n" +
        "Area of interest: " + service + "\n\n" +
        "Message:\n" + message + "\n\n" +
        "Sent from the Moro Digital website."
      );

      if (formStatus) {
        formStatus.textContent = "Opening your email application...";
      }

      window.location.href =
        "mailto:laiamsakiasmoro@gmail.com?subject=" +
        subject + "&body=" + body;
    });
  }
});
