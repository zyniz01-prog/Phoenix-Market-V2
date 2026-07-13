# Phoenix Market

Phoenix Market adalah prototype website e-commerce bertema gadget dan elektronik. Proyek ini dibuat menggunakan HTML, CSS, dan JavaScript vanilla untuk menunjukkan alur toko online dari memilih produk sampai pengelolaan pesanan oleh Admin.

## Cara Menjalankan

1. Buka file `index.html` melalui browser atau Live Server.
2. Pilih mode **User** untuk berbelanja atau **Admin** untuk mengelola toko.
3. Pada mode Admin, gunakan password `admin123` (username bebas).

> Proyek ini adalah simulasi front-end. Data produk tambahan, keranjang, favorit, alamat, voucher, dan pesanan disimpan di `localStorage` browser.

## Fitur Pengguna

- Halaman awal dan beranda responsif dengan tema visual Phoenix Market.
- Katalog produk dengan pencarian, filter kategori, rentang harga, urutan harga, dan filter stok tersedia.
- Kartu produk dengan rating, status stok, badge gratis ongkir/garansi, serta tombol favorit.
- Detail produk berisi deskripsi, spesifikasi singkat, status stok, rekomendasi produk terkait, dan ulasan yang dapat digulir.
- Favorit/wishlist, keranjang belanja, pengaturan jumlah barang, dan tombol kembali ke atas.
- Voucher `HEMAT10` untuk diskon 10% dengan minimum belanja Rp1.000.000 dan `WELCOME5` untuk diskon 5% dengan minimum belanja Rp500.000.
- Checkout bertahap dengan alamat tersimpan, pilihan pengiriman Reguler/Express, estimasi tiba, dan metode pembayaran simulasi termasuk QRIS.
- Konfirmasi pesanan melalui WhatsApp, riwayat pesanan, serta halaman pelacakan resi simulasi.
- FAQ, profil toko, kontak WhatsApp, kebijakan pengembalian, countdown promo, dan notifikasi aktivitas pembelian simulasi.

## Fitur Admin

- Dashboard ringkasan katalog dan pesanan, grafik penjualan sederhana, badge pesanan baru, serta indikator stok hampir habis.
- Tambah produk, ubah stok dengan dialog khusus, dan hapus produk tambahan dengan konfirmasi.
- Pengelolaan status pesanan dan notifikasi tindakan tanpa dialog browser bawaan.
- Ekspor riwayat pesanan ke file CSV untuk kebutuhan demo pengelolaan toko.

## Teknologi

- HTML5
- CSS3: Flexbox, Grid, media query, dan animasi ringan
- JavaScript ES6+
- `localStorage` untuk penyimpanan data simulasi
- GitHub Pages untuk deployment

## Catatan Simulasi

- Pembayaran, QRIS, WhatsApp, resi, dan dashboard adalah simulasi untuk demo; tidak terhubung ke gateway pembayaran atau kurir sungguhan.
- Produk bawaan katalog tidak dapat dihapus dari Admin. Hapus produk hanya berlaku untuk produk tambahan yang dibuat melalui form Admin.

## Business Overview

### Nama Bisnis, Deskripsi, dan Value Proposition

**Phoenix Market** adalah bisnis e-commerce B2C yang berfokus pada gadget, elektronik, dan aksesoris untuk kebutuhan belajar, bekerja, hiburan, gaming, dan rumah tangga modern. Value proposition Phoenix Market adalah pengalaman belanja teknologi yang lebih fokus dan mudah dipahami: visual produk yang menarik, informasi stok yang jelas, katalog yang dapat difilter, promo transparan, serta alur checkout sederhana.

### Target Market dan Segmentasi Pelanggan

- **Pelajar dan mahasiswa:** membutuhkan laptop, tablet, earphone, dan aksesoris dengan harga yang jelas untuk kegiatan belajar.
- **Pekerja dan profesional:** mencari perangkat produktivitas seperti laptop, smartphone, headphone, dan monitor.
- **Gamer dan kreator konten:** membutuhkan mouse gaming, headset, kamera, tablet, dan perangkat pendukung lain.
- **Keluarga modern:** membutuhkan elektronik rumah tangga seperti Smart TV, AC, atau kulkas.
- **Pelanggan baru:** tertarik pada penawaran awal seperti voucher `WELCOME5` dan edukasi produk yang ringkas.

