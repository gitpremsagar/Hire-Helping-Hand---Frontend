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
import { toast } from "sonner";
import { ServiceCategoryService } from "@/lib/modules/serviceCategory/serviceCategory.service";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { createServiceCategorySchema } from "@/lib/modules/serviceCategory/serviceCategory.schemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function AddCategoryPage() {
  const form = useForm<z.infer<typeof createServiceCategorySchema>>({
    resolver: zodResolver(createServiceCategorySchema),
    defaultValues: {
      name: "",
      description: "",
      isNew: true,
    },
  });

  const onSubmit = (data: z.infer<typeof createServiceCategorySchema>) => {
    console.log(data);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Add Category</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                  <Input {...field} />
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
          <Button type="submit" className="w-full">
            {form.formState.isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Add Category"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
