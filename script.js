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
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        header.classList.add("header-scrolled");
      } else {
        header.classList.remove("header-scrolled");
      }
    });
  
    // Mobile Menu Animation using GSAP
    const hamburger = document.getElementById("hamburger");
    const mobileMenu = document.getElementById("mobileMenu");
    if (hamburger && mobileMenu) {
      hamburger.addEventListener("click", () => {
        // Toggle the mobile menu visibility with GSAP animation
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
          gsap.fromTo(mobileMenu, { opacity: 0, y: -30 }, {
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
    if (signUpButton) {
      signUpButton.addEventListener("click", (event) => {
        event.preventDefault();
        const contactSection = document.getElementById("contact");
        contactSection.scrollIntoView({ behavior: "smooth" });
      });
    }
  
    // Handle form submission with EmailJS
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
      contactForm.addEventListener("submit", function(e) {
        e.preventDefault(); // Prevent default form submission

        // Initialize EmailJS
        emailjs.init("secrets.API_KEY");
  
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const message = form.message.value;
  
        // Send email via EmailJS
        emailjs.send("secrets.SERVICE_KEY","secrets.TEMPLATE_KEY", {
          to_name: "EngConverse",  // Set this to the appropriate value
          from_name: name,
          from_email: email,
          message: message,
        }).then(
          function(response) {
            console.log("SUCCESS!", response.status, response.text);
            document.getElementById("responseMessage").classList.remove("hidden");
            form.reset();
          },
          function(error) {
            console.error("FAILED...", error);
          }
        );
      });
    }
  });
  