"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ServiceCategory } from "@/lib/modules/serviceCategory/serviceCategory.type";
import { Badge } from "@/components/ui/badge";
import { ActionsCell } from "./ActionsCell";
import { SubCategoryActions } from "./SubCategoryActions";
import { AddSubCategoryButton } from "./AddSubCategoryButton";

export const columns: ColumnDef<ServiceCategory>[] = [
  {
    accessorKey: "name",
    header: "Category Name",
    cell: ({ row }) => {
      const category = row.original;
      return (
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary"></div>
          <div className="font-semibold text-foreground">
            {category.name}
          </div>
          {category.isNew && (
            <Badge variant="secondary" className="text-xs px-2 py-0.5">
              New
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const description = row.getValue("description") as string;
      return (
        <div className="max-w-[300px]">
          <p className="text-sm text-muted-foreground line-clamp-2" title={description}>
            {description}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "ServiceSubCategory",
    header: "Sub Categories",
    cell: ({ row }) => {
      const category = row.original;
      const subcategories = category.ServiceSubCategory || [];
      return (
        <div className="space-y-2">
          {subcategories.length > 0 ? (
            <div className="flex flex-col gap-1.5">
              {subcategories.map((sub) => (
                <div key={sub.id} className="flex items-center gap-1.5 bg-muted/50 rounded-md px-2 py-1">
                  <SubCategoryActions
                    subCategory={sub}
                    onSuccess={() => {
                      // Refresh the page or refetch data
                      window.location.reload();
                    }}
                  />
                  <Badge variant="outline" className="text-xs font-medium">
                    {sub.name}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="w-1 h-1 rounded-full bg-muted-foreground"></div>
              <span className="text-sm">No subcategories</span>
            </div>
          )}
          <div className="pt-1">
            <AddSubCategoryButton
              category={category}
              onSuccess={() => {
                window.location.reload();
              }}
            />
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "_count",
    header: "Statistics",
    cell: ({ row }) => {
      const counts = row.original._count;
      return (
        <div className="flex gap-3">
          <div className="flex flex-col items-center bg-blue-50 dark:bg-blue-950/20 rounded-lg px-3 py-2 min-w-[60px]">
            <span className="font-bold text-blue-600 dark:text-blue-400 text-lg">
              {counts?.ServiceSubCategory || 0}
            </span>
            <span className="text-blue-600 dark:text-blue-400 text-xs font-medium">Sub</span>
          </div>
          <div className="flex flex-col items-center bg-green-50 dark:bg-green-950/20 rounded-lg px-3 py-2 min-w-[60px]">
            <span className="font-bold text-green-600 dark:text-green-400 text-lg">
              {counts?.FreelancingService || 0}
            </span>
            <span className="text-green-600 dark:text-green-400 text-xs font-medium">Services</span>
          </div>
          <div className="flex flex-col items-center bg-purple-50 dark:bg-purple-950/20 rounded-lg px-3 py-2 min-w-[60px]">
            <span className="font-bold text-purple-600 dark:text-purple-400 text-lg">
              {counts?.Job || 0}
            </span>
            <span className="text-purple-600 dark:text-purple-400 text-xs font-medium">Jobs</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      // Use consistent date formatting to avoid hydration mismatches
      // Format as "24-April-2025" to be consistent across server and client
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const day = date.getDate();
      const month = months[date.getMonth()];
      const year = date.getFullYear();
      const formattedDate = `${day}-${month}-${year}`;
      return (
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground"></div>
          <span className="text-sm font-medium text-muted-foreground">{formattedDate}</span>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const category = row.original;
      return <ActionsCell category={category} />;
    },
  },
];
