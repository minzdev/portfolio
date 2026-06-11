/**
 * @file Integration test "tanpa overflow horizontal" untuk komponen akar `App`.
 *
 * Test ini memverifikasi Requirement 9.2 (tidak ada gulir horizontal pada
 * lebar Viewport minimal 320px) dan Requirement 9.6 (tidak ada gulir horizontal
 * saat orientasi berubah portrait↔landscape). Test merender `App` pada empat
 * lebar Viewport representatif (320, 768, 1440, 1920) di kedua orientasi.
 *
 * Keterbatasan jsdom — mengapa tidak mengukur piksel langsung:
 * jsdom TIDAK menjalankan tata letak (layout) CSS sungguhan. Properti seperti
 * `scrollWidth`, `clientWidth`, dan `offsetWidth` selalu mengembalikan `0`,
 * sehingga overflow horizontal nyata (lebar konten > lebar Viewport) MUSTAHIL
 * diukur dalam satuan piksel di lingkungan uji ini. Mengandalkan pengukuran
 * piksel akan menghasilkan asersi yang selalu trivial/menyesatkan.
 *
 * Strategi proxy struktural (deterministik di jsdom):
 * Penyebab utama gulir horizontal adalah elemen yang mendeklarasikan LEBAR
 * TETAP (fixed width) yang melampaui lebar Viewport. Karena itu, untuk setiap
 * kombinasi lebar/orientasi, test:
 *   1. Menetapkan `window.innerWidth`/`innerHeight` sesuai lebar & orientasi,
 *      lalu mengirim event `resize` agar listener (mis. `useActiveSection`)
 *      ikut diperbarui.
 *   2. Merender `App` dan memastikan pohon benar-benar terender (ada `<main>`).
 *   3. Memastikan TIDAK ADA elemen yang mendeklarasikan lebar tetap (baik via
 *      `style.width`/`style.minWidth` dalam piksel, maupun kelas Tailwind nilai
 *      arbitrer `w-[…px]`/`min-w-[…px]`) yang melebihi lebar Viewport saat ini.
 *   4. Memastikan setiap `<img>` membawa batasan lebar responsif `max-w-full`
 *      (selaras desain Req 9.2/9.4). Jika tidak ada `<img>` yang dirender,
 *      asersi terpenuhi secara trivial namun loop tetap menjaga regresi di masa
 *      depan saat gambar ditambahkan.
 *
 * Catatan: pencegahan overflow tingkat global (`overflow-x-hidden` pada
 * `html, body`) diterapkan di `src/index.css` dan diverifikasi pada lapisan CSS,
 * bukan sebagai kelas pada pohon render. Test ini menjaga PENYEBAB struktural
 * overflow yang dapat diperiksa di jsdom.
 *
 * Ini adalah test contoh/integrasi (BUKAN property-based), sehingga tidak
 * memakai fast-check. Lingkungan uji adalah jsdom (lihat `vite.config.js`)
 * dengan matcher `@testing-library/jest-dom`.
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.jsx';
import { ThemeProvider } from './hooks/useTheme.js';

/**
 * Merender `App` lengkap di dalam provider yang diperlukan
 * (`HelmetProvider` + `ThemeProvider`).
 *
 * @returns {import('@testing-library/react').RenderResult} Hasil render.
 */
function renderApp() {
    return render(
        <HelmetProvider>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </HelmetProvider>,
    );
}

/**
 * Menetapkan dimensi Viewport (lebar & tinggi) dan mengirim event `resize`
 * sehingga listener yang bergantung pada ukuran jendela ikut diperbarui.
 *
 * @param {number} width Lebar Viewport dalam piksel.
 * @param {number} height Tinggi Viewport dalam piksel.
 * @returns {void}
 */
function setViewport(width, height) {
    window.innerWidth = width;
    window.innerHeight = height;
    window.dispatchEvent(new Event('resize'));
}

