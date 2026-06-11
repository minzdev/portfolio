/**
 * @file `HomePage` — halaman beranda yang merakit seluruh bagian portofolio.
 *
 * Menyusun struktur halaman secara berurutan sesuai {@link SECTIONS}:
 * Navigation_Bar (dengan indikator bagian aktif), bagian konten
 * (Hero → About → Experience → Skills → Projects → Education → Certifications →
 * Contact), dan Footer. SEO_Module ({@link SEO}) menyuntikkan metadata `<head>`.
 *
 * Aksesibilitas:
 * - Tautan "Lewati ke konten utama" (skip-to-content) menjadi elemen fokus
 *   pertama, tersembunyi visual namun tampak saat menerima fokus keyboard.
 * - Konten utama dibungkus `<main id="main-content">` sebagai target lompatan.
 */

import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import SEO from '../components/SEO.jsx';
import { useTranslation } from 'react-i18next';
import { useActiveSection } from '../hooks/useActiveSection.js';
import { SECTIONS } from '../lib/sections.js';
import Hero from '../sections/Hero.jsx';
import About from '../sections/About.jsx';
import Experience from '../sections/Experience.jsx';
import Skills from '../sections/Skills.jsx';
import GitHubActivity from '../sections/GitHubActivity.jsx';
import Education from '../sections/Education.jsx';
import Certifications from '../sections/Certifications.jsx';
import Contact from '../sections/Contact.jsx';

/**
 * Halaman beranda lengkap situs portofolio.
 *
 * @returns {import('react').ReactElement} Pohon UI beranda.
 */
export default function HomePage() {
    const { t } = useTranslation();
    const activeId = useActiveSection(SECTIONS.map((section) => section.id));

    return (
        <>
            {/* Metadata SEO untuk <head> dokumen. */}
            <SEO />

            {/* Tautan skip-to-content: fokus pertama, tampak saat difokuskan. */}
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-zinc-900 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 dark:focus:ring-offset-zinc-950"
            >
                {t('common.skipToContent')}
            </a>

            {/* Navigation_Bar sticky dengan indikator bagian aktif. */}
            <Navbar activeId={activeId} />

            {/* Konten utama: bagian dalam urutan dokumen, dipisahkan pita hatch. */}
            <main id="main-content">
                <Hero />
                <div className="hatch-divider" aria-hidden="true" />
                <About />
                <div className="hatch-divider" aria-hidden="true" />
                <Experience />
                <div className="hatch-divider" aria-hidden="true" />
                <Skills />
                <div className="hatch-divider" aria-hidden="true" />
                <GitHubActivity />
                <div className="hatch-divider" aria-hidden="true" />
                <Education />
                <div className="hatch-divider" aria-hidden="true" />
                <Certifications />
                <div className="hatch-divider" aria-hidden="true" />
                <Contact />
            </main>

            <Footer />
        </>
    );
}
