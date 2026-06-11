/**
 * @file `Contact` — Contact_Section informasi kontak dan tautan media sosial.
 *
 * Bagian ini merender `<section id="contact">` melalui wrapper {@link Section}
 * yang menyusun `<h2>` semantik ("Kontak") beserta animasi masuk berbasis
 * Viewport (Req 4.5, 12.1). Konten utama:
 * - Tautan email `mailto:` yang menampilkan alamat email (Req 8.1, 8.2).
 * - Tautan telepon `tel:` yang dibangun dari {@link buildTelHref} sehingga
 *   selalu valid, menampilkan nomor versi tampilan `contact.phone` (Req 8.1,
 *   8.3). Href dihasilkan menjadi `tel:+6285797522591`.
 * - Tautan ikon media sosial (GitHub, LinkedIn) yang membuka profil di tab
 *   baru. Karena hanya berupa ikon, masing-masing diberi `aria-label` agar
 *   memiliki nama aksesibilitas (Req 13.3).
 *
 * Ikon {@link Mail} dan {@link Phone} ditandai `aria-hidden` karena hanya
 * dekoratif. Nama ikon sosial pada data (`social.icon`) berupa string
 * (mis. "Github"/"Linkedin") dipetakan ke komponen lucide-react melalui
 * {@link SOCIAL_ICONS}, dengan fallback ke {@link Globe} bila tidak dikenal.
 *
 * Seluruh konten berasal dari `contact` pada `src/data/cv.js` sebagai sumber
 * tunggal kebenaran, tanpa teks yang ditanam langsung.
 */

import { Github, Globe, Linkedin, Mail, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Section from '../components/Section.jsx';
import { useCV } from '../hooks/useCV.js';
import { buildTelHref } from '../lib/contact.js';

/**
 * Pemetaan nama ikon (string dari `social.icon`) ke komponen lucide-react.
 * Digunakan untuk merender ikon sosial secara dinamis; nilai yang tidak
 * dikenal akan jatuh ke fallback {@link Globe}.
 * @type {Record<string, import('react').ComponentType<{ size?: number }>>}
 */
const SOCIAL_ICONS = {
    Github,
    Linkedin,
};

/**
 * Kelas dasar untuk tautan interaktif: target sentuh minimal 44x44px, ring
 * fokus yang terlihat (`focus-visible`), dan transisi warna konsisten di mode
 * gelap (Req 13.x aksesibilitas).
 * @type {string}
 */
const FOCUS_RING_CLASS =
    'rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-950';

/**
 * Contact_Section: tautan email, telepon, dan ikon media sosial.
 *
 * @returns {import('react').ReactElement} Elemen `<section>` Contact teranimasi.
 */
export default function Contact() {
    const { t } = useTranslation();
    const { contact } = useCV();
    // Bangun href tel: yang ternormalisasi dari phoneHref (fallback ke phone).
    const telHref = buildTelHref(contact.phoneHref || contact.phone);

    return (
        <Section id="contact" title={t('section.contactTitle')} eyebrow="// contact">
            <div className="mt-8 max-w-3xl">
                {/* Tautan kontak utama: email & telepon. */}
                <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {/* Email mailto: menampilkan alamat email (Req 8.1, 8.2). */}
                    <li>
                        <a
                            href={`mailto:${contact.email}`}
                            className={`line-card flex min-h-11 items-center gap-3 px-4 py-3 font-mono text-sm text-zinc-600 transition-colors hover:border-zinc-300 hover:text-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:text-white ${FOCUS_RING_CLASS}`}
                        >
                            <Mail size={18} aria-hidden="true" />
                            <span className="truncate">{contact.email}</span>
                        </a>
                    </li>

                    {/* Telepon tel: menampilkan nomor versi tampilan (Req 8.1, 8.3). */}
                    <li>
                        <a
                            href={telHref}
                            className={`line-card flex min-h-11 items-center gap-3 px-4 py-3 font-mono text-sm text-zinc-600 transition-colors hover:border-zinc-300 hover:text-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:text-white ${FOCUS_RING_CLASS}`}
                        >
                            <Phone size={18} aria-hidden="true" />
                            <span className="truncate">{contact.phone}</span>
                        </a>
                    </li>
                </ul>

                {/* Tautan ikon media sosial dengan aria-label (Req 13.3). */}
                <ul className="mt-4 flex flex-wrap items-center gap-3">
                    {contact.socials.map((social) => {
                        const Icon = SOCIAL_ICONS[social.icon] || Globe;
                        return (
                            <li key={social.platform}>
                                <a
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    className={`line-card inline-flex h-11 w-11 items-center justify-center text-zinc-500 transition-colors hover:border-zinc-300 hover:text-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-white ${FOCUS_RING_CLASS}`}
                                >
                                    <Icon size={18} aria-hidden="true" />
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </Section>
    );
}
