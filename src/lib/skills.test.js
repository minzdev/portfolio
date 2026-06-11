/**
 * @file Property-based test untuk `groupSkillsByCategory`.
 * Memvalidasi Correctness Property 4: pengelompokan keahlian mempartisi tanpa
 * kehilangan — gabungan seluruh grup merupakan permutasi dari daftar masukan,
 * setiap keahlian berada tepat di bawah grup kategorinya, dan urutan grup
 * mengikuti urutan kanonik `SKILL_CATEGORIES` (dengan grup penampung
 * "Lainnya" selalu di akhir).
 * _Requirements: 5.1, 5.2_
 */

import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import { groupSkillsByCategory } from './skills.js';
import { SKILL_CATEGORIES } from '../data/cv.js';

/** Label grup penampung untuk kategori tak dikenal (lihat skills.js). */
const UNKNOWN_CATEGORY_LABEL = 'Lainnya';

/**
 * Generator satu keahlian dengan `category` yang dipilih dari
 * `SKILL_CATEGORIES`. `name` dibuat sembarang namun dibatasi panjangnya agar
 * pengujian efisien.
 */
const skillArb = fc.record({
    name: fc.string({ maxLength: 24 }),
    category: fc.constantFrom(...SKILL_CATEGORIES),
});

/** Daftar keahlian (kategori valid) dengan panjang dibatasi. */
const skillsArb = fc.array(skillArb, { maxLength: 30 });

/**
 * Generator keahlian dengan kategori TAK DIKENAL: string yang tidak termasuk
 * `SKILL_CATEGORIES`, atau nilai non-string (untuk menguji jalur "Lainnya").
 */
const unknownSkillArb = fc.record({
    name: fc.string({ maxLength: 24 }),
    category: fc.oneof(
        fc.string({ maxLength: 16 }).filter((s) => !SKILL_CATEGORIES.includes(s)),
        fc.constant(''),
        fc.constant(null),
        fc.constant(undefined),
        fc.integer(),
    ),
});

/** Daftar campuran keahlian kategori valid dan tak dikenal. */
const mixedSkillsArb = fc.array(fc.oneof(skillArb, unknownSkillArb), { maxLength: 30 });

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

/** Mengembalikan gabungan seluruh `items` dari daftar grup secara berurutan. */
function flattenItems(groups) {
    return groups.flatMap((g) => g.items);
}

describe('groupSkillsByCategory — Property 4', () => {
    // Feature: developer-portfolio-website, Property 4: Pengelompokan keahlian
    // mempartisi tanpa kehilangan. Untuk setiap daftar keahlian yang kategorinya
    // berasal dari SKILL_CATEGORIES, groupSkillsByCategory SHALL menempatkan
    // setiap keahlian tepat di bawah grup kategorinya, gabungan seluruh grup
    // merupakan permutasi dari daftar masukan (tanpa kehilangan/duplikasi), dan
    // urutan grup mengikuti urutan kanonik SKILL_CATEGORIES.
    // Validates: Requirements 5.1, 5.2
    it('mempartisi tanpa kehilangan dengan urutan grup kanonik (kategori valid)', () => {
        fc.assert(
            fc.property(skillsArb, (skills) => {
                const groups = groupSkillsByCategory(skills, SKILL_CATEGORIES);

                // 1) Setiap keahlian berada tepat di bawah grup kategorinya.
                for (const group of groups) {
                    for (const item of group.items) {
                        expect(item.category).toBe(group.category);
                    }
                }

                // 2) Gabungan seluruh grup adalah permutasi dari masukan
                //    (tanpa kehilangan/duplikasi).
                const flattened = flattenItems(groups);
                expect(flattened).toHaveLength(skills.length);
                expect(multisetsEqual(flattened, skills)).toBe(true);

                // 3) Urutan grup mengikuti urutan kanonik SKILL_CATEGORIES.
                const emittedOrder = groups.map((g) => g.category);
                const canonicalSubsequence = SKILL_CATEGORIES.filter((c) =>
                    emittedOrder.includes(c),
                );
                expect(emittedOrder).toEqual(canonicalSubsequence);

                // 4) Hanya grup non-kosong yang disertakan.
                for (const group of groups) {
                    expect(group.items.length).toBeGreaterThan(0);
                }
            }),
            { numRuns: 100 },
        );
    });

    it('kategori tak dikenal dikumpulkan ke grup "Lainnya" di akhir tanpa kehilangan', () => {
        fc.assert(
            fc.property(mixedSkillsArb, (skills) => {
                const groups = groupSkillsByCategory(skills, SKILL_CATEGORIES);

                // Gabungan tetap permutasi dari masukan (tidak ada yang hilang).
                const flattened = flattenItems(groups);
                expect(flattened).toHaveLength(skills.length);
                expect(multisetsEqual(flattened, skills)).toBe(true);

                // Jika grup "Lainnya" muncul, ia harus berada paling akhir dan
                // berisi tepat keahlian dengan kategori di luar SKILL_CATEGORIES.
                const lainnyaIndex = groups.findIndex(
                    (g) => g.category === UNKNOWN_CATEGORY_LABEL,
                );
                const expectedUnknown = skills.filter(
                    (s) =>
                        !(typeof s.category === 'string' && SKILL_CATEGORIES.includes(s.category)),
                );

                if (expectedUnknown.length > 0) {
                    expect(lainnyaIndex).toBe(groups.length - 1);
                    expect(multisetsEqual(groups[lainnyaIndex].items, expectedUnknown)).toBe(
                        true,
                    );
                } else {
                    expect(lainnyaIndex).toBe(-1);
                }

                // Grup kategori kanonik tetap mengikuti urutan SKILL_CATEGORIES.
                const canonicalEmitted = groups
                    .map((g) => g.category)
                    .filter((c) => c !== UNKNOWN_CATEGORY_LABEL);
                const canonicalSubsequence = SKILL_CATEGORIES.filter((c) =>
                    canonicalEmitted.includes(c),
                );
                expect(canonicalEmitted).toEqual(canonicalSubsequence);
            }),
            { numRuns: 100 },
        );
    });

    it('tidak mengubah daftar masukan (immutability)', () => {
        fc.assert(
            fc.property(mixedSkillsArb, (skills) => {
                const snapshot = skills.map((s) => ({ ...s }));
                groupSkillsByCategory(skills, SKILL_CATEGORIES);
                expect(skills).toEqual(snapshot);
            }),
            { numRuns: 100 },
        );
    });
});
