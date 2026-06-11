/**
 * @file Pemetaan nama keahlian → ikon berwarna.
 *
 * Menggunakan `react-icons` (Simple Icons) untuk logo merek berwarna pada
 * keahlian teknis, dan `lucide-react` sebagai fallback netral untuk keahlian
 * non-merek (mis. keuangan, perpajakan, administrasi). Fungsi
 * {@link getSkillIcon} mengembalikan elemen ikon siap render beserta warna
 * merek bila tersedia. Mendukung nama versi Indonesia maupun Inggris.
 */

import {
    SiJavascript,
    SiReact,
    SiNodedotjs,
    SiLaravel,
    SiMysql,
    SiFirebase,
    SiTailwindcss,
    SiFramer,
    SiExpo,
    SiCanva,
} from 'react-icons/si';
import {
    Network,
    Cpu,
    HardDrive,
    Calculator,
    FileText,
    ReceiptText,
    Landmark,
    Banknote,
    ShieldCheck,
    FileSpreadsheet,
    Wrench,
    Clapperboard,
    Code2,
} from 'lucide-react';

/**
 * Pemetaan nama keahlian (persis seperti pada `data/cv.js`/`cv.en.js`) ke
 * konfigurasi ikon. `Icon` adalah komponen ikon; `color` (opsional) memberi
 * warna merek.
 * @type {Record<string, { Icon: import('react').ComponentType<{ size?: number, className?: string }>, color?: string }>}
 */
const SKILL_ICONS = {
    // Software Engineering
    'JavaScript (ES6+)': { Icon: SiJavascript, color: '#F7DF1E' },
    'React.js': { Icon: SiReact, color: '#61DAFB' },
    'Node.js': { Icon: SiNodedotjs, color: '#5FA04E' },
    Laravel: { Icon: SiLaravel, color: '#FF2D20' },
    MySQL: { Icon: SiMysql, color: '#4479A1' },
    Firebase: { Icon: SiFirebase, color: '#FFCA28' },
    'Tailwind CSS': { Icon: SiTailwindcss, color: '#06B6D4' },
    'Framer Motion': { Icon: SiFramer, color: '#0055FF' },
    'RESTful API': { Icon: Network, color: '#38BDF8' },

    // Mobile Development
    'Android Development (React Native)': { Icon: SiReact, color: '#61DAFB' },
    Expo: { Icon: SiExpo, color: '#1C1E24' },

    // Finance & Taxation (ID + EN)
    Accounting: { Icon: Calculator, color: '#22C55E' },
    'Manajemen e-Faktur': { Icon: FileSpreadsheet, color: '#16A34A' },
    'e-Faktur Management': { Icon: FileSpreadsheet, color: '#16A34A' },
    'e-Bupot': { Icon: ReceiptText, color: '#16A34A' },
    Coretax: { Icon: Landmark, color: '#0EA5E9' },

    // Tax Compliance (ID + EN)
    'Pelaporan PPh 21': { Icon: FileText, color: '#F59E0B' },
    'PPh 21 Reporting': { Icon: FileText, color: '#F59E0B' },
    'Pelaporan PPh 23': { Icon: FileText, color: '#F59E0B' },
    'PPh 23 Reporting': { Icon: FileText, color: '#F59E0B' },
    'Pelaporan PPN': { Icon: ReceiptText, color: '#D97706' },
    'VAT (PPN) Reporting': { Icon: ReceiptText, color: '#D97706' },
    'Pelaporan PPh Badan': { Icon: Landmark, color: '#D97706' },
    'Corporate Income Tax Reporting': { Icon: Landmark, color: '#D97706' },

    // Corporate Administration (ID + EN)
    'Cash Management (Internet Banking)': { Icon: Banknote, color: '#8B5CF6' },
    'Administrasi BPJS Kesehatan': { Icon: ShieldCheck, color: '#8B5CF6' },
    'BPJS Kesehatan Administration': { Icon: ShieldCheck, color: '#8B5CF6' },
    'Administrasi BPJS Ketenagakerjaan': { Icon: ShieldCheck, color: '#7C3AED' },
    'BPJS Ketenagakerjaan Administration': { Icon: ShieldCheck, color: '#7C3AED' },

    // Productivity & Creative
    'Microsoft Office (Excel, Word, Power Point)': { Icon: FileSpreadsheet, color: '#D83B01' },
    'Creative Design (Canva)': { Icon: SiCanva, color: '#00C4CC' },
    'Video Editing (CapCut)': { Icon: Clapperboard, color: '#EC4899' },

    // Hardware & Systems (ID + EN)
    'Perakitan Komputer (PC Assembling)': { Icon: Cpu, color: '#64748B' },
    'PC Assembling': { Icon: Cpu, color: '#64748B' },
    'Troubleshooting Perangkat Keras': { Icon: Wrench, color: '#64748B' },
    'Hardware Troubleshooting': { Icon: Wrench, color: '#64748B' },
    'Konfigurasi Jaringan/OS': { Icon: HardDrive, color: '#0EA5E9' },
    'Network/OS Configuration': { Icon: HardDrive, color: '#0EA5E9' },
};

/**
 * Mengembalikan elemen ikon berwarna untuk sebuah nama keahlian. Bila nama
 * tidak dikenal, mengembalikan ikon fallback netral ({@link Code2}).
 *
 * @param {string} name Nama keahlian.
 * @param {number} [size=16] Ukuran ikon dalam piksel.
 * @returns {import('react').ReactElement} Elemen ikon `aria-hidden`.
 */
export function getSkillIcon(name, size = 16) {
    const entry = SKILL_ICONS[name] ?? { Icon: Code2, color: undefined };
    const { Icon, color } = entry;
    return (
        <Icon
            size={size}
            aria-hidden="true"
            className="shrink-0"
            style={color ? { color } : undefined}
        />
    );
}
