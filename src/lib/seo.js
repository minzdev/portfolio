/**
 * @file Utilitas SEO untuk data terstruktur (JSON-LD).
 * Berisi fungsi murni `buildPersonJsonLd` yang membangun objek JSON-LD bertipe
 * `Person` dari `profile` dan `contact`, agar dapat disuntikkan ke dalam
 * `<script type="application/ld+json">` oleh komponen SEO (Req 11.3).
 */

/**
 * Mengambil nilai string dari sebuah masukan secara defensif. Nilai yang bukan
 * string (mis. `undefined`, `null`, angka, objek) dipetakan menjadi string
 * kosong sehingga keluaran selalu aman untuk diserialisasi JSON.
 *
 * @param {unknown} value Nilai mentah.
 * @returns {string} String asli bila bertipe string, jika tidak `''`.
 */
function safeString(value) {
    return typeof value === 'string' ? value : '';
}

/**
 * Membangun objek JSON-LD bertipe `Person` dari `profile` dan `contact`.
 *
 * Objek hasil selalu memiliki `@context: "https://schema.org"` dan
 * `@type: "Person"`, dengan field yang mencerminkan nilai masukan:
 * - `name`      dari `profile.name`
 * - `jobTitle`  dari `profile.role` (fallback ke `profile.headline`)
 * - `email`     dari `contact.email`
 * - `telephone` dari `contact.phoneHref` (fallback ke `contact.phone`)
 * - `address`   dari `profile.location` (string lokasi)
 * - `sameAs`    array URL dari `contact.socials`
 *
 * Sifat-sifat (Property 8):
 * - `@type` selalu bernilai `"Person"`.
 * - Field `name`, `jobTitle`, `email`, `telephone` mencerminkan nilai masukan.
 * - Objek bertahan melalui round-trip `JSON.parse(JSON.stringify(obj))` tanpa
 *   kehilangan data, karena hanya berisi nilai yang dapat diserialisasi JSON
 *   (tanpa `undefined`, fungsi, atau symbol).
 *
 * Masukan `profile`/`contact` yang hilang atau bukan objek ditangani secara
 * defensif (default ke objek/array kosong dan string kosong) sehingga keluaran
 * selalu valid dan dapat diserialisasi.
 *
 * @param {import('../data/cv.js').Profile} [profile] Profil profesional.
 * @param {import('../data/cv.js').Contact} [contact] Informasi kontak.
 * @returns {{
 *   '@context': string,
 *   '@type': string,
 *   name: string,
 *   jobTitle: string,
 *   email: string,
 *   telephone: string,
 *   address: string,
 *   sameAs: string[],
 * }} Objek JSON-LD `Person`.
 */
export function buildPersonJsonLd(profile, contact) {
    const safeProfile = profile && typeof profile === 'object' ? profile : {};
    const safeContact = contact && typeof contact === 'object' ? contact : {};

    const jobTitle =
        safeString(safeProfile.role) || safeString(safeProfile.headline);
    const telephone =
        safeString(safeContact.phoneHref) || safeString(safeContact.phone);

    const socials = Array.isArray(safeContact.socials)
        ? safeContact.socials
        : [];
    const sameAs = socials
        .map((social) => safeString(social?.url))
        .filter((url) => url.length > 0);

    return {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: safeString(safeProfile.name),
        jobTitle,
        email: safeString(safeContact.email),
        telephone,
        address: safeString(safeProfile.location),
        sameAs,
    };
}