/**
 * Mengekstrak nilai lebar tetap (piksel) yang dideklarasikan sebuah elemen,
 * baik melalui gaya sebaris (`style.width`/`style.minWidth`) maupun kelas
 * Tailwind nilai arbitrer (`w-[…px]`/`min-w-[…px]`).
 *
 * @param {Element} element Elemen yang diperiksa.
 * @returns {number[]} Daftar lebar tetap dalam piksel yang ditemukan.
 */
function getFixedPixelWidths(element) {
    const widths = [];

    // Gaya sebaris: style="width: 640px" atau style="min-width: 640px".
    const inlineStyle = /** @type {HTMLElement} */ (element).style;
    for (const prop of ['width', 'minWidth']) {
        const value = inlineStyle?.[prop];
        if (typeof value === 'string' && value.endsWith('px')) {
            const px = Number.parseFloat(value);
            if (Number.isFinite(px)) {
                widths.push(px);
            }
        }
    }

    // Kelas Tailwind nilai arbitrer: w-[640px], min-w-[640px].
    const className = typeof element.className === 'string' ? element.className : '';
    const arbitraryWidth = /(?:^|\s)(?:min-)?w-\[(\d+(?:\.\d+)?)px\]/g;
    let match;
    while ((match = arbitraryWidth.exec(className)) !== null) {
        widths.push(Number.parseFloat(match[1]));
    }

    return widths;
}

// Lebar Viewport representatif (ponsel kecil → ultra-wide) per Req 9.1/9.2.
const VIEWPORT_WIDTHS = [320, 768, 1440, 1920];

// Tinggi pasangan untuk tiap orientasi. Portrait: tinggi > lebar; landscape:
// lebar > tinggi. Nilai dipilih agar relasi orientasi selalu terpenuhi.
const ORIENTATIONS = [
    { name: 'portrait', heightFor: (width) => width + 200 },
    { name: 'landscape', heightFor: (width) => Math.max(320, Math.round(width * 0.6)) },
];

// Produk kartesius lebar × orientasi → tiap kombinasi adalah kasus independen.
const CASES = VIEWPORT_WIDTHS.flatMap((width) =>
    ORIENTATIONS.map((orientation) => ({
        width,
        orientation: orientation.name,
        height: orientation.heightFor(width),
    })),
);

describe('App (tanpa overflow horizontal)', () => {
    /** @type {number} */
    let originalWidth;
    /** @type {number} */
    let originalHeight;

    beforeEach(() => {
        // Simpan dimensi asli agar dapat dipulihkan setelah tiap test.
        originalWidth = window.innerWidth;
        originalHeight = window.innerHeight;

        // Mulai dari kondisi bersih agar tiap test independen.
        document.documentElement.classList.remove('dark');
        localStorage.clear();
    });

    afterEach(() => {
        // Pulihkan dimensi Viewport dan kondisi global.
        setViewport(originalWidth, originalHeight);
        document.documentElement.classList.remove('dark');
        localStorage.clear();
    });

    it.each(CASES)(
        'tidak menghasilkan lebar tetap melebihi Viewport pada $width px ($orientation) (Req 9.2, 9.6)',
        ({ width, height }) => {
            setViewport(width, height);

            const { container } = renderApp();

            // Pohon benar-benar terender (bukan render kosong yang lolos trivial).
            expect(container.querySelector('main')).not.toBeNull();

            // Tidak ada elemen yang mendeklarasikan lebar tetap melebihi Viewport —
            // penyebab struktural utama gulir horizontal.
            const elements = container.querySelectorAll('*');
            for (const element of elements) {
                for (const fixedWidth of getFixedPixelWidths(element)) {
                    expect(fixedWidth).toBeLessThanOrEqual(width);
                }
            }

            // Setiap <img> wajib membawa batasan lebar responsif `max-w-full`
            // (Req 9.2/9.4). Tanpa <img>, loop terpenuhi secara trivial.
            const images = container.querySelectorAll('img');
            for (const img of images) {
                expect(img.className).toMatch(/(?:^|\s)max-w-full(?:\s|$)/);
            }
        },
    );
});
