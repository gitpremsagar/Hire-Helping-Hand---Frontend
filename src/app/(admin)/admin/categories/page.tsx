import { API } from "@/lib/constants";
import { ServiceCategoryResponse } from "@/lib/modules/serviceCategory/serviceCategory.type";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { Button } from "@/components/ui/button";
import { Plus, RefreshCw } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Service Categories
          </h1>
          <p className="text-muted-foreground">
            Manage service categories and their subcategories
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Category
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Categories Overview</CardTitle>
          <CardDescription>
            {categories.length > 0
              ? `Showing ${categories.length} service categories`
              : "No categories found"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {categories.length > 0 ? (
            <DataTable columns={columns} data={categories} />
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-3 mb-4">
                <Plus className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                No categories found
              </h3>
              <p className="text-muted-foreground mb-4">
                Get started by creating your first service category.
              </p>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Category
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
