# Dokumen Requirements

## Pendahuluan

Dokumen ini mendefinisikan kebutuhan untuk membangun website portofolio profesional milik Suparman, seorang Junior Web Developer dan Analis Program. Website dibangun menggunakan React.js dan Tailwind CSS dengan desain modern, bersih, dan animasi halus yang terinspirasi dari https://www.zickrian.dev/. Tujuan utama website adalah menampilkan profil, pengalaman kerja, keahlian, pendidikan, serta sertifikasi secara profesional, dengan optimasi SEO dan pengalaman pengguna yang baik di berbagai perangkat.

Konten website mencakup data dari CV: ringkasan profil (About), pengalaman kerja (Work Experience), keahlian (Skills), pendidikan (Education), pelatihan & sertifikasi (Training & Certifications), serta informasi kontak.

## Glossary

- **Portfolio_Website**: Aplikasi web satu-halaman (single-page application) berbasis React.js yang menampilkan profil profesional Suparman.
- **Navigation_Bar**: Komponen navigasi tetap yang berisi tautan menuju setiap bagian halaman.
- **Hero_Section**: Bagian pembuka halaman yang menampilkan nama, peran, dan ajakan bertindak (call-to-action).
- **About_Section**: Bagian yang menampilkan ringkasan profil profesional.
- **Experience_Section**: Bagian yang menampilkan daftar pengalaman kerja beserta detailnya.
- **Skills_Section**: Bagian yang menampilkan kategori dan daftar keahlian.
- **Education_Section**: Bagian yang menampilkan riwayat pendidikan.
- **Certification_Section**: Bagian yang menampilkan daftar pelatihan dan sertifikasi.
- **Contact_Section**: Bagian yang menampilkan informasi kontak dan tautan media.
- **Theme_Controller**: Komponen yang mengatur mode tampilan terang (light) dan gelap (dark).
- **SEO_Module**: Kumpulan elemen metadata dan markup terstruktur untuk optimasi mesin pencari.
- **Animation_Engine**: Mekanisme animasi (berbasis Framer Motion) yang mengatur transisi dan efek gerak antar elemen.
- **Viewport**: Area tampilan perangkat pengguna, mencakup mobile, tablet, dan desktop.
- **Touch_Target**: Elemen interaktif (tombol, tautan, atau kontrol) yang dapat dioperasikan melalui sentuhan pada perangkat layar sentuh.
- **Responsive_Media**: Elemen gambar, ikon, atau media visual yang ukurannya menyesuaikan lebar kontainer induk.
- **Responsive_Typography**: Skema ukuran teks yang menyesuaikan secara proporsional terhadap lebar Viewport.

## Requirements

### Requirement 1: Tata Letak dan Navigasi

**User Story:** Sebagai pengunjung, saya ingin menavigasi seluruh bagian website dengan mudah, sehingga saya dapat menemukan informasi yang saya cari dengan cepat.

#### Acceptance Criteria

1. THE Portfolio_Website SHALL menampilkan Navigation_Bar yang berisi tautan menuju Hero_Section, About_Section, Experience_Section, Skills_Section, Education_Section, Certification_Section, dan Contact_Section.
2. WHEN pengunjung memilih sebuah tautan pada Navigation_Bar, THE Portfolio_Website SHALL menggulir halaman ke bagian yang dituju dengan transisi gulir halus (smooth scroll).
3. WHILE pengunjung menggulir halaman, THE Navigation_Bar SHALL tetap terlihat pada posisi atas Viewport (sticky).
4. WHILE sebuah bagian aktif berada pada Viewport, THE Navigation_Bar SHALL menandai tautan yang sesuai sebagai aktif.
5. WHERE lebar Viewport kurang dari 768 piksel, THE Navigation_Bar SHALL menampilkan menu dalam bentuk tombol hamburger yang dapat dibuka dan ditutup.

### Requirement 2: Hero Section

**User Story:** Sebagai pengunjung, saya ingin melihat identitas dan peran profesional pemilik website pada tampilan awal, sehingga saya langsung memahami siapa pemiliknya.

#### Acceptance Criteria

1. THE Hero_Section SHALL menampilkan nama "Suparman" dan peran profesional sebagai Web Developer.
2. THE Hero_Section SHALL menampilkan tombol call-to-action menuju Contact_Section dan tombol menuju Experience_Section.
3. WHEN Hero_Section dimuat, THE Animation_Engine SHALL menampilkan elemen teks dan tombol dengan animasi transisi masuk dalam durasi maksimum 1000 milidetik.

