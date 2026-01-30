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

          const admin = await prisma.admin.findUnique({
            where: { email },
          });

          if (!admin) return null;

          const isPasswordValid = await bcrypt.compare(password, admin.password);
          const isDevPasswordValid = password === admin.password; 

          if (!isPasswordValid && !isDevPasswordValid) return null;

          return { id: admin.id, email: admin.email };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
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
  secret: process.env.AUTH_SECRET,
});