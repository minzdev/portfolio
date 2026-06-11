/**
 * @file `ProjectsPage` — halaman terpisah berisi seluruh proyek.
 *
 * Menyediakan kolom pencarian untuk memfilter proyek berdasarkan nama,
 * ringkasan, atau teknologi, lalu menampilkannya dalam grid kartu
 * ({@link ProjectCard}). Halaman ini berdiri sendiri dengan SEO, tautan
 * kembali ke beranda, dan Footer; gaya konsisten dengan situs utama.
 */

import { useMemo, useState } from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO.jsx';
import Footer from '../components/Footer.jsx';
import ThemeToggle from '../components/ThemeToggle.jsx';
import LanguageToggle from '../components/LanguageToggle.jsx';
import ProjectCard from '../components/ProjectCard.jsx';
import ErrorBoundary from '../components/ErrorBoundary.jsx';
import { useCV } from '../hooks/useCV.js';

/**
 * Memeriksa apakah sebuah proyek cocok dengan kueri pencarian (case-insensitive)
 * pada nama, ringkasan, atau salah satu teknologi.
 *
 * @param {import('../data/cv.js').Project} project Data proyek.
 * @param {string} query Kueri pencarian (sudah di-lowercase & di-trim).
 * @returns {boolean} `true` bila cocok.
 */
function matchesQuery(project, query) {
    if (!query) {
        return true;
    }
    const haystack = [
        project.name,
        project.description,
        ...(project.tech ?? []),
    ]
        .join(' ')
        .toLowerCase();
    return haystack.includes(query);
}

/**
 * Halaman daftar seluruh proyek dengan pencarian.
 *
 * @returns {import('react').ReactElement} Halaman Proyek.
 */
export default function ProjectsPage() {
    const { t } = useTranslation();
    const { projects } = useCV();
    const [query, setQuery] = useState('');

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return projects.filter((project) => matchesQuery(project, q));
    }, [projects, query]);

    return (
        <ErrorBoundary>
            <SEO />

            {/* Header ringkas: brand + kontrol bahasa/tema. */}
            <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-zinc-800/80 dark:bg-zinc-950/80 dark:supports-[backdrop-filter]:bg-zinc-950/60">
                <nav
                    aria-label="Navigasi utama"
                    className="content-rail flex items-center justify-between py-3"
                >
                    <a
                        href="/"
                        className="rounded-md px-1 py-1 font-mono text-base font-bold tracking-tight text-zinc-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 dark:text-white dark:focus-visible:ring-offset-zinc-950"
                    >
                        suparman.dev
                    </a>
                    <div className="flex items-center gap-1">
                        <LanguageToggle />
                        <ThemeToggle />
                    </div>
                </nav>
            </header>

            <main id="main-content">
                <section className="scroll-mt-20 py-12 sm:py-16">
                    <div className="content-rail">
                        {/* Tautan kembali ke beranda. */}
                        <a
                            href="/"
                            className="inline-flex items-center gap-2 rounded-md font-mono text-xs text-zinc-500 transition-colors hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 dark:text-zinc-500 dark:hover:text-white dark:focus-visible:ring-offset-zinc-950"
                        >
                            <ArrowLeft size={14} aria-hidden="true" />
                            {t('projects.backHome')}
                        </a>

                        <p className="mono-label mb-3 mt-6">// projects</p>
                        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
                            {t('section.projectsTitle')}
                        </h1>

                        {/* Kolom pencarian. */}
                        <div className="relative mt-8">
                            <Search
                                size={18}
                                aria-hidden="true"
                                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500"
                            />
                            <input
                                type="search"
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                                placeholder={t('projects.searchPlaceholder')}
                                aria-label={t('projects.searchPlaceholder')}
                                className="w-full rounded-lg border border-zinc-200 bg-zinc-50/60 py-3 pl-11 pr-4 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-white dark:placeholder:text-zinc-500"
                            />
                        </div>

                        {/* Grid kartu proyek atau pesan kosong. */}
                        {filtered.length > 0 ? (
                            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
                                {filtered.map((project) => (
                                    <ProjectCard key={project.name} project={project} />
                                ))}
                            </div>
                        ) : (
                            <p className="mt-10 text-center font-mono text-sm text-zinc-500 dark:text-zinc-400">
                                {t('projects.empty')}
                            </p>
                        )}
                    </div>
                </section>
            </main>

            <Footer />
        </ErrorBoundary>
    );
}
