/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: ['./index.html', './src/**/*.{js,jsx}'],
    theme: {
        // Breakpoints kustom dipetakan ke kelas perangkat (Requirement 9.1).
        // Dasar (mobile-first, tanpa prefix) menargetkan ponsel kecil 320–374px.
        screens: {
            xs: '375px', // ponsel besar
            // Rekonsiliasi: banyak komponen memakai prefix `sm:` (mis. sm:px-6,
            // sm:grid-cols-2, sm:flex-row). Tanpa entri ini, utilitas `sm:`
            // tidak menghasilkan CSS apa pun. Ditempatkan sebelum `md` agar
            // urutan breakpoint tetap menaik dan pemetaan kelas perangkat utuh.
            sm: '640px', // peralihan ponsel besar → tablet kecil
            md: '768px', // tablet
            lg: '1024px', // laptop
            xl: '1440px', // desktop besar
            '2xl': '1920px', // ultra-wide
        },
        extend: {
            fontFamily: {
                // Inter sebagai sans utama; JetBrains Mono untuk aksen teknis.
                sans: [
                    'Inter',
                    'ui-sans-serif',
                    'system-ui',
                    '-apple-system',
                    'Segoe UI',
                    'Roboto',
                    'sans-serif',
                ],
                mono: [
                    'JetBrains Mono',
                    'ui-monospace',
                    'SFMono-Regular',
                    'Menlo',
                    'Consolas',
                    'monospace',
                ],
            },
            fontSize: {
                // Tipografi fluid untuk teks isi: 16px → 20px (Requirement 9.5).
                body: ['clamp(1rem, 0.95rem + 0.5vw, 1.25rem)', { lineHeight: '1.7' }],
                // Aksen label monospace kecil bergaya terminal.
                label: ['0.75rem', { lineHeight: '1.1', letterSpacing: '0.08em' }],
            },
            colors: {
                // Aksen merek tunggal yang tenang agar tetap elegan & profesional.
                brand: {
                    DEFAULT: '#38bdf8',
                    soft: '#7dd3fc',
                },
            },
            minWidth: {
                // Touch target minimum 44px (Requirement 9.3).
                11: '2.75rem',
            },
            minHeight: {
                11: '2.75rem',
            },
        },
    },
    plugins: [],
};
