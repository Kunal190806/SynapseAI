// src/components/layout/navbar.tsx
'use client';

import Link from "next/link";
import { menuItems } from "./menu-items";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import '@/lib/i18n';

export default function AppNavbar() {
    const pathname = usePathname();
    const { t } = useTranslation();

    return (
        <nav className="hidden md:flex justify-center items-center gap-5 text-sm font-medium lg:gap-6 border-b px-4 md:px-6 h-14 bg-background">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground",
                  pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {t(item.label)}
            </Link>
          ))}
        </nav>
    )
}
