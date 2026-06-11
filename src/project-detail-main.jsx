/**
 * @file Titik masuk halaman detail proyek (`project-detail.html`).
 * Memasang {@link ProjectDetailPage} ke `#root`.
 */

import React from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import ProjectDetailPage from './pages/ProjectDetailPage.jsx';
import { ThemeProvider } from './hooks/useTheme.js';
import './i18n/index.js';
import './index.css';

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <HelmetProvider>
            <ThemeProvider>
                <ProjectDetailPage />
            </ThemeProvider>
        </HelmetProvider>
    </React.StrictMode>
);
