/**
 * @file `Section` — wrapper umum untuk setiap bagian halaman.
 *
 * Komponen ini merender elemen `<section>` semantik dengan atribut `id` dan
 * `aria-labelledby` yang menunjuk ke heading bagian, lalu membungkus konten
 * dengan animasi masuk berbasis Viewport (`whileInView`) melalui
 * {@link AnimatedItem} dengan `inView` (Req 4.5, 12.1).
 *
 * Gaya visual mengikuti referensi desain "terminal/elegan": konten berada di
 * dalam kolom terpusat ber-rail (`.content-rail`), dengan heading bold dan
 * eyebrow monospace opsional. Struktur heading dijaga semantik: default `<h2>`;
 * Hero memakai `<h1>` sehingga tepat satu `<h1>` per halaman (Req 11.4).
 */

import AnimatedItem from './AnimatedItem.jsx';
import { fadeUp } from '../lib/motion.js';

/**
 * Wrapper bagian halaman yang semantik dan teranimasi.
 *
 * @param {object} props Properti komponen.
 * @param {string} props.id Identifier unik bagian (target anchor `#id`). Wajib.
 * @param {string} [props.title] Teks heading bagian.
 * @param {string} [props.eyebrow] Label monospace kecil di atas heading.
 * @param {'h1'|'h2'|'h3'|'h4'|'h5'|'h6'} [props.headingLevel='h2'] Level heading.
 * @param {string} [props.className] Kelas CSS tambahan untuk `<section>`.
 * @param {string} [props.headingClassName] Kelas CSS tambahan untuk heading.
 * @param {import('react').ReactNode} [props.children] Konten bagian.
 * @returns {import('react').ReactElement} Elemen `<section>` yang teranimasi.
 */
export default function Section({
    id,
    title,
    eyebrow,
    headingLevel = 'h2',
    className = '',
    headingClassName = '',
    children,
    ...rest
}) {
    const headingId = `${id}-heading`;
    const Heading = headingLevel;
    const hasTitle = typeof title === 'string' && title.length > 0;

    const labelProps = hasTitle
        ? { 'aria-labelledby': headingId }
        : { 'aria-label': id };

    return (
        <section
            id={id}
            // `scroll-mt-20` memberi offset agar heading tidak tertutup navbar
            // sticky saat gulir ke anchor (Req 1.2/1.3).
            className={`scroll-mt-20 py-16 sm:py-20 ${className}`.trim()}
            {...labelProps}
            {...rest}
        >
            <div className="content-rail">
                <AnimatedItem variant={fadeUp} inView>
                    {eyebrow ? (
                        <p className="mono-label mb-3">{eyebrow}</p>
                    ) : null}
                    {hasTitle ? (
                        <Heading
                            id={headingId}
                            className={`text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-4xl ${headingClassName}`.trim()}
                        >
                            {title}
                        </Heading>
                    ) : null}
                    {children}
                </AnimatedItem>
            </div>
        </section>
    );
}
