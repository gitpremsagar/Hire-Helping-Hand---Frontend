"use client";

import { useState, useEffect } from "react";
import { ServiceCategory } from "@/lib/modules/serviceCategory/serviceCategory.type";
import { useUpdateServiceCategory } from "@/lib/modules/serviceCategory/useUpdateServiceCategory.hook";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface EditCategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: ServiceCategory;
  onSuccess?: () => void;
}

export function EditCategoryDialog({ 
  open, 
  onOpenChange, 
  category, 
  onSuccess 
}: EditCategoryDialogProps) {
  const { updateServiceCategory, isUpdating } = useUpdateServiceCategory();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    isNew: false,
    orderNumber: 1,
  });

  // Update form data when category changes
  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        description: category.description,
        isNew: category.isNew,
        orderNumber: category.orderNumber,
      });
    }
  }, [category]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.description.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      await updateServiceCategory(category.id, formData);
      toast.success("Category updated successfully");
      onSuccess?.();
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to update category:", error);
      toast.error("Failed to update category. Please try again.");
    }
  };

  const handleInputChange = (field: string, value: string | boolean | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogDescription>
            Update the category information below. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Category Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter category name"
              disabled={isUpdating}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Enter category description"
              disabled={isUpdating}
              rows={3}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="orderNumber">Order Number</Label>
            <Input
              id="orderNumber"
              type="number"
              value={formData.orderNumber}
              onChange={(e) => handleInputChange("orderNumber", parseInt(e.target.value) || 1)}
              placeholder="Enter order number"
              disabled={isUpdating}
              required
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="isNew"
              checked={formData.isNew}
              onCheckedChange={(checked) => handleInputChange("isNew", checked)}
              disabled={isUpdating}
            />
            <Label htmlFor="isNew">Mark as new category</Label>
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
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
