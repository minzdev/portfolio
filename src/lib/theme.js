/**
 * @file Utilitas tema terang/gelap (light/dark).
 * Berisi fungsi murni untuk menentukan tema awal, membaca/menulis preferensi
 * tema ke `localStorage` secara defensif, dan helper involutif untuk
 * mengganti tema (Req 10.1, 10.2, 10.3).
 */

/**
 * Kunci penyimpanan preferensi tema di `localStorage`.
 * @type {string}
 */
export const THEME_STORAGE_KEY = 'theme';

/**
 * Tema terang.
 * @type {'light'}
 */
export const THEME_LIGHT = 'light';

/**
 * Tema gelap.
 * @type {'dark'}
 */
export const THEME_DARK = 'dark';

/**
 * Daftar nilai tema yang valid.
 * @type {ReadonlyArray<'light' | 'dark'>}
 */
export const VALID_THEMES = [THEME_LIGHT, THEME_DARK];

/**
 * Memeriksa apakah sebuah nilai adalah tema yang valid ('light' atau 'dark').
 *
 * @param {unknown} value Nilai yang diperiksa.
 * @returns {boolean} `true` bila `value` adalah tema valid.
 */
function isValidTheme(value) {
    return value === THEME_LIGHT || value === THEME_DARK;
}

/**
 * Menentukan tema awal aplikasi. Urutan prioritas:
 * 1. `stored` bila merupakan tema valid ('light' atau 'dark') — Req 10.3.
 * 2. `prefersDark` true menghasilkan 'dark' (mencerminkan `prefers-color-scheme`).
 * 3. Fallback ke 'light'.
 *
 * Fungsi ini murni dan tidak mengakses `localStorage` secara langsung; nilai
 * tersimpan diteruskan melalui parameter `stored` (lihat `readTheme`).
 *
 * @param {unknown} stored Nilai tema tersimpan (mis. dari `readTheme`), boleh `null`.
 * @param {boolean} prefersDark Apakah pengguna lebih menyukai mode gelap.
 * @returns {'light' | 'dark'} Tema awal yang valid.
 */
export function getInitialTheme(stored, prefersDark) {
    if (isValidTheme(stored)) {
        return stored;
    }
    return prefersDark ? THEME_DARK : THEME_LIGHT;
}

/**
 * Membaca preferensi tema dari `localStorage`. Akses dibungkus `try/catch`
 * agar tetap aman ketika `localStorage` tidak tersedia (mode privat/diblokir)
 * — Req 10.3. Mengembalikan `null` bila gagal atau tidak ada nilai tersimpan.
 *
 * @returns {string|null} Nilai tema tersimpan, atau `null`.
 */
export function readTheme() {
    try {
        return globalThis.localStorage.getItem(THEME_STORAGE_KEY);
    } catch {
        return null;
    }
}

/**
 * Menulis preferensi tema ke `localStorage`. Akses dibungkus `try/catch`
 * sehingga kegagalan (mis. `localStorage` tidak tersedia) tidak melempar
 * error — Req 10.3.
 *
 * @param {'light' | 'dark'} theme Tema yang akan disimpan.
 * @returns {void}
 */
export function persistTheme(theme) {
    try {
        globalThis.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
        // localStorage tidak tersedia; abaikan secara diam-diam (no throw).
    }
}

/**
 * Mengembalikan tema lawan dari `theme` ('light' <-> 'dark'). Helper ini
 * bersifat involutif: `toggleTheme(toggleTheme(t)) === t` untuk t valid
 * (Property 6, Req 10.1/10.2).
 *
 * @param {'light' | 'dark'} theme Tema saat ini.
 * @returns {'light' | 'dark'} Tema lawan.
 */
export function toggleTheme(theme) {
    return theme === THEME_DARK ? THEME_LIGHT : THEME_DARK;
}
