/**
 * @file Property-based test untuk komponen `Experience` (`Experience.jsx`).
 *
 * Memvalidasi Correctness Property 2: kelengkapan render item daftar. Untuk
 * sembarang koleksi data pengalaman kerja dengan field wajib, komponen
 * Experience SHALL menampilkan seluruh field wajib setiap item — jabatan
 * (`title`), perusahaan (`company`), periode (`period`), dan setiap tanggung
 * jawab (`responsibility`) — tanpa ada yang hilang.
 *
 * _Requirements: 4.1, 4.2, 4.3_
 *
 * Karena `Experience.jsx` mengimpor `experiences` langsung dari
 * `../data/cv.js` (bukan via props), modul tersebut di-mock dengan holder yang
 * mutabel (`vi.hoisted`) sehingga setiap iterasi fast-check dapat menyuntikkan
 * data yang dihasilkan secara segar lalu merender komponen dengannya. Field
 * tiap item diprefiks token unik berbasis `id` agar `getByText` Testing Library
 * tidak ambigu. Lingkungan uji adalah jsdom (lihat `vite.config.js`) dengan
 * matcher `@testing-library/jest-dom`.
 */

import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import fc from 'fast-check';

// Holder mutabel untuk data yang disuntikkan per iterasi. `vi.hoisted`
// memastikan objek ini tersedia saat factory `vi.mock` (yang di-hoist) dievaluasi.
const cvMock = vi.hoisted(() => ({ experiences: [] }));

// Ganti modul sumber data. Getter membuat named import `experiences` selalu
// membaca nilai terkini dari holder pada tiap render.
vi.mock('../data/cv.js', () => ({
    get experiences() {
        return cvMock.experiences;
    },
}));

// Import komponen SETELAH mock didefinisikan.
import Experience from './Experience.jsx';

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

/** Generator `startDate`/`endDate` berformat "YYYY-MM". */
const yearMonthArb = fc
    .record({
        year: fc.integer({ min: 1970, max: 2099 }),
        month: fc.integer({ min: 1, max: 12 }),
    })
    .map(({ year, month }) => `${year}-${String(month).padStart(2, '0')}`);

/**
 * Generator daftar pengalaman kerja. Panjang dibatasi (1–5) demi performa.
 * Setiap field diprefiks token unik berbasis indeks/`id` sehingga:
 * - `id` unik dalam array (kunci React stabil), dan
 * - setiap teks yang dirender unik & tak saling bertabrakan/menjadi substring
 *   satu sama lain, membuat `getByText` tidak ambigu antar item maupun field.
 */
const experiencesArb = fc
    .array(
        fc.record({
            title: wordArb,
            company: wordArb,
            period: wordArb,
            startDate: yearMonthArb,
            endDate: fc.oneof(yearMonthArb, fc.constant(null)),
            responsibilities: fc.array(wordArb, { minLength: 1, maxLength: 4 }),
        }),
        { minLength: 1, maxLength: 5 },
    )
    .map((items) =>
        items.map((item, i) => {
            const id = `exp${i}`;
            return {
                id,
                title: `${id}-title-${item.title}`,
                company: `${id}-company-${item.company}`,
                period: `${id}-period-${item.period}`,
                startDate: item.startDate,
                endDate: item.endDate,
                responsibilities: item.responsibilities.map(
                    (resp, j) => `${id}-resp${j}-${resp}`,
                ),
            };
        }),
    );

describe('Experience — Property 2', () => {
    // Feature: developer-portfolio-website, Property 2: Kelengkapan render item daftar
    // Untuk sembarang koleksi data pengalaman kerja dengan field wajib, komponen
    // daftar Experience yang dirender SHALL menampilkan seluruh field wajib setiap
    // item (title, company, period, dan setiap responsibility) tanpa ada yang
    // hilang. Validates: Requirements 4.1, 4.2, 4.3
    it('merender title, company, period, dan setiap responsibility dari semua item', () => {
        fc.assert(
            fc.property(experiencesArb, (experiences) => {
                // Suntikkan data yang dihasilkan, lalu render komponen.
                cvMock.experiences = experiences;
                render(<Experience />);

                // Setiap field wajib dari setiap item harus muncul di dokumen.
                for (const experience of experiences) {
                    expect(screen.getByText(experience.title)).toBeInTheDocument();
                    expect(screen.getByText(experience.company)).toBeInTheDocument();
                    expect(screen.getByText(experience.period)).toBeInTheDocument();
                    for (const responsibility of experience.responsibilities) {
                        expect(screen.getByText(responsibility)).toBeInTheDocument();
                    }
                }

                // Reset DOM agar iterasi berikutnya tidak menabrak elemen duplikat.
                cleanup();
            }),
            { numRuns: 100 },
        );
    });
});
