const WA_PHONE = "6282228178439";

function buildWhatsAppUrl(message) {
  return `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(message)}`;
}

function openWhatsApp(packageName = "Konsultasi perjalanan Delta Tour") {
  const message = `Halo Admin Delta Tour,
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

const WISATA_DETAILS = {
  bromo: {
    title: "Bromo",
    region: "Probolinggo",
    hero: "assets/img/bromo-bukit-perahu.jpg",
    description: "Destinasi sunrise paling populer di Jawa Timur dengan kombinasi gunung, lautan pasir, kawah aktif, dan savana.",
    long: "Bromo cocok untuk wisatawan yang ingin mengejar sunrise tanpa menginap lama. Dari Jember, rute ini biasanya dimulai malam hari agar tiba di area Bromo sebelum matahari terbit. Setelah sunrise, perjalanan dapat dilanjutkan ke kawah, lautan pasir, Pasir Berbisik, dan savana.",
    tags: ["Sunrise", "Gunung", "Midnight Trip"],
    meta: [
      ["Area", "Probolinggo"],
      ["Karakter", "Sunrise dan jeep trip"],
      ["Durasi Ideal", "Midnight Trip"],
      ["Cocok Untuk", "Private trip dan rombongan"]
    ],
    highlights: ["Sunrise point dengan view pegunungan", "Lautan pasir dan Kawah Bromo", "Pasir Berbisik serta Savana", "Rute favorit untuk berangkat dari Jember"],
    notes: ["Berangkat malam dari Jember", "Gunakan jaket karena suhu dini hari dingin", "Jeep menyesuaikan area dan paket", "Jadwal dapat berubah mengikuti cuaca"],
    photos: [
      ["assets/img/bromo-bukit-perahu.jpg", "Sunrise Bromo", "Sunrise Bromo"],
      ["assets/img/hero-delta-tour.jpg", "Panorama Jawa Timur", "Panorama rute Jawa Timur"],
      ["https://commons.wikimedia.org/wiki/Special:FilePath/SAVANA_BEKOL_BALURAN.jpg?width=900", "Savana Jawa Timur", "Nuansa savana Jawa Timur"]
    ]
  },
  "kawah-ijen": {
    title: "Kawah Ijen",
    region: "Bondowoso",
    hero: "assets/img/kawah-ijen.jpg",
    description: "Danau kawah berwarna turquoise dengan pengalaman pendakian malam, sunrise, dan fenomena blue fire pada kondisi tertentu.",
    long: "Kawah Ijen menjadi pilihan utama untuk wisatawan yang menyukai perjalanan alam dengan suasana petualangan. Rute dari Jember menuju area Paltuding biasanya diatur malam atau dini hari agar pendakian dan sunrise lebih optimal.",
    tags: ["Bondowoso", "Pendakian Malam", "Blue Fire"],
    meta: [
      ["Area", "Bondowoso"],
      ["Karakter", "Kawah dan trekking"],
      ["Durasi Ideal", "Midnight Trip"],
      ["Cocok Untuk", "Adventure trip"]
    ],
    highlights: ["Danau kawah berwarna biru kehijauan", "Trek malam menuju area kawah", "Blue fire pada kondisi tertentu", "Sunrise dan panorama pegunungan"],
    notes: ["Perlu kondisi fisik yang cukup baik", "Gunakan jaket, sepatu nyaman, dan masker", "Blue fire dipengaruhi kondisi alam dan aturan setempat", "Jadwal mengikuti status kawasan wisata"],
    photos: [
      ["assets/img/kawah-ijen.jpg", "Kawah Ijen Bondowoso", "Kawah Ijen"],
      ["assets/img/kawah-wurung.jpg", "Kawah Wurung Bondowoso", "Rute Bondowoso terkait"],
      ["assets/img/hero-delta-tour.jpg", "Panorama wisata Jawa Timur", "Panorama Jawa Timur"]
    ]
  },
  "kawah-wurung": {
    title: "Kawah Wurung",
    region: "Bondowoso",
    hero: "assets/img/kawah-wurung.jpg",
    description: "Hamparan savana hijau dan perbukitan terbuka di Bondowoso yang cocok untuk trip santai, foto, dan menikmati lanskap alam.",
    long: "Kawah Wurung cocok untuk wisatawan yang ingin menikmati alam Bondowoso tanpa pendakian berat. Karakternya terbuka, hijau, dan fotogenik, sehingga sering dipadukan dengan rute Ijen atau perjalanan satu hari dari Jember.",
    tags: ["Bondowoso", "Savana", "Trip Santai"],
    meta: [
      ["Area", "Bondowoso"],
      ["Karakter", "Savana dan bukit"],
      ["Durasi Ideal", "1 Hari"],
      ["Cocok Untuk", "Family trip dan foto"]
    ],
    highlights: ["Perbukitan hijau yang luas", "Spot foto savana dan lanskap terbuka", "Rute lebih ringan dibanding pendakian kawah", "Bisa dipadukan dengan destinasi Bondowoso lainnya"],
    notes: ["Warna savana dipengaruhi musim", "Siapkan topi atau pelindung matahari", "Waktu terbaik biasanya pagi atau sore", "Rute dapat disesuaikan dengan titik jemput"],
    photos: [
      ["assets/img/kawah-wurung.jpg", "Kawah Wurung Bondowoso", "Kawah Wurung"],
      ["assets/img/kawah-ijen.jpg", "Kawah Ijen Bondowoso", "Destinasi Bondowoso terkait"],
      ["assets/img/hero-delta-tour.jpg", "Panorama Jawa Timur", "Panorama rute Jawa Timur"]
    ]
  },
  papuma: {
    title: "Pantai Papuma",
    region: "Jember",
    hero: "assets/img/papuma.jpg",
    description: "Pantai selatan Jember dengan pasir putih, batu karang besar, dan panorama laut yang kuat untuk rute wisata lokal.",
    long: "Pantai Papuma menjadi salah satu destinasi pantai paling populer di Jember. Rutenya cocok untuk perjalanan satu hari, baik untuk keluarga maupun rombongan kecil, dan bisa dipadukan dengan Watu Ulo, Payangan, atau Teluk Love.",
    tags: ["Jember", "Pantai", "1 Hari"],
    meta: [
      ["Area", "Jember"],
      ["Karakter", "Pantai dan karang"],
      ["Durasi Ideal", "1 Hari"],
      ["Cocok Untuk", "Family trip"]
    ],
    highlights: ["Batu karang ikonik di area pantai", "Pemandangan laut selatan", "Rute lokal yang mudah dikombinasikan", "Cocok untuk itinerary santai dari Jember"],
    notes: ["Cuaca dan ombak memengaruhi aktivitas pantai", "Gunakan alas kaki nyaman", "Waktu pagi atau sore lebih nyaman", "Bisa dipaketkan dengan Teluk Love"],
    photos: [
      ["assets/img/papuma.jpg", "Pantai Papuma Jember", "Pantai Papuma"],
      ["assets/img/papuma-sunset.jpg", "Pantai Papuma saat sunset", "Suasana pantai selatan"],
      ["assets/img/teluk-love.jpg", "Teluk Love Jember", "Rute Jember terkait"]
    ]
  },
  "teluk-love": {
    title: "Teluk Love",
    region: "Jember",
    hero: "assets/img/teluk-love.jpg",
    description: "View teluk dari kawasan Payangan dengan panorama pantai, perbukitan, dan suasana sunset yang hangat.",
    long: "Teluk Love biasanya menjadi bagian dari rute pantai selatan Jember. Destinasi ini cocok untuk wisatawan yang ingin menikmati view dari ketinggian, terutama pada pagi atau sore hari.",
    tags: ["Jember", "Payangan", "Sunset"],
    meta: [
      ["Area", "Jember"],
      ["Karakter", "Viewpoint pantai"],
      ["Durasi Ideal", "Setengah hari"],
      ["Cocok Untuk", "Trip santai"]
    ],
    highlights: ["View teluk dan garis pantai Payangan", "Spot foto dari area bukit", "Cocok dipadukan dengan Papuma", "Suasana sunset yang menarik"],
    notes: ["Akses viewpoint menyesuaikan kondisi lapangan", "Gunakan alas kaki yang nyaman", "Sore hari cocok untuk suasana hangat", "Tetap ikuti arahan driver atau guide"],
    photos: [
      ["assets/img/teluk-love.jpg", "Teluk Love Jember", "Teluk Love"],
      ["assets/img/papuma.jpg", "Pantai Papuma Jember", "Rute pantai Jember"],
      ["assets/img/papuma-sunset.jpg", "Pantai selatan Jember", "Suasana pantai selatan"]
    ]
  },
  "de-djawatan": {
    title: "De Djawatan",
    region: "Banyuwangi",
    hero: "assets/img/de-djawatan.jpg",
    description: "Hutan trembesi di Banyuwangi dengan suasana teduh, rimbun, dan cocok untuk itinerary santai.",
    long: "De Djawatan sering dipilih sebagai destinasi ringan dalam rute Banyuwangi. Karakternya teduh dan visual, cocok untuk keluarga, rombongan, atau perjalanan yang ingin menggabungkan pantai dan hutan.",
    tags: ["Banyuwangi", "Hutan", "Family Trip"],
    meta: [
      ["Area", "Banyuwangi"],
      ["Karakter", "Hutan trembesi"],
      ["Durasi Ideal", "Bagian rute 1-2 hari"],
      ["Cocok Untuk", "Family trip"]
    ],
    highlights: ["Pohon trembesi besar dan rindang", "Rute ringan untuk semua usia", "Cocok untuk foto dan jalan santai", "Bisa dipadukan dengan Pulau Merah"],
    notes: ["Datang pagi atau sore untuk cahaya lebih nyaman", "Tetap jaga kebersihan area", "Durasi kunjungan dapat dibuat singkat", "Rute mengikuti itinerary Banyuwangi"],
    photos: [
      ["assets/img/de-djawatan.jpg", "De Djawatan Banyuwangi", "De Djawatan"],
      ["assets/img/pulau-merah.jpg", "Pulau Merah Banyuwangi", "Rute Banyuwangi terkait"],
      ["assets/img/hero-delta-tour.jpg", "Panorama Jawa Timur", "Panorama Jawa Timur"]
    ]
  },
  "pulau-merah": {
    title: "Pulau Merah",
    region: "Banyuwangi",
    hero: "assets/img/pulau-merah.jpg",
    description: "Pantai Banyuwangi dengan bukit kecil ikonik di tengah laut dan suasana sunset yang kuat.",
    long: "Pulau Merah cocok untuk wisatawan yang mencari rute pantai Banyuwangi. Destinasi ini sering masuk itinerary 2D1N karena lokasinya bisa dipadukan dengan De Djawatan dan destinasi Banyuwangi lainnya.",
    tags: ["Banyuwangi", "Pantai", "Sunset"],
    meta: [
      ["Area", "Banyuwangi"],
      ["Karakter", "Pantai dan sunset"],
      ["Durasi Ideal", "Bagian rute 2D1N"],
      ["Cocok Untuk", "Private trip"]
    ],
    highlights: ["Bukit ikonik di area pantai", "View sunset Banyuwangi", "Cocok untuk foto dan jalan santai", "Bisa dipadukan dengan De Djawatan"],
    notes: ["Kondisi ombak perlu diperhatikan", "Waktu sore cocok untuk sunset", "Bawa perlengkapan pantai pribadi", "Rute disesuaikan dengan durasi paket"],
    photos: [
      ["assets/img/pulau-merah.jpg", "Pulau Merah Banyuwangi", "Pulau Merah"],
      ["assets/img/de-djawatan.jpg", "De Djawatan Banyuwangi", "Rute Banyuwangi terkait"],
      ["assets/img/papuma-sunset.jpg", "Suasana pantai sunset", "Nuansa pantai selatan"]
    ]
  },
  "tumpak-sewu": {
    title: "Tumpak Sewu",
    region: "Lumajang",
    hero: "https://commons.wikimedia.org/wiki/Special:FilePath/CobanSewu_Waterfall.jpg?width=1400",
    description: "Air terjun ikonik di Lumajang dengan lanskap lembah yang dramatis dan suasana alam yang kuat.",
    long: "Tumpak Sewu menjadi pilihan untuk wisatawan yang menyukai air terjun dan panorama lembah. Rute ini bisa diatur sebagai perjalanan satu hari dari Jember dengan tempo yang lebih terencana.",
    tags: ["Lumajang", "Air Terjun", "Nature Trip"],
    meta: [
      ["Area", "Lumajang"],
      ["Karakter", "Air terjun dan lembah"],
      ["Durasi Ideal", "1 Hari"],
      ["Cocok Untuk", "Nature trip"]
    ],
    highlights: ["Panorama air terjun dari view point", "Lanskap lembah yang luas", "Cocok untuk pecinta alam", "Bisa dipadukan dengan destinasi Lumajang lain"],
    notes: ["Area tertentu membutuhkan fisik lebih siap", "Gunakan sepatu anti slip", "Cuaca memengaruhi akses dan debit air", "Ikuti arahan petugas setempat"],
    photos: [
      ["https://commons.wikimedia.org/wiki/Special:FilePath/CobanSewu_Waterfall.jpg?width=1400", "Tumpak Sewu Lumajang", "Tumpak Sewu"],
      ["assets/img/hero-delta-tour.jpg", "Panorama Jawa Timur", "Panorama Jawa Timur"],
      ["assets/img/bromo-bukit-perahu.jpg", "Pegunungan Jawa Timur", "Rute alam Jawa Timur"]
    ]
  },
  baluran: {
    title: "Baluran",
    region: "Situbondo",
    hero: "https://commons.wikimedia.org/wiki/Special:FilePath/SAVANA_BEKOL_BALURAN.jpg?width=1400",
    description: "Savana luas, hutan, dan pantai di kawasan Baluran yang cocok untuk family trip dan itinerary alam.",
    long: "Baluran cocok untuk wisata keluarga atau rombongan yang ingin menikmati suasana savana dan pantai. Rute ini bisa digabung dengan Banyuwangi atau dibuat sebagai perjalanan khusus sesuai durasi.",
    tags: ["Situbondo", "Savana", "Family Trip"],
    meta: [
      ["Area", "Situbondo"],
      ["Karakter", "Savana dan pantai"],
      ["Durasi Ideal", "1-2 Hari"],
      ["Cocok Untuk", "Keluarga dan rombongan"]
    ],
    highlights: ["Savana Bekol", "Pantai Bama", "Nuansa alam terbuka", "Cocok untuk perjalanan keluarga"],
    notes: ["Warna savana mengikuti musim", "Siapkan pelindung matahari", "Jaga jarak dengan satwa liar", "Rute dapat dipadukan dengan Banyuwangi"],
    photos: [
      ["https://commons.wikimedia.org/wiki/Special:FilePath/SAVANA_BEKOL_BALURAN.jpg?width=1400", "Savana Baluran", "Savana Baluran"],
      ["assets/img/de-djawatan.jpg", "De Djawatan", "Rute Banyuwangi terkait"],
      ["assets/img/pulau-merah.jpg", "Pulau Merah", "Rute pantai terkait"]
    ]
  },
  malang: {
    title: "Batu Malang",
    region: "Malang",
    hero: "assets/img/malang-batu.jpg",
    description: "Kota dingin di dataran tinggi Malang dengan berbagai wahana rekreasi keluarga seperti Jatim Park dan Museum Angkut.",
    long: "Batu Malang merupakan pusat destinasi liburan keluarga di Jawa Timur. Terkenal dengan udaranya yang sejuk karena dikelilingi pegunungan, kota ini menyajikan perpaduan keindahan alam, taman rekreasi modern berstandar internasional, serta wisata kuliner yang lezat.",
    tags: ["Malang", "Taman Rekreasi", "Family Trip"],
    meta: [
      ["Area", "Batu Malang"],
      ["Karakter", "Kota dingin & wisata modern"],
      ["Durasi Ideal", "2-3 Hari"],
      ["Cocok Untuk", "Keluarga, anak-anak, & rombongan"]
    ],
    highlights: ["Jatim Park 2 & Jatim Park 3", "Museum Angkut dengan koleksi kelas dunia", "Coban Rondo & Taman Labirin", "Kuliner legendaris Alun-Alun Batu"],
    notes: ["Suhu udara cukup dingin di sore & malam hari", "Gunakan pakaian/jaket hangat", "Bawa payung atau jas hujan di musim hujan", "Pemesanan tiket masuk disarankan dari jauh hari"],
    photos: [
      ["assets/img/malang-batu.jpg", "Batu Malang", "Pemandangan Batu Malang"],
      ["assets/img/hero-delta-tour.jpg", "Panorama Jawa Timur", "Panorama Jawa Timur"],
      ["https://commons.wikimedia.org/wiki/Special:FilePath/SAVANA_BEKOL_BALURAN.jpg?width=900", "Lanskap Jawa Timur", "Keindahan alam Jawa Timur"]
    ]
  },
  rembangan: {
    title: "Puncak Rembangan",
    region: "Jember",
    hero: "assets/img/puncak-rembangan.jpg",
    description: "Kawasan perbukitan sejuk di lereng Gunung Argopuro dengan pemandangan kebun naga, kopi, dan panorama kota Jember dari ketinggian.",
    long: "Puncak Rembangan adalah destinasi dataran tinggi tertua di Jember. Terletak sekitar 12 km ke arah utara dari pusat kota Jember, tempat ini menawarkan udara yang segar, kolam renang alami, pemandangan kebun kopi dan buah naga, serta pemandangan gemerlap lampu kota Jember di malam hari.",
    tags: ["Jember", "Perbukitan", "Susu Segar"],
    meta: [
      ["Area", "Jember Utara"],
      ["Karakter", "Udara sejuk & pemandangan alam"],
      ["Durasi Ideal", "Setengah hari"],
      ["Cocok Untuk", "Keluarga & rekreasi santai"]
    ],
    highlights: ["Kolam renang air pegunungan alami", "Agrowisata kebun buah naga & kopi", "Pemandangan kota Jember dari atas bukit", "Kuliner khas pisang goreng & susu murni"],
    notes: ["Udara pegunungan sejuk terutama di malam hari", "Disarankan membawa jaket ringan", "Akses jalan menanjak namun teraspal mulus", "Cocok dipadukan dengan city tour Jember"],
    photos: [
      ["assets/img/puncak-rembangan.jpg", "Puncak Rembangan Jember", "Rembangan dari atas"],
      ["assets/img/papuma.jpg", "Pantai Papuma", "Destinasi Jember terkait"],
      ["assets/img/teluk-love.jpg", "Teluk Love Jember", "Destinasi Jember terkait"]
    ]
  },
  sukorambi: {
    title: "Taman Botani Sukorambi",
    region: "Jember",
    hero: "assets/img/sukorambi.jpg",
    description: "Taman edukasi rekreasi keluarga berkonsep alam terluas di Jember dengan kebun binatang mini, kolam renang, dan wahana outbound.",
    long: "Taman Botani Sukorambi merupakan destinasi wisata edukatif berwawasan lingkungan. Menawarkan keindahan alam flora dan fauna yang berpadu dengan wahana petualangan rekreasi yang lengkap, menjadikannya pilihan favorit untuk rombongan sekolah maupun rekreasi keluarga.",
    tags: ["Jember", "Edukasi", "Taman Bunga"],
    meta: [
      ["Area", "Jember"],
      ["Karakter", "Taman botani & kebun binatang"],
      ["Durasi Ideal", "1 Hari"],
      ["Cocok Untuk", "Edukasi anak & rombongan keluarga"]
    ],
    highlights: ["Koleksi flora langka & kebun herbal", "Kebun binatang mini (herbivora & unggas)", "Kolam renang bertingkat dikelilingi pohon rindang", "Wahana outbound, flying fox, & berkuda"],
    notes: ["Kenakan pakaian kasual & sepatu olahraga nyaman", "Bawa pakaian ganti untuk berenang", "Ikuti aturan keselamatan di wahana outbound", "Cocok untuk kunjungan di pagi hingga sore hari"],
    photos: [
      ["assets/img/sukorambi.jpg", "Taman Botani Sukorambi", "Taman Botani Sukorambi"],
      ["assets/img/puncak-rembangan.jpg", "Puncak Rembangan Jember", "Destinasi Jember terkait"],
      ["assets/img/papuma-sunset.jpg", "Sunset Jember", "Destinasi Jember terkait"]
    ]
  }
};

function renderWisataDetail() {
  const page = document.querySelector("[data-wisata-detail]");
  if (!page) return;

  const params = new URLSearchParams(window.location.search);
  const key = params.get("wisata") || "kawah-ijen";
  const detail = WISATA_DETAILS[key] || WISATA_DETAILS["kawah-ijen"];

  document.title = `${detail.title} | Detail Wisata Delta Tour`;

  document.querySelectorAll("[data-wisata-title]").forEach((item) => {
    item.textContent = detail.title;
  });

  const region = document.querySelector("[data-wisata-region]");
  if (region) region.textContent = detail.region;

  const description = document.querySelector("[data-wisata-description]");
  if (description) description.textContent = detail.description;

  const subtitle = document.querySelector("[data-wisata-subtitle]");
  if (subtitle) subtitle.textContent = `Tentang ${detail.title}`;

  const longDescription = document.querySelector("[data-wisata-long]");
  if (longDescription) longDescription.textContent = detail.long;

  const hero = document.querySelector("[data-wisata-hero]");
  if (hero) {
    hero.src = detail.hero;
    hero.alt = detail.title;
  }

  document.querySelectorAll("[data-wisata-whatsapp]").forEach((button) => {
    button.dataset.whatsapp = `Detail wisata ${detail.title}`;
  });

  const tags = document.querySelector("[data-wisata-tags]");
  if (tags) {
    tags.innerHTML = detail.tags.map((tag) => `<span>${tag}</span>`).join("");
  }

  const meta = document.querySelector("[data-wisata-meta]");
  if (meta) {
    meta.innerHTML = detail.meta
      .map(([label, value]) => `<div class="wisata-meta-item"><span>${label}</span><strong>${value}</strong></div>`)
      .join("");
  }

  const highlights = document.querySelector("[data-wisata-highlights]");
  if (highlights) {
    highlights.innerHTML = detail.highlights.map((item) => `<li>${item}</li>`).join("");
  }

  const notes = document.querySelector("[data-wisata-notes]");
  if (notes) {
    notes.innerHTML = detail.notes.map((item) => `<li>${item}</li>`).join("");
  }

  const photos = document.querySelector("[data-wisata-photos]");
  if (photos) {
    photos.innerHTML = detail.photos
      .map(([src, alt, caption]) => `<figure class="wisata-photo-card"><img src="${src}" alt="${alt}"><figcaption>${caption}</figcaption></figure>`)
      .join("");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderWisataDetail();

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