### Analisis Pasar dan Kompetitor

Permintaan produk teknologi terus relevan karena perangkat digital digunakan untuk pendidikan, kerja, hiburan, komunikasi, dan kebutuhan rumah. Pelanggan umumnya membandingkan harga, spesifikasi, ketersediaan stok, keamanan pembayaran, serta kecepatan pengiriman sebelum membeli.

Kompetitor utama berada pada dua kelompok: marketplace besar seperti Tokopedia, Shopee, dan Lazada; serta toko elektronik lokal. Phoenix Market membedakan diri sebagai katalog teknologi yang lebih terkurasi, memiliki tampilan bertema kuat, informasi produk yang ringkas, dan alur demo belanja yang sederhana.

### Strategi Manajemen Produk dan Katalog

Produk dikelompokkan ke dalam kategori **Gadget**, **Elektronik**, dan **Aksesoris**. Setiap produk memiliki nama, harga, gambar, kategori, deskripsi, rating, dan stok. Kartu produk menggunakan visual yang konsisten dan menampilkan badge seperti gratis ongkir, garansi resmi, serta status stok agar pelanggan dapat mengambil keputusan lebih cepat.

Admin dapat menambah produk, memperbarui stok, dan mengelola pesanan. Produk unggulan ditampilkan di Beranda, sementara katalog lengkap dapat dicari, difilter, dan diurutkan pada halaman Produk.

### Model Bisnis dan Revenue Stream

Phoenix Market menggunakan model **Business to Consumer (B2C)**, yaitu menjual produk secara langsung kepada pelanggan akhir. Sumber pendapatan yang direncanakan meliputi:

- Margin penjualan gadget, elektronik, dan aksesoris.
- Penjualan bundling, misalnya laptop dengan mouse atau headphone.
- Promo musiman untuk meningkatkan jumlah transaksi.
- Potensi kerja sama promosi dengan merek elektronik.
- Potensi layanan tambahan, seperti garansi diperpanjang atau paket pengiriman cepat.

### Strategi Harga, Promosi, dan Diskon

Strategi harga dibuat kompetitif berdasarkan kategori dan nilai produk. Aksesoris memiliki harga yang lebih mudah dijangkau, sedangkan laptop, smartphone, dan tablet berada pada segmen premium. Program promosi pada prototype ini meliputi:

- `HEMAT10`: diskon 10% dengan minimum belanja Rp1.000.000.
- `WELCOME5`: diskon 5% dengan minimum belanja Rp500.000 untuk pelanggan baru.
- Countdown promo dan notifikasi pembelian simulasi untuk memperkuat urgensi pembelian.
- Badge gratis ongkir dan garansi resmi pada produk tertentu.

### Checkout dan Simulasi Payment Gateway

Checkout dilakukan secara bertahap: pelanggan mengisi alamat, memilih pengiriman Reguler atau Express, memilih metode pembayaran, lalu melihat ringkasan pesanan. Gateway yang dipilih untuk simulasi adalah **Midtrans dummy**, dengan tampilan opsi pembayaran seperti QRIS, virtual account, e-wallet, atau transfer bank.

Pada versi prototype, QRIS hanya berupa gambar dan tidak memproses transaksi nyata. Setelah pesanan dibuat, sistem menampilkan nomor pesanan simulasi, opsi konfirmasi WhatsApp, riwayat pesanan, dan nomor resi simulasi untuk tracking.

### Rencana SEO

- Menggunakan judul halaman dan heading yang relevan dengan isi halaman.
- Menyediakan nama produk, kategori, deskripsi, dan teks alternatif gambar yang jelas.
- Membuat desain responsif agar nyaman diakses dari perangkat mobile.
- Menjaga struktur URL dan nama file halaman tetap mudah dipahami.
- Menambahkan konten FAQ, profil toko, kebijakan retur, serta informasi produk untuk meningkatkan relevansi halaman.

### Rencana Keamanan dan Pemeliharaan

Untuk versi produksi, data pelanggan dan transaksi harus dipindahkan dari `localStorage` ke backend dan database yang aman. Website perlu menggunakan HTTPS, validasi input di sisi server, autentikasi Admin yang kuat, pembatasan akses per peran, serta integrasi payment gateway resmi.

