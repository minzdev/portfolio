/**
 * @file `Certifications` — Certification_Section daftar pelatihan & sertifikasi.
 *
 * Bagian ini merender `<section id="certifications">` melalui wrapper
 * {@link Section} (menyusun `<h2>` "Pelatihan & Sertifikasi" beserta animasi
 * masuk berbasis Viewport — Req 12.1). Konten:
 * - Enam pelatihan dan sertifikasi dari `certifications` (Req 7.1).
 * - Tiap kartu menampilkan nama sertifikasi (`name`), lembaga penerbit
 *   (`issuer`), dan tahun (`year`) — Req 7.2.
 * - Grid kartu responsif (1 → 2 → 3 kolom) dengan gaya konsisten di mode gelap.
 * - Tiap kartu memakai {@link AnimatedItem} dengan `inView` agar dianimasikan
 *   saat memasuki Viewport.
 *
 * Seluruh konten berasal dari `src/data/cv.js` sebagai sumber tunggal
 * kebenaran, tanpa teks yang ditanam langsung.
 */

import { Award, Calendar, ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Section from '../components/Section.jsx';
import AnimatedItem from '../components/AnimatedItem.jsx';
import { useCV } from '../hooks/useCV.js';

/**
 * Konten internal sebuah baris sertifikasi (dipakai untuk tautan maupun div).
 *
 * @param {object} props Properti komponen.
 * @param {import('../data/cv.js').Certification} props.cert Data sertifikasi.
 * @param {boolean} props.isLink Apakah baris berupa tautan (menampilkan panah).
 * @returns {import('react').ReactElement} Konten baris sertifikasi.
 */
function CertificationBody({ cert, isLink }) {
    return (
        <>
            <span className="mt-0.5 inline-flex shrink-0 rounded-md border border-zinc-200 bg-white p-2 text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">
                <Award size={18} aria-hidden="true" />
            </span>

            <div className="min-w-0 flex-1">
                {/* Nama sertifikasi sebagai heading (Req 7.2). */}
                <h3 className="text-base font-semibold text-zinc-900 dark:text-white">
                    {cert.name}
                </h3>

                {/* Lembaga penerbit + tahun (Req 7.2). */}
                <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs text-zinc-500 dark:text-zinc-400">
                    <span className="inline-flex items-center gap-1">
                        <span aria-hidden="true">@</span>
                        <span>{cert.issuer}</span>
                    </span>
                    <span aria-hidden="true" className="text-zinc-300 dark:text-zinc-700">|</span>
                    <span className="inline-flex items-center gap-1">
                        <Calendar size={12} aria-hidden="true" />
                        <span>{cert.year}</span>
                    </span>
                </p>
            </div>

            {isLink ? (
                <ArrowUpRight
                    size={18}
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-zinc-400 transition-colors group-hover:text-zinc-900 dark:text-zinc-500 dark:group-hover:text-white"
                />
            ) : null}
        </>
    );
}

/**
 * Certification_Section: daftar pelatihan & sertifikasi dalam grid kartu responsif.
 *
 * @returns {import('react').ReactElement} Elemen `<section>` Certifications teranimasi.
 */
export default function Certifications() {
    const { t } = useTranslation();
    const { certifications } = useCV();
    return (
        <Section id="certifications" title={t('section.certificationsTitle')} eyebrow="// certifications">
            <ul className="mt-10 divide-y divide-zinc-200 overflow-hidden rounded-lg border border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
                {certifications.map((cert) => {
                    const hasUrl = Boolean(cert.url);
                    return (
                        <li key={`${cert.name}-${cert.year}`}>
                            <AnimatedItem as="div" inView>
                                {hasUrl ? (
                                    <a
                                        href={cert.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={t('certifications.viewCertificate', { name: cert.name })}
                                        className="group flex items-start gap-4 bg-zinc-50/60 p-5 transition-colors hover:bg-zinc-100/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand dark:bg-zinc-900/40 dark:hover:bg-zinc-900"
                                    >
                                        <CertificationBody cert={cert} isLink />
                                    </a>
                                ) : (
                                    <div className="flex items-start gap-4 bg-zinc-50/60 p-5 dark:bg-zinc-900/40">
                                        <CertificationBody cert={cert} isLink={false} />
                                    </div>
                                )}
                            </AnimatedItem>
                        </li>
                    );
                })}
            </ul>
        </Section>
    );
}
