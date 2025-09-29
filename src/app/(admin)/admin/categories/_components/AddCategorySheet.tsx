"use client";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Loader2, Plus, Tag, Sparkles, CheckCircle2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { createServiceCategorySchema } from "@/lib/modules/serviceCategory/serviceCategory.schemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateServiceCategory } from "@/lib/modules/serviceCategory/useCreateServiceCategory.hook";
import { useState } from "react";

type FormData = z.infer<typeof createServiceCategorySchema>;

export const AddCategorySheet = () => {
  const [open, setOpen] = useState(false);
  const { createServiceCategory, isSubmitting } = useCreateServiceCategory();
  
  const form = useForm<FormData>({
    resolver: zodResolver(createServiceCategorySchema),
    defaultValues: {
      name: "",
      description: "",
      isNew: true,
    },
  });

  const onSubmit = async (data: FormData) => {
    await createServiceCategory(data);
    // Reset form and close sheet on success
    form.reset();
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      // Reset form when sheet is closed
      form.reset();
    }
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <Button size="sm" className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto p-0">
        <div className="p-6 space-y-6">
          <SheetHeader className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Tag className="h-5 w-5 text-primary" />
              </div>
              <div>
                <SheetTitle className="text-xl font-semibold">Add New Category</SheetTitle>
                <SheetDescription className="text-sm text-muted-foreground">
                  Create a new service category for your platform
                </SheetDescription>
              </div>
            </div>
          </SheetHeader>
          
          <Separator />
          
          <div className="space-y-6">
          <Card className="border-0 shadow-none bg-muted/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Quick Tips</span>
              </div>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Choose a clear, descriptive name for your category</li>
                <li>• Add a helpful description for users</li>
                <li>• Mark as "new" to highlight it to users</li>
              </ul>
            </CardContent>
          </Card>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium flex items-center gap-2">
                      <Tag className="h-4 w-4" />
                      Category Name
                    </FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        placeholder="e.g., Web Development, Graphic Design"
                        className="h-11"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        {...field} 
                        placeholder="Describe what services this category includes..."
                        rows={4}
                        className="resize-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="isNew"
                render={({ field }) => (
                  <FormItem>
                    <Card className="border border-primary/20 bg-primary/5">
                      <CardContent className="p-4">
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="mt-1"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-sm font-medium flex items-center gap-2">
                              <Sparkles className="h-4 w-4 text-primary" />
                              Mark as new category
                            </FormLabel>
                            <p className="text-xs text-muted-foreground">
                              This will highlight the category as "new" to users
                            </p>
                          </div>
                        </FormItem>
                        <FormMessage />
                      </CardContent>
                    </Card>
                  </FormItem>
                )}
              />
              
              <Separator />
              
              <div className="flex gap-3 pt-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setOpen(false)}
                  className="flex-1 h-11"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1 h-11 bg-primary hover:bg-primary/90" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Create Category
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
