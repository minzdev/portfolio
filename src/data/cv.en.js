/**
 * @file Konten CV versi Bahasa Inggris.
 *
 * Mirror dari `src/data/cv.js` dengan teks dialihbahasakan ke Inggris. Struktur
 * objek (kunci, jumlah item, kategori, id) DIBUAT IDENTIK dengan versi Indonesia
 * agar komponen tampilan dan logika (pengurutan, pengelompokan) bekerja sama
 * persis. `SKILL_CATEGORIES` didefinisikan ulang secara lokal (nilai identik)
 * agar modul ini mandiri dan tidak bergantung pada `cv.js` (penting agar mock
 * pada test tidak terpengaruh).
 */

/**
 * Urutan kanonik kategori keahlian (identik dengan `cv.js`).
 * @type {string[]}
 */
export const SKILL_CATEGORIES = [
    'Software Engineering',
    'Mobile Development',
    'Finance & Taxation',
    'Tax Compliance',
    'Corporate Administration',
    'Productivity & Creative',
    'Hardware & Systems',
];

/** Profil profesional (EN). */
export const profile = {
    name: 'Suparman',
    role: 'Web Developer',
    headline: 'Junior Web Developer & Program Analyst',
    tagline:
        'Building clean, responsive, and user-oriented web applications — from front end to back end.',
    summary:
        'I am a Web Developer with a Bachelor’s degree in Information Technology. ' +
        'Certified as a Junior Web Developer and Program Analyst, and an alumnus of the ' +
        'DBS Foundation Coding Camp. I combine front-end and back-end development skills ' +
        'with experience in finance, taxation, and hardware/system technical support. ' +
        'Focused on building clean, responsive, and user-oriented web applications.',
    location: 'South Jakarta, DKI Jakarta',
    githubUsername: 'minzdev',
};

/** Pengalaman kerja (EN). Id & tanggal identik dengan versi id. */
export const experiences = [
    {
        id: 'dicoding-dbs',
        title: 'Back End & Front End Developer',
        company: 'Dicoding x DBS Foundation',
        startDate: '2025-02',
        endDate: '2025-07',
        period: 'Feb 2025 - Jul 2025',
        responsibilities: [
            'Built front-end web applications using modern JavaScript and reusable component practices.',
            'Developed RESTful back-end services with Node.js including validation and error handling.',
            'Applied clean code principles, Git version control, and agile team collaboration.',
            'Completed a series of projects and submissions as part of the DBS Foundation Coding Camp.',
        ],
    },
    {
        id: 'magati-unggul',
        title: 'Finance Staff & IT Support',
        company: 'PT. Magati Unggul',
        startDate: '2021-01',
        endDate: '2024-08',
        period: '2021 - Aug 2024',
        responsibilities: [
            'Managed financial bookkeeping, reconciliation, and corporate tax reporting.',
            'Handled tax administration and compliance in line with applicable regulations.',
            'Provided IT support for office operations, including devices and networks.',
            'Documented financial procedures and assisted with internal audits.',
        ],
    },
    {
        id: 'salafindo',
        title: 'Hardware & System Engineer',
        company: 'CV. Salafindo',
        startDate: '2018-01',
        endDate: '2018-05',
        period: '2018 - May 2018',
        responsibilities: [
            'Installed, configured, and maintained computer hardware and networks.',
            'Diagnosed and resolved hardware and operating system issues.',
            'Configured network infrastructure and ensured system availability.',
            'Provided technical support to users and produced maintenance documentation.',
        ],
    },
];

