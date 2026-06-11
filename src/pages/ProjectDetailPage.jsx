/**
 * @file `ProjectDetailPage` — halaman detail proyek.
 *
 * Membaca `?slug=` dari URL untuk menentukan proyek mana yang ditampilkan.
 * Layout mengikuti referensi zickrian.dev:
 * - Header: ← Projects | Kategori
 * - Hero: judul besar, deskripsi, tombol Live Demo / Repo
 * - Slider gambar besar
 * - Metadata grid: OWNERSHIP · ROLE · TEAM
 * - MY ROLE (numbered list)
 * - IMPACT (bullet list)
 * - STACK (chips)
 * - 404 bila slug tidak ditemukan
 */

import { useState, useCallback } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, ExternalLink, Github } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import Footer from '../components/Footer.jsx';
import ThemeToggle from '../components/ThemeToggle.jsx';
import LanguageToggle from '../components/LanguageToggle.jsx';
import ErrorBoundary from '../components/ErrorBoundary.jsx';
import { useCV } from '../hooks/useCV.js';

/**
 * Slider gambar besar untuk halaman detail.
 *
 * @param {object} props
 * @param {string[]} props.images Daftar URL gambar.
 * @param {string} props.name Nama proyek untuk alt text.
 */
function DetailSlider({ images, name }) {
    const [current, setCurrent] = useState(0);
    const total = images.length;

    const prev = useCallback((e) => { e.stopPropagation(); setCurrent(i => (i - 1 + total) % total); }, [total]);
    const next = useCallback((e) => { e.stopPropagation(); setCurrent(i => (i + 1) % total); }, [total]);

    if (!total) return null;

    return (
        <div className="group/slider relative w-full overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900">
            <img
                key={current}
                src={images[current]}
                alt={`${name} screenshot ${current + 1}`}
                className="w-full object-cover transition-opacity duration-300"
                style={{ maxHeight: '540px', objectFit: 'cover' }}
                loading="lazy"
            />

            {total > 1 && (
                <>
                    <button
                        type="button"
                        onClick={prev}
                        aria-label="Gambar sebelumnya"
                        className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-opacity group-hover/slider:opacity-100 hover:bg-black/70 focus-visible:opacity-100 focus-visible:outline-none"
                    >
                        <ChevronLeft size={20} aria-hidden="true" />
                    </button>
                    <button
                        type="button"
                        onClick={next}
                        aria-label="Gambar berikutnya"
                        className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-opacity group-hover/slider:opacity-100 hover:bg-black/70 focus-visible:opacity-100 focus-visible:outline-none"
                    >
                        <ChevronRight size={20} aria-hidden="true" />
                    </button>
                    <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                        {images.map((_, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
                                aria-label={`Gambar ${i + 1}`}
                                aria-current={i === current ? 'true' : undefined}
                                className={`h-1.5 rounded-full transition-all focus-visible:outline-none ${i === current ? 'w-4 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/80'}`}
                            />
                        ))}
                    </div>
                    <span className="absolute right-3 top-3 rounded-md bg-black/50 px-2 py-0.5 font-mono text-[10px] text-white">
                        {current + 1}/{total}
                    </span>
                </>
            )}
        </div>
    );
}

/**
 * Satu kolom metadata (OWNERSHIP / ROLE / TEAM).
 */
function MetaCol({ label, value }) {
    if (!value) return null;
    return (
        <div>
            <p className="mono-label mb-2">{label}</p>
            <p className="text-sm font-medium text-zinc-900 dark:text-white">{value}</p>
        </div>
    );
}

/**
 * Blok section dengan label mono kecil di atas.
 */
function DetailSection({ label, children }) {
    return (
        <div>
            <p className="mono-label mb-4">{label}</p>
            {children}
        </div>
    );
}

/**
 * Halaman detail proyek.
 */
