# Product Requirements Document (PRD)

## Delta Tour Website

## 1. Ringkasan Produk

Delta Tour adalah website travel lokal berbasis di Jember, Jawa Timur. Website ini berfungsi sebagai katalog informasi paket wisata dan layanan sewa mobil + driver, dengan tujuan utama mengarahkan calon pelanggan untuk berkonsultasi dan memesan melalui WhatsApp.

Website ini bukan marketplace, bukan sistem booking otomatis, dan tidak menggunakan backend pada versi awal. Semua halaman dibuat statis, ringan, responsive, dan mudah dibuka langsung di browser.

## 2. Tujuan Produk

Tujuan utama website:

- Membangun kepercayaan calon pelanggan terhadap Delta Tour.
- Menampilkan paket wisata Jawa Timur dari Jember secara jelas.
- Menampilkan harga mulai, destinasi, durasi, dan detail layanan.
- Memudahkan pelanggan menghubungi admin melalui WhatsApp.
- Menyediakan pengalaman mobile yang nyaman dan cepat.

## 3. Identitas Brand

Nama brand:

Delta Tour

Tagline:

Jelajahi Jawa Timur

Headline utama:

Jelajahi Jawa Timur Bersama Delta Tour

Subheadline:

Paket wisata nyaman dari Jember untuk Bromo, Bondowoso, Banyuwangi, Lumajang, Baluran, dan destinasi pilihan Jawa Timur.

Tone brand:

Profesional, lokal, terpercaya, natural, ramah keluarga, cocok untuk wisata alam, pantai, gunung, air terjun, dan sunrise.

Kesan desain:

Modern, bersih, premium tapi tetap bersahabat, tidak ramai, mudah dipahami, dan cocok untuk bisnis travel lokal dari Jember.

## 4. Target Pengguna

Target pengguna utama:

- Wisatawan dari Jember dan sekitarnya.
- Keluarga yang ingin wisata nyaman tanpa mengatur perjalanan sendiri.
- Rombongan sekolah, komunitas, kantor, atau keluarga besar.
- Pelanggan yang ingin private trip, open trip, custom trip, atau sewa mobil + driver.
- Wisatawan yang mencari paket Bromo, Bondowoso, Banyuwangi, Lumajang, Baluran, dan wisata lokal Jember.

## 5. Cakupan Versi Awal

Versi awal website wajib berupa website statis dengan file HTML, CSS, dan JavaScript.

Teknologi:

- HTML
- CSS
- JavaScript
- Tanpa backend
- Tanpa database
- Tanpa login
- Tanpa payment gateway

Struktur file:

```text
index.html
paket.html
detail-paket.html
sewa-mobil.html
galeri.html
tentang.html
kontak.html
assets/css/style.css
assets/js/main.js
assets/img/
```

## 6. Non-Goals

Fitur berikut tidak boleh dibuat pada versi awal:

- Login customer
- Register customer
- Payment gateway
- Keranjang belanja
- Booking otomatis
- Sistem kursi real-time
- Marketplace multi-vendor
- Chatbot AI
- Aplikasi Android atau iOS
- Dashboard admin kompleks
- Tombol atau link yang tidak aktif
- Animasi berat
- Efek 3D berlebihan
- Warna yang terlalu ramai

## 7. Warna dan Style Guide

Gunakan CSS variable berikut secara konsisten:

```css
:root {
  --primary: #0B3D5C;
  --secondary: #2E7D32;
  --accent: #F9A825;
  --accent-hover: #E08E00;
  --background: #F8FAF5;
  --text-main: #1B1F23;
  --text-muted: #6B7280;
  --footer: #082F49;
  --white: #FFFFFF;
  --border: #E5E7EB;
  --success: #16A34A;
  --error: #DC2626;
}
```

Aturan penggunaan warna:

- Navbar menggunakan background putih.
- Footer wajib menggunakan `#082F49`.
- Tombol utama menggunakan `#F9A825`.
- Hover tombol utama menggunakan `#E08E00`.
- Harga paket menggunakan `#2E7D32`.
- Badge seperti "Best Seller" menggunakan `#2E7D32`.
- Judul section menggunakan `#0B3D5C`.
- Background utama menggunakan `#F8FAF5`.
- Hindari warna tambahan yang tidak perlu.

