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
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createServiceCategorySchema } from "@/lib/modules/serviceCategory/serviceCategory.schemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateServiceCategory } from "@/lib/modules/serviceCategory/useCreateServiceCategory.hook";

type FormData = z.infer<typeof createServiceCategorySchema>;

export default function AddCategoryPage() {
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
  };

  return (
    <div className="container mx-auto py-6 space-y-6 max-w-7xl">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Add Category</h1>
        <p className="text-muted-foreground">
          Create a new service category for your platform.
        </p>
      </div>
      
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Category Information</CardTitle>
          <CardDescription>
            Fill in the details below to create a new service category.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 text-center">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        {...field} 
                        placeholder="Enter category description..."
                        rows={4}
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
                    <FormLabel>Is New</FormLabel>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Category...
                  </>
                ) : (
                  "Add Category"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
