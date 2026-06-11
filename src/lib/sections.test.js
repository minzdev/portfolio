/**
 * @file Property-based test untuk `getActiveSection`.
 * Memvalidasi Correctness Property 1: pemilihan bagian aktif selalu valid —
 * untuk daftar posisi yang tidak kosong dan `scrollY` apa pun, fungsi
 * mengembalikan tepat satu id yang ada dalam daftar, yaitu bagian terakhir
 * yang `top <= scrollY + offset` (atau bagian pertama bila belum ada yang
 * terlewati).
 * _Requirements: 1.4_
 */

import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import { getActiveSection } from './sections.js';

/**
 * Generator daftar posisi bagian `{ id, top }` yang tidak kosong dengan id unik.
 *
 * Id dijamin unik agar asersi "tepat satu id yang valid" bermakna: nilai yang
 * dikembalikan dapat dipetakan kembali ke satu bagian tertentu. `top` mencakup
 * nilai negatif dan besar untuk menguji kasus tepi.
 */
const sectionPositionsArb = fc
    .uniqueArray(
        fc.record({
            id: fc.string({ minLength: 1, maxLength: 12 }),
            top: fc.integer({ min: -10000, max: 100000 }),
        }),
        { minLength: 1, maxLength: 10, selector: (p) => p.id },
    );

/** Nilai `scrollY` bervariasi termasuk negatif dan besar. */
const scrollYArb = fc.integer({ min: -5000, max: 200000 });

/** Nilai `offset` bervariasi termasuk negatif dan besar. */
const offsetArb = fc.integer({ min: -1000, max: 1000 });

/**
 * Implementasi referensi mandiri untuk semantik seleksi yang diharapkan:
 * bagian TERAKHIR (menurut urutan daftar) yang `top <= scrollY + offset`,
 * atau bagian PERTAMA bila tidak ada yang terlewati.
 */
function expectedActiveId(positions, scrollY, offset) {
    const threshold = scrollY + offset;
    let expected = positions[0].id;
    for (const position of positions) {
        if (position.top <= threshold) {
            expected = position.id;
        }
    }
    return expected;
}

describe('getActiveSection — Property 1', () => {
    // Feature: developer-portfolio-website, Property 1: Pemilihan bagian aktif
    // selalu valid — untuk setiap daftar posisi bagian (id, top) yang tidak kosong
    // dan nilai scrollY apa pun, getActiveSection SHALL mengembalikan tepat satu id
    // yang ada dalam daftar, yaitu bagian terakhir yang top-nya <= scrollY + offset
    // (atau bagian pertama jika belum ada yang terlewati). Validates: Requirements 1.4
    it('mengembalikan tepat satu id yang ada dalam daftar', () => {
        fc.assert(
            fc.property(sectionPositionsArb, scrollYArb, offsetArb, (positions, scrollY, offset) => {
                const result = getActiveSection(positions, scrollY, offset);

                // Tepat satu id yang ada dalam daftar: nilai yang dikembalikan
                // harus cocok dengan tepat satu posisi (id unik per generator).
                const matches = positions.filter((p) => p.id === result);
                expect(matches).toHaveLength(1);
            }),
            { numRuns: 100 },
        );
    });

    it('mengembalikan bagian terakhir yang terlewati, atau bagian pertama bila belum ada', () => {
        fc.assert(
            fc.property(sectionPositionsArb, scrollYArb, offsetArb, (positions, scrollY, offset) => {
                const result = getActiveSection(positions, scrollY, offset);
                expect(result).toBe(expectedActiveId(positions, scrollY, offset));
            }),
            { numRuns: 100 },
        );
    });
});
