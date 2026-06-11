/**
 * @file Utilitas animasi terpusat (Framer Motion).
 * Berisi varian animasi deklaratif (`fadeUp`, `staggerContainer`) dan fungsi
 * murni `getMotionProps` yang membangun props gerak untuk komponen `motion.*`.
 * Mendukung preferensi reduksi gerak: saat aktif, state `initial` disamakan
 * dengan `animate` sehingga tidak ada perpindahan posisi/translasi (Req 12.1, 12.2).
 */

/**
 * Kunci state tersembunyi (sebelum animasi masuk).
 * @type {'hidden'}
 */
export const HIDDEN = 'hidden';

/**
 * Kunci state tampak (setelah animasi masuk / state akhir).
 * @type {'visible'}
 */
export const VISIBLE = 'visible';

/**
 * Durasi default animasi masuk (detik). Berada dalam rentang 200–800ms
 * sesuai Req 12.1.
 * @type {number}
 */
export const DEFAULT_DURATION = 0.5;

/**
 * Jeda antar anak (detik) untuk efek bertahap (stagger) pada kontainer.
 * @type {number}
 */
export const DEFAULT_STAGGER = 0.1;

/**
 * Jeda sebelum anak pertama mulai (detik) pada kontainer bertahap.
 * @type {number}
 */
export const DEFAULT_DELAY_CHILDREN = 0.1;

/**
 * Varian "fade + naik": elemen memudar masuk sambil bergeser dari bawah ke
 * posisi akhir. Hanya menganimasi `opacity` dan `transform` (`y`) yang murah
 * secara komposit. Durasi default berada dalam rentang 200–800ms (Req 12.1).
 *
 * @type {{
 *   hidden: { opacity: number, y: number },
 *   visible: { opacity: number, y: number, transition: { duration: number } },
 * }}
 */
export const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: DEFAULT_DURATION },
    },
};

/**
 * Varian kontainer bertahap (stagger): tidak menganimasi properti visual
 * sendiri, melainkan mengatur waktu kemunculan anak-anaknya secara berurutan.
 * Total waktu dijaga tetap wajar melalui `staggerChildren` dan `delayChildren`
 * yang kecil.
 *
 * @type {{
 *   hidden: {},
 *   visible: { transition: { staggerChildren: number, delayChildren: number } },
 * }}
 */
export const staggerContainer = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: DEFAULT_STAGGER,
            delayChildren: DEFAULT_DELAY_CHILDREN,
        },
    },
};

/**
 * Membangun props gerak untuk sebuah komponen `motion.*` dari sebuah `variant`
 * (mis. {@link fadeUp} atau {@link staggerContainer}).
 *
 * Perilaku terkait reduksi gerak (Property 9, Req 12.2):
 * - Ketika `prefersReducedMotion` bernilai `true`, `initial` dan `animate`
 *   menunjuk ke state yang sama (`'visible'`), sehingga elemen langsung berada
 *   pada state akhir tanpa perpindahan posisi/translasi gerak. Dengan demikian
 *   `initial === animate` selalu terpenuhi.
 * - Ketika `prefersReducedMotion` bernilai `false`, `initial` (`'hidden'`)
 *   berbeda dari `animate` (`'visible'`) sehingga animasi masuk berjalan normal.
 *
 * Fungsi ini murni dan deterministik: untuk masukan yang sama selalu
 * mengembalikan struktur props yang setara.
 *
 * @param {object} [variant=fadeUp] Objek varian Framer Motion (berisi state
 *   `hidden`/`visible`). Default ke {@link fadeUp}.
 * @param {boolean} [prefersReducedMotion=false] Apakah pengguna mengaktifkan
 *   preferensi reduksi gerak (`prefers-reduced-motion`).
 * @returns {{
 *   initial: 'hidden' | 'visible',
 *   animate: 'visible',
 *   variants: object,
 * }} Props gerak siap pakai untuk komponen `motion.*`.
 */
export function getMotionProps(variant = fadeUp, prefersReducedMotion = false) {
    const variants = variant && typeof variant === 'object' ? variant : fadeUp;

    return {
        // Saat reduksi gerak aktif, mulai langsung dari state akhir (VISIBLE)
        // agar initial === animate (tanpa transisi/translasi).
        initial: prefersReducedMotion ? VISIBLE : HIDDEN,
        animate: VISIBLE,
        variants,
    };
}
