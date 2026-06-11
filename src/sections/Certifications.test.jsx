/**
 * @file Property-based test untuk komponen `Certifications` (`Certifications.jsx`).
 *
 * Memvalidasi Correctness Property 2: kelengkapan render item daftar. Untuk
 * sembarang koleksi data sertifikasi dengan field wajib, komponen
 * Certifications SHALL menampilkan seluruh field wajib setiap item — nama
 * (`name`), lembaga penerbit (`issuer`), dan tahun (`year`) — tanpa ada yang
 * hilang.
 *
 * _Requirements: 7.1, 7.2_
 *
 * Karena `Certifications.jsx` mengimpor `certifications` langsung dari
 * `../data/cv.js` (bukan via props), modul tersebut di-mock dengan holder yang
 * mutabel (`vi.hoisted`) sehingga setiap iterasi fast-check dapat menyuntikkan
 * data yang dihasilkan secara segar lalu merender komponen dengannya. Field
 * tiap item diprefiks token unik berbasis indeks agar `getByText` Testing
 * Library tidak ambigu. Lingkungan uji adalah jsdom (lihat `vite.config.js`)
 * dengan matcher `@testing-library/jest-dom`.
 */

import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import fc from 'fast-check';

// Holder mutabel untuk data yang disuntikkan per iterasi. `vi.hoisted`
// memastikan objek ini tersedia saat factory `vi.mock` (yang di-hoist) dievaluasi.
const cvMock = vi.hoisted(() => ({ certifications: [] }));

// Ganti modul sumber data. Getter membuat named import `certifications` selalu
// membaca nilai terkini dari holder pada tiap render.
vi.mock('../data/cv.js', () => ({
    get certifications() {
        return cvMock.certifications;
    },
}));

// Import komponen SETELAH mock didefinisikan.
import Certifications from './Certifications.jsx';

afterEach(() => {
    cleanup();
});

/**
 * Generator kata pendek dari charset alfanumerik agar teks dapat diquery
 * Testing Library secara andal (tanpa whitespace-only/karakter kontrol).
 */
const wordArb = fc
    .array(fc.constantFrom(...'abcdefghijklmnopqrstuvwxyz0123456789'.split('')), {
        minLength: 3,
        maxLength: 8,
    })
    .map((chars) => chars.join(''));

/**
 * Generator daftar sertifikasi. Panjang dibatasi (1–6) demi performa.
 * Setiap field diprefiks token unik berbasis indeks sehingga:
 * - kombinasi `name`/`year` unik (kunci React stabil), dan
 * - setiap teks yang dirender unik & tak saling bertabrakan/menjadi substring
 *   satu sama lain, membuat `getByText` tidak ambigu antar item maupun field.
 */
const certificationsArb = fc
    .array(
        fc.record({
            name: wordArb,
            issuer: wordArb,
            year: wordArb,
        }),
        { minLength: 1, maxLength: 6 },
    )
    .map((items) =>
        items.map((item, i) => {
            const id = `cert${i}`;
            return {
                name: `${id}-name-${item.name}`,
                issuer: `${id}-issuer-${item.issuer}`,
                year: `${id}-year-${item.year}`,
            };
        }),
    );

describe('Certifications — Property 2', () => {
    // Feature: developer-portfolio-website, Property 2: Kelengkapan render item daftar
    // Untuk sembarang koleksi data sertifikasi dengan field wajib, komponen
    // daftar Certifications yang dirender SHALL menampilkan seluruh field wajib
    // setiap item (name, issuer, year) tanpa ada yang hilang.
    // Validates: Requirements 7.1, 7.2
    it('merender name, issuer, dan year dari semua item', () => {
        fc.assert(
            fc.property(certificationsArb, (certifications) => {
                // Suntikkan data yang dihasilkan, lalu render komponen.
                cvMock.certifications = certifications;
                render(<Certifications />);

                // Setiap field wajib dari setiap item harus muncul di dokumen.
                for (const cert of certifications) {
                    expect(screen.getByText(cert.name)).toBeInTheDocument();
                    expect(screen.getByText(cert.issuer)).toBeInTheDocument();
                    expect(screen.getByText(cert.year)).toBeInTheDocument();
                }

                // Reset DOM agar iterasi berikutnya tidak menabrak elemen duplikat.
                cleanup();
            }),
            { numRuns: 100 },
        );
    });
});
