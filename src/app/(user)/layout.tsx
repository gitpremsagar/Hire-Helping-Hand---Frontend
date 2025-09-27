import { Footer, Navigation } from "@/components/home";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <div className="w-full">
          <Navigation />
          <SidebarTrigger />
          {children}
          <Footer />
        </div>
      </SidebarProvider>
    </>
  );
}

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