/** Keahlian (EN). Nama dialihbahasakan; kategori tetap dari SKILL_CATEGORIES. */
export const skills = [
    { name: 'JavaScript (ES6+)', category: 'Software Engineering' },
    { name: 'React.js', category: 'Software Engineering' },
    { name: 'Node.js', category: 'Software Engineering' },
    { name: 'Laravel', category: 'Software Engineering' },
    { name: 'MySQL', category: 'Software Engineering' },
    { name: 'Firebase', category: 'Software Engineering' },
    { name: 'Tailwind CSS', category: 'Software Engineering' },
    { name: 'Framer Motion', category: 'Software Engineering' },
    { name: 'RESTful API', category: 'Software Engineering' },

    { name: 'Android Development (React Native)', category: 'Mobile Development' },
    { name: 'Expo', category: 'Mobile Development' },

    { name: 'Accounting', category: 'Finance & Taxation' },
    { name: 'e-Faktur Management', category: 'Finance & Taxation' },
    { name: 'e-Bupot', category: 'Finance & Taxation' },
    { name: 'Coretax', category: 'Finance & Taxation' },

    { name: 'PPh 21 Reporting', category: 'Tax Compliance' },
    { name: 'PPh 23 Reporting', category: 'Tax Compliance' },
    { name: 'VAT (PPN) Reporting', category: 'Tax Compliance' },
    { name: 'Corporate Income Tax Reporting', category: 'Tax Compliance' },

    { name: 'Cash Management (Internet Banking)', category: 'Corporate Administration' },
    { name: 'BPJS Kesehatan Administration', category: 'Corporate Administration' },
    { name: 'BPJS Ketenagakerjaan Administration', category: 'Corporate Administration' },

    { name: 'Microsoft Office (Excel, Word, Power Point)', category: 'Productivity & Creative' },
    { name: 'Creative Design (Canva)', category: 'Productivity & Creative' },
    { name: 'Video Editing (CapCut)', category: 'Productivity & Creative' },

    { name: 'PC Assembling', category: 'Hardware & Systems' },
    { name: 'Hardware Troubleshooting', category: 'Hardware & Systems' },
    { name: 'Network/OS Configuration', category: 'Hardware & Systems' },
];

/** Pendidikan (EN). */
export const education = [
    {
        institution: 'Bina Sarana Informatika University',
        program: 'B.Sc. in Information Technology',
        period: '2020 - 2024',
        startDate: '2020-09',
    },
    {
        institution: 'SMK Pembangunan Cibadak (Vocational High School)',
        program: 'Computer & Network Engineering',
        period: '2014 - 2017',
        startDate: '2014-07',
    },
];

/** Sertifikasi (EN). */
export const certifications = [
    {
        name: 'Front End and Back End Coding Camp 2025',
        issuer: 'Dicoding Indonesia and DBS Foundation',
        year: '2025',
        url: '',
    },
    {
        name: 'BNSP Program Analyst Certification',
        issuer: 'Digital Technology Professional Certification Body',
        year: '2024',
        url: 'https://drive.google.com/file/d/1HPhz9RhHWDFhix0ExjvF43ERYZ8Pv463/view?usp=sharing',
    },
    {
        name: 'BNSP Junior Web Developer Certification',
        issuer: 'Digital Technology Professional Certification Body',
        year: '2024',
        url: 'https://drive.google.com/file/d/1qtF2HN8WO5ItG_TK8xrdhA8qB13yl0YP/view?usp=sharing',
    },
    {
        name: 'Junior Web Developer Training',
        issuer: 'BPSDMP KOMINFO Jakarta',
        year: '2024',
        url: '',
    },
    {
        name: 'IT Bootcamp Software Development',
        issuer: 'Bina Sarana Informatika University',
        year: '2023',
        url: '',
    },
    {
        name: 'Junior Network Administrator Training',
        issuer: 'BPPTIK KOMINFO',
        year: '2021',
        url: '',
    },
];

