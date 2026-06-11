/**
 * @file Sumber tunggal kebenaran (single source of truth) untuk seluruh konten CV.
 * Komponen tampilan mengimpor data dari modul ini agar tetap deklaratif dan
 * bebas dari konten yang ditanam langsung (hardcoded).
 */

/**
 * @typedef {Object} Profile
 * @property {string} name      Nama lengkap, mis. "Suparman".
 * @property {string} role      Peran profesional yang ditampilkan.
 * @property {string} headline  Ringkasan singkat untuk Hero.
 * @property {string} tagline   Kalimat singkat khas untuk Hero (berbeda dari summary).
 * @property {string} summary   Ringkasan profil untuk About (Req 3.1).
 * @property {string} location  Lokasi, mis. "Jakarta Selatan, DKI Jakarta" (Req 3.2).
 */

/**
 * @typedef {Object} Experience
 * @property {string} id                  Identifier unik.
 * @property {string} title               Jabatan (Req 4.2).
 * @property {string} company             Nama perusahaan (Req 4.2).
 * @property {string} startDate           ISO "YYYY-MM" untuk pengurutan (Req 4.4).
 * @property {string|null} endDate        "YYYY-MM" atau null = sekarang/present.
 * @property {string} period              Label tampilan, mis. "2024 - Sekarang".
 * @property {string[]} responsibilities  Daftar tanggung jawab (Req 4.3).
 */

/**
 * @typedef {Object} Skill
 * @property {string} name      Nama keahlian.
 * @property {string} category  Harus salah satu dari SKILL_CATEGORIES.
 */

/**
 * @typedef {Object} SkillGroup
 * @property {string} category  Nama kategori.
 * @property {Skill[]} items     Daftar keahlian dalam kategori tersebut.
 */

/**
 * @typedef {Object} Education
 * @property {string} institution  Nama institusi (Req 6.2).
 * @property {string} program      Program studi (Req 6.2).
 * @property {string} period       Label periode (Req 6.2).
 * @property {string} startDate    "YYYY-MM" untuk pengurutan.
 */

/**
 * @typedef {Object} Certification
 * @property {string} name    Nama sertifikasi (Req 7.2).
 * @property {string} issuer  Lembaga penerbit (Req 7.2).
 * @property {string} year    Tahun penerbitan (Req 7.2).
 * @property {string} [url]   Tautan opsional ke validasi/berkas sertifikat.
 */

/**
 * @typedef {Object} Project
 * @property {string} name         Nama proyek.
 * @property {string} description  Ringkasan singkat proyek.
 * @property {string} year         Tahun pengerjaan.
 * @property {string[]} tech       Teknologi/peran utama yang dipakai.
 * @property {string} [url]        Tautan opsional ke repo/demo.
 * @property {string} [liveUrl]    Tautan live demo.
 * @property {string|string[]} [images] Satu atau beberapa URL gambar pratinjau (array untuk slider).
 * @property {string} [category]   Kategori project, mis. "Web Development".
 * @property {string} [ownership]  Kepemilikan: "Solo project" / "Team project".
 * @property {string} [role]       Peran spesifik dalam project.
 * @property {string} [team]       Nama tim/kolaborator.
 * @property {string[]} [responsibilities] Peran/tanggung jawab spesifik (MY ROLE).
 * @property {string[]} [impact]   Dampak/hasil project (IMPACT).
 * @property {string} [slug]       Identifier URL unik, mis. "portfolio-website".
 */

/**
 * @typedef {Object} SocialLink
 * @property {string} platform  Identifier platform, mis. "github".
 * @property {string} label     Label tampilan, mis. "GitHub".
 * @property {string} url       URL profil.
 * @property {string} icon      Nama ikon (lucide-react), mis. "Github".
 */

/**
 * @typedef {Object} Contact
 * @property {string} email           Alamat email (Req 8.1).
 * @property {string} phone           Nomor telepon tampilan, "+62 857 9752 2591" (Req 8.1).
 * @property {string} phoneHref       Nomor untuk tel:, "+6285797522591" (Req 8.3).
 * @property {SocialLink[]} socials   Daftar tautan media sosial.
 */

/**
 * Urutan kanonik kategori keahlian. Urutan ini dipakai oleh
 * `groupSkillsByCategory` agar tata letak Skills_Section stabil (Req 5.1).
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

/**
 * Profil profesional Suparman.
 * @type {Profile}
 */
