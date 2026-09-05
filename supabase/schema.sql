-- ====================================================================
-- SatuUrusan (Bantu-Gerak) Supabase Database Schema
-- ====================================================================
-- Skema ini dirancang untuk dijalankan di Supabase SQL Editor.
-- Mencakup tabel master, tabel user, RLS (Row Level Security), triggers,
-- dan seed data lengkap untuk proses administrasi di Indonesia.
-- ====================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. ENUM TYPES
DO $$ BEGIN
    CREATE TYPE roadmap_status AS ENUM ('in_progress', 'completed', 'paused', 'archived');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE task_status AS ENUM ('pending', 'in_progress', 'completed', 'skipped');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 3. PROFILES TABLE (Terkoneksi ke Supabase Auth auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    email TEXT UNIQUE,
    phone TEXT,
    avatar_url TEXT,
    province TEXT,
    city TEXT,
    preferences JSONB DEFAULT '{"notifications": true, "ai_assistant": true}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. LIFE EVENTS TABLE (Master Data Peristiwa Hidup)
CREATE TABLE IF NOT EXISTS public.life_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT NOT NULL,
    accent TEXT NOT NULL DEFAULT 'blue',
    tasks_count INTEGER DEFAULT 0,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. SERVICE CATEGORIES (Master Kategori Layanan Publik)
CREATE TABLE IF NOT EXISTS public.service_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT NOT NULL,
    accent TEXT NOT NULL DEFAULT 'blue',
    tags TEXT[] DEFAULT ARRAY[]::TEXT[],
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. SERVICE ITEMS (Master Prosedur / Layanan Spesifik)
CREATE TABLE IF NOT EXISTS public.service_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID REFERENCES public.service_categories(id) ON DELETE CASCADE,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    duration TEXT NOT NULL,
    requirements TEXT[] DEFAULT ARRAY[]::TEXT[],
    official_name TEXT,
    official_url TEXT,
    steps JSONB DEFAULT '[]'::jsonb,
    is_popular BOOLEAN DEFAULT false,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. EVENT TO SERVICE MAPPING (Relasi Peristiwa ke Layanan Terkait)
CREATE TABLE IF NOT EXISTS public.event_services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    life_event_id UUID REFERENCES public.life_events(id) ON DELETE CASCADE,
    service_item_id UUID REFERENCES public.service_items(id) ON DELETE CASCADE,
    step_order INTEGER DEFAULT 1,
    is_mandatory BOOLEAN DEFAULT true,
    advice_note TEXT,
    UNIQUE(life_event_id, service_item_id)
);

-- 8. USER ROADMAPS (Peta Urusan Pribadi Pengguna)
CREATE TABLE IF NOT EXISTS public.user_roadmaps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    life_event_id UUID REFERENCES public.life_events(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    description TEXT,
    status roadmap_status DEFAULT 'in_progress',
    progress_pct INTEGER DEFAULT 0 CHECK (progress_pct >= 0 AND progress_pct <= 100),
    target_completion_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. ROADMAP TASKS (Checklist Langkah pada Peta Urusan)
CREATE TABLE IF NOT EXISTS public.roadmap_tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    roadmap_id UUID REFERENCES public.user_roadmaps(id) ON DELETE CASCADE,
    service_item_id UUID REFERENCES public.service_items(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT,
    duration TEXT,
    requirements TEXT[] DEFAULT ARRAY[]::TEXT[],
    official_url TEXT,
    status task_status DEFAULT 'pending',
    is_completed BOOLEAN DEFAULT false,
    order_index INTEGER DEFAULT 0,
    completed_at TIMESTAMPTZ,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. AI MESSAGES / CHAT ASSISTANT
CREATE TABLE IF NOT EXISTS public.ai_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    conversation_id UUID DEFAULT gen_random_uuid(),
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    suggested_actions JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. FAQS & HELP CENTER
CREATE TABLE IF NOT EXISTS public.faqs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category TEXT NOT NULL,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================================
-- AUTOMATIC TIMESTAMP TRIGGERS
-- ====================================================================

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_profiles_updated_at ON public.profiles;
CREATE TRIGGER set_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

DROP TRIGGER IF EXISTS set_roadmaps_updated_at ON public.user_roadmaps;
CREATE TRIGGER set_roadmaps_updated_at
    BEFORE UPDATE ON public.user_roadmaps
    FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

DROP TRIGGER IF EXISTS set_roadmap_tasks_updated_at ON public.roadmap_tasks;
CREATE TRIGGER set_roadmap_tasks_updated_at
    BEFORE UPDATE ON public.roadmap_tasks
    FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

-- Trigger untuk sinkronisasi otomatis user profile saat signup lewat Auth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, email, phone, avatar_url)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''),
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'phone', ''),
        COALESCE(NEW.raw_user_meta_data->>'avatar_url', '')
    )
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Trigger untuk update kalkulasi progress roadmap saat task di-checklist
CREATE OR REPLACE FUNCTION public.calculate_roadmap_progress()
RETURNS TRIGGER AS $$
DECLARE
    total_count INTEGER;
    completed_count INTEGER;
    calculated_pct INTEGER := 0;
    target_roadmap_id UUID;
