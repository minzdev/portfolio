/**
 * @file `Footer` — kaki halaman situs portofolio.
 *
 * Komponen ini merender elemen `<footer>` semantik berisi tiga elemen utama:
 * nama pemilik, tahun berjalan pada baris hak cipta, serta tautan cepat ke
 * seluruh bagian halaman. Tautan dibangun dari {@link SECTIONS} dalam urutan
 * dokumen, masing-masing menunjuk ke anchor `#id` agar konsisten dengan
 * Navigation_Bar (Req 1.1).
 *
 * Aksesibilitas:
 * - Navigasi tautan cepat dibungkus `<nav>` dengan `aria-label` deskriptif.
 * - Setiap `<a>` native memiliki cincin fokus `focus-visible` agar navigasi
 *   keyboard tampak jelas.
 *
 * Tahun hak cipta dihitung saat render via `new Date().getFullYear()` sehingga
 * selalu mengikuti tahun berjalan tanpa pemeliharaan manual.
 */

import { Github, Globe, Linkedin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SECTIONS } from '../lib/sections.js';
import { useCV } from '../hooks/useCV.js';

/**
 * Pemetaan nama ikon sosial ke komponen lucide-react.
 * @type {Record<string, import('react').ComponentType<{ size?: number }>>}
 */
const SOCIAL_ICONS = {
    Github,
    Linkedin,
};

/**
 * Kaki halaman dengan baris hak cipta (nama + tahun berjalan) dan tautan cepat
 * ke setiap bagian.
 *
 * @returns {import('react').ReactElement} Elemen `<footer>` situs.
 */
export default function Footer() {
    const { t } = useTranslation();
    const { profile, contact } = useCV();
    const year = new Date().getFullYear();

    return (
        <footer className="border-t border-zinc-200 dark:border-zinc-800/80">
            <div className="content-rail py-12">
                {/* Tautan cepat ke seluruh bagian (Req 1.1). */}
                <nav aria-label={t('common.quickLinks')}>
                    <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2">
                        {SECTIONS.map(({ id }) => (
                            <li key={id}>
                                <a
                                    href={`#${id}`}
                                    className="rounded-md px-1 py-1 font-mono text-xs text-zinc-500 transition-colors hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 dark:text-zinc-500 dark:hover:text-white dark:focus-visible:ring-offset-zinc-950"
                                >
                                    {t(`nav.${id}`)}
                                </a>
                            </li>
                        ))}
                        <li>
                            <a
                                href="/projects.html"
                                className="rounded-md px-1 py-1 font-mono text-xs text-zinc-500 transition-colors hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 dark:text-zinc-500 dark:hover:text-white dark:focus-visible:ring-offset-zinc-950"
                            >
                                {t('nav.projects')}
                            </a>
                        </li>
                    </ul>
                </nav>

                {/* Ikon media sosial terpusat. */}
                <ul className="mt-6 flex items-center justify-center gap-2">
                    {contact.socials.map((social) => {
                        const Icon = SOCIAL_ICONS[social.icon] || Globe;
                        return (
                            <li key={social.platform}>
                                <a
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    className="inline-flex h-11 w-11 items-center justify-center rounded-md text-zinc-400 transition-colors hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 dark:text-zinc-500 dark:hover:text-white dark:focus-visible:ring-offset-zinc-950"
                                >
                                    <Icon size={18} aria-hidden="true" />
                                </a>
                            </li>
                        );
                    })}
                </ul>

                {/* Baris hak cipta bergaya terminal dengan tahun berjalan. */}
                <p className="mt-6 text-center font-mono text-xs text-zinc-400 dark:text-zinc-600">
                    {t('common.builtBy')}{' '}
                    <span className="font-semibold text-zinc-600 dark:text-zinc-400">
                        {profile.name}
                    </span>
                    {' · '}© {year}
                </p>
            </div>
        </footer>
    );
}
