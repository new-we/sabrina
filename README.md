# Portofolio Vina Sabrina

Website statis (HTML + CSS + JavaScript murni, tanpa build). Buka `index.html` di browser,
atau upload seluruh isi folder ke hosting statis (Netlify, Vercel, GitHub Pages, dll).

## Yang perlu Anda isi (semua di `js/data.js`, bagian `CONFIG`)
- `email`     : alamat email untuk tombol "Email me"
- `linkedin`  : URL LinkedIn untuk tombol "LinkedIn"
- `photo`     : foto profil. Taruh file di `assets/photo.jpg` (rasio ~4:5). Jika tidak ada, tampil inisial "VS".
- `docs`      : link PDF/PPT untuk tombol "Read the ... (pdf)" di tiap case study.
  Kalau kosong, tombol menampilkan pemberitahuan kecil "link belum diisi".

## Mengubah isi case study
Semua teks proyek ada di `js/data.js` (array `PROJECTS`). Gambar ada di `assets/img/`.

## Font
Memakai Google Fonts (Plus Jakarta Sans & Instrument Serif) lewat tag <link> di `index.html`.
Butuh internet saat dibuka; tanpa internet otomatis memakai font sistem.

## Struktur
index.html · css/style.css · js/main.js (animasi & transisi) · js/data.js (konten) · assets/img/
