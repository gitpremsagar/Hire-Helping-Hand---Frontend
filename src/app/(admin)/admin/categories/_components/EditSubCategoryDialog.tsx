"use client";

import { useState, useEffect } from "react";
import { ServiceSubCategory } from "@/lib/modules/subCategory/subCategory.type";
import { useUpdateServiceSubCategory } from "@/lib/modules/subCategory/useUpdateServiceSubCategory.hook";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

interface EditSubCategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subCategory: ServiceSubCategory;
  onSuccess?: () => void;
}

export function EditSubCategoryDialog({
  open,
  onOpenChange,
  subCategory,
  onSuccess,
}: EditSubCategoryDialogProps) {
  const { updateSubCategory, isUpdating, error } = useUpdateServiceSubCategory();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    if (subCategory) {
      setFormData({
        name: subCategory.name,
        description: subCategory.description,
      });
    }
  }, [subCategory]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateSubCategory(subCategory.id, formData);
      onSuccess?.();
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to update subcategory:", error);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Sub Category</DialogTitle>
          <DialogDescription>
            Update the sub category information below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter sub category name"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Enter sub category description"
                rows={3}
                required
              />
            </div>
            {error && (
              <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
                {error}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isUpdating}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isUpdating}>
              {isUpdating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Sub Category"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
