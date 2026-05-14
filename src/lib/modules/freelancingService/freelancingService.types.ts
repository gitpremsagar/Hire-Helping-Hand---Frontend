export interface FreelancingService {
  id: string;
  freelancerId: string;
  title: string;
  description: string;
  slug: string;
  serviceCategoryId: string;
  serviceSubCategoryId: string;
  basePrice?: number;
  currency: string;
  isCustomPricing: boolean;
  deliveryTime: number;
  revisionPolicy: number;
  rushDeliveryAvailable: boolean;
  rushDeliveryFee?: number;
  deliveryGuarantee?: string;
  gallery: string[];
  videoIntroduction?: string;
  portfolioItems: string[];
  requirements?: string;
  communicationLanguage: string[];
  timezone?: string;
  tags: string[];
  keywords: string[];
  metaDescription?: string;
  status: ServiceStatus;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export enum ServiceStatus {
  DRAFT = "DRAFT",
  PENDING_APPROVAL = "PENDING_APPROVAL",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  SUSPENDED = "SUSPENDED",
  ARCHIVED = "ARCHIVED"
}

export interface CreateFreelancingServiceRequest {
  freelancerId: string;
  title: string;
  description: string;
  serviceCategoryId: string;
  serviceSubCategoryId: string;
  basePrice?: number;
  currency?: string;
  isCustomPricing?: boolean;
  deliveryTime: number;
  revisionPolicy?: number;
  rushDeliveryAvailable?: boolean;
  rushDeliveryFee?: number;
  deliveryGuarantee?: string;
  gallery?: string[];
  videoIntroduction?: string;
  portfolioItems?: string[];
  requirements?: string;
  communicationLanguage?: string[];
  timezone?: string;
  tags?: string[];
  keywords?: string[];
  metaDescription?: string;
}

export interface UpdateFreelancingServiceRequest extends Partial<CreateFreelancingServiceRequest> {
  id: string;
}

export interface FreelancingServiceResponse {
  success: boolean;
  data?: FreelancingService;
  message?: string;
  error?: string;
}

export interface CreateFreelancingServiceResponseData {
  freelancingService: FreelancingService;
  message?: string;
  error?: string;
}

/** Taxonomy summary shape returned by `enrichCategoryFields` on the API. */
export interface ServiceTaxonomySummary {
  id: string;
  name: string;
  description: string;
  slug: string;
  icon?: string | null;
  orderNumber: number;
  isNew: boolean;
}

export interface ServiceSubcategorySummary extends ServiceTaxonomySummary {
  serviceCategoryId: string;
}

export interface MarketplaceFreelancerSummary {
  id: string;
  name: string;
  avatar?: string | null;
  country?: string | null;
  city?: string | null;
}

export interface MarketplaceFreelancingServiceListItem {
  id: string;
  title: string;
  description: string;
  slug: string;
  basePrice?: number | null;
  currency: string;
  isCustomPricing: boolean;
  deliveryTime: number;
  revisionPolicy: number;
  rushDeliveryAvailable: boolean;
  rushDeliveryFee?: number | null;
  deliveryGuarantee?: string | null;
  isActive: boolean;
  isTopRated: boolean;
  isProSeller: boolean;
  isFeatured: boolean;
  badges: string[];
  gallery?: string[];
  /** Canonical `https://www.youtube.com/embed/{id}` when set. */
  videoIntroduction?: string | null;
  rating?: number | null;
  ratingCount: number;
  completionRate: number;
  responseTime?: string | null;
  orderCount: number;
  status: ServiceStatus;
  views: number;
  favorites: number;
  createdAt: string;
  updatedAt: string;
  freelancer: MarketplaceFreelancerSummary;
  serviceCategory: string;
  serviceSubCategory: string;
  serviceCategoryId: string;
  serviceSubCategoryId: string;
  ServiceCategory: ServiceTaxonomySummary;
  ServiceSubCategory: ServiceSubcategorySummary;
  _count: {
    reviews: number;
    contracts: number;
  };
}

/** Normalized pagination for list UIs (aliases backend `currentPage` / `itemsPerPage` / `totalItems`). */
export interface FreelancingServiceListPagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  page: number;
  limit: number;
  total: number;
}

export interface FreelancingServiceListResponse {
  success: boolean;
  data?: MarketplaceFreelancingServiceListItem[];
  message?: string;
  error?: string;
  pagination?: FreelancingServiceListPagination;
}

/** Single service payload from `GET /freelancing-services/:id` after enrichment (client marketplace). */
export interface MarketplaceFreelancingServiceDetail extends Omit<
  FreelancingService,
  "serviceCategoryId" | "serviceSubCategoryId"
> {
  isTopRated: boolean;
  isProSeller: boolean;
  isFeatured: boolean;
  badges: string[];
  rating?: number | null;
  ratingCount: number;
  completionRate?: number;
  responseTime?: string | null;
  orderCount?: number;
  views?: number;
  favorites?: number;
  serviceCategory: string;
  serviceSubCategory: string;
  serviceCategoryId: string;
  serviceSubCategoryId: string;
  ServiceCategory: ServiceTaxonomySummary;
  ServiceSubCategory: ServiceSubcategorySummary;
  freelancer: MarketplaceFreelancerSummary & {
    bio?: string | null;
    website?: string | null;
    _count?: {
      freelancingServices: number;
      portfolioItems: number;
    };
  };
  packages?: Array<{
    id: string;
    tier: string;
    name: string;
    description?: string | null;
    deliveryDays: number;
    revisions: number;
    price: number;
  }>;
  reviews?: Array<{
    id: string;
    rating: number;
    comment?: string | null;
    createdAt: string;
    clientId: string;
  }>;
}

