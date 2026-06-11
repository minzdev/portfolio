/**
 * @file Unit test validasi integritas data CV.
 * Memastikan jumlah item sesuai requirement dan setiap skill.category valid.
 * _Requirements: 4.1, 5.1, 6.1, 7.1_
 */

import { describe, it, expect } from 'vitest';
import {
    SKILL_CATEGORIES,
    experiences,
    skills,
    education,
    certifications,
} from './cv.js';

describe('Integritas data CV', () => {
    it('memuat tepat 3 pengalaman kerja (Req 4.1)', () => {
        expect(experiences).toHaveLength(3);
    });

    it('memuat tepat 2 riwayat pendidikan (Req 6.1)', () => {
        expect(education).toHaveLength(2);
    });

    it('memuat tepat 6 sertifikasi (Req 7.1)', () => {
        expect(certifications).toHaveLength(6);
    });

    it('setiap skill.category termasuk dalam SKILL_CATEGORIES (Req 5.1)', () => {
        for (const skill of skills) {
            expect(SKILL_CATEGORIES).toContain(skill.category);
        }
    });
});
