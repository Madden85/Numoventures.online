NUMO CUSTOMER WEBSITE V4 - SOOKA DEVICE DISPLAY

Fail dalam zip:
- index.html
- app.js
- README.txt

Apa yang baru:
1. Website customer akan paparkan device Sooka:
   - TV
   - Phone
   - Tablet
2. Kalau device ON, dia keluar "Available".
3. Kalau device OFF, dia keluar "Habis".
4. Kalau semua device OFF, semua button plan Sooka jadi "Habis Stok".
5. Kalau ada sekurang-kurangnya satu device ON, plan Sooka masih boleh order.
6. Bila customer tekan order Sooka, mesej Telegram akan include device yang available.

Syarat Google Sheet:
Tab STOCK_CONTROL mesti ada row:
SOOKA PREMIUM,TV,ON,Habis Stok,
SOOKA PREMIUM,PHONE,ON,Habis Stok,
SOOKA PREMIUM,TABLET,ON,Habis Stok,

Cara guna:
1. Backup website customer lama.
2. Upload/replace index.html dan app.js website customer dengan file dalam zip ini.
3. Pastikan gambar lama masih dalam folder yang sama:
   - Numologo.jpg
   - bg-premium.jpg
   - testimoni1.jpg hingga testimoni10.jpg
4. Refresh website customer.
5. Check bahagian SOOKA PREMIUM.

Link Apps Script yang digunakan:
https://script.google.com/macros/s/AKfycbwqqBJ1A9tqYhPhEJe37Ik3-HGKZOHUUHqdf_jtLJuTv8tqQpt6WqX5jUBQwKPMbM92tw/exec
