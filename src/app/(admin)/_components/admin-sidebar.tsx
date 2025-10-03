"use client";

import {
  ChevronDown,
  Home,
  Settings,
  Users,
  UserCheck,
  Briefcase,
  FileText,
  CheckCircle,
  Shield,
  BarChart3,
  Cog,
  TrendingUp,
  DollarSign,
  AlertTriangle,
  MessageSquare,
  Database,
  Lock,
  Bell,
  Star,
  CreditCard,
  PieChart,
  UserX,
  FileCheck,
  Globe,
  Activity,
} from "lucide-react";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface SidebarItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface SidebarSection {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  textColor: string;
  items: SidebarItem[];
}

const sidebarSections: SidebarSection[] = [
  {
    title: "Dashboard & Analytics",
    icon: BarChart3,
    iconColor: "text-blue-600",
    textColor: "text-blue-700",
    items: [
      {
        title: "Overview",
        href: "/admin/dashboard",
        icon: Home,
      },
      {
        title: "Analytics",
        href: "/admin/analytics",
        icon: TrendingUp,
      },
      {
        title: "Reports",
        href: "/admin/reports",
        icon: PieChart,
      },
      {
        title: "Activity Log",
        href: "/admin/activity",
        icon: Activity,
      },
    ],
  },
  {
    title: "User Management",
    icon: Users,
    iconColor: "text-green-600",
    textColor: "text-green-700",
    items: [
      {
        title: "All Users",
        href: "/admin/users",
        icon: Users,
      },
      {
        title: "Freelancers",
        href: "/admin/freelancers",
        icon: UserCheck,
      },
      {
        title: "Clients",
        href: "/admin/clients",
        icon: Users,
      },
      {
        title: "Verification",
        href: "/admin/verification",
        icon: CheckCircle,
      },
      {
        title: "Banned Users",
        href: "/admin/banned-users",
        icon: UserX,
      },
    ],
  },
  {
    title: "Content Management",
    icon: FileText,
    iconColor: "text-purple-600",
    textColor: "text-purple-700",
    items: [
      {
        title: "Categories",
        href: "/admin/categories",
        icon: FileText,
      },
      {
        title: "Services",
        href: "/admin/services",
        icon: Briefcase,
      },
      {
        title: "Jobs",
        href: "/admin/jobs",
        icon: Briefcase,
      },
      {
        title: "Projects",
        href: "/admin/projects",
        icon: FileCheck,
      },
      {
        title: "Portfolios",
        href: "/admin/portfolios",
        icon: FileText,
      },
    ],
  },
  {
    title: "Financial Management",
    icon: DollarSign,
    iconColor: "text-yellow-600",
    textColor: "text-yellow-700",
    items: [
      {
        title: "Transactions",
        href: "/admin/transactions",
        icon: CreditCard,
      },
      {
        title: "Payments",
        href: "/admin/payments",
        icon: DollarSign,
      },
      {
        title: "Revenue",
        href: "/admin/revenue",
        icon: TrendingUp,
      },
      {
        title: "Refunds",
        href: "/admin/refunds",
        icon: CreditCard,
      },
      {
        title: "Commission",
        href: "/admin/commission",
        icon: PieChart,
      },
    ],
  },
  {
    title: "Platform Operations",
    icon: Shield,
    iconColor: "text-red-600",
    textColor: "text-red-700",
    items: [
      {
        title: "Disputes",
        href: "/admin/disputes",
        icon: AlertTriangle,
      },
      {
        title: "Reviews",
        href: "/admin/reviews",
        icon: Star,
      },
      {
        title: "Messages",
        href: "/admin/messages",
        icon: MessageSquare,
      },
      {
        title: "Notifications",
        href: "/admin/notifications",
        icon: Bell,
      },
      {
        title: "Moderation",
        href: "/admin/moderation",
        icon: Shield,
      },
    ],
  },
  {
    title: "System Administration",
    icon: Cog,
    iconColor: "text-gray-600",
    textColor: "text-gray-700",
    items: [
      {
        title: "Settings",
        href: "/admin/settings",
        icon: Settings,
      },
      {
        title: "Security",
        href: "/admin/security",
        icon: Lock,
      },
      {
        title: "Database",
        href: "/admin/database",
        icon: Database,
      },
      {
        title: "Backups",
        href: "/admin/backups",
        icon: Database,
      },
      {
        title: "API Management",
        href: "/admin/api",
        icon: Globe,
      },
    ],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  // Helper function to check if a menu item is active
  const isMenuItemActive = (href: string) => {
    return pathname === href;
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-border/40 pb-4">
        <div className="flex items-center gap-2 px-2">
          <Shield className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold text-foreground">Admin Panel</span>
        </div>
        <p className="px-2 text-sm text-muted-foreground">Manage your platform</p>
      </SidebarHeader>

      {sidebarSections.map((section, index) => {
        const SectionIcon = section.icon;
        return (
          <Collapsible key={index} defaultOpen className="group/collapsible">
            <SidebarGroup>
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger className="group flex w-full items-center justify-between rounded-md px-3 py-2.5 text-sm font-semibold hover:bg-accent hover:text-accent-foreground transition-colors">
                  <div className="flex items-center gap-3">
                    <SectionIcon className={`h-5 w-5 ${section.iconColor}`} />
                    <span className={`${section.textColor} font-semibold`}>
                      {section.title}
                    </span>
                  </div>
                  <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180 text-muted-foreground" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {section.items.map((item, itemIndex) => {
                      const ItemIcon = item.icon;
                      const isActive = isMenuItemActive(item.href);
                      return (
                        <SidebarMenuItem key={itemIndex}>
                          <SidebarMenuButton 
                            asChild 
                            isActive={isActive}
                            className={`gap-2 ${
                              isActive 
                                ? "!bg-gradient-to-r !from-blue-600 !to-purple-600 !text-white hover:!from-blue-700 hover:!to-purple-700 !border-0 focus:!ring-0 focus:!ring-offset-0" 
                                : ""
                            }`}
                          >
                            <Link href={item.href} className={`flex items-center gap-2 focus:outline-none ${isActive ? "focus:ring-0 focus:ring-offset-0 text-white" : ""}`}>
                              <ItemIcon className={`h-4 w-4 ${isActive ? "text-white" : ""}`} />
                              <span className={isActive ? "text-white" : ""}>{item.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        );
      })}

      {/* Settings Section */}
      <div className="mt-auto border-t border-border/40 pt-4">
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton 
                asChild 
                isActive={isMenuItemActive("/admin/settings")}
                className={`gap-2 ${
                  isMenuItemActive("/admin/settings") 
                    ? "!bg-gradient-to-r !from-blue-600 !to-purple-600 !text-white hover:!from-blue-700 hover:!to-purple-700 !border-0 focus:!ring-0 focus:!ring-offset-0" 
                    : ""
                }`}
              >
                <Link href="/admin/settings" className={`flex items-center gap-2 focus:outline-none ${isMenuItemActive("/admin/settings") ? "focus:ring-0 focus:ring-offset-0 text-white" : ""}`}>
                  <Cog className={`h-4 w-4 ${isMenuItemActive("/admin/settings") ? "text-white" : ""}`} />
                  <span className={isMenuItemActive("/admin/settings") ? "text-white" : ""}>Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </div>

      
    </Sidebar>
  );
}
