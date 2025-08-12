document.addEventListener("DOMContentLoaded", () => {
  // Hero animation
  const heroTitle = document.querySelector(".animate-hero");
  const heroBar = document.querySelector(".hero-bar");
  setTimeout(() => {
    if (heroTitle) {
      heroTitle.style.opacity = "1";
      heroTitle.style.transform = "translateY(0)";
    }
    if (heroBar) heroBar.style.width = "60%";
  }, 100);

  // Glow once on hero button
  const heroBtn = document.querySelector(".hero-btn");
  setTimeout(() => {
    heroBtn?.classList.add("glow");
    setTimeout(() => heroBtn?.classList.remove("glow"), 500);
  }, 1000);

  // Glow once on proto-btn
  const protoBtn = document.querySelector(".proto-btn");
  setTimeout(() => {
    protoBtn?.classList.add("glow");
    setTimeout(() => protoBtn?.classList.remove("glow"), 500);
  }, 2000);

  // IntersectionObserver for fade-in cards
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));

  // ---- Instagram-like lightbox ----
  const modal = document.getElementById("lightbox");
  const modalImg = modal.querySelector("img");
  const closeBtn = modal.querySelector(".modal-close");

  document.querySelectorAll(".insta-item img").forEach(img => {
    img.addEventListener("click", () => {
      const src = img.getAttribute("data-full") || img.src;
      modalImg.src = src;
      modal.classList.add("show");
      modal.setAttribute("aria-hidden", "false");
    });
  });

  const closeModal = () => {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
    modalImg.src = "";
  };
  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target === closeBtn) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("show")) closeModal();
  });
});
