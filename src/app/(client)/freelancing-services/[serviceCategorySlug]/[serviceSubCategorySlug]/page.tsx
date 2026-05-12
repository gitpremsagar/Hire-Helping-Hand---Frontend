import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  fetchServiceCategories,
  resolveSubcategoryBySlugs,
} from "@/lib/modules/serviceCategory/fetch-service-categories";
import { SubcategoryMarketplace } from "./SubcategoryMarketplace";

type ServicesPageProps = {
  params: Promise<{
    serviceCategorySlug: string;
    serviceSubCategorySlug: string;
  }>;
};

export async function generateMetadata({
  params,
}: ServicesPageProps): Promise<Metadata> {
  const { serviceCategorySlug, serviceSubCategorySlug } = await params;
  try {
    const categories = await fetchServiceCategories();
    const resolved = resolveSubcategoryBySlugs(
      categories,
      serviceCategorySlug,
      serviceSubCategorySlug
    );
    if (!resolved) {
      return { title: "Services | Hire Helping Hand" };
    }
    return {
      title: `${resolved.subCategory.name} — Hire Helping Hand`,
      description:
        resolved.subCategory.description ||
        `Browse ${resolved.subCategory.name} services from vetted freelancers on Hire Helping Hand.`,
    };
  } catch {
    return { title: "Services | Hire Helping Hand" };
  }
}

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { serviceCategorySlug, serviceSubCategorySlug } = await params;

  let categories;
  try {
    categories = await fetchServiceCategories();
  } catch {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <h1 className="text-lg font-semibold">Unable to load categories</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Check that the API is running at{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">NEXT_PUBLIC_API_HOSTNAME</code> and
          try again.
        </p>
      </div>
    );
  }

  const resolved = resolveSubcategoryBySlugs(
    categories,
    serviceCategorySlug,
    serviceSubCategorySlug
  );
  if (!resolved) {
    notFound();
  }

  const { category, subCategory } = resolved;

  return (
    <SubcategoryMarketplace
      categoryId={category.id}
      subCategoryId={subCategory.id}
      categoryName={category.name}
      subCategoryName={subCategory.name}
      subCategoryDescription={subCategory.description}
    />
  );
}
