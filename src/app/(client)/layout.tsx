import { Footer, Navigation } from "@/components/home";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Navigation />
        {children}
        <Footer />
      </SidebarInset>
    </SidebarProvider>
  );
}
