document.addEventListener("DOMContentLoaded", () => {
  // Ensure the page starts at the top
  window.scrollTo(0, 0);

  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger);

  // Animate header opacity and position on scroll
  const header = document.getElementById("header");

  gsap.to(header, {
    scrollTrigger: {
      trigger: header,
      start: "top top",
      end: "bottom top",
      scrub: true,
      markers: false,
    },
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power3.out",
  });

  // Add sticky header effects (change background and shadow when scrolled)
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      header.classList.add("header-scrolled");
    } else {
      header.classList.remove("header-scrolled");
    }
  });

  // Mobile Menu Animation
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");

  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => {
      // Toggle the mobile menu visibility with GSAP
      const isOpen = mobileMenu.classList.contains("open");

      if (isOpen) {
        gsap.to(mobileMenu, {
          opacity: 0,
          y: -30,
          duration: 0.5,
          ease: "power3.in",
          onComplete: () => {
            mobileMenu.classList.remove("open");
            mobileMenu.style.pointerEvents = "none"; // Disable interaction when closed
          }
        });
      } else {
        mobileMenu.classList.add("open");
        mobileMenu.style.pointerEvents = "auto"; // Enable interaction when open

        gsap.fromTo(mobileMenu, {
          opacity: 0,
          y: -30
        }, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out"
        });
      }
    });
  }

  // Smooth Scroll for Sign Up Button
  const signUpButton = document.querySelector("a[href='#contact']");
  signUpButton.addEventListener("click", (event) => {
    event.preventDefault();
    const contactSection = document.getElementById("contact");
    contactSection.scrollIntoView({ behavior: "smooth" });
  });
});

// Custom Thank you Message
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Fetch the form data
  const formData = new FormData(this);

  // Send the form data using fetch API
  fetch(this.action, {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        document.getElementById("responseMessage").classList.remove("hidden");
        this.reset();
      } else {
        console.error("Form submission failed");
      }
    })
    .catch((error) => {
      console.error("Error submitting form:", error);
    });
});

