/**
 * @file Unit test untuk komponen `Navbar` (`Navbar.jsx`).
 *
 * Memvalidasi perilaku bilah navigasi utama:
 * - Menampilkan tujuh tautan ke seluruh bagian dengan nilai `href` anchor
 *   yang benar (`#hero`, `#about`, ...), sesuai {@link SECTIONS} — Req 1.1.
 * - Tombol hamburger mengubah `aria-expanded` dari `false` ke `true` (dan
 *   kembali) saat diklik, serta merender/menyembunyikan panel menu mobile
 *   yang ditunjuk oleh `aria-controls` — Req 1.5.
 * - Tautan yang cocok dengan `activeId` menerima `aria-current="true"` — Req 1.4.
 *
 * `Navbar` merender {@link ThemeToggle} yang mengonsumsi hook `useTheme`,
 * sehingga komponen WAJIB dirender di dalam `<ThemeProvider>`. Ini adalah
 * test contoh/integrasi (bukan property-based). Lingkungan uji adalah jsdom
 * (lihat `vite.config.js`) dengan matcher `@testing-library/jest-dom`.
 *
 * Catatan: pada jsdom, kelas Tailwind yang menyembunyikan elemen secara visual
 * (mis. `hidden`, `md:flex`) TIDAK menghapus elemen dari DOM. Tautan desktop
 * dan tautan menu mobile dapat sama-sama hadir, sehingga query menggunakan
 * `getAllByRole` atau dibatasi lingkupnya pada `<nav>` / panel menu untuk
 * menghindari ambiguitas dari tautan duplikat.
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import Navbar from './Navbar.jsx';
import { ThemeProvider } from '../hooks/useTheme.js';
import { SECTIONS } from '../lib/sections.js';

/**
 * Helper untuk merender `Navbar` di dalam `ThemeProvider`.
 * @param {{ activeId?: string }} [props] Properti yang diteruskan ke `Navbar`.
 */
function renderNavbar(props = {}) {
    return render(
        <ThemeProvider>
            <Navbar {...props} />
        </ThemeProvider>,
    );
}

describe('Navbar', () => {
    beforeEach(() => {
        // Mulai dari kondisi bersih agar tiap test independen.
        document.documentElement.classList.remove('dark');
        localStorage.clear();
    });

    afterEach(() => {
        document.documentElement.classList.remove('dark');
        localStorage.clear();
    });

    it('menampilkan tautan ke seluruh bagian dengan href anchor yang benar di panel menu (Req 1.1)', () => {
        renderNavbar();

        // Seluruh bagian harus terwakili.
        expect(SECTIONS).toHaveLength(7);

        // Buka panel menu untuk mengakses daftar tautan lengkap.
        fireEvent.click(screen.getByRole('button', { name: 'Buka menu navigasi' }));
        const menu = document.getElementById('mobile-menu');
        expect(menu).not.toBeNull();

        for (const { id, label } of SECTIONS) {
            const link = within(menu).getByRole('link', { name: label });
            expect(link).toBeInTheDocument();
            expect(link).toHaveAttribute('href', `#${id}`);
        }

        // Tautan ke halaman Proyek terpisah (pemuatan halaman penuh).
        const projectsLink = within(menu).getByRole('link', { name: 'Proyek' });
        expect(projectsLink).toHaveAttribute('href', '/projects.html');
    });

    it('menyetel aria-current="true" pada tautan yang cocok dengan activeId (Req 1.4)', () => {
        const activeSection = SECTIONS[2]; // "Pengalaman" (#experience)
        renderNavbar({ activeId: activeSection.id });

        fireEvent.click(screen.getByRole('button', { name: 'Buka menu navigasi' }));
        const menu = document.getElementById('mobile-menu');
        const activeLink = within(menu).getByRole('link', { name: activeSection.label });
        expect(activeLink).toHaveAttribute('aria-current', 'true');

        // Tautan lain di panel menu tidak boleh menyandang aria-current.
        for (const { id, label } of SECTIONS) {
            if (id === activeSection.id) {
                continue;
            }
            const link = within(menu).getByRole('link', { name: label });
            expect(link).not.toHaveAttribute('aria-current');
        }
    });

    it('tanpa activeId, tidak ada tautan yang ditandai aria-current (Req 1.4)', () => {
        renderNavbar();

        fireEvent.click(screen.getByRole('button', { name: 'Buka menu navigasi' }));
        const menu = document.getElementById('mobile-menu');
        for (const { label } of SECTIONS) {
            const link = within(menu).getByRole('link', { name: label });
            expect(link).not.toHaveAttribute('aria-current');
        }
    });

    it('tombol hamburger mengubah aria-expanded dari false ke true dan kembali saat diklik (Req 1.5)', () => {
        renderNavbar();

        // Saat tertutup: label "Buka menu navigasi" dengan aria-expanded=false.
        const openButton = screen.getByRole('button', { name: 'Buka menu navigasi' });
        expect(openButton).toHaveAttribute('aria-expanded', 'false');

        // Klik untuk membuka: aria-expanded menjadi true.
        fireEvent.click(openButton);
        const closeButton = screen.getByRole('button', { name: 'Tutup menu navigasi' });
        expect(closeButton).toHaveAttribute('aria-expanded', 'true');

        // Klik lagi untuk menutup: aria-expanded kembali false.
        fireEvent.click(closeButton);
        expect(
            screen.getByRole('button', { name: 'Buka menu navigasi' }),
        ).toHaveAttribute('aria-expanded', 'false');
    });

    it('merender panel menu mobile yang ditunjuk aria-controls hanya saat terbuka (Req 1.5)', () => {
        renderNavbar();

        const toggleButton = screen.getByRole('button', { name: 'Buka menu navigasi' });
        const menuId = toggleButton.getAttribute('aria-controls');
        expect(menuId).toBe('mobile-menu');

        // Tertutup: panel menu mobile belum ada di DOM.
        expect(document.getElementById(menuId)).toBeNull();

        // Terbuka: panel menu mobile dirender dan berisi tujuh tautan.
        fireEvent.click(toggleButton);
        const mobileMenu = document.getElementById(menuId);
        expect(mobileMenu).not.toBeNull();

        const mobileLinks = within(mobileMenu).getAllByRole('link');
        // Tujuh tautan bagian + satu tautan ke halaman Proyek terpisah.
        expect(mobileLinks).toHaveLength(SECTIONS.length + 1);
        for (const { id, label } of SECTIONS) {
            const link = within(mobileMenu).getByRole('link', { name: label });
            expect(link).toHaveAttribute('href', `#${id}`);
        }
    });
});
