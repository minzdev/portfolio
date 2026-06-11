/**
 * @file `Experience` — Experience_Section riwayat pengalaman kerja.
 *
 * Bagian ini merender `<section id="experience">` melalui wrapper
 * {@link Section} (menyusun `<h2>` "Pengalaman Kerja" beserta animasi masuk
 * berbasis Viewport — Req 4.5, 12.1). Konten:
 * - Daftar tiga pengalaman kerja dari `experiences` (Req 4.1).
 * - Pengurutan kronologis terbaru → terlama via
 *   {@link sortExperiencesByRecency} (Req 4.4).
 * - Tiap kartu menampilkan jabatan (`title`), perusahaan (`company`), periode
 *   (`period`), dan daftar tanggung jawab (`responsibilities`) — Req 4.2, 4.3.
 * - Tiap kartu memakai {@link AnimatedItem} dengan `inView` agar dianimasikan
 *   saat memasuki Viewport (Req 4.5).
 *
 * Seluruh konten berasal dari `src/data/cv.js` sebagai sumber tunggal
 * kebenaran, tanpa teks yang ditanam langsung.
 */

import { Briefcase, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Section from '../components/Section.jsx';
import AnimatedItem from '../components/AnimatedItem.jsx';
import { useCV } from '../hooks/useCV.js';
import { sortExperiencesByRecency } from '../lib/ordering.js';

/**
 * Experience_Section: daftar pengalaman kerja terurut terbaru → terlama.
 *
 * @returns {import('react').ReactElement} Elemen `<section>` Experience teranimasi.
 */
export default function Experience() {
    const { t } = useTranslation();
    const { experiences } = useCV();
    // Urutkan terbaru → terlama tanpa mengubah data sumber (Req 4.4).
    const sortedExperiences = sortExperiencesByRecency(experiences);

    return (
        <Section id="experience" title={t('section.experienceTitle')} eyebrow="// experience">
            <ol className="mt-10 space-y-4">
                {sortedExperiences.map((experience) => (
                    <li key={experience.id}>
                        <AnimatedItem
                            as="article"
                            inView
                            className="line-card rounded-lg p-5 sm:p-6"
                        >
                            {/* Kepala kartu: jabatan + perusahaan + periode (Req 4.2). */}
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                                <div className="flex items-start gap-3">
                                    <span className="mt-0.5 shrink-0 rounded-md border border-zinc-200 bg-white p-2 text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">
                                        <Briefcase size={18} aria-hidden="true" />
                                    </span>
                                    <div>
                                        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                                            {experience.title}
                                        </h3>
                                        <p className="mt-0.5 text-sm font-medium text-zinc-600 dark:text-zinc-300">
                                            {experience.company}
                                        </p>
                                    </div>
                                </div>

                                <p className="inline-flex shrink-0 items-center gap-2 font-mono text-xs text-zinc-400 dark:text-zinc-500 sm:justify-end">
                                    <Calendar size={14} aria-hidden="true" />
                                    <span>{experience.period}</span>
                                </p>
                            </div>

                            {/* Daftar tanggung jawab utama (Req 4.3). */}
                            <ul className="mt-4 space-y-2 pl-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                                {experience.responsibilities.map((responsibility, index) => (
                                    <li
                                        key={index}
                                        className="relative before:absolute before:-left-4 before:top-2.5 before:h-1 before:w-1 before:rounded-full before:bg-zinc-400 dark:before:bg-zinc-600"
                                    >
                                        {responsibility}
                                    </li>
                                ))}
                            </ul>
                        </AnimatedItem>
                    </li>
                ))}
            </ol>
        </Section>
    );
}
