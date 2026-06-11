/**
 * @file `ThemeToggle` — tombol pengalih tema terang/gelap.
 *
 * Komponen ini mengonsumsi {@link useTheme} untuk membaca tema aktif dan
 * memanggil `toggleTheme` saat ditekan (Req 10.1). Ikon `lucide-react`
 * dirender sesuai konvensi: ikon menggambarkan tema yang akan dituju
 * sehingga pengguna memahami aksi yang akan terjadi —
 * `Moon` ketika tema saat ini terang (klik beralih ke gelap) dan `Sun`
 * ketika tema saat ini gelap (klik beralih ke terang).
 *
 * Aksesibilitas:
 * - `aria-label` deskriptif dalam Bahasa Indonesia yang mencerminkan aksi
 *   (Req 13.3).
 * - Area sentuh minimum 44×44px via `min-h-11 min-w-11` (Req 9.3).
 * - Fokus terlihat melalui `focus-visible:ring-2` (Req 13.x aksesibilitas).
 * - Ikon ditandai `aria-hidden` karena makna sudah disampaikan via `aria-label`.
 */

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme.js';

/**
 * Tombol untuk mengalihkan tema aplikasi antara mode terang dan gelap.
 *
 * @param {object} [props] Properti komponen.
 * @param {string} [props.className] Kelas CSS tambahan untuk elemen `<button>`.
 * @returns {import('react').ReactElement} Tombol pengalih tema yang aksesibel.
 */
export default function ThemeToggle({ className = '' }) {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';

    // Label mencerminkan aksi yang akan terjadi saat tombol ditekan (Req 13.3).
    const label = isDark ? 'Beralih ke mode terang' : 'Beralih ke mode gelap';

    return (
        <button
            type="button"
            onClick={toggleTheme}
            aria-label={label}
            title={label}
            className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-md p-2 text-zinc-500 transition-colors hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 dark:text-zinc-400 dark:hover:text-white dark:focus-visible:ring-offset-zinc-950 ${className}`.trim()}
        >
            {isDark ? (
                <Sun size={20} aria-hidden="true" />
            ) : (
                <Moon size={20} aria-hidden="true" />
            )}
        </button>
    );
}