BEGIN
    target_roadmap_id := COALESCE(NEW.roadmap_id, OLD.roadmap_id);
    
    SELECT COUNT(*), COUNT(*) FILTER (WHERE is_completed = true OR status = 'completed')
    INTO total_count, completed_count
    FROM public.roadmap_tasks
    WHERE roadmap_id = target_roadmap_id;

    IF total_count > 0 THEN
        calculated_pct := ROUND((completed_count::DECIMAL / total_count::DECIMAL) * 100);
    END IF;

    UPDATE public.user_roadmaps
    SET 
        progress_pct = calculated_pct,
        status = CASE WHEN calculated_pct = 100 THEN 'completed'::roadmap_status ELSE 'in_progress'::roadmap_status END,
        updated_at = NOW()
    WHERE id = target_roadmap_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_task_completion_change ON public.roadmap_tasks;
CREATE TRIGGER on_task_completion_change
    AFTER INSERT OR UPDATE OF is_completed, status OR DELETE ON public.roadmap_tasks
    FOR EACH ROW EXECUTE PROCEDURE public.calculate_roadmap_progress();

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.life_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roadmaps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roadmap_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;

-- 1. Public Read Policies untuk Master Data
CREATE POLICY "Public can view life events" ON public.life_events FOR SELECT USING (true);
CREATE POLICY "Public can view service categories" ON public.service_categories FOR SELECT USING (true);
CREATE POLICY "Public can view service items" ON public.service_items FOR SELECT USING (true);
CREATE POLICY "Public can view event services" ON public.event_services FOR SELECT USING (true);
CREATE POLICY "Public can view FAQs" ON public.faqs FOR SELECT USING (true);

-- 2. User Specific Policies untuk Profiles
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- 3. User Specific Policies untuk Roadmaps
CREATE POLICY "Users can view own roadmaps" ON public.user_roadmaps FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own roadmaps" ON public.user_roadmaps FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own roadmaps" ON public.user_roadmaps FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own roadmaps" ON public.user_roadmaps FOR DELETE USING (auth.uid() = user_id);

-- 4. User Specific Policies untuk Roadmap Tasks
CREATE POLICY "Users can view own roadmap tasks" ON public.roadmap_tasks
    FOR SELECT USING (EXISTS (SELECT 1 FROM public.user_roadmaps WHERE user_roadmaps.id = roadmap_tasks.roadmap_id AND user_roadmaps.user_id = auth.uid()));

CREATE POLICY "Users can insert own roadmap tasks" ON public.roadmap_tasks
    FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.user_roadmaps WHERE user_roadmaps.id = roadmap_tasks.roadmap_id AND user_roadmaps.user_id = auth.uid()));

CREATE POLICY "Users can update own roadmap tasks" ON public.roadmap_tasks
    FOR UPDATE USING (EXISTS (SELECT 1 FROM public.user_roadmaps WHERE user_roadmaps.id = roadmap_tasks.roadmap_id AND user_roadmaps.user_id = auth.uid()));

CREATE POLICY "Users can delete own roadmap tasks" ON public.roadmap_tasks
    FOR DELETE USING (EXISTS (SELECT 1 FROM public.user_roadmaps WHERE user_roadmaps.id = roadmap_tasks.roadmap_id AND user_roadmaps.user_id = auth.uid()));

-- 5. User Specific Policies untuk AI Messages
CREATE POLICY "Users can view own AI messages" ON public.ai_messages FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own AI messages" ON public.ai_messages FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ====================================================================
-- SEED DATA (DATA AWAL LENGKAP PROSEDUR INDONESIA)
-- ====================================================================

