import {
  Calendar,
  ChevronDown,
  Home,
  Inbox,
  Search,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
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
} from "./ui/collapsible";
import { API } from "@/lib/constants";

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

async function getCategories() {
  const res = await fetch(`${API.CATEGORIES.GET_ALL}`);
  const data = await res.json();
  return data.data.serviceCategories;
}

async function getSubCategories() {
  const res = await fetch(`${API.SUBCATEGORIES.GET_ALL}`);
  const data = await res.json();
  return data.data.serviceSubCategories;
}



export async function AppSidebar() {
 
    const categoriesData = getCategories();
    const subCategoriesData = getSubCategories();

    const [categories, subCategories] = await Promise.all([categoriesData, subCategoriesData]);

    console.log(categories, subCategories);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarContent>
          <Link href="/">Hire Helping Hand</Link>
        </SidebarContent>
        <hr className="mt-2" />
      </SidebarHeader>

      <Collapsible defaultOpen className="group/collapsible hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
        <SidebarGroup>
          <SidebarGroupLabel asChild>
            <CollapsibleTrigger>
              Coding
              <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
            </CollapsibleTrigger>
          </SidebarGroupLabel>
          <CollapsibleContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="hover:bg-gray-200 transition-all duration-300">
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </CollapsibleContent>
        </SidebarGroup>
      </Collapsible>

      <Collapsible  className="group/collapsible hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
        <SidebarGroup>
          <SidebarGroupLabel asChild>
            <CollapsibleTrigger>
              Video & Audio
              <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
            </CollapsibleTrigger>
          </SidebarGroupLabel>
          <CollapsibleContent>
            <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            </SidebarGroupContent>
          </CollapsibleContent>
        </SidebarGroup>
      </Collapsible>
    </Sidebar>
  );
}