/** Proyek unggulan (EN). */
export const projects = [
    {
        slug: 'giarva-ecommerce',
        name: 'Giarva E-Commerce - Goat Milk Online Store',
        description:
            'A full-stack e-commerce website for selling Giarva goat milk products with Midtrans payment gateway integration, Firebase authentication, and real-time product management.',
        year: '2024',
        tech: ['React', 'Node.js', 'Tailwind CSS', 'Firebase', 'Midtrans Payment Gateway'],
        category: 'Web Development',

        liveUrl: 'https://susugiarva.netlify.app/',
        images: [
            '/giarva.png',
            '/giarva1.png',
        ],
        ownership: 'Solo project',
        role: 'Full Stack Developer',
        team: '',
        responsibilities: [
            'Designed and developed a full-stack e-commerce from scratch with React for front end and Node.js for back end.',
            'Implemented user authentication and authorization using Firebase Authentication.',
            'Integrated Midtrans Payment Gateway for secure and automated payment processing.',
            'Built a real-time product management system using Firebase Firestore.',
            'Designed responsive, user-friendly UI/UX with Tailwind CSS for both desktop and mobile.',
            'Implemented shopping cart, checkout, and order tracking features.',
        ],
        impact: [
            'Enabled 24/7 online sales of Giarva products with automated payment processing.',
            'Expanded market reach from offline to nationwide through a digital platform.',
            'Simplified the transaction process for customers with fast and secure checkout.',
            'Reduced manual operational burden with an integrated order management system.',
        ],
    },
    {
        slug: 'company-profile-gedhong',
        name: 'Company Profile PT Gedhong Kencono Mulyo',
        description:
            'A modern and responsive company profile website for PT Gedhong Kencono Mulyo with a professional look, smooth animations, and SEO optimization.',
        year: '2024',
        tech: ['React', 'Tailwind CSS', 'Framer Motion'],
        category: 'Web Development',
        url: 'https://gedhongkencono.netlify.app/',
        liveUrl: 'https://gedhongkencono.netlify.app/',
        images: ['/gedhong.png', '/gedhong1.png', '/gedhong2.png'],
        ownership: 'Solo project',
        role: 'Full Stack Developer',
        team: '',
        responsibilities: [
            'Designed and developed the UI/UX of the company profile from scratch using React and Tailwind CSS.',
            'Implemented smooth animations with Framer Motion to enhance user experience.',
            'Optimized performance and SEO for better discoverability on search engines.',
            'Deployed to Netlify with automated CI/CD configuration.',
        ],
        impact: [
            'Improved the company\'s professional credibility and online presence.',
            'Made it easier for potential clients to find product and service information.',
            'Delivered a fast-loading, mobile-friendly website across all devices.',
        ],
    },
    {
        slug: 'company-profile-magati',
        name: 'Company Profile PT Magati Unggul',
        description:
            'A back-end service for a notes app with authentication, data validation, and clean error handling.',
        year: '2024',
        tech: ['React', 'Tailwind CSS', 'Vite', 'Spredsheets'],
        category: 'Back End Development',
        liveUrl: 'https://magatiunggul.netlify.app/',
        images: '/magati.png',
        ownership: 'Solo project',
        role: 'Back End Developer',
        team: '',
        responsibilities: [
            'Analyzed business needs and designed the website s information architecture based on PT Magati Unggul  company profile.',
            'Developed the UI/UX from scratch using React and Tailwind CSS with a mobile-first approach for comfortable accessibility across all devices.',
            'Integrated smooth Framer Motion-based animations on the hero, product, and contact sections to enhance the professional impression.',
            'Optimized loading performance with lazy image loading, code splitting, and Vite configuration for efficient production builds.',
            'Implemented a functional contact form with client-side validation and email service integration.',
            'Deployed the website to a hosting platform with a custom domain and SSL configuration.',
        ],
        impact: [
            "Improving the credibility and professional image of PT Magati Unggul among potential business partners and clients.",

            "Making it easier for potential partners to find information about products, services, and how to contact the company online.",

            "Reducing reliance on social media as the company's sole digital promotional channel.",

            "Producing a fast-loading website (high Lighthouse score) and search engine-friendly.",
        ],
    },
    
   
];

/** Kontak (EN). Nilai teknis (email/telepon/sosial) identik dengan versi id. */
export const contact = {
    email: 'suparman0921@gmail.com',
    phone: '+62 857 9752 2591',
    phoneHref: '+6285797522591',
    socials: [
        {
            platform: 'github',
            label: 'GitHub',
            url: 'https://github.com/minzdev',
            icon: 'Github',
        },
        {
            platform: 'linkedin',
            label: 'LinkedIn',
            url: 'https://www.linkedin.com/in/suparman0921',
            icon: 'Linkedin',
        },
    ],
};
