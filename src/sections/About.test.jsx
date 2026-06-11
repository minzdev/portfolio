/**
 * @file Unit test untuk komponen `About` (`About.jsx`).
 *
 * Memvalidasi konten About_Section:
 * - Memuat ringkasan profil profesional (`profile.summary`) yang mencakup latar
 *   belakang S1 Teknologi Informasi, sertifikasi Junior Web Developer & Analis
 *   Program, serta status alumni DBS Foundation Coding Camp — Req 3.1.
 * - Menampilkan lokasi "Jakarta Selatan, DKI Jakarta" (`profile.location`) — Req 3.2.
 *
 * Ini adalah test contoh/unit (bukan property-based), mengikuti pola pada
 * `Hero.test.jsx`. Lingkungan uji adalah jsdom (lihat `vite.config.js`) dengan
 * matcher `@testing-library/jest-dom`.
 *
 * Catatan: nilai konten diuji terhadap data nyata dari `src/data/cv.js`
 * (`profile`) alih-alih string yang ditanam langsung, agar test tetap selaras
 * dengan satu sumber kebenaran.
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import About from './About.jsx';
import { profile } from '../data/cv.js';

describe('About', () => {
    it('memuat ringkasan profil profesional (Req 3.1)', () => {
        render(<About />);

        // Ringkasan penuh dirender apa adanya dari sumber tunggal kebenaran.
        expect(screen.getByText(profile.summary)).toBeInTheDocument();
    });

    it('menyebutkan latar belakang S1 TI, sertifikasi, dan alumni DBS dalam ringkasan (Req 3.1)', () => {
        render(<About />);

        // Ringkasan harus memuat poin-poin kunci profil.
        expect(profile.summary).toMatch(/S1 Teknologi Informasi/i);
        expect(profile.summary).toMatch(/Junior Web Developer/i);
        expect(profile.summary).toMatch(/Analis Program/i);
        expect(profile.summary).toMatch(/DBS Foundation Coding Camp/i);
    });

    it('menampilkan lokasi "Jakarta Selatan, DKI Jakarta" (Req 3.2)', () => {
        render(<About />);

        expect(screen.getByText(profile.location)).toBeInTheDocument();
        expect(profile.location).toBe('Jakarta Selatan, DKI Jakarta');
    });
});