-- 1. SEED LIFE EVENTS
INSERT INTO public.life_events (slug, title, description, icon, accent, tasks_count, order_index) VALUES
('pindah-domisili', 'Pindah Tempat Tinggal', 'Perbarui KTP, Kartu Keluarga, faskes BPJS, dan surat domisili setelah pindah rumah atau antar-kota.', 'Home', 'blue', 8, 1),
('pekerjaan-baru', 'Memulai Pekerjaan Baru', 'Siapkan NPWP, BPJS Ketenagakerjaan, rekening payroll, dan dokumen administratif karir.', 'Briefcase', 'orange', 6, 2),
('menikah', 'Menikah & Berkeluarga', 'Urus surat nikah KUA/Catpil, pecah Kartu Keluarga baru, update KTP status kawin, dan gabung BPJS.', 'Heart', 'rose', 7, 3),
('memiliki-anak', 'Kelahiran Anggota Keluarga', 'Daftarkan Akta Kelahiran, masukkan anak ke Kartu Keluarga, dan daftarkan BPJS Kesehatan bayi baru lahir.', 'Baby', 'green', 9, 4),
('memulai-usaha', 'Membuka Usaha Mandiri', 'Urus NIB (Nomor Induk Berusaha) di OSS, NPWP Badan/Usaha, izin edar PIRT/BPOM, dan rekening bisnis.', 'Building2', 'violet', 8, 5),
('pendidikan', 'Pendidikan & Sekolah', 'Persiapan PPDB, legalisir ijazah, pengajuan KIP Kuliah/Beasiswa, dan mutasi sekolah.', 'GraduationCap', 'teal', 5, 6)
ON CONFLICT (slug) DO NOTHING;

-- 2. SEED SERVICE CATEGORIES
INSERT INTO public.service_categories (slug, name, description, icon, accent, tags, order_index) VALUES
('kependudukan', 'Kependudukan & Sipil', 'KTP-el, Kartu Keluarga, Akta Lahir/Nikah, Surat Pindah SKPWNI', 'IdCard', 'blue', ARRAY['KTP', 'KK', 'Domisili', 'Disdukcapil'], 1),
('kesehatan', 'Kesehatan & Jaminan', 'BPJS Kesehatan, BPJS Ketenagakerjaan, Faskes 1, Vaksinasi', 'HeartPulse', 'mint', ARRAY['BPJS', 'Faskes', 'Kesehatan'], 2),
('pendidikan', 'Pendidikan & Beasiswa', 'PPDB Sekolah, KIP Kuliah, Ijazah, Beasiswa Unggulan', 'GraduationCap', 'orange', ARRAY['PPDB', 'Beasiswa', 'Ijazah'], 3),
('perpajakan', 'Perpajakan & Keuangan', 'NPWP Pribadi/Badan, Lapor SPT Tahunan di DJP Online, E-Billing', 'Receipt', 'violet', ARRAY['NPWP', 'SPT', 'DJP', 'PBB'], 4),
('kendaraan', 'Kendaraan & Lalu Lintas', 'SIM Baru/Perpanjangan di Korlantas, STNK, BPKB, Cek Fisik', 'Car', 'yellow', ARRAY['SIM', 'STNK', 'Samsat', 'Korlantas'], 5),
('perizinan', 'Perizinan Usaha & Bangunan', 'NIB OSS RBA, Izin Edar BPOM/PIRT, Sertifikat Halal, PBG/IMB', 'Building2', 'rose', ARRAY['NIB', 'OSS', 'UMKM', 'PBG'], 6)
ON CONFLICT (slug) DO NOTHING;

-- 3. SEED SERVICE ITEMS
DO $$
DECLARE
    cat_kependudukan UUID;
    cat_kesehatan UUID;
    cat_pendidikan UUID;
    cat_perpajakan UUID;
    cat_kendaraan UUID;
    cat_perizinan UUID;
