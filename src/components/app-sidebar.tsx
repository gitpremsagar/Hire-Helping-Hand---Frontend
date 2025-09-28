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
import { ServiceCategoryResponse } from "@/lib/modules/serviceCategory/serviceCategory.type";

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
  return data as ServiceCategoryResponse;
}

export async function AppSidebar() {
 
    const categories = await getCategories();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarContent>
          <Link href="/">Hire Helping Hand</Link>
        </SidebarContent>
        <hr className="mt-2" />
      </SidebarHeader>

      {categories.data.serviceCategories.map((category) => (
        <Collapsible key={category.id} className="group/collapsible hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                {category.name}
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {category.ServiceSubCategory.map((subCategory) => (
                    <SidebarMenuItem key={subCategory.id}>
                      <SidebarMenuButton asChild className="hover:bg-gray-200 transition-all duration-300">
                        <a href="#">
                          {subCategory.name}
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      ))}
   
    </Sidebar>
  );
}
