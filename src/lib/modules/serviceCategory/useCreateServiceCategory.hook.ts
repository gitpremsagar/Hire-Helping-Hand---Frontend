import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { serviceCategoryService } from "./serviceCategory.service";
import { createServiceCategorySchema } from "./serviceCategory.schemas";
import { z } from "zod";

type CreateServiceCategoryData = z.infer<typeof createServiceCategorySchema>;

interface UseCreateServiceCategoryReturn {
  createServiceCategory: (data: CreateServiceCategoryData) => Promise<void>;
  isSubmitting: boolean;
}

export const useCreateServiceCategory = (): UseCreateServiceCategoryReturn => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const createServiceCategory = async (data: CreateServiceCategoryData) => {
    try {
      setIsSubmitting(true);
      const response = await serviceCategoryService.create(data);
      console.log(response);
      if (response.success) {
        toast.success(response.message);
        router.push("/admin/categories");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to create category. Please try again.");
      router.push("/admin/categories");
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    createServiceCategory,
    isSubmitting,
  };
};