export const profile = {
    name: 'Suparman',
    role: 'Web Developer',
    headline: 'Junior Web Developer & Analis Program',
    tagline:
        'Membangun aplikasi web yang bersih, responsif, dan berorientasi pada pengguna — dari front end hingga back end.',
    summary:
        'Saya seorang Web Developer dengan latar belakang pendidikan S1 Teknologi Informasi. ' +
        'Bersertifikasi Junior Web Developer dan Analis Program, serta alumni DBS Foundation Coding Camp. ' +
        'Saya menggabungkan kemampuan pengembangan front end dan back end dengan pengalaman di bidang ' +
        'keuangan, perpajakan, serta dukungan teknis perangkat keras dan sistem. Berfokus membangun ' +
        'aplikasi web yang bersih, responsif, dan berorientasi pada kebutuhan pengguna.',
    location: 'Jakarta Selatan, DKI Jakarta',
    githubUsername: 'minzdev',
};

/**
 * Riwayat pengalaman kerja (terbaru ke terlama secara konseptual).
 * Pengurutan final ditangani oleh `sortExperiencesByRecency`.
 * @type {Experience[]}
 */
export const experiences = [
    {
        id: 'dicoding-dbs',
        title: 'Back End & Front End Developer',
        company: 'Dicoding x DBS Foundation',
        startDate: '2024-02',
        endDate: '2024-12',
        period: 'Feb 2024 - Des 2024',
        responsibilities: [
            'Mengembangkan aplikasi web front end menggunakan JavaScript modern dan praktik komponen yang dapat digunakan ulang.',
            'Membangun layanan back end RESTful API dengan Node.js beserta validasi dan penanganan error.',
            'Menerapkan prinsip clean code, version control dengan Git, dan kolaborasi tim secara agile.',
            'Menyelesaikan rangkaian proyek dan submission sebagai bagian dari DBS Foundation Coding Camp.',
        ],
    },
    {
        id: 'magati-unggul',
        title: 'Staff Finance & IT Support',
        company: 'PT. Magati Unggul',
        startDate: '2021-03',
        endDate: '2023-12',
        period: 'Mar 2021 - Des 2023',
        responsibilities: [
            'Mengelola pencatatan keuangan, rekonsiliasi, dan pelaporan pajak perusahaan.',
            'Menangani administrasi perpajakan dan kepatuhan sesuai ketentuan yang berlaku.',
            'Memberikan dukungan IT untuk operasional kantor, termasuk perangkat dan jaringan.',
            'Mendokumentasikan prosedur keuangan dan membantu proses audit internal.',
        ],
    },
    {
        id: 'salafindo',
        title: 'Hardware & System Engineer',
        company: 'CV. Salafindo',
        startDate: '2018-06',
        endDate: '2021-02',
        period: 'Jun 2018 - Feb 2021',
        responsibilities: [
            'Melakukan instalasi, konfigurasi, dan pemeliharaan perangkat keras komputer dan jaringan.',
            'Mendiagnosis dan memperbaiki masalah perangkat keras serta sistem operasi.',
            'Mengonfigurasi infrastruktur jaringan dan memastikan ketersediaan sistem.',
            'Memberikan dukungan teknis kepada pengguna dan menyusun dokumentasi perawatan.',
        ],
    },
];

/**
 * Daftar keahlian. Setiap `category` wajib termasuk dalam SKILL_CATEGORIES.
 * @type {Skill[]}
 */