Style komponen:

- Button utama: background `#F9A825`, teks `#1B1F23`, radius 12px, padding 12px 20px, font weight 600.
- Button secondary: background transparan, border `#0B3D5C` atau putih sesuai konteks, radius 12px.
- Card paket: background putih, border `#E5E7EB`, radius 16px, shadow lembut, image height 200px.
- Badge: background `#2E7D32`, teks putih, radius 999px, font size 12px, padding 6px 10px.
- Footer: background `#082F49`, teks putih, link hover `#F9A825`.

## 8. Navigasi

Navbar desktop wajib berisi:

- Logo atau teks brand: Delta Tour
- Menu: Beranda, Paket Wisata, Sewa Mobil, Galeri, Tentang Kami, Kontak
- Tombol kanan: Pesan Sekarang

Aturan navbar:

- Sticky di atas.
- Background putih.
- Logo di kiri.
- Menu di tengah atau kanan.
- Tombol "Pesan Sekarang" menuju WhatsApp.
- Mobile menggunakan hamburger menu.
- Semua menu harus aktif dan menuju halaman yang benar.

## 9. Halaman Website

### 9.1 Beranda

Urutan section:

1. Navbar
2. Hero section
3. Statistik singkat
4. Paket favorit
5. Destinasi populer
6. Kenapa memilih Delta Tour
7. Sewa mobil highlight
8. Galeri singkat
9. Testimoni
10. CTA WhatsApp
11. Footer

Hero section:

- Menggunakan foto atau placeholder wisata Jawa Timur.
- Opsi gambar: Bromo sunrise, Kawah Ijen, Kawah Wurung, Pantai Papuma, Tumpak Sewu, Banyuwangi.
- Menggunakan overlay biru gelap agar teks terbaca.
- Tombol "Lihat Paket" menuju section paket atau halaman paket.
- Tombol "Chat WhatsApp" membuka WhatsApp.

Statistik singkat:

- 100+ Trip: Telah kami layani
- Start dari Jember: Mudah dijangkau
- Driver Berpengalaman: Aman dan profesional
- Custom Trip: Itinerary fleksibel

Paket favorit:

- Bromo Midnight dari Jember
- Kawah Ijen dari Jember
- Jember Beach Tour
- Banyuwangi 2D1N

Setiap card paket wajib memiliki gambar, badge, nama paket, deskripsi, harga mulai, tombol Detail, dan tombol WhatsApp.

Destinasi populer:

- Bromo
- Kawah Ijen
- Kawah Wurung
- Pantai Papuma
- Tumpak Sewu
- De Djawatan
- Baluran
- Pulau Merah
- Teluk Love

Kenapa memilih Delta Tour:

- Start dari Jember
- Harga Transparan
- Driver Berpengalaman
- Itinerary Fleksibel
- Cocok untuk Keluarga dan Rombongan
- Destinasi Lengkap

Sewa mobil highlight:

- Judul: Sewa Mobil + Driver dari Jember
- Armada: Avanza / Xenia, Innova Reborn, Hiace, Elf
- Harga mulai: Rp500.000 / hari
- Tombol "Lihat Sewa Mobil" menuju `sewa-mobil.html`
- Tombol "Chat WhatsApp" membuka WhatsApp

Galeri singkat:

- Menampilkan foto: Bromo, Bondowoso, Papuma, Tumpak Sewu, Banyuwangi, Baluran, dan armada.

Testimoni:

- Menampilkan 3 testimoni dummy dengan rating 5.

CTA WhatsApp:

- Judul: Siap Liburan dari Jember?
- Tombol: Chat Admin Delta Tour
- Tombol wajib membuka WhatsApp.

### 9.2 Paket Wisata

Halaman `paket.html` menampilkan semua paket wisata.

Judul:

Paket Wisata Delta Tour

Subjudul:

Pilih paket wisata Jawa Timur dari Jember sesuai kebutuhan perjalanan Anda.

Filter kategori:

- Semua
- Jember
- Bromo
- Bondowoso
- Banyuwangi
- Lumajang
- Baluran
- Custom Trip

