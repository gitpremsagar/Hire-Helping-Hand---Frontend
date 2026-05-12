"use client";

import {
  ChevronDown,
  Search,
  Loader2,
  AlertCircle,
  RefreshCw,
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
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { API } from "@/lib/constants";
import { ServiceCategoryResponse } from "@/lib/modules/serviceCategory/serviceCategory.type";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  DEFAULT_CATEGORY_SIDEBAR_ICON,
  DEFAULT_SUBCATEGORY_SIDEBAR_ICON,
  getTaxonomyLucideIcon,
} from "@/lib/service-taxonomy-icons";

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

  // Auto-expand the category that contains the active subcategory
  // and collapse all others whenever the route or category list changes.
  useEffect(() => {
    if (!categories) return;
    const activeCategory = categories.data.serviceCategories.find((cat) =>
      cat.ServiceSubCategory.some((sub) =>
        isMenuItemActive(cat.slug, sub.slug)
      )
    );
    setExpandedCategories(
      activeCategory ? new Set([activeCategory.id]) : new Set()
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, categories]);

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
        <SidebarHeader className="border-b border-sidebar-border/60 px-2 py-2 gap-2">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="h-8 w-8 flex-shrink-0" />
            <span className="text-base font-semibold tracking-tight text-foreground group-data-[collapsible=icon]:hidden">
              Services
            </span>
          </div>

          {/* Search Input */}
          <div className="group-data-[collapsible=icon]:hidden">
            <div className="relative">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <SidebarInput
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-9 pl-8 pr-8"
                aria-label="Search services"
                role="searchbox"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2 p-0 text-muted-foreground hover:text-foreground"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                >
                  ×
                </Button>
              )}
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent className="overflow-x-hidden overflow-y-auto">
          {loading && renderLoadingState()}

          {error && renderErrorState()}

          {!loading && !error && (
            <div className="flex flex-col gap-0.5 px-2 py-2">
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
                  const CategoryIcon = getTaxonomyLucideIcon(
                    category.icon,
                    DEFAULT_CATEGORY_SIDEBAR_ICON
                  );
                  const isCategoryActive = category.ServiceSubCategory.some(
                    (sub) => isMenuItemActive(category.slug, sub.slug)
                  );

                  return (
                    <Collapsible
                      key={category.id}
                      open={isExpanded}
                      onOpenChange={() => toggleCategory(category.id)}
                      className="group/collapsible"
                    >
                      <SidebarGroup className="p-0">
                        <SidebarGroupLabel asChild>
                          <CollapsibleTrigger
                            className={`group/trigger relative w-full flex items-center justify-between gap-2 h-auto px-2.5 py-2 rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring ${
                              isCategoryActive
                                ? "bg-blue-500/10 text-blue-700 dark:text-blue-300 font-semibold"
                                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                            }`}
                            aria-expanded={isExpanded}
                            aria-label={`${
                              isExpanded ? "Collapse" : "Expand"
                            } ${category.name} category`}
                          >
                            {isCategoryActive && (
                              <span
                                aria-hidden
                                className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 rounded-r-full bg-blue-600"
                              />
                            )}
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div
                                className={`flex shrink-0 items-center justify-center w-7 h-7 rounded-md transition-colors ${
                                  isCategoryActive
                                    ? "bg-blue-600 text-white shadow-sm"
                                    : "bg-sidebar-accent text-sidebar-accent-foreground/80 group-hover/trigger:text-sidebar-accent-foreground"
                                }`}
                                aria-hidden
                              >
                                <CategoryIcon className="h-3.5 w-3.5" />
                              </div>
                              <span className="truncate">{category.name}</span>
                              <Badge
                                variant="secondary"
                                className={`h-5 min-w-5 px-1.5 text-[10px] font-medium rounded-full leading-none flex items-center justify-center ${
                                  isCategoryActive
                                    ? "bg-blue-600/15 text-blue-700 dark:text-blue-300 border-0"
                                    : ""
                                }`}
                                aria-label={`${filteredSubCategories.length} subcategories`}
                              >
                                {filteredSubCategories.length}
                              </Badge>
                            </div>
                            <ChevronDown
                              className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${
                                isExpanded ? "rotate-180" : ""
                              } ${isCategoryActive ? "text-blue-600 dark:text-blue-300" : ""}`}
                              aria-hidden="true"
                            />
                          </CollapsibleTrigger>
                        </SidebarGroupLabel>

                        <CollapsibleContent>
                          <SidebarGroupContent className="pt-1">
                            <SidebarMenu className="ml-3.5 pl-3 border-l border-sidebar-border/60 gap-0.5">
                              {filteredSubCategories.map((subCategory) => {
                                const isActive = isMenuItemActive(
                                  category.slug,
                                  subCategory.slug
                                );
                                const SubIcon = getTaxonomyLucideIcon(
                                  subCategory.icon,
                                  DEFAULT_SUBCATEGORY_SIDEBAR_ICON
                                );
                                return (
                                  <SidebarMenuItem key={subCategory.id}>
                                    <SidebarMenuButton
                                      asChild
                                      isActive={isActive}
                                      className={`group/menu-item h-8 transition-colors hover:bg-blue-600 hover:text-white ${
                                        isActive
                                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 border-0 shadow-sm"
                                          : ""
                                      }`}
                                    >
                                      <Link
                                        href={`/freelancing-services/${category.slug}/${subCategory.slug}`}
                                        className={`flex items-center gap-2.5 w-full focus:outline-none rounded-md ${
                                          isActive ? "text-white" : ""
                                        }`}
                                        aria-label={`View ${subCategory.name} services`}
                                      >
                                        <div
                                          className={`flex shrink-0 items-center justify-center w-6 h-6 rounded-md transition-colors ${
                                            isActive
                                              ? "bg-white/20 text-white"
                                              : "bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover/menu-item:bg-white/20 group-hover/menu-item:text-white"
                                          }`}
                                          aria-hidden="true"
                                        >
                                          <SubIcon className="h-3 w-3" />
                                        </div>
                                        <span
                                          className={`flex-1 truncate text-sm ${
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
