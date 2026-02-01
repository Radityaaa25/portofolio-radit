"use server";

import prisma from "@/lib/prisma";
import { Category, Experience, Profile, Project, LanguageSkill } from "@prisma/client";

export type PortfolioData = {
  profile: Profile | null;
  categories: Category[];
  projects: (Project & { category: Category })[];
  experiences: Experience[];
  languages: LanguageSkill[]; // <--- TAMBAHAN BARU
};

export async function getPortfolioData(): Promise<PortfolioData> {
  try {
    const [profile, categories, projects, experiences, languages] = await Promise.all([
      prisma.profile.findFirst(),
      prisma.category.findMany(),
      prisma.project.findMany({
        include: { category: true },
        orderBy: { createdAt: "desc" },
      }),
      prisma.experience.findMany({
        orderBy: { createdAt: "desc" }, // atau bisa diset manual urutannya
      }),
      prisma.languageSkill.findMany({
        orderBy: { createdAt: "asc" },
      }),
    ]);

    return {
      profile,
      categories,
      projects,
      experiences,
      languages, // <--- TAMBAHAN BARU
    };
  } catch (error) {
    console.error("Gagal mengambil data portfolio:", error);
    return {
      profile: null,
      categories: [],
      projects: [],
      experiences: [],
      languages: [], // <--- TAMBAHAN BARU
    };
  }
}