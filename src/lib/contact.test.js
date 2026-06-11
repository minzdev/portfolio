/**
 * @file Property-based test untuk `buildTelHref`.
 * Memvalidasi Correctness Property 5: normalisasi nomor telepon untuk tautan
 * `tel:` — hasil selalu diawali `tel:` dan bagian nomornya hanya berisi `+`
 * dan digit, dengan urutan digit asli dipertahankan.
 * _Requirements: 8.3_
 */

import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import { buildTelHref } from './contact.js';

/**
 * Generator string nomor telepon realistis: campuran digit, `+`, dan karakter
 * pemisah umum (spasi, tanda hubung, kurung, titik) dalam urutan acak.
 */
const phoneStringArb = fc.stringOf(
    fc.constantFrom('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', ' ', '-', '(', ')', '.'),
    { maxLength: 24 },
);

describe('buildTelHref — Property 5', () => {
    // Feature: developer-portfolio-website, Property 5: Normalisasi nomor telepon
    // untuk tautan tel — nilai href tel: yang dihasilkan SHALL diawali dengan
    // `tel:` dan bagian nomornya hanya mengandung karakter `+` dan digit (0-9),
    // mempertahankan urutan digit asli. Validates: Requirements 8.3
    it('diawali tel:, hanya berisi + dan digit, dan mempertahankan urutan digit', () => {
        fc.assert(
            fc.property(phoneStringArb, (phone) => {
                const href = buildTelHref(phone);

                // 1) Selalu diawali dengan `tel:`.
                expect(href.startsWith('tel:')).toBe(true);

                // 2) Bagian nomor hanya `+` dan digit.
                const numberPart = href.slice('tel:'.length);
                expect(/^[\d+]*$/.test(numberPart)).toBe(true);

                // 3) Urutan digit asli dipertahankan (hanya digit, terurut sama).
                const originalDigits = phone.replace(/\D/g, '');
                const resultDigits = numberPart.replace(/\D/g, '');
                expect(resultDigits).toBe(originalDigits);
            }),
            { numRuns: 100 },
        );
    });

    it('menangani masukan non-string secara defensif menjadi "tel:"', () => {
        fc.assert(
            fc.property(
                fc.oneof(fc.constant(null), fc.constant(undefined), fc.integer(), fc.boolean()),
                (notAString) => {
                    expect(buildTelHref(notAString)).toBe('tel:');
                },
            ),
            { numRuns: 100 },
        );
    });
});
