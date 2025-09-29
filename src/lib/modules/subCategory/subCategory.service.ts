import { API } from "@/lib/constants";
import { 
  CreateServiceSubCategoryRequest, 
  CreateServiceSubCategoryResponse,
  ServiceSubCategoryResponse 
} from "./subCategory.type";

export const createServiceSubCategory = async (
  data: CreateServiceSubCategoryRequest
): Promise<CreateServiceSubCategoryResponse> => {
  const response = await fetch(API.SUBCATEGORIES.CREATE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create subcategory");
  }

  return response.json();
};

export const getServiceSubCategories = async (): Promise<ServiceSubCategoryResponse> => {
  const response = await fetch(API.SUBCATEGORIES.GET_ALL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch subcategories");
  }

  return response.json();
};