Daftar paket:

| Paket | Kategori | Durasi | Harga |
| --- | --- | --- | --- |
| Jember Beach Tour | Jember | 1 Hari | Mulai Rp250.000 / pax |
| Jember Family Tour | Jember | 1 Hari | Mulai Rp200.000 / pax |
| Bromo Midnight dari Jember | Bromo | Midnight Trip | Mulai Rp550.000 / pax |
| Kawah Ijen dari Jember | Bondowoso | Midnight Trip | Mulai Rp750.000 / pax |
| Kawah Wurung Bondowoso | Bondowoso | 1 Hari | Mulai Rp350.000 / pax |
| Tumpak Sewu Lumajang | Lumajang | 1 Hari | Mulai Rp450.000 / pax |
| Banyuwangi 2D1N | Banyuwangi | 2 Hari 1 Malam | Mulai Rp1.200.000 / pax |
| Baluran Banyuwangi 2D1N | Baluran | 2 Hari 1 Malam | Mulai Rp900.000 / pax |
| Custom Trip | Custom Trip | Sesuai request | Hubungi Admin |

Setiap card paket wajib memiliki:

- Foto
- Nama paket
- Kategori
- Durasi
- Destinasi singkat
- Harga mulai
- Tombol Detail
- Tombol WhatsApp

### 9.3 Detail Paket

Halaman `detail-paket.html` adalah template detail paket.

Konten wajib:

- Breadcrumb
- Foto utama
- Nama paket
- Harga mulai
- Durasi
- Minimal peserta
- Titik penjemputan
- Destinasi
- Itinerary
- Fasilitas termasuk
- Fasilitas tidak termasuk
- Catatan penting
- Tombol WhatsApp booking
- Paket lain yang direkomendasikan

Contoh konten utama menggunakan paket:

Bromo Midnight dari Jember

Harga:

Mulai Rp550.000 / pax

Durasi:

Midnight Trip

Titik Jemput:

Jember kota, hotel, stasiun, terminal, atau titik jemput sesuai kesepakatan.

Destinasi:

- Sunrise Point
- Kawah Bromo
- Lautan Pasir
- Pasir Berbisik
- Savana / Bukit Teletubbies

Itinerary:

- 22.00 - Penjemputan dari Jember
- 02.00 - Tiba area Bromo / meeting point jeep
- 03.30 - Menuju sunrise point
- 05.00 - Menikmati sunrise Bromo
- 06.30 - Lautan pasir dan Kawah Bromo
- 08.00 - Pasir Berbisik dan Savana
- 10.00 - Kembali ke meeting point
- 14.00 - Perkiraan tiba kembali di Jember

Fasilitas termasuk:

- Transport dari Jember
- Driver
- BBM
- Parkir
- Bantuan itinerary
- Dokumentasi basic jika tersedia

Fasilitas tidak termasuk:

- Tiket masuk wisata jika belum dimasukkan
- Jeep Bromo jika belum dimasukkan
- Makan pribadi
- Pengeluaran pribadi
- Tips driver

Catatan:

Harga dapat berubah tergantung jumlah peserta, tanggal keberangkatan, titik jemput, tiket wisata, armada, dan musim liburan.

### 9.4 Sewa Mobil

Halaman `sewa-mobil.html` menampilkan layanan sewa mobil + driver dari Jember.

Judul:

Sewa Mobil + Driver dari Jember

Subjudul:

Layanan sewa mobil untuk perjalanan wisata, keluarga, rombongan, dan custom trip di Jawa Timur.

Armada:

| Armada | Kapasitas | Harga | Cocok untuk |
| --- | --- | --- | --- |
| Avanza / Xenia | 4-6 orang | Mulai Rp500.000 / hari | Keluarga kecil dan city tour |
| Innova Reborn | 5-6 orang | Mulai Rp700.000 / hari | Perjalanan luar kota yang lebih nyaman |
| Hiace | 10-14 orang | Hubungi Admin | Rombongan sedang |
| Elf | 12-18 orang | Hubungi Admin | Rombongan sekolah, komunitas, dan kantor |

Setiap card armada wajib memiliki:

- Foto mobil
- Nama mobil
- Kapasitas
- Harga mulai
- Fasilitas
- Tombol WhatsApp

