"use client";

import { useState } from "react";
import { ServiceCategory } from "@/lib/modules/serviceCategory/serviceCategory.type";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Edit, Trash2, Eye, Loader2, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDeleteServiceCategory } from "@/lib/modules/serviceCategory/useDeleteServiceCategory.hook";
import { AddSubCategoryDialog } from "./AddSubCategoryDialog";
import { EditCategoryDialog } from "./EditCategoryDialog";
import  {useRouter} from "next/navigation";

interface ActionsCellProps {
  category: ServiceCategory;
}

export function ActionsCell({ category }: ActionsCellProps) {
  const router = useRouter();
  const { deleteServiceCategory, isDeleting } = useDeleteServiceCategory();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isSubCategoryDialogOpen, setIsSubCategoryDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default dialog close behavior
    try {
      await deleteServiceCategory(category.id);
      // Close the dialog after successful deletion
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Failed to delete category:", error);
      // Keep dialog open on error so user can try again
    }
  };

  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true);
  };

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
          <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit category
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsSubCategoryDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add sub category
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
             {isDeleting ? "Deleting Category..." : "Are you sure?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {isDeleting ? "Please wait while we delete the category" : "This action cannot be undone. This will permanently delete the category"}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700 disabled:opacity-50"
            >
                {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AddSubCategoryDialog
        open={isSubCategoryDialogOpen}
        onOpenChange={setIsSubCategoryDialogOpen}
        category={category}
        onSuccess={() => {
          // Refresh the page or refetch data
          router.refresh();
        }}
      />

      <EditCategoryDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        category={category}
        onSuccess={() => {
          // Refresh the page or refetch data
          router.refresh();
        }}
      />
    </>
  );
}
