/**
 * @file `GitHubActivity` — menampilkan kalender kontribusi GitHub.
 *
 * Bagian ini merender `<section id="activity">` melalui wrapper {@link Section}
 * dan menampilkan grafik kontribusi GitHub menggunakan `react-github-calendar`.
 * Username diambil dari `profile.githubUsername` pada data CV. Warna grafik
 * mengikuti tema (terang/gelap) via {@link useTheme}.
 *
 * Bila `githubUsername` tidak tersedia, bagian ini tidak dirender.
 */

import { GitHubCalendar } from 'react-github-calendar';
import { useTranslation } from 'react-i18next';
import Section from '../components/Section.jsx';
import { useCV } from '../hooks/useCV.js';
import { useTheme } from '../hooks/useTheme.js';

/** Skema warna kalender untuk mode terang (5 tingkat intensitas). */
const LIGHT_THEME = ['#e4e4e7', '#bae6fd', '#7dd3fc', '#38bdf8', '#0284c7'];

/** Skema warna kalender untuk mode gelap (5 tingkat intensitas). */
const DARK_THEME = ['#27272a', '#0c4a6e', '#0369a1', '#0ea5e9', '#7dd3fc'];

/**
 * GitHub_Activity: kalender kontribusi GitHub yang menyesuaikan tema.
 *
 * @returns {import('react').ReactElement|null} Elemen `<section>` atau null.
 */
export default function GitHubActivity() {
    const { t } = useTranslation();
    const { profile } = useCV();
    const { theme } = useTheme();
    const username = profile.githubUsername;

    if (!username) {
        return null;
    }

    return (
        <Section id="activity" title={t('section.activityTitle')} eyebrow="// activity">
            <div className="mt-8 overflow-x-auto rounded-lg border border-zinc-200 bg-zinc-50/60 p-5 dark:border-zinc-800 dark:bg-zinc-900/40 sm:p-6">
                <GitHubCalendar
                    username={username}
                    colorScheme={theme === 'dark' ? 'dark' : 'light'}
                    theme={{ light: LIGHT_THEME, dark: DARK_THEME }}
                    fontSize={12}
                    blockSize={11}
                    blockMargin={4}
                />
            </div>
        </Section>
    );
}
