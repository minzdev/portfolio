/**
 * @file Unit test untuk komponen `SEO` (`SEO.jsx`).
 *
 * Memvalidasi bahwa `<Helmet>` (react-helmet-async) menyuntikkan metadata
 * dokumen ke dalam `<head>`:
 * - Elemen `<title>` dan `<meta name="description">` yang deskriptif tentang
 *   identitas serta peran profesional (Req 11.1).
 * - Tag Open Graph (og:title, og:description, og:type, og:image, og:url) dan
 *   Twitter Card (twitter:card, twitter:title, twitter:description,
 *   twitter:image) untuk pratinjau saat dibagikan ke media sosial (Req 11.2).
 *
 * `SEO` WAJIB dirender di dalam `HelmetProvider` dari `react-helmet-async`.
 * react-helmet-async menerapkan perubahan `<head>` secara asinkron, sehingga
 * test mengueri `document` melalui `waitFor` agar Helmet sempat melakukan flush.
 * Ini adalah test contoh/unit (bukan property-based). Lingkungan uji adalah
 * jsdom (lihat `vite.config.js`).
 */

import { describe, it, expect } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import SEO from './SEO.jsx';
import { profile } from '../data/cv.js';

/** Nilai title default yang dibangun komponen dari `profile`. */
const EXPECTED_TITLE = `${profile.name} — ${profile.role}`;
/** Nilai description default yang dibangun komponen dari `profile`. */
const EXPECTED_DESCRIPTION =
    `${profile.name} — ${profile.headline}. ${profile.summary}`.trim();

/**
 * Merender komponen `SEO` di dalam `HelmetProvider`. Pohon harus dibungkus
 * provider agar `<Helmet>` dapat berfungsi.
 *
 * @param {object} [props] Properti opsional yang diteruskan ke `SEO`.
 */
function renderSEO(props) {
    return render(
        <HelmetProvider>
            <SEO {...props} />
        </HelmetProvider>,
    );
}

describe('SEO', () => {
    it('menyuntikkan elemen <title> ke dalam dokumen (Req 11.1)', async () => {
        renderSEO();

        await waitFor(() => {
            expect(document.title).toBe(EXPECTED_TITLE);
        });
    });

    it('menyuntikkan <meta name="description"> ke dalam <head> (Req 11.1)', async () => {
        renderSEO();

        await waitFor(() => {
            const meta = document.querySelector('meta[name="description"]');
            expect(meta).not.toBeNull();
            expect(meta?.getAttribute('content')).toBe(EXPECTED_DESCRIPTION);
        });
    });

    it('menyuntikkan tag Open Graph (og:title, og:description, og:type, og:image, og:url) (Req 11.2)', async () => {
        renderSEO();

        await waitFor(() => {
            const ogTitle = document.querySelector('meta[property="og:title"]');
            expect(ogTitle?.getAttribute('content')).toBe(EXPECTED_TITLE);
        });

        const ogDescription = document.querySelector(
            'meta[property="og:description"]',
        );
        expect(ogDescription?.getAttribute('content')).toBe(EXPECTED_DESCRIPTION);

        const ogType = document.querySelector('meta[property="og:type"]');
        expect(ogType?.getAttribute('content')).toBe('profile');

        // og:image harus berupa URL absolut yang dibangun dari siteUrl + ogImage.
        const ogImage = document.querySelector('meta[property="og:image"]');
        expect(ogImage).not.toBeNull();
        expect(ogImage?.getAttribute('content')).toBe(
            'https://suparman.dev/og-image.png',
        );

        const ogUrl = document.querySelector('meta[property="og:url"]');
        expect(ogUrl?.getAttribute('content')).toBe('https://suparman.dev');
    });

    it('menyuntikkan tag Twitter Card (twitter:card, twitter:title, twitter:description, twitter:image) (Req 11.2)', async () => {
        renderSEO();

        await waitFor(() => {
            const twitterCard = document.querySelector(
                'meta[name="twitter:card"]',
            );
            expect(twitterCard?.getAttribute('content')).toBe(
                'summary_large_image',
            );
        });

        const twitterTitle = document.querySelector('meta[name="twitter:title"]');
        expect(twitterTitle?.getAttribute('content')).toBe(EXPECTED_TITLE);

        const twitterDescription = document.querySelector(
            'meta[name="twitter:description"]',
        );
        expect(twitterDescription?.getAttribute('content')).toBe(
            EXPECTED_DESCRIPTION,
        );

        const twitterImage = document.querySelector('meta[name="twitter:image"]');
        expect(twitterImage?.getAttribute('content')).toBe(
            'https://suparman.dev/og-image.png',
        );
    });
});
