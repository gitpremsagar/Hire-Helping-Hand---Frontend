import { API } from "@/lib/constants";
import type { ServiceCategoryResponse, ServiceCategoryRow, ServiceSubCategoryRow } from "./serviceCategory.type";

export async function fetchServiceCategories(): Promise<ServiceCategoryResponse> {
  const res = await fetch(API.CATEGORIES.GET_ALL, {
    next: { revalidate: 300 },
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) {
    throw new Error(`Failed to load categories (${res.status})`);
  }
  return res.json();
}

export function resolveSubcategoryBySlugs(
  payload: ServiceCategoryResponse,
  categorySlug: string,
  subCategorySlug: string
): { category: ServiceCategoryRow; subCategory: ServiceSubCategoryRow } | null {
  const category = payload.data.serviceCategories.find((c) => c.slug === categorySlug);
  if (!category) return null;
  const sub = category.ServiceSubCategory.find((s) => s.slug === subCategorySlug);
  if (!sub) return null;
  if (sub.serviceCategoryId !== category.id) return null;
  return { category, subCategory: sub };
}
