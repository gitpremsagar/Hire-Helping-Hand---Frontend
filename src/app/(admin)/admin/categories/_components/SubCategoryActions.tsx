"use client";

import { useState } from "react";
import { ServiceSubCategory } from "@/lib/modules/subCategory/subCategory.type";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Loader2 } from "lucide-react";
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
import { useDeleteServiceSubCategory } from "@/lib/modules/subCategory/useDeleteServiceSubCategory.hook";
import { EditSubCategoryDialog } from "./EditSubCategoryDialog";

interface SubCategoryActionsProps {
  subCategory: ServiceSubCategory;
  onSuccess?: () => void;
}

export function SubCategoryActions({ subCategory, onSuccess }: SubCategoryActionsProps) {
  const { deleteSubCategory, isDeleting } = useDeleteServiceSubCategory();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await deleteSubCategory(subCategory.id);
      setIsDeleteDialogOpen(false);
      onSuccess?.();
    } catch (error) {
      console.error("Failed to delete subcategory:", error);
    }
  };

  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleEditClick = () => {
    setIsEditDialogOpen(true);
  };

  return (
    <>
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 hover:bg-blue-100"
          onClick={handleEditClick}
        >
          <Edit className="h-3 w-3 text-blue-600" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 hover:bg-red-100"
          onClick={handleDeleteClick}
        >
          <Trash2 className="h-3 w-3 text-red-600" />
        </Button>
      </div>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {isDeleting ? "Deleting Sub Category..." : "Are you sure?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {isDeleting 
                ? "Please wait while we delete the sub category" 
                : "This action cannot be undone. This will permanently delete the sub category"
              }
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

      <EditSubCategoryDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        subCategory={subCategory}
        onSuccess={() => {
          onSuccess?.();
        }}
      />
    </>
  );
}
