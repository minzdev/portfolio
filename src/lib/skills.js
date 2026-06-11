/**
 * @file Utilitas pengelompokan keahlian untuk Skills_Section.
 * Berisi fungsi murni `groupSkillsByCategory` yang mengelompokkan keahlian
 * berdasarkan kategorinya mengikuti urutan kanonik `SKILL_CATEGORIES`
 * (Req 5.1, 5.2).
 */

/**
 * Nama grup penampung untuk keahlian dengan kategori di luar urutan kanonik.
 * Kategori tak dikenal ditempatkan di sini (sebagai grup terakhir) agar tidak
 * ada keahlian yang hilang dan tata letak tetap stabil (Property 4 — gabungan
 * grup merupakan permutasi dari masukan).
 * @type {string}
 */
const UNKNOWN_CATEGORY_LABEL = 'Lainnya';

/**
 * Mengelompokkan daftar keahlian ke dalam grup-grup kategori. Setiap keahlian
 * ditempatkan tepat di bawah grup kategorinya. Urutan grup mengikuti
 * `categoryOrder` (urutan kanonik `SKILL_CATEGORIES`). Keahlian dengan kategori
 * di luar `categoryOrder` ditangani secara aman dengan dikumpulkan ke dalam
 * grup tambahan `"Lainnya"` yang ditambahkan di akhir, sehingga tidak ada
 * keahlian yang hilang (gabungan seluruh grup = permutasi dari masukan).
 *
 * Sifat-sifat (Property 4):
 * - Setiap keahlian muncul tepat sekali pada keseluruhan grup keluaran.
 * - Gabungan seluruh `items` merupakan permutasi dari `skills` masukan.
 * - Urutan grup kanonik mengikuti `categoryOrder`, dengan grup `"Lainnya"`
 *   (jika ada) selalu berada di akhir.
 * - Hanya grup yang memiliki item yang disertakan (grup kategori kosong
 *   diabaikan agar gabungan tepat sama dengan masukan).
 *
 * Urutan kemunculan keahlian di dalam tiap grup dipertahankan sesuai urutan
 * aslinya pada `skills` (stable). Fungsi ini TIDAK mengubah masukan.
 *
 * @template {{ category?: unknown }} T
 * @param {T[]} skills Daftar keahlian yang akan dikelompokkan.
 * @param {string[]} categoryOrder Urutan kanonik kategori (mis. SKILL_CATEGORIES).
 * @returns {{ category: string, items: T[] }[]} Daftar SkillGroup terurut.
 */
export function groupSkillsByCategory(skills, categoryOrder) {
    const safeSkills = Array.isArray(skills) ? skills : [];
    const order = Array.isArray(categoryOrder) ? categoryOrder : [];

    // Set kategori yang dikenal untuk pencarian O(1).
    const knownCategories = new Set(order);

    // Peta kategori -> daftar keahlian. Map mempertahankan urutan penyisipan,
    // tetapi kita akan memancarkan grup mengikuti `order` agar urutan kanonik.
    /** @type {Map<string, T[]>} */
    const buckets = new Map();
    /** @type {T[]} */
    const unknownItems = [];

    for (const skill of safeSkills) {
        const category = skill?.category;
        if (typeof category === 'string' && knownCategories.has(category)) {
            const existing = buckets.get(category);
            if (existing) {
                existing.push(skill);
            } else {
                buckets.set(category, [skill]);
            }
        } else {
            // Kategori tak dikenal (di luar categoryOrder, kosong, atau bukan
            // string) dikumpulkan ke grup penampung agar tidak hilang.
            unknownItems.push(skill);
        }
    }

    /** @type {{ category: string, items: T[] }[]} */
    const groups = [];

    // Pancarkan grup mengikuti urutan kanonik; lewati grup kosong.
    for (const category of order) {
        const items = buckets.get(category);
        if (items && items.length > 0) {
            groups.push({ category, items });
        }
    }

    // Tambahkan grup penampung untuk kategori tak dikenal di akhir.
    if (unknownItems.length > 0) {
        groups.push({ category: UNKNOWN_CATEGORY_LABEL, items: unknownItems });
    }

    return groups;
}
