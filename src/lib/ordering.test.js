/**
 * @file Property-based test untuk `sortExperiencesByRecency`.
 * Memvalidasi Correctness Property 3: pengurutan monoton terbaru→terlama
 * sekaligus merupakan permutasi dari daftar masukan.
 * _Requirements: 4.4_
 */

import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import { sortExperiencesByRecency } from './ordering.js';

/**
 * Generator `startDate` valid berformat "YYYY-MM" (bulan 01–12).
 */
const validStartDateArb = fc
    .record({
        year: fc.integer({ min: 1970, max: 2099 }),
        month: fc.integer({ min: 1, max: 12 }),
    })
    .map(({ year, month }) => `${year}-${String(month).padStart(2, '0')}`);

/**
 * Generator `startDate` yang tak terparse: string sembarang yang tidak cocok
 * pola "YYYY-MM", string kosong, atau nilai non-string.
 */
const unparsableStartDateArb = fc.oneof(
    fc.constant(''),
    fc.constant(null),
    fc.constant(undefined),
    fc.integer(),
    fc.string({ maxLength: 12 }).filter((s) => !/^\d{4}-(0[1-9]|1[0-2])$/.test(s)),
);

/**
 * Generator satu Experience. `startDate` bisa valid atau tak terparse.
 * `id` unik per item dipakai untuk asersi permutasi.
 */
const experienceArb = fc.record({
    id: fc.string({ maxLength: 12 }),
    startDate: fc.oneof(validStartDateArb, unparsableStartDateArb),
});

/** Daftar Experience dengan panjang dibatasi agar pengujian efisien. */
const experiencesArb = fc.array(experienceArb, { maxLength: 20 });

/**
 * Mengembalikan kunci urut sebanding atau `null` untuk item tak terparse.
 */
function sortKey(startDate) {
    return typeof startDate === 'string' && /^\d{4}-(0[1-9]|1[0-2])$/.test(startDate)
        ? startDate
        : null;
}

/**
 * Multiset key (mengabaikan urutan) untuk membandingkan dua daftar sebagai
 * permutasi tanpa bergantung pada referensi objek.
 */
function multiset(list) {
    const counts = new Map();
    for (const item of list) {
        const key = JSON.stringify(item);
        counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    return counts;
}

function multisetsEqual(a, b) {
    const ma = multiset(a);
    const mb = multiset(b);
    if (ma.size !== mb.size) return false;
    for (const [key, count] of ma) {
        if (mb.get(key) !== count) return false;
    }
    return true;
}

describe('sortExperiencesByRecency — Property 3', () => {
    // Feature: developer-portfolio-website, Property 3: Pengurutan pengalaman kerja
    // SHALL menghasilkan daftar yang terurut secara monoton dari startDate terbaru
    // ke terlama dan merupakan permutasi dari daftar masukan (tidak ada item yang
    // hilang, bertambah, atau berubah). Validates: Requirements 4.4
    it('terurut monoton terbaru→terlama dan merupakan permutasi dari masukan', () => {
        fc.assert(
            fc.property(experiencesArb, (experiences) => {
                const sorted = sortExperiencesByRecency(experiences);

                // 1) Permutasi: panjang sama dan multiset isi identik.                expect(sorted).toHaveLength(experiences.length);
                expect(multisetsEqual(sorted, experiences)).toBe(true);

                // 2) Monoton terbaru→terlama: untuk setiap pasangan berurutan,
                //    item tak terparse (key null) tidak boleh mendahului item
                //    terparse, dan dua item terparse harus menurun secara
                //    leksikografis.
                for (let i = 0; i + 1 < sorted.length; i += 1) {
                    const a = sortKey(sorted[i].startDate);
                    const b = sortKey(sorted[i + 1].startDate);
                    if (a === null) {
                        // Begitu mencapai item tak terparse, sisanya juga harus null.
                        expect(b).toBeNull();
                    } else if (b !== null) {
                        expect(a >= b).toBe(true);
                    }
                }
            }),
            { numRuns: 100 },
        );
    });

    it('tidak mengubah daftar masukan (immutability)', () => {
        fc.assert(
            fc.property(experiencesArb, (experiences) => {
                const snapshot = experiences.map((e) => ({ ...e }));
                sortExperiencesByRecency(experiences);
                expect(experiences).toEqual(snapshot);
            }),
            { numRuns: 100 },
        );
    });
});
