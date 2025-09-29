"use client";

import { useState } from "react";
import { serviceCategoryService } from "./serviceCategory.service";
import { ServiceCategory } from "./serviceCategory.type";
import { z } from "zod";
import { updateServiceCategorySchema } from "./serviceCategory.schemas";

type UpdateServiceCategoryRequest = z.infer<typeof updateServiceCategorySchema>;

export const useUpdateServiceCategory = () => {
  const [isUpdating, setIsUpdating] = useState(false);

  const updateServiceCategory = async (id: string, data: UpdateServiceCategoryRequest) => {
    setIsUpdating(true);
    try {
      const response = await serviceCategoryService.update(id, data as ServiceCategory);
      return response;
    } catch (error) {
      console.error("Error updating service category:", error);
      throw error;
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    updateServiceCategory,
    isUpdating,
  };
};
