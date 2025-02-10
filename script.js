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

  // Add sticky header effects
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
      const isOpen = mobileMenu.classList.contains("open");
      if (isOpen) {
        gsap.to(mobileMenu, {
          opacity: 0,
          y: -30,
          duration: 0.5,
          ease: "power3.in",
          onComplete: () => {
            mobileMenu.classList.remove("open");
            mobileMenu.style.pointerEvents = "none";
          }
        });
      } else {
        mobileMenu.classList.add("open");
        mobileMenu.style.pointerEvents = "auto";
        gsap.fromTo(mobileMenu, 
          { opacity: 0, y: -30 }, 
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out"
          }
        );
      }
    });
  }

  // Privacy Policy Toggle and Modal Functionality
  const toggleSwitch = document.getElementById("toggleSwitch");
  const toggleCircle = document.getElementById("toggleCircle");
  let isToggled = false;

  toggleSwitch.addEventListener("click", () => {
    isToggled = !isToggled;
    if (isToggled) {
      gsap.to(toggleSwitch, {
        backgroundColor: "#2563EB", // blue-600
        duration: 0.3
      });
      gsap.to(toggleCircle, {
        x: 20,
        duration: 0.3
      });
    } else {
      gsap.to(toggleSwitch, {
        backgroundColor: "#E5E7EB", // gray-200
        duration: 0.3
      });
      gsap.to(toggleCircle, {
        x: 0,
        duration: 0.3
      });
    }
  });

  // Privacy Policy Modal
  const privacyModal = document.getElementById("privacyModal");
  const privacyPolicyLink = document.getElementById("privacyPolicyLink");
  const closeModal = document.getElementById("closeModal");

  privacyPolicyLink.addEventListener("click", (e) => {
    e.preventDefault();
    privacyModal.classList.remove("hidden");
    gsap.fromTo(privacyModal.querySelector(".bg-white"), 
      { opacity: 0, scale: 0.95 },
      { 
        opacity: 1, 
        scale: 1, 
        duration: 0.3, 
        ease: "power3.out" 
      }
    );
  });

  const closeModalWithAnimation = () => {
    gsap.to(privacyModal.querySelector(".bg-white"), {
      opacity: 0,
      scale: 0.95,
      duration: 0.2,
      ease: "power3.in",
      onComplete: () => privacyModal.classList.add("hidden")
    });
  };

  closeModal.addEventListener("click", closeModalWithAnimation);
  privacyModal.addEventListener("click", (e) => {
    if (e.target === privacyModal) closeModalWithAnimation();
  });

  // Handle form submission with EmailJS
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
      e.preventDefault();

      // Check if privacy policy is accepted
      if (!isToggled) {
        const errorMessage = document.getElementById("responseMessage");
        errorMessage.textContent = "Por favor, acepta la política de privacidad antes de enviar el formulario.";
        errorMessage.classList.remove("hidden");
        errorMessage.classList.add("text-red-600");
        gsap.fromTo(errorMessage,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.3 }
        );
        return;
      }

      // Initialize EmailJS
      emailjs.init("secrets.API_KEY");

      const form = e.target;
      
      // Combine first and last name for from_name parameter
      const firstName = form.querySelector('#first-name').value;
      const lastName = form.querySelector('#last-name').value;
      const fullName = `${firstName} ${lastName}`.trim();
      
      const email = form.querySelector('#email').value;
      const phone = form.querySelector('#phone-number').value;
      const messageText = form.querySelector('#message').value;
      
      // Combine message with phone number if provided
      const completeMessage = phone 
        ? `${messageText}\n\nNúmero de teléfono: ${phone}`
        : messageText;

      // Prepare template parameters according to your EmailJS template
      const templateParams = {
        to_name: "EngConverse",
        from_name: fullName,
        from_email: email,
        message: completeMessage,
        reply_to: email  // Set reply_to to the user's email
      };

      // Show loading state with GSAP animation
      const submitButton = form.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.innerHTML;
      submitButton.disabled = true;
      gsap.to(submitButton, {
        opacity: 0.7,
        duration: 0.3
      });
      submitButton.innerHTML = 'Enviando...';

      // Send email via EmailJS
      emailjs.send("secrets.SERVICE_KEY", "secrets.TEMPLATE_KEY", templateParams)
        .then(
          function(response) {
            console.log("SUCCESS!", response.status, response.text);
            const responseMessage = document.getElementById("responseMessage");
            responseMessage.textContent = "¡Mensaje enviado con éxito!";
            responseMessage.classList.remove("hidden", "text-red-600");
            responseMessage.classList.add("text-green-600");
            gsap.fromTo(responseMessage,
              { opacity: 0, y: -20 },
              { opacity: 1, y: 0, duration: 0.3 }
            );
            form.reset();
            
            // Reset toggle with animation
            isToggled = false;
            gsap.to(toggleSwitch, {
              backgroundColor: "#E5E7EB",
              duration: 0.3
            });
            gsap.to(toggleCircle, {
              x: 0,
              duration: 0.3
            });
          },
          function(error) {
            console.error("FAILED...", error);
            const responseMessage = document.getElementById("responseMessage");
            responseMessage.textContent = "Error al enviar el mensaje. Por favor, inténtalo de nuevo.";
            responseMessage.classList.remove("hidden", "text-green-600");
            responseMessage.classList.add("text-red-600");
            gsap.fromTo(responseMessage,
              { opacity: 0, y: -20 },
              { opacity: 1, y: 0, duration: 0.3 }
            );
          }
        )
        .finally(() => {
          // Reset button state with animation
          gsap.to(submitButton, {
            opacity: 1,
            duration: 0.3,
            onComplete: () => {
              submitButton.disabled = false;
              submitButton.innerHTML = originalButtonText;
            }
          });
        });
    });
  }
});