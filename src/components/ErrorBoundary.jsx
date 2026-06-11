/**
 * @file `ErrorBoundary` — batas galat (error boundary) tingkat atas aplikasi.
 *
 * React error boundary HARUS berupa komponen kelas karena memanfaatkan metode
 * daur hidup `static getDerivedStateFromError` dan `componentDidCatch`. Komponen
 * ini menangkap galat render yang tidak tertangani pada pohon anak, lalu
 * menampilkan antarmuka fallback yang ramah dalam Bahasa Indonesia alih-alih
 * layar kosong, sehingga pengguna tetap memperoleh konteks dan jalan keluar
 * (memuat ulang halaman).
 *
 * Aksesibilitas: wadah fallback memakai `role="alert"` agar galat diumumkan
 * oleh pembaca layar, dan tombol muat ulang memiliki cincin fokus `focus-visible`.
 */

import { Component } from 'react';

/**
 * Batas galat yang membungkus konten aplikasi. Bila terjadi galat saat render,
 * menampilkan pesan ramah beserta tombol untuk memuat ulang halaman.
 *
 * @extends {Component<{ children: import('react').ReactNode }, { hasError: boolean }>}
 */
export default class ErrorBoundary extends Component {
    /**
     * @param {{ children: import('react').ReactNode }} props Properti komponen.
     */
    constructor(props) {
        super(props);
        /** @type {{ hasError: boolean }} */
        this.state = { hasError: false };
        this.handleReload = this.handleReload.bind(this);
    }

    /**
     * Memperbarui state agar render berikutnya menampilkan UI fallback.
     *
     * @param {unknown} _error Galat yang dilempar saat render.
     * @returns {{ hasError: boolean }} State baru.
     */
    static getDerivedStateFromError(_error) {
        return { hasError: true };
    }

    /**
     * Mencatat detail galat untuk keperluan diagnosis pada konsol.
     *
     * @param {Error} error Galat yang ditangkap.
     * @param {import('react').ErrorInfo} errorInfo Informasi komponen.
     * @returns {void}
     */
    componentDidCatch(error, errorInfo) {
        // eslint-disable-next-line no-console
        console.error('ErrorBoundary menangkap galat render:', error, errorInfo);
    }

    /**
     * Memuat ulang halaman untuk memulihkan aplikasi dari kondisi galat.
     *
     * @returns {void}
     */
    handleReload() {
        if (typeof window !== 'undefined') {
            window.location.reload();
        }
    }

    /**
     * @returns {import('react').ReactNode} UI fallback bila galat, atau anak.
     */
    render() {
        if (this.state.hasError) {
            return (
                <div
                    role="alert"
                    className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white px-4 text-center dark:bg-zinc-950"
                >
                    <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
                        Terjadi kesalahan
                    </h1>
                    <p className="max-w-md text-zinc-600 dark:text-zinc-400">
                        Maaf, terjadi gangguan saat memuat halaman ini. Silakan
                        muat ulang halaman untuk mencoba lagi.
                    </p>
                    <button
                        type="button"
                        onClick={this.handleReload}
                        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 dark:focus-visible:ring-offset-zinc-950"
                    >
                        Muat ulang halaman
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}
