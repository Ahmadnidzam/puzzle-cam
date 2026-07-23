# Puzzle Cam — Codebase

Live: https://puzzle-cam.higgsfield.app

## Struktur penting
- `app/src/assets/puzzle-cam.html` — SELURUH aplikasi Puzzle Cam (satu file: HTML+CSS+JS).
  File ini bisa dijalankan sendiri via VS Code Live Server tanpa sisa repo.
- `app/src/routes/index.ts` — rute server yang menyajikan file di atas sebagai halaman utama
  (plus header keamanan: izin kamera, CSP untuk CDN MediaPipe & Google Fonts).
- `app/src/lib/security-headers.server.ts` — helper header keamanan.
- `app/src/app-meta.json` — metadata kartu situs (OG title/description/cover/favicon).
- `app/public/favicon.svg` — favicon.

## Menjalankan versi single-file (paling cepat)
Buka folder `app/src/assets/` di VS Code → klik kanan `puzzle-cam.html` → Open with Live Server.
Butuh internet (CDN MediaPipe tasks-vision + Google Fonts) dan kamera butuh localhost/HTTPS.

## Menjalankan situs penuh (stack Higgsfield: React 19 + TanStack Start + Cloudflare Worker)
```
cd app
bun install
bun run dev      # dev server
bun run build    # verifikasi build produksi
```

## Catatan teknis singkat
- Deteksi tangan: MediaPipe Tasks HandLandmarker (GPU) + One-Euro filter (peredam getar).
- 24 filter: 12 CSS + 12 efek piksel (FX engine canvas: Pixel/GameBoy/Toon/Manga/Holo/Glitch/VHS/Komik/Sketsa/Thermal/NeonDuo/Cermin).
- 18 frame digambar prosedural di canvas, adaptif 2/3/4 foto, semua slot foto 4:3 (coverDraw, tanpa distorsi).
- Output foto: pita landscape 4:3 dihitung di ruang piksel video, berpusat pada bingkai filter.
- Tanpa database — semua di sisi klien; unduhan via canvas.toBlob.
