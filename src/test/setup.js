import '@testing-library/jest-dom';
import { vi } from 'vitest';
// Inisialisasi instance i18next global agar komponen yang memakai
// `useTranslation`/`useCV` berfungsi dalam lingkungan uji tanpa provider eksplisit.
// Bahasa default 'id' menjaga teks identik dengan sebelum integrasi i18n.
import '../i18n/index.js';

// `react-github-calendar` melakukan fetch jaringan dan bergantung pada API
// layout/CSS yang tidak tersedia di jsdom. Mock menjadi komponen no-op agar
// pohon App dapat dirender dalam lingkungan uji tanpa galat/efek jaringan.
vi.mock('react-github-calendar', () => ({
    GitHubCalendar: () => null,
}));

// jsdom tidak mengimplementasikan IntersectionObserver, sementara Framer Motion
// memakainya untuk animasi `whileInView` pada wrapper `Section`. Sediakan mock
// no-op agar komponen berbasis Section dapat dirender dalam lingkungan uji.
if (typeof globalThis.IntersectionObserver === 'undefined') {
    class IntersectionObserver {
        constructor(callback) {
            this.callback = callback;
        }
        observe() { }
        unobserve() { }
        disconnect() { }
        takeRecords() {
            return [];
        }
    }
    globalThis.IntersectionObserver = IntersectionObserver;
}