Catatan:

Harga dapat berubah tergantung tujuan, durasi, BBM, tol, parkir, dan tanggal keberangkatan.

### 9.5 Galeri

Halaman `galeri.html` menampilkan grid foto perjalanan.

Judul:

Galeri Delta Tour

Kategori galeri:

- Semua
- Bromo
- Bondowoso
- Jember
- Banyuwangi
- Lumajang
- Baluran
- Armada

Setiap item galeri wajib memiliki:

- Gambar
- Nama lokasi
- Kategori

Jika foto diklik, tampilkan modal preview gambar.

### 9.6 Tentang Kami

Halaman `tentang.html` berisi profil Delta Tour.

Judul:

Tentang Delta Tour

Deskripsi:

Delta Tour adalah layanan travel berbasis di Jember, Jawa Timur, yang melayani paket wisata, private trip, open trip, custom trip, dan sewa mobil dengan driver. Kami membantu pelanggan menjelajahi berbagai destinasi terbaik di Jawa Timur seperti Bromo, Bondowoso, Kawah Ijen, Kawah Wurung, Banyuwangi, Lumajang, Baluran, dan wisata lokal Jember.

Visi:

Menjadi partner perjalanan wisata terpercaya dari Jember untuk menjelajahi keindahan Jawa Timur.

Misi:

- Memberikan layanan perjalanan yang nyaman dan aman.
- Menyediakan paket wisata dengan harga transparan.
- Membantu pelanggan membuat itinerary yang fleksibel.
- Mengutamakan kenyamanan pelanggan selama perjalanan.
- Mengenalkan destinasi wisata terbaik di Jawa Timur.

Keunggulan:

- Berbasis di Jember
- Driver berpengalaman
- Pilihan paket lengkap
- Bisa custom trip
- Cocok untuk keluarga dan rombongan

### 9.7 Kontak

Halaman `kontak.html` berisi informasi kontak dan form yang diarahkan ke WhatsApp.

Data kontak dummy:

- WhatsApp: 0812 3456 7890
- Email: info@deltatour.id
- Alamat: Jember, Jawa Timur
- Jam Operasional: Setiap hari, 08.00 - 21.00 WIB

Konten wajib:

- Nomor WhatsApp
- Email
- Alamat base Jember
- Jam operasional
- Google Maps embed
- Form kontak

Field form:

- Nama
- Nomor WhatsApp
- Pilihan paket
- Tanggal rencana trip
- Jumlah peserta
- Titik jemput
- Pesan tambahan

Saat form dikirim, data tidak disimpan ke database. Form harus membuka WhatsApp dengan format pesan otomatis:

```text
Halo Admin Delta Tour,
Saya ingin konsultasi perjalanan wisata.

Nama:
Nomor WhatsApp:
Paket:
Tanggal Trip:
Jumlah Peserta:
Titik Jemput:
Pesan:
```

## 10. Fitur WhatsApp

Semua tombol WhatsApp wajib aktif.

Nomor dummy:

```text
6281234567890
```

Format pesan paket:

```text
Halo Admin Delta Tour,
Saya ingin tanya paket wisata:

Paket: [nama paket]
Tanggal Trip:
Jumlah Peserta:
Titik Jemput:
Catatan:
```

Implementasi wajib menggunakan `encodeURIComponent` agar URL WhatsApp aman.

Contoh fungsi:

```javascript
function openWhatsApp(packageName) {
  const phone = "6281234567890";
  const message = `Halo Admin Delta Tour,
Saya ingin tanya paket wisata:

Paket: ${packageName}
Tanggal Trip:
Jumlah Peserta:
Titik Jemput:
Catatan:`;
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}
```

## 11. Responsive Design

Desktop:

- Max width content 1200px.
- Grid paket 4 kolom.
- Grid destinasi 4 kolom.
- Navbar horizontal.

Tablet:

- Grid paket 2 kolom.
- Grid destinasi 2 kolom.

Mobile:

- Navbar hamburger.
- Hero text center atau left dengan padding rapi.
- Grid paket 1 kolom.
- Button full width jika dibutuhkan.
- Floating WhatsApp tetap muncul.
- Footer menjadi 1 kolom.

