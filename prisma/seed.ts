// prisma/seed.ts

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Memulai proses seeding data...')

  // 1. Reset Data (Hapus data lama agar tidak duplikat saat dijalankan ulang)
  await prisma.project.deleteMany()
  await prisma.category.deleteMany()
  await prisma.experience.deleteMany()
  await prisma.certificate.deleteMany()
  await prisma.profile.deleteMany()
  await prisma.admin.deleteMany()

  console.log('🧹 Data lama dibersihkan.')

  // 2. Buat Profile Utama
  await prisma.profile.create({
    data: {
      name: "Raditya Ananda Satria",
      roleEn: "Information Systems Student & Fullstack Developer",
      roleId: "Mahasiswa Sistem Informasi & Pengembang Fullstack",
      cvUrl: "/cv-raditya.pdf", // Nanti bisa diedit di admin
      isOpenToWork: true,
    }
  })

  // 3. Buat Kategori Proyek
  const catWeb = await prisma.category.create({ data: { name: "Web Development" } })
  const catDesign = await prisma.category.create({ data: { name: "UI/UX Design" } })
  // const catPhoto = await prisma.category.create({ data: { name: "Photography" } })

  // 4. Buat Proyek (Contoh Data Nyata Raditya)
  await prisma.project.create({
    data: {
      title: "SobatRT",
      descriptionEn: "A community platform for neighborhood management (RT) featuring letter requests and activity galleries. Built with Next.js and Supabase.",
      descriptionId: "Platform komunitas untuk manajemen lingkungan (RT) dengan fitur pengajuan surat dan galeri kegiatan. Dibangun dengan Next.js dan Supabase.",
      categoryId: catWeb.id,
      image: "/projects/sobatrt.jpg", // Ganti dengan path gambar asli nanti
      tech: ["Next.js", "Supabase", "Tailwind CSS"],
      githubUrl: "https://github.com/radityaaa25/sobatrt",
      isFeatured: true
    }
  })

  await prisma.project.create({
    data: {
      title: "Joy Reminder",
      descriptionEn: "Vehicle tax renewal reminder application with photo upload and date filtering features.",
      descriptionId: "Aplikasi pengingat perpanjangan pajak kendaraan dengan fitur upload foto dan filter tanggal.",
      categoryId: catWeb.id,
      image: "/projects/joyreminder.jpg",
      tech: ["Next.js", "React", "Typescript"],
      isFeatured: true
    }
  })

  await prisma.project.create({
    data: {
      title: "Vascode Creative Branding",
      descriptionEn: "Brand identity and visual assets for Vascode Creative production house.",
      descriptionId: "Identitas merek dan aset visual untuk rumah produksi Vascode Creative.",
      categoryId: catDesign.id,
      image: "/projects/vascode.jpg",
      tech: ["Figma", "Photoshop", "Illustrator"],
      isFeatured: false
    }
  })

  // 5. Buat Pengalaman (Experience)
  await prisma.experience.create({
    data: {
      type: "education",
      roleEn: "Information Systems Student",
      roleId: "Mahasiswa Sistem Informasi",
      place: "Universitas Bina Sarana Informatika",
      period: "2024 - Present",
      descriptionEn: "Currently in 2nd Semester. Active in HIMSI organization.",
      descriptionId: "Saat ini Semester 2. Aktif dalam organisasi HIMSI."
    }
  })

  await prisma.experience.create({
    data: {
      type: "organization",
      roleEn: "Volleyball Club Member",
      roleId: "Anggota UKM Voli",
      place: "UBSI Volleyball Club",
      period: "2024 - Present",
      descriptionEn: "Active member participating in weekly training and competitions.",
      descriptionId: "Anggota aktif berpartisipasi dalam latihan mingguan dan kompetisi."
    }
  })

  // 6. Buat Akun Admin (Untuk Login Dashboard Nanti)
  // NOTE: Di production nanti password harus di-hash (bcrypt). Ini untuk awal saja.
  await prisma.admin.create({
    data: {
      email: "admin@raditya.com",
      password: "admin123", // Password sementara
    }
  })

  console.log('✅ Seeding selesai! Database sudah terisi.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })