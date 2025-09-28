"use client"

import { useState } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { ServiceCategory } from "@/lib/modules/serviceCategory/serviceCategory.type"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Edit, Trash2, Eye, Loader2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useDeleteServiceCategory } from "@/lib/modules/serviceCategory/useDeleteServiceCategory.hook"

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
    header: "Subcategories",
    cell: ({ row }) => {
      const subcategories = row.original.ServiceSubCategory || []
      return (
        <div className="flex flex-wrap gap-1">
          {subcategories.length > 0 ? (
            subcategories.slice(0, 2).map((sub) => (
              <Badge key={sub.id} variant="outline" className="text-xs">
                {sub.name}
              </Badge>
            ))
          ) : (
            <span className="text-muted-foreground text-sm">No subcategories</span>
          )}
          {subcategories.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{subcategories.length - 2} more
            </Badge>
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
      const category = row.original
      const { deleteServiceCategory, isDeleting, isDeleted, isRefreshing } = useDeleteServiceCategory()
      const [isDropdownOpen, setIsDropdownOpen] = useState(false)
      const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

      const handleDelete = async () => {
        try {
          await deleteServiceCategory(category.id)
          // Close both dialogs after successful deletion
          // setIsDeleteDialogOpen(false)
          // setIsDropdownOpen(false)
        } catch (error) {
          console.error("Failed to delete category:", error)
        }
      }

      // Show refreshing state in the alert dialog
      const isProcessing = isDeleting || isRefreshing

      const handleDeleteClick = () => {
        setIsDeleteDialogOpen(true)
        setIsDropdownOpen(false) // Close dropdown when opening delete dialog
      }

      return (
        <>
          <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(category.id)}
              >
                Copy category ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Eye className="mr-2 h-4 w-4" />
                View details
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                Edit category
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="text-red-600"
                onClick={handleDeleteClick}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete category
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {isProcessing ? (
                    isDeleting ? "Deleting Category..." : "Refreshing Page..."
                  ) : (
                    "Are you sure?"
                  )}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {isProcessing ? (
                    isDeleting ? (
                      <>
                        Please wait while we delete the category
                        <strong> "{category.name}"</strong> and all associated data.
                      </>
                    ) : (
                      <>
                        Category deleted successfully! Refreshing the page to update the data...
                      </>
                    )
                  ) : (
                    <>
                      This action cannot be undone. This will permanently delete the category
                      <strong> "{category.name}"</strong> and remove all associated data.
                    </>
                  )}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={isProcessing}>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  disabled={isProcessing}
                  className="bg-red-600 hover:bg-red-700 disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {isDeleting ? "Deleting..." : "Refreshing..."}
                    </>
                  ) : (
                    "Delete"
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )
    },
  },
]