"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ServiceCategory } from "@/lib/modules/serviceCategory/serviceCategory.type"
import { Badge } from "@/components/ui/badge"
import { ActionsCell } from "./ActionsCell"

export const columns: ColumnDef<ServiceCategory>[] = [
  {
    accessorKey: "name",
    header: "Category Name",
    cell: ({ row }) => {
      const category = row.original
      return (
        <div className="font-medium">
          {category.name}
          {category.isNew && (
            <Badge variant="secondary" className="ml-2">
              New
            </Badge>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const description = row.getValue("description") as string
      return (
        <div className="max-w-[300px] truncate" title={description}>
          {description}
        </div>
      )
    },
  },
  {
    accessorKey: "ServiceSubCategory",
    header: "Sub Categories",
    cell: ({ row }) => {
      const subcategories = row.original.ServiceSubCategory || []
      return (
        <div className="flex flex-col gap-1">
          {subcategories.length > 0 ? (
            subcategories.map((sub) => (
              <Badge key={sub.id} variant="outline" className="text-xs w-fit">
                {sub.name}
              </Badge>
            ))
          ) : (
            <span className="text-muted-foreground text-sm">No subcategories</span>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: "_count",
    header: "Counts",
    cell: ({ row }) => {
      const counts = row.original._count
      return (
        <div className="flex gap-2 text-sm">
          <div className="flex flex-col">
            <span className="font-medium">{counts?.ServiceSubCategory || 0}</span>
            <span className="text-muted-foreground text-xs">Sub</span>
          </div>
          <div className="flex flex-col">
            <span className="font-medium">{counts?.FreelancingService || 0}</span>
            <span className="text-muted-foreground text-xs">Services</span>
          </div>
          <div className="flex flex-col">
            <span className="font-medium">{counts?.Job || 0}</span>
            <span className="text-muted-foreground text-xs">Jobs</span>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"))
      // Use consistent date formatting to avoid hydration mismatches
      // Format as "24-April-2025" to be consistent across server and client
      const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ]
      const day = date.getDate()
      const month = months[date.getMonth()]
      const year = date.getFullYear()
      const formattedDate = `${day}-${month}-${year}`
      return (
        <div className="text-sm">
          {formattedDate}
        </div>
      )
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
]