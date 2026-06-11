/**
 * @file Konfigurasi i18next untuk dwibahasa Indonesia (id) dan Inggris (en).
 *
 * Modul ini menginisialisasi instance i18next global dan mendaftarkannya ke
 * react-i18next. Hanya teks antarmuka (label navigasi, judul bagian, tombol)
 * yang disimpan di sini; konten CV dikelola terpisah via dataset per bahasa
 * (`src/data/cv.js` untuk id, `src/data/cv.en.js` untuk en) dan dipilih oleh
 * hook `useCV`.
 *
 * Bahasa default adalah `id` (situs berbahasa Indonesia). Deteksi otomatis
 * hanya membaca preferensi tersimpan di `localStorage` agar perilaku
 * deterministik (tidak ikut bahasa peramban), dan pilihan pengguna dipersist.
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

/** Kunci penyimpanan preferensi bahasa di `localStorage`. */
export const LANG_STORAGE_KEY = 'lang';

/**
 * Sumber daya terjemahan teks antarmuka. Nilai `id` SENGAJA dibuat identik
 * dengan teks yang sebelumnya ditanam langsung agar tampilan tidak berubah
 * pada bahasa default.
 */
const resources = {
    id: {
        translation: {
            nav: {
                hero: 'Beranda',
                about: 'Tentang',
                experience: 'Pengalaman',
                skills: 'Keahlian',
                projects: 'Proyek',
                education: 'Pendidikan',
                certifications: 'Sertifikasi',
                contact: 'Kontak',
                menuOpen: 'Buka menu navigasi',
                menuClose: 'Tutup menu navigasi',
            },
            section: {
                aboutTitle: 'Tentang Saya',
                experienceTitle: 'Pengalaman Kerja',
                skillsTitle: 'Keahlian',
                projectsTitle: 'Proyek',
                educationTitle: 'Pendidikan',
                certificationsTitle: 'Pelatihan & Sertifikasi',
                contactTitle: 'Kontak',
                activityTitle: 'Aktivitas GitHub',
            },
            hero: {
                ctaContact: 'Hubungi Saya',
                ctaExperience: 'Lihat Pengalaman',
            },
            certifications: {
                viewCertificate: 'Lihat sertifikat {{name}}',
            },
            projects: {
                viewAll: 'Lihat Semua Proyek',
                backHome: 'Kembali ke beranda',
                searchPlaceholder: 'Cari proyek...',
                empty: 'Tidak ada proyek yang cocok dengan pencarian.',
            },
            common: {
                skipToContent: 'Lewati ke konten utama',
                builtBy: 'Dibuat dengan sepenuh hati oleh',
                quickLinks: 'Tautan cepat',
                toIndonesian: 'Ganti ke Bahasa Indonesia',
                toEnglish: 'Switch to English',
            },
        },
    },
    en: {
        translation: {
            nav: {
                hero: 'Home',
                about: 'About',
                experience: 'Experience',
                skills: 'Skills',
                projects: 'Projects',
                education: 'Education',
                certifications: 'Certifications',
                contact: 'Contact',
                menuOpen: 'Open navigation menu',
                menuClose: 'Close navigation menu',
            },
            section: {
                aboutTitle: 'About Me',
                experienceTitle: 'Work Experience',
                skillsTitle: 'Skills',
                projectsTitle: 'Projects',
                educationTitle: 'Education',
                certificationsTitle: 'Training & Certifications',
                contactTitle: 'Contact',
                activityTitle: 'GitHub Activity',
            },
            hero: {
                ctaContact: 'Get in Touch',
                ctaExperience: 'View Experience',
            },
            certifications: {
                viewCertificate: 'View {{name}} certificate',
            },
            projects: {
                viewAll: 'View All Projects',
                backHome: 'Back to home',
                searchPlaceholder: 'Search projects...',
                empty: 'No projects match your search.',
            },
            common: {
                skipToContent: 'Skip to main content',
                builtBy: 'Built with care by',
                quickLinks: 'Quick links',
                toIndonesian: 'Ganti ke Bahasa Indonesia',
                toEnglish: 'Switch to English',
            },
        },
    },
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'id',
        supportedLngs: ['id', 'en'],
        // Hanya deteksi dari localStorage agar deterministik; abaikan bahasa
        // peramban. Tanpa nilai tersimpan, fallback ke 'id'.
        detection: {
            order: ['localStorage'],
            lookupLocalStorage: LANG_STORAGE_KEY,
            caches: ['localStorage'],
        },
        interpolation: { escapeValue: false },
        react: { useSuspense: false },
    });

export default i18n;
