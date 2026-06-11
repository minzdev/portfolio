/**
 * @file `About` — About_Section ringkasan profil profesional.
 *
 * Bagian ini merender `<section id="about">` melalui wrapper {@link Section}
 * yang menyusun `<h2>` semantik ("Tentang Saya") beserta animasi masuk berbasis
 * Viewport (Req 4.5, 12.1). Konten utama:
 * - Ringkasan profil (`profile.summary`) yang mencakup latar belakang S1
 *   Teknologi Informasi, sertifikasi Junior Web Developer & Analis Program,
 *   serta status alumni DBS Foundation Coding Camp (Req 3.1).
 * - Lokasi (`profile.location`) "Jakarta Selatan, DKI Jakarta" disertai ikon
 *   {@link MapPin} yang ditandai `aria-hidden` agar tidak diumumkan oleh
 *   pembaca layar (Req 3.2).
 *
 * Seluruh konten berasal dari `profile` pada `src/data/cv.js` sebagai sumber
 * tunggal kebenaran, tanpa teks yang ditanam langsung.
 */

import { MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Section from '../components/Section.jsx';
import { useCV } from '../hooks/useCV.js';

/**
 * About_Section: ringkasan profil dan lokasi.
 *
 * @returns {import('react').ReactElement} Elemen `<section>` About teranimasi.
 */
export default function About() {
    const { t } = useTranslation();
    const { profile } = useCV();
    return (
        <Section id="about" title={t('section.aboutTitle')} eyebrow="// about">
            <div className="mt-6 max-w-3xl">
                {/* Ringkasan profil: S1 TI, sertifikasi, alumni DBS (Req 3.1). */}
                <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {profile.summary}
                </p>

                {/* Lokasi dengan ikon MapPin yang aria-hidden (Req 3.2). */}
                <p className="mt-6 inline-flex items-center gap-2 font-mono text-sm text-zinc-500 dark:text-zinc-500">
                    <MapPin size={18} aria-hidden="true" />
                    <span>{profile.location}</span>
                </p>
            </div>
        </Section>
    );
}
