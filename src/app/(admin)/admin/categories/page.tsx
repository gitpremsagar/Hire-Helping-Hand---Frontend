import { API } from "@/lib/constants";
import { ServiceCategoryResponse } from "@/lib/modules/serviceCategory/serviceCategory.type";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { Button } from "@/components/ui/button";
import { Plus, RefreshCw } from "lucide-react";
import { AddCategorySheet } from "./_components/AddCategorySheet";
import { RefreshButton } from "./_components/RefreshButton";

async function getCategories() {
  try {
    const res = await fetch(`${API.CATEGORIES.GET_ALL}`, {
      cache: "no-store", // Ensure fresh data
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch categories: ${res.status}`);
    }

    const data = await res.json();
    return data as ServiceCategoryResponse;
  } catch (error) {
    console.error("Error fetching categories:", error);
    // Return empty data structure on error
    return {
      success: false,
      message: "Failed to fetch categories",
      data: {
        serviceCategories: [],
        pagination: {
          currentPage: 1,
          totalPages: 0,
          totalItems: 0,
          itemsPerPage: 10,
          hasNextPage: false,
          hasPrevPage: false,
        },
      },
    };
  }
}

export default async function CategoryPage() {
  const categoriesData = await getCategories();
  const categories = categoriesData.data.serviceCategories;

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
            Service Categories
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground">
            Manage service categories and their subcategories
          </p>
        </div>
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <RefreshButton />
          <AddCategorySheet />            
        </div>
      </div>

      {/* Header Section */}
      <div className="bg-gradient-to-r from-muted/30 to-muted/10 rounded-lg border border-border/50 p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold">Categories Overview</h2>
            <p className="text-sm sm:text-base mt-1 text-muted-foreground">
              {categories.length > 0
                ? `Showing ${categories.length} service categories`
                : "No categories found"}
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-lg border border-primary/20">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            <span className="text-sm font-medium text-primary">
              {categories.length} Total
            </span>
          </div>
        </div>
      </div>

      {/* Table Section */}
      {categories.length > 0 ? (
        <DataTable columns={columns} data={categories} />
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center bg-muted/20 rounded-lg border border-border/50">
          <div className="rounded-full bg-gradient-to-br from-primary/10 to-primary/5 p-4 mb-6 border border-primary/20">
            <Plus className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-3 text-foreground">
            No categories found
          </h3>
          <p className="text-muted-foreground mb-6 max-w-md">
            Get started by creating your first service category to organize your services and jobs.
          </p>
          <AddCategorySheet />
        </div>
      )}
    </div>
  );
}
