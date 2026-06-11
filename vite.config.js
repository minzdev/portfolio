import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    // Multi-page: beranda (index.html) dan halaman Proyek (projects.html)
    // dibangun sebagai dua dokumen HTML terpisah (bukan rute SPA).
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                projects: resolve(__dirname, 'projects.html'),
                projectDetail: resolve(__dirname, 'project-detail.html'),
            },
        },
    },
    // Beberapa modul `.js` (mis. `src/hooks/useTheme.js`) memuat JSX. Konfigurasi
    // esbuild di bawah memastikan build produksi (Rollup) mem-parsing JSX pada
    // berkas `.js` di dalam `src`, selaras dengan transformasi dev/test.
    esbuild: {
        loader: 'jsx',
        include: /src\/.*\.jsx?$/,
        exclude: [],
    },
    optimizeDeps: {
        esbuildOptions: {
            loader: { '.js': 'jsx' },
        },
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/test/setup.js',
        css: true,
    },
});
