// GSAP and ScrollTrigger Animations
document.addEventListener("DOMContentLoaded", () => {
  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Apply fade-in animation to all elements with the class "fade-in"
  gsap.utils.toArray(".fade-in").forEach((element) => {
    gsap.from(element, {
      opacity: 0,
      y: 40, // Start position (slide up from 40px below)
      duration: 1.5, // Duration of the animation
      ease: "power3.out", // Easing function for smooth animation
      scrollTrigger: {
        trigger: element, // Element to trigger animation
        start: "top 85%", // Start animation when the top of the element is 85% from viewport top
        toggleActions: "play none none none", // Play animation once
        markers: false, // Set to true for debugging (optional)
      },
    });
  });
});

// Prevent automatic scroll on page load
window.addEventListener("load", () => {
  window.scrollTo(0, 0); // Scroll to top on load
  document.documentElement.style.scrollBehavior = "auto"; // Disable smooth scrolling on load
});

// Smooth Scroll Effect for Sign Up Button
const signUpButton = document.querySelector("a[href='#contact']");
signUpButton.addEventListener("click", (event) => {
  event.preventDefault(); // Prevent the default anchor behavior
  const contactSection = document.getElementById("contact");
  contactSection.scrollIntoView({ behavior: "smooth" });

  // Re-enable smooth scrolling after the button is clicked
  document.documentElement.style.scrollBehavior = "smooth"; // Enable smooth scrolling after click
});

// Contact Form Submission
const form = document.getElementById("contactForm");
const responseMessage = document.getElementById("responseMessage");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  try {
    console.log(`Form submitted: ${name}, ${email}, ${message}`);
    responseMessage.textContent = "¡Gracias por contactarnos!";
    responseMessage.classList.remove("hidden");
  } catch (error) {
    console.error("Error sending form:", error);
  }
});