### Requirement 3: About Section

**User Story:** Sebagai pengunjung, saya ingin membaca ringkasan profil profesional, sehingga saya memahami latar belakang dan keahlian utama pemilik.

#### Acceptance Criteria

1. THE About_Section SHALL menampilkan ringkasan profil yang mencakup latar belakang pendidikan S1 Teknologi Informasi, sertifikasi Junior Web Developer dan Analis Program, serta alumni DBS Foundation Coding Camp.
2. THE About_Section SHALL menampilkan informasi lokasi "Jakarta Selatan, DKI Jakarta".

### Requirement 4: Experience Section

**User Story:** Sebagai perekrut, saya ingin melihat riwayat pengalaman kerja beserta detail tanggung jawab, sehingga saya dapat menilai kompetensi profesional pemilik.

#### Acceptance Criteria

1. THE Experience_Section SHALL menampilkan tiga pengalaman kerja: Back End & Front End Developer (Dicoding x DBS Foundation), Staff Finance & IT Support (PT. Magati Unggul), dan Hardware & System Engineer (CV. Salafindo).
2. THE Experience_Section SHALL menampilkan jabatan, nama perusahaan, dan periode waktu untuk setiap pengalaman kerja.
3. THE Experience_Section SHALL menampilkan daftar tanggung jawab utama untuk setiap pengalaman kerja.
4. THE Experience_Section SHALL menampilkan pengalaman kerja dalam urutan kronologis dari yang terbaru ke yang terlama.
5. WHEN sebuah kartu pengalaman kerja memasuki Viewport, THE Animation_Engine SHALL menampilkan kartu tersebut dengan animasi transisi masuk.

### Requirement 5: Skills Section

**User Story:** Sebagai pengunjung, saya ingin melihat keahlian pemilik yang dikelompokkan berdasarkan kategori, sehingga saya dapat memahami kompetensi teknis dan non-teknisnya.

#### Acceptance Criteria

1. THE Skills_Section SHALL menampilkan keahlian yang dikelompokkan ke dalam kategori: Software Engineering, Mobile Development, Finance & Taxation, Tax Compliance, Corporate Administration, Productivity & Creative, dan Hardware & Systems.
2. THE Skills_Section SHALL menampilkan setiap item keahlian di bawah kategori yang sesuai.

### Requirement 6: Education Section

**User Story:** Sebagai perekrut, saya ingin melihat riwayat pendidikan formal pemilik, sehingga saya dapat memverifikasi latar belakang akademisnya.

#### Acceptance Criteria

1. THE Education_Section SHALL menampilkan dua riwayat pendidikan: Universitas Bina Sarana Informatika (S1 Teknologi Informasi) dan SMK Pembangunan Cibadak (Teknik Komputer dan Jaringan).
2. THE Education_Section SHALL menampilkan nama institusi, program studi, dan periode waktu untuk setiap riwayat pendidikan.

### Requirement 7: Certification Section

**User Story:** Sebagai perekrut, saya ingin melihat sertifikasi dan pelatihan yang dimiliki, sehingga saya dapat menilai kredibilitas dan pengembangan kompetensi pemilik.

#### Acceptance Criteria

1. THE Certification_Section SHALL menampilkan enam pelatihan dan sertifikasi sesuai data CV.
2. THE Certification_Section SHALL menampilkan nama sertifikasi, lembaga penerbit, dan tahun untuk setiap item.

### Requirement 8: Contact Section

**User Story:** Sebagai pengunjung, saya ingin menghubungi pemilik website, sehingga saya dapat menjalin komunikasi profesional.

#### Acceptance Criteria

1. THE Contact_Section SHALL menampilkan alamat email "suparman0921@gmail.com" dan nomor telepon "+62 857 9752 2591".
2. WHEN pengunjung memilih tautan email, THE Portfolio_Website SHALL membuka aplikasi email default melalui tautan mailto.
3. WHEN pengunjung memilih tautan nomor telepon, THE Portfolio_Website SHALL memicu tautan tel untuk menghubungi nomor tersebut.

### Requirement 9: Desain Responsif

**User Story:** Sebagai pengunjung, saya ingin website tampil dan berfungsi baik di perangkat apa pun, sehingga saya mendapatkan pengalaman yang konsisten di ponsel kecil, ponsel besar, tablet, laptop, desktop besar, maupun layar ultra-wide.

#### Acceptance Criteria

