document.addEventListener("DOMContentLoaded", () => {
  // Hero in
  const heroTitle = document.querySelector(".animate-hero");
  const heroBar = document.querySelector(".hero-bar");
  setTimeout(() => {
    if (heroTitle) { heroTitle.style.opacity = "1"; heroTitle.style.transform = "translateY(0)"; }
    if (heroBar) heroBar.style.width = "62%";
  }, 80);

  // Glow once on proto button
  const protoBtn = document.querySelector(".proto-btn");
  setTimeout(() => {
    if (protoBtn) {
      protoBtn.classList.add("glow");
      setTimeout(() => protoBtn.classList.remove("glow"), 520);
    }
  }, 1400);

  // Stagger reveal on scroll（ばららら）
  const reveals = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const delay = Number(e.target.dataset.delay || 0) * 90; // 0,90,180...
        setTimeout(() => e.target.classList.add("show"), delay);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  reveals.forEach(el => io.observe(el));

  // Instagram lightbox（クリック拡大：修正済み）
  const modal = document.getElementById("lightbox");
  const modalImg = modal.querySelector("img");
  const closeBtn = modal.querySelector(".modal-close");

  document.querySelector(".insta-grid")?.addEventListener("click", (ev) => {
    const img = ev.target.closest(".insta-item img");
    if (!img) return;
    const src = img.getAttribute("data-full") || img.src;
    modalImg.src = src;
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
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
