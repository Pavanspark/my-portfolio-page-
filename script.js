// Typing effect
function typeHTMLCode(el, code, speed = 50) {
  el.innerHTML = "";
  let i = 0;
  function typeChar() {
    if (i < code.length) {
      el.innerHTML += code.charAt(i);
      i++;
      setTimeout(typeChar, speed);
    }
  }
  typeChar();
}

// Handle section switching with GSAP
const buttons = document.querySelectorAll(".menu button");
const sections = document.querySelectorAll(".tab-section");
const typingDisplay = document.querySelector(".typing-display");

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const targetId = btn.getAttribute("data-section");
    const targetSection = document.getElementById(targetId);

    // 🔹 Highlight active button
    buttons.forEach(b => b.classList.remove("active-btn"));
    btn.classList.add("active-btn");

    // Hide current active section with GSAP
    const activeSection = document.querySelector(".tab-section.active");
    if (activeSection && activeSection !== targetSection) {
      gsap.to(activeSection, {
        duration: 0.5,
        opacity: 0,
        x: -50,
        onComplete: () => {
          activeSection.classList.remove("active");
          activeSection.style.opacity = "";
          activeSection.style.transform = "";

          // Show target section
          targetSection.classList.add("active");
          gsap.fromTo(
            targetSection,
            { opacity: 0, x: 50 },
            { duration: 0.5, opacity: 1, x: 0 }
          );

          // Run typing effect
          const code = targetSection.getAttribute("data-code");
          typeHTMLCode(typingDisplay, code, 50);
        }
      });
    } else if (!activeSection) {
      // First load
      targetSection.classList.add("active");
      gsap.fromTo(
        targetSection,
        { opacity: 0, x: 50 },
        { duration: 0.5, opacity: 1, x: 0 }
      );
      const code = targetSection.getAttribute("data-code");
      typeHTMLCode(typingDisplay, code, 50);
    }
  });
});

// Initial load animation
window.addEventListener("DOMContentLoaded", () => {
  const firstSection = document.querySelector(".tab-section.active");
  if (firstSection) {
    const code = firstSection.getAttribute("data-code");
    typeHTMLCode(typingDisplay, code, 50);
    gsap.from(firstSection, { duration: 0.5, opacity: 0, y: 30 });

    // 🔹 Mark first button as active on load
    const firstBtn = document.querySelector(`.menu button[data-section="${firstSection.id}"]`);
    if (firstBtn) firstBtn.classList.add("active-btn");
  }
});

const text = "I am a Computer Science graduate with a strong foundation in Java, Python, and web development. Passionate about problem-solving and eager to apply technical expertise in a dynamic and collaborative environment. Seeking an entry-level role to contribute effectively while continuously learning and growing.";

let i = 0;
const speed = 40; // typing speed in ms

function typeEffect() {
  if (i < text.length) {
    document.getElementById("typing-text").textContent += text.charAt(i);
    i++;
    setTimeout(typeEffect, speed);
  }
}

// Run animation when page loads
window.onload = typeEffect;
