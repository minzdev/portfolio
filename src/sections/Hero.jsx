/**
 * @file `Hero` — Hero_Section pembuka halaman portofolio.
 *
 * Bagian ini merender `<section id="hero">` dengan konten di dalam kolom
 * terpusat ber-rail (`.content-rail`). Inilah satu-satunya bagian yang memuat
 * elemen `<h1>` pada halaman (Req 11.4). Gaya visual mengikuti referensi
 * "terminal/elegan": eyebrow monospace, nama bold besar, peran sebagai sublabel,
 * ringkasan, lalu dua call-to-action.
 *
 * Konten utama:
 * - `<h1>` berisi nama "Suparman" (`profile.name`) dan peran (`profile.role`) — Req 2.1.
 * - Dua call-to-action: menuju Contact (`#contact`) dan Experience (`#experience`) — Req 2.2.
 *
 * Animasi masuk dijaga total ≤ 1000ms via stagger pada {@link AnimatedItem} (Req 2.3),
 * dengan preferensi reduksi gerak dihormati (Req 12.2).
 */

import { ArrowRight, ArrowDown, MapPin, BadgeCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import AnimatedItem from '../components/AnimatedItem.jsx';
import { fadeUp, staggerContainer } from '../lib/motion.js';
import { useCV } from '../hooks/useCV.js';

/**
 * Kelas dasar untuk kedua tombol call-to-action: target sentuh ≥ 44px, ring
 * fokus `focus-visible`, transisi warna halus (Req 2.2, 9.3, 13.2).
 * @type {string}
 */
const CTA_BASE_CLASS =
    'inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-950';

/**
 * Hero_Section: identitas, peran, ringkasan singkat, dan dua call-to-action.
 *
 * @returns {import('react').ReactElement} Elemen `<section>` Hero teranimasi.
 */
export default function Hero() {
    const { t } = useTranslation();
    const { profile } = useCV();
    return (
        <section
            id="hero"
            aria-label="Beranda"
            className="scroll-mt-20 flex min-h-[calc(100svh-3.5rem)] items-center py-16 sm:py-20"
        >
            <div className="content-rail">
                <div className="grid gap-8 lg:grid-cols-[1fr,auto] lg:gap-12 items-center">
                    <AnimatedItem
                        as="div"
                        variant={staggerContainer}
                        className="flex flex-col items-start gap-6"
                    >
                        {/* Eyebrow monospace: peran profesional pengiring nama. */}
                        <AnimatedItem as="p" variant={fadeUp} className="mono-label">
                            {profile.headline}
                        </AnimatedItem>

                        {/* Satu-satunya <h1> per halaman: nama + peran (Req 2.1, 11.4). */}
                        <AnimatedItem as="h1" variant={fadeUp}>
                            <span className="flex items-center gap-2 text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-5xl lg:text-6xl">
                                {profile.name}
                                <BadgeCheck
                                    className="text-brand"
                                    size={32}
                                    aria-hidden="true"
                                />
                            </span>
                            <span className="mt-3 block font-mono text-base font-medium text-zinc-500 dark:text-zinc-400 sm:text-lg">
                                {profile.role}
                            </span>
                        </AnimatedItem>

                        {/* Tagline singkat & khas untuk Hero (berbeda dari ringkasan
                            penuh di About agar tidak ganda). */}
                        <AnimatedItem
                            as="p"
                            variant={fadeUp}
                            className="max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400"
                        >
                            {profile.tagline ?? profile.summary}
                        </AnimatedItem>

                        {/* Lokasi singkat bergaya baris info. */}
                        <AnimatedItem
                            as="p"
                            variant={fadeUp}
                            className="inline-flex items-center gap-2 font-mono text-sm text-zinc-500 dark:text-zinc-500"
                        >
                            <MapPin size={16} aria-hidden="true" />
                            <span>{profile.location}</span>
                        </AnimatedItem>

                        {/* Dua call-to-action: Contact (utama) & Experience (sekunder). */}
                        <AnimatedItem
                            as="div"
                            variant={fadeUp}
                            className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center"
                        >
                            <a
                                href="#contact"
                                className={`${CTA_BASE_CLASS} bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200`}
                            >
                                {t('hero.ctaContact')}
                                <ArrowRight size={18} aria-hidden="true" />
                            </a>
                            <a
                                href="#experience"
                                className={`${CTA_BASE_CLASS} border border-zinc-300 text-zinc-700 hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:text-white`}
                            >
                                {t('hero.ctaExperience')}
                                <ArrowDown size={18} aria-hidden="true" />
                            </a>
                        </AnimatedItem>
                    </AnimatedItem>

                    {/* Foto profil dengan efek gradient border dan shadow elegan */}
                    <AnimatedItem
                        as="div"
                        variant={fadeUp}
                        className="order-first lg:order-last flex justify-center lg:justify-end"
                    >
                        <div className="relative flex items-center justify-center">
                            {/* Gradient border effect - matching photo size exactly */}
                            <div className="absolute bg-gradient-to-r from-brand to-zinc-400 dark:from-brand dark:to-zinc-600 rounded-full blur opacity-75 w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64"></div>

                            {/* Profile photo */}
                            <img
                                src="/profile.png"
                                alt={`${profile.name} - ${profile.role}`}
                                className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-full object-cover border-4 border-white dark:border-zinc-900 shadow-2xl"
                                loading="eager"
                            />
                        </div>
                    </AnimatedItem>
                </div>
            </div>
        </section>
    );
}
