document.addEventListener("DOMContentLoaded", () => {
  const navHeight = 78;

  // Smooth scrolling offset for fixed navbar.
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const targetId = anchor.getAttribute("href");
      if (!targetId || targetId === "#") return;
      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      event.preventDefault();
      const top = targetEl.getBoundingClientRect().top + window.pageYOffset - navHeight;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });

  // Section reveal animation.
  const revealItems = document.querySelectorAll(".reveal-up");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealItems.forEach((item) => observer.observe(item));

  // Gallery modal image switch.
  const galleryModalEl = document.getElementById("galleryModal");
  const modalImage = document.getElementById("modalGalleryImage");
  const galleryModal = galleryModalEl ? new bootstrap.Modal(galleryModalEl) : null;

  document.querySelectorAll(".gallery-image").forEach((img) => {
    img.addEventListener("click", () => {
      if (!galleryModal || !modalImage) return;
      modalImage.src = img.src;
      modalImage.alt = img.alt;
      galleryModal.show();
    });
  });

  // Auto popup after 3 seconds.
  const leadPopupEl = document.getElementById("leadPopup");
  if (leadPopupEl) {
    const leadPopup = new bootstrap.Modal(leadPopupEl);
    setTimeout(() => {
      leadPopup.show();
    }, 3000);
  }
})
