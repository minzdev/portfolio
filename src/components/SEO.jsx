/**
 * @file `SEO` — komponen SEO_Module yang menyuntikkan metadata dokumen.
 *
 * Komponen ini memakai `<Helmet>` dari `react-helmet-async` untuk menyuntik
 * elemen `<title>`, `<meta name="description">`, tag Open Graph, Twitter Card,
 * serta markup data terstruktur JSON-LD bertipe `Person` (dibangun melalui
 * {@link buildPersonJsonLd}) ke dalam `<head>` dokumen.
 *
 * - Title + meta description yang deskriptif tentang identitas dan peran
 *   profesional Suparman (Req 11.1).
 * - Tag Open Graph dan Twitter Card untuk pratinjau saat dibagikan ke media
 *   sosial (Req 11.2).
 * - `<script type="application/ld+json">` berisi JSON-LD `Person` (Req 11.3).
 *
 * Catatan: agar `<Helmet>` berfungsi, pohon komponen harus dibungkus oleh
 * `HelmetProvider` dari `react-helmet-async` (mis. di `App`/`main`).
 */

import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useCV } from '../hooks/useCV.js';
import { buildPersonJsonLd } from '../lib/seo.js';

/**
 * Menyuntikkan metadata SEO ke dalam `<head>` dokumen.
 *
 * Bila `profile`/`contact` tidak diberikan, komponen memakai dataset CV bahasa
 * aktif via {@link useCV}, dan `lang` `<html>` mengikuti bahasa i18next.
 *
 * @param {object} [props] Properti komponen.
 * @param {import('../data/cv.js').Profile} [props.profile] Profil; default dari dataset bahasa aktif.
 * @param {import('../data/cv.js').Contact} [props.contact] Kontak; default dari dataset bahasa aktif.
 * @param {string} [props.ogImage='/og-image.png'] Path relatif gambar pratinjau.
 * @param {string} [props.siteUrl='https://suparman.dev'] URL kanonik situs.
 * @returns {import('react').ReactElement} Elemen `<Helmet>` berisi metadata.
 */
export default function SEO({
    profile,
    contact,
    ogImage = '/og-image.png',
    siteUrl = 'https://suparman.dev',
} = {}) {
    const { i18n } = useTranslation();
    const cv = useCV();
    const activeProfile = profile ?? cv.profile;
    const activeContact = contact ?? cv.contact;
    const lang = (i18n?.resolvedLanguage || i18n?.language || 'id').slice(0, 2);

    const title = `${activeProfile.name} | ${activeProfile.role}`;
    const description =
        `${activeProfile.name} — ${activeProfile.headline}. ${activeProfile.summary}`.trim();

    // URL absolut diperlukan oleh crawler media sosial untuk og:image/twitter:image.
    const normalizedSiteUrl = siteUrl.replace(/\/$/, '');
    const absoluteImage = /^https?:\/\//.test(ogImage)
        ? ogImage
        : `${normalizedSiteUrl}${ogImage.startsWith('/') ? '' : '/'}${ogImage}`;

    const jsonLd = JSON.stringify(buildPersonJsonLd(activeProfile, activeContact));

    return (
        <Helmet>
            <html lang={lang} />

            {/* Title + meta description (Req 11.1) */}
            <title>{title}</title>
            <meta name="description" content={description} />

            {/* Open Graph (Req 11.2) */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content="profile" />
            <meta property="og:image" content={absoluteImage} />
            <meta property="og:url" content={normalizedSiteUrl} />

            {/* Twitter Card (Req 11.2) */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={absoluteImage} />

            {/* Data terstruktur JSON-LD bertipe Person (Req 11.3) */}
            <script type="application/ld+json">{jsonLd}</script>
        </Helmet>
    );
}
