/**
 * @file `App` — akar halaman beranda.
 *
 * Membungkus {@link HomePage} dengan {@link ErrorBoundary} tingkat atas agar
 * galat render tak terduga tidak menghasilkan layar kosong. Halaman Proyek
 * berdiri sendiri sebagai halaman HTML terpisah (`projects.html`), bukan rute
 * SPA, sehingga navigasi antar keduanya berupa pemuatan halaman penuh.
 */

import ErrorBoundary from './components/ErrorBoundary.jsx';
import HomePage from './pages/HomePage.jsx';

/**
 * Komponen aplikasi akar (beranda).
 *
 * @returns {import('react').ReactElement} Pohon UI beranda.
 */
export default function App() {
    return (
        <ErrorBoundary>
            <HomePage />
        </ErrorBoundary>
    );
}
