/**
 * @file Unit test untuk komponen `ThemeToggle` (`ThemeToggle.jsx`).
 *
 * Memvalidasi perilaku tombol pengalih tema:
 * - Tombol memiliki nama aksesibel (accessible name) via `aria-label` yang
 *   mencerminkan aksi yang akan terjadi — Req 13.3.
 * - Mengklik tombol mengubah kelas `dark` pada elemen `<html>`
 *   (document.documentElement): light -> dark menambahkan kelas dan
 *   dark -> light menghapusnya — Req 10.2.
 * - Teks `aria-label` diperbarui setelah klik untuk mencerminkan aksi target
 *   yang baru — Req 13.3.
 *
 * `ThemeToggle` WAJIB dirender di dalam `<ThemeProvider>` karena mengonsumsi
 * hook `useTheme`. Ini adalah test contoh/integrasi (bukan property-based).
 * Lingkungan uji adalah jsdom (lihat `vite.config.js`) dengan matcher
 * `@testing-library/jest-dom`.
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ThemeToggle from './ThemeToggle.jsx';
import { ThemeProvider } from '../hooks/useTheme.js';
import { THEME_STORAGE_KEY, THEME_LIGHT, THEME_DARK } from '../lib/theme.js';

/**
 * Label `aria-label` yang dipakai komponen, mencerminkan aksi yang dituju.
 * "gelap" tampil saat tema saat ini terang; "terang" saat tema saat ini gelap.
 */
const LABEL_TO_DARK = 'Beralih ke mode gelap';
const LABEL_TO_LIGHT = 'Beralih ke mode terang';

describe('ThemeToggle', () => {
    beforeEach(() => {
        // Mulai dari kondisi bersih agar tiap test independen.
        document.documentElement.classList.remove('dark');
        localStorage.clear();
    });

    afterEach(() => {
        document.documentElement.classList.remove('dark');
        localStorage.clear();
    });

    it('tombol memiliki nama aksesibel (aria-label) yang mencerminkan tema saat ini (Req 13.3)', () => {
        // Tema awal: terang -> label mengajak beralih ke gelap.
        render(
            <ThemeProvider>
                <ThemeToggle />
            </ThemeProvider>,
        );

        const button = screen.getByRole('button', { name: LABEL_TO_DARK });
        expect(button).toBeInTheDocument();
        expect(button).toHaveAccessibleName(LABEL_TO_DARK);
    });

    it('saat tema gelap, tombol memiliki nama aksesibel untuk beralih ke terang (Req 13.3)', () => {
        // Simulasikan preferensi gelap tersimpan dari kunjungan sebelumnya.
        localStorage.setItem(THEME_STORAGE_KEY, THEME_DARK);

        render(
            <ThemeProvider>
                <ThemeToggle />
            </ThemeProvider>,
        );

        const button = screen.getByRole('button', { name: LABEL_TO_LIGHT });
        expect(button).toBeInTheDocument();
        expect(button).toHaveAccessibleName(LABEL_TO_LIGHT);
    });

    it('klik mengubah kelas `dark` pada <html> (Req 10.2)', () => {
        render(
            <ThemeProvider>
                <ThemeToggle />
            </ThemeProvider>,
        );

        // Kondisi awal: tema terang, tanpa kelas `dark`.
        expect(document.documentElement.classList.contains('dark')).toBe(false);

        const button = screen.getByRole('button');

        // light -> dark: kelas `dark` ditambahkan pada <html>.
        fireEvent.click(button);
        expect(document.documentElement.classList.contains('dark')).toBe(true);

        // dark -> light: kelas `dark` dihapus kembali.
        fireEvent.click(button);
        expect(document.documentElement.classList.contains('dark')).toBe(false);
    });

    it('aria-label diperbarui setelah klik untuk mencerminkan aksi target baru (Req 13.3)', () => {
        render(
            <ThemeProvider>
                <ThemeToggle />
            </ThemeProvider>,
        );

        // Awal terang: label mengajak ke gelap.
        expect(
            screen.getByRole('button', { name: LABEL_TO_DARK }),
        ).toBeInTheDocument();

        // Setelah klik (kini gelap): label mengajak ke terang.
        fireEvent.click(screen.getByRole('button'));
        expect(
            screen.getByRole('button', { name: LABEL_TO_LIGHT }),
        ).toBeInTheDocument();

        // Klik lagi (kembali terang): label kembali mengajak ke gelap.
        fireEvent.click(screen.getByRole('button'));
        expect(
            screen.getByRole('button', { name: LABEL_TO_DARK }),
        ).toBeInTheDocument();
    });
});
