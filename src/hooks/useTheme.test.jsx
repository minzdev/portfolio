/**
 * @file Unit test untuk `ThemeProvider` dan hook `useTheme` (`useTheme.js`).
 *
 * Memvalidasi perilaku integrasi React Context tema:
 * - Memanggil `toggleTheme` mengubah kelas `dark` pada elemen `<html>`
 *   (document.documentElement) — Req 10.2.
 * - Setiap perubahan tema dipersistensi ke `localStorage` di bawah kunci
 *   `THEME_STORAGE_KEY` — Req 10.3.
 * - `useTheme` melempar error ketika dipakai di luar `<ThemeProvider>`.
 *
 * Ini adalah test contoh/integrasi (bukan property-based). Lingkungan uji
 * adalah jsdom (lihat `vite.config.js`) dengan matcher `@testing-library/jest-dom`.
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { ThemeProvider, useTheme } from './useTheme.js';
import { THEME_STORAGE_KEY, THEME_LIGHT, THEME_DARK } from '../lib/theme.js';

/**
 * Komponen harness yang mengonsumsi `useTheme` dan merender:
 * - teks tema saat ini (untuk asersi state), dan
 * - tombol yang memicu `toggleTheme` saat diklik.
 *
 * @returns {import('react').ReactElement} Harness uji.
 */
function ThemeHarness() {
    const { theme, toggleTheme } = useTheme();
    return (
        <div>
            <span data-testid="theme-value">{theme}</span>
            <button type="button" onClick={toggleTheme}>
                Toggle
            </button>
        </div>
    );
}

describe('ThemeProvider + useTheme', () => {
    beforeEach(() => {
        // Mulai dari kondisi bersih agar tiap test independen.
        document.documentElement.classList.remove('dark');
        localStorage.clear();
    });

    afterEach(() => {
        document.documentElement.classList.remove('dark');
        localStorage.clear();
    });

    it('memulai pada tema terang (default jsdom) tanpa kelas `dark` pada <html>', () => {
        render(
            <ThemeProvider>
                <ThemeHarness />
            </ThemeProvider>,
        );

        expect(screen.getByTestId('theme-value')).toHaveTextContent(THEME_LIGHT);
        expect(document.documentElement.classList.contains('dark')).toBe(false);
    });

    it('toggle mengubah kelas `dark` pada <html> (Req 10.2)', () => {
        render(
            <ThemeProvider>
                <ThemeHarness />
            </ThemeProvider>,
        );

        const button = screen.getByRole('button', { name: /toggle/i });

        // light -> dark: kelas `dark` ditambahkan.
        fireEvent.click(button);
        expect(screen.getByTestId('theme-value')).toHaveTextContent(THEME_DARK);
        expect(document.documentElement.classList.contains('dark')).toBe(true);

        // dark -> light: kelas `dark` dihapus kembali.
        fireEvent.click(button);
        expect(screen.getByTestId('theme-value')).toHaveTextContent(THEME_LIGHT);
        expect(document.documentElement.classList.contains('dark')).toBe(false);
    });

    it('toggle menulis nilai tema baru ke localStorage (Req 10.3)', () => {
        render(
            <ThemeProvider>
                <ThemeHarness />
            </ThemeProvider>,
        );

        // Efek awal mempersistensi tema awal (light).
        expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe(THEME_LIGHT);

        const button = screen.getByRole('button', { name: /toggle/i });

        fireEvent.click(button);
        expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe(THEME_DARK);

        fireEvent.click(button);
        expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe(THEME_LIGHT);
    });

    it('menerapkan tema tersimpan saat kunjungan ulang (Req 10.3)', () => {
        // Simulasikan preferensi tersimpan dari kunjungan sebelumnya.
        localStorage.setItem(THEME_STORAGE_KEY, THEME_DARK);

        render(
            <ThemeProvider>
                <ThemeHarness />
            </ThemeProvider>,
        );

        expect(screen.getByTestId('theme-value')).toHaveTextContent(THEME_DARK);
        expect(document.documentElement.classList.contains('dark')).toBe(true);
    });

    it('useTheme melempar error ketika dipakai di luar <ThemeProvider>', () => {
        // Menahan log error React yang diharapkan agar output uji tetap bersih.
        const consoleError = console.error;
        console.error = () => { };
        try {
            expect(() =>
                act(() => {
                    render(<ThemeHarness />);
                }),
            ).toThrow(/ThemeProvider/);
        } finally {
            console.error = consoleError;
        }
    });
});
