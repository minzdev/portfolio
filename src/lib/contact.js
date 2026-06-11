/**
 * @file Utilitas kontak.
 * Berisi fungsi murni `buildTelHref` untuk membangun href tautan `tel:`
 * dari sebuah nomor telepon, sehingga tautan telepon selalu valid (Req 8.3).
 */

/**
 * Karakter yang dipertahankan pada bagian nomor: tanda `+` dan digit `0-9`.
 * Semua karakter lain (spasi, tanda hubung, kurung, dll.) dibuang.
 * @type {RegExp}
 */
const ALLOWED_NUMBER_CHARS = /[^\d+]/g;

/**
 * Membangun href tautan `tel:` dari sebuah nomor telepon. Hasil selalu diawali
 * dengan `tel:` dan bagian nomornya hanya berisi karakter `+` dan digit
 * (`0-9`), dengan urutan digit asli dipertahankan (Property 5, Req 8.3).
 *
 * Semua karakter selain `+` dan digit dihilangkan dari masukan. Masukan yang
 * bukan string (mis. `null`, `undefined`, angka) ditangani secara defensif dan
 * menghasilkan `'tel:'` (bagian nomor kosong).
 *
 * @param {unknown} phone Nomor telepon mentah, mis. "+62 857 9752 2591".
 * @returns {string} Href `tel:` yang ternormalisasi, mis. "tel:+6285797522591".
 */
export function buildTelHref(phone) {
    if (typeof phone !== 'string') {
        return 'tel:';
    }
    return `tel:${phone.replace(ALLOWED_NUMBER_CHARS, '')}`;
}
