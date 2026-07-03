const WA_PHONE = "6282228178439";

function buildWhatsAppUrl(message) {
  return `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(message)}`;
}

function openWhatsApp(packageName = "Konsultasi perjalanan Delta Tour") {
  const lowerName = packageName.toLowerCase();
  const isRental = ["sewa", "mobil", "hiace", "elf", "armada", "driver"].some((keyword) =>
    lowerName.includes(keyword)
  );

  const message = isRental
    ? `Halo Admin Delta Tour,
Saya ingin konsultasi sewa mobil / armada:

Layanan: ${packageName}
Tanggal:
Jumlah Penumpang:
Tujuan / Rute:
Titik Jemput:
Catatan:`
    : `Halo Admin Delta Tour,
Saya ingin tanya paket wisata:

Paket: ${packageName}
Tanggal Trip:
Jumlah Peserta:
Titik Jemput:
Catatan:`;
  window.open(buildWhatsAppUrl(message), "_blank");
}

function openGeneralWhatsApp() {
  const message = `Halo Admin Delta Tour,
Saya ingin konsultasi perjalanan wisata dari Jember.`;
  window.open(buildWhatsAppUrl(message), "_blank");
}


document.addEventListener("DOMContentLoaded", () => {

  // Navbar scroll shadow effect
  const header = document.querySelector(".site-header");
  if (header) {
    const handleScroll = () => {
      header.classList.toggle("scrolled", window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Run once on load
  }

  // Scroll down indicator click
  const scrollDownBtn = document.querySelector("[data-scroll-down]");
  if (scrollDownBtn) {
    scrollDownBtn.addEventListener("click", () => {
      const nextSection = document.querySelector("#paket-favorit");
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  document.querySelectorAll("[data-whatsapp]").forEach((button) => {
    button.addEventListener("click", () => openWhatsApp(button.dataset.whatsapp));
  });

  document.querySelectorAll("[data-whatsapp-general]").forEach((button) => {
    button.addEventListener("click", openGeneralWhatsApp);
  });

  document.querySelectorAll("[data-filter-group]").forEach((group) => {
    const targetSelector = group.dataset.filterGroup;
    const buttons = group.querySelectorAll("[data-filter]");
    const items = document.querySelectorAll(targetSelector);

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const filter = button.dataset.filter;
        buttons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        items.forEach((item) => {
          const category = item.dataset.category || "";
          const show = filter === "Semua" || category === filter;
          item.style.display = show ? "" : "none";
        });
      });
    });
  });

  const modal = document.querySelector(".modal");
  if (modal) {
    const modalImage = modal.querySelector("[data-modal-image]");
    const modalTitle = modal.querySelector("[data-modal-title]");
    const modalCategory = modal.querySelector("[data-modal-category]");
    const modalDetail = modal.querySelector("[data-modal-detail]");
    const closeModal = () => modal.classList.remove("open");

    document.querySelectorAll("[data-gallery-item]").forEach((item) => {
      item.addEventListener("click", () => {
        modalImage.src = item.dataset.image;
        modalImage.alt = item.dataset.title;
        modalTitle.textContent = item.dataset.title;
        modalCategory.textContent = item.dataset.category;
        if (modalDetail && item.dataset.detailUrl) {
          modalDetail.href = item.dataset.detailUrl;
        }
        modal.classList.add("open");
      });
    });

    modal.querySelector("[data-modal-close]").addEventListener("click", closeModal);
    modal.addEventListener("click", (event) => {
      if (event.target === modal) closeModal();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeModal();
    });
  }

  const contactForm = document.querySelector("#contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(contactForm);
      const message = `Halo Admin Delta Tour,
Saya ingin konsultasi perjalanan wisata.

Nama: ${formData.get("nama") || ""}
Nomor WhatsApp: ${formData.get("nomor") || ""}
Paket: ${formData.get("paket") || ""}
Tanggal Trip: ${formData.get("tanggal") || ""}
Jumlah Peserta: ${formData.get("peserta") || ""}
Titik Jemput: ${formData.get("jemput") || ""}
Pesan: ${formData.get("pesan") || ""}`;
      window.open(buildWhatsAppUrl(message), "_blank");
    });
  }
});
