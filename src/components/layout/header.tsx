
'use client';

import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User, Bell, PanelLeft, Sun, Moon, LogOut, Languages } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import { menuItems } from "./menu-items";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import React from "react";
import Logo from "@/components/logo";
import { useRouter } from "next/navigation";
import { useTranslation } from 'react-i18next';
import '@/lib/i18n';


export default function AppHeader() {
  const userAvatar = PlaceHolderImages.find(img => img.id === 'user-avatar');
  const { setTheme, theme } = useTheme();
  const [isClient, setIsClient] = React.useState(false);
  const router = useRouter();
  const { i18n } = useTranslation();


  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogout = () => {
    router.push('/login');
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className={cn(
        "sticky top-0 z-30 flex h-16 items-center justify-between border-b px-4 md:px-6 bg-background"
        )}>
        <div className="flex items-center gap-4 flex-1">
            <Sheet>
              <SheetTrigger asChild>
                  <Button
                  variant="ghost"
                  size="icon"
                  className="shrink-0 md:hidden"
                  >
                  <PanelLeft className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                  </Button>
              </SheetTrigger>
              <SheetContent side="left">
                  <nav className="grid gap-6 text-lg font-medium">
                  <Link
                      href="/"
                      className="flex items-center gap-2 text-lg font-semibold"
                  >
                      <Logo />
                  </Link>
                  {menuItems.map((item) => (
                      <Link
                      key={item.label}
                      href={item.href}
                      className="text-muted-foreground hover:text-foreground"
                      >
                      {item.label}
                      </Link>
                  ))}
                  </nav>
              </SheetContent>
            </Sheet>
        </div>

        <div className="flex items-center justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
             <Logo />
        </div>

        <div className="flex items-center justify-end gap-2 md:gap-4 flex-1">
            {isClient && (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                      <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full"
                      >
                          <Languages className="h-5 w-5" />
                          <span className="sr-only">Change language</span>
                      </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => changeLanguage('en')}>
                          English
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => changeLanguage('hi')}>
                          Hindi
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => changeLanguage('mr')}>
                          Marathi
                      </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                >
                    <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Toggle notifications</span>
                </Button>
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8">
                        {userAvatar && <Image src={userAvatar.imageUrl} alt="User Avatar" width={32} height={32} data-ai-hint={userAvatar.imageHint} />}
                        <AvatarFallback>
                        <User className="h-5 w-5" />
                        </AvatarFallback>
                    </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link href="/settings" passHref>
                      <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </DropdownMenuItem>
                    </Link>
                    <Link href="/support" passHref>
                      <DropdownMenuItem>
                        <span>Support</span>
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Logout</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
        </div>
    </header>
  );
}
