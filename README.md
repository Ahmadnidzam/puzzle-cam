# Puzzle Cam 📸

Photobooth web dengan deteksi tangan — ambil foto cukup dengan gestur, tanpa menyentuh layar.

**Live demo:** https://puzzle-cam.higgsfield.app

## Fitur

- **Deteksi tangan real-time** — MediaPipe Tasks HandLandmarker (GPU) + One-Euro filter untuk meredam getar
- **24 filter** — 12 filter CSS + 12 efek piksel via FX engine canvas (Pixel, GameBoy, Toon, Manga, Holo, Glitch, VHS, Komik, Sketsa, Thermal, NeonDuo, Cermin)
- **18 frame** digambar prosedural di canvas, adaptif untuk 2/3/4 foto, semua slot foto 4:3 tanpa distorsi
- **Output foto** berupa pita landscape 4:3, dihitung di ruang piksel video
- **Tanpa database** — semua berjalan di sisi klien, unduhan via `canvas.toBlob`

## Struktur penting

| Path | Keterangan |
|------|------------|
| `puzzle-cam/app/src/assets/puzzle-cam.html` | Seluruh aplikasi dalam satu file (HTML+CSS+JS) |
| `puzzle-cam/app/src/routes/index.ts` | Rute server yang menyajikan file di atas + header keamanan (izin kamera, CSP) |
| `puzzle-cam/app/src/lib/security-headers.server.ts` | Helper header keamanan |
| `puzzle-cam/app/src/app-meta.json` | Metadata kartu situs (OG title/description/cover/favicon) |

Detail lebih lengkap ada di [`puzzle-cam/CARA-PAKAI.md`](puzzle-cam/CARA-PAKAI.md).

## Menjalankan

### Versi single-file (paling cepat)

Buka folder `puzzle-cam/app/src/assets/` di VS Code → klik kanan `puzzle-cam.html` → **Open with Live Server**.

Butuh koneksi internet (CDN MediaPipe tasks-vision + Google Fonts). Akses kamera butuh `localhost` atau HTTPS.

### Situs penuh (React 19 + TanStack Start + Cloudflare Worker)

```bash
cd puzzle-cam/app
bun install
bun run dev      # dev server
bun run build    # verifikasi build produksi
```

## Stack

React 19 · TanStack Start · Cloudflare Workers · Tailwind CSS 4 · Radix UI · MediaPipe Tasks Vision · Bun
