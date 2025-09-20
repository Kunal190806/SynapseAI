
'use client';

import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User, Bell, PanelLeft, Sun, Moon } from "lucide-react";
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

export default function AppHeader() {
  const userAvatar = PlaceHolderImages.find(img => img.id === 'user-avatar');
  const { setTheme, theme } = useTheme();
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

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
                      <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="h-6 w-6 text-primary"
                      fill="currentColor"
                      >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.28-.14-1.2-1.1-1.2-1.1s-.42-1.06-1.7-1.06c-1.28 0-1.7.94-1.7.94s-1.17 1.05-1.37 1.22c-.2.17-.45.34-.73.5-1.26.73-2.77 1.12-4.2 1.12-.22 0-.43-.02-.64-.05C9.02 18.48 11.18 20 12 20c2.03 0 3.86-1.19 4.7-2.95.14-.28.25-.57.34-.87.06-.2.09-.4.1-.6.06-.22.06-.45 0-.68zM12 4c.55 0 1 .45 1 1v3c0 .55-.45 1-1 1s-1-.45-1-1V5c0-.55.45-1 1-1zm0 10c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
                      </svg>
                      <span className="sr-only">SynapseAI</span>
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
             <Link
                href="/"
                className="flex items-center gap-2 font-semibold"
            >
                <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-8 w-8 text-primary"
                fill="currentColor"
                >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.28-.14-1.2-1.1-1.2-1.1s-.42-1.06-1.7-1.06c-1.28 0-1.7.94-1.7.94s-1.17 1.05-1.37 1.22c-.2.17-.45.34-.73.5-1.26.73-2.77 1.12-4.2 1.12-.22 0-.43-.02-.64-.05C9.02 18.48 11.18 20 12 20c2.03 0 3.86-1.19 4.7-2.95.14-.28.25-.57.34-.87.06-.2.09-.4.1-.6.06-.22.06-.45 0-.68zM12 4c.55 0 1 .45 1 1v3c0 .55-.45 1-1 1s-1-.45-1-1V5c0-.55.45-1 1-1zm0 10c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
                </svg>
                <span className="text-xl font-headline">SynapseAI</span>
            </Link>
        </div>

        <div className="flex items-center justify-end gap-2 md:gap-4 flex-1">
            {isClient && (
              <>
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
                      <DropdownMenuItem>Settings</DropdownMenuItem>
                    </Link>
                    <Link href="/support" passHref>
                      <DropdownMenuItem>Support</DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
        </div>
    </header>
  );
}
