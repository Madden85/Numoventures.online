NUMO CUSTOMER WEBSITE V6 - SIMPLE STORE LAYOUT

Fail dalam zip:
- index.html
- index2.html
- app.js
- README.txt

Design:
- Style simple macam contoh kasut yang diberi.
- Header gelap, panel search, category button, grid produk dan card putih.
- Tak ada cart. Button order terus ke Telegram.
- Masih connect dengan Apps Script / Google Sheet untuk:
  - stock product
  - YouTube Email Sendiri / Email Seller
  - Sooka TV / Phone / Tablet
  - promo price
  - promo badge
  - badge color
  - promo note

Cara guna:
1. Backup customer website lama.
2. Upload/replace:
   index.html
   index2.html
   app.js
3. Pastikan gambar logo masih ada:
   Numologo.jpg
4. Refresh website.

Cara edit ayat:
- Buka index2.html sahaja.
- Edit text antara tag.
- Jangan ubah data-key="" atau id="".

Contoh:
<p data-key="heroTitle">Akaun premium murah, trusted &amp; full warranty.</p>

Boleh tukar kepada:
<p data-key="heroTitle">Premium account murah, laju dan trusted.</p>

Jangan ubah:
data-key="heroTitle"

Nota:
- Harga produk ada dalam app.js.
- Promo/stok akan override ikut admin panel Google Sheet.
- Kalau Apps Script gagal sync, website masih tunjuk harga asal.


UPDATE V6.1 - TESTIMONI DITAMBAH BALIK
- Bahagian Testimoni Customer sudah ditambah antara Produk dan Cara Order.
- Website akan cari gambar:
  testimoni1.jpg hingga testimoni10.jpg
- Pastikan gambar testimoni tersebut ada dalam folder yang sama dengan index.html.
- Ayat title/subtitle testimoni boleh edit dalam index2.html:
  data-key="testimoniTitle"
  data-key="testimoniSubtitle"


UPDATE V6.2 - PRODUCT IMAGE
- Product card sekarang guna gambar:
  netflix.jpg
  youtube.jpg
  disney.jpg
  sooka.jpg
  viu.jpg
  iqiyi.jpg
  spotify.jpg

- Pastikan semua gambar ini berada dalam folder yang sama dengan:
  index.html
  index2.html
  app.js

- Kalau gambar gagal load, website akan fallback kepada emoji.
- Saiz gambar recommended: 1200 x 800 px.
- Format: JPG/WEBP, bawah 200KB kalau boleh.
