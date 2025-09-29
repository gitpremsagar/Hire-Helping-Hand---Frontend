"use client";

import { useState } from "react";
import { ServiceCategory } from "@/lib/modules/serviceCategory/serviceCategory.type";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AddSubCategoryDialog } from "./AddSubCategoryDialog";

interface AddSubCategoryButtonProps {
  category: ServiceCategory;
  onSuccess?: () => void;
}

export function AddSubCategoryButton({ category, onSuccess }: AddSubCategoryButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsDialogOpen(true)}
        className="h-6 px-1 text-xs"
      >
        <Plus className="h-4 w-4 mr-1" />
        Add New Sub Category
      </Button>
      
      <AddSubCategoryDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        category={category}
        onSuccess={onSuccess}
      />
    </>
  );
}
