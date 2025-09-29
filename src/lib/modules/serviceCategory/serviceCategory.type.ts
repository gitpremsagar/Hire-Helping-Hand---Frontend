export interface ServiceCategory {
    id: string;
    name: string;
    description: string;
    isNew: boolean;
    createdAt: string;
    updatedAt: string;
    _count?: {
        ServiceSubCategory: number;
        FreelancingService: number;
        Job: number;
    };
    ServiceSubCategory: ServiceSubCategory[];
}

export interface ServiceSubCategory {
    id: string;
    name: string;
    description: string;
    isNew: boolean;
    serviceCategoryId: string;
    createdAt: string;
    updatedAt: string;
}

export type ServiceCategoryResponse = {
    success: boolean;
    message: string;
    data: {
        serviceCategories: ServiceCategory[];
        pagination: {
            currentPage: number;
            totalPages: number;
            totalItems: number;
            itemsPerPage: number;
            hasNextPage: boolean;
            hasPrevPage: boolean;
        };
    };
};