import { Footer, Navigation } from "@/components/home";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SidebarProvider>
        <AdminSidebar />
        <div className="w-full">
          <Navigation />
          <SidebarTrigger />
          <main className="p-4 min-h-screen">
            {children}
          </main>
          <Footer />
        </div>
      </SidebarProvider>
    </>
  );
}

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/app/(admin)/_components/admin-sidebar";
