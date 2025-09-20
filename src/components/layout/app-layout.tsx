import { SidebarProvider } from "@/components/ui/sidebar";
import AppHeader from "@/components/layout/header";
import AppSidebar from "@/components/layout/sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar />
        <div className="flex-1">
            <AppHeader />
            <main className="p-4 lg:p-6">
              {children}
            </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
