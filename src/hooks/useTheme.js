/**
 * @file `ThemeProvider` (React Context) dan hook `useTheme`.
 *
 * Mengelola state tema terang/gelap aplikasi: menginisialisasi tema dari
 * `localStorage`/`prefers-color-scheme` (Req 10.1), menyinkronkan kelas `dark`
 * pada elemen `<html>` (Req 10.2), dan mempersistensi preferensi ke
 * `localStorage` setiap kali tema berubah (Req 10.3). Logika murni tema
 * didelegasikan ke utilitas di `src/lib/theme.js`.
 */

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import {
    getInitialTheme,
    persistTheme,
    readTheme,
    toggleTheme as nextTheme,
    THEME_DARK,
} from '../lib/theme.js';

/**
 * Context tema. Bernilai `null` ketika dikonsumsi di luar `ThemeProvider`,
 * yang memicu error informatif pada `useTheme`.
 *
 * @type {import('react').Context<{
 *   theme: 'light' | 'dark',
 *   toggleTheme: () => void,
 *   setTheme: (t: 'light' | 'dark') => void
 * } | null>}
 */
const ThemeContext = createContext(null);

/**
 * Menentukan apakah pengguna lebih menyukai mode gelap berdasarkan
 * `prefers-color-scheme`. Dibungkus secara defensif agar aman pada lingkungan
 * tanpa `window`/`matchMedia` (SSR/jsdom).
 *
 * @returns {boolean} `true` bila pengguna lebih menyukai mode gelap.
 */
function prefersDarkScheme() {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
        return false;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

/**
 * Provider tema. Membungkus aplikasi dan menyediakan nilai
 * `{ theme, toggleTheme, setTheme }` melalui React Context.
 *
 * - Inisialisasi tema via `getInitialTheme(readTheme(), prefersDark)` (Req 10.1).
 * - Efek menyinkronkan kelas `dark` pada `<html>` (Req 10.2) dan memanggil
 *   `persistTheme` setiap kali tema berubah (Req 10.3).
 *
 * @param {{ children: import('react').ReactNode }} props Properti komponen.
 * @returns {import('react').ReactElement} Provider yang membungkus `children`.
 */
export function ThemeProvider({ children }) {
    const [theme, setThemeState] = useState(() =>
        getInitialTheme(readTheme(), prefersDarkScheme())
    );

    useEffect(() => {
        const root = document.documentElement;
        if (theme === THEME_DARK) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        persistTheme(theme);
    }, [theme]);

    const toggleTheme = useCallback(() => {
        setThemeState((current) => nextTheme(current));
    }, []);

    const setTheme = useCallback((t) => {
        setThemeState(t);
    }, []);

    const value = useMemo(
        () => ({ theme, toggleTheme, setTheme }),
        [theme, toggleTheme, setTheme]
    );

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/**
 * Hook untuk mengakses context tema. Harus digunakan di dalam `ThemeProvider`.
 *
 * @returns {{
 *   theme: 'light' | 'dark',
 *   toggleTheme: () => void,
 *   setTheme: (t: 'light' | 'dark') => void
 * }} Nilai context tema.
 * @throws {Error} Bila dipanggil di luar `ThemeProvider`.
 */
export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === null) {
        throw new Error('useTheme harus digunakan di dalam <ThemeProvider>.');
    }
    return context;
}