export default function ProjectDetailPage() {
    const { t } = useTranslation();
    const { projects } = useCV();

    const slug = typeof window !== 'undefined'
        ? new URLSearchParams(window.location.search).get('slug')
        : null;

    const project = projects.find(p => p.slug === slug);

    // 404 bila project tidak ditemukan.
    if (!project) {
        return (
            <ErrorBoundary>
                <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
                    <p className="mono-label">// 404</p>
                    <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-white">
                        Proyek tidak ditemukan
                    </h1>
                    <a
                        href="/projects.html"
                        className="inline-flex min-h-11 items-center gap-2 rounded-md border border-zinc-300 px-5 py-2.5 text-sm font-semibold text-zinc-700 transition-colors hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-500"
                    >
                        <ArrowLeft size={16} aria-hidden="true" />
                        {t('projects.backToProjects', 'Kembali ke Proyek')}
                    </a>
                </div>
            </ErrorBoundary>
        );
    }

    const images = Array.isArray(project.images)
        ? project.images
        : project.images
            ? [project.images]
            : [];

    return (
        <ErrorBoundary>
            <Helmet>
                <title>{project.name} — Suparman</title>
                <meta name="description" content={project.description} />
            </Helmet>

            {/* Header sticky ringkas. */}
            <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-zinc-800/80 dark:bg-zinc-950/80 dark:supports-[backdrop-filter]:bg-zinc-950/60">
                <nav aria-label="Navigasi halaman detail proyek" className="content-rail flex items-center justify-between py-3">
                    <a
                        href="/projects.html"
                        className="inline-flex items-center gap-2 rounded-md font-mono text-sm text-zinc-500 transition-colors hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 dark:text-zinc-400 dark:hover:text-white dark:focus-visible:ring-offset-zinc-950"
                    >
                        <ArrowLeft size={16} aria-hidden="true" />
                        {t('nav.projects', 'Proyek')}
                    </a>

                    <div className="flex items-center gap-1">
                        {project.category ? (
                            <span className="mono-label hidden sm:block">{project.category}</span>
                        ) : null}
                        <LanguageToggle />
                        <ThemeToggle />
                    </div>
                </nav>
            </header>

            <main id="main-content" className="py-12 sm:py-16">
                <div className="content-rail space-y-14">

                    {/* HERO: judul + deskripsi + CTA. */}
                    <div className="space-y-6">
                        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-4xl lg:text-5xl">
                            {project.name}
                        </h1>
                        <p className="max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg">
                            {project.description}
                        </p>

                        {/* Tombol CTA. */}
                        <div className="flex flex-wrap gap-3">
                            {project.liveUrl ? (
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex min-h-11 items-center gap-2 rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-zinc-900 shadow-sm ring-1 ring-zinc-300 transition-colors hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand dark:bg-zinc-900 dark:text-white dark:ring-zinc-700 dark:hover:bg-zinc-800"
                                >
                                    <ExternalLink size={16} aria-hidden="true" />
                                    Live Demo
                                </a>
                            ) : null}
                            {project.url && !project.liveUrl ? (
                                <a
                                    href={project.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex min-h-11 items-center gap-2 rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-zinc-900 shadow-sm ring-1 ring-zinc-300 transition-colors hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand dark:bg-zinc-900 dark:text-white dark:ring-zinc-700 dark:hover:bg-zinc-800"
                                >
                                    <Github size={16} aria-hidden="true" />
                                    Source Code
                                </a>
                            ) : null}
                            {project.url && project.liveUrl ? (
                                <a
                                    href={project.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex min-h-11 items-center gap-2 rounded-md border border-zinc-300 px-5 py-2.5 text-sm font-semibold text-zinc-700 transition-colors hover:border-zinc-400 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:text-white"
                                >
                                    <Github size={16} aria-hidden="true" />
                                    Source Code
                                </a>
                            ) : null}
                        </div>
                    </div>

                    {/* SLIDER GAMBAR BESAR. */}
                    {images.length > 0 ? (
                        <DetailSlider images={images} name={project.name} />
                    ) : null}

                    {/* METADATA GRID: Ownership / Role / Team. */}
                    {(project.ownership || project.role || project.team) ? (
                        <div className="grid grid-cols-1 gap-8 border-t border-zinc-200 pt-10 dark:border-zinc-800 sm:grid-cols-3">
                            <MetaCol label="OWNERSHIP" value={project.ownership} />
                            <MetaCol label="ROLE" value={project.role} />
                            <MetaCol label="TEAM" value={project.team} />
                        </div>
                    ) : null}

                    {/* MY ROLE — numbered list. */}
                    {project.responsibilities?.length ? (
                        <DetailSection label="MY ROLE">
                            <ol className="space-y-4">
                                {project.responsibilities.map((item, i) => (
                                    <li key={i} className="flex gap-4">
                                        <span className="mono-label mt-0.5 shrink-0 w-6 text-right">
                                            {String(i + 1).padStart(2, '0')}
                                        </span>
                                        <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                                            {item}
                                        </p>
                                    </li>
                                ))}
                            </ol>
                        </DetailSection>
                    ) : null}

                    {/* IMPACT — bullet list. */}
                    {project.impact?.length ? (
                        <DetailSection label="IMPACT">
                            <ul className="space-y-3">
                                {project.impact.map((item, i) => (
                                    <li key={i} className="flex gap-3">
                                        <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600" />
                                        <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                                            {item}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </DetailSection>
                    ) : null}

                    {/* STACK — chips. */}
                    {project.tech?.length ? (
                        <DetailSection label="STACK">
                            <ul className="flex flex-wrap gap-2">
                                {project.tech.map(item => (
                                    <li
                                        key={item}
                                        className="inline-flex items-center rounded-md border border-zinc-200 bg-zinc-50 px-3 py-1.5 font-mono text-sm text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </DetailSection>
                    ) : null}

                </div>
            </main>

            <Footer />
        </ErrorBoundary>
    );
}
