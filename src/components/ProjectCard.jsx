/**
 * @file `ProjectCard` — kartu proyek dengan slider gambar, judul, tahun,
 * ringkasan, dan chip teknologi.
 *
 * Mendukung satu gambar (string) atau beberapa gambar (array string) yang
 * dapat dislide menggunakan tombol panah dan indikator dots. Navigasi slider
 * menggunakan event `onClick` dengan `stopPropagation` agar tidak mengaktifkan
 * tautan kartu secara tidak sengaja.
 *
 * Aksesibilitas: tombol panah punya `aria-label`, gambar punya `alt`,
 * indikator dots punya `aria-current` dan `aria-label`.
 */

import { useState, useCallback } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, FolderGit2 } from 'lucide-react';

/**
 * Menormalisasi field `images` menjadi array string. Menerima string tunggal,
 * array string, atau undefined.
 *
 * @param {string|string[]|undefined} images Nilai field gambar dari data.
 * @returns {string[]} Array URL gambar (bisa kosong).
 */
function normalizeImages(images) {
    if (!images) {
        return [];
    }
    if (typeof images === 'string') {
        return [images];
    }
    return Array.isArray(images) ? images.filter(Boolean) : [];
}

/**
 * Area pratinjau dengan slider gambar. Tidak dibungkus tautan agar klik
 * panah tidak memicu navigasi ke `project.url`.
 *
 * @param {object} props Properti komponen.
 * @param {string[]} props.images Daftar URL gambar (sudah dinormalisasi).
 * @param {string} props.name Nama proyek (untuk teks alt gambar).
 * @returns {import('react').ReactElement} Area pratinjau.
 */
function ImageSlider({ images, name }) {
    const [current, setCurrent] = useState(0);
    const total = images.length;

    const prev = useCallback((event) => {
        event.preventDefault();
        event.stopPropagation();
        setCurrent((i) => (i - 1 + total) % total);
    }, [total]);

    const next = useCallback((event) => {
        event.preventDefault();
        event.stopPropagation();
        setCurrent((i) => (i + 1) % total);
    }, [total]);

    const goTo = useCallback((index, event) => {
        event.preventDefault();
        event.stopPropagation();
        setCurrent(index);
    }, []);

    if (total === 0) {
        return (
            <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900">
                <div className="flex h-full w-full items-center justify-center text-zinc-300 dark:text-zinc-700">
                    <FolderGit2 size={40} aria-hidden="true" />
                </div>
            </div>
        );
    }

    return (
        <div className="group/slider relative aspect-[16/9] w-full overflow-hidden border-b border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900">
            {/* Gambar aktif. */}
            <img
                key={current}
                src={images[current]}
                alt={`Pratinjau ${name} ${total > 1 ? `(${current + 1}/${total})` : ''}`}
                className="h-full w-full object-cover transition-opacity duration-300"
                loading="lazy"
            />

            {/* Tombol navigasi: hanya tampil bila ada lebih dari satu gambar. */}
            {total > 1 ? (
                <>
                    {/* Panah kiri. */}
                    <button
                        type="button"
                        onClick={prev}
                        aria-label="Gambar sebelumnya"
                        className="absolute left-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-opacity group-hover/slider:opacity-100 hover:bg-black/70 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                        <ChevronLeft size={18} aria-hidden="true" />
                    </button>

                    {/* Panah kanan. */}
                    <button
                        type="button"
                        onClick={next}
                        aria-label="Gambar berikutnya"
                        className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-opacity group-hover/slider:opacity-100 hover:bg-black/70 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                        <ChevronRight size={18} aria-hidden="true" />
                    </button>

                    {/* Indikator dots. */}
                    <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-1.5">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={(e) => goTo(index, e)}
                                aria-label={`Gambar ${index + 1}`}
                                aria-current={index === current ? 'true' : undefined}
                                className={`h-1.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${index === current
                                    ? 'w-4 bg-white'
                                    : 'w-1.5 bg-white/50 hover:bg-white/80'
                                    }`}
                            />
                        ))}
                    </div>

                    {/* Penanda jumlah di pojok atas kanan. */}
                    <span className="absolute right-2 top-2 rounded-md bg-black/50 px-2 py-0.5 font-mono text-[10px] text-white">
                        {current + 1}/{total}
                    </span>
                </>
            ) : null}
        </div>
    );
}

/**
 * Isi teks kartu (judul, deskripsi, chip tech).
 *
 * @param {object} props Properti komponen.
 * @param {import('../data/cv.js').Project} props.project Data proyek.
 * @param {boolean} props.isLink Apakah kartu berupa tautan.
 * @returns {import('react').ReactElement} Badan teks kartu.
 */
function CardText({ project, isLink }) {
    return (
        <div className="flex flex-1 flex-col p-5">
            <div className="flex items-start justify-between gap-3">
                <h3 className="text-base font-semibold leading-snug text-zinc-900 dark:text-white">
                    {project.name}
                </h3>
                {isLink ? (
                    <ArrowUpRight
                        size={18}
                        aria-hidden="true"
                        className="mt-0.5 shrink-0 text-zinc-400 transition-colors group-hover:text-zinc-900 dark:text-zinc-500 dark:group-hover:text-white"
                    />
                ) : null}
            </div>

            <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {project.description}
            </p>

            {/* Chip teknologi + tahun. */}
            <ul className="mt-4 flex flex-wrap items-center gap-2">
                <li className="inline-flex items-center rounded-md border border-zinc-200 bg-zinc-50 px-2.5 py-1 font-mono text-xs text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-500">
                    {project.year}
                </li>
                {project.tech?.map((item) => (
                    <li
                        key={item}
                        className="inline-flex items-center rounded-md border border-zinc-200 bg-zinc-50 px-2.5 py-1 font-mono text-xs text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400"
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}

/**
 * Kartu proyek lengkap dengan slider gambar. Tautan (`project.url`) membungkus
 * hanya bagian teks; slider tidak ikut terbungkus tautan agar klik tombol
 * navigasi tidak memicu navigasi ke URL proyek.
 *
 * @param {object} props Properti komponen.
 * @param {import('../data/cv.js').Project} props.project Data proyek.
 * @returns {import('react').ReactElement} Kartu proyek.
 */
export default function ProjectCard({ project }) {
    const images = normalizeImages(project.images ?? project.image);
    const baseClass =
        'group flex h-full flex-col overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50/60 transition-colors dark:border-zinc-800 dark:bg-zinc-900/40';
    const hoverClass =
        'hover:border-zinc-300 dark:hover:border-zinc-700';

    return (
        <div className={`${baseClass} ${project.url ? hoverClass : ''}`}>
            {/* Slider gambar (tidak dibungkus <a> agar navigasi slider aman). */}
            <ImageSlider images={images} name={project.name} />

            {/* Teks dibungkus tautan detail proyek. */}
            {project.slug ? (
                <a
                    href={`/project-detail.html?slug=${project.slug}`}
                    className="flex flex-1 flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand"
                >
                    <CardText project={project} isLink />
                </a>
            ) : project.url ? (
                <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand"
                >
                    <CardText project={project} isLink />
                </a>
            ) : (
                <CardText project={project} isLink={false} />
            )}
        </div>
    );
}
