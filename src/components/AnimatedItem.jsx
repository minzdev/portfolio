/**
 * @file `AnimatedItem` — wrapper `motion.*` yang menghormati preferensi reduksi gerak.
 *
 * Komponen ini membungkus elemen Framer Motion (`motion.div` secara default) dan
 * menerapkan props gerak yang dibangun oleh {@link getMotionProps} berdasarkan
 * varian terpilih (mis. {@link fadeUp}). Komponen membaca `useReducedMotion()`
 * dari Framer Motion; ketika reduksi gerak aktif, `getMotionProps` menyamakan
 * state `initial` dengan `animate` sehingga tidak ada translasi/gerak — elemen
 * langsung berada pada state akhir (Req 12.1, 12.2).
 *
 * Mendukung dua mode pemicu:
 * - Default (`inView={false}`): animasi masuk berjalan saat mount via
 *   `initial`/`animate`.
 * - `inView` (`inView={true}`): animasi berjalan saat elemen memasuki Viewport
 *   via `whileInView` dengan `viewport={{ once: true, amount: 0.2 }}` (Req 4.5).
 *   Saat reduksi gerak aktif, elemen tetap langsung tampil pada state akhir.
 */

import { motion, useReducedMotion } from 'framer-motion';
import { fadeUp, getMotionProps, VISIBLE } from '../lib/motion.js';

/**
 * Wrapper animasi serbaguna di atas komponen `motion.*`.
 *
 * @param {object} props Properti komponen.
 * @param {object} [props.variant=fadeUp] Varian Framer Motion (berisi state
 *   `hidden`/`visible`). Default ke {@link fadeUp}.
 * @param {keyof typeof motion} [props.as='div'] Nama elemen `motion.*` yang
 *   dirender (mis. `'div'`, `'ul'`, `'li'`, `'section'`). Default `'div'`.
 * @param {boolean} [props.inView=false] Bila `true`, animasi dipicu saat elemen
 *   memasuki Viewport (`whileInView`) alih-alih saat mount.
 * @param {string} [props.className] Kelas CSS opsional.
 * @param {import('react').ReactNode} [props.children] Konten anak.
 * @returns {import('react').ReactElement} Elemen `motion.*` yang dianimasikan.
 */
export default function AnimatedItem({
    variant = fadeUp,
    as = 'div',
    inView = false,
    className,
    children,
    ...rest
}) {
    const prefersReducedMotion = useReducedMotion();
    const motionProps = getMotionProps(variant, prefersReducedMotion);

    // Pilih elemen motion yang sesuai; fallback ke `motion.div` bila tag tak dikenal.
    const MotionTag = motion[as] ?? motion.div;

    if (inView) {
        // Mode Viewport: gunakan `whileInView`. Saat reduksi gerak aktif,
        // `motionProps.initial` sudah bernilai VISIBLE sehingga tidak ada gerak.
        const { initial, variants } = motionProps;
        return (
            <MotionTag
                className={className}
                variants={variants}
                initial={initial}
                whileInView={VISIBLE}
                viewport={{ once: true, amount: 0.2 }}
                {...rest}
            >
                {children}
            </MotionTag>
        );
    }

    return (
        <MotionTag className={className} {...motionProps} {...rest}>
            {children}
        </MotionTag>
    );
}