BEGIN
    SELECT id INTO cat_kependudukan FROM public.service_categories WHERE slug = 'kependudukan';
    SELECT id INTO cat_kesehatan FROM public.service_categories WHERE slug = 'kesehatan';
    SELECT id INTO cat_pendidikan FROM public.service_categories WHERE slug = 'pendidikan';
    SELECT id INTO cat_perpajakan FROM public.service_categories WHERE slug = 'perpajakan';
    SELECT id INTO cat_kendaraan FROM public.service_categories WHERE slug = 'kendaraan';
    SELECT id INTO cat_perizinan FROM public.service_categories WHERE slug = 'perizinan';

    -- KEPENDUDUKAN
    INSERT INTO public.service_items (category_id, slug, title, description, duration, requirements, official_name, official_url, is_popular, order_index) VALUES
    (cat_kependudukan, 'ktp-baru', 'Pembuatan KTP Elektronik Baru', 'Perekaman biometrik dan pencetakan KTP-el untuk usia 17 tahun ke atas.', '3–7 hari kerja', ARRAY['Fotokopi Kartu Keluarga', 'Usia genap 17 tahun', 'Surat pengantar RT/RW (opsional di beberapa daerah)'], 'Dinas Kependudukan dan Pencatatan Sipil', 'https://dukcapil.kemendagri.go.id', true, 1),
    (cat_kependudukan, 'pindah-datang-skpwni', 'Surat Pindah (SKPWNI) & KTP Baru', 'Pengurusan surat pindah domisili antar kab/kota/provinsi serta update KTP dan KK tujuan.', '5–10 hari kerja', ARRAY['KTP asli daerah asal', 'Kartu Keluarga asli', 'Alamat tujuan lengkap', 'Formulir F-1.08'], 'Portal Layanan Dukcapil Kemendagri', 'https://layananonline.dukcapil.kemendagri.go.id', true, 2),
    (cat_kependudukan, 'kartu-keluarga-baru', 'Pembuatan / Pemecahan Kartu Keluarga', 'Penerbitan KK baru untuk pasangan baru menikah atau perubahan susunan keluarga.', '3–5 hari kerja', ARRAY['Buku Nikah / Akta Perkawinan', 'KK asli kedua orang tua', 'KTP-el suami dan istri'], 'Disdukcapil Online', 'https://dukcapil.kemendagri.go.id', true, 3),
    (cat_kependudukan, 'akta-kelahiran', 'Penerbitan Akta Kelahiran Bayi', 'Pencatatan kelahiran anak untuk penerbitan Akta Lahir dan penambahan NIK di KK.', '1–3 hari kerja', ARRAY['Surat Keterangan Lahir dari RS/Bidan', 'Buku Nikah orang tua', 'KK & KTP kedua orang tua', 'KTP 2 orang saksi'], 'Disdukcapil Kabupaten/Kota', 'https://dukcapil.kemendagri.go.id', true, 4);

    -- KESEHATAN
    INSERT INTO public.service_items (category_id, slug, title, description, duration, requirements, official_name, official_url, is_popular, order_index) VALUES
    (cat_kesehatan, 'bpjs-mandiri', 'Pendaftaran BPJS Kesehatan Mandiri', 'Pendaftaran kepesertaan jaminan kesehatan nasional untuk individu dan anggota keluarga.', '1 hari kerja', ARRAY['Kartu Keluarga', 'KTP-el', 'Nomor Rekening Bank (BCA/BRI/BNI/Mandiri)', 'Alamat email aktif & No HP'], 'Aplikasi Mobile JKN / BPJS Kesehatan', 'https://bpjs-kesehatan.go.id', true, 1),
    (cat_kesehatan, 'pindah-faskes-bpjs', 'Perubahan Fasilitas Kesehatan (Faskes 1)', 'Memindahkan klinik / puskesmas rujukan pertama sesuai lokasi tempat tinggal baru.', 'Instan (aktif tgl 1 bulan berikutnya)', ARRAY['Nomor Kartu BPJS / NIK', 'Minimal sudah 3 bulan di faskes sebelumnya'], 'Aplikasi Mobile JKN', 'https://bpjs-kesehatan.go.id', true, 2);

    -- PERPAJAKAN
    INSERT INTO public.service_items (category_id, slug, title, description, duration, requirements, official_name, official_url, is_popular, order_index) VALUES
    (cat_perpajakan, 'daftar-npwp-online', 'Pendaftaran NPWP Pribadi Online', 'Pembuatan Nomor Pokok Wajib Pajak untuk pekerja baru atau wiraswasta via portal Coretax / Ereggistrasi.', '1 hari kerja', ARRAY['NIK KTP-el', 'Nomor Kartu Keluarga', 'Email aktif', 'Nomor HP aktif'], 'Direktorat Jenderal Pajak (DJP)', 'https://pajak.go.id', true, 1),
    (cat_perpajakan, 'lapor-spt-tahunan', 'Pelaporan SPT Tahunan Pribadi (E-Filing)', 'Kewajiban pelaporan pajak penghasilan tahunan untuk wajib pajak orang pribadi.', '15–30 menit', ARRAY['EFIN (Electronic Filing Identification Number)', 'Bukti Potong 1721-A1 atau A2 dari perusahaan', 'Daftar Harta dan Hutang'], 'DJP Online', 'https://djponline.pajak.go.id', true, 2);

    -- KENDARAAN
    INSERT INTO public.service_items (category_id, slug, title, description, duration, requirements, official_name, official_url, is_popular, order_index) VALUES
    (cat_kendaraan, 'perpanjang-sim-online', 'Perpanjangan SIM A & C Online', 'Perpanjangan masa berlaku SIM secara daring melalui aplikasi resmi Digital Korlantas Polri.', '2–4 hari kerja (dikirim ke rumah)', ARRAY['SIM lama', 'E-KTP', 'Hasil tes Rikkes Jasmani (erikkes.id)', 'Hasil tes Psikologi (eppsi.id)', 'Pasfoto latar biru'], 'Digital Korlantas Polri', 'https://digitalkorlantas.id', true, 1),
    (cat_kendaraan, 'bayar-pajak-stnk', 'Bayar Pajak Kendaraan Tahunan (Signal)', 'Pembayaran PKB dan SWDKLLJ online tanpa harus antre di Samsat.', 'Hari yang sama', ARRAY['E-KTP pemilik kendaraan', 'Nomor Polisi (Plat)', '5 digit terakhir nomor rangka kendaraan'], 'Samsat Digital Nasional (SIGNAL)', 'https://samsatdigital.id', true, 2);

    -- PERIZINAN
    INSERT INTO public.service_items (category_id, slug, title, description, duration, requirements, official_name, official_url, is_popular, order_index) VALUES
    (cat_perizinan, 'nib-oss-umkm', 'Pembuatan NIB (Nomor Induk Berusaha) OSS', 'Legalitas izin usaha tunggal untuk pelaku usaha mikro, kecil, dan menengah (UMKM).', '15–60 menit (langsung terbit)', ARRAY['KTP Pemilik Usaha', 'NPWP Pribadi', 'Data Usaha (KBLI, Alamat Usaha, Modal Awal)', 'Nomor HP & Email Usaha'], 'Kementerian Investasi / BKPM (OSS RBA)', 'https://oss.go.id', true, 1),
    (cat_perizinan, 'sertifikasi-halal-gratis', 'Pengajuan Sertifikasi Halal Gratis (SEHATI)', 'Pemberian sertifikat halal untuk produk makanan/minuman UMKM jalur self-declare.', '14–21 hari kerja', ARRAY['NIB aktif', 'Foto produk dan alur proses produksi', 'Daftar bahan baku halal', 'Penyelia halal internal'], 'BPJPH Kementerian Agama (Sihalal)', 'https://ptsp.halal.go.id', true, 2);
