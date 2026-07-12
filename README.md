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

- Repository: <https://github.com/zyniz01-prog/Phoenix-Market>
- GitHub Pages: <https://zyniz01-prog.github.io/Phoenix-Market/>
- Video demo: <https://youtu.be/r0f2sGhc2fE?si=Hk3QTdp_uioKxNKP>

## Kesimpulan

Phoenix Market memperlihatkan alur utama e-commerce secara lengkap dalam bentuk prototype: pengunjung menemukan produk, melihat detail, menyimpan favorit, mengatur keranjang, memakai voucher, checkout, melacak pesanan, dan melakukan konfirmasi. Di sisi lain, Admin dapat memantau stok serta pesanan melalui dashboard sederhana.
