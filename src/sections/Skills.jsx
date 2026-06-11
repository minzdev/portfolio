/**
 * @file `Skills` — Skills_Section daftar keahlian yang dikelompokkan per kategori.
 *
 * Bagian ini merender `<section id="skills">` melalui wrapper {@link Section}
 * (menyusun `<h2>` "Keahlian" beserta animasi masuk berbasis Viewport — Req
 * 4.5, 12.1). Konten:
 * - Keahlian dikelompokkan berdasarkan kategori via
 *   {@link groupSkillsByCategory} mengikuti urutan kanonik `SKILL_CATEGORIES`
 *   (Req 5.1).
 * - Tiap grup dirender sebagai kartu kategori dengan nama kategori sebagai
 *   subheading `<h3>`, dan keahlian di bawahnya ditampilkan sebagai chip/badge
 *   (Req 5.2).
 * - Grid kartu responsif (1 → 2 → 3 kolom) dengan gaya konsisten di mode gelap.
 * - Tiap grup memakai {@link AnimatedItem} dengan `inView` agar dianimasikan
 *   saat memasuki Viewport (Req 4.5).
 *
 * Seluruh konten berasal dari `skills` dan `SKILL_CATEGORIES` pada
 * `src/data/cv.js` sebagai sumber tunggal kebenaran.
 */

import { useTranslation } from 'react-i18next';
import Section from '../components/Section.jsx';
import AnimatedItem from '../components/AnimatedItem.jsx';
import { useCV } from '../hooks/useCV.js';
import { groupSkillsByCategory } from '../lib/skills.js';
import { getSkillIcon } from '../lib/skillIcons.jsx';

/**
 * Skills_Section: keahlian dikelompokkan per kategori dalam grid kartu responsif.
 *
 * @returns {import('react').ReactElement} Elemen `<section>` Skills teranimasi.
 */
export default function Skills() {
    const { t } = useTranslation();
    const { skills, SKILL_CATEGORIES } = useCV();
    // Kelompokkan keahlian mengikuti urutan kanonik kategori (Req 5.1, 5.2).
    const groups = groupSkillsByCategory(skills, SKILL_CATEGORIES);

    return (
        <Section id="skills" title={t('section.skillsTitle')} eyebrow="// stack">
            <div className="mt-10 space-y-8">
                {groups.map((group) => (
                    <AnimatedItem
                        key={group.category}
                        as="article"
                        inView
                    >
                        {/* Nama kategori sebagai subheading mono (Req 5.1). */}
                        <h3 className="mono-label mb-3 text-zinc-500 dark:text-zinc-400">
                            {group.category}
                        </h3>

                        {/* Keahlian di bawah kategori sebagai chip/badge (Req 5.2). */}
                        <ul className="flex flex-wrap gap-2">
                            {group.items.map((skill) => (
                                <li
                                    key={skill.name}
                                    className="inline-flex items-center gap-2 rounded-md border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-700"
                                >
                                    {getSkillIcon(skill.name, 16)}
                                    {skill.name}
                                </li>
                            ))}
                        </ul>
                    </AnimatedItem>
                ))}
            </div>
        </Section>
    );
}