export const skills = [
    // Software Engineering
    { name: 'JavaScript (ES6+)', category: 'Software Engineering' },
    { name: 'React.js', category: 'Software Engineering' },
    { name: 'Node.js', category: 'Software Engineering' },
    { name: 'Laravel', category: 'Software Engineering' },
    { name: 'MySQL', category: 'Software Engineering' },
    { name: 'Firebase', category: 'Software Engineering' },
    { name: 'Tailwind CSS', category: 'Software Engineering' },
    { name: 'Framer Motion', category: 'Software Engineering' },
    { name: 'RESTful API', category: 'Software Engineering' },

    // Mobile Development
    { name: 'Android Development (React Native)', category: 'Mobile Development' },
    { name: 'Expo', category: 'Mobile Development' },

    // Finance & Taxation
    { name: 'Accounting', category: 'Finance & Taxation' },
    { name: 'Manajemen e-Faktur', category: 'Finance & Taxation' },
    { name: 'e-Bupot', category: 'Finance & Taxation' },
    { name: 'Coretax', category: 'Finance & Taxation' },

    // Tax Compliance
    { name: 'Pelaporan PPh 21', category: 'Tax Compliance' },
    { name: 'Pelaporan PPh 23', category: 'Tax Compliance' },
    { name: 'Pelaporan PPN', category: 'Tax Compliance' },
    { name: 'Pelaporan PPh Badan', category: 'Tax Compliance' },

    // Corporate Administration
    { name: 'Cash Management (Internet Banking)', category: 'Corporate Administration' },
    { name: 'Administrasi BPJS Kesehatan', category: 'Corporate Administration' },
    { name: 'Administrasi BPJS Ketenagakerjaan', category: 'Corporate Administration' },

    // Productivity & Creative
    { name: 'Microsoft Office (Excel, Word, Power Point)', category: 'Productivity & Creative' },
    { name: 'Creative Design (Canva)', category: 'Productivity & Creative' },
    { name: 'Video Editing (CapCut)', category: 'Productivity & Creative' },

    // Hardware & Systems
    { name: 'Perakitan Komputer (PC Assembling)', category: 'Hardware & Systems' },
    { name: 'Troubleshooting Perangkat Keras', category: 'Hardware & Systems' },
    { name: 'Konfigurasi Jaringan/OS', category: 'Hardware & Systems' },
];

/**
 * Riwayat pendidikan formal.
 * @type {Education[]}
 */
export const education = [
    {
        institution: 'Universitas Bina Sarana Informatika',
        program: 'S1 Teknologi Informasi',
        period: '2020 - 2024',
        startDate: '2020-09',
    },
    {
        institution: 'SMK Pembangunan Cibadak',
        program: 'Teknik Komputer dan Jaringan',
        period: '2014 - 2017',
        startDate: '2014-07',
    },
];

/**
 * Pelatihan dan sertifikasi.
 * @type {Certification[]}
 */
export const certifications = [
    {
        name: 'Coding Camp Front End and Back End 2025',
        issuer: 'Dicoding Indonesia dan DBS Foundation',
        year: '2025',
        url: 'https://drive.google.com/file/d/15Tkmx98KdQcuaR_v0Bjuql_Tymjgnz3S/view?usp=sharing',
    },
    {
        name: 'Sertifikasi BNSP Analis Program',
        issuer: 'Lembaga Sertifikasi Profesi Teknologi Digital',
        year: '2024',
        url: 'https://drive.google.com/file/d/1HPhz9RhHWDFhix0ExjvF43ERYZ8Pv463/view?usp=sharing',
    },
    {
        name: 'Sertifikasi BNSP Junior Web Developer',
        issuer: 'Lembaga Sertifikasi Profesi Teknologi Digital',
        year: '2024',
        url: 'https://drive.google.com/file/d/1qtF2HN8WO5ItG_TK8xrdhA8qB13yl0YP/view?usp=sharing',
    },
    {
        name: 'Pelatihan Junior Web Developer',
        issuer: 'BPSDMP KOMINFO Jakarta',
        year: '2024',
        url: 'https://drive.google.com/file/d/1IMe8fYU5RzfQFbbB4-aNMO8oJwY7_Bwc/view?usp=sharing',
    },
    {
        name: 'IT Bootcamp Software Development',
        issuer: 'Universitas Bina Sarana Informatika',
        year: '2023',
        url: 'https://drive.google.com/file/d/1xr_g1fgXQ0uuQwGjU_eeMDZ_3iUx6Q4s/view?usp=sharing',
    },
    {
        name: 'Pelatihan Junior Network Administrator',
        issuer: 'BPPTIK KOMINFO',
        year: '2021',
        url: 'https://drive.google.com/file/d/1UQ9gNPUsHHBLNPKAA7wINU_ohzY644qe/view?usp=sharing',
    },
];

/**
 * Proyek unggulan yang menampilkan hasil kerja nyata.
 * @type {Project[]}
 */
