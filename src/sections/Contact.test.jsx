/**
 * @file Unit test untuk komponen `Contact` (`Contact.jsx`).
 *
 * Memvalidasi konten Contact_Section terkait tautan kontak dan media sosial:
 * - Tautan email memiliki href `mailto:suparman0921@gmail.com` (Req 8.1, 8.2).
 * - Tautan telepon memiliki href `tel:+6285797522591` yang dibangun dari
 *   `contact.phoneHref` melalui `buildTelHref` (Req 8.1, 8.3).
 * - Tautan ikon media sosial (GitHub, LinkedIn) memiliki nama aksesibilitas
 *   melalui `aria-label` sehingga dapat diakses oleh pembaca layar (Req 13.3).
 *
 * Ini adalah test contoh/unit (bukan property-based), mengikuti pola pada
 * `About.test.jsx`. Lingkungan uji adalah jsdom (lihat `vite.config.js`) dengan
 * matcher `@testing-library/jest-dom`.
 *
 * Catatan: nilai konten diuji terhadap data nyata dari `src/data/cv.js`
 * (`contact`) alih-alih string yang ditanam langsung, agar test tetap selaras
 * dengan satu sumber tunggal kebenaran.
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Contact from './Contact.jsx';
import { contact } from '../data/cv.js';

describe('Contact', () => {
    it('memiliki tautan email dengan href mailto: yang benar (Req 8.1, 8.2)', () => {
        render(<Contact />);

        // Tautan email dapat ditemukan melalui alamat email yang ditampilkan.
        const emailLink = screen.getByRole('link', { name: contact.email });
        expect(emailLink).toHaveAttribute('href', `mailto:${contact.email}`);
        expect(emailLink).toHaveAttribute('href', 'mailto:suparman0921@gmail.com');
    });

    it('memiliki tautan telepon dengan href tel: yang ternormalisasi (Req 8.1, 8.3)', () => {
        render(<Contact />);

        // Tautan telepon menampilkan nomor versi tampilan namun href-nya
        // ternormalisasi menjadi tel:+6285797522591.
        const phoneLink = screen.getByRole('link', { name: contact.phone });
        expect(phoneLink).toHaveAttribute('href', 'tel:+6285797522591');
    });

    it('memiliki tautan ikon media sosial dengan nama aksesibilitas (aria-label) (Req 13.3)', () => {
        render(<Contact />);

        // Setiap tautan sosial harus dapat diakses melalui label-nya.
        for (const social of contact.socials) {
            const socialLink = screen.getByRole('link', { name: social.label });
            expect(socialLink).toBeInTheDocument();
            expect(socialLink).toHaveAttribute('href', social.url);
        }

        // Pastikan GitHub dan LinkedIn secara eksplisit dapat diakses.
        expect(screen.getByRole('link', { name: 'GitHub' })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'LinkedIn' })).toBeInTheDocument();
    });
});
