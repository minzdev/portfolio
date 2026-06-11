/**
 * @file Utilitas pengurutan untuk data CV.
 * Berisi fungsi murni `sortExperiencesByRecency` yang mengurutkan
 * pengalaman kerja dari yang terbaru ke yang terlama (Req 4.4).
 */

/**
 * Pola `startDate` yang valid: "YYYY-MM" (mis. "2024-02").
 * Bulan dibatasi 01–12. Nilai yang tidak cocok dianggap tak terparse.
 * @type {RegExp}
 */
const START_DATE_PATTERN = /^\d{4}-(0[1-9]|1[0-2])$/;

/**
 * Mengembalikan kunci pengurutan yang dapat dibandingkan secara leksikografis
 * untuk sebuah `startDate`. `startDate` yang tak terparse (format salah,
 * kosong, atau bukan string) menghasilkan `null`, yang diperlakukan sebagai
 * paling lama saat pengurutan.
 *
 * @param {unknown} startDate Nilai `startDate` mentah dari sebuah Experience.
 * @returns {string|null} Kunci "YYYY-MM" yang valid, atau `null` bila tak terparse.
 */
function toSortKey(startDate) {
    return typeof startDate === 'string' && START_DATE_PATTERN.test(startDate)
        ? startDate
        : null;
}

/**
 * Mengurutkan daftar pengalaman kerja secara monoton dari `startDate` terbaru
 * ke terlama. `startDate` yang tidak dapat diparse (format selain "YYYY-MM",
 * kosong, atau hilang) diperlakukan sebagai paling lama sehingga ditempatkan
 * di akhir daftar. Pengurutan bersifat total dan deterministik: untuk kunci
 * yang sama (termasuk sesama item tak terparse) urutan kemunculan asli
 * dipertahankan (stable sort).
 *
 * Fungsi ini TIDAK mengubah daftar masukan; sebuah daftar baru dikembalikan.
 *
 * @template {{ startDate?: unknown }} T
 * @param {T[]} experiences Daftar pengalaman kerja.
 * @returns {T[]} Daftar baru yang terurut terbaru → terlama.
 */
export function sortExperiencesByRecency(experiences) {
    if (!Array.isArray(experiences)) {
        return [];
    }

    // Dekorasi dengan indeks asli untuk menjamin stabilitas dan determinisme,
    // lalu salin agar daftar masukan tidak berubah (do not mutate input).
    return experiences
        .map((experience, index) => ({ experience, index, key: toSortKey(experience?.startDate) }))
        .sort((a, b) => {
            // Item tak terparse (key === null) selalu paling lama (ke akhir).
            if (a.key === null && b.key === null) {
                return a.index - b.index;
            }
            if (a.key === null) {
                return 1;
            }
            if (b.key === null) {
                return -1;
            }
            // Terbaru → terlama: urutan menurun secara leksikografis.
            if (a.key > b.key) {
                return -1;
            }
            if (a.key < b.key) {
                return 1;
            }
            // Kunci sama: pertahankan urutan asli (stable).
            return a.index - b.index;
        })
        .map((entry) => entry.experience);
}