export const projects = [
    {
        slug: 'giarva-ecommerce',
        name: 'Giarva E-Commerce - Toko Online Susu Etawa',
        description:
            'Website e-commerce full-stack untuk penjualan susu etawa Giarva dengan integrasi payment gateway Midtrans, autentikasi Firebase, dan manajemen produk real-time.',
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
            'Merancang dan mengembangkan full-stack e-commerce dari nol dengan React untuk front end dan Node.js untuk back end.',
            'Mengimplementasikan autentikasi dan otorisasi pengguna menggunakan Firebase Authentication.',
            'Mengintegrasikan Midtrans Payment Gateway untuk proses pembayaran yang aman dan otomatis.',
            'Membangun sistem manajemen produk real-time menggunakan Firebase Firestore.',
            'Merancang UI/UX responsif dengan Tailwind CSS yang user-friendly untuk desktop dan mobile.',
            'Mengimplementasikan fitur keranjang belanja, checkout, dan tracking pesanan.',
        ],
        impact: [
            'Memungkinkan penjualan produk Giarva secara online dengan pembayaran otomatis 24/7.',
            'Meningkatkan jangkauan pasar dari offline ke seluruh Indonesia melalui platform digital.',
            'Mempermudah pelanggan melakukan transaksi dengan proses checkout yang cepat dan aman.',
            'Mengurangi beban operasional manual dengan sistem manajemen pesanan terintegrasi.',
        ],
    },
    {
        slug: 'company-profile-gedhong',
        name: 'Company Profile PT Gedhong Kencono Mulyo',
        description:
            'Website company profile modern dan responsif untuk PT Gedhong Kencono Mulyo dengan tampilan profesional, animasi halus, dan optimasi SEO.',
        year: '2024',
        tech: ['React', 'Tailwind CSS', 'Framer Motion', 'Firebase', 'Vite'],
        category: 'Web Development',

        liveUrl: 'https://gedhongkencono.netlify.app/',
        images: [
            '/gedhong.png',
            '/gedhong1.png',
            '/gedhong2.png',
        ],
        ownership: 'Solo project',
        role: 'Full Stack Developer',
        team: '',
        responsibilities: [
            'Merancang dan mengembangkan UI/UX company profile dari nol menggunakan React dan Tailwind CSS.',
            'Mengimplementasikan animasi halus dengan Framer Motion untuk meningkatkan pengalaman pengguna.',
            'Mengoptimalkan performa dan SEO agar mudah ditemukan di mesin pencari.',
            'Mendeploy ke Netlify dengan konfigurasi CI/CD otomatis.',
        ],
        impact: [
            'Meningkatkan kredibilitas dan citra profesional perusahaan secara online.',
            'Mempermudah calon klien menemukan informasi produk dan layanan perusahaan.',
            'Menghasilkan website yang cepat dimuat dan ramah mobile di semua perangkat.',
        ],
    },
    {
        slug: 'company-profile-magati',
        name: 'Company Profile PT Magati Unggul',
        description:
            'A professional company profile website for PT Magati Unggul, a company engaged in industry and manufacturing. It showcases the company profile, products/services, and contact information in a modern, responsive design that makes it easy to navigate for potential business partners.',
        year: '2024',
        tech: ['React', 'Tailwind CSS', 'Vite', 'Spredsheets'],
        category: 'Web Development',
        liveUrl: 'https://magatiunggul.netlify.app/',
        images: '/magati.png',

        ownership: 'Solo project',
        role: 'Full Stack Developer',
        team: '',
        responsibilities: [
            'Menganalisis kebutuhan bisnis dan merancang arsitektur informasi website berdasarkan profil perusahaan PT Magati Unggul.',
            'Membangun tampilan UI/UX dari nol menggunakan React dan Tailwind CSS dengan pendekatan mobile-first agar nyaman diakses di semua perangkat.',
            'Mengintegrasikan animasi halus berbasis Framer Motion pada section hero, produk, dan kontak untuk meningkatkan kesan profesional.',
            'Mengoptimalkan performa loading dengan lazy loading gambar, code splitting, dan konfigurasi Vite untuk production build yang efisien.',
            'Mengimplementasikan form kontak fungsional dengan validasi di sisi client dan integrasi layanan email.',
            'Mendeploy website ke platform hosting dengan konfigurasi domain kustom dan SSL.',
        ],
        impact: [
            'Meningkatkan kredibilitas dan citra profesional PT Magati Unggul di hadapan calon mitra bisnis dan klien.',
            'Mempermudah calon mitra menemukan informasi produk, layanan, dan cara menghubungi perusahaan secara online.',
            'Mengurangi ketergantungan pada media sosial sebagai satu-satunya saluran promosi digital perusahaan.',
            'Menghasilkan website yang cepat dimuat (Lighthouse score tinggi) dan ramah mesin pencari.',
        ],
    },

];

/**
 * Informasi kontak dan tautan media sosial.
 * @type {Contact}
 */
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
            url: 'https://www.linkedin.com/in/suparman0921/',
            icon: 'Linkedin',
        },
    ],
};
