/**
 * @file `Education` — Education_Section riwayat pendidikan formal.
 *
 * Bagian ini merender `<section id="education">` melalui wrapper {@link Section}
 * (menyusun `<h2>` "Pendidikan" beserta animasi masuk berbasis Viewport —
 * Req 12.1). Konten:
 * - Daftar riwayat pendidikan dari `education` (Req 6.1).
 * - Tiap kartu menampilkan nama institusi (`institution`), program studi
 *   (`program`), dan periode (`period`) — Req 6.2.
 * - Tiap kartu memakai {@link AnimatedItem} dengan `inView` agar dianimasikan
 *   saat memasuki Viewport.
 *
 * Seluruh konten berasal dari `src/data/cv.js` sebagai sumber tunggal
 * kebenaran, tanpa teks yang ditanam langsung.
 */

import { GraduationCap, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Section from '../components/Section.jsx';
import AnimatedItem from '../components/AnimatedItem.jsx';
import { useCV } from '../hooks/useCV.js';

/**
 * Education_Section: daftar riwayat pendidikan formal.
 *
 * @returns {import('react').ReactElement} Elemen `<section>` Education teranimasi.
 */
export default function Education() {
    const { t } = useTranslation();
    const { education } = useCV();
    return (
        <Section id="education" title={t('section.educationTitle')} eyebrow="// education">
            <ol className="mt-10 space-y-4">
                {education.map((entry) => (
                    <li key={`${entry.institution}-${entry.startDate}`}>
                        <AnimatedItem
                            as="article"
                            inView
                            className="line-card rounded-lg p-5 sm:p-6"
                        >
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                                <div className="flex items-start gap-3">
                                    <span className="mt-0.5 shrink-0 rounded-md border border-zinc-200 bg-white p-2 text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">
                                        <GraduationCap size={18} aria-hidden="true" />
                                    </span>
                                    <div>
                                        {/* Nama institusi sebagai heading kartu (Req 6.2). */}
                                        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                                            {entry.institution}
                                        </h3>
                                        {/* Program studi (Req 6.2). */}
                                        <p className="mt-0.5 text-sm font-medium text-zinc-600 dark:text-zinc-300">
                                            {entry.program}
                                        </p>
                                    </div>
                                </div>

                                {/* Periode pendidikan (Req 6.2). */}
                                <p className="inline-flex shrink-0 items-center gap-2 font-mono text-xs text-zinc-400 dark:text-zinc-500 sm:justify-end">
                                    <Calendar size={14} aria-hidden="true" />
                                    <span>{entry.period}</span>
                                </p>
                            </div>
                        </AnimatedItem>
                    </li>
                ))}
            </ol>
        </Section>
    );
}
