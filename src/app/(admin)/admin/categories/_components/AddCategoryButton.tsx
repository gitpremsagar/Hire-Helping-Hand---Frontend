"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export const AddCategoryButton = () => {
  const router = useRouter();
  return (
    <Button size="sm" onClick={() => router.push("/admin/categories/add-category")}>
      <Plus className="mr-2 h-4 w-4" />
      Add Category
    </Button>
  );
};
