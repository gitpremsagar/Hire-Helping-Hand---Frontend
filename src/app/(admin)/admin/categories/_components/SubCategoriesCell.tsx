"use client";

import { useRouter } from "next/navigation";
import { ServiceCategory } from "@/lib/modules/serviceCategory/serviceCategory.type";
import { Badge } from "@/components/ui/badge";
import { SubCategoryActions } from "./SubCategoryActions";
import { AddSubCategoryButton } from "./AddSubCategoryButton";

interface SubCategoriesCellProps {
  category: ServiceCategory;
}

export function SubCategoriesCell({ category }: SubCategoriesCellProps) {
  const router = useRouter();
  const subcategories = category.ServiceSubCategory || [];

  return (
    <div className="space-y-2">
      {subcategories.length > 0 ? (
        <div className="flex flex-col gap-1.5">
          {subcategories.map((sub) => (
            <div key={sub.id} className="flex items-center gap-1.5 bg-muted/50 rounded-md px-2 py-1">
              <SubCategoryActions
                subCategory={sub}
                onSuccess={() => {
                  // Refresh the page or refetch data
                  router.refresh();
                }}
              />
              <Badge variant="outline" className="text-xs font-medium">
                {sub.name}
              </Badge>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center gap-2 text-muted-foreground">
          <div className="w-1 h-1 rounded-full bg-muted-foreground"></div>
          <span className="text-sm">No subcategories</span>
        </div>
      )}
      <div className="pt-1">
        <AddSubCategoryButton
          category={category}
          onSuccess={() => {
            router.refresh();
          }}
        />
      </div>
    </div>
  );
}

