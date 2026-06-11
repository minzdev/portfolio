/**
 * @file Titik masuk halaman Proyek terpisah (`projects.html`).
 *
 * Memasang {@link ProjectsPage} ke `#root` dengan provider yang sama seperti
 * beranda (`HelmetProvider` + `ThemeProvider` + inisialisasi i18n), namun tanpa
 * router karena ini halaman HTML mandiri (multi-page), bukan rute SPA.
 */

import React from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import ProjectsPage from './pages/ProjectsPage.jsx';
import { ThemeProvider } from './hooks/useTheme.js';
import './i18n/index.js';
import './index.css';

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <HelmetProvider>
            <ThemeProvider>
                <ProjectsPage />
            </ThemeProvider>
        </HelmetProvider>
    </React.StrictMode>
);
