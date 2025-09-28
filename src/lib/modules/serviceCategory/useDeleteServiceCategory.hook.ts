"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { serviceCategoryService } from "./serviceCategory.service";

interface UseDeleteServiceCategoryReturn {
  deleteServiceCategory: (id: string) => Promise<void>;
  isDeleting: boolean;
  isDeleted: boolean;
  isPending: boolean;
}

export const useDeleteServiceCategory = (): UseDeleteServiceCategoryReturn => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const deleteServiceCategory = async (id: string) => {
    try {
      setIsDeleting(true);
      const response = await serviceCategoryService.delete(id);

      if (response.success) {
        toast.success(response.message || "Category deleted successfully");
        setIsDeleted(true);
        toast.loading("Refreshing page...", { id: "refresh" });
        startTransition(() => {
          router.refresh(); // Refresh the page to update the data
        });
        // Reset refreshing state after a short delay to allow for page refresh
        toast.dismiss("refresh");
      } else {
        toast.error(response.message || "Failed to delete category");
        setIsDeleted(false);
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete category. Please try again.");
      setIsDeleted(false);
      throw error;
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    deleteServiceCategory,
    isDeleting,
    isDeleted,
    isPending,
  };
};
