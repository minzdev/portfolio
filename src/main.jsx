/**
 * @file Titik masuk aplikasi (entry point).
 *
 * Memasang React ke elemen `#root` dan membungkus `App` dengan provider yang
 * diperlukan lintas aplikasi:
 * - `HelmetProvider` (`react-helmet-async`) agar {@link SEO} dapat menyuntik
 *   metadata `<head>` (Req 11.1).
 * - `ThemeProvider` (`src/hooks/useTheme.js`) untuk state tema terang/gelap
 *   yang dikonsumsi `ThemeToggle` dan komponen lain (Req 10.x).
 */

import React from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.jsx';
import { ThemeProvider } from './hooks/useTheme.js';
import './i18n/index.js';
import './index.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>
);
