"use client";

import {
  ChevronDown,
  Home,
  Briefcase,
  FileText,
  CheckCircle,
  DollarSign,
  BarChart3,
  Settings,
  TrendingUp,
  MessageSquare,
  Bell,
  Star,
  CreditCard,
  PieChart,
  User,
  Globe,
  Activity,
  Calendar,
  Target,
  Award,
  Clock,
  Users,
  FileCheck,
  Send,
  Eye,
  Edit,
  Plus,
  Search,
  Filter,
  AlertTriangle,
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
        title: "Dashboard",
        href: "/freelancer",
        icon: Home,
      },
      {
        title: "Analytics",
        href: "/freelancer/analytics",
        icon: TrendingUp,
      },
      {
        title: "Performance",
        href: "/freelancer/performance",
        icon: Activity,
      },
      {
        title: "Earnings Report",
        href: "/freelancer/earnings",
        icon: PieChart,
      },
    ],
  },
  {
    title: "Services & Portfolio",
    icon: Briefcase,
    iconColor: "text-green-600",
    textColor: "text-green-700",
    items: [
      {
        title: "My Services",
        href: "/freelancer/services",
        icon: FileText,
      },
      {
        title: "Create Service",
        href: "/freelancer/create-new-service",
        icon: Plus,
      },
      {
        title: "Portfolio Items",
        href: "/freelancer/portfolio",
        icon: FileText,
      },
      {
        title: "Service Packages",
        href: "/freelancer/packages",
        icon: FileCheck,
      },
    ],
  },
  {
    title: "Jobs & Proposals",
    icon: Search,
    iconColor: "text-purple-600",
    textColor: "text-purple-700",
    items: [
      {
        title: "Find Jobs",
        href: "/freelancer/jobs",
        icon: Search,
      },
      {
        title: "My Proposals",
        href: "/freelancer/proposals",
        icon: Send,
      },
      {
        title: "Active Contracts",
        href: "/freelancer/contracts",
        icon: FileCheck,
      },
      {
        title: "Completed Work",
        href: "/freelancer/completed",
        icon: CheckCircle,
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
        title: "Earnings",
        href: "/freelancer/earnings",
        icon: DollarSign,
      },
      {
        title: "Transactions",
        href: "/freelancer/transactions",
        icon: FileText,
      },
      {
        title: "Withdrawals",
        href: "/freelancer/withdrawals",
        icon: CreditCard,
      },
      {
        title: "Payout Methods",
        href: "/freelancer/payout-methods",
        icon: CreditCard,
      },
    ],
  },
  {
    title: "Profile & Skills",
    icon: User,
    iconColor: "text-indigo-600",
    textColor: "text-indigo-700",
    items: [
      {
        title: "Profile",
        href: "/freelancer/profile",
        icon: User,
      },
      {
        title: "Skills & Expertise",
        href: "/freelancer/skills",
        icon: Award,
      },
      {
        title: "Employment History",
        href: "/freelancer/employment",
        icon: Briefcase,
      },
      {
        title: "Education",
        href: "/freelancer/education",
        icon: FileText,
      },
      {
        title: "Certifications",
        href: "/freelancer/certifications",
        icon: Star,
      },
      {
        title: "Languages",
        href: "/freelancer/languages",
        icon: Globe,
      },
    ],
  },
  {
    title: "Communication",
    icon: MessageSquare,
    iconColor: "text-teal-600",
    textColor: "text-teal-700",
    items: [
      {
        title: "Messages",
        href: "/freelancer/messages",
        icon: MessageSquare,
      },
      {
        title: "Notifications",
        href: "/freelancer/notifications",
        icon: Bell,
      },
      {
        title: "Reviews & Ratings",
        href: "/freelancer/reviews",
        icon: Star,
      },
      {
        title: "Disputes",
        href: "/freelancer/disputes",
        icon: AlertTriangle,
      },
    ],
  },
  {
    title: "Tools & Resources",
    icon: Settings,
    iconColor: "text-gray-600",
    textColor: "text-gray-700",
    items: [
      {
        title: "Time Tracker",
        href: "/freelancer/time-tracker",
        icon: Clock,
      },
      {
        title: "Invoicing",
        href: "/freelancer/invoicing",
        icon: FileText,
      },
      {
        title: "Blog Posts",
        href: "/freelancer/blog",
        icon: FileText,
      },
      {
        title: "Resources",
        href: "/freelancer/resources",
        icon: Globe,
      },
    ],
  },
];

export function FreelancerDashboardSidebar() {
  const pathname = usePathname();

  // Helper function to check if a menu item is active
  const isMenuItemActive = (href: string) => {
    return pathname === href;
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-border/40 pb-4">
        <div className="flex items-center gap-2 px-2">
          <Briefcase className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold text-foreground">Freelancer Hub</span>
        </div>
        <p className="px-2 text-sm text-muted-foreground">Manage your freelance business</p>
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
                                ? "!bg-gradient-to-r !from-green-600 !to-blue-600 !text-white hover:!from-green-700 hover:!to-blue-700 !border-0 focus:!ring-0 focus:!ring-offset-0" 
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

      {/* Quick Actions Section */}
      <div className="mt-auto border-t border-border/40 pt-4">
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 py-2 text-xs font-semibold text-muted-foreground">
            Quick Actions
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  className="gap-2 bg-gradient-to-r from-green-600 to-blue-600 text-white hover:from-green-700 hover:to-blue-700"
                >
                  <Link href="/freelancer/jobs" className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    <span>Find New Jobs</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  className="gap-2"
                >
                  <Link href="/freelancer/profile" className="flex items-center gap-2">
                    <Edit className="h-4 w-4" />
                    <span>Update Profile</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </div>

      {/* Settings Section */}
      <div className="border-t border-border/40 pt-4">
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton 
                asChild 
                isActive={isMenuItemActive("/freelancer/settings")}
                className={`gap-2 ${
                  isMenuItemActive("/freelancer/settings") 
                    ? "!bg-gradient-to-r !from-green-600 !to-blue-600 !text-white hover:!from-green-700 hover:!to-blue-700 !border-0 focus:!ring-0 focus:!ring-offset-0" 
                    : ""
                }`}
              >
                <Link href="/freelancer/settings" className={`flex items-center gap-2 focus:outline-none ${isMenuItemActive("/freelancer/settings") ? "focus:ring-0 focus:ring-offset-0 text-white" : ""}`}>
                  <Settings className={`h-4 w-4 ${isMenuItemActive("/freelancer/settings") ? "text-white" : ""}`} />
                  <span className={isMenuItemActive("/freelancer/settings") ? "text-white" : ""}>Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </div>
    </Sidebar>
  );
}
