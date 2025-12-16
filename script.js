/* =========================================
   UNI PORTFOLIO - script.js
   完全版（これ1つでOK）
   - Works画像のみモーダル表示
   - Instagram画像は対象外
   - ふわっとスクロール表示
========================================= */

(() => {
  "use strict";

  /* -----------------------------
     ユーティリティ
  ----------------------------- */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  const prefersReducedMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* -----------------------------
     1. ふわっと表示（reveal）
     .reveal を付けた要素が対象
  ----------------------------- */
const setupReveal = () => {
  const targets = $$(".reveal");
  if (!targets.length) return;

  // 省エネ/安全：スマホは最初から全部表示（CSSでも保険済み）
  if (window.matchMedia("(max-width: 820px)").matches) {
    targets.forEach(el => el.classList.add("is-visible"));
    return;
  }

  // Reduced motion は全部表示
  if (prefersReducedMotion) {
    targets.forEach(el => el.classList.add("is-visible"));
    return;
  }

  // IntersectionObserverが無い/壊れた時の保険
  if (!("IntersectionObserver" in window)) {
    targets.forEach(el => el.classList.add("is-visible"));
    return;
  }

  const io = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.01, rootMargin: "0px 0px -10% 0px" }
  );

  targets.forEach(el => io.observe(el));

  // さらに保険：初期表示で見えてるのに発火しない端末向け
  requestAnimationFrame(() => {
    targets.forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.95) el.classList.add("is-visible");
    });
  });
};
  /* -----------------------------
     2. Works画像モーダル
     対象：.work-image img
     除外：Instagram
  ----------------------------- */
  const setupWorkModal = () => {
    const modal = $("#imageModal");
    const modalImg = $("#imageModalImg");
    if (!modal || !modalImg) return;

    const targets = $$(".work-image img");
    if (!targets.length) return;

    const open = (src, alt = "") => {
      modalImg.src = src;
      modalImg.alt = alt;
      modal.classList.add("show");
      modal.setAttribute("aria-hidden", "false");

      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    };

    const close = () => {
      modal.classList.remove("show");
      modal.setAttribute("aria-hidden", "true");

      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";

      setTimeout(() => {
        modalImg.src = "";
        modalImg.alt = "";
      }, 100);
    };

    // クリックで開く
    targets.forEach(img => {
      img.style.cursor = "zoom-in";
      img.addEventListener("click", e => {
        e.preventDefault();
        open(img.src, img.alt || "");
      });
    });

    // 背景クリックで閉じる
    modal.addEventListener("click", close);

    // Escで閉じる
    window.addEventListener("keydown", e => {
      if (e.key === "Escape" && modal.classList.contains("show")) {
        close();
      }
    });
  };

  /* -----------------------------
     初期化
  ----------------------------- */
  const init = () => {
    setupReveal();
    setupWorkModal();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
