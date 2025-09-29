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
        <SidebarContent className="text-lg font-semibold">
          Services
        </SidebarContent>
        <hr className="mt-2" />
      </SidebarHeader>

      {categories.data.serviceCategories.map((category) => (
        <Collapsible
          key={category.id}
          className="group/collapsible hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
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
                      <SidebarMenuButton
                        asChild
                        className="hover:bg-gray-200 transition-all duration-300"
                      >
                        <Link href={`/services/${subCategory.id}`}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-arrow-big-left-icon lucide-arrow-big-left"
                          >
                            <path d="M13 9a1 1 0 0 1-1-1V5.061a1 1 0 0 0-1.811-.75l-6.835 6.836a1.207 1.207 0 0 0 0 1.707l6.835 6.835a1 1 0 0 0 1.811-.75V16a1 1 0 0 1 1-1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1z" />
                          </svg>
                          {subCategory.name}
                        </Link>
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
