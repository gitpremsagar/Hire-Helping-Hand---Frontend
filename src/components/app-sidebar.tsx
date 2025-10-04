"use client";

import {
  ChevronDown,
  Search,
  Loader2,
  AlertCircle,
  RefreshCw,
  Grid3X3,
  Menu,
} from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

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
  SidebarTrigger,
  SidebarInput,
  SidebarMenuSkeleton,
} from "@/components/ui/sidebar";
import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { API } from "@/lib/constants";
import { ServiceCategoryResponse } from "@/lib/modules/serviceCategory/serviceCategory.type";
import { useIsMobile } from "@/hooks/use-mobile";

interface AppSidebarProps {
  className?: string;
}

export function AppSidebar({ className }: AppSidebarProps) {
  const pathname = usePathname();
  const [categories, setCategories] = useState<ServiceCategoryResponse | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  );
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${API.CATEGORIES.GET_ALL}`, {
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch categories: ${res.status}`);
      }

      const data = await res.json();
      setCategories(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load categories"
      );
      console.error("Error fetching categories:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  const filteredCategories =
    categories?.data.serviceCategories.filter((category) => {
      if (!searchQuery) return true;
      const categoryMatch = category.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const subCategoryMatch = category.ServiceSubCategory.some((sub) =>
        sub.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return categoryMatch || subCategoryMatch;
    }) || [];

  // Helper function to check if a menu item is active
  const isMenuItemActive = (categorySlug: string, subCategorySlug: string) => {
    const expectedPath = `/freelancing-services/${categorySlug}/${subCategorySlug}`;
    return pathname === expectedPath;
  };

  const renderLoadingState = () => (
    <div className="space-y-4 p-2">
      <div className="space-y-2">
        <SidebarMenuSkeleton showIcon />
        <SidebarMenuSkeleton showIcon />
        <SidebarMenuSkeleton showIcon />
      </div>
      <div className="space-y-2">
        <SidebarMenuSkeleton showIcon />
        <SidebarMenuSkeleton showIcon />
      </div>
    </div>
  );

  const renderErrorState = () => (
    <div className="flex flex-col items-center justify-center p-4 text-center space-y-3">
      <AlertCircle className="h-8 w-8 text-destructive" />
      <div className="space-y-1">
        <p className="text-sm font-medium text-destructive">
          Failed to load services
        </p>
        <p className="text-xs text-muted-foreground">{error}</p>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={fetchCategories}
        className="w-full"
      >
        <RefreshCw className="h-3 w-3 mr-2" />
        Try Again
      </Button>
    </div>
  );

  return (
    <>
      <Sidebar
        collapsible="icon"
        className={`${className} ${isMobile ? "w-full" : ""}`}
        variant="floating"
      >
        <SidebarHeader className="border-b">
          <div className="flex items-center justify-between px-2 py-2">
            <div className="flex items-center gap-2">
              {/* <Grid3X3 className="h-5 w-5 text-primary" /> */}
              <SidebarTrigger className="h-8 w-8 flex-shrink-0  -translate-x-2" />
              <span className="text-lg font-semibold text-foreground group-data-[collapsible=icon]:hidden">
                Services
              </span>
            </div>
          </div>

          {/* Search Input */}
          <div className="px-2 pb-2 group-data-[collapsible=icon]:hidden">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <SidebarInput
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-8"
                aria-label="Search services"
                role="searchbox"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2 p-0"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                >
                  ×
                </Button>
              )}
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent className="overflow-y-auto">
          {loading && renderLoadingState()}

          {error && renderErrorState()}

          {!loading && !error && (
            <div className="space-y-1">
              {filteredCategories.length === 0 && searchQuery ? (
                <div className="flex flex-col items-center justify-center p-4 text-center">
                  <Search className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    No services found
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Try a different search term
                  </p>
                </div>
              ) : (
                filteredCategories.map((category) => {
                  const isExpanded = expandedCategories.has(category.id);
                  const filteredSubCategories =
                    category.ServiceSubCategory.filter(
                      (sub) =>
                        !searchQuery ||
                        sub.name
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase())
                    );

                  return (
                    <Collapsible
                      key={category.id}
                      open={isExpanded}
                      onOpenChange={() => toggleCategory(category.id)}
                      className="group/collapsible"
                    >
                      <SidebarGroup>
                        <SidebarGroupLabel asChild>
                          <CollapsibleTrigger
                            className="w-full flex items-center justify-between p-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-md transition-colors focus:outline-none"
                            aria-expanded={isExpanded}
                            aria-label={`${
                              isExpanded ? "Collapse" : "Expand"
                            } ${category.name} category`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="font-medium">
                                {category.name}
                              </span>
                              <Badge
                                variant="secondary"
                                className="text-xs"
                                aria-label={`${filteredSubCategories.length} subcategories`}
                              >
                                {filteredSubCategories.length}
                              </Badge>
                            </div>
                            <ChevronDown
                              className={`h-4 w-4 transition-transform duration-200 ${
                                isExpanded ? "rotate-180" : ""
                              }`}
                              aria-hidden="true"
                            />
                          </CollapsibleTrigger>
                        </SidebarGroupLabel>

                        <CollapsibleContent>
                          <SidebarGroupContent>
                            <SidebarMenu>
                              {filteredSubCategories.map((subCategory) => {
                                const isActive = isMenuItemActive(
                                  category.slug,
                                  subCategory.slug
                                );
                                return (
                                  <SidebarMenuItem key={subCategory.id}>
                                    <SidebarMenuButton
                                      asChild
                                      isActive={isActive}
                                      className={`group/menu-item hover:bg-gradient-to-r from-blue-600 to-purple-600 hover:text-white ${
                                        isActive
                                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 border-0"
                                          : ""
                                      }`}
                                    >
                                      <Link
                                        href={`/freelancing-services/${category.slug}/${subCategory.slug}`}
                                        className={`flex items-center gap-3 w-full focus:outline-none rounded-md hover:text-white ${
                                          isActive ? "text-white" : ""
                                        }`}
                                        aria-label={`View ${subCategory.name} services`}
                                      >
                                        <div
                                          className={`flex items-center justify-center w-6 h-6 rounded-md ${
                                            isActive
                                              ? "bg-white/20 text-white"
                                              : "bg-primary/10 text-primary"
                                          }`}
                                          aria-hidden="true"
                                        >
                                          <Grid3X3 className="h-3 w-3" />
                                        </div>
                                        <span
                                          className={`flex-1 truncate ${
                                            isActive ? "text-white" : ""
                                          }`}
                                        >
                                          {subCategory.name}
                                        </span>
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
                })
              )}
            </div>
          )}
        </SidebarContent>
      </Sidebar>

      {/* Mobile Trigger Button - Always visible on mobile */}
      {mounted && isMobile && (
        <div className="fixed top-4 left-4 z-50 md:hidden">
          <SidebarTrigger className="h-10 w-10 bg-background border shadow-lg hover:bg-accent">
            <Menu className="h-5 w-5" />
          </SidebarTrigger>
        </div>
      )}
    </>
  );
}