1. THE Portfolio_Website SHALL menyesuaikan tata letak setiap bagian secara fluid pada rentang lebar Viewport ponsel kecil (320 sampai 374 piksel), ponsel besar (375 sampai 767 piksel), tablet (768 sampai 1023 piksel), laptop (1024 sampai 1439 piksel), desktop besar (1440 sampai 1919 piksel), dan layar ultra-wide (1920 piksel atau lebih).
2. WHILE Viewport ditampilkan pada perangkat apa pun dengan lebar minimal 320 piksel, THE Portfolio_Website SHALL menampilkan seluruh konten tanpa gulir horizontal.
3. WHERE Portfolio_Website diakses pada perangkat layar sentuh, THE Portfolio_Website SHALL menampilkan setiap Touch_Target dengan ukuran area sentuh minimal 44 x 44 piksel.
4. THE Portfolio_Website SHALL menampilkan setiap Responsive_Media dengan lebar maksimum sama dengan lebar kontainer induk dan mempertahankan rasio aspek aslinya tanpa terpotong atau terdistorsi.
5. THE Portfolio_Website SHALL menerapkan Responsive_Typography sehingga ukuran teks isi berada antara 16 dan 20 piksel pada seluruh rentang lebar Viewport mulai dari 320 piksel.
6. WHEN orientasi perangkat berubah antara potret (portrait) dan lanskap (landscape), THE Portfolio_Website SHALL menyesuaikan tata letak setiap bagian agar seluruh konten tetap terlihat tanpa gulir horizontal.

### Requirement 10: Mode Tema Terang dan Gelap

**User Story:** Sebagai pengunjung, saya ingin mengganti tampilan antara mode terang dan gelap, sehingga saya dapat menyesuaikan kenyamanan visual saya.

#### Acceptance Criteria

1. THE Theme_Controller SHALL menampilkan kontrol untuk beralih antara mode terang dan mode gelap.
2. WHEN pengunjung mengaktifkan kontrol tema, THE Theme_Controller SHALL mengubah skema warna seluruh Portfolio_Website ke mode yang dipilih.
3. WHEN pengunjung kembali mengunjungi website pada peramban yang sama, THE Theme_Controller SHALL menerapkan mode tema yang terakhir dipilih menggunakan penyimpanan lokal peramban.

### Requirement 11: Optimasi SEO

**User Story:** Sebagai pemilik website, saya ingin website saya teroptimasi untuk mesin pencari, sehingga website mudah ditemukan oleh perekrut dan pengunjung.

#### Acceptance Criteria

1. THE SEO_Module SHALL menyertakan elemen title dan meta description yang menjelaskan identitas dan peran profesional Suparman.
2. THE SEO_Module SHALL menyertakan tag Open Graph dan Twitter Card untuk pratinjau saat dibagikan ke media sosial.
3. THE SEO_Module SHALL menyertakan markup data terstruktur (JSON-LD) bertipe Person yang berisi nama, peran, dan informasi kontak.
4. THE Portfolio_Website SHALL menggunakan struktur heading semantik dengan tepat satu elemen h1 per halaman.
5. THE Portfolio_Website SHALL menyertakan atribut teks alternatif (alt) pada setiap elemen gambar.

### Requirement 12: Performa dan Animasi

**User Story:** Sebagai pengunjung, saya ingin website memuat cepat dan menampilkan animasi yang halus, sehingga saya mendapatkan pengalaman yang nyaman.

#### Acceptance Criteria

1. WHEN sebuah bagian memasuki Viewport, THE Animation_Engine SHALL menjalankan animasi transisi dengan durasi antara 200 dan 800 milidetik.
2. WHERE pengaturan peramban pengguna mengaktifkan preferensi reduksi gerak (prefers-reduced-motion), THE Animation_Engine SHALL menonaktifkan animasi transisi gerak.

### Requirement 13: Aksesibilitas

**User Story:** Sebagai pengunjung dengan kebutuhan aksesibilitas, saya ingin website dapat dinavigasi dengan keyboard dan pembaca layar, sehingga saya dapat mengakses seluruh konten.

#### Acceptance Criteria

1. THE Portfolio_Website SHALL menyediakan navigasi seluruh elemen interaktif menggunakan keyboard.
2. WHEN sebuah elemen interaktif menerima fokus keyboard, THE Portfolio_Website SHALL menampilkan indikator fokus yang terlihat.
3. THE Portfolio_Website SHALL menyediakan label aksesibilitas (aria-label) pada elemen interaktif yang tidak memiliki teks terlihat.
