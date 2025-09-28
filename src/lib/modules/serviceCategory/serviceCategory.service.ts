import { API } from "@/lib/constants";
import customAxios from "@/lib/custom-axios-requests";
import { ServiceCategory } from "./serviceCategory.type";

export const ServiceCategoryService = {
  getAll: async () => {
    try {
      const response = await customAxios.get(API.CATEGORIES.GET_ALL);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  create: async (data: ServiceCategory) => {
    try {
      const response = await customAxios.post(API.CATEGORIES.CREATE, data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  update: async (id: string, data: ServiceCategory) => {
    const url = API.CATEGORIES.UPDATE.replace(":id", id);
    try {
      const response = await customAxios.put(url, data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  delete: async (id: string) => {
    const url = API.CATEGORIES.DELETE.replace(":id", id);
    try {
      const response = await customAxios.delete(url);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
