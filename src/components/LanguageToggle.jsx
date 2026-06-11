/**
 * @file `LanguageToggle` — tombol pengalih bahasa ID/EN.
 *
 * Mengonsumsi i18next via `useTranslation` untuk membaca bahasa aktif dan
 * mengubahnya. Menampilkan kode bahasa target (mis. "EN" saat aktif id) dengan
 * `aria-label` deskriptif. Perubahan dipersist oleh detector i18next
 * (`localStorage`), dan atribut `lang` pada `<html>` ikut disinkronkan.
 *
 * Aksesibilitas: area sentuh minimum 44×44px (`min-h-11 min-w-11`) dan cincin
 * fokus `focus-visible` (Req 9.3, 13.2, 13.3).
 */

import { useTranslation } from 'react-i18next';

/**
 * Tombol untuk mengalihkan bahasa antarmuka antara Indonesia dan Inggris.
 *
 * @param {object} [props] Properti komponen.
 * @param {string} [props.className] Kelas CSS tambahan.
 * @returns {import('react').ReactElement} Tombol pengalih bahasa yang aksesibel.
 */
export default function LanguageToggle({ className = '' }) {
    const { i18n, t } = useTranslation();
    const current = (i18n.resolvedLanguage || i18n.language || 'id').slice(0, 2);
    const isEn = current === 'en';
    const next = isEn ? 'id' : 'en';

    const label = isEn ? t('common.toIndonesian') : t('common.toEnglish');

    const handleClick = () => {
        i18n.changeLanguage(next);
        if (typeof document !== 'undefined') {
            document.documentElement.lang = next;
        }
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            aria-label={label}
            title={label}
            className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-md px-2 font-mono text-xs font-semibold uppercase tracking-wider text-zinc-500 transition-colors hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 dark:text-zinc-400 dark:hover:text-white dark:focus-visible:ring-offset-zinc-950 ${className}`.trim()}
        >
            {next.toUpperCase()}
        </button>
    );
}
