import { z } from "zod";
import { SERVICE_CATEGORY_ENUM, SERVICE_SUBCATEGORY_ENUM } from "@/lib/constants/serviceTaxonomyEnums";
import {
  canonicalYoutubeEmbedUrl,
  parseYoutubeVideoIdFromInput,
} from "@/lib/youtubeVideoIntroduction";

const categoryEnum = z.enum(SERVICE_CATEGORY_ENUM);
const subCategoryEnum = z.enum(SERVICE_SUBCATEGORY_ENUM);

export const createFreelancingServiceSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title must be less than 100 characters"),
  description: z.string().min(10, "Description must be at least 10 characters").max(2000, "Description must be less than 2000 characters"),
  serviceCategoryId: categoryEnum,
  serviceSubCategoryId: subCategoryEnum,
  basePrice: z.number().min(0, "Base price must be non-negative").optional(),
  currency: z.string().default("USD"),
  isCustomPricing: z.boolean().default(false),
  deliveryTime: z.number().min(1, "Delivery time must be at least 1 day"),
  revisionPolicy: z.number().min(0, "Revision policy must be non-negative").default(0),
  rushDeliveryAvailable: z.boolean().default(false),
  rushDeliveryFee: z.number().min(0, "Rush delivery fee must be non-negative").optional(),
  deliveryGuarantee: z.string().optional(),
  gallery: z.array(z.string()).default([]),
  videoIntroduction: z.preprocess(
    (val) => {
      if (val === null || val === undefined) return undefined;
      if (typeof val !== "string") return val;
      const t = val.trim();
      return t === "" ? undefined : t;
    },
    z
      .union([z.undefined(), z.string().max(20000)])
      .refine(
        (val) => val === undefined || parseYoutubeVideoIdFromInput(val) !== null,
        { message: "Must be a valid YouTube URL or iframe embed code" }
      )
      .transform((val) => {
        if (val === undefined) return undefined;
        const id = parseYoutubeVideoIdFromInput(val)!;
        return canonicalYoutubeEmbedUrl(id);
      })
  ),
  portfolioItems: z.array(z.string()).default([]),
  requirements: z.string().optional(),
  communicationLanguage: z.array(z.string()).min(1, "At least one communication language is required"),
  timezone: z.string().optional(),
  tags: z.array(z.string()).default([]),
  keywords: z.array(z.string()).default([]),
  metaDescription: z.string().max(160, "Meta description must be less than 160 characters").optional(),
});

export const updateFreelancingServiceSchema = createFreelancingServiceSchema.partial().extend({
  id: z.string().min(1, "Service ID is required"),
});

/** Query params aligned with `GET /api/v1/freelancing-services` (backend `getFreelancingServicesQuerySchema`). */
export const freelancingServiceQuerySchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(12),
  search: z.string().optional(),
  categoryId: categoryEnum.optional(),
  subCategoryId: subCategoryEnum.optional(),
  freelancerId: z.string().optional(),
  status: z
    .enum(["DRAFT", "PENDING_APPROVAL", "APPROVED", "REJECTED", "SUSPENDED", "ARCHIVED"])
    .optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  sortBy: z.enum(["price", "rating", "deliveryTime", "createdAt"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export type CreateFreelancingServiceInput = z.infer<typeof createFreelancingServiceSchema>;
export type UpdateFreelancingServiceInput = z.infer<typeof updateFreelancingServiceSchema>;
export type FreelancingServiceQueryInput = z.infer<typeof freelancingServiceQuerySchema>;

