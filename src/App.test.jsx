/**
 * @file Integration / structural test untuk komponen akar `App` (`App.jsx`).
 *
 * Berbeda dari unit test per-komponen, test ini merender keseluruhan pohon
 * `App` dan memverifikasi properti struktural lintas-komponen yang menopang
 * SEO dan aksesibilitas:
 * - **Tepat satu `<h1>`** pada seluruh halaman demi struktur heading semantik
 *   (Req 11.4). Hanya Hero_Section yang memuat `<h1>`; bagian lain memakai
 *   `<h2>` via wrapper `Section`.
 * - **Setiap `<img>` memiliki atribut `alt`** sehingga gambar selalu memiliki
 *   teks alternatif (Req 11.5). Gambar dekoratif tetap wajib `alt=""` (string
 *   kosong dianggap valid karena atributnya tetap hadir).
 * - **Tombol ikon-only memiliki nama aksesibel** (`aria-label`) karena tidak
 *   memiliki teks terlihat — mis. ThemeToggle dan tombol hamburger (Req 13.3).
 * - **Elemen interaktif memiliki indikator fokus terlihat** melalui utilitas
 *   `focus-visible:`/`focus:` (Req 13.2).
 * - **Tombol ikon-only memenuhi ukuran Touch_Target minimum 44×44px** melalui
 *   utilitas `min-h-11 min-w-11` (Req 9.3).
 *
 * `App` mengonsumsi `useTheme` (ThemeToggle) dan merender `SEO`
 * (react-helmet-async), sehingga pohon WAJIB dirender di dalam
 * `<HelmetProvider>` dan `<ThemeProvider>` agar konteks tersedia.
 *
 * Catatan jsdom: kelas Tailwind yang menyembunyikan elemen secara visual
 * (mis. `hidden`, `md:flex`, `md:hidden`) TIDAK menghapus elemen dari DOM.
 * Karena itu tautan navigasi desktop dan kontrol mobile dapat sama-sama hadir;
 * asersi struktural di bawah memperhitungkan hal ini dengan mengueri seluruh
 * DOM (`container`/`document`) alih-alih bergantung pada visibilitas.
 *
 * Ini adalah test contoh/integrasi (BUKAN property-based), sehingga tidak
 * memakai fast-check. Lingkungan uji adalah jsdom (lihat `vite.config.js`)
 * dengan matcher `@testing-library/jest-dom`.
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
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
 * Menentukan apakah sebuah tombol bersifat "ikon-only", yaitu tidak memiliki
 * teks terlihat (hanya ikon SVG). Tombol seperti ini wajib memiliki nama
 * aksesibel via `aria-label` (Req 13.3).
 *
 * @param {HTMLElement} button Elemen tombol yang diperiksa.
 * @returns {boolean} `true` bila tombol tidak memiliki teks terlihat.
 */
function isIconOnlyButton(button) {
    return (button.textContent ?? '').trim().length === 0;
}

describe('App (structural / integration)', () => {
    beforeEach(() => {
        // Mulai dari kondisi bersih agar tiap test independen.
        document.documentElement.classList.remove('dark');
        localStorage.clear();
    });

    afterEach(() => {
        document.documentElement.classList.remove('dark');
        localStorage.clear();
    });

    it('merender tepat satu elemen <h1> pada halaman (Req 11.4)', () => {
        const { container } = renderApp();

        const headings = container.querySelectorAll('h1');
        expect(headings).toHaveLength(1);
    });

    it('menyertakan atribut alt pada setiap elemen <img> (Req 11.5)', () => {
        const { container } = renderApp();

        const images = container.querySelectorAll('img');
        // Tiap gambar wajib memiliki atribut `alt` (boleh kosong untuk gambar
        // dekoratif). Bila tidak ada `<img>`, asersi terpenuhi secara trivial.
        for (const img of images) {
            expect(img).toHaveAttribute('alt');
        }
    });

    it('memberi nama aksesibel pada setiap tombol ikon-only (Req 13.3)', () => {
        renderApp();

        const buttons = screen.getAllByRole('button');
        const iconOnlyButtons = buttons.filter(isIconOnlyButton);

        // Pastikan memang ada tombol ikon-only (ThemeToggle, hamburger) agar
        // test tidak lolos secara kosong.
        expect(iconOnlyButtons.length).toBeGreaterThan(0);

        for (const button of iconOnlyButtons) {
            expect(button).toHaveAccessibleName();
        }
    });

    it('menerapkan utilitas indikator fokus pada setiap elemen interaktif (Req 13.2)', () => {
        const { container } = renderApp();

        const interactiveElements = container.querySelectorAll('a, button');
        expect(interactiveElements.length).toBeGreaterThan(0);

        // Indikator fokus terlihat diterapkan via utilitas `focus-visible:` atau
        // `focus:` (mis. tautan skip-to-content memakai `focus:`).
        for (const element of interactiveElements) {
            expect(element.className).toMatch(/focus(-visible)?:/);
        }
    });

    it('memenuhi ukuran Touch_Target minimum 44px pada tombol ikon-only (Req 9.3)', () => {
        renderApp();

        const buttons = screen.getAllByRole('button');
        const iconOnlyButtons = buttons.filter(isIconOnlyButton);

        expect(iconOnlyButtons.length).toBeGreaterThan(0);

        // Tombol ikon-only (ThemeToggle, hamburger) memakai `min-h-11 min-w-11`
        // (44×44px) sebagai Touch_Target.
        for (const button of iconOnlyButtons) {
            expect(button.className).toMatch(/min-h-11/);
            expect(button.className).toMatch(/min-w-11/);
        }
    });
});