Pemeliharaan rutin meliputi pembaruan katalog dan harga, pengecekan stok, penggantian gambar yang tidak tersedia, pengujian form checkout, pemeriksaan tampilan mobile, backup data, dan evaluasi keamanan dependensi atau layanan pihak ketiga.

### Rencana Data Analytics untuk Pengambilan Keputusan

Data analytics dapat digunakan untuk memantau jumlah pengunjung, produk paling sering dilihat, kata kunci pencarian, produk yang paling sering masuk keranjang atau favorit, penggunaan voucher, nilai transaksi rata-rata, dan tingkat checkout berhasil.

Data tersebut dapat membantu menentukan produk unggulan, mengatur stok hampir habis, mengevaluasi efektivitas promo, memperbaiki halaman yang kurang menarik, serta menyusun rekomendasi produk dan kampanye pemasaran berikutnya.

## Struktur Proyek

```text
IT-II-Zyn/
|-- index.html
|-- IT-II-ZynXiz-Beranda.html
|-- IT-II-ZynXiz-Produk.html
|-- IT-II-ZynXiz-Keranjang.html
|-- IT-II-ZynXiz-Favorit.html
|-- IT-II-ZynXiz-Akun.html
|-- IT-II-ZynXiz-Tracking.html
|-- IT-II-ZynXiz-ProfilToko.html
|-- IT-II-ZynXiz-Admin*.html
|-- css/
|-- js/
|-- images/
`-- Scrennshotsv2/
```

## Dokumentasi Screenshot Terbaru

Folder dokumentasi: [`Scrennshotsv2`](Scrennshotsv2)

### Desktop

| Halaman | Screenshot |
| --- | --- |
| Tampilan awal | ![Tampilan awal desktop](Scrennshotsv2/SS-Desktop%20Tampilan%20Awal.png) |
| Beranda | ![Beranda desktop](Scrennshotsv2/SS-Desktop%20Beranda.png) |
| Produk | ![Produk desktop](Scrennshotsv2/SS-Desktop%20Produk.png) |
| Keranjang | ![Keranjang desktop](Scrennshotsv2/SS-Desktop%20Keranjang.png) |
| Checkout | ![Checkout desktop](Scrennshotsv2/SS-Desktop%20Checkout.png) |
| Dashboard Admin | ![Dashboard Admin desktop](Scrennshotsv2/SS-Desktop%20Dashboard%20Admin.png) |
| Produk dan stok Admin | ![Produk dan stok Admin desktop](Scrennshotsv2/SS-Desktop%20Produk%20%26%20Stok%20Admin.png) |
| FAQ dan footer | ![FAQ dan footer desktop](Scrennshotsv2/SS-Desktop%20FAQ%20%26%20Footer.png) |

### Mobile

| Halaman | Screenshot |
| --- | --- |
| Tampilan awal | ![Tampilan awal mobile](Scrennshotsv2/SS-Mobile%20Tampilan%20Awal.jpeg) |
| Beranda | ![Beranda mobile](Scrennshotsv2/SS-Mobile%20Beranda.jpeg) |
| Produk | ![Produk mobile](Scrennshotsv2/SS-Mobile%20Produk.jpeg) |
| Keranjang | ![Keranjang mobile](Scrennshotsv2/SS-Mobile%20Keranjang.jpeg) |
| Checkout | ![Checkout mobile](Scrennshotsv2/SS-Mobile%20Checkout.jpeg) |
| Dashboard Admin | ![Dashboard Admin mobile](Scrennshotsv2/SS-Mobile%20Dashboard%20Admin.jpeg) |

## Deployment dan Demo

- Repository: <https://zyniz01-prog.github.io/Phoenix-Market-V2/>
- GitHub Pages: <https://github.com/zyniz01-prog/Phoenix-Market-V2>
- Video demo: <https://youtu.be/E4dY1WKmWOE?si=L4mXv8M26NecKSVV>

## Kesimpulan

Phoenix Market memperlihatkan alur utama e-commerce secara lengkap dalam bentuk prototype: pengunjung menemukan produk, melihat detail, menyimpan favorit, mengatur keranjang, memakai voucher, checkout, melacak pesanan, dan melakukan konfirmasi. Di sisi lain, Admin dapat memantau stok serta pesanan melalui dashboard sederhana.
