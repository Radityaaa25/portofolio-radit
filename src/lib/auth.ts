import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true, // PENTING: Agar jalan lancar di localhost
  session: { strategy: "jwt" }, // Pastikan pakai JWT
  providers: [
    Credentials({
      authorize: async (credentials) => {
        try {
          const { email, password } = await loginSchema.parseAsync(credentials);

          // FIX: Gunakan 'prisma.user' (sesuai seed.ts), bukan 'prisma.admin'
          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (!user) return null;

          // Cek Password Hash
          const isPasswordValid = await bcrypt.compare(password, user.password);
          
          if (!isPasswordValid) return null;

          // Return data user yang berhasil login
          return { 
            id: user.id, 
            email: user.email, 
            name: user.name 
          };
          
        } catch {
          // FIX: Hapus '(error)' biar gak ada warning "unused variable"
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/admin/login", // Pastikan route halaman login bener ini
  },
  callbacks: {
    async session({ session, token }) {
      if (token?.sub && session.user) {
        session.user.email = token.email as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
      }
      return token;
    },
  },
  secret: process.env.AUTH_SECRET, // Pastikan variabel ini ada di .env
});