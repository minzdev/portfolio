/**
 * @file Property-based test untuk utilitas tema (`theme.js`).
 * Memvalidasi:
 * - Correctness Property 6: pergantian tema bersifat involutif — melakukan
 *   toggle dua kali mengembalikan tema ke nilai semula. Satu kali toggle
 *   selalu menghasilkan tema valid lawannya. _Requirements: 10.1, 10.2_
 * - Correctness Property 7: persistensi tema round-trip — `persistTheme(theme)`
 *   lalu `getInitialTheme(readTheme(), prefersDark)` mengembalikan tema yang
 *   sama terlepas dari nilai `prefersDark`. _Requirements: 10.3_
 */

import { describe, it, expect, beforeEach } from 'vitest';
import fc from 'fast-check';
import {
    toggleTheme,
    persistTheme,
    readTheme,
    getInitialTheme,
    THEME_LIGHT,
    THEME_DARK,
    VALID_THEMES,
} from './theme.js';

/** Generator tema awal yang valid ('light' atau 'dark'). */
const themeArb = fc.constantFrom(THEME_LIGHT, THEME_DARK);

describe('toggleTheme — Property 6', () => {
    // Feature: developer-portfolio-website, Property 6: Pergantian tema adalah involusi
    // (dua kali toggle kembali ke nilai semula). Validates: Requirements 10.1, 10.2
    it('involutif: toggleTheme(toggleTheme(theme)) === theme', () => {
        fc.assert(
            fc.property(themeArb, (theme) => {
                expect(toggleTheme(toggleTheme(theme))).toBe(theme);
            }),
            { numRuns: 100 },
        );
    });

    it('satu kali toggle selalu mengubah tema ke tema valid lawannya', () => {
        fc.assert(
            fc.property(themeArb, (theme) => {
                const toggled = toggleTheme(theme);
                expect(toggled).not.toBe(theme);
                expect(VALID_THEMES).toContain(toggled);
            }),
            { numRuns: 100 },
        );
    });
});

/**
 * Implementasi `localStorage` tiruan (in-memory) untuk pengujian. Menyediakan
 * antarmuka minimal yang dipakai oleh `readTheme`/`persistTheme`
 * (`getItem`, `setItem`, `removeItem`, `clear`).
 */
function createMockLocalStorage() {
    let store = {};
    return {
        getItem(key) {
            return Object.prototype.hasOwnProperty.call(store, key)
                ? store[key]
                : null;
        },
        setItem(key, value) {
            store[key] = String(value);
        },
        removeItem(key) {
            delete store[key];
        },
        clear() {
            store = {};
        },
    };
}

/** Generator nilai boolean untuk preferensi mode gelap. */
const prefersDarkArb = fc.boolean();

describe('persistTheme + getInitialTheme — Property 7', () => {
    beforeEach(() => {
        // Sediakan localStorage tiruan dan reset di antara setiap run.
        globalThis.localStorage = createMockLocalStorage();
    });

    // Feature: developer-portfolio-website, Property 7: Persistensi tema round-trip
    // (persistTheme(theme) lalu getInitialTheme(readTheme(), prefersDark)
    // mengembalikan tema yang sama terlepas dari nilai prefersDark).
    // Validates: Requirements 10.3
    it('round-trip: getInitialTheme(readTheme(), prefersDark) === theme setelah persistTheme(theme)', () => {
        fc.assert(
            fc.property(themeArb, prefersDarkArb, (theme, prefersDark) => {
                // Reset penyimpanan agar tiap iterasi independen.
                globalThis.localStorage.clear();

                persistTheme(theme);
                const restored = getInitialTheme(readTheme(), prefersDark);

                expect(restored).toBe(theme);
            }),
            { numRuns: 100 },
        );
    });
});
