/**
 * @file `Navbar` — Navigation_Bar utama situs portofolio.
 *
 * Komponen ini merender bilah navigasi yang menempel di atas Viewport
 * (`sticky top-0`) dengan latar semi-transparan ber-blur sehingga tetap
 * terlihat selama menggulir (Req 1.3). Tautan dibangun dari {@link SECTIONS}
 * dalam urutan dokumen, masing-masing menunjuk ke anchor `#id` (Req 1.1, 1.2);
 * pemulusan gulir ditangani oleh CSS `scroll-behavior`.
 *
 * Aksesibilitas & interaksi:
 * - Menyorot tautan aktif berdasarkan `activeId` dan menyetel `aria-current`
 *   pada tautan tersebut (Req 1.4).
 * - Pada layar < 768px tampil tombol hamburger dengan `aria-expanded`,
 *   `aria-controls`, dan `aria-label` deskriptif (Req 1.5). Menu dapat dibuka
 *   dan ditutup via keyboard (Enter/Space mengaktifkan tombol, Escape menutup)
 *   serta menutup otomatis saat sebuah tautan diklik (Req 1.5, 13.1).
 * - Elemen `<a>`/`<button>` native dengan cincin fokus `focus-visible`
 *   memastikan navigasi keyboard yang jelas (Req 13.1, 13.3).
 * - Menyertakan {@link ThemeToggle} pada tampilan desktop maupun mobile.
 */

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import { SECTIONS } from '../lib/sections.js';
import ThemeToggle from './ThemeToggle.jsx';
import LanguageToggle from './LanguageToggle.jsx';

/** Nama/brand yang ditampilkan di sisi kiri Navigation_Bar. */
const BRAND_NAME = 'suparman.dev';

/** Id elemen panel menu mobile; ditunjuk oleh `aria-controls` tombol hamburger. */
const MOBILE_MENU_ID = 'mobile-menu';

/**
 * Bilah navigasi sticky dengan tautan ke seluruh bagian, indikator bagian
 * aktif, menu hamburger responsif, dan pengalih tema.
 *
 * @param {object} props Properti komponen.
 * @param {string} [props.activeId] Id bagian yang sedang aktif; tautan yang
 *   cocok akan disorot dan menerima `aria-current` (Req 1.4).
 * @returns {import('react').ReactElement} Elemen `<header>` berisi navigasi.
 */
export default function Navbar({ activeId }) {
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useTranslation();

    // Tutup menu mobile saat tombol Escape ditekan (Req 1.5, 13.1).
    useEffect(() => {
        if (!isOpen) {
            return undefined;
        }

        /** @param {KeyboardEvent} event */
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    const closeMenu = () => setIsOpen(false);
    const toggleMenu = () => setIsOpen((open) => !open);

    /**
     * Kelas untuk sebuah tautan navigasi, menambahkan gaya aktif bila id-nya
     * cocok dengan `activeId`.
     * @param {boolean} isActive Apakah tautan sedang aktif.
     * @returns {string} Daftar kelas Tailwind.
     */
    const linkClass = (isActive) =>
        `rounded-md px-2.5 py-1.5 text-[13px] font-medium tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-950 ${isActive
            ? 'text-zinc-900 dark:text-white'
            : 'text-zinc-400 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-200'
        }`;

    return (
        <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-zinc-800/80 dark:bg-zinc-950/80 dark:supports-[backdrop-filter]:bg-zinc-950/60">
            <nav
                aria-label="Navigasi utama"
                className="content-rail flex items-center justify-between py-3"
            >
                {/* Brand / nama di sisi kiri; menautkan ke bagian Beranda. */}
                <a
                    href="#hero"
                    onClick={closeMenu}
                    className="rounded-md px-1 py-1 font-mono text-base font-bold tracking-tight text-zinc-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 dark:text-white dark:focus-visible:ring-offset-zinc-950"
                >
                    {BRAND_NAME}
                </a>

                {/* Kontrol sisi kanan: tautan ke halaman Proyek terpisah
                    dikelompokkan rapat dengan pengalih bahasa/tema, dipisahkan
                    garis batas agar tata letak profesional. */}
                <div className="flex items-center gap-1">
                    {/* Tautan sorotan untuk layar lebar: Sertifikasi (anchor di
                        beranda) & Proyek (halaman terpisah). */}
                    <a
                        href="#certifications"
                        aria-current={activeId === 'certifications' ? 'true' : undefined}
                        className={`hidden lg:inline-flex ${linkClass(activeId === 'certifications')}`}
                    >
                        {t('nav.certifications')}
                    </a>
                    <a
                        href="/projects.html"
                        className="hidden rounded-md px-2.5 py-1.5 text-[13px] font-medium tracking-tight text-zinc-400 transition-colors hover:text-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 dark:text-zinc-500 dark:hover:text-zinc-200 dark:focus-visible:ring-offset-zinc-950 lg:inline-flex"
                    >
                        {t('nav.projects')}
                    </a>

                    <span
                        aria-hidden="true"
                        className="hidden h-5 w-px bg-zinc-200 dark:bg-zinc-800 lg:block"
                    />
                    <LanguageToggle />
                    <ThemeToggle />

                    <span
                        aria-hidden="true"
                        className="h-5 w-px bg-zinc-200 dark:bg-zinc-800"
                    />
                    <button
                        type="button"
                        onClick={toggleMenu}
                        aria-expanded={isOpen}
                        aria-controls={MOBILE_MENU_ID}
                        aria-label={isOpen ? t('nav.menuClose') : t('nav.menuOpen')}
                        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md p-2 text-zinc-500 transition-colors hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 dark:text-zinc-400 dark:hover:text-white dark:focus-visible:ring-offset-zinc-950"
                    >
                        {isOpen ? (
                            <X size={24} aria-hidden="true" />
                        ) : (
                            <Menu size={24} aria-hidden="true" />
                        )}
                    </button>
                </div>
            </nav>

            {/* Panel menu lengkap; dirender saat terbuka (semua ukuran). */}
            {isOpen ? (
                <div
                    id={MOBILE_MENU_ID}
                    className="border-t border-zinc-200 dark:border-zinc-800/80"
                >
                    <ul className="content-rail grid grid-cols-1 gap-0.5 py-3 sm:grid-cols-2">
                        {SECTIONS.map(({ id }) => {
                            const isActive = id === activeId;
                            return (
                                <li key={id}>
                                    <a
                                        href={`#${id}`}
                                        onClick={closeMenu}
                                        aria-current={isActive ? 'true' : undefined}
                                        className={`flex min-h-11 items-center ${linkClass(isActive)}`}
                                    >
                                        {t(`nav.${id}`)}
                                    </a>
                                </li>
                            );
                        })}
                        {/* Tautan ke halaman Proyek terpisah. */}
                        <li>
                            <a
                                href="/projects.html"
                                onClick={closeMenu}
                                className={`flex min-h-11 items-center ${linkClass(false)}`}
                            >
                                {t('nav.projects')}
                            </a>
                        </li>
                    </ul>
                </div>
            ) : null}
        </header>
    );
}
