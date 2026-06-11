/**
 * @file Property-based test untuk `buildPersonJsonLd`.
 * Memvalidasi Correctness Property 8: objek JSON-LD bertipe `Person` yang
 * field-nya mencerminkan input dan bertahan melalui round-trip
 * `JSON.parse(JSON.stringify(obj))` tanpa kehilangan data.
 * _Requirements: 11.3_
 */

import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import { buildPersonJsonLd } from './seo.js';

/** Generator profile dengan field string yang relevan untuk JSON-LD. */
const profileArb = fc.record({
    name: fc.string(),
    role: fc.string(),
    headline: fc.string(),
    summary: fc.string(),
    location: fc.string(),
});

/** Generator satu tautan sosial. */
const socialArb = fc.record({
    platform: fc.string(),
    label: fc.string(),
    url: fc.webUrl(),
    icon: fc.string(),
});

/** Generator contact dengan field string dan daftar sosial. */
const contactArb = fc.record({
    email: fc.string(),
    phone: fc.string(),
    phoneHref: fc.string(),
    socials: fc.array(socialArb, { maxLength: 6 }),
});

describe('buildPersonJsonLd — Property 8', () => {
    // Feature: developer-portfolio-website, Property 8: JSON-LD Person
    // mencerminkan input dan valid round-trip — `buildPersonJsonLd` SHALL
    // menghasilkan objek dengan `@type` "Person" yang field-nya (name,
    // jobTitle, email, telephone) mencerminkan nilai input, dan objek tersebut
    // SHALL bertahan melalui round-trip JSON.parse(JSON.stringify(obj)) tanpa
    // kehilangan data. Validates: Requirements 11.3
    it('menghasilkan @type "Person", mencerminkan input, dan bertahan round-trip JSON', () => {
        fc.assert(
            fc.property(profileArb, contactArb, (profile, contact) => {
                const obj = buildPersonJsonLd(profile, contact);

                // 1) @type selalu "Person" (dan @context schema.org).
                expect(obj['@type']).toBe('Person');
                expect(obj['@context']).toBe('https://schema.org');

                // 2) Field mencerminkan nilai input.
                expect(obj.name).toBe(profile.name);
                expect(obj.jobTitle).toBe(profile.role || profile.headline);
                expect(obj.email).toBe(contact.email);
                expect(obj.telephone).toBe(contact.phoneHref || contact.phone);
                expect(obj.address).toBe(profile.location);

                // sameAs mencerminkan URL sosial yang tidak kosong, urutan sama.
                const expectedSameAs = contact.socials
                    .map((s) => s.url)
                    .filter((url) => url.length > 0);
                expect(obj.sameAs).toEqual(expectedSameAs);

                // 3) Round-trip JSON tidak mengubah data (tanpa undefined/fungsi).
                const roundTripped = JSON.parse(JSON.stringify(obj));
                expect(roundTripped).toEqual(obj);
            }),
            { numRuns: 100 },
        );
    });

    it('menangani profile/contact yang hilang atau bukan objek secara defensif', () => {
        fc.assert(
            fc.property(
                fc.oneof(fc.constant(null), fc.constant(undefined), fc.integer(), fc.string()),
                fc.oneof(fc.constant(null), fc.constant(undefined), fc.integer(), fc.string()),
                (profile, contact) => {
                    const obj = buildPersonJsonLd(profile, contact);

                    expect(obj['@type']).toBe('Person');
                    expect(obj['@context']).toBe('https://schema.org');
                    expect(obj.name).toBe('');
                    expect(obj.jobTitle).toBe('');
                    expect(obj.email).toBe('');
                    expect(obj.telephone).toBe('');
                    expect(obj.address).toBe('');
                    expect(obj.sameAs).toEqual([]);

                    // Tetap bertahan round-trip JSON.
                    expect(JSON.parse(JSON.stringify(obj))).toEqual(obj);
                },
            ),
            { numRuns: 100 },
        );
    });
});
