/**
 * @file Metadata bagian (section) dan deteksi bagian aktif untuk Navigation_Bar.
 * Berisi daftar metadata tujuh bagian dalam urutan dokumen serta fungsi murni
 * `getActiveSection` yang menentukan bagian mana yang sedang aktif berdasarkan
 * posisi gulir (Req 1.4).
 */

/**
 * @typedef {Object} SectionMeta
 * @property {string} id    Id anchor bagian (dipakai pada `href="#id"`).
 * @property {string} label Label tampilan dalam Bahasa Indonesia.
 */

/**
 * Daftar metadata seluruh bagian dalam urutan dokumen: Hero, About, Experience,
 * Skills, Education, Certification, Contact. Urutan ini menentukan urutan tautan
 * pada Navigation_Bar dan urutan komposisi section pada halaman (Req 1.1).
 *
 * @type {ReadonlyArray<SectionMeta>}
 */
export const SECTIONS = [
    { id: 'hero', label: 'Beranda' },
    { id: 'about', label: 'Tentang' },
    { id: 'experience', label: 'Pengalaman' },
    { id: 'skills', label: 'Keahlian' },
    { id: 'education', label: 'Pendidikan' },
    { id: 'certifications', label: 'Sertifikasi' },
    { id: 'contact', label: 'Kontak' },
];

/**
 * Menentukan id bagian yang sedang aktif dari daftar posisi bagian dan posisi
 * gulir saat ini. Sebuah bagian dianggap "terlewati" (telah mencapai ambang
 * atas Viewport dengan memperhitungkan offset sticky navbar) bila
 * `top <= scrollY + offset`.
 *
 * Kontrak (Property 1 — pemilihan bagian aktif selalu valid):
 * - Untuk daftar `positions` yang tidak kosong dan `scrollY` apa pun, fungsi
 *   mengembalikan tepat satu id yang ada dalam daftar.
 * - Id yang dikembalikan adalah bagian TERAKHIR (menurut urutan `positions`)
 *   yang `top`-nya `<= scrollY + offset`.
 * - Bila belum ada bagian yang terlewati, id bagian PERTAMA dikembalikan.
 *
 * Penanganan defensif: bila `positions` kosong atau bukan array, dikembalikan
 * string kosong (`''`). Properti menjamin masukan tidak kosong, namun penjagaan
 * ini menjaga fungsi tetap aman dan deterministik.
 *
 * Fungsi ini murni dan TIDAK mengubah masukan.
 *
 * @param {{ id: string, top: number }[]} positions Posisi tiap bagian (urutan dokumen).
 * @param {number} scrollY Posisi gulir vertikal saat ini (px).
 * @param {number} offset Offset ambang (mis. tinggi sticky navbar) (px).
 * @returns {string} Id bagian aktif, atau `''` bila tidak ada posisi.
 */
export function getActiveSection(positions, scrollY, offset) {
    if (!Array.isArray(positions) || positions.length === 0) {
        return '';
    }

    const threshold = scrollY + offset;

    // Bagian terakhir (menurut urutan daftar) yang sudah terlewati.
    let activeId = positions[0].id;
    for (const position of positions) {
        if (position.top <= threshold) {
            activeId = position.id;
        }
    }

    return activeId;
}
