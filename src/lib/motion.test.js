/**
 * @file Property-based test untuk utilitas animasi (`motion.js`).
 * Memvalidasi:
 * - Correctness Property 9: reduksi gerak menetralkan animasi — ketika
 *   `prefersReducedMotion` bernilai true, props gerak yang dihasilkan
 *   `getMotionProps` membuat state awal (`initial`) sama dengan state akhir
 *   (`animate`) sehingga tidak ada perpindahan posisi/translasi gerak.
 *   _Requirements: 12.2_
 */

import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import { getMotionProps, fadeUp, staggerContainer } from './motion.js';

/** Generator varian animasi yang valid (fadeUp atau staggerContainer). */
const variantArb = fc.constantFrom(fadeUp, staggerContainer);

describe('getMotionProps — Property 9', () => {
    // Feature: developer-portfolio-website, Property 9: Reduksi gerak menetralkan animasi
    // (saat prefersReducedMotion true, initial === animate). Validates: Requirements 12.2
    it('saat prefersReducedMotion true, initial === animate (dan berbeda saat false)', () => {
        fc.assert(
            fc.property(variantArb, (variant) => {
                // Reduksi gerak aktif: initial dan animate harus sama (netral).
                const reduced = getMotionProps(variant, true);
                expect(reduced.initial).toBe(reduced.animate);

                // Reduksi gerak nonaktif: animasi masuk normal (initial != animate).
                const normal = getMotionProps(variant, false);
                expect(normal.initial).not.toBe(normal.animate);
            }),
            { numRuns: 100 },
        );
    });
});
