/**
 * @file Unit test untuk komponen `Hero` (`Hero.jsx`).
 *
 * Memvalidasi konten dan perilaku Hero_Section pembuka halaman:
 * - Menampilkan nama profil "Suparman" (`profile.name`) — Req 2.1.
 * - Menampilkan peran profesional sebagai Web Developer (`profile.role`) — Req 2.1.
 * - Menyediakan dua call-to-action: tautan menuju Contact_Section (`#contact`,
 *   "Hubungi Saya") dan tautan menuju Experience_Section (`#experience`,
 *   "Lihat Pengalaman") — Req 2.2.
 * - Total durasi animasi masuk untuk empat anak bertahap tetap di bawah batas
 *   maksimum 1000ms — Req 2.3. Total dihitung dari konstanta gerak yang
 *   diekspor `motion.js` agar test tetap akurat bila konstanta berubah.
 *
 * Ini adalah test contoh/unit (bukan property-based), mengikuti pola pada
 * `ThemeToggle.test.jsx`. Lingkungan uji adalah jsdom (lihat `vite.config.js`)
 * dengan matcher `@testing-library/jest-dom`.
 *
 * Catatan: nilai konten diuji terhadap data nyata dari `src/data/cv.js`
 * (`profile`) alih-alih string yang ditanam langsung, agar test tetap selaras
 * dengan satu sumber kebenaran.
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Hero from './Hero.jsx';
import { profile } from '../data/cv.js';
import {
    DEFAULT_DURATION,
    DEFAULT_STAGGER,
    DEFAULT_DELAY_CHILDREN,
} from '../lib/motion.js';

describe('Hero', () => {
    it('menampilkan nama profil "Suparman" pada heading utama (Req 2.1)', () => {
        render(<Hero />);

        // Satu-satunya <h1> per halaman memuat nama profil.
        const heading = screen.getByRole('heading', { level: 1 });
        expect(heading).toBeInTheDocument();
        expect(heading).toHaveTextContent(profile.name);
        expect(profile.name).toBe('Suparman');
    });

    it('menampilkan peran profesional sebagai Web Developer (Req 2.1)', () => {
        render(<Hero />);

        const heading = screen.getByRole('heading', { level: 1 });
        // Peran ditampilkan bersama nama di dalam <h1>.
        expect(heading).toHaveTextContent(profile.role);
        expect(profile.role).toBe('Web Developer');
    });

    it('menyediakan dua CTA menuju Contact (#contact) dan Experience (#experience) (Req 2.2)', () => {
        render(<Hero />);

        // CTA utama: menuju Contact_Section.
        const contactCta = screen.getByRole('link', { name: /Hubungi Saya/i });
        expect(contactCta).toHaveAttribute('href', '#contact');

        // CTA sekunder: menuju Experience_Section.
        const experienceCta = screen.getByRole('link', { name: /Lihat Pengalaman/i });
        expect(experienceCta).toHaveAttribute('href', '#experience');

        // Tepat dua call-to-action pada Hero.
        expect(screen.getAllByRole('link')).toHaveLength(2);
    });

    it('total durasi animasi masuk tetap <= 1000ms (Req 2.3)', () => {
        // Hero memuat empat anak bertahap (eyebrow, heading, ringkasan, CTA).
        const childCount = 4;

        // Total = delayChildren + (n-1)*staggerChildren + durasi anak terakhir.
        // Dengan konstanta default: 0.1 + 3*0.1 + 0.5 = 0.9s.
        const totalSeconds =
            DEFAULT_DELAY_CHILDREN +
            (childCount - 1) * DEFAULT_STAGGER +
            DEFAULT_DURATION;
        const totalMs = totalSeconds * 1000;

        expect(totalMs).toBeLessThanOrEqual(1000);
    });
});
