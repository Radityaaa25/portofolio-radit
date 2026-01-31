"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

// Kita bikin props-nya support semua props standard Link Next.js + className tambahan
type NavLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  className?: string;
  activeClassName?: string; // Opsional: class khusus kalau link lagi aktif
  children: React.ReactNode;
};

export function NavLink({ 
  href, 
  className, 
  activeClassName = "text-foreground font-semibold", // Default style aktif
  children, 
  ...props 
}: NavLinkProps) {
  const pathname = usePathname();
  
  // Cek apakah link ini sedang aktif
  // Logic: pathname sama persis dengan href
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "transition-colors hover:text-foreground/80",
        isActive ? activeClassName : "text-foreground/60",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}