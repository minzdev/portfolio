/**
 * @file Hook `useActiveSection` untuk melacak bagian (section) aktif saat scroll.
 *
 * Menghitung posisi atas setiap bagian relatif terhadap dokumen, lalu
 * mendelegasikan penentuan bagian aktif ke fungsi murni `getActiveSection`
 * (dengan memperhitungkan offset sticky navbar) sehingga Navigation_Bar dapat
 * menyorot tautan bagian yang sedang dilihat pengguna (Req 1.4).
 */

import { useEffect, useState } from 'react';
import { getActiveSection } from '../lib/sections.js';

/**
 * Tinggi default sticky navbar (px), dipakai sebagai offset ambang deteksi
 * bagian aktif bila pemanggil tidak memberikan nilai khusus.
 *
 * @type {number}
 */
const DEFAULT_NAVBAR_OFFSET = 80;

/**
 * Membangun daftar posisi `{ id, top }` untuk tiap id bagian dengan membaca
 * elemen DOM terkait. `top` dihitung relatif terhadap dokumen, yaitu
 * `getBoundingClientRect().top + window.scrollY`. Id yang elemennya tidak
 * ditemukan akan diabaikan.
 *
 * @param {string[]} sectionIds Daftar id bagian (urutan dokumen).
 * @returns {{ id: string, top: number }[]} Posisi tiap bagian yang ditemukan.
 */
function computePositions(sectionIds) {
    const positions = [];
    for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
            positions.push({ id, top: el.getBoundingClientRect().top + window.scrollY });
        }
    }
    return positions;
}

/**
 * Hook yang mengembalikan id bagian yang sedang aktif berdasarkan posisi gulir.
 *
 * Memasang listener `scroll` (passive) dan `resize`, dengan throttling melalui
 * `requestAnimationFrame` agar hemat kinerja. Nilai awal dihitung sekali saat
 * mount. Aman pada lingkungan tanpa `window` (SSR/jsdom): mengembalikan id
 * pertama bila tersedia tanpa menyentuh API peramban.
 *
 * @param {string[]} sectionIds Daftar id bagian yang dipantau (urutan dokumen).
 * @param {number} [offset=DEFAULT_NAVBAR_OFFSET] Offset ambang (tinggi navbar) (px).
 * @returns {string} Id bagian aktif, atau `''` bila tidak ada bagian.
 */
export function useActiveSection(sectionIds, offset = DEFAULT_NAVBAR_OFFSET) {
    const ids = Array.isArray(sectionIds) ? sectionIds : [];
    const [activeId, setActiveId] = useState(() => (ids.length > 0 ? ids[0] : ''));

    // Kunci stabil agar efek hanya dijalankan ulang saat daftar id berubah.
    const idsKey = ids.join(',');

    useEffect(() => {
        if (typeof window === 'undefined') {
            return undefined;
        }

        const currentIds = idsKey.length > 0 ? idsKey.split(',') : [];

        const update = () => {
            const positions = computePositions(currentIds);
            setActiveId(getActiveSection(positions, window.scrollY, offset));
        };

        let frameId = null;
        const onScrollOrResize = () => {
            if (frameId !== null) {
                return;
            }
            frameId = window.requestAnimationFrame(() => {
                frameId = null;
                update();
            });
        };

        // Hitung nilai awal saat mount.
        update();

        window.addEventListener('scroll', onScrollOrResize, { passive: true });
        window.addEventListener('resize', onScrollOrResize);

        return () => {
            if (frameId !== null) {
                window.cancelAnimationFrame(frameId);
            }
            window.removeEventListener('scroll', onScrollOrResize);
            window.removeEventListener('resize', onScrollOrResize);
        };
    }, [idsKey, offset]);

    return activeId;
}