## 12. SEO Basic

Meta title:

Delta Tour | Paket Wisata Jawa Timur dari Jember

Meta description:

Delta Tour melayani paket wisata Bromo, Kawah Ijen, Kawah Wurung Bondowoso, Banyuwangi, Lumajang, Baluran, wisata Jember, dan sewa mobil dengan driver berpengalaman dari Jember.

Keyword target:

- Travel Jember
- Paket wisata Jember
- Paket Bromo dari Jember
- Paket Bondowoso dari Jember
- Paket Ijen dari Jember
- Sewa mobil Jember
- Travel wisata Jawa Timur
- Paket wisata Banyuwangi dari Jember
- Paket Tumpak Sewu dari Jember
- Delta Tour Jember

Slug halaman:

- `/`
- `/paket.html`
- `/detail-paket.html`
- `/sewa-mobil.html`
- `/galeri.html`
- `/tentang.html`
- `/kontak.html`

## 13. Aturan UI/UX

Wajib:

- Responsive untuk desktop, tablet, dan mobile.
- Navbar sticky.
- Tombol WhatsApp mudah terlihat.
- Floating WhatsApp button di kanan bawah.
- Foto destinasi besar dan jelas.
- Card paket bersih dan modern.
- Harga terlihat jelas.
- Typography mudah dibaca.
- Kontras warna bagus.
- Footer lengkap.
- Semua tombol aktif.
- Tidak ada link kosong.
- Tidak ada teks lorem ipsum.
- Tidak ada button mati.

Jangan:

- Jangan pakai font sulit dibaca.
- Jangan semua teks kapital.
- Jangan pakai foto pecah.
- Jangan terlalu banyak animasi.
- Jangan membuat halaman terlalu berat.
- Jangan sembunyikan CTA.
- Jangan membuat desain terlalu ramai.

## 14. Urutan Implementasi

1. Buat struktur folder dan file.
2. Buat CSS variable warna.
3. Buat navbar responsive.
4. Buat hero section.
5. Buat stats section.
6. Buat card paket favorit.
7. Buat halaman paket wisata lengkap.
8. Buat template detail paket.
9. Buat halaman sewa mobil.
10. Buat galeri.
11. Buat halaman tentang kami.
12. Buat halaman kontak.
13. Buat fungsi WhatsApp.
14. Buat floating WhatsApp button.
15. Buat responsive mobile.
16. Cek semua tombol dan link.
17. Rapikan SEO meta tag.
18. Pastikan tidak ada lorem ipsum.
19. Pastikan tidak ada tombol mati.

## 15. Acceptance Criteria

Website dianggap selesai untuk versi statis jika:

- Semua file sesuai struktur yang diminta tersedia.
- Semua halaman saling terhubung melalui navbar dan link internal.
- Semua tombol WhatsApp membuka `wa.me/6281234567890` dengan pesan yang sesuai.
- Form kontak membuka WhatsApp dengan isi form yang sudah diformat.
- Tidak ada tombol mati, link kosong, atau teks lorem ipsum.
- Desain konsisten menggunakan identitas Delta Tour.
- Warna mengikuti CSS variable yang ditentukan.
- Layout responsive di desktop, tablet, dan mobile.
- Navbar sticky dan menu mobile berfungsi.
- Filter paket dan filter galeri berfungsi menggunakan JavaScript.
- Modal preview galeri berfungsi.
- SEO basic tersedia pada setiap halaman.
- Website dapat dijalankan langsung di browser tanpa backend.

## 16. Output Implementasi

Output final yang harus tersedia:

- `index.html`
- `paket.html`
- `detail-paket.html`
- `sewa-mobil.html`
- `galeri.html`
- `tentang.html`
- `kontak.html`
- `assets/css/style.css`
- `assets/js/main.js`

Catatan akhir:

Semua teks, logo, footer, tombol WhatsApp, meta title, dan halaman wajib menggunakan nama Delta Tour. Jangan gunakan nama "Jember Explore Travel". Fokus utama website adalah paket jelas, harga mulai jelas, foto menarik, tombol WhatsApp jelas, mobile nyaman, dan cepat dibuka.
