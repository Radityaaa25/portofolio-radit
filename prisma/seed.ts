import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs' // Pastikan sudah install bcryptjs

const prisma = new PrismaClient()

async function main() {
  // 1. Ambil password dari .env
  const rawPassword = process.env.ADMIN_PASSWORD
  const email = process.env.ADMIN_EMAIL || 'admin@example.com'

  if (!rawPassword) {
    throw new Error('⚠️ ADMIN_PASSWORD belum diisi di file .env! Isi dulu bang.')
  }

  // 2. Hash passwordnya biar aman masuk DB
  const hashedPassword = await hash(rawPassword, 12)

  // 3. Masukkan ke Database
  const user = await prisma.user.upsert({
    where: { email: email },
    update: {
        password: hashedPassword // Update password kalau user udah ada
    },
    create: {
      email: email,
      name: 'Raditya Admin',
      password: hashedPassword,
      role: 'ADMIN', // Sesuaikan dengan kolom di schema prisma lu
    },
  })

  console.log({ user })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })