import customAxios from "@/lib/custom-axios-requests";
import {
  CreateFreelancingServiceRequest,
  UpdateFreelancingServiceRequest,
  FreelancingServiceResponse,
  FreelancingServiceListResponse,
  FreelancingServiceListPagination,
  ServiceStatus,
} from "./freelancingService.types";
import { API } from "@/lib/constants";
import { AxiosError } from "axios";
import { freelancingServiceQuerySchema, FreelancingServiceQueryInput } from "./freelancingService.schemas";

interface AxiosErrorResponse {
  message?: string;
  data?: {
    message?: string;
  };
}

/** Backend pagination shape from `getFreelancingServices` / `getFreelancingServicesByFreelancer`. */
interface ApiFreelancingServicesPagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

function normalizeFreelancingServicesPagination(
  p: ApiFreelancingServicesPagination | undefined
): FreelancingServiceListPagination | undefined {
  if (!p) return undefined;
  return {
    currentPage: p.currentPage,
    totalPages: p.totalPages,
    totalItems: p.totalItems,
    itemsPerPage: p.itemsPerPage,
    hasNextPage: p.hasNextPage,
    hasPrevPage: p.hasPrevPage,
    page: p.currentPage,
    limit: p.itemsPerPage,
    total: p.totalItems,
  };
}

export class FreelancingServiceService {
  private static baseUrl = API.FREELANCING_SERVICES;

  // Create a new freelancing service
  static async createService(data: CreateFreelancingServiceRequest): Promise<FreelancingServiceResponse> {
    try {
      const response = await customAxios.post(`${this.baseUrl.CREATE}`, data);
      return {
        success: true,
        data: response.data.data, // Extract the actual service data from the backend response
        message: response.data.message || "Service created successfully"
      };
    } catch (error) {
      console.error("Error creating freelancing service:", error);
      const axiosError = error as AxiosError<AxiosErrorResponse>;
      return {
        success: false,
        error: axiosError.response?.data?.message || "Failed to create service",
        message: "Failed to create service"
      };
    }
  }

  // Get a single freelancing service by ID
  static async getServiceById(id: string): Promise<FreelancingServiceResponse> {
    try {
      const response = await customAxios.get(`${this.baseUrl.GET_BY_ID.replace(":id", id)}`);
      return {
        success: true,
        data: response.data.data, // Extract the actual service data from the backend response
        message: response.data.message || "Service retrieved successfully"
      };
    } catch (error) {
      console.error("Error fetching freelancing service:", error);
      const axiosError = error as AxiosError<AxiosErrorResponse>;
      return {
        success: false,
        error: axiosError.response?.data?.message || "Failed to fetch service",
        message: "Failed to fetch service"
      };
    }
  }

  // Get freelancing services with pagination and filters (query keys match backend `getFreelancingServicesQuerySchema`)
  static async getServices(
    params: Partial<FreelancingServiceQueryInput> = {}
  ): Promise<FreelancingServiceListResponse> {
    try {
      const parsed = freelancingServiceQuerySchema.parse({
        page: 1,
        limit: 12,
        sortBy: "createdAt",
        sortOrder: "desc",
        ...params,
      });

      const axiosParams: Record<string, string | number> = {
        page: parsed.page,
        limit: parsed.limit,
        sortBy: parsed.sortBy,
        sortOrder: parsed.sortOrder,
      };
      if (parsed.search) axiosParams.search = parsed.search;
      if (parsed.categoryId) axiosParams.categoryId = parsed.categoryId;
      if (parsed.subCategoryId) axiosParams.subCategoryId = parsed.subCategoryId;
      if (parsed.freelancerId) axiosParams.freelancerId = parsed.freelancerId;
      if (parsed.status) axiosParams.status = parsed.status;
      if (parsed.minPrice !== undefined) axiosParams.minPrice = parsed.minPrice;
      if (parsed.maxPrice !== undefined) axiosParams.maxPrice = parsed.maxPrice;

      const response = await customAxios.get(`${this.baseUrl.GET_ALL}`, {
        params: axiosParams,
      });
      return {
        success: true,
        data: response.data.data?.freelancingServices,
        pagination: normalizeFreelancingServicesPagination(
          response.data.data?.pagination
        ),
        message: response.data.message || "Services retrieved successfully",
      };
    } catch (error) {
      console.error("Error fetching freelancing services:", error);
      const axiosError = error as AxiosError<AxiosErrorResponse>;
      return {
        success: false,
        error: axiosError.response?.data?.message || "Failed to fetch services",
        message: "Failed to fetch services"
      };
    }
  }

  // Update a freelancing service
  static async updateService(data: UpdateFreelancingServiceRequest): Promise<FreelancingServiceResponse> {
    try {
      const { id, ...updateData } = data;
      const response = await customAxios.put(`${this.baseUrl.UPDATE.replace(":id", id)}`, updateData);
      return {
        success: true,
        data: response.data.data, // Extract the actual service data from the backend response
        message: response.data.message || "Service updated successfully"
      };
    } catch (error) {
      console.error("Error updating freelancing service:", error);
      const axiosError = error as AxiosError<AxiosErrorResponse>;
      return {
        success: false,
        error: axiosError.response?.data?.message || "Failed to update service",
        message: "Failed to update service"
      };
    }
  }

  // Delete a freelancing service
  static async deleteService(id: string): Promise<FreelancingServiceResponse> {
    try {
      await customAxios.delete(`${this.baseUrl.DELETE.replace(":id", id)}`);
      return {
        success: true,
        message: "Service deleted successfully"
      };
    } catch (error) {
      console.error("Error deleting freelancing service:", error);
      const axiosError = error as AxiosError<AxiosErrorResponse>;
      return {
        success: false,
        error: axiosError.response?.data?.message || "Failed to delete service",
        message: "Failed to delete service"
      };
    }
  }

  // Publish a service (change status from DRAFT to PENDING_APPROVAL)
  static async publishService(id: string): Promise<FreelancingServiceResponse> {
    try {
      const response = await customAxios.patch(`${this.baseUrl.PUBLISH.replace(":id", id)}`);
      return {
        success: true,
        data: response.data.data, // Extract the actual service data from the backend response
        message: response.data.message || "Service published successfully"
      };
    } catch (error) {
      console.error("Error publishing freelancing service:", error);
      const axiosError = error as AxiosError<AxiosErrorResponse>;
      return {
        success: false,
        error: axiosError.response?.data?.message || "Failed to publish service",
        message: "Failed to publish service"
      };
    }
  }

  // Save as draft
  static async saveAsDraft(data: CreateFreelancingServiceRequest): Promise<FreelancingServiceResponse> {
    try {
      const draftData = { ...data, status: ServiceStatus.DRAFT };
      const response = await customAxios.post(`${this.baseUrl.SAVE_AS_DRAFT}`, draftData);
      return {
        success: true,
        data: response.data.data, // Extract the actual service data from the backend response
        message: response.data.message || "Service saved as draft"
      };
    } catch (error) {
      console.error("Error saving service as draft:", error);
      const axiosError = error as AxiosError<AxiosErrorResponse>;
      return {
        success: false,
        error: axiosError.response?.data?.message || "Failed to save draft",
        message: "Failed to save draft"
      };
    }
  }

  // Get services by freelancer ID
  static async getServicesByFreelancer(freelancerId: string, params: {
    page?: number;
    limit?: number;
    status?: ServiceStatus;
    isActive?: boolean;
  } = {}): Promise<FreelancingServiceListResponse> {
    try {
      const response = await customAxios.get(`${this.baseUrl.GET_BY_FREELANCER_ID.replace(":id", freelancerId)}`, { params });
      return {
        success: true,
        data: response.data.data?.freelancingServices,
        pagination: normalizeFreelancingServicesPagination(
          response.data.data?.pagination
        ),
        message: response.data.message || "Freelancer services retrieved successfully",
      };
    } catch (error) {
      console.error("Error fetching freelancer services:", error);
      const axiosError = error as AxiosError<AxiosErrorResponse>;
      return {
        success: false,
        error: axiosError.response?.data?.message || "Failed to fetch freelancer services",
        message: "Failed to fetch freelancer services"
      };
    }
  }

  // Update service status
  static async updateServiceStatus(id: string, status: ServiceStatus): Promise<FreelancingServiceResponse> {
    try {
      const response = await customAxios.patch(`${this.baseUrl.UPDATE.replace(":id", id)}`, { status });
      return {
        success: true,
        data: response.data.data, // Extract the actual service data from the backend response
        message: response.data.message || "Service status updated successfully"
      };
    } catch (error) {
      console.error("Error updating service status:", error);
      const axiosError = error as AxiosError<AxiosErrorResponse>;
      return {
        success: false,
        error: axiosError.response?.data?.message || "Failed to update service status",
        message: "Failed to update service status"
      };
    }
  }
}