END $$;

-- 4. SEED FAQS
INSERT INTO public.faqs (category, question, answer, order_index) VALUES
('Tentang SatuUrusan', 'Apa itu SatuUrusan dan bagaimana cara kerjanya?', 'SatuUrusan adalah navigator urusan administratif publik di Indonesia. Kami memetakan seluruh kebutuhan dokumen, alur, dan syarat berdasarkan peristiwa hidup yang kamu alami (seperti pindah rumah, karir baru, menikah, kelahiran), lalu mengarahkanmu langsung ke kanal resmi pemerintah tanpa calo.', 1),
('Tentang SatuUrusan', 'Apakah SatuUrusan adalah instansi pemerintah?', 'Bukan. SatuUrusan adalah platform independen yang bertujuan merapikan informasi birokrasi dan memudahkan masyarakat. Pengajuan dokumen resmi tetap diproses langsung melalui instansi berwenang seperti Disdukcapil, BPJS, DJP, Korlantas Polri, atau OSS.', 2),
('Keamanan & Privasi', 'Apakah data pribadi saya aman di SatuUrusan?', 'Sangat aman. SatuUrusan tidak pernah meminta dokumen sensitif (seperti PIN, kata sandi perbankan, atau data biometrik). Catatan roadmap kamu disimpan terenkripsi dengan proteksi Row Level Security (RLS) di Supabase.', 3),
('Panduan Penggunaan', 'Apakah saya harus membayar untuk menggunakan layanan ini?', 'Tidak. Seluruh fitur panduan navigasi, roadmap checklist, dan konsultasi SatuAI dapat diakses secara gratis oleh seluruh masyarakat Indonesia.', 4),
('Panduan Penggunaan', 'Bagaimana jika saya bingung menentukan langkah pertama?', 'Kamu bisa menggunakan fitur SatuAI Assistant di pojok kanan bawah atau memilih salah satu Peristiwa Hidup di halaman Beranda. Sistem kami akan otomatis menyusun langkah prioritas nomor 1 hingga selesai.', 5)
ON CONFLICT DO NOTHING;
