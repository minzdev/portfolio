/**
 * @file Hook `useCV` — memilih dataset konten CV sesuai bahasa aktif.
 *
 * Mengembalikan kumpulan data CV (`profile`, `experiences`, `skills`,
 * `education`, `certifications`, `projects`, `contact`, `SKILL_CATEGORIES`)
 * dari modul bahasa yang sesuai: `src/data/cv.js` (id) atau
 * `src/data/cv.en.js` (en). Bahasa dibaca dari i18next via `useTranslation`.
 *
 * Komponen tampilan memanggil hook ini alih-alih mengimpor data langsung,
 * sehingga seluruh teks konten ikut berganti saat bahasa diubah. Default
 * (tanpa i18n/bahasa tak dikenal) jatuh ke dataset Indonesia.
 */

import { useTranslation } from 'react-i18next';
import * as cvId from '../data/cv.js';
import * as cvEn from '../data/cv.en.js';

/**
 * @typedef {typeof import('../data/cv.js')} CVData
 */

/**
 * Mengembalikan dataset CV sesuai bahasa i18next aktif.
 *
 * @returns {CVData} Modul data CV untuk bahasa aktif (fallback ke id).
 */
export function useCV() {
    const { i18n } = useTranslation();
    const lang = (i18n?.resolvedLanguage || i18n?.language || 'id').slice(0, 2);
    return lang === 'en' ? cvEn : cvId;
}
